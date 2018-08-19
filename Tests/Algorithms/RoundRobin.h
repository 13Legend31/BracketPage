#include <iostream>
#include <vector>
#include <unordered_map>
#include <set>
#include <string>
#include <algorithm>
#include <climits>

using namespace std;

void KeepWindowOpen() {
    int a;
    cin >> a;
}

struct TCard {
    int team1,
        team2;    
    TCard(int t1, int t2) : team1(t1), team2(t2) {}
};

void ShiftLeft(vector<int>& Teams, int L, int H) {
    int Pivot = Teams[L];
    Teams[L] = Teams[H];
    for (int i = L + 1; i <= H; i++) {
        swap(Teams[i], Pivot);
    }
}

// O(n^2)
vector<vector<TCard>> RoundRobinFormatter(vector<int>& Teams) {
    int n = Teams.size();
    int rounds = n%2 == 0 ? n - 1: n;
    if (n%2 != 0) {
        Teams.push_back(-1); 
        n++;
    }

    vector<vector<TCard>> RoundRobinData(rounds);
    for (int i = 0; i < rounds; i++) {
        for (int j = 0; j < n/2; j++) {
            int Team1 = Teams[j],
                Team2 = Teams[n - j - 1];
            
            if (Team1 != -1 && Team2 != -1) {
                TCard TC (Team1, Team2);
                RoundRobinData[i].push_back(TC);
            }
        }
        ShiftLeft(Teams, 1, Teams.size() - 1);
    }
    return RoundRobinData;
}