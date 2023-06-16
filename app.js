const form = document.querySelector("#registration");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password1 = document.querySelector("#password1");
const terms = document.querySelector("#terms");
const errorDisplay = document.getElementById("errorDisplay")

const userNamePattern = /^[a-zA-Z0-9]{4,}$/;
const emailPattern = /^(?!.*@example\.com$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*password)(?!.*username)[A-Za-z\d@$!%*?&]{8,}$/;


form.addEventListener("submit", function (event) {
    event.preventDefault();
    let errors = [];
    //const termsErrors = termsValidation();
    //errors = errors.concat(termsErrors);

    //The terms and conditions must be accepted
     if (!terms.checked) {
       // alert("Terms and conditions must be accepted!");
         errorDisplay.textContent = "Terms and conditions must be accepted!";
         errorDisplay.style.display = "block";
        return;
     }
    
    //localStorage 5 and 6 
    let usernames = username.value.trim().toLowerCase();
    let emails = email.value.trim().toLowerCase();
    let passwordOne = password.value;
    let passwordTwo = password1.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let isUsernameTaken = users.some(function (user) {
    return user.usernames === usernames;
    });

    let isEmailTaken = users.some(function (user) {
        return user.emails === emails;
    });

    if (isUsernameTaken) {
        //alert("This username is taken, please choose a different username!");
        errorDisplay.textContent = "This username is taken, please choose a different username!";
        errorDisplay.style.display = "block";
        return;
    } else if (isEmailTaken) {
        //alert("This email is taken, please choose a different email!");
        errorDisplay.textContent = "This email is taken, please choose a different email!";
        errorDisplay.style.display = "block";
        return;
    } else {
        users.push({usernames, emails, passwordOne, passwordTwo});
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration Successful!");
    }

    
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    //Terms and conditions validation should run on submit

    form.submit();
})

//username validation
//username.addEventListener("change", function (event) {
    //validateUsername();
//});

function validateUsername() {
    const value = username.value.trim();
    //let userNameErrors = [];

    if (value === "") {
        errorDisplay.textContent = "Username cannot be blank!";
        errorDisplay.style.display = "block";
        return;
        //userNameErrors.push("Username cannot be blank!");
    } else if (value.length < 4) {
        errorDisplay.textContent = "Username must be at least four characters long!";
        errorDisplay.style.display = "block"
        return;
        //userNameErrors.push("Username must be at least four characters long!");
    } else if (!hasUniqueCharacters(value)) {
        errorDisplay.textContent = "Username must contain at least two unique characters!";
        errorDisplay.style.display = "block";
        return;
    } else if (!userNamePattern.test(value)) {
        errorDisplay.textContent = "username cannot contain any special characters or whitespace!";
        errorDisplay.style.display = "block";
        return;
        //userNameErrors.push("Username must contain at least two unique alphanumeric characters and cannot contain special characters or whitespace!");
    }

    /*if (userNameErrors.length > 0) {
        username.setCustomValidity(userNameErrors[0]);
    } else {
        username.setCustomValidity("");
    }*/
    errorDisplay.textContent = "";
    errorDisplay.style.display = "none";
    username.setCustomValidity("");
}

function hasUniqueCharacters(value) {
    const uniqueCharacters = new Set(value);
    return uniqueCharacters.size >= 2;
}
username.addEventListener("change", validateUsername);


//validate email
//email.addEventListener("input", function (event) {
    //validateEmail();
//})

function validateEmail() {
    const value = email.value.trim();
    //let emailErrors = [];
         
    if (value === "") {
      //emailErrors.push("Email cannot be blank!");
        errorDisplay.textContent = "Email cannot be blank!";
        errorDisplay.style.display = "block";
        return;
    } else if (!emailPattern.test(value)) {
        errorDisplay.textContent = "Please enter a valid email address and it can't be from the domain example.com!!";
        errorDisplay.style.display = "block";
        return;
      //emailErrors.push("Please enter a valid email address and it can't be from the domain example.com!!"); //The email must not be from the domain "example.com."
    }

    errorDisplay.textContent = "";
    errorDisplay.style.display = "none";
    email.setCustomValidity("");
        
    /*if (emailErrors.length > 0) {
        email.setCustomValidity(emailErrors[0]);
    } else {
        email.setCustomValidity("")
    }*/
}
email.addEventListener("change", validateEmail);

//password validation
//password.addEventListener("input", function (event) {
    //validatePassword();
//})

function validatePassword() {
    const value = password.value.trim();
    let passwordErrors = [];

    if (value === "") {
        //passwordErrors.push("Password cannot be blank!");
        errorDisplay.textContent = "Password cannot be blank!";
        errorDisplay.style.display = "block";
        return;
    } else if (value.length < 12) {
        //passwordErrors.push("Passwords must be at least 12 characters long");
        errorDisplay.textContent = "Passwords must be at least 12 characters long";
        errorDisplay.style.display = "block";
        return;
    } else if (!passwordPattern.test(value)) {
        //passwordErrors.push("Please enter a valid password! Passwords must be at least 12 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and cannot contain the word 'password' or the username.");
        errorDisplay.textContent = "Please enter a valid password! Passwords must be at least 12 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and cannot contain the word 'password' or the username!";
        errorDisplay.style.display = "block";
        return;
    }

    errorDisplay.textContent = "";
    errorDisplay.style.display = "none";
    password.setCustomValidity("");
    /*if (passwordErrors.length > 0) {
        password.setCustomValidity(passwordErrors[0]);
    } else {
        password.setCustomValidity("");
    }*/
}
password.addEventListener("input", validatePassword);

//re-typed password validation 
password1.addEventListener("input", function (event) {
    password1Validation();
})

function password1Validation() {
    const value1 = password1.value.trim();
    const value2 = password.value.trim();
    let password1Errors = [];

    if (value1 === "") {
        //password1Errors.push("could not be left blank!!")
        errorDisplay.textContent = "could not be left blank!!";
        errorDisplay.style.display = "block";
        return;

    } else if (value1 !== value2) {
        //password1Errors.push("Both passwords must match");
        errorDisplay.textContent = "Both passwords must match";
        errorDisplay.style.display = "block";
        return;
    }

    errorDisplay.textContent = "";
    errorDisplay.style.display = "none";
    password1.setCustomValidity("");

    /*if (password1Errors.length > 0) {
        password1.setCustomValidity(password1Errors[0]);
    } else {
        password1.setCustomValidity("");
    }*/
}
password1.addEventListener("input", password1Validation);


const loginForm = document.getElementById("login");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginTerms = document.getElementById("loginTerms");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();
    let errors = [];
    //validate username
    if (username === "") {
        //errors.push("Username cannot be blank!");
        errorDisplay.textContent = "Username cannot be blank!";
        errorDisplay.style.display = "block";
        return;
    } else {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = storedUsers.find(function (storedUser) {
            return storedUser.usernames.toLowerCase() === username.toLowerCase();
        });

        if (!user) {
            //errors.push("Username does not exist!");
            errorDisplay.textContent = "Username does not exist!";
            errorDisplay.style.display = "block";
            return;
        }
    }

    // Validate password
    if (password === "") {
        //errors.push("Password cannot be blank!");
        errorDisplay.textContent = "Password cannot be blank!";
        errorDisplay.style.display = "block";
        return;
    } else {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = storedUsers.find(function (storedUser) {
            return storedUser.usernames.toLowerCase() === username.toLowerCase();
        });

        if (user && user.passwordOne !== password) {
            //errors.push("Incorrect password!");
            errorDisplay.textContent = "Incorrect password!";
            errorDisplay.style.display = "block";
            return;
        }

        //clear errorDisplay
        errorDisplay.textContent = "";
        errorDisplay.style.display = "none";
        loginPassword.setCustomValidity("");

        //clear from
        loginUsername.value = "";
        loginPassword.value = "";
        loginTerms.checked = false;

         const successMessage = "Login successful!";
        if (loginTerms.checked) {
            alert(successMessage + " (Keep me logged in)");
        } else {
            alert(successMessage);
        }
    }

})
