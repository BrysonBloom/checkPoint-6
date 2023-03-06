import BaseController from '../utils/BaseController.js'
import { towerEventsService } from '../services/EventsService.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from '../services/TicketsService.js'
import { commentsService } from '../services/CommentsService.js'

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/comments', this.getEventComments)
            .put('/:eventId', this.updateEvent)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .delete('/:eventId', this.cancelEvent)

        // FIXME write out method to get comments for an event here, reference getPicturesInAlbum in postIt (album controller)
    }
    async getEventComments(req, res, next) {
        try {
            const eventId = req.params.eventId
            const comments = await commentsService.getEventComments(eventId)
            res.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async getEventTickets(req, res, next) {
        const eventId = req.params.eventId
        const tickets = await ticketsService.getEventTickets(eventId)
        res.send(tickets)
    }



    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const requestorId = req.userInfo.id
            const canceledEvent = await towerEventsService.cancelEvent(eventId, requestorId)
            res.send(canceledEvent)

        } catch (error) {
            next(error)
        }
    }
    async updateEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const eventUpdate = req.body
            const updatedEvent = await towerEventsService.updateEvent(eventId, eventUpdate)
            res.send(updatedEvent)

        } catch (error) {
            next(error)

        }
    }

    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const event = await towerEventsService.getEventById(eventId)
            res.send(event)
        } catch (error) {
            next(error)
        }

    }
    async createEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await towerEventsService.createEvent(req.body)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getAllEvents(req, res, next) {
        try {
            const events = await towerEventsService.getAllEvents()
            res.send(events)
        } catch (error) {
            next(error)
        }

    }
}
