import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider"
import { logger } from "../utils/Logger";


export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .get('', this.getTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)


    }
    getTickets(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }

    }
    async createTicket(req, res, next) {
        try {
            logger.log('create ticket')
            req.body.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket(req.body)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}