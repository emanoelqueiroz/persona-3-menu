const body = document.querySelector('body')
const menuWrapper = document.querySelector('.menu-wrapper')
const menu = menuWrapper.querySelector('.menu')
const videoWrapper = document.querySelector('.video-wrapper')
const video = document.querySelector('#video')
const welcomeWrapper = document.querySelector('.welcome-wrapper')
const itemDescription = document.querySelector('.item-description')
const main = document.querySelector('main')

const audio = new Audio('sounds/menu.mp3')
const bgMusic = new Audio('sounds/color-your-night.mp3')

const MENU_LINKS = [
    {
        title: 'Skill',
        description: 'Use a Skill',
        opacity: 1,
        rotation: '-10deg',
    },
    {
        title: 'Item',
        description: 'View/Use Items',
        opacity: 0.8,
        rotation: '-5deg',
    },
    {
        title: 'Equip',
        description: 'View/Change Equipment',
        opacity: 0.6,
        rotation: '-10deg',
    },
    {
        title: 'Persona',
        description: 'View/Change Persona',
        opacity: 1,
        rotation: '-5deg',
    },
    {
        title: 'Stats',
        description: 'View Stats/Organize Party',
        opacity: 0.8,
        rotation: '-10deg',
    },
    {
        title: 'Quest',
        description: 'View Requests',
        opacity: 0.6,
        rotation: '-5deg',
    },
    {
        title: 'Social Link',
        description: 'View Social Links',
        opacity: 1,
        rotation: '-10deg',
    },
    {
        title: 'Calendar',
        description: 'View Calendar',
        opacity: 0.8,
        rotation: '-5deg',
    },
    {
        title: 'System',
        description: 'View Settings',
        opacity: 0.6,
        rotation: '-10deg',
    },
]

let initiated = false

bgMusic.volume = 0.4

body.addEventListener('click', () => {
    video.play()

    welcomeWrapper.classList.add('ok')

    setTimeout(() => bgMusic.play(), 500)
}, { once: true })

bgMusic.addEventListener('ended', () => bgMusic.play())

function insertListItens() {
    const html = MENU_LINKS.reduce((acc, item, currentIndex) => {
        let className = ''

        if (currentIndex === 0) {
            className = 'class="selected"'
        }

        acc += `<li style="transform: rotate(${item.rotation}); opacity: ${item.opacity};" ${className} data-description="${item.description}">${item.title}</li>`

        return acc
    }, '')

    menu.innerHTML = html
}

function initMenuLinkOver() {
    const itens = menu.querySelectorAll('li')

    itens.forEach(item => {
        item.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('selected')) {
                return
            }

            itemDescription.innerHTML = e.target.dataset?.description || ''

            audio.pause()
            audio.currentTime = 0

            itens.forEach(item => item.classList.remove('selected'))
            e.target.classList.add('selected')

            audio.play()
        })
    })
}

video.addEventListener('timeupdate', () => {
    if (video.currentTime < 1.60 || initiated) {
        return
    }

    initiated = true

    body.classList.add('background')
    main.classList.add('show')
})

video.addEventListener('ended', () => {
    videoWrapper.innerHTML = '<video autoplay muted loop id="video"><source src="videos/menu-2.mp4" type="video/mp4"></video>';
})

insertListItens()
initMenuLinkOver()