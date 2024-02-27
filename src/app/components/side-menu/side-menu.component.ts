import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from '../rooms/room-detail/calendar/calendar.component';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit, OnDestroy{

  @ViewChild('roomTypeSelect') roomTypeSelect!: ElementRef;
  @ViewChild('roomCapacitySelect') roomCapacitySelect!: ElementRef;
  @ViewChild(CalendarComponent) CalendarComponent: CalendarComponent;

  @ViewChild('equipmentProjector') equipmentProjector!: ElementRef;
  @ViewChild('equipmentWhiteboard') equipmentWhiteboard!: ElementRef;
  @ViewChild('equipmentVideoSystem') equipmentVideoSystem!: ElementRef;
  @ViewChild('equipmentSoundSystem') equipmentSoundSystem!: ElementRef;

  private roomsSubscription!: Subscription;
  rooms: Room[] = [];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomsSubscription = this.roomService.getRooms().subscribe(rooms => {
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
      this.applyFilters(); 
    });
  }
  

  applyFilters(){
    let filteredRooms: Room[] = [];

    const type = this.roomTypeSelect.nativeElement.value;
    console.log(type);
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

      const matchesCapacity = room.capacity >= minCapacity && room.capacity <= maxCapacity;

      const matchesEquipment = equipment.every(eq => room.equipment.includes(eq));

      return matchesType && matchesCapacity && matchesEquipment;
    });
    console.log(filteredRooms);
    this.roomService.filterRooms(filteredRooms);
  }

}
