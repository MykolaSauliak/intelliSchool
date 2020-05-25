# intelliSchool

## Inspiration

In the midst of COVID-19, the whole world has realised the power of online learning and the impact it can have on millions of students. Be it K-12 or higher education, virtual learning is talk of the town. Although there are plenty of video lectures available online and usage is extravagant, often these lectures can get too long, monotonous and quite frankly, boring! People zone out frequently and lose track of what's going on. They end up rewinding the video and watch again which really is a waste of time.

In this process, there is a lack of feedback; there is no one to test you if you've really understood what you've been listening to. What if there was a mechanism to evaluate the understanding? Also, not every student like to take notes. But all of us need something to refer to before an exam. What if there is someone who can automatically generate notes for you while you concentrate on listening to the lecture in the video?

## What it does

- Teachers can upload meeting recordings to our application and send invitations to their students. 
Students can then login and subscribe to the class. 
- All videos that are part of the class will be downloaded in the background to the student’s device. 
- The application will use the video uploaded by the teacher to automatically generate smart quizzes, smart notes, flash-cards and links to related concepts using Machine Learning and Natural Language Processing. 
- While students are learning a concept, if they have any doubts, they can use the discussion section below the video to ask questions. Teacher, other students or our bot can answer their queries.
- At the end of the quiz, they will be able to view a report that gives their score along with the questions that they answered incorrectly. Students can click on ‘Where was this question from?’ button. Our App will take the student to the point in the video from where the question was generated. 

## How we built it

We used Angular to build the frontend of the web application and Javascript to build the browser plugin. Backend is built using Python. 'IBM Watson Speech to Text converter' is used to convert speech to text. We are using python packages such as nltk, gensim and our own Algorithms to automatically generate MCQ based quiz and smart notes from the speech in the video. 

## Challenges we ran into

The process to generate quiz, notes or summary from a video is complex and time consuming machine learning problem. It was a challenging task to reduce the total time taken by this process from several minutes to a few seconds. We were able to accomplish this over the weekend.

## Accomplishments that we're proud of

We consider every aspect of the project as an accomplishment as it was a new learning every step of the way.

## What's next for intelliSchool

- Capture screenshots of diagrams and formulae from the video using Computer Vision and add it to Smart Notes.
- Create flash cards
- Add analytics to help teachers understand the topics that weren't answered correctly by students.
- Add analytics for parents to better understand how their kids are performing.
- In smart notes section, we want show links to relevant websites to read more about the central topic of the video.
- Generate pre-requisites - add links to learn about most important sub-topics on the video as pre-requisites
