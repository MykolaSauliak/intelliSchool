import json
from os.path import join, dirname
from ibm_watson import SpeechToTextV1
from ibm_watson.websocket import RecognizeCallback, AudioSource
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import srtMaker


authenticator = IAMAuthenticator('XXXXXX')
service = SpeechToTextV1(authenticator=authenticator)
service.set_service_url('XXXX')

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


