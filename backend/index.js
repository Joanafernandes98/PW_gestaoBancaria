const server = require('./server/server')
require('./server/database')
require('./server/routes')(server) //está a passar o server para o routes