import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Room } from "../models/room";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from "./auth.service";
import { PaginationService } from "./pagination.service";


@Injectable({
  providedIn: 'root'
})
export class RoomService implements OnInit {

  private roomsSubject = new BehaviorSubject<Room[]>([]);
  public rooms$ = this.roomsSubject.asObservable();
  private numberOfPagesSubject = new BehaviorSubject<number>(1);
  public numberOfPages$ = this.numberOfPagesSubject.asObservable();
  public numberOfRooms=6;

  constructor(private httpClient: HttpClient, 
    private authService: AuthService, 
    private paginationService: PaginationService) {
      this.loadRooms().subscribe();
  }

  ngOnInit(): void {
  }


  loadRooms(): Observable<Room[]> {
    return this.httpClient.get<{ data: Room[] }>('http://127.0.0.1:8000/api/rooms').pipe(
      map(response => response.data),
      map(rooms => rooms.map(room => {
        return room;
      })),
      tap(rooms => {
        this.roomsSubject.next(rooms);
        this.updateNumberOfPages(rooms.length);
      })
    );
  }


  getRooms(page: number, pageSize: number = 6): Observable<Room[]> {
    return this.rooms$.pipe(
      map(rooms => {
        const startIndex = (page - 1) * pageSize;
        return rooms.slice(startIndex, startIndex + pageSize);
      })
    );  
  }
  

  filterRooms(rooms: Room[]) {
    this.paginationService.changePage(1);
    this.roomsSubject.next(rooms);
    this.updateNumberOfPages(rooms.length);
  }
  addRoom(room: Room): void {
    if (this.authService.isUserAdmin()) { 
      this.authService.token$.subscribe(token => {
        const headers = {
          'Authorization': `Bearer ${token}`
        };
  
        this.httpClient.post<Room>('http://127.0.0.1:8000/api/rooms', room, { headers })
          .pipe(
            catchError((error) => {
              console.error('Došlo je do greške prilikom dodavanja sobe:', error);
              return throwError(error);
            })
          )
          .subscribe(() => {
            this.loadRooms();
          });
      });
    } 
  }
  private updateNumberOfPages(totalItems: number): void {
    const newNumberOfPages = Math.ceil(totalItems / 6);
    this.numberOfPagesSubject.next(newNumberOfPages);
  }
}
  
  export interface RoomGetterInterface {
    //NAPRAVI CUSTOM INTERFACE OPET
  Rooms: {
    rooms: Room[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
