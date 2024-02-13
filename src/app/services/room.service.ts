import { Injectable } from '@angular/core';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms = [
    new Room(1, "Sala 1", "Konferencijska sala", 79, "Zgrada A", ["Zvučni sistem", "Tabla", "Projektor"], "09:00 - 17:00", 382, "Opis sale 1", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(2, "Sala 2", "Konferencijska sala", 56, "Zgrada A", ["Projektor", "Tabla", "Zvučni sistem"], "09:00 - 17:00", 134, "Opis sale 2", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(3, "Sala 3", "Sala za sastanke", 57, "Zgrada C", ["Tabla", "Zvučni sistem", "Projektor"], "09:00 - 17:00", 278, "Opis sale 3", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(4, "Sala 4", "Učionica", 40, "Zgrada C", ["Projektor"], "09:00 - 17:00", 287, "Opis sale 4", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(5, "Sala 5", "Sala za sastanke", 27, "Zgrada C", ["Tabla", "Zvučni sistem", "Projektor"], "09:00 - 17:00", 371, "Opis sale 5", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
]

  constructor() { }
}
