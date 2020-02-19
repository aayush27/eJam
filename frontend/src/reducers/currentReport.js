const currentReport = (state = {}, action) => {
    switch (action.type) {
        case "SET_REPORT":
            return {
                ...state,
                report: action.payload,
            }
        default:
            return state
    }
}

export default currentReport;