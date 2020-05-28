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

def file_exist(dictionary_name,key):
    return r.hexists(dictionary_name,key)

def add_file_to_stream(stream_name,key,value):
    return r.xadd(stream_name, {key: str(value).encode()})
    
def get_file_from_stream(stream_name,stream_id):
    return r.xrange(stream_name, min=stream_id, max=stream_id, count=None)
