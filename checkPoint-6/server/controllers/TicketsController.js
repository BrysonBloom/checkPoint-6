import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider"


export class TicketsConroller extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .post('', this.createTicket)
            .use(Auth0Provider.getAuthorizedUserInfo)

    }
    async createTicket(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket(req.body)
            res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}