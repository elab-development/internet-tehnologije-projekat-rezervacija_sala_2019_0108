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
        room.imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2txP24J7E7sL8DhiWQKsRm2Rj3C5FX9CASNn_egFr6g&s'; // Postavite novi imageUrl za svaku sobu
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
        console.log(token);
        const headers = {
          'Authorization': `Bearer ${token}`
        };
  
        this.httpClient.post<Room>('http://127.0.0.1:8000/api/rooms', room, { headers })
          .pipe(
            catchError((error) => {
              // Ovde možete obraditi grešku, na primer, prikazati poruku korisniku
              console.error('Došlo je do greške prilikom dodavanja sobe:', error);
              // Možete takođe obavestiti korisnika putem UI, na primer, koristeći neki servis za obaveštavanje
              // this.notificationService.showError('Greška prilikom dodavanja sobe.');
  
              // Vraćamo Observable sa greškom kako bi lanac ostao konsistentan
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
