const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const time = document.querySelector('.time')

const characters = [
    'arcanjo',
    'cyclope',
    'fera',
    'home-de-gelo',
    'jean-gray',
    'noturno',
    'tempestade',
    'wolverine',
    'vampira',
    'lincenegra'
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == characters.length+8){
        setTimeout(() => {
            clearInterval(this.loop)
            alert(`Parabéns, ${spanPlayer.innerHTML}. Seu tempo foi: ${time.innerHTML}s`)
        }, 500)
    }
}

const checkCards = () => {

    const fristChacarecter = firstCard.getAttribute('data-character')
    const secondChacarecter = secondCard.getAttribute('data-character')

    if(fristChacarecter == secondChacarecter){
        setTimeout(() => {
            firstCard.firstChild.classList.add('disabled-card')
            secondCard.firstChild.classList.add('disabled-card')
            firstCard = '';
            secondCard = '';
        
        }, 500)

        checkEndGame();

    

    } else {
        setTimeout(() => {
            firstCard.classList.remove('review-card')
            secondCard.classList.remove('review-card')
            firstCard = '';
            secondCard = '';
        
        }, 500)

        
        
    }

}

const reviewcard = ({target}) => {
    if(target.parentNode.className.includes('review-card')){
        return;
    }

    if(firstCard == ''){
        target.parentNode.classList.add('review-card');
        firstCard = target.parentNode;
    } else if(secondCard == ''){
        target.parentNode.classList.add('review-card');
        secondCard = target.parentNode;

        checkCards();
    }
    
}

const createCard = (character) => {

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    card.appendChild(front)
    card.appendChild(back)

    front.style.backgroundImage = `url(../img/personagens/${character}.jpg)`

    card.addEventListener('click', reviewcard)

    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {
    const duplicateCharacteres = [ ...characters, ...characters]

    const shuffledArray = duplicateCharacteres.sort(() => Math.random() - 0.5)

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card)
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +time.innerHTML
        time.innerHTML = currentTime + 1
    }, 1000);
}

window.onload = () => {
    const playerName = localStorage.getItem('player')

    spanPlayer.innerHTML = playerName

    startTimer();

    loadGame();
}
