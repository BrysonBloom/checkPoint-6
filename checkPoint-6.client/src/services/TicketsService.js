import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { Ticket } from "../models/Ticket"
class TicketsService {
    async getTicketHolders(eventId) {
        AppState.tickets = []
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.tickets = res.data.map(tickets => new Ticket(tickets))
    }
    async getMyTickets() {
        AppState.tickets = []
        const res = await api.get(`account/tickets`)
        AppState.tickets = res.data.map(tickets => new Ticket(tickets))
    }

    async createTicket(Id) {
        const res = await api.post(`api/tickets/`, { eventId: Id })
        AppState.tickets.push(new Ticket(res.data))

    }

    async deleteTicket(ticketId) {
        const res = await api.delete(`api/tickets/${ticketId}`)
        await this.getMyTickets()
    }
}

export const ticketsService = new TicketsService