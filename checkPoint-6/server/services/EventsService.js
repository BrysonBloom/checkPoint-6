import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class TowerEventsService {
    async cancelEvent(eventId, requestorId) {
        const foundEvent = await this.getEventById(eventId);
        if (!foundEvent) {
            throw new BadRequest("Event not found");
        } else if (foundEvent.creatorId.toString() !== requestorId) {
            throw new Forbidden("Not authorized");
        }
        foundEvent.isCanceled = true;
        await foundEvent.save();
        return foundEvent;


    }
    async updateEvent(eventId, eventUpdate) {
        const foundEvent = await this.getEventById(eventId);
        if (!foundEvent || foundEvent.isCanceled) {

            throw new BadRequest("Event not found");

        }
        foundEvent.name = eventUpdate.name || foundEvent.name;
        foundEvent.type = eventUpdate.type || foundEvent.type;
        foundEvent.description = eventUpdate.description || foundEvent.description;
        foundEvent.startDate = eventUpdate.startDate || foundEvent.startDate;
        foundEvent.coverImg = eventUpdate.coverImg || foundEvent.coverImg;
        await foundEvent.save();
        return foundEvent;


    }
    async getEventById(eventId) {
        const towerEvent = await dbContext.TowerEvents.findById(eventId).populate('creator')
        return towerEvent;
    }
    async createEvent(body) {
        const towerEvent = await dbContext.TowerEvents.create(body);
        await towerEvent.populate("creator attendeeCount");
        return towerEvent;
    }
    async getAllEvents() {
        const towerEvents = await dbContext.TowerEvents.find();
        return towerEvents;
    }

}

export const towerEventsService = new TowerEventsService;