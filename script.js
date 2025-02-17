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

    if (localStorage.getItem('formSubmitted') === 'true') {
        alert('You have already submitted the form.');
        applicationForm.style.display = 'none';
        return;
    }

    applicationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.querySelector('[name="username"]').value.trim();
        const age = document.querySelector('[name="age"]').value.trim();
        const experience = document.querySelector('[name="experience"]').value.trim();
        let reason = document.querySelector('[name="reason"]').value.trim();

        if (!username || !age || !experience || !reason) {
            alert('Please fill in all fields.');
            return;
        }

        // Split reason into chunks of 1024 characters (Discord embed limit)
        const reasonChunks = [];
        while (reason.length > 0) {
            reasonChunks.push(reason.substring(0, 1024));
            reason = reason.substring(1024);
        }

        const embeds = [{
            title: "New Application Submission",
            color: 3447003,
            fields: [
                { name: "Discord Username", value: username, inline: false },
                { name: "Age", value: age, inline: false },
                { name: "Roleplay Knowledge", value: `${experience} /10`, inline: false },
                { name: "Roleplay Plan (Part 1):", value: reasonChunks[0], inline: false }
            ],
            timestamp: new Date().toISOString(),
        }];

        // Add additional embeds if the reason is too long
        for (let i = 1; i < reasonChunks.length; i++) {
            embeds.push({
                title: `Roleplay Plan (Part ${i + 1}):`,
                color: 3447003,
                fields: [{ name: "Continued:", value: reasonChunks[i], inline: false }],
                timestamp: new Date().toISOString(),
            });
        }

        const payload = {
            content: null,
            embeds: embeds
        };

        try {
            const response = await fetch("https://discord.com/api/webhooks/1340983047876771870/XpGQWJ4rKMcZa6GnZVE4qFYc1xJwXjTl9JXVV22f1blUf3V6Gx4d0uTQlBzDtxV_tueg", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Application submitted successfully!');
                localStorage.setItem('formSubmitted', 'true');
                applicationForm.reset();
                applicationForm.style.display = 'none';
            } else {
                alert('Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
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