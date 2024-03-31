import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { ReservationserviceService } from '../../services/reservationservice.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{

  reservations: Reservation[];

  constructor(private reservationService: ReservationserviceService,
              private authService: AuthService){

  }

  ngOnInit(): void {
    this.reservationService.loadReservationsForUser().subscribe(data =>{
      this.reservations = data;
    })
  }

  deleteReservation(reservationId){
    this.reservationService.deleteReservation(reservationId);
    alert("You have deleted a reservation");
  }
  downloadReservation(reservationId){
    this.reservationService.downloadReservation(reservationId);
    alert("You have downloaded a reservation");

  }

}
