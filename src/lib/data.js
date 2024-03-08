'use server'

export async function fetchUrl(url) {
    const data = await fetch(url)
    const dataJson = await data.json()
    console.log(dataJson)
    return dataJson
}

export async function fetchMetaById(url, id) {
    const data = await fetch(url)
    const dataJson = await data.json()
    console.log(dataJson)
    return dataJson
}
