var usersList
localStorage.getItem("usersList") == null ?  usersList = []:usersList = JSON.parse(localStorage.getItem("usersList"))

var signUpNameInput = document.querySelector("#signUpNameInput")
var signUpEmailInput = document.querySelector("#signUpEmailInput")
var signUpPassInput = document.querySelector("#signUpPassInput")
var imgInput = document.querySelector("#imgInput")
var signUpBtn = document.querySelector("#signUpBtn")
var logInBtn = document.querySelector("#logInBtn")
var logOutBtn = document.querySelector("#logOutBtn")
var logInSpan = document.querySelector("#logInSpan")
var logEmailInput = document.querySelector("#logEmailInput")
var logPassInput = document.querySelector("#logPassInput")
var signUpSpan = document.querySelector("#signUpSpan")
var signUpBox = document.querySelector("#signUpBox")
var logInBox = document.querySelector("#logInBox")
var profile = document.querySelector("#profile")
var warningLogMessage = document.querySelector("#warningLogMessage")
var userImg = document.querySelector("#userImg")
var userFullName = document.querySelector("#userFullName")
var dupplicatedEmail = document.querySelector("#dupplicatedEmail") 
var invalidName = document.querySelector("#invalidName") 
var invalidEmail = document.querySelector("#invalidEmail") 
var invalidPass = document.querySelector("#invalidPass") 
var nav = document.querySelector("nav") 



logInSpan.addEventListener("click",showLogInBox)
signUpSpan.addEventListener("click",showSignUpBox)
signUpBtn.addEventListener("click",signUp)
logInBtn.addEventListener("click",showProfile)
logOutBtn.addEventListener("click",showLogInBox)
signUpEmailInput.addEventListener("input",validateEmailInput)
signUpNameInput.addEventListener("input",validateNameInput)
signUpPassInput.addEventListener("input",validatePassInput)

function signUp(){
    // see if the entered email is registered before or not
    
  if(checkDuplicatedEmail() !=false){
    if(validateNameInput() && validateEmailInput() && validatePassInput()){
      var user={
        name:signUpNameInput.value,
        email:signUpEmailInput.value,
        password:signUpPassInput.value,
        img:imgInput.files[0].name

    }
    usersList.push(user)
    updateLocalStorage()
    showLogInBox()
    clearInputs()
}
else{
    validateNameInput() 
     validateEmailInput()
     validatePassInput()
}
  } 
  else{ 
  checkDuplicatedEmail()
  }
}
function showProfile(){
    if (usersList.length == 0) {
        warningLogMessage.classList.replace("d-none","d-block")
     }
    for(let i = 0 ; i< usersList.length  ;i++){
        if(usersList[i].email == logEmailInput.value && usersList[i].password == logPassInput.value ){
         nav.classList.replace("d-none" , "d-block")
         warningLogMessage.classList.replace("d-block","d-none")
         profile.classList.replace("d-none","d-flex")
         signUpBox.classList.add("d-none")
         logInBox.classList.add("d-none") 
         clearLoginInputs()
         userImg.src = `./imgs/${usersList[i].img}` 
         console.log(userImg.src);
         userFullName.innerText = usersList[i].name 
        } 
        else{
            warningLogMessage.classList.replace("d-none","d-block")
            
        } 
    }

}
function updateLocalStorage(){
    localStorage.setItem("usersList",JSON.stringify(usersList))
}
function showLogInBox(){
    clearLoginInputs()
    nav.classList.replace("d-block" , "d-none")
    profile.classList.add("d-none")
    signUpBox.classList.add("d-none")
    logInBox.classList.replace( "d-none","d-flex")
    warningLogMessage.classList.replace("d-block","d-none")


}
function showSignUpBox(){
    logInBox.classList.add("d-none")
    signUpBox.classList.replace( "d-none","d-flex")
    signUpEmailInput.classList.remove("is-invalid" , "is-valid")
    signUpNameInput.classList.remove("is-invalid" , "is-valid")
    signUpPassInput.classList.remove("is-invalid" , "is-valid")
}
function checkDuplicatedEmail(){
    for(let i =0 ; i<usersList.length;i++){
        if (signUpEmailInput.value == usersList[i].email){
            dupplicatedEmail.classList.replace("d-none","d-block")
            return false
        } 
        else{
            dupplicatedEmail.classList.replace("d-block","d-none")
            // we didn't write return true here as if the first value ! == the input value the function will not continue because of the return 
           

        } 
        
    }
 
}
function clearInputs(){
    signUpNameInput.value=''
    signUpPassInput.value=''
    signUpEmailInput.value=''
    imgInput.value=''
    

}
function clearLoginInputs(){
    logEmailInput.value=''
    logPassInput.value=''

    

}
function validateNameInput(){
    var regex = /^.{3,}$/gi

    if(regex.test(signUpNameInput.value)){
        signUpNameInput.classList.remove("is-invalid")
        signUpNameInput.classList.add("is-valid")
        invalidName.classList.replace("d-block","d-none")

        return true
    }
    else{
        signUpNameInput.classList.add("is-invalid")
        invalidName.classList.replace("d-none","d-block")

    }
}
function validateEmailInput(){
    var regex = /^\w{4,20}@\w{4,20}\.com$/gi

    if(regex.test(signUpEmailInput.value)){
        signUpEmailInput.classList.remove("is-invalid")
        signUpEmailInput.classList.add("is-valid")
        invalidEmail.classList.replace("d-block","d-none")

        return true
    }
    else{
        signUpEmailInput.classList.add("is-invalid")
        invalidEmail.classList.replace("d-none","d-block")

    }
}
function validatePassInput(){
    var regex = /^.{8,}/gi

    if(regex.test(signUpPassInput.value)){
        signUpPassInput.classList.remove("is-invalid")
        signUpPassInput.classList.add("is-valid")
        invalidPass.classList.replace("d-block","d-none")


        return true
    }
    else{
        signUpPassInput.classList.add("is-invalid")
        invalidPass.classList.replace("d-none","d-block")

    }
}