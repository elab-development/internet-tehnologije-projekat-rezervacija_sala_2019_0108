import { Component, OnInit, ViewChild, numberAttribute } from '@angular/core';
import { Room } from '../../../models/room';
import { RoomService } from '../../../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { ReserveComponent } from '../../reserve/reserve.component';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit {

  @ViewChild(CalendarComponent) CalendarComponent: CalendarComponent;

  public room: Room;
  showDialog = false;

  constructor(private roomService: RoomService, private activatedRoute: ActivatedRoute, public dialog: MatDialog){

  }

  ngOnInit(): void {
    let id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.room = this.roomService.rooms.find(room => room.id === id )
    }

    openDialog(): void {
      if(this.CalendarComponent.selectedDate === ''){
        alert("You have to select a date to reserve!");
        return;
      }
      this.dialog.open(ReserveComponent, {
        width: '30%',
        height: '80%',
        data: { room: this.room, date: this.CalendarComponent.selectedDate }
      });
    }
}

export interface DialogData {
  room: Room;
  date: Date;
}
