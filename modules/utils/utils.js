import * as cfg from '../config/env.js'

/* @@ init function @@ */

const DEBUG = true
const _url = cfg.api_url_prod

let cookies = null
let token = null

const states = {
    login: document.getElementById('loginState'),
    save: document.getElementById('saveState'),
    loading: document.getElementById('loadingState'),
    success: document.getElementById('successState')
}

export const logger = {
    log: (...args) => DEBUG && console.log('[DEBUG]:', ...args),
    error: (...args) => console.error('[ERROR]:', ...args),
    warn: (...args) => console.warn('[WARN]:', ...args),
    info: (...args) => console.info('[INFO]:', ...args)
}

/* @@ state management @@ */
  
  
Object.entries(states).forEach(([name, element]) => {
    if (!element) {
        logger.error(`Missing state element: ${name}`);
    }
})
  
export function showState(stateName) {
  
    //logger.log(`Changing state to: ${stateName}`)
    
    if (!states[stateName]) {
        logger.error(`Invalid state name: ${stateName}`)
        return
    }
    
    Object.entries(states).forEach(([name, state]) => {
        state.classList.add('hidden')
        //logger.log(`${name} state hidden`)
    })
    
    states[stateName].classList.remove('hidden')
    logger.log(`${stateName} state shown`)
}

/* @@ cookies utils @@ */

export function fetchTokens(url) {
    return new Promise((resolve, reject) => {
        chrome.cookies.getAll({ url }, (cookies) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                token = getToken(cookies)
                resolve(token)
            }
        })
    })
}



function getToken(cookies) {

    if (!cookies || !Array.isArray(cookies)) {
        console.error('Input non valido: cookies deve essere un array.');
        return null;
    }

    const tokenCookie = cookies.find(cookie => cookie.name === 'sb-access-token')

    return tokenCookie ? tokenCookie.value : null
}

export async function debugCookies() {

    logger.log('Debugging cookies...')    
    
    try {
        const allCookies = await chrome.cookies.getAll({ url: _url})

        logger.log('All cookies:', allCookies)
        
        const relevantCookies = allCookies.filter(cookie => 
            cookie.name.includes('sb-') ||
            cookie.name.includes('session') ||
            cookie.name.includes('auth')
        )
        
        logger.log('Relevant auth cookies:', relevantCookies)
        
        return relevantCookies
    } catch (error) {
        logger.error('Cookie debug failed:', error)
        return []
    }
}