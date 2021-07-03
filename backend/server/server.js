// porque que corre o express
const port = 3000

//framework
const express = require('express')
//criação do servidor
const server = express()
//ajuda a fazer o pass do body da requesição 
const bodyParser =  require('body-parser')


//urlencoded-> formato dos dados quando se submete um formulario
//extended: true -> o body parser intreperta mais tipo de informações que venham do formulario para alem das que já vem por
//padrão

server.use(bodyParser.urlencoded({
    extended: true
  }));
//se não forem dados que vem de um fomulario. E tranforma o json em outro objeto. 
server.use(bodyParser.json())

server.listen(port, function(){

    console.log(`O backend está a correr na porta ${port}  `)
})

module.exports = server

