import { logger } from '../utils/utils.js'

export async function checkAuth(_url) {

    logger.log('function checkAut()')

    return new Promise((resolve, reject) => {
      chrome.cookies.getAll({ url: _url }, function (cookies) {
        let isAuthenticated = false
        for (let i = 0; i < cookies.length; i++) {
          if (cookies[i].name === 'sb-access-token') {
            isAuthenticated = true
            break
          }
        }
        resolve(isAuthenticated)
      })
    })
}

export async function getSessionInfo(sessionAuthUrl) {

    logger.log('Fetching session information')
    
    try {
        const response = await fetch(sessionAuthUrl, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            throw new Error(`Session info request failed: ${response.status}`);
        }
        
        const data = await response.json()

        logger.log('Session info retrieved:', data)

        return data

    } catch (error) {

        logger.error('Failed to get session info:', error)

        throw error

    }
}

export function goLoginPage(_url) {

    try {
        chrome.tabs.create({ url: _url + '/login' })

        window.close()

    } catch (error) {

        logger.error('Failed to redirect to login:', error)

    }
}
