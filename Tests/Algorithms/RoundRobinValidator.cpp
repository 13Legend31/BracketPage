#include "RoundRobin.h"

// O(n): n = sum(RoundRobinData[i].size())
bool Validate(vector<vector<TCard>> RoundRobinData, int n) {
    vector<unordered_map<int,int>> VS (n); // VS[i] is going to be the teams that team i has played against

    for (auto vec : RoundRobinData) {
        for (auto card : vec) {
            int Team1 = card.team1;
            int Team2 = card.team2;

            if (Team1 != -1 && Team2 != -1) {
                if (VS[Team1].find(Team2) != VS[Team1].end() || VS[Team2].find(Team1) != VS[Team2].end()) {
                    return false;
                }
                VS[Team1][Team2] = 1;
                VS[Team2][Team1] = 1;
            }
        }
    }
    for (int i = 0; i < VS.size(); i++) {
        //cout << (VS[i].find(i) != VS[i].end()) << endl;
        if (VS[i].size() != n - 1 || VS[i].find(i) != VS[i].end()) {
            return false;
        }
        /* cout << (VS[i].size()) << endl;
        if (VS[i].size() != n-1)
            return false; */
    }

    return true;
}

int main() {
    
    for (int i = 2; i <= 256; i++) {
        vector<int> Teams;
        for (int j = 0; j < i; j++) {
            Teams.push_back(j);
        }

        vector<vector<TCard>> RoundRobinData = RoundRobinFormatter(Teams);
        if (Validate(RoundRobinData, i)) {
            cout << "Team of size " << i << " is valid" << endl;
        } else {
            cout << "ERROR ERROR ERROR - TEAM OF SIZE " << i << " IS INVALID, FIX ALGORITHM" << endl;
            break;
        }
    }
    cout << "END OF VALIDATION" << endl;

    KeepWindowOpen();
    return 0;
}