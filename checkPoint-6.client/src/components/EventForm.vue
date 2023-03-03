<template>
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">New Event</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent="createEvent()">
      <div class="modal-body">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input v-model="editable.name" required type="text" class="form-control" id="name" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="coverImg" class="form-label">coverImg</label>
          <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input v-model="editable.location" required type="text" class="form-control" id="coverImg"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input v-model="editable.description" required type="text" class="form-control" id="coverImg"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">Event Date</label>
          <input v-model="editable.startDate" required type="date" class="form-control" id="coverImg"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="capacity" class="form-label">Max Capacity</label>
          <input v-model="editable.capacity" required type="number" class="form-control" id="coverImg"
            aria-describedby="emailHelp">
        </div>
        <label for="type" class="form-label">Type</label>
        <select v-model="editable.type" class="form-select mb-3" aria-label="Default select example" id="category">
          <option selected value="convention">convention</option>
          <option value="sport">sport</option>
          <option value="digital">digital</option>
          <option value="concert">Concert</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Album</button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from 'vue';
import { towerEventsService } from '../services/TowerEventsService';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({
      category: 'misc'
    })
    return {
      editable,
      async createEvent() {
        try {
          const formData = editable.value
          await towerEventsService.createEvent(formData)
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>