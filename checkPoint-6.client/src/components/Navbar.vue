<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">

        <!-- LOGIN COMPONENT HERE -->
        <Login />
      </div>
      <div v-if="route.params == '/#/account'">



      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed } from 'vue';
export default {
  setup() {
    const route = useRoute()

    return {
      route,
      account: computed(() => AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
