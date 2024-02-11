document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
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
        // Add more receptionists here
    ];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const firstNameInput = document.getElementById("firstName");
        const lastNameInput = document.getElementById("lastName");
        const emailInput = document.getElementById("email");
        const emailConfirmationInput = document.getElementById("emailConfirmation");

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();

        if (firstName === "") {
            window.alert("First Name is required.");
            return;
        }

        if (lastName === "") {
            window.alert("Last Name is required.");
            return;
        }

        if (emailConfirmationInput.checked && email === "") {
            window.alert("Email is required when Email Confirmation is checked.");
            return;
        }

        verify(form);
    });
});

function validate(event) {
    event.preventDefault();

    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const passwordInput = document.getElementById("password");
    const receptionIdInput = document.getElementById("receptionId");
    const emailInput = document.getElementById("email");
    const emailConfirmationInput = document.getElementById("emailConfirmation");
    const phoneNumberInput = document.getElementById("phoneNumber");

    const nameRegex = /^[A-Za-z\s'-]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,16}$/;
    const receptionIdRegex = /^\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{3,5}$/;
    const phoneNumberRegex = /^\d{10}$/;

    function showError(fieldName, errorMessage) {
        window.alert(errorMessage);
        fieldName.focus();
    }

    const firstName = firstNameInput.value.trim();
    if (!nameRegex.test(firstName)) {
        showError(firstNameInput, "First Name is invalid. Please enter a valid name.");
        return;
    }

    const lastName = lastNameInput.value.trim();
    if (!nameRegex test(lastName)) {
        showError(lastNameInput, "Last Name is invalid. Please enter a valid name.");
        return;
    }

    const password = passwordInput.value.trim();
    if (!passwordRegex.test(password)) {
        showError(passwordInput, "Password is invalid. It should contain 1 uppercase letter, 1 special character, 1 numeric character, and be 1-16 characters long.");
        return;
    }

    const receptionId = receptionIdInput.value.trim();
    if (!receptionIdRegex.test(receptionId)) {
        showError(receptionIdInput, "Reception ID is invalid. It should be a 4-digit number.");
        return;
    }

    if (emailConfirmationInput.checked) {
        const email = emailInput.value.trim();
        if (!emailRegex.test(email)) {
            showError(emailInput, "Email Address is invalid. It should contain '@' and a domain with 3 to 5 characters.");
            return;
        }
    }

    const phoneNumber = phoneNumberInput.value.trim();
    if (!phoneNumberRegex.test(phoneNumber)) {
        showError(phoneNumberInput, "Phone Number is invalid. It should contain 10 digits.");
        return;
    }
}

function verify(form) {
    const firstNameInput = form.getElementById("firstName");
    const lastNameInput = form.getElementById("lastName");

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const password = form.getElementById("password").value;
    const receptionId = form.getElementById("receptionId").value;
    const email = form.getElementById("email").value;

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
        const selectedTransaction = form.querySelector('input[name="transactionType"]:checked').value;
        window.alert(`Welcome, ${firstName} ${lastName}! You have selected the transaction: ${selectedTransaction}`);
    } else {
        window.alert(`Receptionist ${firstName} ${lastName} not found. Please check your details.`);
    }
}

const emailConfirmationInput = document.getElementById("emailConfirmation");
const emailRequiredSpan = document.getElementById("emailRequired");

emailConfirmationInput.addEventListener("change", function () {
    if (emailConfirmationInput.checked) {
        emailRequiredSpan.style.display = "inline";
    } else {
        emailRequiredSpan.style.display = "none";
    }
});
