import * as cnf from '../config/env.js'

const DEBUG = true
const _url = cnf.api_url_prod

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


  
  
Object.entries(states).forEach(([name, element]) => {
    if (!element) {
        logger.error(`Missing state element: ${name}`);
    }
})
  
export function showState(stateName) {
  
    logger.log(`Changing state to: ${stateName}`)
    
    if (!states[stateName]) {
        logger.error(`Invalid state name: ${stateName}`)
        return
    }
    
    Object.entries(states).forEach(([name, state]) => {
        state.classList.add('hidden')
        logger.log(`${name} state hidden`)
    })
    
    states[stateName].classList.remove('hidden')
    logger.log(`${stateName} state shown`)
}

// Debug cookies function
export async function debugCookies() {

    logger.log('Debugging cookies...')

    

    
    
    try {
        const allCookies = await chrome.cookies.getAll({ url: _url})

        logger.log('All cookies:', allCookies)
        
        const relevantCookies = allCookies.filter(cookie => 
            cookie.name.includes('sb-') ||
            cookie.name.includes('session') ||
            cookie.name.includes('auth')
        );
        
        logger.log('Relevant auth cookies:', relevantCookies)
        
        return relevantCookies
    } catch (error) {
        logger.error('Cookie debug failed:', error)
        return []
    }
}