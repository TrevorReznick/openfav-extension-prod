// modules/main.js
import { greet, getRandomColor } from './dom.js'
import { logger, showState } from './utils/utils.js'

document.addEventListener('DOMContentLoaded', () => {
    
    const greetButton = document.getElementById('greetButton')
    const greetingElement = document.getElementById('greeting')
    logger.log('welcome')

    greetButton.addEventListener('click', () => {
        const greeting = greet('World')
        showState('save')
        greetingElement.textContent = greeting
        greetingElement.style.color = getRandomColor()
    })

})