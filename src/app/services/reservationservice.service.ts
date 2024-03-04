import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservationserviceService {


  private reservationSubject = new BehaviorSubject<Reservation[]>([]);
  public reservations$ = this.reservationSubject.asObservable();

  constructor(private httpClient: HttpClient) { 
    this.loadReservations();
  }

  loadReservations(): Observable<Reservation[]> {
    return this.httpClient.get<{data: Reservation[]}>('http://127.0.0.1:8000/api/reservations').pipe(
      map(response => response.data),
      tap(reservations => {
        this.reservationSubject.next(reservations);
      })
    );
  }
  loadReservationsForRoom(roomId: number): Observable<Reservation[]> {
    return this.httpClient.get<{data: Reservation[]}>('http://127.0.0.1:8000/api/rooms/' + roomId + '/reservations').pipe(
      map(response => response.data),
      tap(reservations => {
        this.reservationSubject.next(reservations);
      })
    );
  }
  
  addReservation(reservation: Reservation) {
    this.httpClient.post<Reservation>('http://127.0.0.1:8000/api/reservations', reservation).subscribe(newReservation => {
      });
  }

}
