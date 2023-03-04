<template>
    <!-- FIXME style indication that event is sold out of cancelled, you've already done it on your card, do the same logic here -->

    <!-- FIXME render all data from the active event on this page, use a v-if to see if the event is stored in the appstate -->
    <div class="component">
        <button class="btn btn-danger" @click="cancelEventById()">Cancel Event</button>

    </div>
    <!-- FIXME only show create ticket button if event is not sold out or cancelled -->
    <!-- FIXME render ticketholder data here with a v-for, make sure to show their name and image -->
    <!-- FIXME render comments here with a v-for, make sure you drill into the creator object on each comment to pull out their name and picture to display on the page -->
</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { towerEventsService } from '../services/TowerEventsService'
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()

        // FIXME write a function that will get your event by it's id using the route parameters

        // FIXME write a function that will get your comments for this event using the route parameters

        // FIXME write a function that will get the ticket holders for this event using the route parameters

        // FIXME set up something that will run all the requests that you need on this page (onMounted or watchEffect)

        return {
            route,
            account: computed(() => AppState.account),

            // FIXME write a computed that looks the tickets for this event, and tries to find a ticket with an accountId that matches the AppState.account.id (reference foundCollab from postIt). Use whatever computed property in a v-if to see if I should show the attend button

            // FIXME write a form that will create a comment for this event

            // FIXME write a function that will create a comment for this event

            // FIXME write a function that will delete a comment for this event

            // FIXME write a function that will create a ticket for this event, have an object formatted like {eventid: "some value here"}


            async cancelEventById() {
                try {
                    const eventId = route.params.eventId
                    await towerEventsService.cancelEventById(eventId)
                    logger.log(eventId)
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>