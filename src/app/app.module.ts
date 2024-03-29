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
import { ReserveComponent } from './components/reserve/reserve.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthComponent } from './auth/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './styles/loading-spinner/loading-spinner.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { AuthGuard } from './auth/auth/authGuard/authGuard';
import { PaginationComponent } from './footer/pagination/pagination.component';
import { LoggedOutGuard } from './auth/auth/loggedOutGuard/loggedOuthGuard';
import { ReservationComponent } from './components/reservation/reservation.component';
import { LoggedInGuard } from './auth/auth/loggedInGuard/logged-in-guard.guard';

const routes: Routes = [
  
  { path: 'rooms/:id', component: RoomDetailComponent },
  { path: 'reservations', component: ReservationComponent, canActivate: [LoggedInGuard] },
  { path: 'createRoom', component: CreateRoomComponent, canActivate: [AuthGuard] },
  { path: 'reserve', component: ReserveComponent},
  { path: 'login', component: AuthComponent, canActivate: [LoggedOutGuard]  },
  { path: 'rooms', component: RoomsComponent },
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
    ReserveComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    CreateRoomComponent,
    PaginationComponent,
    ReservationComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
