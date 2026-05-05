document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('travelForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const destinationSelect = document.getElementById('destination');
    const travelDateInput = document.getElementById('travelDate');
    const successMessage = document.getElementById('successMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const destinationError = document.getElementById('destinationError');
    const dateError = document.getElementById('dateError');

    const showError = (input, errorElement, message) => {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        errorElement.textContent = message;
    };

    const showSuccess = (input, errorElement) => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        errorElement.textContent = '';
    };

    const resetFieldState = (input, errorElement) => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.remove('success');
        errorElement.textContent = '';
    };

    const isValidEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).trim().toLowerCase());
    };

    const isValidName = (name) => {
        const re = /^[a-zA-ZÀ-ÿ\s]{3,50}$/;
        return re.test(String(name).trim());
    };

    const validateName = () => {
        const value = nameInput.value.trim();
        if (value === '') {
            showError(nameInput, nameError, 'El nombre es requerido');
            return false;
        } else if (!isValidName(value)) {
            showError(nameInput, nameError, 'Ingresa un nombre válido (solo letras, mín. 3)');
            return false;
        }
        showSuccess(nameInput, nameError);
        return true;
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        if (value === '') {
            showError(emailInput, emailError, 'El correo es requerido');
            return false;
        } else if (!isValidEmail(value)) {
            showError(emailInput, emailError, 'Ingresa un formato de correo válido');
            return false;
        }
        showSuccess(emailInput, emailError);
        return true;
    };

    const validateDestination = () => {
        if (destinationSelect.value === '') {
            showError(destinationSelect, destinationError, 'Selecciona tu destino');
            return false;
        }
        showSuccess(destinationSelect, destinationError);
        return true;
    };

    const validateDate = () => {
        const value = travelDateInput.value;
        if (value === '') {
            showError(travelDateInput, dateError, 'Selecciona una fecha');
            return false;
        }

        const selectedDate = new Date(value);
        selectedDate.setHours(23, 59, 59, 999);
        const today = new Date();

        if (selectedDate < today) {
            showError(travelDateInput, dateError, 'La fecha debe ser a futuro');
            return false;
        }

        showSuccess(travelDateInput, dateError);
        return true;
    };

    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);

    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);

    destinationSelect.addEventListener('change', validateDestination);
    destinationSelect.addEventListener('blur', validateDestination);

    travelDateInput.addEventListener('change', validateDate);
    travelDateInput.addEventListener('blur', validateDate);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isDestinationValid = validateDestination();
        const isDateValid = validateDate();

        const isFormValid = isNameValid && isEmailValid && isDestinationValid && isDateValid;

        if (!isFormValid) {
            form.classList.remove('shake');
            void form.offsetWidth;
            form.classList.add('shake');
            return;
        }

        successMessage.classList.remove('hidden');
        const submitBtn = form.querySelector('button[type="submit"]');

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando...';

        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            resetFieldState(nameInput, nameError);
            resetFieldState(emailInput, emailError);
            resetFieldState(destinationSelect, destinationError);
            resetFieldState(travelDateInput, dateError);

            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }, 1500);
    });
});
