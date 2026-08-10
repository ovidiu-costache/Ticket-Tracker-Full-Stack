import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TicketStats } from '../models/ticket.model';

@Component({
  selector: 'app-ticket-dashboard',
  imports: [],
  templateUrl: './ticket-dashboard.html',
  styleUrl: './ticket-dashboard.css',
})
export class TicketDashboard implements OnInit, OnDestroy {
  stats: TicketStats[] = []; 
  currentFilter: string | null = null;
  filterSub!: Subscription;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // load stats directly from API
    this.ticketService.getTicketStats().subscribe(data => { 
      console.log("Ce am primit de la C#: ", data);
      this.stats = data; 
      this.cdr.detectChanges();
    });

    this.filterSub = this.ticketService.currentFilter$.subscribe(filterValue => {
      this.currentFilter = filterValue;
    });
  }

  ngOnDestroy() {
    if (this.filterSub) this.filterSub.unsubscribe();
  }

  setFilter(status: string | null) {
    this.ticketService.updateFilter(status);
    this.router.navigate(['/tickets']);
  }
}
