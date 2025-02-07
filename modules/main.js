import { logger, showState, debugCookies, fetchTokens, compareKeys, mapProperties } from './utils/utils.js'
import {loginButton, saveButton} from './config/constants.js'
import {siteClassifyAI} from './api/api.js'
import { siteObj, propertyMap, keyMappings} from './config/siteObj.js'
import {mapKeys} from './utils/siteUtils.js'


import {
  checkAuth,
  getSessionInfo,
  getRedisUserId,
  goLoginPage,
} from './auth/auth.js'

import * as cfg from './config/env.js'



/* @@ config vars @@ */

const api_url_prod = cfg.api_url_prod
const api_url_dev = cfg.api_url_dev
const _url = cfg.api_url_prod
const sessionAuthUrl = _url + cfg.sessionAuthUrlEndpoint
const YOUR_TOKEN = cfg.YOUR_TOKEN
const API_URL = cfg.API_URL

/* @@ global vars @@ */

let user_id = null
let id = null
let token = null
let process_auth = false
let myObj = {}; // Oggetto di destinazione
let aiResponse = null

saveButton.addEventListener('click', () => {

  showState('loading')

  if(process_auth) {

    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {

      const activeTab = tabs[0]
      const url = activeTab.url
      logger.info('url', url)

      aiResponse = await siteClassifyAI(url)

      //logger.log(aiResponse)      

      mapKeys(siteObj, aiResponse, keyMappings, user_id, url)

      /*
      mapProperties(siteObj, aiResponse, propertyMap)
      const result = compareKeys(siteObj, propertyMap)
      logger.warn("Confronto completato:", result)
      */

      logger.info('object', siteObj)

      showState('success')
      //alert('Settings saved!')

    })

  } else {

    alert('you need to authenticate')

  }
  
})

document.addEventListener('DOMContentLoaded', async () => {

  /* @@ init app @@ */ 

  logger.info('Application starting ...')

  showState('loading')

  /* @@ debugging @@ */

  await debugCookies()

  //logger.log('Debug URLs:', {_url, sessionAuthUrl, api_url_prod})

  try {
    logger.info('Checking authentication...')

    const isAuthenticated = await checkAuth(_url)
    //logger.info('is Authenticated' , isAuthenticated)

    if (isAuthenticated) {
      logger.info('User authenticated, fetching session info')
      const sessionInfo = await getSessionInfo()
      if (!sessionInfo?.session?.user?.id) {
        logger.error('Invalid session info structure:', sessionInfo)
        throw new Error('Invalid session info structure')
      }
      user_id = sessionInfo.session.user.id
      logger.info(`Session initialized for user: ${user_id}`)
    } else {
      logger.info('User not authenticated')
      showState('login')
    }
  } catch (error) {

    logger.warn('Initialization failed:', error)
    showState('login')

  } finally {
    showState('loading')
    token = await fetchTokens(_url)
    user_id = await getRedisUserId(token)
    if(!user_id) {
      logger.error('redis user null')
      showState('login')
    } else {
      logger.info(`Redis Authenticated user: ${user_id}`)
      logger.info('Initializing global variables:', { user_id, id })
      process_auth = true
      showState('save')
    }
    
  }
})

/* @@ listeners @@ */

loginButton?.addEventListener('click', () => {
  logger.log('Login button clicked')
  goLoginPage(api_url_prod)
})
