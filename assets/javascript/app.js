/*
  Trivia Quiz Game
*/

// An array of objects for questions and answers
const triviaQuiz = [{
    question: 'Which of the following biblical figures is not a son of "Adam and Eve"?',
    choice: ["Seth", "Cain", "Abel", "Enoch"],
    answer: {
      ndx: 3,
      comment: "Cain had a son named Enoch."
    },
  },
  {
    question: 'Shaped like a butterfly, what gland helps regulate energy in the body ?',
    choice: ['Thymus', 'Parathyroid', 'Adrenal', 'Thyroid'],
    answer: {
      ndx: 3,
      comment: 'The primary function of the thyroid is the production of iodine.',
    },
  },
  {
    question: 'Playing for the Cincinnati Reds from 1967 to 1983, what position was former baseball champ "Johnny Bench" ?',
    choice: ['Shortstop', 'Pitcher', 'Second Base', 'Catcher'],
    answer: {
      ndx: 3,
      comment: 'Bench won two World Series(1975, 1976).',
    },

  },
  {
    question: 'Which of the following James Bond films was not released during the 1980 s ?',
    choice: ['For Your Eyes Only', 'Moonraker', 'A View to a Kill', 'Octopussy'],
    answer: {
      ndx: 1,
      comment: 'Featuring Roger Moore as James Bond, Moonraker was released in 1979.',
    },
  },
  {
    question: 'Considered one of the most dangerous volcanoes in the world, Mount Rainier can be found in which US state ?',
    choice: ['Montana', 'Washington', 'Ohio', 'Michigan'],
    answer: {
      ndx: 1,
      comment: 'Mount Rainier is located in the Mount Rainier National Park.',
    },
  },
  {
    question: 'What is the symbol for the chemical element iron ?',
    choice: ['Ir', 'In', 'I', 'Fe'],
    answer: {
      ndx: 3,
      comment: "Iron's atomic number is 26.",
    },
  },
  {
    question: 'What did Canadian electrical engineer, Brent Townshend, invent in 1996 ?',
    choice: ['WIFI', 'DVD Player', 'Java Programming Language', '56 K Bit / sec Modem'],
    answer: {
      ndx: 3,
      comment: "Licensing fees for the technology was as much as $2 .50 per modem when first introduced.",
    },
  },
  {
    question: 'An influential figure in jazz music, Louis Armstrong primarily played what instrument ?',
    choice: ['Saxophone', 'Clarinet', 'Piano', 'Trumpet'],
    answer: {
      ndx: 3,
      comment: "Armstrong was inducted into the Rhythm and Blues Hall of Fame in 2017.",
    },
  },
  {
    question: 'Consisting primarily of water and ethanol, Vodka is the traditional drink for this country.',
    choice: ['England', 'Russia', 'Canada', 'France'],
    answer: {
      ndx: 1,
      comment: "Vodka is traditionally drunk 'neat'.",
    },
  },
  {
    question: 'Which English novelist wrote the novels "1984" and "Animal Farm" ?',
    choice: ['H.G.Wells', 'James Joyce', 'George Orwell', 'William Golding'],
    answer: {
      ndx: 2,
      comment: "Other notable works are 'Homage to Catalonia' and 'Down and Out in Paris and London'.",
    },
  },
  {
    question: "One of the traditional birthstones for March, this gem's name means speckled or spotted stone.",
    choice: ['Emerald', 'Onyx', 'Jasper', 'Ruby'],
    answer: {
      ndx: 2,
      comment: "Jasper is an opaque rock of virtually any color.",
    },
  },
  {
    question: 'Playing the role of Amy Benic, what actress stars opposite Val Kilmer in the 1999 romantic film "At First Sight" ?',
    choice: ['Julia Campbell', 'Lisa Kudrow', 'Mena Suvari', 'Mira Sorvino'],
    answer: {
      ndx: 3,
      comment: "At First Sight was inspired by the true life story of Shirl Jennings.",
    },
  },
  {
    question: 'A leading artist in the court of King Philip IV, the Spanish painter Diego Velazquez was known for what style of paintings ?',
    choice: ['Religious works', 'Still Live', 'Portraits', 'Landscapes'],
    answer: {
      ndx: 2,
      comment: "Velazquez was one of the most important painters of the Spanish Golden Age.",
    },
  },
  {
    question: 'What film won the "Best Picture Oscar" at the 51 st Academy Awards held in April of 1979 ?',
    choice: ["Thank God It 's Friday", 'Midnight Express', 'Heaven Can Wait', 'The Deer Hunter'],
    answer: {
      ndx: 3,
      comment: "The Deer Hunter won five Academy Awards including Best Picture.",
    },
  },
  {
    question: "Released in 1987, what is the name of Guns N' Roses' debut album ?",
    choice: ["Appetite for Destruction", "Guns N ' Roses", "Use Your Illusion", "G N' R Lies"],
    answer: {
      ndx: 0,
      comment: "As of 2018, Appetite for Destruction is the 11 th bestselling album in the United States.",
    },
  },
]

//
// The scope of setTimeout() and setInterval() is global/window, imposing a problem w/ "this". 
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#The_this_problem
// The workaround to enable the passage of the 'this' object through the JavaScript timers
//
var __nativeST__ = window.setTimeout,
  __nativeSI__ = window.setInterval;

window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */ ) {
  var oThis = this,
    aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeST__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};

window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */ ) {
  var oThis = this,
    aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeSI__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};

//
// Timer object for counting down seconds for the trivia quiz
//
const timer = {
  id: 0,              // setInterval will return non-zero
  mSec: 1000,         // timer interval in micro seconds
  callerObj: null,    // Object/class using this timer
  callbackFunc: null, // callback function
  counter: 10,        // Timer counter in seconds
  start: function (timeLimit = 10) {
    if (timer.id) {
      timer.stop();
    }
    timer.counter = timeLimit;
    timer.id = setInterval.call(timer.callerObj, timer.callbackFunc, timer.mSec);
  },
  stop: function () {
    if (timer.id) {
      clearInterval(timer.id);
      timer.id = null;
    }
  }
}

//
// A class for running the trivia quiz game
//
class QuizRunner {
  constructor(quizObj, timeLimitSec = 10) {
    this.srcQuiz = quizObj;         // quiz data object
    this.ndxQuiz = -1;              // current quiz array index
    this.timeLimit = timeLimitSec;  // time limit per quiz in second
  }

  //
  // (re-)Start the quiz game
  //
  start() {
    if ((this.ndxQuiz + 1) < this.srcQuiz.length) {
      this.ndxQuiz++;
      this.nextQuiz();
    } else {
      this.ndxQuiz = 0;
      // TO-DO: Show restart button
    }
  }

  //
  // Next quiz
  // 1. Start the countdown timer
  // 2. Show a new question
  // 3. Wait for an user click event
  //
  nextQuiz() {
    timer.callerObj = this;
    timer.callbackFunc = this.countDown;
    timer.start(this.timeLimit);
    this.showQuestion(this.srcQuiz[this.ndxQuiz]);
    $(".choice").on("click", this, this.userAnswer);
  }

  //
  // A callback function for the countdown timer
  //
  countDown() {
    timer.counter--;
    $("#timer").html("<h2>" + timer.counter + "</h2>");
    $("#timer").text(timer.counter);

    if (timer.counter === 0) {
      timer.stop();
      timer.callerObj.showAnswer();
    }
  }

  //
  // 1. Display a question from the quiz data object
  // 2. List the choices with "choice" css class
  //
  showQuestion(quiz) {
    $(".trivia").html("<h2>" + quiz.question + "</h2>");
    for (let i = 0; i < quiz.choice.length; i++) {
      $(".trivia").append(`<h3 class="choice">${quiz.choice[i]}</h3>`);
    }
  }

  //
  // An event handler for user click on one of the answer choices.
  // 1. Identify the user selection by an array index
  // 2. Identify the correct answer by an array index
  // 3. Call showAnswer()
  //
  userAnswer(event) {
    timer.stop();

    let self = event.data;
    let selected = this.innerText;
    let ansNdx = self.srcQuiz[self.ndxQuiz].answer.ndx;
    let selNdx = self.srcQuiz[self.ndxQuiz].choice.findIndex(function(item) {
      return item === selected;
    });

    console.log("selected = " + this.innerText + " [" + selNdx + "]");
    console.log("answer ndx = " + ansNdx);

    self.showAnswer(selNdx === ansNdx);
  }

  //
  // 
  //
  showAnswer(isCorrect = false) {
    this.clearChoices(this.srcQuiz[this.ndxQuiz].choice);
    let aNdx = this.srcQuiz[this.ndxQuiz].answer.ndx;

    $(".trivia").html(this.srcQuiz[this.ndxQuiz].choice[aNdx]);

    if (isCorrect) {
      $(".trivia").append(" CORRECT! <br>")
    }

    $(".trivia").append("<br>", this.srcQuiz[this.ndxQuiz].answer.comment);
    setTimeout.call(this, this.start, 3000); // pause 3 seconds
  }

  //
  // Clean up the choice class for a quiz
  //
  clearChoices(choices) {
    $(".trivia").removeClass("choice");
    $(".trivia").empty();
  }
}
