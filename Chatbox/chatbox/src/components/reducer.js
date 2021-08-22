const initailState = {
    userLoggedIn: null
}

export default function reducer(state = initailState, action) {
    console.log(action);
    let newState = { ...state }
    switch (action.type) {
        case "LOGIN":
            newState.userLoggedIn = action.payload;
            console.log(newState.userLoggedIn);
            break;

        case "LOGOUT":
            newState.userLoggedIn = null;
            console.log(newState.userLoggedIn);
            break;
    }
    return newState;
}

