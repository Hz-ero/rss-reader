const reducerCreator = (initState, handlers) => {
    return (state = initState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }        
    }
}

export default reducerCreator