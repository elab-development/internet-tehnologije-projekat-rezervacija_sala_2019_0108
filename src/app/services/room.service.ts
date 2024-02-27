  import { BehaviorSubject, Observable } from "rxjs";
  import { Room } from "../models/room";
  import { HttpClient } from "@angular/common/http";
  import { Injectable, OnInit } from "@angular/core";
  import { map, tap } from 'rxjs/operators';


  @Injectable({
    providedIn: 'root'
  })
  export class RoomService implements OnInit {

    private roomsSubject = new BehaviorSubject<Room[]>([]);
    public rooms$ = this.roomsSubject.asObservable();

    constructor(private httpClient: HttpClient) {
      this.loadRooms().subscribe(); 
    }

    ngOnInit(): void {
    }


    loadRooms(): Observable<Room[]> {
      return this.httpClient.get<{data: Room[]}>('http://127.0.0.1:8000/api/rooms').pipe(
        map(response => response.data),
        map(rooms => rooms.map(room => {
          // Postavite novi imageUrl za svaku sobu
          room.imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2txP24J7E7sL8DhiWQKsRm2Rj3C5FX9CASNn_egFr6g&s';
          return room;
        })),
        tap(rooms => {
          console.log(rooms); // Opcionalno: Logujte izmenjene sobe
          this.roomsSubject.next(rooms); // Ažurirajte BehaviorSubject sa izmenjenim sobama
        })
      );
    }
    

    getRooms(): Observable<Room[]> {
      return this.rooms$; 
    }

    filterRooms(rooms: Room[]){
      this.roomsSubject.next(rooms);
    }

    addRoom(room: Room): void {
      this.httpClient.post<Room>('http://127.0.0.1:8000/api/rooms', room).subscribe(newRoom => {
        this.loadRooms(); 
      });
    }
  }

  export interface RoomGetterInterface {
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
