document.addEventListener('DOMContentLoaded', function() {

    const generateButton = document.getElementById('generateButton');
    const passwordSpan = document.querySelector('.containerHead span');
    const checkboxLabels = document.querySelectorAll('.checkbox label');
    const slider = document.getElementById('slider');
    const sliderValueOutput = document.getElementById('sliderValue');
    const containerHead = document.querySelector(".containerHead");
    const mediumRectangles = document.querySelectorAll('.small-rectangles div');
    const strengthText = document.getElementById('strength');
    
    

    let strength = '';

    sliderValueOutput.textContent = slider.value;

    slider.addEventListener('input', function() {
        const currentValue = parseInt(slider.value);
        sliderValueOutput.textContent = currentValue;
    });

    generateButton.addEventListener('click', generatePassword);
    

    function countCheckedCheckboxes() {
        let count = 0;
        checkboxLabels.forEach(label => {
            const checkbox = label.previousElementSibling;
            if (checkbox.checked) {
                count++;
            }
        });
        return count;
    }

    function updatePasswordStrength() {
        const strengthBox = document.querySelector('.strengthBox');
        const mediumRectangles = document.querySelectorAll('.small-rectangles div');
        strengthBox.style.backgroundColor = '#a638f6';
    
        mediumRectangles.forEach(rectangle => {
            rectangle.style.backgroundColor = 'transparent';
            rectangle.style.border = '1px solid white';
        });
    
        let sliderValue = parseInt(slider.value);
        let checkedCount = countCheckedCheckboxes();
    
        if (!checkedCount) {
            strengthText.textContent = ''; // Ta bort texten för styrkan
            return; // Avsluta funktionen om ingen checkbox är markerad
        } else if (checkedCount === 4 && sliderValue >= 5 && sliderValue < 10) {
            strength = 'medium';
        } else if (checkedCount === 4 && sliderValue >= 11 && sliderValue <= 16) {
            strength = 'good';
        } else if (checkedCount === 4 && sliderValue >= 17 && sliderValue <= 20) {
            strength = 'great';
        } else if (checkedCount === 1 && sliderValue >= 15 && sliderValue <= 20 ) {
            strength = 'good';
        }  else if (sliderValue >= 1 && sliderValue <= 5) {
            strength = 'weak';
        } else if (sliderValue >= 6 && sliderValue <= 12) {
            strength = 'medium';
        } else if (sliderValue >= 13 && sliderValue <= 17) {
            strength = 'good';
        } else if (sliderValue >= 18 && sliderValue <= 20) {
            strength = 'great';
        }
    
        if (strength === 'weak') {
            strengthText.textContent = 'Weak';
            mediumRectangles[0].style.backgroundColor = 'red';
            mediumRectangles[0].style.border = 'none';
        } else if (strength === 'medium') {
            strengthText.textContent = 'Medium';
            mediumRectangles[0].style.backgroundColor = '#ffa257';
            mediumRectangles[1].style.backgroundColor = '#ffa257';
            mediumRectangles[0].style.border = 'none';
            mediumRectangles[1].style.border = 'none';
        } else if (strength === 'good') {
            strengthText.textContent = 'Good';
            mediumRectangles[0].style.backgroundColor = 'green';
            mediumRectangles[1].style.backgroundColor = 'green';
            mediumRectangles[2].style.backgroundColor = 'green';
            mediumRectangles[0].style.border = 'none';
            mediumRectangles[1].style.border = 'none';
            mediumRectangles[2].style.border = 'none';
        } else if (strength === 'great') {
            strengthText.textContent = 'Great';
            mediumRectangles.forEach(rectangle => {
                rectangle.style.backgroundColor = '#4abea0';
                rectangle.style.border = 'none';
            });
        }
    }
    

    function generatePassword() {
        let message = '';
        let isAnyCheckboxChecked = false;
        const checkedCount = countCheckedCheckboxes();

        if (checkedCount === 1) {
            strength = 'weak';
        } else if (checkedCount === 2) {
            strength = 'medium';
        } else if (checkedCount === 3) {
            strength = 'good';
        } else if (checkedCount === 4) {
            strength = 'great';
        }

        updatePasswordStrength();

        checkboxLabels.forEach(label => {
            const checkbox = label.previousElementSibling;
            if (checkbox.checked) {
                isAnyCheckboxChecked = true;
            }
        });

        if (!isAnyCheckboxChecked) {
            message = 'You need to tick a box!';
        }

        const existingMessage = containerHead.querySelector('p');
        if (existingMessage) {
            containerHead.removeChild(existingMessage);
        }

        if (message) {
            const messageElement = document.createElement('p');
            messageElement.textContent = message;
            messageElement.style.color = 'red';
            containerHead.appendChild(messageElement);
            passwordSpan.textContent = '';
        } else {
            const uppercaseChecked = document.getElementById('uppercaseCheckbox').checked;
            const lowercaseChecked = document.getElementById('lowercaseCheckbox').checked;
            const numbersChecked = document.getElementById('numbersCheckbox').checked;
            const symbolsChecked = document.getElementById('symbolsCheckbox').checked;
            const sliderValue = parseInt(document.getElementById('slider').value);

            function getRandomCharacters(characters) {
                return characters[Math.floor(Math.random() * characters.length)];
            }

            const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            const symbols = '!@#$%^&*()_+-={}[]|\\:;"<>,.?/~`';

            let allCharacters = '';

            if (uppercaseChecked) allCharacters += uppercaseLetters;
            if (lowercaseChecked) allCharacters += lowercaseLetters;
            if (numbersChecked) allCharacters += numbers;
            if (symbolsChecked) allCharacters += symbols;

            let generatedPassword = '';
            for (let i = 0; i < sliderValue; i++) {
                generatedPassword += getRandomCharacters(allCharacters);
            }
            passwordSpan.textContent = generatedPassword;
        }
    }

    function copyPasswordToClipboard() {
        const password = passwordSpan.textContent;
        const textarea = document.createElement('textarea');
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showCopyPopup(); 
    }

    function showCopyPopup() {
        const popup = document.createElement('div');
        popup.classList.add('copy-popup');
        popup.textContent = 'Password copied to clipboard!';

        document.body.appendChild(popup);

        setTimeout(() => {
            document.body.removeChild(popup);
        }, 2000);
    }

    const copyIcon = document.querySelector('.copy-icon');
    copyIcon.addEventListener('click', copyPasswordToClipboard);

    document.getElementById("slider").oninput = function() {
        var value = (this.value-this.min)/(this.max-this.min)*100
        this.style.background = 'linear-gradient(to right, #a638f6 0%, #a638f6 ' + value + '%, #2a2438 ' + value + '%, #2a2438 100%)'
    };

});
