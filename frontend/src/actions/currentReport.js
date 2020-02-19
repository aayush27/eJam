const setReport = (weatherObj) => {
    return {
        type: "SET_REPORT",
        payload: weatherObj
    }
}

export default {
    setReport
}