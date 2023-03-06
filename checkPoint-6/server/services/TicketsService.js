import { dbContext } from "../db/DbContext"
import { towerEventsService } from "./EventsService"
import { logger } from "../utils/Logger";

class TicketsService {
    async deleteTicket(id) {
        const foundTicket = await dbContext.Tickets.findById(id)

        // @ts-ignore
        const foundEvent = await towerEventsService.getEventById(foundTicket.eventId)

        // @ts-ignore
        await foundTicket.remove()
        // @ts-ignore
        foundEvent.capacity++
        // @ts-ignore
        foundEvent.save()
        return foundTicket
    }
    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile event')
        return tickets

    }
    async getTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate("profile event")
        return tickets
    }
    async createTicket(body) {
        const ticket = await dbContext.Tickets.create(body)
        await ticket.populate("profile")
        logger.log(body)

        const foundEvent = await towerEventsService.getEventById(body.eventId)
        // @ts-ignore
        foundEvent.capacity--
        // @ts-ignore
        foundEvent.save()
        return ticket
    }

}

export const ticketsService = new TicketsService