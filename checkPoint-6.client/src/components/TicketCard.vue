<template>
    <div class="component">
        <div class="card bg-info my-3" style="height: 10vh;">
            <div class="row">
                <div class="col-9">
                    <h2>{{ ticket.event.name }}</h2>
                </div>
                <div class="col-3"><button @click="deleteTicket(ticket.id)" class="btn btn-danger">Delete Ticket</button>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { Ticket } from '../models/Ticket';
import { ticketsService } from '../services/TicketsService';
import Pop from '../utils/Pop';
import { onMounted, computed, ref } from 'vue'

export default {
    props: {
        ticket:
        {
            type: Ticket,
            required: true
        }
    },
    setup() {
        onMounted(() => {

        })
        return {

            async deleteTicket(ticketId) {
                try {
                    if (await Pop.confirm(`Are you sure you want to delete this ticket?`)) {
                        await ticketsService.deleteTicket(ticketId)
                    }

                } catch (error) {
                    Pop.error(error)
                }

            }
        }
    }
}
</script>


<style lang="scss" scoped></style>