<template>
  <div id="app" class="container">
    
    <router-view/>
    
    <loading/>
  </div>
</template>

<script>
import Loading from './components/Loading'

export default {
  name: 'app',
  data() {
    return {
      toggle: Function
    }
  },
  methods: {
    
  },
  components: {
    Loading
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
