import { Component, OnInit, OnDestroy, Signal, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketService } from '../ticket.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { StatusLabelPipe } from '../status-label-pipe'; 
import { PriorityLabelPipe } from '../priority-label-pipe';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-ticket-detail',
  imports: [RouterLink, DatePipe, TitleCasePipe, StatusLabelPipe, PriorityLabelPipe],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css',
})
export class TicketDetail implements OnInit, OnDestroy {
  ticket: any;
  notFound = false;

  auditHistory: any[] = [];
  isLoadingAudit = signal<boolean>(true);
  auditSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    // ticketKey din URL
    const key = this.route.snapshot.paramMap.get('ticketKey');
    
    if (key) {
      this.ticketService.getTicketByKey(key).subscribe(data => {
        if (data) {
          this.ticket = data;
        } else {
          this.notFound = true;
        }
      });

      this.auditSubscription = this.ticketService.getAuditForTicket(key).pipe(
        // Se filtreaza cu map si .filter (ca in programarea functionala)
        map(list => list.filter(item => item.oldStatus !== item.newStatus))
      ).subscribe(filteredData => {
        this.auditHistory = filteredData;
        this.isLoadingAudit.set(false);
      });
    }
  }

  ngOnDestroy() {
    if (this.auditSubscription) {
      this.auditSubscription.unsubscribe();
    }
  }
}
