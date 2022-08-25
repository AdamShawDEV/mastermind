import { useReducer } from "react";

const initial = {
    gamesPlayed: 0,
    winNum: 0,
    currStreak: 0,
    maxStreak: 0,
};

function reducer(state, action) {

    let newState = {};

    switch (action.type) {
        case 'logWin':
            newState = {
                gamesPlayed: state.gamesPlayed + 1,
                winNum: state.winNum + 1,
                currStreak: state.currStreak + 1,
                maxStreak: state.currStreak + 1 > state.maxStreak ?
                    state.currStreak + 1 : state.maxStreak,
            };
            break;
        case 'logLoss':
            newState = {
                ...state,
                gamesPlayed: state.gamesPlayed + 1,
                currStreak: 0,
            }
            break;
        default:
            console.log('invalid action in stats');
    }

    localStorage.setItem('statistics', JSON.stringify(newState));
    return newState;
}

function init(initialValue) {
    let stats = {};
    try {
        stats = JSON.parse(localStorage.getItem('statistics')) ?? initialValue; 
    } catch {
        console.log('unable to parse statistics from local storage');
        stats = initialValue
    }
    return stats;
}

function useStats() {
    const [stats, statsDispatch]  = useReducer(reducer, initial, init);

    return { stats, statsDispatch };
}

export default useStats;