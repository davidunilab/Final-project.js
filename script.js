// header 
let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

// home_section

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateHomeSection() {
    var homeSection = document.getElementById('home');
    var homeContent = document.querySelector('.home_content');

    if (isInViewport(homeSection)) {
        homeContent.style.transform = 'translateX(0)';
        homeSection.style.backgroundPosition = 'center left';
    }
}

window.addEventListener('scroll', function() {
    animateHomeSection();
});

animateHomeSection();

function animateHomeSection() {
    var homeSection = document.getElementById('home');
    var homeContent = document.querySelector('.home_content');

    if (isInViewport(homeSection)) {
        homeContent.style.transform = 'translateX(0)';
        homeSection.style.backgroundPosition = 'center left';
    } else {
        homeContent.style.transform = 'translateX(-100%)';
    }
}

// form_section 

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var threshold = 1; 
    return (
        rect.top <= (1 - threshold) * window.innerHeight &&
        rect.bottom >= threshold * window.innerHeight
    );
}

function handleBookFormVisibility() {
    var bookForm = document.getElementById('book-form');

    if (!isInViewport(bookForm)) {
        bookForm.style.opacity = '0'; 
    } else {
        bookForm.style.opacity = '1'; 
    }
}

window.addEventListener('scroll', function() {
    handleBookFormVisibility();
});

handleBookFormVisibility();


// section_about

document.querySelectorAll('.about .video-container .controls .control-btn').forEach(btn =>{
    btn.onclick = () =>{
        let src = btn.getAttribute('data-src');
        document.querySelector('.about .video-container .video').src = src; 
    }
})

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function scrollHandler() {
    var aboutSection = document.getElementById('about');
    var videoContainer = document.querySelector('.about .video-container');
    var content = document.querySelector('.about .about_content');

    if (isInViewport(aboutSection)) {
        videoContainer.classList.add('show');
        content.classList.add('show');
    } else {
        videoContainer.classList.remove('show');
        content.classList.remove('show');
    }
}

window.addEventListener('scroll', scrollHandler);

scrollHandler();


// section_destination 

class BoxSlider {
    constructor() {
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3 
        };
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
        this.boxes = document.querySelectorAll('.box');
        this.boxes.forEach(box => {
            this.observer.observe(box);
        });
    }

    handleIntersect(entries) {
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        intersectingEntries.forEach(entry => {
            if (entry.isIntersecting) {
                this.slideAsync(entry.target);
            } else {
                this.remove(entry.target);
            }
        });
    }

    slideAsync(element) {
        return new Promise(resolve => {
            element.classList.add('visible');
            setTimeout(() => {
                resolve();
            }, 500); 
        });
    }

    remove(element) {
        element.classList.remove('visible');
    }

    slideOutAsync(element) {
        return new Promise(resolve => {
            element.classList.remove('visible');
            setTimeout(() => {
                resolve();
            }, 500); 
        });
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            localStorage.setItem('boxData', JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async updateBoxes() {
        const data = JSON.parse(localStorage.getItem('boxData'));
        this.boxes.forEach(box => {
            if (data.some(item => box.classList.contains(item.id))) {
                this.slideAsync(box);
            } else {
                this.slideOutAsync(box);
            }
        });
    }

    start() {
        this.fetchData('your_api_endpoint_here')
            .then(() => {
                this.updateBoxes();
                setInterval(this.updateBoxes.bind(this), 5000); 
            });
    }
}

const boxSlider = new BoxSlider();
boxSlider.start();

  
  



