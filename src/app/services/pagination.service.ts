import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private currentPageSubject = new BehaviorSubject<number>(1);
  public currentPage$ = this.currentPageSubject.asObservable();

  constructor() {}

  changePage(page: number): void {
    this.currentPageSubject.next(page);
  }

  getCurrentPage(): number {
    return this.currentPageSubject.getValue();
  }
} 
