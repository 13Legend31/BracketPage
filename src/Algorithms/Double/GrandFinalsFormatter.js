function GrandFinalsFormatter(bestOf) {
    return [
        {
            TCardList:[
                {  
                    team1: '',
                    team2: '',
                    team1Score: 0,
                    team2Score: 0,
                    winner:'',
                    placeholderTop:'Winner of Upper Bracket',
                    placeholderBottom:'Winner of Lower Bracket'
                }
            ],
            bestOf:bestOf[0]
        }
    ]
}

export default GrandFinalsFormatter