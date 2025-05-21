// homeAnimation.js
document.addEventListener('DOMContentLoaded', function () {
    // Wait until home content is loaded
    const observer = new MutationObserver(function (mutations) {
        const typingElement = document.getElementById("typing-text");
        if (typingElement) {
            this.disconnect(); // Stop observing once found
            startTypewriter(typingElement);
        }
    });

    // Start observing the home section
    const homeSection = document.getElementById("home");
    if (homeSection) {
        observer.observe(homeSection, {
            childList: true,
            subtree: true
        });
    }

    function startTypewriter(element) {
        const texts = ["Software Tester", "QA Specialist", "Bug Hunter"];
        let count = 0;
        let index = 0;
        let currentText = "";
        let isDeleting = false;
        let typingSpeed = 150;

        function type() {
            currentText = texts[count];

            if (isDeleting) {
                element.textContent = currentText.substring(0, index - 1);
                index--;
                typingSpeed = 50;
            } else {
                element.textContent = currentText.substring(0, index + 1);
                index++;
                typingSpeed = 150;
            }

            if (!isDeleting && index === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end of word
            } else if (isDeleting && index === 0) {
                isDeleting = false;
                count = (count + 1) % texts.length;
                typingSpeed = 500; // Pause before next word
            }

            setTimeout(type, typingSpeed);
        }
        type();
    }
});