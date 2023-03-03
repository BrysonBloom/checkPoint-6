import { dbContext } from "../db/DbContext"

class TicketsService {
    async createTicket(body) {
        const ticket = await dbContext.Tickets.create(body)
        await ticket.populate("profile")
        return ticket
    }

}

export const ticketsService = new TicketsService