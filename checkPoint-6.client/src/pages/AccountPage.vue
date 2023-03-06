<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row">
    <div v-if="myEvents" class="col-3" v-for="e in myEvents">
      <EventCard :towerEvent="e" />
    </div>
  </div>
  <button class="btn btn-dark ms-2" data-bs-toggle="modal" data-bs-target="#eventModal">
    New Event
  </button>
  <div class="row">
    <div v-if="myTickets" class="col-8 m-auto" v-for="e in myTickets">
      <TicketCard :ticket="e" />
    </div>
  </div>
  <!-- FIXME v-for over the tickets and display the event information here, have a button that will delete the ticket on these components -->
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import EventCard from '../components/EventCard.vue'
import TicketCard from '../components/TicketCard.vue'
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    onMounted(() => {
      getMyTickets()
    })

    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        Pop.error(error)
      }
    }
    // FIXME write a function that will get all of the events that I have tickets to
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.tickets),
      myEvents: computed(() => AppState.towerEvents.find(t => t.creatorId == AppState.account.id)),




    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
