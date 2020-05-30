from redisgears import executeCommand as execute
import ibm_speech_to_text
import redis_utilities
from question_generator import generate_quiz
from summarizer import get_summary
import common

transcribe_stream = "Transcribe_Stream"
transcribed_stream = "Transcribed_Stream"
generator_stream = "Generator_Stream"
text_stream = 'Text_Stream'
VTT_stream = 'VTT_Stream'

def xlog(*args):
    redisgears.executeCommand('xadd', 'log', '*', 'text', ' '.join(map(str, args)))
    
def store_transcribed_results(x):
    try:
        video_id = x['video_id']
        fragment_counter = redis_utilities.get_dict(video_id)
        redis_utilities.add_dict(video_id, fragment_counter - 1)
        execute('XADD', transcribed_stream, 'MAXLEN', '~', 1000, '*', 'video_id': video_id, 'fragment_id', x['fragment_id'], 'trans_text', x['trans_text'])
        if fragment_counter == 1:
            generator_gear(video_id)
        return video_id
    except:
        xlog('store_generated_results: error:', sys.exc_info()[0])

def speech_to_text(x):
    try:
        trans_text = ibm_speech_to_text.transcribe(x['fragment'])
        return x['video_id'], x['fragment_id'], trans_text
    except:
        xlog('store_generated_results: error:', sys.exc_info()[0])

def store_generated_results(x):
    try:
        video_id = x['video_id']
        redis_utilities.add_json(video_id, x['data'])
        redis_utilities.publish('status', common.Status.COMPLETE)
        return video_id
    except:
         xlog('store_generated_results: error:', sys.exc_info()[0])

def _generate_quiz(x):
    try:
        return generate_quiz(x['data'])
    except:
        xlog('generate_quiz: error:', sys.exc_info()[0])

def generator_gear():
    video_id = video_id
    gb = GearsBuilder('StreamReader')
    gb.map(lambda x: x['value']['trans_text'])
    gb.accumulate(lambda a, x: (a if a else '') + x)
    gb.map(lambda x: get_summary(x))
    gb.map(lambda x: generate_quiz(x, video_id))
    gb.map(store_generated_results)
    gb.run(transcribed_stream)

gb = GearsBuilder('StreamReader')
gb.map(speech_to_text)
gb.map(store_transcribed_results)
gb.register(transcribe_stream)

