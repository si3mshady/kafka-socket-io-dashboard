import boto3,  datetime

from kafka import KafkaConsumer
from kafka import KafkaProducer


ec2 = boto3.client('ec2', region_name='us-east-1')
# response = ec2.describe_instances()



# print([ i.get('Instances')[0]['InstanceId'] for i in response.get('Reservations')])

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
                        'Period': 86400,
                        'Stat': 'Average'
                    },
                
                    'Label': f'Instance_id{instance_id}',
                    'ReturnData': True
                
                },
            ],
            StartTime=get_start_time(day),
            EndTime=get_end_time(day)    
        )

    return response['MetricDataResults'][0]['Values']
    


r = ec2.describe_instances(Filters=[
        {
            'Name': 'vpc-id',
            'Values': ['vpc-054068cd0bf69ed90']
        }
    ])

for reservation in r['Reservations']:
  for instance in reservation['Instances']:
    instance_id = instance['InstanceId']
    res = get_ec2_metrics(instance_id=instance_id)
    m = {"instanceid": instance_id, "metric": res}
    print(m)

# r = cloudwatch.get_metric_data(**kwargs)
# print(r)