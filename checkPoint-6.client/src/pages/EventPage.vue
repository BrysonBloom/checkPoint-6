<template>
    <div class="component">


    </div>
</template>


<script>
import { onMounted, computed, ref } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { towerEventsService } from '../services/TowerEventsService'
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()

        async function getEventById() {
            try {
                const eventId = route.params.eventId
                await towerEventsService.getEventById(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {}
    }
}
</script>


<style lang="scss" scoped></style>