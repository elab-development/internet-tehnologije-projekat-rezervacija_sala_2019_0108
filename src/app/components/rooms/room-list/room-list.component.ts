import { Component } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {

  rooms: Room[];

  constructor(private roomService: RoomService){
    this.rooms = roomService.rooms;
  }

}
