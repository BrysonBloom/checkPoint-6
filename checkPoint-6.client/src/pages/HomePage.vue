<template>
  <div v-if="towerEvent" class="container-fluid">
    <div class="row">
      <div class="col-12 bg-dark"><img class="p-3" alt="logo" src="Public/Logo.png" height="60" /></div>
    </div>
    <div class="col-10 m-auto">
      <div class="bg-info rounded p-3 d-flex justify-content-around">
        <button @click="changeFilterCategory('')" class="btn btn-outline-light">All</button>
        <button @click="changeFilterCategory('concert')" class="btn btn-outline-light">Conserts</button>
        <button @click="changeFilterCategory('digital')" class="btn btn-outline-light">digital</button>
        <button @click="changeFilterCategory('sport')" class="btn btn-outline-light">Sports</button>
        <button @click="changeFilterCategory('convention')" class="btn btn-outline-light">Conventions</button>
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="e in towerEvent">
        <EventCard :towerEvent="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { towerEventsService } from '../services/TowerEventsService'
import EventCard from '../components/EventCard.vue'

export default {
  setup() {
    const filterCategory = ref('')
    async function getAllEvents() {
      try {
        logger.log('Getting all events')
        await towerEventsService.getAllEvents()
        logger.log('all events gotten')

      } catch (error) {

      }
    }
    onMounted(() => {
      getAllEvents()
    })
    return {
      towerEvent: computed(() => {
        if (!filterCategory.value) {
          return AppState.towerEvents
        }
        else {
          return AppState.towerEvents.filter(a => a.type == filterCategory.value)
        }

      }),
      changeFilterCategory(category) {
        filterCategory.value = category
      }
    }

  }
}
</script>

<style scoped lang="scss"></style>
