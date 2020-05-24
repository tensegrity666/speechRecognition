const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const colors = ['dark', 'light', 'white'];
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

const recognition = new SpeechRecognition();

const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;

const diagnostic = document.querySelector('.output');
const page = document.querySelector('.page');
const button = document.querySelector('#speech-btn');

const ding = new Audio('10.mp3');
const dong = new Audio('11.mp3');
const error = new Audio('20.mp3');

let micOn = false;

onClick = () => {
  if (!micOn) {
    recognition.start();
  }
}

button.addEventListener('click', onClick);

recognition.onaudiostart = () => {
  ding.play();
  micOn = true;
};

recognition.onresult = (event) => {
  const result = event.results[0][0].transcript.toLowerCase();

  if (colors.includes(result)) {
    switch (result) {
      case 'dark':
        page.classList.add('theme_dark');
        break;

      case 'white':
        page.classList.remove('theme_dark');
        break;

      default:
        page.classList.remove('theme_dark');
        break;
    }
  }
  console.log(result)
}

recognition.onspeechend = () => {
  recognition.stop();
  dong.play();
  micOn = false;
}

recognition.onnomatch = () => {
  error.play();
  diagnostic.textContent = `I didn't recognise it.`;
  micOn = false;
}

recognition.onerror = (event) => {
  error.play();
  if (event.error !== 'no-speech') {
    diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
  }
  micOn = false;
}
