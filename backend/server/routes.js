const { Router } = require('express')
const express =  require('express')


//assim consegue-se passar informação para um module dentro de um node
//Server -> é o que vai receber as rotas
module.exports = function (server){

//rotas api 

    //recebe o router do express
    const router = express.Router()
    //passa-se o router para o servidor a partir o url /api 
    // tudo o que vier de '/api' avi ser passado para o 'router' que é a função Router() que vem do express
    server.use('/api', router)

    const serviceBillingCycles = require('../api/billingcycles/Service_Billingcycles')
    //chama-se o metodo node restful 'register' para que todos os serviços usem como url rais 'billingCycles'
    serviceBillingCycles.register(router,'/billingCycles' )

    const billingtotalService = require('../api/billingcyles_total_balence/Service_billingCycles_total_balences')
    router.route('/billingBalence').get(billingtotalService.getBalence)



}