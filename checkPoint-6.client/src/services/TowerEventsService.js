import { AppState } from "../AppState";
import { TowerEvent } from "../models/TowerEvent";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class TowerEventsService {
    async getAllEvents() {
        // logger.log("TowerEventsService.getAllEvents");

        const res = await api.get('api/events');
        logger.log(res.data);

        let towerEvents = res.data.map(event => new TowerEvent(event));
        // logger.log(towerEvents);


        AppState.towerEvents = towerEvents
        logger.log(AppState.towerEvents[1].id)


    }

}

export const towerEventsService = new TowerEventsService();