document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const analyzeButton = document.getElementById('analyzeButton');
    const totalCharsSpan = document.getElementById('totalChars');
    const totalAlphabetsSpan = document.getElementById('totalAlphabets');
    const totalNumbersSpan = document.getElementById('totalNumbers');
    const totalSpecialCharsSpan = document.getElementById('totalSpecialChars');
    const repeatingCharsList = document.getElementById('repeatingCharsList');

    analyzeButton.addEventListener('click', analyzeText);

    function analyzeText() {
        const text = textInput.value;

        // 1. Total Characters
        const totalChars = text.length;
        totalCharsSpan.textContent = totalChars;

        // Initialize counts
        let alphabetCount = 0;
        let numberCount = 0;
        let specialCharCount = 0;
        const charFrequency = {}; // To count repeating characters

        // Loop through each character
        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            // Count character frequency for repeating characters
            const lowerChar = char.toLowerCase(); // Treat 'A' and 'a' as the same character for repetition
            charFrequency[lowerChar] = (charFrequency[lowerChar] || 0) + 1;

            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
                alphabetCount++;
            } else if (char >= '0' && char <= '9') {
                numberCount++;
            } else if (char !== ' ' && char !== '\n' && char !== '\t') { // Exclude spaces, newlines, tabs
                specialCharCount++;
            }
            // Note: If you want to count spaces as special characters, remove the `char !== ' '` condition.
            // For this project, we'll exclude common whitespace from special characters.
        }

        // 2. Total Alphabets
        totalAlphabetsSpan.textContent = alphabetCount;

        // 3. Total Numbers
        totalNumbersSpan.textContent = numberCount;

        // 4. Total Special Characters
        totalSpecialCharsSpan.textContent = specialCharCount;

        // 5. Repeating Characters
        repeatingCharsList.innerHTML = ''; // Clear previous results

        let foundRepeating = false;
        for (const char in charFrequency) {
            if (charFrequency[char] > 1) {
                foundRepeating = true;
                const listItem = document.createElement('li');
                listItem.textContent = `"${char}" repeated ${charFrequency[char]} times`;
                repeatingCharsList.appendChild(listItem);
            }
        }

        if (!foundRepeating) {
            const listItem = document.createElement('li');
            listItem.textContent = 'No repeating characters found.';
            repeatingCharsList.appendChild(listItem);
        }
    }
});