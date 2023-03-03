<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <nav class="navbar navbar-expand-lg justify-content-middle d-flex px-3 pe-4 sticky">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto">
              <li>

              </li>
            </ul>
            <!-- LOGIN COMPONENT HERE -->
            <Login />
          </div>
        </nav>
        <div v-if="account.id == route.params.accountId">

          <button v-if="account.id" class="btn btn-dark ms-2" data-bs-toggle="modal" data-bs-target="#eventModal">

            New Event
          </button>

        </div>
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
