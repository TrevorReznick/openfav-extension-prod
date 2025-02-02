import { logger } from '../utils/utils.js'
import * as cfg from '../config/env.js'

const NODE_REDIS_API_URL = cfg.NODE_REDIS_API_URL
const REDIS_SESSION_API_URL = `${NODE_REDIS_API_URL}/tokens`

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

export async function getRedisUserId(accessToken) {

    try {
        logger.log('redis url', `${REDIS_SESSION_API_URL}/access/${accessToken}`)
        const response = await fetch(`${REDIS_SESSION_API_URL}/access/${accessToken}`, {  
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error('Failed to get userId from access token');
        }
  
        const data = await response.json()
        return data.userId

    } catch (error) {
  
      logger.error('Failed to get userId from redis:', error)
      return null
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
