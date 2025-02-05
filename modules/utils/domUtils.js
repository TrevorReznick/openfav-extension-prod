import { logger} from "./utils.js"
import { applicationObj } from "../config/applicationObj.js"
import {envButtons, functionList, resourceList} from '../config/constants.js'


function getEnvResourcesFunctions(envName, type) {
    const getEnv = applicationObj.environments.find(
        (env) => env.name === envName
    )
    logger.log('selectd params', envName, type)
    return getEnv[type]
}

export function updateResourceTypesList(envName, type) {

  if(!envButtons && !functionList && !resourceList) logger.error('errore dom!')   

  logger.log('env -> ', envName)

  //logger.log('test', getEnvResourcesFunctions(applicationObj, envName, 'resourceTypes'))
  let obj = getEnvResourcesFunctions(envName, type)
  if (obj && obj.length > 0) {
    obj.forEach((resource) => {
      const resourceItem = document.createElement("div");
      resourceItem.className = "resource-item";
  
      const resourceIcon = document.createElement("div");
      resourceIcon.className = "resource-icon";
      resourceIcon.textContent = resource.name.charAt(0).toUpperCase();
  
      const resourceName = document.createElement("div");
      resourceName.className = "resource-name";
      resourceName.textContent = resource.label || resource.description;
      const resourceCheckbox = document.createElement("input");
      resourceCheckbox.type = "checkbox";
      resourceCheckbox.className = "resource-checkbox";
  
      resourceItem.appendChild(resourceIcon);
      resourceItem.appendChild(resourceName);
      resourceItem.appendChild(resourceCheckbox);
      resourceList.appendChild(resourceItem);
    })
   } else {
    resourceList.innerHTML = "<p>No resources available for this environment.</p>";
  }
}

