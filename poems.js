// Poems page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Poem filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const poemCards = document.querySelectorAll('.poem-card-full');
    const searchInput = document.getElementById('poemSearch');

    // Filter poems by category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(button => button.classList.remove('active'));
            this.classList.add('active');
            
            // Filter poems
            poemCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        poemCards.forEach(card => {
            const title = card.querySelector('.poem-title').textContent.toLowerCase();
            const content = card.querySelector('.poem-text-full').textContent.toLowerCase();
            const theme = card.querySelector('.theme').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm) || theme.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
        
        // If searching, reset filter buttons
        if (searchTerm) {
            filterBtns.forEach(btn => btn.classList.remove('active'));
        }
    });

    // Back to top functionality
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add fade-in animation to poems on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all poem cards
    poemCards.forEach(card => {
        observer.observe(card);
    });

    // Reading time estimation
    poemCards.forEach(card => {
        const text = card.querySelector('.poem-text-full').textContent;
        const wordCount = text.split(' ').length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed
        
        const meta = card.querySelector('.poem-meta');
        const readingTimeSpan = document.createElement('span');
        readingTimeSpan.className = 'reading-time';
        readingTimeSpan.textContent = `${readingTime} min read`;
        meta.appendChild(readingTimeSpan);
    });

    // Poem sharing functionality (if needed later)
    function sharePoem(title, content) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: content,
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = `${title}\n\n${content}\n\n- Luca Vale`;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);
            
            // Show feedback
            showNotification('Poem copied to clipboard!');
        }
    }

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add some visual enhancements
    poemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
