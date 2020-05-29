summary_dictionary = 'summary'
audio_stream = 'audio_stream'
speech_to_text_stream = 'speech_to_text'
important_sentences_stream = 'important_sentences'


from enum import Enum
class Status(Enum):
    SUBMITTED = 1
    PROGRESSING = 2
    COMPLETE = 3
    CANCELED = 4
    ERROR   = 5 