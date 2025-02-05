import { logger} from './utils.js'
import { applicationObj } from '../config/applicationObj.js'
import {envButtons, functionList, resourceList, ratingStars} from '../config/constants.js'

/* @@ function resources obj selector @@ */

function getEnvResourcesFunctions(envName, type) {
    const getEnv = applicationObj.environments.find(
        (env) => env.name === envName
    )
    logger.log('selectd params', envName, type)
    return getEnv[type]
}

/* @@ function list builder @@ */

export function updateFunctionList(envName, type) {

  if(!envButtons && !functionList && !resourceList) logger.error('errore dom!')  
    
  let obj = getEnvResourcesFunctions(envName, type)

  functionList.innerHTML = ''

  if (obj && obj.length > 0) {
    obj.forEach((func) => {
      const functionItem = document.createElement('div');
      functionItem.className = 'function-item';

      const functionIcon = document.createElement('div');
      functionIcon.className = 'function-icon';
      functionIcon.textContent = func.name.charAt(0).toUpperCase();

      const functionName = document.createElement('div');
      functionName.className = 'function-name';
      functionName.textContent = func.description || func.name;

      const functionCheckbox = document.createElement('input');
      functionCheckbox.type = 'checkbox';
      functionCheckbox.className = 'function-checkbox';

      functionItem.appendChild(functionIcon);
      functionItem.appendChild(functionName);
      functionItem.appendChild(functionCheckbox);
      functionList.appendChild(functionItem);
    });
  } else {
    functionList.innerHTML =
      '<p>No functions available for this environment.</p>';
  } 
}

/* @@ resource list builder @@ */

export function updateResourceTypesList(envName, type) {

  if(!envButtons && !functionList && !resourceList) logger.error('errore dom!')   

  //logger.log('env -> ', envName)

  //logger.log('test', getEnvResourcesFunctions(applicationObj, envName, 'resourceTypes'))

  resourceList.innerHTML = ''


  let obj = getEnvResourcesFunctions(envName, type)
  if (obj && obj.length > 0) {
    obj.forEach((resource) => {
      const resourceItem = document.createElement('div');
      resourceItem.className = 'resource-item';
  
      const resourceIcon = document.createElement('div');
      resourceIcon.className = 'resource-icon';
      resourceIcon.textContent = resource.name.charAt(0).toUpperCase();
  
      const resourceName = document.createElement('div');
      resourceName.className = 'resource-name';
      resourceName.textContent = resource.label || resource.description;
      const resourceCheckbox = document.createElement('input');
      resourceCheckbox.type = 'checkbox';
      resourceCheckbox.className = 'resource-checkbox';
  
      resourceItem.appendChild(resourceIcon);
      resourceItem.appendChild(resourceName);
      resourceItem.appendChild(resourceCheckbox);
      resourceList.appendChild(resourceItem);
    })
   } else {
    resourceList.innerHTML = '<p>No resources available for this environment.</p>';
  }
}

export function highlightStars(rating) {
  ratingStars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active')
    } else {
      star.classList.remove('active')
    }
  })
}

export function unhighlightStars() {
  ratingStars.forEach((star) => {
    star.classList.remove('active')
  });
}

export function updateRatingStars() {
  ratingStars.forEach((star, index) => {
    if (index < selectedRating) {
      star.classList.add('active')
    } else {
      star.classList.remove('active')
    }
  })
}

