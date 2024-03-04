import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RoomListComponent } from './room-list/room-list.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{

  @ViewChild(RoomListComponent) roomListComponent!: RoomListComponent;


currentPage: number = 1;
itemsPerPage: number = 6;
totalItems: number = 100; 

constructor(private roomService: RoomService){}

ngOnInit(): void {
  this.roomService.loadRooms().subscribe(data =>{
    this.totalItems = this.roomService.numberOfRooms;
  })
}

onPageChange(newPage: number): void {
  this.currentPage = newPage;
  this.roomListComponent.changePage(newPage);
}

}
