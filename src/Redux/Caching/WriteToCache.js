const WriteToCache = (store) => (next) => (action) => {
    const { type, payload } = action
    let data = payload[type]
    if (typeof data !== 'string') {
        data = JSON.stringify(data)
    }
    sessionStorage.setItem(type, data)

    next(action)
}

export default WriteToCache