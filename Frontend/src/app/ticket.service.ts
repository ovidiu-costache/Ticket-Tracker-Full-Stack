import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets = [
    { id: 1, ticketKey: 'TK-101', title: 'Eroare de login', description: 'Nu ma pot loga', createdAt: new Date(), statusId: 1, priorityId: 3 },
    { id: 2, ticketKey: 'TK-1002', title: 'Buton stricat', description: 'Butonul de save nu merge', createdAt: new Date(), statusId: 1, priorityId: 2 },
    { id: 3, ticketKey: 'TK-103', title: 'Baza de date', description: 'Nu se incarca lista', createdAt: new Date(), statusId: 2, priorityId: 3 },
    { id: 4, ticketKey: 'TK-104', title: 'Interfata', description: 'Culoare gresita', createdAt: new Date(), statusId: 3, priorityId: 1 },
    { id: 5, ticketKey: 'TK-105', title: 'Pagina 404', description: 'Primesc eroare la accesarea profilului', createdAt: new Date(), statusId: 4, priorityId: 2 },
    { id: 6, ticketKey: 'TK-106', title: 'Export PDF', description: '?', createdAt: new Date(), statusId: 1, priorityId: 1 }
  ];

  // Daca e null nu are niciun filtru
  private currentFilterSubject = new BehaviorSubject<number | null>(null);

  // Observable public la care sa se poata abona oricine
  public currentFilter$ = this.currentFilterSubject.asObservable();

  constructor() {}

  getTickets(): Observable<any[]> {
    return of(this.tickets);
  }

  getTicketByKey(key: string): Observable<any> {
    const foundTicket = this.tickets.find(t => t.ticketKey === key);
    return of(foundTicket); 
  }

  addTicket(ticket: any) {
    this.tickets.push(ticket);
  }

  deleteTicket(id: number) {
    this.tickets = this.tickets.filter(t => t.id !== id);
  }

  getAuditForTicket(ticketKey: string): Observable<any[]> {
    const mockAudit = [
      { date: new Date('2026-07-21T11:03:21'), oldStatus: 1, newStatus: 1, comment: 'Modificare titlu' },
      { date: new Date('2026-07-26T09:00:01'), oldStatus: 1, newStatus: 2, comment: 'Trecere in progres' },
      { date: new Date('2026-08-01T13:11:20'), oldStatus: 2, newStatus: 3, comment: 'Finalizat' }
    ];

    return of(mockAudit).pipe(delay(500));
  }

  updateFilter(statusId: number | null) {
    this.currentFilterSubject.next(statusId);
  }

  // Cate tichete sunt in fiecare status
  getTicketCount(): Observable<any> {
    const counts = {
      todo: this.tickets.filter(t => t.statusId === 1).length,
      inProgress: this.tickets.filter(t => t.statusId === 2).length,
      inReview: this.tickets.filter(t => t.statusId === 3).length,
      done: this.tickets.filter(t => t.statusId == 4).length,
      total: this.tickets.length
    };

    return of(counts);
  }
}
