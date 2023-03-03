<template>
    <div class="component">
        <button v-if="account.id == route.params." class="btn btn-danger" @click="cancelEventById()">Cancel Event</button>

    </div>
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



        return {
            route,
            account: computed(() => AppState.account),

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