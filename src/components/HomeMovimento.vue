<template>
  <div>
    <md-tabs md-centered>
        <md-tab md-label="conta corrente" md-icon="payment" md-active>
          <lista-movimento v-if="showMovimento"/>
        </md-tab>
        <md-tab md-label="poupança integrada" md-icon="attach_money">
          <p>Poupança</p>
        </md-tab>
    </md-tabs>
  </div>
</template>
<script>
import ListaMovimento from '@/components/ListaMovimento'

export default {
  name: 'HomeMovimento',
  components: {
    ListaMovimento
  },
  computed: {
    showMovimento() {
      return this.$store.state.movimentacaoContaCorrente.extrato.length
    }
  },
  mounted() {
    this.$store.dispatch('UPDATE_ACCOUNT_TRANSACTIONS')
  }
}
</script>
<style scoped>
  .md-bottom-bar {
    margin-bottom: auto;
  }
</style>

