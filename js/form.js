import  { MovieApi } from './movieApi.js'
export class Form {

    constructor () {
        // DOM elements
        this.oInputName = document.querySelector('#name')
        this.oInputEmail = document.querySelector('#email')
        this.oInputPhone = document.querySelector('#phone')
        this.oSelectMovie = document.querySelector('#movie')
        this.oSelectSource = document.querySelector('#source')
        this.oInputMessage = document.querySelector('#message')
        this.oForm = document.querySelector('#formContact')

        // Data object
        this.oData = {
            name: '',
            email: '',
            phone: '',
            movie: '',
            souce: '',
            message: ''
        }
    }

    // Load dinamically the movies on the dropdown menu from the API
    loadSelect() {
        new MovieApi().getSciFiMovies()
        .then(result => {
            this.oSelectMovie.innerHTML += 
            result.results.map(movie => {
                return `
                    <option value=${movie.id}>${movie.title}</option>
                `;
              }).join('') + '<option value="other">Other</option>';
        })
    }

    // Gets the value from the "other" field if shown
    processSelect(element) {
        const value = element.options[element.selectedIndex].value
        return (value == 'other')? element.nextElementSibling.value : value
    }

    // Defines the events
    defineEventListeners() {        
        this.loadSelect()
        this.oInputName.addEventListener('input', this.validateName.bind(this))
        this.oInputEmail.addEventListener('input', this.validateEmail.bind(this))
        this.oInputPhone.addEventListener('input', this.validatePhone.bind(this))
        this.oSelectMovie.addEventListener('change', this.showOtherField.bind(this))
        this.oSelectSource.addEventListener('change', this.showOtherField.bind(this))
        this.oInputMessage.addEventListener('input', this.validateMessage.bind(this))
        this.oForm.addEventListener('submit', this.submitForm.bind(this))
    }

    // Shows the "other" field in case in the sibling dropdown is selected "other"
    showOtherField(event) {
        if (event.target.value == 'other') {            
            event.target.parentNode.classList.add('active')
        }
        else {
            event.target.parentNode.classList.remove('active')
        }
    }

    // Handles the error message for the "name" field
    validateName() {
        let msg = ''
        this.oInputName.setCustomValidity('')
        if (!this.oInputName.checkValidity()) {
            msg = 'Please provide your Name'            
        }
        this.oInputName.setCustomValidity(msg)
    }

    // Handles the error message for the "email" field
    validateEmail() {
        let msg = ''
        this.oInputEmail.setCustomValidity('')
        if (!this.oInputEmail.checkValidity()) {
            msg = 'Please provide a valid Email'
        }
        this.oInputEmail.setCustomValidity(msg)
    }
    
    // Handles the error message for the "phone" field
    validatePhone() {
        let msg = ''
        this.oInputPhone.setCustomValidity('')
        if (!this.oInputPhone.checkValidity()) {
            msg = 'Please provide a valid Phone'
        }
        this.oInputPhone.setCustomValidity(msg)
    }

    // Handles the error message for the "texarea" field and also limits the field to 150 words
    validateMessage() {
        let msg = ''
        this.oInputMessage.setCustomValidity('')
        if (!this.oInputMessage.checkValidity() || (this.oInputMessage.value.split(" ").length > 150)) {
            msg = 'Please write a message (max. 150 words)'
            this.oInputMessage.value = this.oInputMessage.value.split(" " , 150).join(" ")
        }   
        this.oInputMessage.setCustomValidity(msg)
    }

    // Creates and object from the data submitted on the form and print it in the console
    saveData() {
        this.oData = {
            name:  this.oInputName.value,
            email: this.oInputEmail.value,
            phone: this.oInputPhone.value,
            movie: this.processSelect(this.oSelectMovie),
            source: this.processSelect(this.oSelectSource),
            message: this.oInputMessage.value
        }
        console.table(this.oData)
    }

    // Handles the form submission
    submitForm(event) {
        event.preventDefault()
        if (this.oForm.checkValidity()) {
            this.saveData()
            alert("Thank you!")
        }
    }

}
