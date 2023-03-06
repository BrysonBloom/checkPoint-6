import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
    }
    async deleteComment(req, res, next) {
        try {
            const deletedComment = await commentsService.deleteComment(req.params.commentId)
            res.send(deletedComment)
        } catch (error) {
            next(error);
        }
    }
    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.account.id
            const comment = await commentsService.createComment(req.body)
            res.send(comment)
        } catch (error) {
            next(error);
        }
    }
}