import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { Comment } from "../models/Comment"
import Pop from "../utils/Pop"
class CommentsService {
    async getEventComments(eventId) {
        AppState.comments = []
        const res = await api.get(`/api/events/${eventId}/comments`)
        AppState.comments = res.data.reverse().map(comment => new Comment(comment))
    }

    async postComment(formData, EID) {
        formData.eventId = EID
        const comment = new Comment(formData)
        const res = await api.post(`/api/comments`, formData)
    }


    async deleteComment(commentId, eventId) {

        const res = await api.delete(`/api/comments/${commentId}`)
        this.getEventComments(eventId)



    }
}

export const commentsService = new CommentsService