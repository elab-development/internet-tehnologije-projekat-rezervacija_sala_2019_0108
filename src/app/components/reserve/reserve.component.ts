import { Component, Inject } from '@angular/core';
import { Room } from '../../models/room';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../rooms/room-detail/room-detail.component';


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<ReserveComponent>){}
  
  onCancelClick() {
    this.dialogRef.close();
  }


}

