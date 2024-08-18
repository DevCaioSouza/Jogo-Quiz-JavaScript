const finalScore = document.getElementById('finalScore')
const saveScoreForm = document.getElementById('saveScoreForm')
const username = document.getElementById('username')

const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = ` Sua pontuação final foi: ${mostRecentScore} `

saveScoreForm.addEventListener('submit', e => {

  e.preventDefault()

  const score = {
    score: mostRecentScore,
    name: username.value
  }

  highScores.push(score)

  highScores.sort((a, b) => b.score - a.score)

  highScores.splice(MAX_HIGH_SCORES)

  localStorage.setItem('highScores', JSON.stringify(highScores))
  window.location.assign('highscores.html')
})