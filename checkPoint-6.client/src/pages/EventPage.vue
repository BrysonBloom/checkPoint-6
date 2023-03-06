<template>
    <div v-if="towerEvent" class="container-fluid bg dark">
        <div class="row">
            <div class="col-10 m-auto">
                <div class="card event-pic" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-9 m-auto about-card">
                <h5 class="card-title">{{ towerEvent.name }}
                    <div v-if="towerEvent.isCanceled" class="btn btn-danger">
                        Cancelled
                    </div>
                    <div v-if="towerEvent.capacity == 0" class="btn btn-warning">
                        Sold Out
                    </div>
                </h5>
                <p class="">description: {{ towerEvent.description }}</p>
                <p>location: {{ towerEvent.location }}</p>
                <p>: tickets remaining: {{ towerEvent.capacity }}</p>
                <p>Time of event: {{ towerEvent.startDate.toLocaleDateString() }}</p>
                <button v-if="!participating && towerEvent.capacity >= 1 && !towerEvent.isCanceled" @click="createTicket()"
                    class="btn btn-info">Participate</button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div v-if="participants[0]" class="card bg-info">
                    <div class="card-body">
                        <div class="row">
                            <div v-for="p in participants" class="col-1">
                                <img class="rounded-circle participant" :title="p.profile.name" :src="p.profile.picture"
                                    alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="input-group mb-3">
            <form class="m-auto pt-5" style="width: 80vw;" @submit.prevent="postComment()">
                <div class="input-group mb-3">
                    <input v-model="editable.body" type="text" class="form-control" placeholder="Write a comment"
                        aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="button submit" id="button-addon2">Comment</button>
                </div>
            </form>

        </div>
        <div v-if="comment" class="row">
            <div v-for="c in comment" class="col-8 m-auto py-3">
                <CommentCard :comment="c" />
            </div>
        </div>





        <button v-if="account.id == towerEvent.creatorId" class="btn btn-danger" @click="cancelEventById()">Cancel
            Event</button>

    </div>
</template>


<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { towerEventsService } from '../services/TowerEventsService'
import { commentsService } from '../services/CommentsService'
import { ticketsService } from '../services/TicketsService'
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import CommentCard from '../components/CommentCard.vue'

export default {
    setup() {
        const editable = ref({
            category: 'misc'
        })
        const route = useRoute()
        const router = useRouter()



        onMounted(() => {
            getEventById()
            getEventComments()
            getTicketHolders()
        })

        async function getEventById() {
            try {
                const eventId = route.params.eventId
                await towerEventsService.getEventById(eventId)
                // logger.log(eventId)

            } catch (error) {
                Pop.error(error)
            }
        }
        async function getEventComments() {
            try {
                const eventId = route.params.eventId
                await commentsService.getEventComments(eventId)
                // logger.log(eventId)

            } catch (error) {
                Pop.error(error)
            }
        }
        async function getTicketHolders() {
            try {
                const eventId = route.params.eventId
                await ticketsService.getTicketHolders(eventId)
            } catch (error) {
                Pop.error(error)
            }

        }

        return {
            route,
            editable,
            account: computed(() => AppState.account),
            towerEvent: computed(() => AppState.towerEvent),
            comment: computed(() => AppState.comments),
            participants: computed(() => AppState.tickets),
            participating: computed(() => AppState.tickets.find(t => t.profile.id == AppState.account.id)),


            async createTicket() {
                const eventId = route.params.eventId
                await ticketsService.createTicket(eventId)
            },

            async cancelEventById() {
                try {
                    const eventId = route.params.eventId
                    await towerEventsService.cancelEventById(eventId)
                    Pop.success('Event canceled successfully')
                } catch (error) {
                    Pop.error(error)
                }
            },
            async getEventById() {
                try {
                    const eventId = route.params.eventId
                    await towerEventsService.getEventById(eventId)
                    // logger.log(eventId)

                } catch (error) {
                    Pop.error(error)
                }
            },

            async postComment() {
                try {
                    const formData = editable.value
                    logger.log(formData)
                    const EID = route.params.eventId
                    await commentsService.postComment(formData, EID)
                    editable.value = {}
                    await getEventComments()
                } catch (error) {
                    Pop.error(error)
                }
            }


        }

    }
}
</script>


<style lang="scss" scoped>
.event-pic {
    height: 40vh;
    object-fit: cover;
    object-position: center;
    filter: blur(8px);
    -webkit-filter: blur(8px);
}

.about-card {
    background-color: rgba(47, 31, 71, 0.582);
    width: auto;
    z-index: 3;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);

    .participant {
        height: 20px;
        width: 20px;
    }

}
</style>