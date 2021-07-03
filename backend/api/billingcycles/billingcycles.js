// é uma dependencia que ajuda a criar uma api rest para a parte de front
//end .> criação de serviços - consulta, apagar, criar...
//faz a interação entre o express e o mongoose 
const { values } = require('lodash')
const noderestful = require('node-restful')
const mongoose = noderestful.mongoose


const depositSchema = new mongoose.Schema({

    name: {type: String, required: true},
    value: {type: Number, min: 0, required: true}

})

const debtSchema = new mongoose.Schema({

    name: {type: String, required: true},
    value: {type: Number, min: 0, required: true},
    status: {type: String, required: false, uppercase: true, 
        enum: ['PAID', 'PENDING','SCHEDULED']}

})

const billingCyclesSchema = new mongoose.Schema({

    name: {type: String, required: true},
    month: {type: Number, min:1, max: 12, required: true},
    year: {type: Number, min:1900, max: 2200,required: true},
    deposit: [depositSchema],
    debt: [debtSchema]

})

//exportar este modulo para outras partes
module.exports = noderestful.model('BillingCycles', billingCyclesSchema)