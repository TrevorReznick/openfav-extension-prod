//import { applicationObj } from "./config/applicationObj.js"
import { logger} from "./utils/utils.js"
import { updateResourceTypesList, updateFunctionList } from "./utils/domUtils.js"
import {envButtons, functionList, resourceList} from './config/constants.js'

let currentEnv = "Personal"

document.addEventListener("DOMContentLoaded", () => {

  /* @@ init env @@ */

  //logger.log('enviroment start -> ', 'currentEnv -> ', currentEnv)  

  if(!envButtons && !functionList && !resourceList) logger.error('errore dom!')
  
  updateResourceTypesList(currentEnv, 'resourceTypes')
  updateFunctionList(currentEnv, 'functionsTypes')


  

  envButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const envName = button.getAttribute("data-env")
      if (envName !== currentEnv) {
        document.querySelector(".env-btn.active").classList.remove("active")
        button.classList.add("active")
        currentEnv = envName
        console.log('env select button ', currentEnv)
        //updateFunctionList(envName)
        logger.log('launcing updateResourcesList')
        updateResourceTypesList(envName, 'resourceTypes')
        updateFunctionList(currentEnv, 'functionsTypes')
      }
    })
  })
})

