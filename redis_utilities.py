import redis
import common
import json


r = redis.Redis(host='localhost')
#for redis-json(either this or install another package)
strict_redis = redis.StrictRedis(host='localhost', port=6379, db=0)

def add_dict(dictionary_name,key,value):
    r.hmset(dictionary_name, {key:value})

def get_dict(dictionary_name,key):
    return r.hget(dictionary_name,str(key).encode())

def add_json(id,data):
    strict_redis.set(str(id), json.dumps(data))
    
def get_json(id):
    return json.loads(strict_redis.get(str(id)))

