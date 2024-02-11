const receptionists = [
    {
        firstName: "William",
        lastName: "Taylor",
        password: "W1llP@ssword",
        receptionistId: "3030",
        email: "william@example.com",
    },
    {
        firstName: "Ava",
        lastName: "Lewis",
        password: "Av@P@ss123",
        receptionistId: "8181",
        email: "ava@example.com",
    },
    {
        firstName: "John",
        lastName: "Smith",
        password: "J0hnP@ssword",
        receptionistId: "1122",
        email: "john@example.com",
    },
    {
        firstName: "Emma",
        lastName: "Johnson",
        password: "Emm@P@ss123",
        receptionistId: "3344",
        email: "emma@example.com",
    },
    {
        firstName: "Michael",
        lastName: "Brown",
        password: "M1ch@elP@ss",
        receptionistId: "5566",
        email: "michael@example.com",
    },
    {
        firstName: "Sophia",
        lastName: "Lee",
        password: "S0ph@P@ssword",
        receptionistId: "7788",
        email: "sophia@example.com",
    },
    {
        firstName: "James",
        lastName: "Davis",
        password: "Jam3sP@ss",
        receptionistId: "9900",
        email: "james@example.com",
    },
    {
        firstName: "Olivia",
        lastName: "Garcia",
        password: "Ol1v@P@ssword",
        receptionistId: "2233",
        email: "olivia@example.com",
    },
    {
        firstName: "Liam",
        lastName: "Martinez",
        password: "L1amP@ss123",
        receptionistId: "4455",
        email: "liam@example.com",
    },
    {
        firstName: "Charlotte",
        lastName: "Hernandez",
        password: "Ch@rl0tt3P@ss",
        receptionistId: "6677",
        email: "charlotte@example.com",
    }
];


const emailInput = document.getElementById("email");
const emailConfirmationInput = document.getElementById("emailConfirmation");
const emailRequiredText = document.getElementById("emailRequired");

emailConfirmationInput.addEventListener("change", function () {
    if (emailConfirmationInput.checked) {
        emailRequiredText.style.display = "inline"; 
    } else {
        emailRequiredText.style.display = "none";
    }
});


emailInput.addEventListener("input", function () {
    if (emailConfirmationInput.checked && !emailInput.value.trim()) {
        emailRequiredText.style.display = "inline";
    } else {
        emailRequiredText.style.display = "none";
    }
});

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    validate(event.target);
});

function checkEmptyInput(input, errorMessage) {
    if (!input.value.trim()) {
        alert("Input is required: " + errorMessage);
        return true;
    }
    return false;
}

function validate(form) {
    let hasError = false;

    const firstNameInput = form.querySelector("#firstName");
    const lastNameInput = form.querySelector("#lastName");
    const passwordInput = form.querySelector("#password");
    const receptionIdInput = form.querySelector("#receptionId");
    const emailInput = form.querySelector("#email");
    const emailConfirmationInput = form.querySelector("#emailConfirmation");
    const phoneNumberInput = form.querySelector("#phoneNumber");

    
    if (checkEmptyInput(firstNameInput, "First Name")) {
        hasError = true;
    }
    if (checkEmptyInput(lastNameInput, "Last Name")) {
        hasError = true;
    }
    if (checkEmptyInput(passwordInput, "Password")) {
        hasError = true;
    }
    if (checkEmptyInput(receptionIdInput, "Reception ID")) {
        hasError = true;
    }
    if (emailConfirmationInput.checked && checkEmptyInput(emailInput, "Email")) {
        hasError = true;
    }
    if (checkEmptyInput(phoneNumberInput, "Phone Number")) {
        hasError = true;
    }

    if (!isValidFirstName(firstNameInput)) {
        hasError = true;
        alertErrorMessage("Invalid First Name. Please use only letters, spaces, hyphens, and apostrophes.");
    }
    if (!isValidLastName(lastNameInput)) {
        hasError = true;
        alertErrorMessage("Invalid Last Name. Please use only letters, spaces, hyphens, and apostrophes.");
    }
    if (!isValidPassword(passwordInput)) {
        hasError = true;
        alertErrorMessage("Invalid Password. It must contain at least one uppercase letter, one digit, one special character, and be 1-16 characters long.");
    }
    if (!isValidReceptionId(receptionIdInput)) {
        hasError = true;
        alertErrorMessage("Invalid Reception ID. It must be a 4-digit number.");
    }
    if (emailConfirmationInput.checked && !isValidEmail(emailInput)) {
        hasError = true;
        alertErrorMessage("Invalid Email Address. Please use a valid email format.");
    }
    if (!isValidPhoneNumber(phoneNumberInput)) {
        hasError = true;
        alertErrorMessage("Invalid Phone Number. It must contain exactly 10 digits.");
    }

    if (!hasError) {
        verify(form, firstNameInput.value.trim(), lastNameInput.value.trim());
    }
}

function isValidFirstName(firstNameInput) {
    const nameRegex = /^[A-Za-z\s'-]+$/;
    return nameRegex.test(firstNameInput.value.trim());
}

function isValidLastName(lastNameInput) {
    const nameRegex = /^[A-Za-z\s'-]+$/;
    return nameRegex.test(lastNameInput.value.trim());
}

function isValidPassword(passwordInput) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,16}$/;
    return passwordRegex.test(passwordInput.value.trim());
}

function isValidReceptionId(receptionIdInput) {
    const receptionIdRegex = /^\d{4}$/;
    return receptionIdRegex.test(receptionIdInput.value.trim());
}

function isValidEmail(emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{3,5}$/;
    return emailRegex.test(emailInput.value.trim());
}

function isValidPhoneNumber(phoneNumberInput) {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumberInput.value.trim());
}

function alertErrorMessage(errorMessage) {
    alert(errorMessage);
}

function verify(form, firstName, lastName) {
    const password = form.querySelector("#password").value;
    const receptionId = form.querySelector("#receptionId").value;
    const email = form.querySelector("#email").value;

    const matchingReceptionist = receptionists.find((receptionist) => {
        return (
            receptionist.firstName === firstName &&
            receptionist.lastName === lastName &&
            receptionist.password === password &&
            receptionist.receptionistId === receptionId &&
            (!email || receptionist.email === email)
        );
    });

    if (matchingReceptionist) {
        const selectedTransaction = form.querySelector('select[name="transactionType"]').value;
        alert(`Welcome, ${firstName} ${lastName}! You have selected the transaction: ${selectedTransaction}`);
    } else {
        alertErrorMessage("Receptionist not found. Please check your details.");
    }
}