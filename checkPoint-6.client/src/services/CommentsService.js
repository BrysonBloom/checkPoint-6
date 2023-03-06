import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { Comment } from "../models/Comment"
class CommentsService {
    async getEventComments(eventId) {
        AppState.comments = []
        const res = await api.get(`/api/events/${eventId}/comments`)
        AppState.comments = res.data.reverse().map(comment => new Comment(comment))
    }
}

export const commentsService = new CommentsService