const body = document.querySelector('body')
const menuWrapper = document.querySelector('.menu-wrapper')
const moneyBox = document.querySelector('.money-box')
const videoWrapper = document.querySelector('.video-wrapper')
const video = document.querySelector('#video')
const itens = menuWrapper.querySelectorAll('li')
const welcomeWrapper = document.querySelector('.welcome-wrapper')

const audio = new Audio('sounds/menu.mp3')
const bgMusic = new Audio('sounds/color-your-night.mp3')

bgMusic.volume = 0.4

body.addEventListener('click', () => {
    video.play()

    welcomeWrapper.classList.add('ok')

    setTimeout(() => bgMusic.play(), 500)
}, { once: true })

bgMusic.addEventListener('ended', () => bgMusic.play())

itens.forEach(item => {
    item.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('selected')) {
            return
        }

        audio.pause()
        audio.currentTime = 0

        itens.forEach(item => item.classList.remove('selected'))
        e.target.classList.add('selected')

        audio.play()
    })
})

video.addEventListener("timeupdate", (e) => {
    if (video.currentTime > 1.60) {
        body.classList.add('background')
        moneyBox.classList.add('show')
        menuWrapper.classList.add('show')
    }
})

video.addEventListener("ended", () => {
    videoWrapper.innerHTML = '<video autoplay muted loop id="video"><source src="videos/menu-2.mp4" type="video/mp4"></video>';
})