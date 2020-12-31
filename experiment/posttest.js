
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
    question: "Hydraulic ram is a pump which works on the principle of",
    answers: {
      a: "Water hammer",
      b: "Hydraulic press",
      c: "Reciprocating action",
      d: "Centrifugal action"
    },
    correctAnswer: "a"
  },

  {
    question: "The transmission due to change in the velocity and the direction of fluid flow is",
    answers: {
      a: "Hydro kinematics system",
      b: "Hydrostatic system",
      c: "Hydrodynamic system",
      d: "All the above"
    },
    correctAnswer: "a"
  },

  {
    question: "The head of water required to operate the ram pump is",
    answers: {
      a: "1meter-10meter",
      b: "0.5meter-7.5meters",
      c: "5meter -15meter",
      d: "Any head"

    },
    correctAnswer: "b"
  },
  {
    question: "Hydraulic ram pump can be operated when it is fully submerged.( Say true or false)",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "a"
  },
  {
    question: "Water hammer in a pipeline results from the",
    answers: {
      a: "Bursting of pipelines due to closure by a valve",
      b: "Rapid pressure change due to a rapid change in the rate of flow",
      c: "Pressure increase due to closure of a valve resulting in decrease in rate of flow",
      d: "None of these"
    },
    correctAnswer: "c"
  }
];



// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
