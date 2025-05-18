function activateSection() {
    const sections = document.querySelectorAll("section[id], div[id]");
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    let activeFound = false;

    // First remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // offset for header height
        const sectionId = current.getAttribute("id");
        const sectionBottom = sectionTop + sectionHeight;

        // Special case for Contact section when near bottom of page
        if (sectionId === "contact" && scrollY + windowHeight >= documentHeight - 50) {
            document.querySelector('.nav-link[href*="contact"]')?.classList.add("active");
            activeFound = true;
        } 
        // Normal case for other sections
        else if (scrollY > sectionTop && scrollY <= sectionBottom) {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add("active");
            activeFound = true;
        }
    });

    // If no section is active or we're at the very top, activate Home
    if (!activeFound || scrollY <= 100) {
        document.querySelector('.nav-link[href*="home"]')?.classList.add("active");
    }
}

// Initialize on page load
window.addEventListener("load", () => {
    // Set Home as active immediately
    document.querySelector('.nav-link[href*="home"]')?.classList.add("active");
    
    // Check sections after everything is fully loaded
    setTimeout(activateSection, 0);
});

// Additional check when scrolling stops
let scrollTimeout;
window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(activateSection, 100);
});

window.addEventListener("resize", activateSection);