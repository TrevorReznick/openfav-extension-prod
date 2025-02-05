//import { applicationObj } from "./config/applicationObj.js"
import { logger} from "./utils/utils.js"
import { updateResourceTypesList } from "./utils/domUtils.js"
import {envButtons, functionList, resourceList} from './config/constants.js'

let currentEnv = "Personal"

document.addEventListener("DOMContentLoaded", () => {

  /* @@ init env @@ */

  //logger.log('enviroment start -> ', 'currentEnv -> ', currentEnv)  

  if(!envButtons && !functionList && !resourceList) logger.error('errore dom!')
  
  updateResourceTypesList(currentEnv, 'resourceTypes')

  //console.log('checking obj conf -> ', selectedEnv)
  
  /* if (selectedEnv && selectedEnv.resourceTypes.length > 0) {

    logger.log('Resources exists!')

    selectedEnv.resourceTypes.forEach((resource) => {
      const resourceItem = document.createElement("div")
      resourceItem.className = "resource-item"
  
      const resourceIcon = document.createElement("div")
      resourceIcon.className = "resource-icon"
      resourceIcon.textContent = resource.name.charAt(0).toUpperCase()
  
      const resourceName = document.createElement("div")
      resourceName.className = "resource-name"
      resourceName.textContent = resource.description
  
      const resourceCheckbox = document.createElement("input")
      resourceCheckbox.type = "checkbox"
      resourceCheckbox.className = "resource-checkbox"
  
      resourceItem.appendChild(resourceIcon)
      resourceItem.appendChild(resourceName)
      resourceItem.appendChild(resourceCheckbox)
      resourceList.appendChild(resourceItem)
  
    })
  } else {

    logger.log('Resources doesn \'t exists!')
    resourceList.innerHTML = `<p>No resources available for this environment.</p>`

  }
  */

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
      }
    })
  })
})

