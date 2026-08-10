import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-dashboard',
  imports: [],
  templateUrl: './ticket-dashboard.html',
  styleUrl: './ticket-dashboard.css',
})
export class TicketDashboard implements OnInit {
  counts: any = {};

  // Ce filtru e selectat acum
  currentFilter: number | null = null;
  filterSub!: Subscription;

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ticketService.getTicketCount().subscribe(data => {this.counts = data});

    this.filterSub = this.ticketService.currentFilter$.subscribe(filterValue => {this.currentFilter = filterValue;});
  }

  setFilter(statusId: number | null) {
    this.ticketService.updateFilter(statusId);
    this.router.navigate(['/tickets']);
  }
}
