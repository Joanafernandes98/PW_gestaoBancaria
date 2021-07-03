const _ = require('loadsh')

const BillingCycles= require('../billingcycles/billingcycles')

//faz o sumario de todos os pagamentos 


// foi vista a documentação do mongo db 
function getBalence(req, res){

    //queremos para todo o documento pegar no valor suamdos de credito e todos os valores sumados de debito 

    BillingCycles.aggregate([{

        $project: {deposit: {$sum: "$deposit.value"}, debt: {$sum: "$debt.value"}}    

    }, {
        //consolidar os creditos e os debitos 
        $group:{_id: null, deposit: {$sum: "$deposit" }, debt: {$sum: "$debt" }}

    },{
        //retira o id que não queremos 
        $project: {_id: 0, deposit: 1 , debt: 1}    

    }]).exec(( error, result) => {

            if(error) {

                res.status(500).json({ errors: [error]})
            }
            else{
                // se não der erro recebe o resultado com json, e a função defaults faz com que retorne deposit: 0 , debt: 0  se não houver parametros dentro 
                res.json(_.defaults(result[0] || { deposit: 0 , debt: 0 }))
            }
        })
}
  
module.exports= { getBalence }