import json
from os.path import join, dirname
from ibm_watson import SpeechToTextV1
from ibm_watson.websocket import RecognizeCallback, AudioSource
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import srtMaker


authenticator = IAMAuthenticator('wDAb08LCoNUTYoF7nsrOO7h_nBHB_XZuHRnu5Ll0ybOH')
service = SpeechToTextV1(authenticator=authenticator)
service.set_service_url('https://api.us-east.speech-to-text.watson.cloud.ibm.com/instances/1ffa4e08-9589-4ab6-8c9d-af4abca6bd4e')

#audio is to be extracted as wav using ffmpeg(***very important)
def get_transcript(audioFilePath):
    with open(audioFilePath,'rb') as audio_file:
        #return could be changed,we can save to redi-json here,
        #but need to figure out unique id.
        return (json.dumps(
            service.recognize(
                audio=audio_file,
                content_type='audio/wav').get_result(),
            indent=2))

def get_timestamped_data(video_id):
    maker = srtMaker.srtMakerFromText(video_id)   
    return maker.writeFile() 


