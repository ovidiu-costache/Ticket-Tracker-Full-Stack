import { Routes } from '@angular/router';
import { TicketList } from './ticket-list/ticket-list';
import { TicketDetail } from './ticket-detail/ticket-detail';
import { TicketDashboard } from './ticket-dashboard/ticket-dashboard';

export const routes: Routes = [
    { path: '', component: TicketDashboard }, // Este acum in /
    { path: 'tickets', component: TicketList }, // Lista principala
    { path: 'tickets/:ticketKey', component: TicketDetail }
];
