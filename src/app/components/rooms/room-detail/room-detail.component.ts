import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Room } from '../../../models/room';
import { RoomService } from '../../../services/room.service';
import { AuthService } from '../../../services/auth.service';
import { ReserveComponent } from '../../reserve/reserve.component';
import { CalendarComponent } from './calendar/calendar.component';
import { Reservation } from '../../../models/reservation';
import { User } from '../../../models/user';
import { ReservationserviceService } from '../../../services/reservationservice.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit, OnDestroy {

  @ViewChild(CalendarComponent) calendarComponent!: CalendarComponent;

  public room?: Room;
  private roomSub!: Subscription;
  private userSub!: Subscription;
  private currentUser: User;
  private reservationSub!: Subscription;
  showDialog = false;
  isAuthenticated = false;

  constructor(private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService,
    private reservationService: ReservationserviceService) { }

    ngOnInit(): void {
      const id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.roomSub = this.roomService.rooms$.subscribe(rooms => {
        
        const room = rooms.find(room => room.id === id);
        if (room) {
          if (typeof room.equipment === 'string') {
            room.equipment = JSON.parse(room.equipment);
          }
          this.room = room;
          this.reservationSub = this.reservationService.loadReservationsForRoom(this.room.id).subscribe(reservations => {
            this.calendarComponent.setRoomsReservations(reservations);
          });
        }
      });
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
        this.currentUser = user;
      });
    }

    

  ngOnDestroy(): void {
    this.roomSub.unsubscribe();
    this.userSub.unsubscribe();
    this.reservationSub.unsubscribe();
  }

  openDialog(): void {
    if (this.calendarComponent.selectedDate === '') {
      alert("You have to select a date to reserve!");
      return;
    }
    
    if(!this.isDateAfterToday(this.calendarComponent.selectedDate)){
      alert("Selected date has to be a future date!");
      return;
    }

    if (!this.isAuthenticated) {
      alert("You have to be logged in to place a reservation!");
      return;
    }
    this.authService.currentUser.subscribe((user: User) => {
      // Ovde radite sa user objektom
      console.log(user);
      // Na primer, ako želite da postavite trenutnog korisnika u neku promenljivu
      this.currentUser = user;
    });
    
    const reservation = new Reservation(
      1,
      this.room!,
      new Date(this.calendarComponent.selectedDate),
      this.currentUser
    );
    this.dialog.open(ReserveComponent, {
      width: '25%',
      height: '80%',
      data: { reservation }
    });
  }
  isDateAfterToday(dateString: string): boolean {
    const inputDate = new Date(dateString);
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return inputDate > today;
  }
  
}

export interface DialogData {
  reservation: Reservation
}
