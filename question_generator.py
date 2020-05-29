import json
from urllib import parse
import os.path
import json
from nltk.corpus import wordnet as wn
from textblob import TextBlob
import random
import redis_utilities
import common
import re


class Article:
    def __init__(self, article,video_id):
        self.article = TextBlob(article)
        self.video_id = video_id
        #self.page = wikipedia.page(title)
        #self.summary = TextBlob(self.page.summary)

    def generate_trivia_sentences(self):
        sentences = self.article.sentences

        # Remove the first sentence - it's never a good one
        #del sentences[0]

        trivia_sentences = []
        for sentence in sentences:
            sent = {'video_id':self.video_id,'sent_num':sentences.index(sentence),'sentence':sentence}
            redis_utilities.add_file_to_stream(common.important_sentences_stream,sent)
            trivia = self.evaluate_sentence(sentence)
            if trivia:
                trivia_sentences.append(trivia)

        return trivia_sentences

    def get_similar_words(self, word):
        # In the absence of a better method, take the first synset
        synsets = wn.synsets(word, pos='n')

        # If there aren't any synsets, return an empty list
        if len(synsets) == 0:
            return []
        else:
            synset = synsets[0]

        # Get the hypernym for this synset (again, take the first)
        hypernym = synset.hypernyms()[0]

        # Get some hyponyms from this hypernym
        hyponyms = hypernym.hyponyms()

        # Take the name of the first lemma for the first 8 hyponyms
        similar_words = []
        for hyponym in hyponyms:
            similar_word = hyponym.lemmas()[0].name().replace('_', ' ')
            
            if similar_word != word:
                similar_words.append(similar_word)

            if len(similar_words) == 8:
                break

        return similar_words

    def evaluate_sentence(self, sentence):
        '''if sentence.tags[0][1] == 'RB' or len(sentence.words) < 6:
            # This sentence starts with an adverb or is less than five words long
            # and probably won't be a good fit
            return None'''

        #tag_map = {word.lower(): tag for word, tag in sentence.tags}

        replace_nouns = []
        for s in sentence.tags:
            word, tag = s[0],s[1]
            # For now, only blank out non-proper nouns that don't appear in the article title
            if tag == 'NN' :
                # Is it in a noun phrase? If so, blank out the last two words in that phrase
                for phrase in sentence.noun_phrases:
                    if phrase[0] == '\'':
                        # If it starts with an apostrophe, ignore it
                        # (this is a weird error that should probably
                        # be handled elsewhere)
                        break

                    if word in phrase:
                        # Blank out the last two words in this phrase
                        [replace_nouns.append(phrase_word) for phrase_word in phrase.split()[-2:]]
                        break

                # If we couldn't find the word in any phrases,
                # replace it on its own
                if len(replace_nouns) == 0:
                    replace_nouns.append(word)
                break
        
        if len(replace_nouns) == 0:
            # Return none if we found no words to replace
            return None

        trivia = {
            "sentence": str(sentence), 
        }
        trivia["answers"] = []
        correct_answer = ' '.join(replace_nouns)
        if len(replace_nouns) == 1:
            # If we're only replacing one word, use WordNet to find similar words
            trivia['answers'].append(correct_answer)
            trivia['answers'].extend(self.get_similar_words(replace_nouns[0])[:3])
            #trivia["similar_words"] = self.get_similar_words(replace_nouns[0])
        random.shuffle(trivia['answers'])
        if len(trivia['answers']) < 3:
            return None
        if len(trivia['answers'])>1:
            trivia['correctIndex'] = trivia['answers'].index(correct_answer)
            trivia['jumpToTime'] = 0

        if len(trivia['answers'])==3:
            trivia['answers'].append('None of the Above')

        # Blank out our replace words (only the first occurrence of the word in the sentence)
        replace_phrase = correct_answer
        blanks_phrase = ('____ ' * len(replace_nouns)).strip()

        expression = re.compile(re.escape(replace_phrase), re.IGNORECASE)
        sentence = expression.sub(blanks_phrase, str(sentence), count=1)
        
        trivia["question"] = sentence
        print(trivia)
        return trivia


def generate_quiz(article,video_id):

    questions = []
    
    article = Article(article,video_id)
    generated_sentence = article.generate_trivia_sentences()
    if(generated_sentence):
        questions = questions + generated_sentence
    '''f=open("questions.json","a")
    print('Questions ' + json.dumps(questions))
    f.write(json.dumps(questions))
    f.close()'''
    return questions
