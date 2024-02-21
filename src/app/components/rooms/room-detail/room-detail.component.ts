import { Component, OnDestroy, OnInit, ViewChild, numberAttribute } from '@angular/core';
import { Room } from '../../../models/room';
import { RoomService } from '../../../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { ReserveComponent } from '../../reserve/reserve.component';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponent } from './calendar/calendar.component';
import { Reservation } from '../../../models/reservation';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit, OnDestroy {

  @ViewChild(CalendarComponent) CalendarComponent: CalendarComponent;

  public room: Room;
  showDialog = false;
  private userSub: Subscription;
  private isAuthenticated = false;

  constructor(private roomService: RoomService, private activatedRoute: ActivatedRoute, public dialog: MatDialog, private authService: AuthService){

  }

  ngOnInit(): void {
    let id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.room = this.roomService.rooms.find(room => room.id === id );
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
    });
    }
  
    ngOnDestroy(): void {
      this.userSub.unsubscribe();    
    }

    openDialog(): void {
      if(this.CalendarComponent.selectedDate === ''){
        alert("You have to select a date to reserve!");
        return;
      }
      if(!this.isAuthenticated){
        alert("You have to be logged in in orded to place a reservation!");
        return;
      }
      let reservation: Reservation = new Reservation(1,
                                                    this.room, new Date(this.CalendarComponent.selectedDate),
                                                    new User('1', "plejser@holdic","token",new Date()) );
      this.dialog.open(ReserveComponent, {
        width: '20%',
        height: '80%',
        data: { reservation: reservation }
      });
    }
}

export interface DialogData {
  reservation: Reservation
}
