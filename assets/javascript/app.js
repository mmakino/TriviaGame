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


const timer = {
  id: null,
  mSec: 1000,
  callBackFunc: null,
  expireFunc: null,
  counter: 10,
  start: function() {
    if (timer.id) {
      timer.stop();
    }
    timer.id = setInterval(timer.callBackFunc, timer.mSec);
  },
  stop: function() {
    if (timer.id) {
      clearInterval(timer.id);
      timer.id = null;
    }
  }  
}


class QuizRunner {
  constructor(quizObj, timeLimitSec = 10) {
    this.srcQuiz = quizObj;         // quiz data object
    this.ndxQuiz = 0;               // current quiz array index
    this.timeLimit = timeLimitSec;  // time limit per quiz in second
  }

  start() {
    timer.timeLimit = this.timeLimit;
    timer.callBackFunc = this.countDown;
    timer.expireFunc = this.showAnswer;
    timer.start();
    this.showQuestion(this.srcQuiz[this.ndxQuiz]);
    $(".trivia").on("click", ".choice", this.userAnswer);
  }

  countDown() {
    timer.counter--;
    $("#timer").html("<h2>" + timer.counter + "</h2>");
    $("#timer").text(timer.counter);
  
    if (timer.counter === 0) {
      timer.stop();
      timer.expireFunc();
    }
  }
  
  showQuestion(quiz) {
    $(".trivia").html("<h2>" + quiz.question + "</h2>");
    for (let i = 0; i < quiz.choice.length; i++) {
      $(".trivia").append(`<h3 class="choice" id="c-${i}">${quiz.choice[i]}</h3>`);
    }
  }
  
  userAnswer() {
    timer.stop();
    let ansIndex = parseInt($(this).attr("id").charAt(2));
    console.log("id = " + $(this).attr("id"));
    console.log("Index = " + ansIndex);
  }
  
  showAnswer() {
    let aNdx = this.srcQuiz[this.ndxQuiz].answer.ndx;
    $(".trivia").html(this.srcQuiz[this.ndxQuiz].choice[aNdx] + "<br>");
    $(".trivia").append(this.srcQuiz[this.ndxQuiz].answer.comment);
    this.ndxQuiz++;
    setTimeout(this.start, 3000);
  }
}
