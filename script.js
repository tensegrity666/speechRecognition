const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const colors = ['dark', 'light'];
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

let micOn = false;

onClick = () => {
  if (!micOn) {
    ding.play();
    recognition.start();
    micOn = true;
  }
}

button.addEventListener('click', onClick);

recognition.onresult = (event) => {
  const result = event.results[0][0].transcript;

  if (colors.includes(result)) {
    switch (result) {
      case 'dark':
        page.classList.add('theme_dark');
        break;

      default:
        page.classList.remove('theme_dark');
        break;
    }
  }

  console.log(result);
}

recognition.onspeechend = () => {
  recognition.stop();
  dong.play();
  micOn = false;
}

recognition.onnomatch = () => {
  diagnostic.textContent = `I didn't recognise that color.`;
  micOn = false;
}

recognition.onerror = (event) => {
  dong.play();
  diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
  micOn = false;
}
