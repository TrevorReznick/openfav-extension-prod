import { logger, showState, debugCookies, fetchTokens } from "./utils/utils.js"

import {
  checkAuth,
  getSessionInfo,
  getRedisUserId,
  goLoginPage,
} from "./auth/auth.js";
import * as cfg from "./config/env.js"



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

document.addEventListener("DOMContentLoaded", async () => {

  /* @@ init app @@ */ 

  logger.warn("Application starting ...")

  showState("loading")

  /* @@ debugging @@ */

  await debugCookies()

  //logger.log("Debug URLs:", {_url, sessionAuthUrl, api_url_prod})

  try {
    logger.info("Checking authentication...")
    const isAuthenticated = await checkAuth(_url)
    //logger.info('is Authenticated' , isAuthenticated)

    if (isAuthenticated) {
      logger.info("User authenticated, fetching session info")
      const sessionInfo = await getSessionInfo()
      if (!sessionInfo?.session?.user?.id) {
        logger.error("Invalid session info structure:", sessionInfo);
        throw new Error("Invalid session info structure");
      }

      user_id = sessionInfo.session.user.id;
      logger.info(`Session initialized for user: ${user_id}`);
    } else {
      logger.info("User not authenticated")
      showState("login")
    }
  } catch (error) {

    logger.warn("Initialization failed:", error)
    showState("login")

  } finally {
    showState("loading")
    token = await fetchTokens(_url)
    user_id = await getRedisUserId(token)
    logger.info(`Redis Authenticated user: ${user_id}`)
    logger.info("Initializing global variables:", { user_id, id })
    showState("save")
  }
})

/* @@ listeners @@ */

document.getElementById("loginButton")?.addEventListener("click", () => {
  logger.log("Login button clicked")
  goLoginPage(api_url_prod)
})
