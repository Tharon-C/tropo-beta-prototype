const initState = {
    sidebarOpen: true
}

export default function appState( state = initState, action) {
    switch(action.type) {
        case "CLOSE_SIDEBAR": 
        return {
            sidebarOpen: false
        }
        case "OPEN_SIDEBAR": 
        return {
            sidebarOpen: true
        }
        default:
            return state
    }
}
