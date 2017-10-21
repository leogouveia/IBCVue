import axios from 'axios'
import Querystring from 'querystring'

const ibcAxios = axios.create({
    baseURL: 'https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/',
    withCredentials: true
})

export default class Ibc {
    
    constructor() {
        this.querystring = Querystring
        this.cookies = undefined
        this.ibcAxios = axios.create({
            baseURL: 'https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/',
            withCredentials: true
        })
    }

    login(user, pass, segmt) {
        
        return this.ibcAxios.get('/tpSeed?deviceKey=YAoUUggz8KebJxOyHksSYPP0y9eBLUzFcPcb%2BbVf%2Bd24LP2zicSXUsKaWEdVW1Nxc1CQyABZX2saiVu8Xrb4v3YBSc6L6t11Tp04IgnSqsRPX6f2v%2Fvcs9rveG8cWlNjrQpwilPnPO3Vuj1wq9H7KkthuLCmu4f5%2FZOCvmy%2BCqqmmO4qzocuInJwP0eg7tIgb82QZS3yTy26tgkir%2BP%2F1PTwwyM5M7oV0c5KA9EO5uY3Hm6Au%2FpjJiIg%2FULeHGovLRHV68ZwGmDAuFyUshyuannhAOB2seY19URAeEZzYxZ36rrdVR0wBDXOmM0P5USjjjq6T4fi0yhud%2BiS%2BGn1O%2BQ4IlKv5Q%3D%3D')
                .then((response) => {
                    console.log('start login')
                    this.cookies = response.headers['set-cookie']
                    
                    return this.ibcAxios.get('/loginTp?nocache=1489679149924&context=sinbc', {
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    })
                }).then((response) => {
                    let qs = this.querystring.stringify({
                        nomeUsuario: user,
                        segmento: segmt || 1,
                        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
                    })
                    return this.ibcAxios.post('/login/authUserNameTp?nocache=1489668722708'
                        , qs
                        , {
                            headers: {
                                'Content-type': 'application/x-www-form-urlencoded'
                            }
                        }
                    )
                }).then((response) => {
                    let qs =  this.querystring.stringify({
                        password: pass,
                        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
                    })
                    // console.log('cookie3', cookies)
                    return this.ibcAxios.post(
                        '/login/authPasswordTp?nocache=1489668888143',
                        qs,
                        {
                            headers: {
                                'Content-type': 'application/x-www-form-urlencoded'
                            }
                        }
                    )
                }).then((response) => {
                    if (!response.data)
                        throw Error("erro na requisição")
                    return response
                })
    }

    static getExtrato() {
        console.log('getExtrato')
        return axios({
            method: 'get',
            url: 'https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/SIIBC/extrato.processa',
            withCredentials: true
        })
    }

    static getUsuario() {
        return ibcAxios.get('/clientInfo/buscarDadosUsuario?nocache=1508432100807')
            .then(r => r.data)
    }

    static getSaldo() {
        return ibcAxios.get('/componentSaldo/atualizaSaldo')
            .then(r => r.data)
    }

    static getConta() {
        return ibcAxios.get('/dadosContaSelecionada?nocache=1508432100880')
                .then(r => r.data)
    }
}
