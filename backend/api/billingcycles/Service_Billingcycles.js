const _ = require('lodash')
const BillingCycles = require('./billingcycles')

// é criada a api rest para os metodos 'get'-> obter por exemplo lista de ciclos de pagamentos
// 'post'-> inserir por exemplo um novo ciclo de pagamento
//'put'-> alterar um ciclo de pagamento existente
// 'delete'-> remove o ciclo de pagamento 

BillingCycles.methods(['get', 'post', 'put', 'delete' ])    
//porque estava a aceitar messes 22, amir do que 12 
BillingCycles.updateOptions({new: true, runValidators: true})

//Depois do metodo post e put chame a função de ver os erros 
BillingCycles.after('post', SendErrorsifNotNext).after('put',SendErrorsifNotNext)

function SendErrorsifNotNext(req, res, next){

    const bundle = res.locals.bundle

    if (bundle.errors){

        res.status(500).json({errors})
    }
    else
    {
        next()
    }
}

function parserErrors(noderestfulErrors){
        const errors = []
        _.forIn(noderestfulErrors, error => errors.push(error.message))
}


//para saber quantos cilos de paghamentos temos 
BillingCycles.route('count', function(req, res, next){

    // o node resteful é o que faz este count
    //aqui vamos buscar ao mongo através do mongoose os dados 
    //cria-se uma função que recebe um erro e o valor, onde o valor é a contagem dos ciclos

    BillingCycles.count( function (error, value){
        //se houver erro da-se resposta com json 
        if(error) {

            res.status(500).json({ errors: [error]})
        }
        else{
            // se não der erro recebe o valor da constagem 
            res.json({value})
        }
    })
})
module.exports = BillingCycles