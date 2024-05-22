const URL = 'https://servertask-e9gn.onrender.com/api/event'


export async function getEvents() {
    let res = await fetch(URL)
    let data = await res.json()
    return data
}

export async function getEvent(id) {
    let res = await fetch(`${URL}/${id}`)
    let data = await res.json()
    return data
}


export async function registerOnEvent(data, id) {
    let res = await fetch(`${URL}/${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
}
