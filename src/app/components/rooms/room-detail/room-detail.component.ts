import { Component, OnInit, numberAttribute } from '@angular/core';
import { Room } from '../../../models/room';
import { RoomService } from '../../../services/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit {
  public room: Room;

  constructor(private roomService: RoomService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    let id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.room = this.roomService.rooms.find(room => room.id === id )
  }

}
