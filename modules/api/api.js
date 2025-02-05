import {API_URL, YOUR_TOKEN} from '../config/env.js'


export async function siteClassifyAI(url) {
    let _url = `${API_URL}${url}`
    const response = await fetch(_url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${YOUR_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Errore nella richiesta')
    }  
    return response.json()
}