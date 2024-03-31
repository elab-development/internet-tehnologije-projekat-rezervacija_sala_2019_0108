import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from '../../models/room';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {
  constructor(private authService: AuthService, private roomService: RoomService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const formValue = form.value;
    const newRoom = new Room(
      +formValue.id,
      formValue.name,
      formValue.type, 
      +formValue.capacity,
      formValue.location,
      [
        formValue.equipmentProjector ? 'Projector' : null,
        formValue.equipmentSoundEquipment ? 'Video System' : null,
        formValue.equipmentWhiteboard ? 'Whiteboard' : null,
        formValue.equipmentSoundSystem ? 'Sound System' : null,
      ].filter(e => e !== null), 
      +formValue.squareFootage,
      +formValue.price,
      formValue.description,
      formValue.imageUrl
    );

    this.roomService.addRoom(newRoom); 
    form.reset(); 
    this.roomService.loadRooms();
    this.router.navigate(['/rooms']); 
  }
}
