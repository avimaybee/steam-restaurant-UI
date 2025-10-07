// src/validate.js

export function validate(field, rules) {
    const value = field.value.trim();
    const rulesArr = rules.split('|');
    let errorMessage = '';

    for (const rule of rulesArr) {
        if (rule === 'required' && !value) {
            errorMessage = 'This field is required.';
            break;
        }
        if (rule === 'email' && value && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            errorMessage = 'Please enter a valid email address.';
            break;
        }
        if (rule === 'date_in_future' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Compare dates without time
            if (selectedDate < today) {
                errorMessage = 'Please select a date in the future.';
                break;
            }
        }
        if (rule.startsWith('min:') && value) {
            const min = parseInt(rule.split(':')[1], 10);
            if (parseInt(value, 10) < min) {
                errorMessage = `Value must be at least ${min}.`;
                break;
            }
        }
        if (rule.startsWith('max:') && value) {
            const max = parseInt(rule.split(':')[1], 10);
            if (parseInt(value, 10) > max) {
                errorMessage = `Value must be no more than ${max}.`;
                break;
            }
        }
    }

    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.toggle('hidden', !errorMessage);
        field.classList.toggle('border-red-500', !!errorMessage);
    }

    return !errorMessage;
}

export function initRealTimeValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const fields = form.querySelectorAll('[data-validate]');
    fields.forEach(field => {
        field.addEventListener('input', () => {
            validate(field, field.dataset.validate);
        });
    });

    form.addEventListener('submit', (e) => {
        let isFormValid = true;
        fields.forEach(field => {
            if (!validate(field, field.dataset.validate)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            e.preventDefault();
        }
    });
}
