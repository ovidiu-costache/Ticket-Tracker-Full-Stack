// TicketDto
export interface Ticket {
    id: number;
    ticketKey: string;
    title: string;
    description: string;
    createdAt: string; 
    status: string;
    priority: string;
}

// CreateTicketDto
export interface CreateTicket {
    title: string;
    description: string;
    priorityId: number; // enum <=> number
}

// UpdateTicketDto
export interface UpdateTicket {
    title?: string;
    description?: string;
    statusId?: number;
    priorityId?: number;
}

// TicketStatsDto
export interface TicketStats {
    status: string;
    priority: string;
    totalTickets: number;
}

// TicketAuditDto
export interface TicketAudit {
    id: number;
    ticketId?: number | null; 
    ticketKey: string;
    ticketTitle: string;
    ticketDescription?: string | null;
    ticketModifiedAt: string;
    ticketModificationType: string;
    status: string;
    priority: string;
}
