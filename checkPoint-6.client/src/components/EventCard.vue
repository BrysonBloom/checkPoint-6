<template>
    <router-link :to="{ name: 'TowerEvent', params: { eventId: towerEvent.id } }">

        <div class="selectable mt-3 text-light">
            <div class="card  " :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
                <div class="card-body p-0 d-flex align-items-end">
                    <div class=" glass-card p-3">
                        <h5 class="card-title">{{ towerEvent.name }}
                            <div v-if="towerEvent.isCanceled" class="btn btn-danger">
                                Cancelled
                            </div>
                            <div v-if="towerEvent.capacity == 0" class="btn btn-warning">
                                Sold Out
                            </div>
                        </h5>
                        <p class="card-text">{{ towerEvent.startDate.toLocaleDateString() }} {{ towerEvent.location }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </router-link>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent';

export default {
    props: {
        towerEvent: {
            type: TowerEvent,
            required: true
        }
    },
    setup() {

        return {


        }
    }
}
</script>


<style lang="scss" scoped>
.card {
    height: 20vh;
    background-position: center;
    background-size: cover;

    .glass-card {
        height: 10vh;
        background-color: rgba(0, 0, 0, 0.413);

    }
}
</style>