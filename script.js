document.addEventListener('DOMContentLoaded', () => {
    console.log('Night City Roleplay scripts loaded!');

    // Smooth scroll for navbar links
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').replace('.html', '');
            const targetSection = document.querySelector(`#${targetId}`);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                window.location.href = link.getAttribute('href');
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.content button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.boxShadow = '0 0 15px #ff8c00';
        });
        button.addEventListener('mouseout', () => {
            button.style.boxShadow = 'none';
        });
    });

    // Navbar animation on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#111';
        } else {
            navbar.style.backgroundColor = '#1a1a1a';
        }
    });

    // Animated footer text
    const footer = document.querySelector('footer');
    let footerText = footer.textContent;
    let index = 0;
    setInterval(() => {
        index = (index + 1) % footerText.length;
        footer.innerHTML = footerText.substring(0, index + 1) + '...';
    }, 200);

    // Rotate header on hover
    // const headers = document.querySelectorAll('.content h1');
    // headers.forEach(header => {
    //     header.addEventListener('mouseover', () => {
    //         header.style.animation = 'rotate 1s infinite';
    //     });
    //     header.addEventListener('mouseout', () => {
    //         header.style.animation = 'none';
    //     });
    // });

    // Content zoom effect
    const contentBlocks = document.querySelectorAll('.content p');
    contentBlocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            block.style.transform = 'scale(1.1)';
        });
        block.addEventListener('mouseout', () => {
            block.style.transform = 'scale(1)';
        });
    });

    // Glow effect on navbar
    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.textShadow = '0 0 10px #ff8c00';
        });
        link.addEventListener('mouseout', () => {
            link.style.textShadow = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const applicationForm = document.getElementById('applicationForm');

    applicationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get form values directly from elements for more reliable data collection
        const username = document.querySelector('[name="username"]').value.trim();
        const age = document.querySelector('[name="age"]').value.trim();
        const experience = document.querySelector('[name="experience"]').value.trim();
        const reason = document.querySelector('[name="reason"]').value.trim();

        // Log form data for debugging
        console.log('Form Data:', { username, age, experience, reason });

        // Simple validation to ensure no empty fields
        if (!username || !age || !experience || !reason) {
            alert('Please fill in all fields.');
            return;
        }

        // Prepare the Discord webhook payload
        const payload = {
            content: null,
            embeds: [{
                title: "New Application Submission",
                color: 3447003,
                fields: [
                    { name: "Discord Username", value: username, inline: false },
                    { name: "Age", value: age, inline: false },
                    { name: "Roleplay Knowledge", value: `${experience} /10`, inline: false },
                    { name: "Roleplay Plan:", value: reason, inline: false }
                ],
                timestamp: new Date().toISOString(),
            }]
        };

        console.log('Payload:', payload);  // Log payload for debugging

        // Send the payload to Discord
        try {
            const response = await fetch("https://discord.com/api/webhooks/1328308033599574017/34NISFywac6N_qt87OID0xLY0dAjUuc857rNSkD4JuWfjuH-oIDUmGC8KdPb3T_VN9Jw", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Check the response status
            if (response.ok) {
                alert('Application submitted successfully!');
                applicationForm.reset();
            } else {
                const responseText = await response.text();  // Read the response body
                console.error('Error:', responseText);  // Log response for debugging
                alert('Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);  // Log error for debugging
            alert('An error occurred. Please try again.');
        }
    });
});

document.getElementById("home-link").addEventListener("click", function () {
    window.location.href = "index.html";
});
document.getElementById("about-link").addEventListener("click", function () {
    window.location.href = "about.html";
});