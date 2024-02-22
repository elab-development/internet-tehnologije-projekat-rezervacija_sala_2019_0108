import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private initialRooms: Room[] = [
    new Room(1, "Sala 1", "Conference Room", 79, "Zgrada A", ["Whiteboard", "Projector"], 80, 382, "Sala 1 predstavlja savršeno mesto za vaše konferencije, radionice i sastanke. Opremljena najsavremenijom audio i video tehnikom, uključujući projektor visoke rezolucije, zvučni sistem vrhunskog kvaliteta i interaktivnu tablu, ova sala pruža sve što je potrebno za efikasan i produktivan sastanak. Prostrana i svetla, sa udobnim sedištima i klimatizovanim prostorom, Sala 1 nudi idealno okruženje za učenje, diskusiju i kolaboraciju.", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(2, "Sala 2", "Conference Room", 56, "Zgrada A", ["Projector", "Whiteboard", "Sound System"], 72, 134, "Opis sale 2", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(3, "Sala 3", "Meeting Room", 57, "Zgrada C", ["Whiteboard", "Sound System", "Projector"], 87, 278, "Opis sale 3", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(4, "Sala 4", "Classroom", 40, "Zgrada C", ["Projector"], 60, 287, "Opis sale 4", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(5, "Sala 5", "Auditorium", 27, "Zgrada C", ["Whiteboard"], 30, 371, "Opis sale 5", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
  ];

  private roomsSubject = new BehaviorSubject<Room[]>(this.initialRooms);
  public rooms$ = this.roomsSubject.asObservable();

  saveRooms(rooms: Room[]) {
    localStorage.setItem("rooms", JSON.stringify(rooms));
    this.roomsSubject.next(rooms);

  }
  loadRooms(): Room[] {
    const rooms = localStorage.getItem('rooms');
    return rooms ? JSON.parse(rooms) : this.initialRooms;
  }
  addRoom(room: Room) {
    let rooms = this.loadRooms();
    rooms.push(room);
    this.saveRooms(rooms);
  }
  setInitialRooms(){
    this.saveRooms(this.initialRooms);
  }


}
