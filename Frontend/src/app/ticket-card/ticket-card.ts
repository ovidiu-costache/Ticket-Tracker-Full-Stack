import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusLabelPipe } from '../status-label-pipe';
import { PriorityLabelPipe } from '../priority-label-pipe';

@Component({
  selector: 'app-ticket-card',
  imports: [DatePipe, TitleCasePipe, StatusLabelPipe, PriorityLabelPipe, RouterLink],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.css',
})
export class TicketCardComponent {
  @Input() ticket: any;
  @Output() deleteTicket = new EventEmitter<number>(); // ID numar

  removeTicket() {
    this.deleteTicket.emit(this.ticket.id);
  }
}
