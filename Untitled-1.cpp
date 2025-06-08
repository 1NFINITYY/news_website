#include<bits/stdc++.h>
using namespace std;


    int distSubSeq(string s)
    {
        unordered_map<char, int> last;
        int count = 1;

        for (auto ch : s) {
            int newCount = 2 * count;

            if (last.find(ch) != last.end())
                newCount -= last[ch];

            last[ch] = count;
            count = newCount;
        }
        return count;
    }

    void betterString(string s1, string s2) {
        int distSubSeq1 = distSubSeq(s1);
        int distSubSeq2 = distSubSeq(s2);

        cout<<distSubSeq1<<"   "<<distSubSeq2;

    }


int main(){
    string s1="almlm",s2="jkajk";

betterString(s1,s2);

return 0;
}