import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'RoomReserve';
  @ViewChild('roomTypeSelect') roomTypeSelect!: ElementRef;
  @ViewChild('roomCapacitySelect') roomCapacitySelect!: ElementRef;

  clearAll() {

    this.roomCapacitySelect.nativeElement.value = 'none';
    this.roomTypeSelect.nativeElement.value = 'none';

  }

}
