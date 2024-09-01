document.addEventListener('DOMContentLoaded', function () {
    const captchaTable = document.getElementById('captchaTable');
    const captchaInput = document.getElementById('captchaInput');
    const refreshButton = document.getElementById('refreshButton');
    const verifyButton = document.getElementById('verifyButton');
    const resultMessage = document.getElementById('resultMessage');

    // Generate the initial Captcha
    generateCaptchaTable();

    // Event listener for the Refresh button
    refreshButton.addEventListener('click', function () {
        generateCaptchaTable();
        resultMessage.textContent = '';
    });

    // Event listener for the Verify button
    verifyButton.addEventListener('click', function () {
        const inputText = captchaInput.value.trim();
        const captchaText = captchaTable.dataset.captcha;

        // Verify the entered Captcha (case-sensitive check)
        if (inputText === captchaText) {
            resultMessage.textContent = 'Captcha verified successfully.';
            resultMessage.classList.remove('text-red-500');
            resultMessage.classList.add('text-green-500');
        } else {
            resultMessage.textContent = 'Incorrect Captcha. Please try again.';
            resultMessage.classList.remove('text-green-500');
            resultMessage.classList.add('text-red-500');
        }

        // Clear the input field and regenerate the Captcha
        captchaInput.value = '';
        generateCaptchaTable();
    });

    // Function to generate a random string for the Captcha
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // Function to generate the Captcha table
    function generateCaptchaTable() {
        const captchaText = generateRandomString(6);
        captchaTable.dataset.captcha = captchaText;
        captchaTable.innerHTML = '';
        for (let i = 0; i < captchaText.length; i++) {
            const cell = document.createElement('div');
            cell.textContent = captchaText.charAt(i);
            cell.classList.add('captcha-cell');
            captchaTable.appendChild(cell);
        }
    }
});
