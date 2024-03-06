import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { RoomService } from '../../services/room.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number = 0;
  public totalPages = 5;
  @Output() pageChanged = new EventEmitter<number>();

  pages: number[] = [];
  private numberOfPagesSub: Subscription = new Subscription();

  constructor(private paginationService: PaginationService, private roomService: RoomService){
  }

  ngOnInit(): void {
    this.numberOfPagesSub = this.roomService.numberOfPages$.subscribe(totalPages => {
      this.totalPages = totalPages;
      this.calculatePages();
    });
    this.paginationService.currentPage$.subscribe(page => {
      this.changePage(page);
    });
  }

  ngOnChanges(): void {
    this.calculatePages();
  }

  calculatePages(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if(page >= 1 && page <= this.pages.length && page !== this.currentPage) {
      this.currentPage = page;
      this.paginationService.changePage(page);
      this.pageChanged.emit(this.currentPage);
    }
  }
}
