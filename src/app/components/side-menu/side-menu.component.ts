import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CalendarComponent } from '../rooms/room-detail/calendar/calendar.component';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room';
import { Subscription } from 'rxjs';
import { Reservation } from '../../models/reservation';
import { ReservationserviceService } from '../../services/reservationservice.service';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit, OnDestroy {


  @ViewChild('roomTypeSelect') roomTypeSelect!: ElementRef;
  @ViewChild('roomCapacitySelect') roomCapacitySelect!: ElementRef;
  @ViewChild(CalendarComponent) CalendarComponent: CalendarComponent;

  @ViewChild('equipmentProjector') equipmentProjector!: ElementRef;
  @ViewChild('equipmentWhiteboard') equipmentWhiteboard!: ElementRef;
  @ViewChild('equipmentVideoSystem') equipmentVideoSystem!: ElementRef;
  @ViewChild('equipmentSoundSystem') equipmentSoundSystem!: ElementRef;

  @Output() filtersApplied = new EventEmitter();



  private roomsSubscription!: Subscription;
  rooms: Room[] = [];
  selectedDate: string = "";
  private reservationSub!: Subscription;
  private allReservations?: Reservation[];

  constructor(private roomService: RoomService, 
            private reservationService: ReservationserviceService,
            private paginationService: PaginationService) { }

  ngOnInit() {
    this.roomsSubscription = this.roomService.loadRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }
  

  ngOnDestroy() {
    this.roomsSubscription.unsubscribe();
  }

  clearAll() {
    this.roomCapacitySelect.nativeElement.value = 'none';
    this.roomTypeSelect.nativeElement.value = 'none';
    this.equipmentProjector.nativeElement.checked = false;
    this.equipmentWhiteboard.nativeElement.checked = false;
    this.equipmentVideoSystem.nativeElement.checked = false;
    this.equipmentSoundSystem.nativeElement.checked = false;
    this.CalendarComponent.resetCalendar();
    this.changeList();
  }

  changeList() {
    this.roomService.loadRooms().subscribe(rooms => {
      this.rooms = rooms;
      this.applyFilters();
    });
  }

  filterDates(dateStr: string) {
    this.selectedDate = dateStr;
    this.reservationSub = this.reservationService.loadReservations().subscribe(reservations => {
      this.allReservations = reservations;
    });
    this.changeList();
  }

  applyFilters() {
    let filteredRooms: Room[] = [];

    const type = this.roomTypeSelect.nativeElement.value;
    const capacity = this.roomCapacitySelect.nativeElement.value;
    const equipment = [
      this.equipmentProjector.nativeElement.checked ? 'Projector' : null,
      this.equipmentWhiteboard.nativeElement.checked ? 'Whiteboard' : null,
      this.equipmentVideoSystem.nativeElement.checked ? 'Video System' : null,
      this.equipmentSoundSystem.nativeElement.checked ? 'Sound System' : null,
    ].filter(e => e !== null);

    filteredRooms = this.rooms.filter(room => {
      const matchesType = type === 'none' || room.type === type;

      let minCapacity, maxCapacity;
      if (capacity === "100+") {
        minCapacity = 100;
        maxCapacity = Infinity;
      } else if (capacity !== "none") {
        [minCapacity, maxCapacity] = capacity.split("-").map(Number);
      } else {
        minCapacity = 0;
        maxCapacity = Infinity;
      }

      const matchesDateFree = this.CalendarComponent.selectedDate ? this.checkIfDateIsFree(room) : true;

      const matchesCapacity = room.capacity >= minCapacity && room.capacity <= maxCapacity;

      const matchesEquipment = equipment.every(eq => room.equipment.includes(eq));

      return matchesType && matchesCapacity && matchesEquipment && matchesDateFree;
    });
    this.paginationService.changePage(1);
    this.roomService.filterRooms(filteredRooms);
  }
  checkIfDateIsFree(room: Room): boolean {
    return !this.allReservations.some(reservation => {
      var noviDatum = new Date(reservation.date);
      var godina = noviDatum.getFullYear();
      var mesec = (noviDatum.getMonth() + 1).toString().padStart(2, '0');
      var dan = noviDatum.getDate().toString().padStart(2, '0');
      let date = `${godina}-${mesec}-${dan}`;
      return date === this.selectedDate && reservation.room.id === room.id;
    });
  }
  
}
