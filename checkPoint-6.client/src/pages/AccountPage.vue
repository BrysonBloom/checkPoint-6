<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <!-- FIXME v-for over the tickets and display the event information here, have a button that will delete the ticket on these components -->
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {

    // FIXME write a function that will get all of the events that I have tickets to
    return {
      account: computed(() => AppState.account)
      // FIXME write a function that will delete a ticket for this event, you will need to pass down the ticket id to your service for this

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
