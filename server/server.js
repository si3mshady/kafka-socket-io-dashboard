const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')
const { Server } = require('socket.io')
const axios = require('axios')

fs = require('fs');

const Kafka = require('node-rdkafka')

app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
  maxHttpBufferSize: 1e9, pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
})



const consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9093',
  }, (err,topicPartitions) => {

    if (!err) {

        console.log('Consumer is running!')
    } else {
        console.log(err)
    }


  });


//   consumer.connect();

//   consumer.on('ready', () => {
//     consumer.subscribe(['cpu']);

//     consumer.consume();
//   })
//   .on('data', (data) => {
  
//     console.log(data.value.toString());


//   });


app.use("/data", (req, res) => {

  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  res.send(data)

    // console.log(data);
  });
  
})


io.on("connection", (socket) => {

    console.log(`New connection detected ${socket.id}`)



    try {

        consumer.connect();

        consumer.on('ready', () => {
          consumer.subscribe(['cpu']);
      
          consumer.consume();
        })
        .on('data', (data) => {
          console.log(data.value.toString());
          socket.broadcast.emit("new_data", data.value.toString())
          fs.writeFileSync('data.txt', data.value.toString(), {flag: 'w'}, function (err) {
            if (err) return console.log(err);
            console.log('data written to file');

          });
          // socket.broadcast.emit("new_data", {message: "merry Christmas"})
        });


  

    } catch (err) {
            console.log(err)
    }

   
})


// setInterval(() => {

 

// }, 18000

// )


server.listen(888, () => {
    console.log("Server is running on port 888")
})