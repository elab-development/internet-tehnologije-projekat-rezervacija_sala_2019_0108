// calendar.component.ts
import { Component, OnInit, Input } from '@angular/core';


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
  


  reservedDates: string[] = ['2024-02-10', '2024-02-15'];


  constructor() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  ngOnInit() {
    this.generateCalendar();
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
    
    // Proverite da li je datum već selektovan ili rezervisan pre nego što postavite kao selektovan.
    if (this.selectedDate === dateStr) {
      // Ako je datum već selektovan, možda ćete hteti da ništa ne radite ili da obavestite korisnika.
      this.selectedDate = '';
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
