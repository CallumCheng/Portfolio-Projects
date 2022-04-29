const form = document.getElementById('form') //declaring constants from .html file
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const valpassword = document.getElementById('valpassword')


form.addEventListener('submit', (e) => {
    e.preventDefault(); //prevents default activity from happening i.e prevents submit from submitting
    checkInputs(); //calling function checkInputs()
})

function checkInputs() {
    const usernameValue = username.value.trim() //grabbing values from .html elements
    const emailValue = email.value.trim()       //.trim() removes white spaces (i.e spacebars)
    const passwordValue = password.value.trim()
    const password2Value = valpassword.value.trim()

    if (usernameValue === '') {
        //on error
        setErrorFor(username, 'Username cannot be blank')   //adding error class                                           
        } else {
        setSuccessFor(username)                             //adding success class
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        } else if(!isEmail(emailValue)) {
            setErrorFor(email, 'Email is not valid')
        } else {
            setSuccessFor(email)
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        } else {
        setSuccessFor(password)
    }
    
    if (password2Value === '') {
        setErrorFor(valpassword, 'Password cannot be blank');
        } else if (passwordValue !== password2Value){
            setErrorFor(valpassword, 'Passwords do not match')
        } else {
        setSuccessFor(valpassword)
    }
    
}


function setErrorFor(input, message) {
    const formControl = input.parentElement; //parent Element of 'input' from .html
    const small = formControl.querySelector('small') 

    small.innerText = message;       //adding the error message within 'small'
    formControl.className = 'form fail';     //adding the 'error' class from .css
}

function setSuccessFor(input) {
    const formControl = input.parentElement; //parent Element of 'input' from .html
    formControl.className = 'form success';     //adding the 'success' class from .css
}

function isEmail(email) { //email validation code
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}