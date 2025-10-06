let validEmail = /^[A-Za-z0-9.]+\d+@(gmail|hotmail|yahoo|cloud)\.com$/;
let validPassword = /^.{5,}$/;
let logInBtn = document.querySelector(".submit");
let emailInp = document.querySelector(".email");
let passwordInp = document.querySelector(".password");
let emailSpanArea = document.querySelector(".email-span-area");
let passwordSpanArea = document.querySelector(".password-span-area");
let guest = document.querySelector(".guest");
let signUpFeild = document.querySelector(".signUp-feild");
let signUpBtn = document.querySelector(".signUp-btn");
guest.addEventListener("click", () => {
    window.location.href = "home/home/code temporary.html";
});
signUpBtn.addEventListener("click", () => {
    window.location.href = "sign-up.html";
});
function checkEmail () {
    if (!validEmail.test(emailInp.value)) {
        emailSpanArea.style.display = "inline-flex";
        return false;
    } else {
        emailSpanArea.style.display = "none";
        return true;
    }
}
function checkPassword() {
    if (!validPassword.test(passwordInp.value)) {
        passwordSpanArea.style.display = "inline-flex";
        return false;
    } else {
        passwordSpanArea.style.display = "none";
        return true;
    }
}
emailInp.addEventListener("blur", checkEmail);
passwordInp.addEventListener("blur", checkPassword);
logInBtn.addEventListener("click", () => {
    let email = checkEmail();
    let password = checkPassword();
    if (email && password) {
        // Set login state in localStorage
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "home.html";
    }
});
signUpBtn.addEventListener("mouseover", () => {
    signUpFeild.style.boxShadow = "none";
    signUpFeild.style.transition = "0.3s ease";
});
signUpBtn.addEventListener("mouseout", () => {
    signUpFeild.style.boxShadow = "0 3px 3px rgba(33, 32, 32, 0.696)";
});