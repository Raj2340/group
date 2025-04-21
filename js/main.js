document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector("#login");
    const registerBtn = document.querySelector("#register");
    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");
    
    // Set initial state
    const setInitialState = () => {
        loginBtn.style.backgroundColor = "#21264D";
        registerBtn.style.backgroundColor = "rgba(255,255,255,0.2)";
        
        if (window.innerWidth > 992) {
            loginForm.style.left = "50%";
            registerForm.style.left = "150%";
            loginForm.style.opacity = "1";
            registerForm.style.opacity = "0";
            loginForm.style.display = "flex";
            registerForm.style.display = "flex";
        } else {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            loginForm.style.left = "0";
            registerForm.style.left = "0";
        }
    };
    
    setInitialState();
    
    // Handle login button click
    loginBtn.addEventListener('click', () => {
        loginBtn.style.backgroundColor = "#21264D";
        registerBtn.style.backgroundColor = "rgba(255,255,255,0.2)";
        
        if (window.innerWidth > 992) {
            loginForm.style.left = "50%";
            registerForm.style.left = "150%";
            loginForm.style.opacity = "1";
            registerForm.style.opacity = "0";
        } else {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        }
    });
    
    // Handle register button click
    registerBtn.addEventListener('click', () => {
        loginBtn.style.backgroundColor = "rgba(255,255,255,0.2)";
        registerBtn.style.backgroundColor = "#21264D";
        
        if (window.innerWidth > 992) {
            loginForm.style.left = "-150%";
            registerForm.style.left = "50%";
            loginForm.style.opacity = "0";
            registerForm.style.opacity = "1";
        } else {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        }
    });
    
    // Handle form submission
    const forms = document.querySelectorAll('.form-inputs');
    forms.forEach(form => {
        const submitBtn = form.querySelector('.input-submit');
        const inputs = form.querySelectorAll('.input-field');
        
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let isValid = true;
            let errors = [];
            
            inputs.forEach(input => {
                const value = input.value.trim();
                
                if (value === '') {
                    isValid = false;
                    errors.push(`${input.placeholder} is required`);
                    showError(input);
                } else if (input.type === 'email' && !isValidEmail(value)) {
                    isValid = false;
                    errors.push('Invalid email format');
                    showError(input);
                } else if (input.placeholder === 'Password' && value.length < 6) {
                    isValid = false;
                    errors.push('Password must be at least 6 characters');
                    showError(input);
                } else if (input.placeholder === 'Confirm Password') {
                    const password = form.querySelector('input[placeholder="Password"]').value;
                    if (value !== password) {
                        isValid = false;
                        errors.push('Passwords do not match');
                        showError(input);
                    }
                }
            });
            
            if (isValid) {
                submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i>';
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Success</span><i class="bx bx-check"></i>';
                    submitBtn.style.backgroundColor = '#10b981';
                    
                    setTimeout(() => {
                        inputs.forEach(input => {
                            input.value = '';
                            input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        });
                        submitBtn.innerHTML = `<span>${form.closest('.login-form') ? 'Sign In' : 'Sign Up'}</span><i class="bx bx-right-arrow-alt"></i>`;
                        submitBtn.style.backgroundColor = '#21264d';
                        clearErrors();
                    }, 2000);
                }, 1500);
            } else {
                displayErrors(errors, form);
            }
        });
        
        inputs.forEach(input => {
            ['focus', 'input'].forEach(event => {
                input.addEventListener(event, () => {
                    input.style.borderColor = event === 'focus' ? '#21264d' : 'rgba(255, 255, 255, 0.3)';
                    clearErrors();
                });
            });
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setInitialState();
        }, 250);
    });
});

// Utility functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input) {
    input.style.borderColor = '#ff3860';
    input.style.animation = 'shake 0.5s';
    setTimeout(() => input.style.animation = '', 500);
}

function displayErrors(errors, form) {
    clearErrors();
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.style.color = '#ff3860';
    errorContainer.style.fontSize = '14px';
    errorContainer.style.marginTop = '10px';
    errorContainer.style.textAlign = 'left';
    errorContainer.style.width = '100%';
    
    errors.forEach(error => {
        const errorElement = document.createElement('p');
        errorElement.style.margin = '5px 0';
        errorElement.textContent = error;
        errorContainer.appendChild(errorElement);
    });
    
    form.appendChild(errorContainer);
}

function clearErrors() {
    document.querySelectorAll('.error-container').forEach(container => container.remove());
}