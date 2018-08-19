function WinnerRemover(round, position, data) { //number, number, boolean, object
    while (round < data.length) {
        const teamToErase = position%2 === 0 ? 'team1' : 'team2' // this needs to be based on previous team position
        position = Math.floor(position/2)
        const TCard = data[round].TCardList[position]
        TCard[teamToErase] = ''
        TCard.team1Score = 0
        TCard.team2Score = 0
        TCard.winner = ''

        round++
    }
}

export default WinnerRemover