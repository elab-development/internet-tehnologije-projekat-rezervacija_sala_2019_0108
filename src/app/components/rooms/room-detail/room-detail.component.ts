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

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'] // Ispravljeno sa styleUrl na styleUrls i u niz
})
export class RoomDetailComponent implements OnInit, OnDestroy {

  @ViewChild(CalendarComponent) calendarComponent!: CalendarComponent; // Ispravljeno na camelCase

  public room?: Room; // Učinite opcionalnim ili inicijalizujte
  private roomSub!: Subscription; // Dodato za upravljanje pretplatom na sobe
  private userSub!: Subscription;
  showDialog = false;
  isAuthenticated = false;

  constructor(private roomService: RoomService, private activatedRoute: ActivatedRoute, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    // Kreiranje i upravljanje pretplatom na rooms$
    this.roomSub = this.roomService.rooms$.subscribe(rooms => {
      this.room = rooms.find(room => room.id === id);
    });
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.roomSub.unsubscribe();
    this.userSub.unsubscribe();    
  }

  openDialog(): void {
    if (this.calendarComponent.selectedDate === '') {
      alert("You have to select a date to reserve!");
      return;
    }
    if (!this.isAuthenticated) {
      alert("You have to be logged in to place a reservation!");
      return;
    }
    const reservation = new Reservation(
      1,
      this.room!, // Pretpostavka da je soba već postavljena; koristite ! operator sa oprezom
      new Date(this.calendarComponent.selectedDate),
      new User('1', "plejser@holdic", "token", new Date()) // Ovo treba da bude dinamički dobijeni podaci o trenutno prijavljenom korisniku
    );
    this.dialog.open(ReserveComponent, {
      width: '20%',
      height: '80%',
      data: { reservation }
    });
  }
}

export interface DialogData {
  reservation: Reservation
}
