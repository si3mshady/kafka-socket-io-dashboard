import boto3,  datetime, json, time

import functools
from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers=['localhost:9093'],value_serializer=lambda x: 
                         json.dumps(x).encode('utf-8'))

ec2 = boto3.client('ec2', region_name='us-east-1')
cloudwatch = boto3.client('cloudwatch')



def today():
    return datetime.datetime.today()

def get_start_time(day):
    return day

def get_end_time(day):
    return day.replace(second=59, minute=59,hour=23).timestamp()

def get_ec2_metrics(instance_id):
    day = today()


    response = cloudwatch.get_metric_data(
            MetricDataQueries=[
                {
                    'Id': 'test',
                    'MetricStat': {
                        'Metric': {
                            'Namespace': 'AWS/EC2',
                            'MetricName': "CPUUtilization",
                            'Dimensions': [
                                {
                                    'Name': 'InstanceId',
                                    'Value': f'{instance_id}'
                                },
                            ]
                        },
                        'Period': 300,
                        'Stat': 'Average',
                        'Unit': 'Percent'
                    },
                
                    'Label': f'Instance_id{instance_id}',
                    'ReturnData': True
                
                },
            ],
            StartTime=get_start_time(day),
            EndTime=get_end_time(day)    
        )
    



    return response['MetricDataResults'][0]['Values']
    

def publish_metrics():
    r = ec2.describe_instances(Filters=[
            {
                'Name': 'vpc-id',
                'Values': ['vpc-054068cd0bf69ed90']
            }
        ])

    data = []
    for reservation in r['Reservations']:
        for instance in reservation['Instances']:
            instance_id = instance['InstanceId']
            res = get_ec2_metrics(instance_id=instance_id) #res is a list of metrics -> so use reduce to sum them up and get the average
            single_metric = functools.reduce(lambda a, b: a+b, res) / len(res) * 100
            print(single_metric)
           
            m = {"instanceid": instance_id, "metric": single_metric}
            
            data.append(m)
    
    print(json.dumps(data))
    producer.send('cpu', value=data)
    print('Data published to topic CPU')
    data = []

while True: 
    publish_metrics()

    time.sleep(300)

# r = cloudwatch.get_metric_data(**kwargs)
# print(r)