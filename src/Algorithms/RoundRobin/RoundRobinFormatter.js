let info = {
    team1:'',
    team2:'',
    team1Score: 0,
    team2Score: 0,
    winner: ''
}

function ShiftLeft(teams, low, high) {
    let placeholder = teams[low]
    teams[low] = teams[high]
    for (let i = low + 1; i <= high; i++) {
        let temp = teams[i]
        teams[i] = placeholder
        placeholder = temp
    }
}

// IMRPROVE PERFORMANCE HERE
function RoundRobinFormatter(teams, bestOfRoundRobin) {
    let n = teams.length
    const rounds = n%2 === 0 ? n - 1 : n
    if (n%2 !== 0) {
        teams.push(null)
        n++
    }

    let roundRobinData = []
    for (let i = 0; i < rounds; i++) {
        roundRobinData.push({
            TCardList:[],
            bestOf:bestOfRoundRobin[0]
        })
        // the problem is here
        for (let j = 0; j < n/2; j++) {
            let team1 = teams[j],
                team2 = teams[n - j - 1]
            
            if (team1 && team2) {
                let TCard = {...info}
                TCard.team1 = team1
                TCard.team2 = team2
                roundRobinData[i].TCardList.push(TCard)
            }
        }
        ShiftLeft(teams, 1, n - 1)
    }

    if (!teams[teams.length - 1]) { 
        teams.pop() 
    }
    
    return new Promise((resolve, reject) => {
        if (roundRobinData) {
            resolve(roundRobinData)
        } else {
            reject()
        }
    })
}

/* 
    roundRobinData = [
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

export default RoundRobinFormatter