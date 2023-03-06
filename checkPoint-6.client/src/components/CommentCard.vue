<template>
    <div class="card bg-info text-light">
        <div class="card-body">{{ comment.body }}</div>
    </div>
</template>


<script>
import { Comment } from '../models/Comment';

export default {
    props: {
        comment: {
            type: Comment,
            required: true,
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
    height: 15vh;
}
</style>