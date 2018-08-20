function MakeScoreBoard(teams) {
    const scoreBoard = []

    for (let i = 0; i < teams.length; i++) {
        scoreBoard.push({
            name: teams[i],
            win: 0,
            loss: 0
        })
    }

    return scoreBoard
}

/* 
    scoreBoard: [
        team: {
            name: 'name',
            win: 0,
            loss: 0,
        }    
    ]
*/

export default MakeScoreBoard