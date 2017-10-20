<template>
  <div>
    <md-list>
        <md-list-item>
            <md-icon>whatshot</md-icon>
            <span>Saldo</span>
            <span>R${{saldo.saldo}} {{saldo.sinalSaldo}}</span>
        <md-list-expand>
            <md-list>
                <md-list-item>
                    <span>Saldo</span>
                    <span>R${{extrato.saldo.saldo | currency}}</span>
                    <md-divider></md-divider>
                </md-list-item>
                <md-list-item>
                    <span>Saldo Bloqueado</span>
                    <span>R${{extrato.saldo.saldoBloqueado | currency}}</span>
                    <md-divider></md-divider>
                </md-list-item>
                <md-list-item>
                    <span>Saldo Disponível Sem Limite</span>
                    <span>R${{extrato.saldo.saldoDisponivel | currency}}</span>
                    <md-divider></md-divider>
                </md-list-item>
                <md-list-item>
                    <span>Limite Cheque Especial</span>
                    <span>R${{extrato.saldo.limite | currency}}</span>
                    <md-divider></md-divider>
                </md-list-item>
                <md-list-item>
                    <span>Saldo Dispoível com Limite</span>
                    <span>R${{extrato.saldo.saldoDisponivelComLimite | currency}}</span>
                    <md-divider></md-divider>
                </md-list-item>
            </md-list>
        </md-list-expand>
        </md-list-item>
    </md-list>
    <md-card>
        <md-card-header>
            <div class="md-title">Movimento do Dia</div>
        </md-card-header>
        <md-card-content>
            <md-table>
                <md-table-header>
                    <md-table-row>
                        <md-table-head>Data Mov.</md-table-head>
                        <md-table-head>Histórico</md-table-head>
                        <md-table-head>Valor</md-table-head>
                    </md-table-row>
                </md-table-header>
                <md-table-body>
                    <md-table-row v-for="(item, index) in extrato.movimentacaoDia" :key="index">
                        <md-table-cell>{{item.dataMovimento}}</md-table-cell>
                        <md-table-cell>{{item.historico}}</md-table-cell>
                        <md-table-cell>{{item.valor | currency}}</md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
        </md-card-content>
    </md-card>
    <md-card>
        <md-card-header>
            <div class="md-title">Lançamentos Futuros</div>
        </md-card-header>
        <md-card-content>
            <md-table>
                <md-table-header>
                    <md-table-row>
                        <md-table-head>Data Mov.</md-table-head>
                        <md-table-head>Histórico</md-table-head>
                        <md-table-head>Valor</md-table-head>
                    </md-table-row>
                </md-table-header>
                <md-table-body>
                    <md-table-row v-for="(item, index) in extrato.lancamentosFuturos" :key="index">
                        <md-table-cell>{{item.dataMovimento}}</md-table-cell>
                        <md-table-cell>{{item.historico}}</md-table-cell>
                        <md-table-cell>{{item.valor | currency}}</md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
        </md-card-content>
    </md-card>
    <md-card>
        <md-card-header>
            <div class="md-title">Extrato</div>
        </md-card-header>
        <md-card-content>
            <md-table md-sort="dataMovimento" @sort="ordenaExtrato">
                <md-table-header>
                    <md-table-row>
                        <md-table-head md-sort-by="dataMovimento">Data Mov.</md-table-head>
                        <md-table-head md-sort-by="historico">Histórico</md-table-head>
                        <md-table-head md-sort-by="valor" md-numeric>Valor</md-table-head>
                    </md-table-row>
                </md-table-header>
                <md-table-body>
                    <md-table-row v-for="(item, index) in extrato.extrato" :key="index">
                        <md-table-cell>{{item.dataMovimento}}</md-table-cell>
                        <md-table-cell>{{item.historico}}</md-table-cell>
                        <md-table-cell md-numeric>
                            <span :class="{negative__number: item.valor < 0}">
                                {{item.valor | currency}}
                            </span>
                        </md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
        </md-card-content>
    </md-card>
      
  </div>
</template>
<script>
import filters from '../filters/filters'

export default {
  name: 'ListaMovimento',
  data() {
      return {
          
      }
  },
  methods: {
      ordenaExtrato(item) {
          let orderOperator = -1
          if(item.type === 'desc')
            orderOperator = 1
          this.extrato.extrato.sort((a, b) => {
                if(a[item.name] < b[item.name])
                    return -1 * orderOperator
                if(a[item.name] > b[item.name])
                    return 1 * orderOperator
                return 0
          })
      }
  },
  computed: {
      extrato() {
          return this.$store.state.movimentacaoContaCorrente   
      },
      saldo() {
          return this.$store.state.saldo
      },
      listaExtrato() {
          
      }

  },
  filters,
  mounted() {
      //this.$store.dispatch('UPDATE_ACCOUNT_TRANSACTIONS')
  }
}
</script>
<style scoped>
    .md-table-cell {
        /* font-size:.8em !important; */
    }
    .negative__number {
        color: red;
    }
</style>

