import { dbContext } from "../db/DbContext"
import { towerEventsService } from "./EventsService"
import { logger } from "../utils/Logger";

class TicketsService {
    async createTicket(body) {
        const ticket = await dbContext.Tickets.create(body)
        logger.log(body)
        await ticket.populate("profile")
        const foundEvent = await towerEventsService.getEventById(body.eventId)
        // @ts-ignore
        foundEvent.capacity--
        foundEvent?.save()
        return ticket
    }

}

export const ticketsService = new TicketsService