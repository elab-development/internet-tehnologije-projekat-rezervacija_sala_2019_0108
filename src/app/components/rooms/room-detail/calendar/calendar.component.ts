// calendar.component.ts
import { Component, OnInit, Input, Host, Optional } from '@angular/core';
import { Reservation } from '../../../../models/reservation';
import { SideMenuComponent } from '../../../side-menu/side-menu.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
 

  @Input() styleMode: 'room-detail' | 'side-menu';
  @Input() hasReserved: boolean = true;
  @Input() selectedDate: string = '';


  currentMonth: number;
  currentYear: number;
  daysInMonth: number[];
  firstDayOfMonth: number;
  usersReservations?: Reservation [];
  private reservationSub!: Subscription;
  private allReservations?: Reservation[];


  reservedDates: string[] = [];


  constructor(@Optional() @Host() private parentComponent: SideMenuComponent) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  ngOnInit() {
    this.generateCalendar();
  }

  setRoomsReservations(reservations: Reservation[]) {
    this.usersReservations = reservations;
    if(this.usersReservations){
      let datumi: Date[] = this.usersReservations?.map(reservation => {
        return reservation.date;
      }) || [];
      this.reservedDates = this.convertDatesToStrings(datumi);
    }
    this.generateCalendar();
  }

  convertDatesToStrings(datumi: Date[]): string[] {
    return datumi.map((datum) => {
      var noviDatum = new Date(datum);
      var godina = noviDatum.getFullYear();
      var mesec = (noviDatum.getMonth() + 1).toString().padStart(2, '0'); 
      var dan = noviDatum.getDate().toString().padStart(2, '0');
      return `${godina}-${mesec}-${dan}`;
    });
  }

  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth).getDay();
    this.firstDayOfMonth = (firstDay === 0 ? 6 : firstDay - 1); 
    const dim = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: dim }, (_, i) => i + 1);
  }

  changeMonth(step: number): void {
    this.currentMonth += step;
    
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }

    this.generateCalendar();
  }

  get monthAndYear(): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[this.currentMonth]} ${this.currentYear}`;
  }

  selectDate(day: number) {
    const dateStr = `${this.currentYear}-${('0' + (this.currentMonth + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
    
    if(this.parentComponent){
      this.parentComponent.filterDates(dateStr);
    }

    if (this.selectedDate === dateStr) {
      this.selectedDate = '';
      if(this.parentComponent){
        this.parentComponent.filterDates(this.selectedDate);
      }
      return;
    }
  
    if (this.reservedDates.includes(dateStr) && this.hasReserved) {
      alert('This date is already reserved.');
    } else {
      this.selectedDate = dateStr;
    }
  }

  resetCalendar(){
    this.selectedDate = '';
  }
}
