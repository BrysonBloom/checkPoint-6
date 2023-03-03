<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown dropstart my-2 my-lg-0">
        <div type="button" class="text-light fs-2 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="mdi mdi-menu"></i>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                <div v-if="account.picture || user.picture">
                  <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
                </div>

              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
            <div class="list-group-item dropdown-item list-group-item-action">
              <router-link :to="{ name: 'Home' }">
                <i class="mdi mdi-home"></i>
                Home

              </router-link>

            </div>
            <div class="list-group-item dropdown-item list-group-item-action">
              <router-link :to="{ name: 'Profile', params: { accountId: user.id } }">

                My Stuff

              </router-link>

            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { Account } from '../models/Account'
import { AuthService } from '../services/AuthService'

export default {
  props: { account: { type: Account, required: true } },
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
