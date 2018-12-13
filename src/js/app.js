import  { Menu } from './menu.js'
import  { Form } from './form.js'

(function() {
    window.addEventListener("load", 
    () => { 
        new Menu().defineEventListeners()
        new Form().defineEventListeners()
    })
})()

