<template>
  <div>
    <md-toolbar>
        <md-button class="md-icon-button" @click="toggleLeftSidenav">
            <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title">Minha Caixa</h2>
        
        <!-- <md-button class="md-icon-button" @click="teste">
            <md-icon>email</md-icon>
        </md-button> -->
        <md-button class="md-icon-button" @click="logout">
            <md-icon md-src="/static/logout.svg"></md-icon>
        </md-button>
        </md-toolbar>
        <div v-if="isLoading">
            <md-progress md-indeterminate></md-progress>
        </div>
  </div>
</template>
<script>
import {eventBus} from '../store/store'
import axios from 'axios'
import Ibc from '../services/ibc'

export default {
  name: 'ToolBar',
  data() {
      return {
          tst2: ''
      }
  },
  methods: {
      toggleLeftSidenav() {
          eventBus.$emit('toggleLeftSidenav')
      },
      getDados() {
        //   this.$store.dispatch('UPDATE_USER')
        //   this.$store.dispatch('UPDATE_ACCOUNT')
          this.$store.dispatch('UPDATE_HOME_MOVIMENTOS_DATA')
      },
      teste() {
          let ibcService = new Ibc()
          ibcService.getExtrato()
            .then(res => {
                console.log(res)
            })
      },
      logout() {
          this.$router.push('/')
      }
  },
  computed: {
      isLoading() {
          return this.$store.state.isLoading
      }
  },
  mounted() {
      this.getDados()
  }
}
</script>
<style scoped>
h2.md-title {
    flex: 1;
}

</style>

