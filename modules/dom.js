// modules/dom.js
export function greet(name) {
    return `Hello, ${name}! Welcome to Openfav.`
}

export function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

export function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

export function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}