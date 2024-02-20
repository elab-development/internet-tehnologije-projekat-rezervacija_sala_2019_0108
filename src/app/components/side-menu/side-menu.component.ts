import { Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarComponent } from '../rooms/room-detail/calendar/calendar.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  @ViewChild('roomTypeSelect') roomTypeSelect!: ElementRef;
  @ViewChild('roomCapacitySelect') roomCapacitySelect!: ElementRef;
  @ViewChild(CalendarComponent) CalendarComponent: CalendarComponent;

  @ViewChild('equipmentProjector') equipmentProjector!: ElementRef;
  @ViewChild('equipmentWhiteboard') equipmentWhiteboard!: ElementRef;
  @ViewChild('equipmentVideoConference') equipmentVideoConference!: ElementRef;
  @ViewChild('equipmentSoundSystem') equipmentSoundSystem!: ElementRef;


  clearAll() {
    this.roomCapacitySelect.nativeElement.value = 'none';
    this.roomTypeSelect.nativeElement.value = 'none';
    this.equipmentProjector.nativeElement.checked = false;
    this.equipmentWhiteboard.nativeElement.checked = false;
    this.equipmentVideoConference.nativeElement.checked = false;
    this.equipmentSoundSystem.nativeElement.checked = false;
    this.CalendarComponent.resetCalendar();

  }

  

}
