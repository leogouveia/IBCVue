<template>
  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="loadingDialog">
      <md-dialog-title>Carregando</md-dialog-title>
      <md-dialog-content>
          teste
      </md-dialog-content>
  </md-dialog>
</template>
<script>
export default {
  name:'loading',
  methods: {
      openDialog(ref) {
          this.$refs[ref].open()
      }
  },
  mounted() {
      //this.openDialog('loadingDialog')
  }
}
</script>

