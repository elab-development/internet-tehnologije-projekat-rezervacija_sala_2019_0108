import { Component, Inject } from '@angular/core';
import { Room } from '../../models/room';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../rooms/room-detail/room-detail.component';
import { ReservationserviceService } from '../../services/reservationservice.service';


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, 
              public dialogRef: MatDialogRef<ReserveComponent>,
              private reservationService: ReservationserviceService){}
  
  onCancelClick() {
    this.dialogRef.close();
  }
  onConfirmClick(){
    this.reservationService.addReservation(this.data.reservation);
  }


}

