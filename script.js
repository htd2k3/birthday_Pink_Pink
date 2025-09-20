// 🎶 Nhạc nền
const music = document.getElementById("bgMusic");
music.volume = 0.2;

// Lặp lại nhạc khi hết
music.addEventListener("ended", () => {
    music.currentTime = 0;
    music.play();
});

// 👉 Chỉ phát nhạc khi click
document.addEventListener("click", () => {
    if (music.paused) {
        music.play().catch(err => console.log("Autoplay bị chặn:", err));
    }
}, { once: true });


function fadeVolumeDown(upAfter = true) {
    let fade = setInterval(() => {
        if (music.volume > 0.1) {
            music.volume -= 0.02;
        } else {
            clearInterval(fade);
            if (upAfter) fadeVolumeUp();
        }
    }, 100);
}

function fadeVolumeUp() {
    let fade = setInterval(() => {
        if (music.volume < 0.3) {
            music.volume += 0.02;
        } else {
            clearInterval(fade);
        }
    }, 100);
}

// Khi click tạo pháo hoa thì nhạc nền nhỏ lại
document.addEventListener("click", () => {
    fadeVolumeDown();
});


// 📸 Ảnh random, không lặp lại cho đến khi hết
const images = ["anh1.jpg", "anh2.jpg", "anh3.jpg", "anh4.jpg", "anh5.jpg",
    "anh6.jpg", "anh7.jpg", "anh8.jpg", "anh9.jpg", "anh10.jpg", "anh11.jpg"];
let usedImages = [];
const imgElement = document.getElementById("birthdayImage");
const textElement = document.getElementById("birthdayText");
const texts = [
    "🥳 “Thêm tuổi mới, không thêm muộn phiền nhaaa!”",
    "💖 “Happy level up day ✨ tuổi mới rực rỡ hơn bao giờ hết”",
    "🎁 “Thêm một tuổi là thêm một niềm vui, không thêm nếp nhăn nha 😉”",
    "🍀 “Năm nay phải thật xanh lá, không drama, chỉ có loveee 💚”",
    "🌸 “Tuổi mới tràn ngập những điều ngọt ngào và hạnh phúc”",
    "🌟 “Tuổi mới tỏa sáng và rực rỡ như một vì sao”",
    "🎉 “Luôn vui vẻ, hạnh phúc và thành công trong mọi lĩnh vực”",
    "💫 “Luôn tràn đầy năng lượng tích cực và sức khỏe dồi dào”",
    "🌈 “Luôn có những trải nghiệm tuyệt vời và đáng nhớ”",
];

function changeImage() {
    if (usedImages.length === images.length) usedImages = [];
    let available = images.filter(img => !usedImages.includes(img));
    let randomImg = available[Math.floor(Math.random() * available.length)];
    imgElement.src = "img/" + randomImg;
    usedImages.push(randomImg);
    textElement.textContent = texts[Math.floor(Math.random() * texts.length)];
}
setInterval(changeImage, 3000);

// 🎶 Danh sách câu chúc
const messages = [
    "Chúc mừng sinh nhật 🎂🎉\nChúc Hồng luôn vui vẻ, hạnh phúc và thật nhiều may mắn!",
    "Ngày đặc biệt này 🌸✨\nMong Hồng nhận được thật nhiều yêu thương và nụ cười.",
    "Thêm một tuổi mới 🎁💖\nChúc Hồng luôn tự tin, xinh đẹp và rực rỡ như ánh mặt trời.",
    "Sinh nhật vui vẻ nha 🎉🍰\nHy vọng mọi ước mơ của Hồng đều sớm thành hiện thực.",
    "Happy Birthday 💕🌹\nCầu mong tuổi mới mang đến cho Hồng thật nhiều kỷ niệm ngọt ngào.",
    "Một chương mới bắt đầu 📖✨\nChúc Hồng đi đến đâu cũng có người thương mến và trân trọng."
];

let msgIndex = 0;

function typeWriter(elementId, speed = 100, delay = 5000) {
    const element = document.getElementById(elementId);
    const audio = new Audio("sound/type.mp3");
    let i = 0;
    let text = messages[msgIndex];

    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            audio.currentTime = 0;
            audio.play();
            i++;
            setTimeout(typing, speed);
        } else {
            setTimeout(() => {
                deleting();
            }, delay);
        }
    }

    function deleting() {
        if (i > 0) {
            element.textContent = text.substring(0, i - 1);
            i--;
            setTimeout(deleting, speed / 2);
        } else {
            msgIndex = (msgIndex + 1) % messages.length;
            text = messages[msgIndex];
            setTimeout(typing, 1000);
        }
    }

    typing();
}

// 🚀 Bắt đầu khi load trang
window.onload = () => {
    typeWriter("typingText", 95, 2000);
};



// 🎆 Pháo hoa bằng canvas
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
function createFirework(x, y) {
    const colors = ["#ff4d4d", "#ffcc00", "#66ff66", "#66ccff", "#ff66ff"];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: x,
            y: y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 5 + 2,
            radius: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 150
        });
    }
}
function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
    }
    requestAnimationFrame(animateFireworks);
}
animateFireworks();

// 🔊 Âm thanh pháo hoa
function playFireworkSound() {
    const audio = new Audio("sound/phaoHoa.mp3");
    audio.volume = 0.6;
    audio.play();
}

// 🎇 Click/touch tạo pháo hoa + âm thanh
document.addEventListener("click", e => {
    createFirework(e.clientX, e.clientY);
    playFireworkSound();
});
document.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    createFirework(touch.clientX, touch.clientY);
    playFireworkSound();
});

// ❤️ Trái tim bay
const effectsContainer = document.getElementById("effects");
// Hiệu ứng tim bay
function createHeart() {
    const heart = document.createElement("div");
    heart.innerText = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "0px";
    heart.style.fontSize = (Math.random() * 20 + 20) + "px";
    heart.style.animation = "rise 4s linear forwards";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 400);

// 🎁 Hộp quà bay
function createGift() {
    const gift = document.createElement("div");
    gift.classList.add("gift");
    gift.textContent = "🎁";
    gift.style.left = Math.random() * 100 + "vw";
    gift.style.fontSize = Math.random() * 20 + 20 + "px";
    effectsContainer.appendChild(gift);

    setTimeout(() => gift.remove(), 6000);
}

// Xuất hiện hộp quà ngẫu nhiên 5–10 giây
setInterval(createGift, 700);

// Hiệu ứng confetti
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.innerText = ["🎉", "✨", "💖", "🌸", "⭐"][Math.floor(Math.random() * 5)]; // random icon
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.fontSize = (Math.random() * 20 + 20) + "px";
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 8000);
}
setInterval(createConfetti, 200);
