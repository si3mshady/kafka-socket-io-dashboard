import Kafka from 'node-rdkafka';


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


  consumer.connect();

  consumer
  .on('ready', () => {
    consumer.subscribe(['cpu']);

    consumer.consume();
  })
  .on('data', (data) => {
  
    console.log(data.value.toString());
  });