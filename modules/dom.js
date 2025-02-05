//import { applicationObj } from './config/applicationObj.js'
import { logger} from './utils/utils.js'
import { updateResourceTypesList, updateFunctionList, highlightStars, unhighlightStars, updateRatingStars } from './utils/domUtils.js'
import {envButtons, functionList, resourceList, ratingStars} from './config/constants.js'

let currentEnv = 'Personal'
let selectedRating = null

document.addEventListener('DOMContentLoaded', () => {

  /* @@ init env @@ */

  //logger.log('enviroment start', currentEnv)  

  if(!envButtons && !functionList && !resourceList) logger.error('errore dom!')
  
  updateResourceTypesList(currentEnv, 'resourceTypes')
  updateFunctionList(currentEnv, 'functionsTypes') 

  envButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const envName = button.getAttribute('data-env')
      if (envName !== currentEnv) {
        document.querySelector('.env-btn.active').classList.remove('active')
        button.classList.add('active')
        currentEnv = envName
        console.log('env select button ', currentEnv)
        //updateFunctionList(envName)
        logger.log('launcing updateResourcesList')
        updateResourceTypesList(envName, 'resourceTypes')
        updateFunctionList(currentEnv, 'functionsTypes')
      }
    })
  })

  ratingStars.forEach((star) => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.rating)
      selectedRating = rating
      logger.log('rating', selectedRating)
      updateRatingStars()
    })

    star.addEventListener('mouseover', () => {
      const rating = parseInt(star.dataset.rating)
      highlightStars(rating);
    })

    star.addEventListener('mouseout', () => {
      if (selectedRating !== null) {
        updateRatingStars()
      } else {
        unhighlightStars()
      }
    })
  })
})



