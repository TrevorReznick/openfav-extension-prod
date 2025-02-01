import { greet, getRandomColor } from './dom.js'
import { logger, showState, debugCookies} from './utils/utils.js'
import { checkAuth } from './auth/auth.js'
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

/* @@ global vars @@ */

let user_id = null
let id = null


document.addEventListener('DOMContentLoaded', async () => {

    /* @@ init app @@ */

    logger.info('Application starting...')
    
    showState('loading')   

    /* @@ debugging @@ */

    await debugCookies()

    logger.log('Debug URLs:', {
        _url,
        sessionAuthUrl,
        api_url_prod
    })

    try {

        logger.info('Checking authentication...')

        const isAuthenticated = await checkAuth(_url)

        //logger.info('is Authenticated' , isAuthenticated)

        if (isAuthenticated) {

            logger.info('User authenticated, fetching session info')

        } else {

            logger.info('User not authenticated');
            //showState('login')

        }

    } catch(e) {

        logger.error('Initialization failed:', error)
        //showState('login')
    }


})