// modules/main.js
import { greet, getRandomColor } from './dom.js'
import { logger, showState, debugCookies} from './utils/utils.js'
import * as cnf from './config/env.js'

/* @@ config vars @@ */

const api_url_prod = cnf.api_url_prod
const api_url_dev = cnf.api_url_dev
const _url = cnf.api_url_prod
const sessionAuthUrl = _url + cnf.sessionAuthUrlEndpoint
const YOUR_TOKEN = cnf.YOUR_TOKEN
const API_URL = cnf.API_URL
const NODE_REDIS_API_URL = cnf.NODE_REDIS_API_URL
const REDIS_SESSION_API_URL = `${NODE_REDIS_API_URL}/tokens`


document.addEventListener('DOMContentLoaded', async () => {

    showState('loading')

    await debugCookies()

    logger.log('Debug URLs:', {
        _url,
        sessionAuthUrl,
        api_url_prod
    })
    
    /* @@ test @@ */
    
    const greetButton = document.getElementById('greetButton')
    const greetingElement = document.getElementById('greeting')
    logger.log('welcome')    
    
    greetButton.addEventListener('click', () => {
        const greeting = greet('World')
        //showState('save')
        greetingElement.textContent = greeting
        greetingElement.style.color = getRandomColor()
    })

})