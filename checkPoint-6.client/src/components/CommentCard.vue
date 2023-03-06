<template>
    <div class="card bg-info text-light">
        <div class="row">
            <div class="col-10">
                <span>
                    <div><img class="prof-img rounded-circle" :src="comment.creator.picture" alt=""></div>
                    <div class="px-2">{{ comment.creator.name }}</div>
                </span>
                <span>
                    <div class="card-body">{{ comment.body }}</div>
                </span>

            </div>
            <div @click="deleteComment(comment.id)" v-if="user.id == comment.creatorId" class="col-2">
                <button class="btn btn-danger">Delete Comment</button>
            </div>
        </div>
    </div>
</template>


<script>
import { Comment } from '../models/Comment';
import { computed } from 'vue'
import { AppState } from '../AppState';
import { commentsService } from '../services/CommentsService';
import Pop from '../utils/Pop';

export default {
    props: {
        comment: {
            type: Comment,
            required: true,
        }
    },

    setup() {
        return {

            user: computed(() => AppState.account),



            async deleteComment(commentId) {
                try {
                    let eventId = AppState.towerEvent.id
                    await commentsService.deleteComment(commentId, eventId)
                } catch (error) {
                    Pop.error(error)
                }

            }

        }
    }
}
</script>


<style lang="scss" scoped>
.card {
    height: 20vh;
}

.prof-img {
    height: 5em;
    width: 5em;
    object-fit: cover;
}
</style>