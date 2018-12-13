export class Menu {

    constructor () {
        // Values
        this.vWindowH = window.innerHeight

        // DOM elements
        this.oMenu = document.querySelector('#menuTop')
        this.oMenuBtn = document.querySelector('#menuBtn')

        // Arrays
        this.aMenuLnks = this.oMenu.querySelectorAll('ul a')
        this.aSections = document.querySelectorAll('main > section')
        this.aOffsets = []

        this.updateOffsets()
        this.updateLinks()
    }

    // Defines the events
    defineEventListeners() {
        this.oMenuBtn.addEventListener('click', this.toggleMenu.bind(this))
        window.addEventListener('scroll', this.scrollSpy.bind(this))
        window.addEventListener('resize', this.resizeWdw.bind(this))
    }

    // Add/removes the class "active" on the "hamburger" menu
    toggleMenu(event) {
        event.preventDefault()
        this.oMenu.classList.toggle('active')
    }

    // Add the event listener to all the menu links
    updateLinks() {
        const self = this
        self.aMenuLnks.forEach(
            (item) => {
                item.addEventListener('click', function(e) {
                    e.preventDefault()
                    self.smoothScroll(item.getAttribute('href').replace('#', ''))
                })
            }
        )
    }

    // Update the array with the offsets of every section
    updateOffsets() {
        this.aOffsets['#home'] = 0;
        this.aSections.forEach(
            (item) => {
                this.aOffsets['#'+item.id] = item.offsetTop;
            }
        )
    }
    
    // Detects when the scroll is positioned on a specific section
    scrollSpy() {
        const pageOffset = window.pageYOffset + (this.vWindowH * 0.5)
        let currentKey = '#home';
        let currentOffset = 0;

        for (let key in this.aOffsets) {
            if (this.aOffsets[key] < pageOffset && this.aOffsets[currentKey] < this.aOffsets[key]) {
                currentKey = key
                currentOffset = this.aOffsets[key]
            }            
        }

        this.aMenuLnks.forEach(
            (item) => {
                if (item.getAttribute('href') == currentKey) {
                    item.classList.add('active')
                }
                else {
                    item.classList.remove('active')
                }
            }
        )
    }  
    
    // Handles the smooth scroll between sections when the menu links are clicked
    smoothScroll(id) {
        const element = document.getElementById(id)     
        const startY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        const stopY = element.offsetTop
        const distance = stopY > startY ? stopY - startY : startY - stopY

        if (distance < 100) {
            scrollTo(0, stopY)
            return
        }

        let speed = Math.round(distance / 100)
        if (speed >= 20) speed = 20
        const step = Math.round(distance / 10)
        let leapY = stopY > startY ? startY + step : startY - step
        let timer = 0;

        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed)
                leapY += step; if (leapY > stopY) leapY = stopY; timer++
            }
        }
        else {
            for (let i = startY; i > stopY; i -= step) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed)
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++
            }
        }
    }

    // When the window resizes the offsets change
    resizeWdw() {
        this.updateOffsets()
    }

}
