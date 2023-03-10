import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketsService } from '../services/TicketsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getTickets)
  }
  async getTickets(req, res, next) {
    try {
      let accountId = req.userInfo.id
      const tickets = await ticketsService.getTickets(accountId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }

  }

  // FIXME write method to get account tickets here, use the req.userInfo to pull the logged user's id, and send that down to service to use in your filter object
  // FIXME reference getAlbumsThatIAmACollaboratorOn in postIt

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
