const images = [];
let currentIndex = 0;
description = document.getElementById("description")
charName = document.getElementById("name")

for (let i = 1; i <= 48; i++) {
    images.push(`/static/images/db-characters/${i}.png`);
}

getInfo()

const slides = {
    left: document.querySelector('.slide.left img'),
    center: document.querySelector('.slide.center img'),
    right: document.querySelector('.slide.right img'),
};

function updateSlider() {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextIndex = (currentIndex + 1) % images.length;

    slides.left.src = images[prevIndex];
    slides.center.src = images[currentIndex];
    slides.right.src = images[nextIndex];
    getInfo()
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
}

function getInfo() {
    fetch('/getCharInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: currentIndex })
    })
        .then(response => response.json())
        .then(data => {
            charName.textContent = data.name;
            console.log(data.name)
            description.textContent = data.desc;
            console.log(data.desc)
        })
        .catch(error => {
            console.error("Fetch error:", error);
            window.alert("500 Internal Server Error.");
        });
}

updateSlider();