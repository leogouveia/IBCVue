<template>
    <div>
        <md-sidenav class="md-left" :md-swipeable="true" ref="leftSidenav">
            <div class="md-toolbar-container">
            <md-toolbar class="md-large">
                    <md-layout md-align="center">
                        <md-layout md-flex-xmall="30" md-flex-small="30" md-flex-medium="30">
                            <md-avatar class="md-large">
                                <img src="../assets/avatar.jpg" alt="People">
                            </md-avatar>
                        </md-layout>

                        <md-layout md-flex-xsmall="70" md-flex-small="70" md-flex-medium="70">
                            {{usuario.nome}} <br>
                            {{conta.nome}} <br>
                            {{conta.agencia}} {{conta.tipo}} {{conta.conta}}
                        </md-layout>
                    </md-layout>
                </md-toolbar>
            </div>
            <div class="div teste">
                <md-list>
                    <md-list-item>
                        <router-link to="/home">
                            <md-icon>list</md-icon><span>Movimentações</span>
                        </router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/pagamentos">
                            <md-icon>subtitles</md-icon> <span>Pagamentos</span>
                        </router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/transferencias">
                            <md-icon>swap_horiz</md-icon> <span>Transferências</span>
                        </router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="emprestimos">
                            <md-icon>shopping_basket</md-icon> <span>Empréstimos</span>
                        </router-link>
                    </md-list-item>
                    <md-list-item>
                        <router-link to="/aplicacoes">
                            <md-icon>trending_up</md-icon> <span>Aplicações</span>
                        </router-link>
                    </md-list-item>

                    <md-list-item>
                        <router-link to="/mensagens">
                            <md-icon>email</md-icon> <span>Mensagens</span>
                        </router-link>
                        
                    </md-list-item>

                    <md-list-item>
                        <router-link to="/suporte">
                            <md-icon>speaker_notes</md-icon> <span>Suporte</span>
                        </router-link>
                    </md-list-item>

                    <md-list-item>
                        <router-link to="/ache-caixa">
                            <md-icon>map</md-icon> <span>Ache a Caixa</span>
                        </router-link>
                        
                    </md-list-item>
                    
                </md-list>
            </div>
        </md-sidenav>

    </div>
</template>
<script>
import {eventBus} from '../store/store'
import {mapGetters} from 'vuex'

export default {
  name: 'Sidenav',
  data() {
      return {
          
      }
  },
  methods: {
  },
  computed: {
      ...mapGetters([]),
      conta() {
          return this.$store.state.conta
      },
      usuario() {
          return this.$store.state.usuario
      }
  },
  created() {
      eventBus.$on('toggleLeftSidenav', () => {
          this.$refs.leftSidenav.toggle()
      })
  }
}
</script>

