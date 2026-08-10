import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Ticket, CreateTicket, UpdateTicket, TicketStats, TicketAudit } from './models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'https://localhost:7118/tickets';

  // Daca e null nu are niciun filtru
  private currentFilterSubject = new BehaviorSubject<number | null>(null);

  // Observable public la care sa se poata abona oricine
  public currentFilter$ = this.currentFilterSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicketByKey(key: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${key}`);
  }

  addTicket(ticket: CreateTicket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAuditForTicket(ticketKey: string): Observable<TicketAudit[]> {
    return this.http.get<TicketAudit[]>(`${this.apiUrl}/${ticketKey}/audit`);
  }

  updateFilter(statusId: number | null) {
    this.currentFilterSubject.next(statusId);
  }

  // Cate tichete sunt in fiecare status
  getTicketCount(): Observable<TicketStats[]> {
    return this.http.get<TicketStats[]>(`${this.apiUrl}/stats`);
  }
}
