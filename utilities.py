from __future__ import unicode_literals
import youtube_dl
from urllib import parse 
import os
from os import path
import redis
import ibm_speech_to_text
import json
import vtt_to_txt
import sys
import re
import json
from punctuator import Punctuator
import requests
import common
import redis_utilities

#initialize redis
redis = redis.Redis(host='localhost')

audio_file_dir = 'Audio_Files/'
vtt_file_dir = 'VTT_Files/'
text_file_dir = 'Text_Files/'

def get_audio_fingerprint():
    return

def get_audio_file(url):
    video_id = ''.join (c for c in parse.parse_qs(parse.urlsplit(url).query)['v'])
    audio_file_path = audio_file_dir+video_id

    if  os.path.exists(audio_file_path + '.wav'):
        return video_id
    ydl_opts = {
        'format': 'bestaudio/best',
        'extractaudio':True,
        'audioformat':'wav',
        'noplaylist':True,
        'nocheckcertificate':True,
        'outtmpl': audio_file_path+'.%(ext)s',
        'postprocessors' : [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192'
            
        }],
        'prefer_ffmpeg': True,
        'keepaudio': True
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    return video_id

def get_vtt_file(url):
    #video_id = ''.join (c for c in parse.parse_qs(parse.urlsplit(url).query)['v'])
    vtt_file_path = vtt_file_dir+video_id

    #changed from os.path
    if  os.path.exists(vtt_file_path+video_id):
        return video_id
    # youtube-dl --skip-download --sub-format vtt --write-auto-sub https://www.youtube.com/watch?v=5DGwOJXSx
    ydl_opts = {
    'skip_download': True,
    'subtitlesformat': 'vtt',
    'writeautomaticsub': True,
    'outtmpl': vtt_file_path+'.%(ext)s',
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    return video_id

def get_sec(time_str):
    """Get Seconds from time."""
    h, m, s = time_str.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)
#type of paramteres must be bytes ,so converting string to bytes
# adds file(dictionary) to stream with stream name
def add_file_to_stream(stream_name,video_id,value):
    stream_id = redis.xadd(stream_name, {'Summary': str(value).encode()})
    add_value_to_dict(stream_id,str(video_id).encode())
    return
#type of paramteres must be bytes when passed
#conversion from str to bytes is added to the method
#jugaad for now
def get_file_from_stream(stream_name,video_id):
    val = redis.xrange(stream_name, min=(redis.hget("map",video_id)), max=(redis.hget("map",'_5OvgQW6FG4')), count=None)
    for k,v in dict(val).items():return (v[b'Value'])

#type of paramteres must be bytes when passed
#conversion from str to bytes is added to the method
def add_dict(dictionary_name,key,value):
    redis.hmset(dictionary_name, {key:value})
    return
#type of paramteres must be bytes 
#conversion from str to bytes is  added to the method
def get_dict(dictionary_name,key):
    return redis.hget(dictionary_name,str(key).encode())

def file_exist(dictionary_name,video_id):
    return redis.hexists(dictionary_name,video_id)

#storing into unpunctuated_text_dir
def get_transcript(audioFilePath,video_id):
    #testing
    with open('sample_json_time.json') as f:
        json_data = json.load(f)
    #json_data = json.loads(ibm_speech_to_text.get_transcript(audioFilePath))
    redis_utilities.add_json(str(video_id),json.dumps(json_data))
    trancript_text = ''
    for alt in json_data['results']:
        trancript_text+=(alt['alternatives'][0]['transcript'])
    punctuatedText = vtt_to_txt.punctuate_online(trancript_text)
    punctuatedText = vtt_to_txt.duplicate_punctuation(punctuatedText)
    redis_utilities.add_dict(common.summary_dictionary,video_id,punctuatedText)

# print(get_vtt_file('https://www.youtube.com/watch?v=_VhcZTGv0CU'))
# print(get_audio_file('https://www.youtube.com/watch?v=UPBMG5EYydo'))

#get_transcript('','186244564239232521647980752872490925029')