const highScoresList = document.getElementById('highScoresList')

const highScores = JSON.parse(localStorage.getItem('highScores'))

highScores.splice(5)

highScoresList.innerHTML = highScores
  .map(score => ` <li> ${score.name} - ${score.score} </li> `)
  .join('')