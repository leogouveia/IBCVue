<template>
  <form class="login__form">
    <div>
      <div class="form__logo">
        <img src="../assets/caixa.png" alt="Caixa">
      </div>

      <div class="form__inputs">
        <md-input-container>
          <md-icon>person</md-icon>
          <label>Usuário</label>
          <md-input placeholder="" v-model="usuario" required></md-input>
          <span class="md-warn" v-if="bUsuarioObrigatorio">Campo obrigatório</span>
        </md-input-container>

        <md-input-container>
          <md-icon>lock</md-icon>
          <label>Senha</label>
          <md-input type="password" placeholder="" v-model="senha" required></md-input>
          <span class="md-warn" v-if="bSenhaObrigatoria">Campo obrigatório</span>
        </md-input-container>

        <div>
          <md-radio v-model="tpConta" id="tp__conta_pf" name="my-test-group2" md-value="PF">Pessoa Física</md-radio>
          <md-radio v-model="tpConta" id="tp__conta_pj" name="my-test-group2" md-value="PJ">Pessoa Jurídica</md-radio>
        </div>
      </div>

      <div>
        <md-switch v-model="lembrarUsuario" id="my-test4" name="my-test4" class="md-accent">Lembrar Usuário</md-switch>
      </div>

      <div class="form__acessar">
        <md-button class="md-raised md-primary" @click="acessarConta">Acessar minha conta</md-button>
      </div>
    </div>

      <div class="form__footer">
        <md-button @click="openDialog('digitalDialog')">
          <md-icon class="md-size-3x">fingerprint</md-icon>
          <div>Acessar conta com digital</div>
        </md-button>
      </div>
      
      <md-theme md-name="default">
        <md-dialog md-open-form="#custom" md-close-to="#custom" ref="digitalDialog">
          <md-dialog-content>Posicione sua digital.</md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog('digitalDialog')">Cancelar</md-button>
            <md-button class="md-primary" @click="closeDialog('digitalDialog')">Ok</md-button>
          </md-dialog-actions>
        </md-dialog>
      </md-theme>

      <md-theme md-name="default">
        <md-dialog md-open-form="#custom" md-close-to="#custom" ref="erroLogin">
          <md-dialog-content>Senha ou usuário incorretos</md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog('erroLogin')">Ok</md-button>
          </md-dialog-actions>
        </md-dialog>
      </md-theme>
      
  </form>
</template>

<script>
import Ibc from '../services/ibc'

export default {
  name: 'Login',
  data () {
    return {
      usuario: '',
      senha: '',
      tpConta: 'PF',
      lembrarUsuario: false,
      ibcService: undefined,
      bSenhaObrigatoria: false,
      bUsuarioObrigatorio: false
    }
  }, 
  methods: {
    acessarConta() {

      this.bUsuarioObrigatorio = (this.usuario == '') ? true : false
      this.bSenhaObrigatoria = (this.senha == '') ? true : false

      if (this.bSenhaObrigatoria || this.bUsuarioObrigatorio)
        return

      if (this.lembrarUsuario) {
        localStorage.setItem('login', this.usuario)
        //localStorage.setItem('pass', this.senha)
        localStorage.setItem('tpConta', this.tpConta)
        localStorage.setItem('lembrarUsuario',this.lembrarUsuario)
      } else {
        localStorage.removeItem('login')
        localStorage.removeItem('tpConta')
        localStorage.removeItem('lembrarUsuario')
      }
      
      this.ibcService.login(this.usuario, this.senha, this.codSegmento)
        .then(res => {
          if(res.data.replace(/\r?\n|\r|\t/gm, '') == '<html><body></body></html>')
            this.$router.push('home')
          else 
            this.openDialog('erroLogin')
        })
        .catch(e => console.log(e))
    },
    openDialog(ref) {
      console.log(ref)
      this.$refs[ref].open()
    },
    closeDialog(ref) {
      this.$refs[ref].close()
    },
    onOpen() {
      // console.log('Open')
    }
  },
  computed: {
    codSegmento() {
      return this.tpConta === 'PF' ? 1 : 2
    }
  },
  created() {
    if(localStorage || localStorage.getItem('lembrarUsuario')) {
      this.usuario = localStorage.getItem('login')
      this.tpConta = localStorage.getItem('tpConta')
      this.lembrarUsuario = (localStorage.getItem('lembrarUsuario') == 'true')
    }
  },
  mounted() {
    this.$material.setCurrentTheme('cxLogin')
    this.ibcService = new Ibc()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $whitey: rgba(256, 256, 256, .8);
  
  * {
    margin: 0;
  }

  html, body {
    margin:0;
    padding:0;
    border:0;
    height:100%;
  }

  .login__form {
    display: flex;
    height:100vh;
    flex-direction: column;
    color: white;

    .form__logo {
      margin: 5vh auto;
      width: 50%;
    }

    .form__inputs {
      margin: 10vh auto;
      width: 80%;
    }

    .form__acessar {
      margin:5vh auto;
    }

    .form__footer {
      display: flex;
      flex-direction: column;
      margin-top: auto;
    }

    .md-warn {
      font-weight: bold;
      color: #ff9800;
    }
  }


  .login__form .md-input-container .md-icon:not(.md-icon-delete) {
    color: $whitey;
  }

  .login__form .md-input-container label {
    color:$whitey;
  }

  .login__form .md-input-container:after {
    background-color:$whitey;
  }

  .login__form .md-radio .md-radio-container, #tp__conta_pf {
    border: 2px solid #fff !important;
    color: #fff !important;
  }

  .login__form .md-input-container.md-has-value input, .md-input-container.md-has-value textarea {
    color:white;
  }
  
  
</style>
