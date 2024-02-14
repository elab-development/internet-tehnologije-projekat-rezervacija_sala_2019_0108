import { Injectable } from '@angular/core';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms = [
    new Room(1, "Sala 1", "Konferencijska sala", 79, "Zgrada A", ["Zvučni sistem", "Tabla", "Projektor"], 80, 382, "Sala 1 predstavlja savršeno mesto za vaše konferencije, radionice i sastanke. Opremljena najsavremenijom audio i video tehnikom, uključujući projektor visoke rezolucije, zvučni sistem vrhunskog kvaliteta i interaktivnu tablu, ova sala pruža sve što je potrebno za efikasan i produktivan sastanak. Prostrana i svetla, sa udobnim sedištima i klimatizovanim prostorom, Sala 1 nudi idealno okruženje za učenje, diskusiju i kolaboraciju.", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(2, "Sala 2", "Konferencijska sala", 56, "Zgrada A", ["Projektor", "Tabla", "Zvučni sistem"], 72, 134, "Opis sale 2", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(3, "Sala 3", "Sala za sastanke", 57, "Zgrada C", ["Tabla", "Zvučni sistem", "Projektor"], 87, 278, "Opis sale 3", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(4, "Sala 4", "Učionica", 40, "Zgrada C", ["Projektor"], 60, 287, "Opis sale 4", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
    new Room(5, "Sala 5", "Sala za sastanke", 27, "Zgrada C", ["Tabla", "Zvučni sistem", "Zvučni sistem", "Zvučni sistem", "Zvučni sistem", "Zvučni sistem", "Zvučni sistem", "Zvučni sistem", "Projektor"], 30, 371, "Opis sale 5", "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1662742343187-U42DV7HUFOA8LY60XQGF/Tech+Trends+for+the+Modern+Conference+Room"),
]

  constructor() { }
}
