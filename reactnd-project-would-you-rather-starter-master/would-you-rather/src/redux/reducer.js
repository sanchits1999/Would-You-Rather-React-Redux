const initialState = {
    signedIn: null,
    response: [],
    questions: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "signin": return { ...state, signedIn: action.payload }
            break
        case "signout": return { ...state, signedIn: null }
            break
        case "setresponse": return { ...state, response: action.payload }
            break
        case "setquestions": return { ...state, questions: action.payload }
            break
        case "addquestion": return { response: state.response.filter((u) => { return u.id != action.payload.author }).concat({ ...state.signedIn, questions: state.signedIn.questions.concat(action.payload.id) }), signedIn: { ...state.signedIn, questions: state.signedIn.questions.concat(action.payload.id) }, questions: state.questions.concat(action.payload) }
            break
        case "addanswer": return { response: state.response.filter((u) => { return u.id != action.payload.author.id }).concat(action.payload.author), signedIn: action.payload.author, questions: state.questions.filter((q) => { return q.id !== action.payload.question.id }).concat(action.payload.question) }
            break
        default: return state
    }
}

export default reducer