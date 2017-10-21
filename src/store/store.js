import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Ibc from '../services/ibc'

Vue.use(Vuex)

const eventBus = new Vue()

const store = new Vuex.Store({
    state: {
        isLoading: true,
        contas: {},
        conta: {},
        usuario: {},
        saldo: {},
        movimentacaoContaCorrente: {
            saldo: {},
            extrato: [],
            lancamentosFuturos: [],
            movimentacaoDia: [],
            informacoesChequeEspecial: {}
        }
    },
    getters: {

    },
    mutations: {
        STOP_LOADING: state => state.isLoading = false,
        START_LOADING: state => state.isLoading = true,
        SET_USER: (state, payload) => {state.usuario = payload.usuario},
        SET_ACCOUNT: (state, payload) => state.conta = payload.conta,
        SET_BALANCE: (state, payload) => state.saldo = payload.saldo,
        SET_ACCOUNT_TRANSACTIONS: (state, payload) => state.movimentacaoContaCorrente = payload,
        RESET_DATA: (state) => {
            state.contas = {}
            state.conta = {}
            state.usuario = {}
            state.saldo = {}
            state.movimentacaoContaCorrente = {
                saldo: {},
                extrato: [],
                lancamentosFuturos: [],
                movimentacaoDia: [],
                informacoesChequeEspecial: {}
            }
        }
        
    },
    actions: {
        UPDATE_HOME_MOVIMENTOS_DATA: ({commit}) => {
            commit('START_LOADING')
            Ibc.getUsuario().then((r) => {
                commit('SET_USER', {usuario: r})
                return Ibc.getConta()
            }).then((r) => {
                commit('SET_ACCOUNT', {conta: r}) 
                return Ibc.getSaldo()
            }).then((r) => {
                commit('SET_BALANCE', {saldo: r})
                commit('SET_ACCOUNT_TRANSACTIONS', {
                    saldo: {
                        saldo: 200,
                        limite: 5000,
                        saldoBloqueado: 10,
                        saldoDisponivel: 190,
                        saldoDisponivelComLimite: 5190
                    },
                    lancamentosFuturos: [
                        {
                            dataMovimento: '20/10/2017',
                            historico: 'Deb. Funcef',
                            valor: 500
                        },
                        {
                            dataMovimento: '01/11/2017',
                            historico: 'Juros Prov',
                            valor: 1
                        },
                        {
                            dataMovimento: '01/11/2017',
                            historico: 'IOC Prov',
                            valor: 0.50
                        }
                    ],
                    informacoesChequeEspecial: {
                        taxaJurosMensalNormal: 13.55,
                        taxaJurosMensalDesconto: 12.18,
                        taxaJurosMensalFinal: 11.90,
                        taxaJurosAnual: 285.44,
                        iofAliqBasica: 0.0082,
                        iofAliqAdicional: 0.38,
                        cetMensal: 12.53,
                        cetAnual: 320.32
                    },
                    extrato: [
                        {
                            dataMovimento: '13/10/2017',
                            numeroDocumento: '000000',
                            historico: 'RESG POUP',
                            valor: 500
                        },
                        {
                            dataMovimento: '13/10/2017',
                            numeroDocumento: '131908',
                            historico: 'SAQUE ATM',
                            valor: -150
                        },
                        {
                            dataMovimento: '12/10/2017',
                            numeroDocumento: '122206',
                            historico: 'CP. CARTAO DEBITO - CINE ARTEPLEX BRASILIA',
                            valor: -28.50
                        }
                    ],
                    movimentacaoDia: [
                        {
                            dataMovimento: '20/10/2017',
                            historico: 'Deb. Funcef',
                            valor: 500
                        },
                        {
                            dataMovimento: '01/11/2017',
                            historico: 'Juros Prov',
                            valor: 1
                        },
                        {
                            dataMovimento: '01/11/2017',
                            historico: 'IOC Prov',
                            valor: 0.50
                        }
                    ]
                })

                return new Promise(function(res, rej ){
                    setTimeout(res, 1000)
                })
            }).then(() => commit('STOP_LOADING'))
        },
        UPDATE_USER: ({commit}) => {
            commit('START_LOADING')
            
        },
        UPDATE_ACCOUNT: ({commit}) => {
            commit('START_LOADING')
            Ibc.getConta().then(response => {
                commit('SET_ACCOUNT', {conta: response})
            })
        },
        UPDATE_ACCOUNT_BALANCE: ({commit}) => {
            commit('START_LOADING')
            Ibc.getSaldo().then(response => {
                commit('SET_BALANCE', {saldo: response})
                commit('STOP_LOADING')
            })
        },
        UPDATE_ACCOUNT_TRANSACTIONS: ({commit}) => {
            commit('START_LOADING')    
            setTimeout(() => {
                commit('SET_ACCOUNT_TRANSACTIONS', {
                    saldo: {
                        saldo: 200,
                        limite: 5000,
                        saldoBloqueado: 10,
                        saldoDisponivel: 190,
                        saldoDisponivelComLimite: 5190
                    },
                    lancamentosFuturos: [
                        {
                            dataMovimento: '20/10/2017',
                            historico: 'Deb. Funcef',
                            valor: 500
                        },
                        {
                            dataMovimento: '01/11/2017',
                            historico: 'Juros Prov',
                            valor: 1
                        },
                        {
                            dataMovimento: '01/11/2017',
                            historico: 'IOC Prov',
                            valor: 0.50
                        }
                    ],
                    informacoesChequeEspecial: {
                        taxaJurosMensalNormal: 13.55,
                        taxaJurosMensalDesconto: 12.18,
                        taxaJurosMensalFinal: 11.90,
                        taxaJurosAnual: 285.44,
                        iofAliqBasica: 0.0082,
                        iofAliqAdicional: 0.38,
                        cetMensal: 12.53,
                        cetAnual: 320.32
                    },
                    extrato: [
                        {
                            dataMovimento: '13/10/2017',
                            numeroDocumento: '000000',
                            historico: 'RESG POUP',
                            valor: 500
                        },
                        {
                            dataMovimento: '13/10/2017',
                            numeroDocumento: '131908',
                            historico: 'SAQUE ATM',
                            valor: -150
                        },
                        {
                            dataMovimento: '12/10/2017',
                            numeroDocumento: '122206',
                            historico: 'CP. CARTAO DEBITO - CINE ARTEPLEX BRASILIA',
                            valor: -28.50
                        }
                    ],
                    movimentacaoDia: [
                        {
                            dataMovimento: '20/10/2017',
                            historico: 'Deb. Funcef',
                            valor: 500
                        },
                        {
                            dataMovimento: '01/11/2017',
                            historico: 'Juros Prov',
                            valor: 1
                        },
                        {
                            dataMovimento: '01/11/2017',
                            historico: 'IOC Prov',
                            valor: 0.50
                        }
                    ]
                })
            }, 5000)
        }
    }
})



export {store, eventBus}