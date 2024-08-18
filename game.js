const questionText = document.getElementById('question')
const choicesArr = Array.from(document.getElementsByClassName('choice-text'))
const progressText = document.getElementById('progress-text')
const scoreText = document.getElementById('score')
const timerText = document.getElementById('timer')
const timerBar = document.getElementById('timer-bar')

let score = 0
let questionCounter = 0
let currentQuestion = {}
let availableQuestions = []
let timer
let acceptingAnswers = false

const MAX_QUESTIONS = 10
const CORRECT_BONUS = 10
const MAX_TIME = 15

let questionsArr = [
  {
    question: 'Em qual elemento HTML nós inserimos o JavaScript?',
    choice1: '<script>',
    choice2: '<javascript>',
    choice3: '<js>',
    choice4: '<scripting>',
    answer: 1,
  },
  {
    question:
      "Qual é a sintaxe correta para referenciarmos um arquivo externo do javascript 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: "Como você escreve 'Hello World' em um alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
  {
    question: 'O que significa a sigla CSS?',
    choice1: 'Colorful Style Sheets',
    choice2: 'Creative Style Sheets',
    choice3: 'Cascading Style Sheets',
    choice4: 'Computer Style Sheets',
    answer: 3,
  },
  {
    question: "Qual atributo HTML é usado pra definir estilos 'inline' do CSS?",
    choice1: 'styles',
    choice2: 'style',
    choice3: 'class',
    choice4: 'font',
    answer: 2,
  },
  {
    question:
      'Qual dessas alternativas representa a sintaxe correta usada no CSS?',
    choice1: 'body:color=black;',
    choice2: '{body;color:black;}',
    choice3: 'body {color: black;}',
    choice4: '{body:color=black;}',
    answer: 3,
  },
  {
    question:
      'Qual é a forma correta de se inserir comentários em um arquivo CSS?',
    choice1: '/* this is a comment */',
    choice2: '// this is a comment',
    choice3: "' this is a comment",
    choice4: '// this is a comment //',
    answer: 1,
  },
  {
    question:
      'Qual propriedade é usada para alterar a cor de fundo de um elemento no CSS?',
    choice1: 'bgcolor',
    choice2: 'background-color',
    choice3: 'color',
    choice4: 'bg-color',
    answer: 2,
  },
  {
    question:
      'Qual é a forma correta de adicionar uma cor de fundo para todos os elementos <h1> da página?',
    choice1: 'all.h1 {background-color: #FFFFFF;}',
    choice2: 'h1.setAll {background-color: #FFFFFF;}',
    choice3: 'h1 {background-color: #FFFFFF;}',
    choice4: 'h1.all {background-color: #FFFFFF;}',
    answer: 3,
  },
  {
    question:
      'Qual evento Javascript ocorre quando o usuário clica em um elemento html?',
    choice1: 'onchange',
    choice2: 'onmouseover',
    choice3: 'onmouseclick',
    choice4: 'onclick',
    answer: 4,
  },
  {
    question:
      'Qual é a forma correta de se declarar uma variável no JavaScript?',
    choice1: 'v carName;',
    choice2: 'var carName;',
    choice3: 'variable carName;',
    choice4: 'var: carName;',
    answer: 2,
  },
  {
    question:
      'Qual operador é usado para atribuir valor a uma variável no Javascript?',
    choice1: '*',
    choice2: 'x',
    choice3: '=',
    choice4: '-',
    answer: 3,
  },
  {
    question:
      'Assinale a alternativa que representa o retorno do código: Boolean(10 > 9)',
    choice1: 'NaN',
    choice2: 'false',
    choice3: 'true',
    choice4: 'undefined',
    answer: 3,
  },
  {
    question:
      'Qual função do JavaScript é usada para buscar uma string e convertê-la em um inteiro?',
    choice1: 'parseInt()',
    choice2: 'parseFloat()',
    choice3: 'parse()',
    choice4: 'intParse()',
    answer: 1,
  },
]

startGame = () => {
  score = 0
  questionCounter = 0
  availableQuestions = [...questionsArr]
  getNewQuestion()
}

getNewQuestion = () => {

  questionCounter++

  timerBar.classList.add('timer-countdown')

  clearInterval(timer)

  acceptingAnswers = true

  // Pegar uma questão aleatória e jogar seu enunciado na tela
  const randomIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[randomIndex]
  questionText.innerText = currentQuestion.question
  

  choicesArr.forEach((choice) => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(randomIndex, 1)

  progressText.innerText = ` Progresso: questão ${questionCounter} de ${MAX_QUESTIONS}`

  let time = MAX_TIME
  timerText.innerText = ` Tempo restante: ${time} `
  timer = setInterval(() => {
    time--
    timerText.innerText = ` Tempo restante: ${time} `
    if(time <= 0){
      timerBar.classList.remove('timer-countdown')
      clearInterval(timer)
      getNewQuestion()
    }
  }, 1000)

  barTimeout = setTimeout(() => {
    timerBar.classList.remove('timer-countdown')
  }, 14900)

  if( questionCounter > MAX_QUESTIONS ){
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('/end.html')
  }

}

choicesArr.forEach((choice) => {

  choice.addEventListener('click', e => {

    if(!acceptingAnswers) return

    acceptingAnswers = false

    timerBar.classList.remove('timer-countdown')

    selectedChoice = e.target
    selectedAnswer = selectedChoice.dataset['number']

    
    const answerValue =
    selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
    
    selectedChoice.parentElement.classList.add(answerValue)

    if(answerValue == 'correct'){
      score += CORRECT_BONUS
      scoreText.innerText = ` Pontuação: ${score} `
    }

    setTimeout(() => {
      clearInterval(barTimeout)
      timerBar.classList.remove('timer-countdown')
      selectedChoice.parentElement.classList.remove(answerValue)
      getNewQuestion()
    }, 1000);

  })

})

startGame()
