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