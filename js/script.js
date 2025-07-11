document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('[data-section]'));
    const body = document.body;

    // 1. Speed up transition by 2x (reduce scroll distance per section)
    const scrollMultiplier = 1.5;
    const sectionScrollHeight = window.innerHeight * scrollMultiplier; // Move to global scope
    body.style.height = `${sections.length * scrollMultiplier * 100}vh`;

    // 2. Define the point at which the fade transition starts (after a dwell period)
    const transitionStartPoint = 0.5; // Start fading after 50% of the section's scroll length

    // Set initial section states
    sections.forEach((section, index) => {
        if (index === 0) {
            section.style.opacity = 1;
            section.style.pointerEvents = 'auto';
            section.style.zIndex = 10; // Ensure the first section is on top
            // Immediately trigger slide-up animation for the first section
            const slideUpElements = section.querySelectorAll('.slide-up-element');
            slideUpElements.forEach(el => el.classList.add('active'));
        } else {
            section.style.opacity = 0;
            section.style.pointerEvents = 'none';
            section.style.zIndex = 1; // Other sections are behind
        }
    });

    // Modify the main scroll event listener to call the new function
    window.addEventListener('scroll', () => {
        updateSectionVisibility(window.scrollY);
    });

    /* === Accordion Logic === */
    const accordionItems = document.querySelectorAll('.solution-accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.solution-accordion-header');
        header.addEventListener('click', () => {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.solution-accordion-content').style.maxHeight = 0;
                }
            });

            // Toggle the clicked accordion item
            item.classList.toggle('active');
            const content = item.querySelector('.solution-accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = 0;
            }
        });
    });

    /* === Accordion Logic === */
    const accordionItems2 = document.querySelectorAll('.faq-accordion-item');
    accordionItems2.forEach(item => {
        const header = item.querySelector('.faq-accordion-header');
        header.addEventListener('click', () => {
            // Close all other accordion items
            accordionItems2.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-accordion-content').style.maxHeight = 0;
                }
            });

            // Toggle the clicked accordion item
            item.classList.toggle('active');
            const content = item.querySelector('.faq-accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = 0;
            }
        });
    });

    /* === Smooth Scrolling for Anchor Links === */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const targetSectionIndex = sections.findIndex(section => section.id === targetId.substring(1) || section.contains(targetElement));
                
                if (targetSectionIndex !== -1) {
                    const targetY = targetSectionIndex * sectionScrollHeight;
                    smoothScrollTo(targetY, 2000); // 1000ms = 1초 동안 스크롤
                }
            }
        });
    });

    // Custom smooth scroll function
    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        let startTime = null;

        // Temporarily disable the main scroll event listener
        window.removeEventListener('scroll', handleScroll);

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeInOutQuad = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            const currentScrollY = startY + distance * easeInOutQuad;
            window.scrollTo(0, currentScrollY);

            updateSectionVisibility(currentScrollY);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Animation finished, re-enable the main scroll event listener
                window.addEventListener('scroll', handleScroll);
            }
        }

        requestAnimationFrame(animation);
    }

    // New function to encapsulate section visibility update logic
    function updateSectionVisibility(scrollPosition) {
        const sectionScrollHeight = window.innerHeight * scrollMultiplier;

        const currentSectionIndex = Math.floor(scrollPosition / sectionScrollHeight);
        const scrollWithinSection = scrollPosition % sectionScrollHeight;
        const progressWithinSection = scrollWithinSection / sectionScrollHeight;

        let currentOpacity = 1;
        let nextOpacity = 0;

        if (progressWithinSection >= transitionStartPoint) {
            const fadeProgress = (progressWithinSection - transitionStartPoint) / (1 - transitionStartPoint);
            currentOpacity = 1 - fadeProgress;
            nextOpacity = fadeProgress;
        }

        sections.forEach((section, index) => {
            let opacity;
            let zIndex = 1;

            if (index === currentSectionIndex) {
                opacity = currentOpacity;
                zIndex = 10;
            } else if (index === currentSectionIndex + 1) {
                opacity = nextOpacity;
                zIndex = 5;
            } else {
                opacity = 0;
            }

            section.style.opacity = String(opacity);
            section.style.pointerEvents = opacity === 0 ? 'none' : 'auto';
            section.style.zIndex = zIndex;

            const slideUpElements = section.querySelectorAll('.slide-up-element');
            if (opacity > 0) {
                slideUpElements.forEach(el => el.classList.add('active'));
            } else {
                slideUpElements.forEach(el => el.classList.remove('active'));
            }
        });
    }

    // Define the main scroll event handler function
    function handleScroll() {
        updateSectionVisibility(window.scrollY);
    }

    // Initial update for sections
    updateSectionVisibility(window.scrollY);

    // Modify the main scroll event listener to call the new function
    window.addEventListener('scroll', handleScroll);
});