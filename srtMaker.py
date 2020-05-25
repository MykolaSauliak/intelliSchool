import json
import redis_utilities


class srtMakerFromText(object):  
    """
    Speech2Text API Response >> .txt >> .SRT
    """
    def __init__(self,video_id):
        #self.text = textFile
        self.fname = str(video_id)
    textPieces = []
    timeRanges = []
    def _getPieces(self):
        
        _read = json.loads(redis_utilities.get_json(self.fname))
        #print("{} successfully read".format(self.text))
        n = len(_read['results'])
        print("There are {} chunks".format(n))
        for i in range(n):
            self.textPieces.append(_read['results'][i]['alternatives'][0]['transcript'])
            self.timeRanges.append((_read['results'][i]['alternatives'][0]['timestamps'][0][1], _read['results'][i]['alternatives'][0]['timestamps'][-1][-1]))
        return(list(zip(self.textPieces, self.timeRanges)))
    def _time2time(self,timeSeconds):
            """
            Convert a time in seconds to the .SRT format
            'h:m:s,ms'
            """
            s = timeSeconds
            m, s = divmod(s, 60)
            h, m = divmod(m, 60)
            return(("%d:%02d:%02d" % (h, m, s)))
    def _makeFile(self):
            pieces = self._getPieces()
            nChunks = len(pieces)
            tempChunk = []
            for i in range(nChunks):
                begin = self._time2time(pieces[i][1][0])
                tempChunk.append({"time": begin, "line":pieces[i][0] })
            #print(len(tempChunk))
            return tempChunk
    def writeFile(self):
            data = self._makeFile()
            return json.dumps(data)
# instantiate  
'''maker = srtMakerFromText('123')   
maker.writeFile() 
print(redis_utilities.get_json('123'))'''