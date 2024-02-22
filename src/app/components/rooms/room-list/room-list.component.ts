import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'] 
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  private roomsSubscription!: Subscription;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomsSubscription = this.roomService.rooms$.subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  ngOnDestroy(): void {
    if (this.roomsSubscription) {
      this.roomsSubscription.unsubscribe();
    }
  }
}
