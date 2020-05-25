'use strict';

var youtubeContainer = '';

var appContainer = '';

var questionsJSON = JSON.parse('{"questions":[{"question":"Who are the actors in The Internship?","answers":["Ben Stiller, Jonah Hill","Courteney Cox, Matt LeBlanc","Kaley Cuoco, Jim Parsons","Vince Vaughn, Owen Wilson"],"correctIndex":3,"jumpToTime":1200}]}');

var notesJSON = ['No notes to display'];

var server = "http://ec2-34-235-168-84.compute-1.amazonaws.com:8080"

var icon_image = "data:image/png;base64,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"

function startApp() {

    var isFlokiActive = '';
    chrome.storage.sync.get('isFlokiActive', function (data) {
        isFlokiActive = data.isFlokiActive;
        // Check if App is Active
        if (isFlokiActive) {
            console.log('[floki info] floki app active');
            var currentLink = document.location;
            let params = (new URL(currentLink)).searchParams;

            var videoId = params.get("v");
            if (currentLink.href.includes("youtube.com/watch?v=") === true) {
                createHTML();
                createQuiz(videoId);
                createNotes(videoId);
            }
        }
    });
}


function createQuiz(videoId) {
    var serverURL = server + '/?v=' + videoId;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            questionsJSON['questions'] = JSON.parse(xhttp.responseText);
            console.log(questionsJSON);
            createQuizHTML();
        }
    };
    xhttp.open("GET", serverURL, true);
    xhttp.send();
}

function createNotes(videoId) {
    var serverURL = server + '/notes?v=' + videoId;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var notesJSON = JSON.parse(xhttp.responseText);
            console.log(notesJSON);
            createNotesHTML(notesJSON);
        }
    };
    xhttp.open("GET", serverURL, true);
    xhttp.send();
}

function createQuizHTML(){
   
    appContainer = document.querySelector('#floki-app');
    var quizContainer = appContainer.querySelector('#quiz_container');

    var quizHTML = `    
    <div class="quiz-info">
    <div class="total-questions-ribbon">Total Questions - <span id="total-questions">`+ questionsJSON.questions.length +`</span>
    </div>
    </div>

    <div class="questions-container">`;

    for (var i = 0; i < questionsJSON.questions.length; i++) {
        quizHTML += `<div class="floki-question">
        <div style="margin-bottom:15px; font-weight: 600;">
         ` + (i + 1) + `. ` + questionsJSON.questions[i].question + `
        </div>
        <div class="floki-options">
        `;

        for (var j = 0; j < questionsJSON.questions[i].answers.length; j++) {
            quizHTML += `<div><input type="radio" name="` + i + `" value="` + j + `"/>
            ` + questionsJSON.questions[i].answers[j] + `</div>`;
        }
        quizHTML += `</div>
        <div class="floki-complete" style="margin: 10px 0px; display:none;">
        <div style="color:#606060; font-weight:700;">Correct Answer - ` + questionsJSON.questions[i].answers[questionsJSON.questions[i].correctIndex] + `</div>
        </div>
        <button class="floki-jump-to-time-button" value="` + questionsJSON.questions[i].jumpToTime + `">NAVIGATE TO THIS QUESTION IN VIDEO</button>
        </div>
        `;
    }
    quizHTML += `</div>
    <div class="quiz-footer"><button id="floki-submit-quiz-button" style="float:right">SUBMIT ANSWERS</button> <button id="floki-reset-quiz-button" style="float:right">RESET QUIZ</button></div>
    <div style="width=100%; padding: 12px; height: 100%; justify-content: space-between;font-size: 16px;   box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1); display:none; margin: 20px 0px 0px 0px;" id='floki-result-container'><div id='floki-result-text' style="width:60%;display: inline-block; vertical-align: top; "></div><div style="margin: 10px 0px; width:16%;display: inline-block; vertical-align: top; height:100%; border-right: 3px solid #e1e1e1; padding: 10px 0px;"> <button class="" value="" id="floki-try-again-button">TRY AGAIN</button></div><div style="width:20%;display: inline-block; vertical-align: top; height:100%; padding: 20px 0px; text-align: center;"><div>Total Score</div><div><span id="floki-result-percent"></span>%</div></div></div>
    `;

    quizContainer.innerHTML = quizHTML;
    addListeners();
}

function createNotesHTML(notesJSON){
    appContainer = document.querySelector('#floki-app');
    var notesContainer = appContainer.querySelector('#notes_container')
    var notes = notesJSON['notes'];
    var summary = notesJSON['summary'];
    var notesHTML = `<div id="notes-body"><div class="summary"><div class="summary-heading">Summary</div>`+ summary +`</div><ul class="notes_ul">`;
    
    for (let index = 0; index < notes.length; index++) {
        var keywords = notes[index]['keywords'];
        for (let i = 0; i < keywords.length; i++) {
            var exampleHTML = '';
            if(keywords[i]['examples'] != null && keywords[i]['examples'].length > 0){
                exampleHTML = '<div><span style="font-weight: 600">Examples:</span> <div>';
                for (let j = 0; j < keywords[i]['examples'].length; j++) {
                    exampleHTML += `<div>`+ (j+1) +`. ` + keywords[i]['examples'][j] + `</div>`;
                }
                exampleHTML += `</div></div>`;
        }
            notes[index]['sentence'] = notes[index]['sentence'].replace(keywords[i]['keyword'], `<span id="smart-`+ keywords[i]['keyword'] +`" class="keyword tooltip">`+ keywords[i]['keyword']+`<div class="tooltiptext"><div><span style="font-weight: 600">Definition: </span>`+ keywords[i].definition +`</div>`+ exampleHTML +`</div></span>`);
        }
        notesHTML += `<li class="notes_item"><span class="notes-sentence" id="`+notes[index]['jumpToTime']+`">` + notes[index]['sentence'] + `<span></li>`;
    }
 
    notesHTML += `</ul></div>
    <div class="notes-footer">
    <button id="notes-download-button">DOWNLOAD NOTES</button>
    </div>
    `;

    notesContainer.innerHTML = notesHTML;
    addListenersForNotes();
}

function createHTML() {

    youtubeContainer = document.getElementById('info-contents');
    appContainer = youtubeContainer.querySelector('#floki-app');
    console.log(appContainer)
    if(!(appContainer == null)){
        console.log("not null")
        appContainer.remove()
    }
   
    appContainer = document.createElement("Div");

    appContainer.setAttribute("id","floki-app")

    appContainer.innerHTML = `
    <div class="style-scope ytd-watch-flexy"  style="width=100%; padding: 12px; height: 100%; justify-content: space-between;   box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);">
    <div style="display: inline-block; vertical-align: top; width:10%;">
    <img alt='' id="floki-app-icon" src="`+ icon_image +`" alt="" />
    </div><div class="app-heading" crossorigin="anonymous">Smart Teacher</div></div>
   
    
    <div class="tabs">
  
    <input type="radio" id="tab1" name="tab-control" checked>
    <input type="radio" id="tab2" name="tab-control">
    
    <ul>
      <li title="Smart Quiz"><label for="tab1" role="button"><svg viewBox="0 0 24 24"><path d="M14,2A8,8 0 0,0 6,10A8,8 0 0,0 14,18A8,8 0 0,0 22,10H20C20,13.32 17.32,16 14,16A6,6 0 0,1 8,10A6,6 0 0,1 14,4C14.43,4 14.86,4.05 15.27,4.14L16.88,2.54C15.96,2.18 15,2 14,2M20.59,3.58L14,10.17L11.62,7.79L10.21,9.21L14,13L22,5M4.93,5.82C3.08,7.34 2,9.61 2,12A8,8 0 0,0 10,20C10.64,20 11.27,19.92 11.88,19.77C10.12,19.38 8.5,18.5 7.17,17.29C5.22,16.25 4,14.21 4,12C4,11.7 4.03,11.41 4.07,11.11C4.03,10.74 4,10.37 4,10C4,8.56 4.32,7.13 4.93,5.82Z"/>
  </svg><br><span>Smart Quiz</span></label></li>
      <li title="Smart Notes"><label for="tab2" role="button"><svg viewBox="0 0 24 24"><path d="M2,10.96C1.5,10.68 1.35,10.07 1.63,9.59L3.13,7C3.24,6.8 3.41,6.66 3.6,6.58L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.66,6.72 20.82,6.88 20.91,7.08L22.36,9.6C22.64,10.08 22.47,10.69 22,10.96L21,11.54V16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V10.96C2.7,11.13 2.32,11.14 2,10.96M12,4.15V4.15L12,10.85V10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V12.69L14,15.59C13.67,15.77 13.3,15.76 13,15.6V19.29L19,15.91M13.85,13.36L20.13,9.73L19.55,8.72L13.27,12.35L13.85,13.36Z" />
  </svg><br><span>Smart Notes</span></label></li>
   
    </ul>
    
    <div class="slider"><div class="indicator"></div></div>
    <div class="content">
      <section>
        <h2>Smart Quiz</h2>

        <div id="quiz_container"> <div class="loader"></div><div class="loader-text">Generating Smart Quiz. We use NLP and Machine Learnig to automatically generate smart quiz from video.</div>
    </div>
        
      </section>

    <section class="smart-notes">
            <h2>Smart Notes</h2>
            <span id="notes_container"> <div class="loader"></div><div class="loader-text">Generating Smart Notes. We use NLP and Machine Learnig to automatically generate smart notes from video.</div></span>
    </section>
    </div>
  </div>
    `;

    youtubeContainer.appendChild(appContainer);

    // var imgURL = chrome.runtime.getURL("images/icon.png");
    // document.getElementById("floki-app-icon").src = imgURL;
    // console.log(imgURL);
}

function exitApp(){
    console.log('[info floki] app exiting');
    var appContainer = document.querySelector('#floki-app');
    console.log(appContainer)
    if(!(appContainer == null)){
        console.log("not null")
        appContainer.remove()
    }
}

function addListenersForNotes(){
    var sentences = document.getElementsByClassName('notes-sentence');
    for(var i=0; i< sentences.length;i++){
        sentences[i].addEventListener('click',function ( event ) {
            console.log(event);
            var jumpToTime = event.target.id;
            var video = document.querySelector( 'video' );
            if ( video ) {
                video.currentTime = jumpToTime;
                window.scrollTo({top:20, behavior:'smooth'});
            }
        })
    }

    var notesDownloadButton = document.getElementById('notes-download-button');
    var notes = document.getElementById('notes-body');
    var notesCSS = `<style>.notes_ul{list-style-type:circle!important;padding:5px 10px;display:unset;margin-bottom:2px;justify-content:unset;align-items:unset;flex-wrap:nowrap;font-size:16px}.notes_ul .notes_item{list-style-type:circle!important;box-sizing:unset;flex:unset;width:unset;padding:5px 10%;text-align:unset;cursor:pointer}.summary{width:80%;font-size:12px;font-weight:400;margin:5px 10%;padding:5px;border:1px solid #428bff;color:#428bff;border-radius:5px}.summary-heading{font-size:14px;font-weight:400;text-align:center;color:#428bff;margin-bottom:5px}.tooltiptext{display:none}.tooltip{position: relative;display: inline-block;border-bottom: 1px dotted black;}</style>`;

    notesDownloadButton.addEventListener('click', function (event) {
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(notes.innerHTML);
    WinPrint.document.write(notesCSS);
    // WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
    });
}
function addListeners(){
    var buttonArr = document.getElementsByClassName('floki-jump-to-time-button');
    for(var i=0; i< buttonArr.length;i++){
        buttonArr[i].addEventListener('click',function ( event ) {
            var jumpToTime = event.target.value;
            var video = document.querySelector( 'video' );
            if ( video ) {
                video.currentTime = jumpToTime;
                window.scrollTo({top:20, behavior:'smooth'});
            }
        })
    }

    var submitQuizButton = document.getElementById('floki-submit-quiz-button');
    submitQuizButton.addEventListener('click', function (event) {
        var flokiCompleteElements = document.getElementsByClassName('floki-complete');
        for (var i = 0; i < flokiCompleteElements.length; i++) {
            flokiCompleteElements[i].style.display = "block";
        }

        var flokiOptionElements = document.getElementsByClassName('floki-options');
        var totalScore = 0;
        for (var i = 0; i < flokiOptionElements.length; i++) {
            var ele = flokiOptionElements[i].querySelectorAll("div input");  
            var isAnswered = false;
            var questionText = flokiOptionElements[i].previousElementSibling;
            for(var j = 0; j < ele.length; j++) {
                if(ele[j].checked){
                    console.log(ele[j].parentElement.parentElement.previousElementSibling.innerHTML);
                    isAnswered = true;
                    if(ele[j].value == questionsJSON.questions[i].correctIndex){
                        totalScore+=1;
                        ele[j].parentElement.style.color = "green";
                        questionText.innerHTML += ' <span class="ribbon correct-answer-ribbon">Correct</span>'
                    }else{
                        ele[j].parentElement.style.color = "red";
                        questionText.innerHTML += ' <span class="ribbon wrong-answer-ribbon">Incorrect</span>'
                    }
                    console.log('Q' + (i+1) + ' '+ (parseInt(ele[j].value)+1) +'; Correct Answer - '+ (questionsJSON.questions[i].correctIndex+1)); 
                }
                ele[j].disabled = true;
            } 
            if(!isAnswered){
                questionText.innerHTML += '<span class="ribbon not-answered-ribbon">Not Answered</span>'
                console.log('Q' + (i+1) + ' Unanswered; Correct Answer - '+ (questionsJSON.questions[i].correctIndex+1)); 
            }
        }
        var resultText = document.getElementById('floki-result-text');
        resultText.innerHTML = '';
        var numberOfQuestions = questionsJSON.questions.length;
        if(totalScore > .8*numberOfQuestions){
            resultText.innerHTML += 'Congratulations. You have passed this test. You have answered ';
        }
        else{
            resultText.innerHTML += 'Please try again once you are ready. You have answered ';

        }
        var totalPercent = parseFloat(((totalScore*100)/numberOfQuestions)).toFixed(1);
        var resultContainer = document.getElementById('floki-result-container');
        var resultPercent = document.getElementById('floki-result-percent');
        resultPercent.innerHTML = totalPercent;
        resultContainer.style.display = "block";
        resultText.innerHTML +=  totalScore + ` questions correctly out of `+ numberOfQuestions +` questions. Passing Score is 80%. Please scroll up to see the correct answers.`;
    });

    var resetQuizButton = document.getElementById('floki-reset-quiz-button');
    resetQuizButton.addEventListener('click', function (event) {
        createQuizHTML();
    });

    var tryAgainButton = document.getElementById('floki-try-again-button');
    tryAgainButton.addEventListener('click', function (event) {
        createQuizHTML();
    });

}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
      // listen for messages sent from background.js
      if (request.message === 'urlChanged') {
        setTimeout(startApp, 3000);
      }
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
      // listen for messages sent from background.js
      if (request.message === 'disabled') {
        exitApp();
      }
  });
