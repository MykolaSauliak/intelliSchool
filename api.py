import flask
import question_generator 
import summarizer 
import os
from os import path
from flask import request
from flask_cors import CORS
import uuid 
import common
import redis_utilities
import ibm_speech_to_text
import vtt_to_txt
import utilities 
import re
import json

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

text_folder_path = 'Text_Files/'
vtt_folder_path = 'VTT_Files/'
json_folder_path = 'JSON_Files/'

text_stream = 'Text_Stream'
VTT_stream = 'VTT_Stream'

#@app.route('/', methods=['GET'])
video_id = str(uuid.uuid1().int) 
def home():
    #send video path instead of id
    v = ''
    print(video_id)
    #video_id = str(uuid.uuid1().int) 

    #assuming v is audio path
    utilities.get_transcript(v,video_id)

    # get summary
    summary = summarizer.get_summary(str(redis_utilities.get_dict(common.summary_dictionary,video_id)))
    
    # Add space after full stop
    rx = r"\.(?=\S)"
    summary = re.sub(rx, ". ", summary)
    re.sub(".", ". ",summary)

    json_sentences = json.loads(ibm_speech_to_text.get_timestamped_data(video_id))
    prevJumpToTime = 0

    questions = question_generator.generate_trivia(summary)
    for question in questions:
        correct_index = question['correctIndex']
        correct_answer = question['answers'][correct_index] 
        for json_sentence in json_sentences:
            (json_sentence_time) = utilities.get_sec(json_sentence['time'])
            if json_sentence_time >= prevJumpToTime and json_sentence['line'].find(correct_answer) >= 0:
                question['jumpToTime'] = json_sentence_time
                prevJumpToTime = json_sentence_time
                break

    print(json.dumps(questions))
    redis_utilities.add_json(video_id,json.dumps(questions))

def youtube():
    video_id = request.args.get('v')
    if not video_id:
        return {"Issue":"Please pass video ID v in query params"}

    url = 'https://www.youtube.com/watch?v=' + video_id
    #get audio 
    # video_id = utilities.get_audio_file(url)
    text_file_path = text_folder_path+video_id+'.txt'
    json_file_path = json_folder_path+video_id+'.json'


    '''if not utilities.check_if_video_exists(video_id):
        utilities.get_vtt_file(url)
        vtt_to_txt.convert_to_text(video_id)'''

    # get summary
    summary = summarizer.get_summary(open(text_file_path,'r').read())

    # Add space after full stop
    rx = r"\.(?=\S)"
    summary = re.sub(rx, ". ", summary)
    re.sub(".", ". ",summary)

    # get questions and return
    json_sentences = json.loads(open(json_file_path,'r').read())

    questions = question_generator.generate_trivia(summary)
    prevJumpToTime = 0
    for question in questions:
        correct_index = question['correctIndex']
        correct_answer = question['answers'][correct_index]
        for json_sentence in json_sentences:
            json_sentence_time = utilities.get_sec(json_sentence['time'])
            if json_sentence_time >= prevJumpToTime and json_sentence['line'].find(correct_answer) >= 0:
                question['jumpToTime'] = json_sentence_time
                prevJumpToTime = json_sentence_time
                break

    # print(questions)
    return json.dumps(questions)

def notes():
    '''video_id = request.args.get('v')
    if not video_id:
        return {"Issue":"Please pass video ID v in query params"}

    text_file_path = text_folder_path+video_id+'.txt'
    json_file_path = json_folder_path+video_id+'.json'

    url = 'https://www.youtube.com/watch?v=' + video_id'''
    v  = ''
    if video_id not in common.summary_dictionary:
        utilities.get_transcript(v,video_id)

    '''if not utilities.check_if_video_exists(video_id):
        utilities.get_vtt_file(url)
        vtt_to_txt.convert_to_text(video_id)
    '''
    text = str(redis_utilities.get_dict(common.summary_dictionary,video_id))
    notes = summarizer.get_summary_with_ratio(text,0.5)
    summary = summarizer.get_summary_with_word_count(text,100)

    #result_list = get_key_phrases(notes, 'en')
    #global_keywords = []

    prevJumpToTime = 0
    json_sentences = json.loads(ibm_speech_to_text.get_timestamped_data(video_id))

    sentence = str(notes[out_index])
    note = {}
    note['sentence'] = sentence
    #note['keywords'] = keyword_list
    print(keyword_list)
    # need to improve
    if len(keyword_list) > 0:
        keyword = keyword_list[0]['keyword']
        for json_sentence in json_sentences:
            json_sentence_time = utilities.get_sec(json_sentence['time'])
            if json_sentence_time >= prevJumpToTime and json_sentence['line'].find(keyword) >= 0:
                note['jumpToTime'] = json_sentence_time
                prevJumpToTime = json_sentence_time
                break
    else:
        note['jumpToTime'] = prevJumpToTime
    

    response = {"notes": notes,"summary": summary}
    return json.dumps(response)
#print(home())
print(notes())