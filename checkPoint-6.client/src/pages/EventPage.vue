<template>
    <!-- FIXME style indication that event is sold out of cancelled, you've already done it on your card, do the same logic here -->

    <!-- FIXME render all data from the active event on this page, use a v-if to see if the event is stored in the appstate -->
    <div v-if="towerEvent" class="container-fluid bg dark">
        <div class="row">
            <div class="col-10 m-auto">
                <div class="card event-pic" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-9 m-auto">
                <p class="about-card">{{ towerEvent.description }}</p>
            </div>
        </div>
        <div v-if="comment.id" class="row">
            <div v-for="c in comment" class="col-8 m-auto py-2">
                <CommentCard :comment="c" />
            </div>
        </div>





        <button class="btn btn-danger" @click="cancelEventById()">Cancel Event</button>

    </div>
    <!-- FIXME only show create ticket button if event is not sold out or cancelled -->
    <!-- FIXME render ticketholder data here with a v-for, make sure to show their name and image -->
    <!-- FIXME render comments here with a v-for, make sure you drill into the creator object on each comment to pull out their name and picture to display on the page -->
</template>


<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { towerEventsService } from '../services/TowerEventsService'
import { commentsService } from '../services/CommentsService'
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import CommentCard from '../components/CommentCard.vue'

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()


        // FIXME write a function that will get the ticket holders for this event using the route parameters


        onMounted(() => {
            getEventById()
            getEventComments()
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

        return {
            route,
            account: computed(() => AppState.account),
            towerEvent: computed(() => AppState.towerEvent),
            comment: computed(() => AppState.comments),

            // FIXME write a computed that looks the tickets for this event, and tries to find a ticket with an accountId that matches the AppState.account.id (reference foundCollab from postIt). Use whatever computed property in a v-if to see if I should show the attend button

            // FIXME write a form that will create a comment for this event

            // FIXME write a function that will create a comment for this event

            // FIXME write a function that will delete a comment for this event

            // FIXME write a function that will create a ticket for this event, have an object formatted like {eventid: "some value here"}


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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);



}
</style>