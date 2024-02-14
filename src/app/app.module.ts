import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomListComponent } from './components/rooms/room-list/room-list.component';
import { RoomDetailComponent } from './components/rooms/room-detail/room-detail.component';
import { RoomItemComponent } from './components/rooms/room-list/room-item/room-item.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/rooms/room-detail/calendar/calendar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

const routes: Routes = [
  
  { path: 'rooms/:id', component: RoomDetailComponent },
  { path: 'rooms', component: RoomListComponent },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: '**', redirectTo: '/rooms', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoomsComponent,
    RoomListComponent,
    RoomDetailComponent,
    RoomItemComponent,
    CalendarComponent,
    SideMenuComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
