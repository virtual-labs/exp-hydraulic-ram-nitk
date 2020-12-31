
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

const myQuestions = [
  {
    question: "A hydraulic ram is a device used to",
    answers: {
      a: "Store the energy of water",
      b: "Increase the pressure of water",
      c: "To lift water from deep wells",
      d: "To lift small quantity of water to a greater height when a large quantity of water is available at a smaller height"
    },
    correctAnswer: "d"
  },

  {
    question: "Maximum impulse will be developed on hydraulic ram when",
    answers: {
      a: "Supply pipe is long",
      b: "Ram chamber is large",
      c: "Supply pipe is short",
      d: "Waste valve closes suddenly"
    },
    correctAnswer: "d"
  },

  {
    question: "Too high delivery height causes",
    answers: {
      a: "Reduction in a delivery flow",
      b: "Reduction in efficiency of the pump",
      c: "All the above",
      d: "None of the above"
    },
    correctAnswer: "c"
  },
  {
    question: "Hydraulic ram is used to lift water from deep wells: (Say true or false)",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "a"
  },
  {
    question: "Hydraulic ram acts as an _____ pump",
    answers: {
      a: "Reciprocating",
      b: "Impulse",
      c: "Centrifugal",
      d: "Parallel cylinder"
    },
    correctAnswer: "b"
  }
];





// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
