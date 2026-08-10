import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Ticket, CreateTicket, TicketStats, TicketAudit } from './models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'https://localhost:7118/tickets';

  // null means no filter is applied
  private currentFilterSubject = new BehaviorSubject<string | null>(null);
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

  // update dashboard filter
  updateFilter(status: string | null) {
    this.currentFilterSubject.next(status);
  }

  getTicketStats(): Observable<TicketStats[]> {
    return this.http.get<TicketStats[]>(`${this.apiUrl}/stats`);
  }
}
