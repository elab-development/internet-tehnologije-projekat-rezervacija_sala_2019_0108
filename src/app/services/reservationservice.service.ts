import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ReservationserviceService {



  private reservationSubject = new BehaviorSubject<Reservation[]>([]);
  public reservations$ = this.reservationSubject.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.loadReservations();
  }


  loadReservations(): Observable<Reservation[]> {
    return this.httpClient.get<{ data: Reservation[] }>('http://127.0.0.1:8000/api/reservations').pipe(
      map(response => response.data),
      tap(reservations => {
        this.reservationSubject.next(reservations);
      })
    );
  }
  loadReservationsForRoom(roomId: number): Observable<Reservation[]> {
    return this.httpClient.get<{ data: Reservation[] }>('http://127.0.0.1:8000/api/rooms/' + roomId + '/reservations').pipe(
      map(response => response.data),
      tap(reservations => {
        this.reservationSubject.next(reservations);
      }),
      catchError(error => {
        console.error('Došlo je do greške pri učitavanju rezervacija', error);
        this.reservationSubject.next([]); // Postavljanje reservationSubject na prazan niz
        return of([]); // Vraćanje Observable-a koji emituje prazan niz, kako bi se osiguralo da lanac ostane funkcionalan
      })
    );
  }
  loadReservationsForUser(): Observable<Reservation[]> {
    let userId ;
    this.authService.currentUser.subscribe(user => {
      userId = user.id;
    });
    return this.httpClient.get<{ data: Reservation[] }>('http://127.0.0.1:8000/api/users/' + userId + '/reservations').pipe(
      map(response => response.data),
      tap(reservations => {
        this.reservationSubject.next(reservations);
      }),
      catchError(error => {
        console.error('Došlo je do greške pri učitavanju rezervacija', error);
        this.reservationSubject.next([]); // Postavljanje reservationSubject na prazan niz
        return of([]); // Vraćanje Observable-a koji emituje prazan niz, kako bi se osiguralo da lanac ostane funkcionalan
      })
    );
  }

  

  addReservation(reservation: Reservation): void {
    this.authService.token$.subscribe(token => {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const laravelObject = reservation.toLaravelObject();

      this.httpClient.post<Reservation>('http://127.0.0.1:8000/api/reservations', laravelObject, { headers })
        .subscribe(
          newReservation => {
            window.location.reload();

          },
          error => {
            console.error("Greška prilikom dodavanja rezervacije", error.error);
          }
        );
    });
  }

  deleteReservation(reservationId: number): void {
    this.authService.token$.subscribe(token => {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
  
      this.httpClient.delete(`http://127.0.0.1:8000/api/reservations/${reservationId}`, { headers })
        .subscribe(
          () => {
            window.location.reload();
          },
          error => {
            console.error("Greška prilikom brisanja rezervacije", error.error);
          }
        );
    });
  }
  downloadReservation(reservationId: number): void {
    this.authService.token$.subscribe(token => {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
  
      this.httpClient.get(`http://127.0.0.1:8000/api/reservation/${reservationId}/pdf`, { headers, responseType: 'blob' })
        .subscribe(
          (response) => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const downloadURL = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = `reservation-${reservationId}.pdf`;
            link.click();
  
            window.URL.revokeObjectURL(downloadURL);
          },
          error => {
            console.error("Greška prilikom preuzimanja rezervacije", error.error);
          }
        );
    });
  }


}
