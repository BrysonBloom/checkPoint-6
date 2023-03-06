import { AppState } from "../AppState";
import { TowerEvent } from "../models/TowerEvent";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class TowerEventsService {
    async getAllEvents() {
        const res = await api.get('api/events');
        logger.log(res.data);
        let towerEvents = res.data.reverse().map(event => new TowerEvent(event))
        AppState.towerEvents = towerEvents
    }

    async getEventById(eventId) {
        AppState.towerEvent = null
        const res = await api.get('api/events/' + eventId)
        AppState.towerEvent = new TowerEvent(res.data)
    }

    async createEvent(formData) {
        const res = await api.post('api/events', formData)
        logger.log(res.data)
        return res.data

    }

    async cancelEventById(eventId) {
        const res = await api.delete('api/events/' + eventId)
    }


}

export const towerEventsService = new TowerEventsService();