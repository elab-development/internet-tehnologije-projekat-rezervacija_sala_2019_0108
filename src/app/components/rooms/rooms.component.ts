import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RoomListComponent } from './room-list/room-list.component';
import { PaginationService } from '../../services/pagination.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {

  @ViewChild(RoomListComponent) roomListComponent!: RoomListComponent;


  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 100;
  private userSub!: Subscription;
  isAuthenticated = false;
  isAdmin = false;
  private currentUser: User;

  constructor(private roomService: RoomService,
    private paginationService: PaginationService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.roomService.loadRooms().subscribe(data => {
      this.totalItems = this.roomService.numberOfRooms;
    });
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (user) { 
        this.isAdmin = user.email === "admin@gmail.com";
        this.currentUser = user;
      } else {
        this.isAdmin = false;
        this.currentUser = null; 
      }
      console.log(this.isAdmin);
    });
    
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.paginationService.changePage(newPage);
    this.roomListComponent.changePage(newPage);
  }

}
