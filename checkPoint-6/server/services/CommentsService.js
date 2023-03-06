import { dbContext } from "../db/DbContext"
import { ticketsService } from "./TicketsService"

class CommentsService {
    async deleteComment(commentId) {
        const deletedComment = await dbContext.Comments.findByIdAndRemove(commentId)
        return deletedComment
    }
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator').populate('creator')
        return comments
    }
    async createComment(body) {
        // @ts-ignore
        if ((await ticketsService.getTickets(body.creatorId)).eventId === body.eventId) {
            body.isAttending = true
        } else {
            body.isAttending = false
        }
        const newComment = await dbContext.Comments.create(body)
        await newComment.populate('creator')
        return newComment
    }

}

export const commentsService = new CommentsService