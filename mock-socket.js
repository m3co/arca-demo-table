
const fs = require('fs');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('connected');
    socket.on('jsonrpc', (data) => {
        console.log('jsonrpc', data);
        if (data.Method === 'Update' || data.Method == 'Insert' || data.Method == 'Delete') {
          fs.readFile(
            `./mocks/${data.Context.Source}.${data.Method}.Request.json`,
            'utf-8',
              (err, json) => {
              if (err) {
                  console.error(err);
                  return;
              }
              const response = JSON.parse(json);
              response.ID = data.ID;
              socket.emit('jsonrpc', response);

              fs.readFile(
                `./mocks/${data.Context.Source}.${data.Method}.Notification.json`,
                'utf-8',
                  (err, json) => {
                  if (err) {
                      console.error(err);
                      return;
                  }
                  const response = JSON.parse(json);
                  response.ID = data.ID;
                  socket.emit('jsonrpc', response);
                }
              );
            }
          );
          return;
        }
        if (data.Method === 'Subscribe') {
          fs.readFile(
            `./mocks/${data.Params.Target}.${data.Method}.json`,
            'utf-8',
            (err, json) => {
              if (err) {
                  console.error(err);
                  return;
              }
              const response = JSON.parse(json);
              response.ID = data.ID;
              socket.emit('jsonrpc', response);
            }
          );
          return;
        }
        fs.readFile(
          `./mocks/${data.Context.Source}.${data.Method}.json`,
          'utf-8',
            (err, json) => {
            if (err) {
                console.error(err);
                return;
            }
            const response = JSON.parse(json);
            response.ID = data.ID;
            socket.emit('jsonrpc', response);
          }
        );
    })
});

http.listen(8086, function(){
    console.log('listening on *:8086');
});
