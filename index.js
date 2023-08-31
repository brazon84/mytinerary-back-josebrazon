
import app from './app.js'
import logger from 'debug';
import http from 'http'
import mongoose from 'mongoose';
import connectDB from './src/utils/connection.js';

const debug =logger('mytineraty:server');

connectDB();

mongoose.connection.once('open', () => {
		console.log("Connected to MongoDB");
})

mongoose.connection.on('error', err => {
		console.error(err);
})



const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);


const server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
