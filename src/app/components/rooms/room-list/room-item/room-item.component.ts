import { Component, Input } from '@angular/core';
import { Room } from '../../../../models/room';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrl: './room-item.component.css'
})
export class RoomItemComponent {

  @Input() room: Room;

}
