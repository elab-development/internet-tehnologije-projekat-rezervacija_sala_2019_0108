import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RoomListComponent } from './room-list/room-list.component';
import { PaginationService } from '../../services/pagination.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'] // Ovde je bila greška: styleUrl treba da bude styleUrls
})
export class RoomsComponent implements OnInit, AfterViewInit { // Dodat AfterViewInit interface

  @ViewChild(RoomListComponent, { static: false }) roomListComponent!: RoomListComponent; // Dodato { static: false }

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 100;
  private userSub!: Subscription;
  isAuthenticated = false;
  isAdmin = false;
  private currentUser?: User; // Dodat "?" da označimo da može biti undefined

  constructor(private roomService: RoomService,
              private paginationService: PaginationService,
              private authService: AuthService,
              private cdr: ChangeDetectorRef) { }

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
        this.currentUser = undefined; // Ovde smo promenili sa null na undefined
      }
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); 
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.paginationService.changePage(newPage);
    if (this.roomListComponent) { // Dodata provera da li roomListComponent postoji
      this.roomListComponent.changePage(newPage);
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void { // Dodato da se oslobode resursi
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
