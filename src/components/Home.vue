<template>
  <div>
    <tool-bar/>
    <sidenav/>
    <home-movimento/>
  </div>
</template>

<script>
import HomeMovimento from '@/components/HomeMovimento'
import ToolBar from '@/components/ToolBar'
import Sidenav from '@/components/Sidenav'

export default {
  name: 'Home',
  components: {
    HomeMovimento,
    ToolBar,
    Sidenav
  },
  data () {
    return {
      msg: ''
    }
  }, 
  methods: {
  },
  created() {
    
    this.$material.setCurrentTheme('default')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2.md-title {
  flex: 1
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
