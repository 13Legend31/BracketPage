let info = {
    team1:'',
    team2:'',
    team1Score: 0,
    team2Score: 0,
    winner: '',
    num:null
}

function SingleElimFormatter(teams, bestOfSingle) {
    const singleElimData = []
    const N = teams.length
    const P = Math.pow(2, Math.ceil(Math.log(N)/Math.log(2))) // lowest power of 2 greater than or equal to N
    let num = 1

    // Round 1
    singleElimData.push({
        TCardList:[],
        bestOf:bestOfSingle[0]
    })
    const teamsInFirstRound = 2*N - P // guarenteed to be even because 2*N is even and P is even
    for (let i = 0; i < teamsInFirstRound; i += 2) {
        let TCard = {...info}
        TCard.team1 = teams[i]
        TCard.team2 = teams[i + 1]
        TCard.num = num
        num++
        singleElimData[0].TCardList.push(TCard)
    }

    // Round 2
    if (teams.length > 2) {
        singleElimData.push({
            TCardList:[],
            bestOf:bestOfSingle[1]
        })
    }
    const teamsInSecondRound = N === 2 ? 0 : teamsInFirstRound/2 // edge case if odd
    const secondRound = []
    for (let i = 0; i < teamsInSecondRound; i++) {
        secondRound.push('')
    }
    for (let i = teamsInFirstRound; i < teams.length; i++) {
        secondRound.push(teams[i])
    }
    for (let i = 0; i < secondRound.length; i += 2) {
        let TCard = {...info}
        TCard.team1 = secondRound[i]
        TCard.team2 = secondRound[i + 1]
        TCard.num = num
        num++
        singleElimData[1].TCardList.push(TCard)
    }

    // Round 3+
    let teamsInNextRound = secondRound.length/2
    for (let i = 2; teamsInNextRound >= 2; i++, teamsInNextRound /= 2) {
        singleElimData.push({
            TCardList:[],
            bestOf:bestOfSingle[i]
        })
        for (let j = 0; j < teamsInNextRound; j+=2) {
            let TCard = {...info}
            TCard.num = num
            num++
            singleElimData[i].TCardList.push(TCard)
        }
    }

    return new Promise((resolve, reject) => {
        if (singleElimData) {
            resolve(singleElimData)
        } else {
            reject()
        }
    })
}

/* 
    singleElimData = [
        {
            TCardList:[
                {  
                    team1:,
                    team2:,
                    team1Score:,
                    team2Score:,
                    winner:''
                },
                {
                    ...
                }
            ],
            bestOf:1
        },
        {
            ...
        }
    ]
*/

export default SingleElimFormatter