import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SettlementsService } from './settlements.service';

@Component({
  selector: 'app-settlements',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.css']
})
export class SettlementsComponent implements OnInit {
  settlements: any[] = [];
  totalSettlements = 0;
  settlementsPerPage = 5;
  currentPage = 1;

  constructor(private settlementsService: SettlementsService) {}

  ngOnInit(): void {
    this.fetchSettlements();
  }

  fetchSettlements() {
    this.settlementsService.getSettlements(this.settlementsPerPage, this.currentPage)
      .subscribe((data: any) => {
        this.settlements = data.settlements;
        this.totalSettlements = data.totalCount;
      });
  }

  onPageChange(event: PageEvent) {
    this.settlementsPerPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.fetchSettlements();
  }
}
