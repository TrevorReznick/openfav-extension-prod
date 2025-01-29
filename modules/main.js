// modules/main.js
import { greet, getRandomColor } from './dom.js'

document.addEventListener('DOMContentLoaded', () => {
    const greetButton = document.getElementById('greetButton')
    const greetingElement = document.getElementById('greeting')

    greetButton.addEventListener('click', () => {
        const greeting = greet('World');
        greetingElement.textContent = greeting;
        greetingElement.style.color = getRandomColor()
    })
})