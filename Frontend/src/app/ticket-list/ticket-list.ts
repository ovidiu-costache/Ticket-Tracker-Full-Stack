import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TicketCardComponent } from "../ticket-card/ticket-card";
import { TicketService } from '../ticket.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CreateTicket } from '../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketCardComponent, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList implements OnInit {
  tickets: any[] = [];
  searchText = ''; // Ramane ngModel pt search
  
  // Formularul FormGroup si campurile FormControl
  ticketForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)  
    ]),
    description: new FormControl('', [
      Validators.maxLength(1000)
    ]),
    priorityId: new FormControl(1, [
      Validators.required,
      Validators.pattern('^[1-3]$') // Ca sa accepte doar 1, 2 sau 3
    ])
  });

  currentStatusFilter: number | null = null;
  filterSub!: Subscription;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.loadTickets();

    this.filterSub = this.ticketService.currentFilter$.subscribe(filterValue => {
      this.currentStatusFilter = filterValue;
    });
  }

  ngOnDestroy() {
    if (this.filterSub) {
      this.filterSub.unsubscribe();
    }
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe((data) => {
      this.tickets = data;
    });
  }

  get filteredTickets() {
    let result = this.tickets;

    if (this.currentStatusFilter !== null) {
      result = result.filter(t => t.statusId === this.currentStatusFilter);
    }

    if (this.searchText == '') {
      return result;
    }
  
    return result.filter(ticket => ticket.title.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  // Refactor
  addTicket() {
    if (this.ticketForm.valid) {
      // CreateTicketDto
      const newTicket: CreateTicket = {
        title: this.ticketForm.value.title ?? '',
        description: this.ticketForm.value.description ?? '',
        priorityId: Number(this.ticketForm.value.priorityId)
      };

      this.ticketService.addTicket(newTicket).subscribe(() => {
        this.loadTickets();
       this.ticketForm.reset({ title: '', description: '', priorityId: 1 }); // Clean
      });
    }
  }

  clearList() {
    this.tickets = [];
  }

  // Redundant, pentru testare
  populateList() {
    this.loadTickets();
  }

  removeTicketFromList(id: number) {
    // http calls are not executed without subscribing
    this.ticketService.deleteTicket(id).subscribe(() => {
      this.loadTickets();
    });
  }
}
