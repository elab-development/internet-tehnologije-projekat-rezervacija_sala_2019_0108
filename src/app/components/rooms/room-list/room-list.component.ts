import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';
import { PaginationService } from '../../../services/pagination.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'] 
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  private roomsSubscription!: Subscription;

  constructor(private roomService: RoomService, private paginationService: PaginationService) {}

  ngOnInit(): void {

    this.roomsSubscription = this.roomService.getRooms(this.paginationService.getCurrentPage()).subscribe(rooms => {
      this.rooms = rooms;
    });
  }
  

  ngOnDestroy(): void {
    if (this.roomsSubscription) {
      this.roomsSubscription.unsubscribe();
    }
  }

  changePage(page: number){
    console.log(page);

    this.roomsSubscription = this.roomService.getRooms(page).subscribe(rooms => {
      this.rooms = rooms;
    });
  }


}
