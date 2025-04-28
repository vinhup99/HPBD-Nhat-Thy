/*
 *@author: vinhup
 */  


 const $ = document.querySelector.bind(document)
 const $$ = document.querySelectorAll.bind(document)

 let meteorShowerActive = false;

 const container = $('.happy-birth-day')
 const title = $('.title')
 const bubblesElement = $('.bubbles')
 const timer = $('#timer')
 const clickBtn = $('.click-me')

 const cake = $('.cake')

 // Select the timer elements
const hoursElem = $('#hours>span:first-child');
const minutesElem = $('#minutes>span:first-child');
const secondsElem = $('#seconds>span:first-child');

// Select the lights elements
const lightList = $$('.light')

// Select the candles
const candles = $('.candles')

// Select the flame
const flameOne = $('.f-1')
const flameTwo = $('.f-2')

// blow button
const blowButton = $('.blow')

// text
const text = $('.text')

// cat dance
const catDances = $$('.cat-dance')

 const randomInRange =(min, max) =>{
    return Math.random() * (max - min) + min;
  }

const createBubbles =() =>{
    const bubbleCount = 50;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 40 + 10; // Size between 10px and 50px
        const left = Math.random() * 100; // Horizontal position as percentage
        const duration = Math.random() * 5 + 3; // Duration between 3s and 8s

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubblesElement.appendChild(bubble);
    }
}

    // Tạo sao rơi
    function createStars() {
      for (let i = 0; i < 100; i++) {
          const star = document.createElement('div');
          star.classList.add('star');
          star.style.left = `${Math.random() * window.innerWidth}px`;
          star.style.animationDelay = `${Math.random() * 5}s`;
          bubblesElement.appendChild(star);
      }
  }

    // Tạo mưa sao băng liên tục
    function createContinuousMeteorShower() {
      // Số lượng sao băng trong một đợt
      const meteorBatch = Math.floor(Math.random() * 10) + 15;
      
      // Tạo một loạt sao băng
      for (let i = 0; i < meteorBatch; i++) {
        setTimeout(() => {
          createShootingStar();
        }, i * 80); // Tạo sao băng cách nhau 80ms
      }
    }

  // Tạo sao băng
  function createShootingStar() {
    const shootingStar = document.createElement("div");
    shootingStar.className = "shooting-star";
    
    // Vị trí bắt đầu ngẫu nhiên
    const startX = Math.random() * 50;
    const startY = Math.random() * 40;
    
    // Góc ngẫu nhiên (30-60 độ)
    const angle = Math.random() * 30 + 30;
    
    // Kích thước ngẫu nhiên
    const width = Math.random() * 100 + 50;
    const height = Math.random() * 2 + 1;
    
    // Điểm kết thúc
    const distance = Math.random() * 300 + 400;
    const endX = distance * Math.cos(angle * Math.PI / 180);
    const endY = distance * Math.sin(angle * Math.PI / 180);
    
    // Tốc độ ngẫu nhiên (0.5-2 giây)
    const speed = Math.random() * 1.5 + 0.5;
    
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;
    shootingStar.style.width = `${width}px`;
    shootingStar.style.height = `${height}px`;
    shootingStar.style.setProperty('--endX', `${endX}px`);
    shootingStar.style.setProperty('--endY', `${endY}px`);
    shootingStar.style.setProperty('--angle', `${angle}deg`);
    shootingStar.style.animationDuration = `${speed}s`;
    
    container.appendChild(shootingStar);
    
    // Xóa sao băng sau khi hoạt ảnh hoàn thành
    setTimeout(() => {
      shootingStar.remove();
    }, speed * 1000);
  }

   // Tạo mưa sao băng
   function createMeteorShower() {
    if (meteorShowerActive) return;
    
    meteorShowerActive = true;
    
    // Số lượng sao băng trong mưa sao băng
    const meteorCount = Math.floor(Math.random() * 30) + 40;
    
    // Tạo nhiều sao băng trong khoảng thời gian ngắn
    for (let i = 0; i < meteorCount; i++) {
      setTimeout(() => {
        createShootingStar();
      }, i * 100); // Tạo sao băng cách nhau 100ms
    }
    
    // Kết thúc mưa sao băng sau một khoảng thời gian
    setTimeout(() => {
      meteorShowerActive = false;
    }, meteorCount * 100 + 2000);
  }

  // Function to update the timer display
const updateTimer =(seconds) =>{
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    hoursElem.innerHTML = hours.toString().padStart(2, '0');
    minutesElem.innerHTML = minutes.toString().padStart(2, '0');
    secondsElem.innerHTML = secs.toString().padStart(2, '0');
}

const showLights = ()=>{
  lightList.forEach((light)=>{
    light.style.animation = 'light-glow 1.5s infinite'
  })
}

const turnOffLights = ()=>{
  lightList.forEach((light)=>{
    light.classList.add('opacity')
    light.style.animation = ''
  })
}

const countdown = (countdownTime)=> {
    return new Promise((resolve) => {
        const countdownInterval = setInterval(() => {
            if (countdownTime< 0) {
            clearInterval(countdownInterval);
            resolve()
            // Optional: Alert when the countdown is complete
            timer.classList.add('fade-out')
        } else {
            updateTimer(countdownTime);
            countdownTime--;
        }
        }, 1000);
    });
}

const disAppear = (el)=>{
  el.style.animation = 'disappear 1s forwards'
}

const playMusic =  ()=>{
  const audio = document.getElementById('myAudio')
  audio.play()
  showLights()
  createBubbles()
  title.style.animation = 'title-animation 3s ease  forwards'
  blowButton.style.animation = 'start-appear 1s ease 5s forwards, pulse 3s ease infinite'
  cake.style.animation = 'start-appear 1s 4s ease forwards'
  clickBtn.style.display='none'
}

  window.onload = function() {
    // Set the countdown time (in seconds)
    const countdownTime = 5; // Example: 1 hour countdown (3600 seconds)
    
    // Initial call to set the timer display
    countdown(countdownTime)
};



// function randomInRange(min, max) {
//   return Math.random() * (max - min) + min;
// }
   // Hàm để tạo pháo hoa ở các vị trí cụ thể
 

  // Hàm để kích hoạt pháo hoa ở hai bên màn hình
  function triggerFireworks() {
    // Pháo hoa bên trái màn hình
    createConfetti(0.1, 0.5, 90, 90); // Góc 90 độ và spread 60

    // Pháo hoa bên phải màn hình
    createConfetti(0.9, 0.5, 270, 90); // Góc 270 độ và spread 60
  }

// Birthday text animation with space handling
function animateBirthdayText() {
  const text = document.getElementById('birthdayText');
  const letters = text.textContent.split('');
  
  // Clear the text element
  text.textContent = '';
  
  // Create spans for each letter
  letters.forEach(letter => {
      const span = document.createElement('span');
      
      // Handle spaces properly
      if (letter === ' ') {
          span.textContent = '\u00A0'; // Non-breaking space
          span.style.marginRight = '0.25em'; // Add extra margin for spaces
      } else {
          span.textContent = letter;
      }
      
      text.appendChild(span);
  });
  
  // Make text container visible first
  text.style.opacity = '1';
  
  // Add visible class to each letter with delay
  const spans = text.querySelectorAll('span');
  spans.forEach((span, index) => {
      setTimeout(() => {
          span.classList.add('visible');
      }, 100 + (index * 100));
  });
}

  function removeBubble() {
    // Lấy tất cả các phần tử có class "star"
    const bubbles = document.querySelectorAll('.bubble');
    
    // Xóa từng phần tử
    bubbles.forEach(bubble => {
      bubble.remove();
    });
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  
  // Colors that match night sky theme
  const colors = [
      'rgba(173, 216, 230, 0.8)',  // Light blue
      'rgba(221, 160, 221, 0.8)',  // Plum
      'rgba(255, 192, 203, 0.8)',  // Pink
      'rgba(173, 255, 247, 0.8)',  // Light cyan
      'rgba(230, 230, 250, 0.8)',  // Lavender
      'rgba(255, 255, 255, 0.8)'   // White
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  confetti.style.setProperty('--color', randomColor);
  confetti.style.setProperty('--duration', Math.random() * 4 + 4 + 's');
  confetti.style.setProperty('--delay', Math.random() * 5);
  confetti.style.setProperty('--left', Math.random() * 100 + 'vw');
  confetti.style.setProperty('--rotate', Math.random() * 5);
  
  container.appendChild(confetti);
  
  // Replace confetti after animation
  setTimeout(() => {
      confetti.remove();
      createConfetti();
  }, (parseFloat(confetti.style.getPropertyValue('--duration')) + 
     parseFloat(confetti.style.getPropertyValue('--delay'))) * 1000);
}

function createFireworkExplosion() {
  const top = Math.random() * 70 + 15 + 'vh';
  const left = Math.random() * 80 + 10 + 'vw';
  
  // Colors that match night sky theme
  const colors = [
      'rgba(135, 206, 250, 0.9)',  // Sky blue
      'rgba(238, 130, 238, 0.9)',  // Violet
      'rgba(255, 182, 193, 0.9)',  // Light pink
      'rgba(173, 216, 230, 0.9)',  // Light blue
      'rgba(221, 160, 221, 0.9)',  // Plum
      'rgba(255, 255, 255, 0.9)'   // White
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  // Create particles for explosion
  for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'firework';
      particle.style.setProperty('--color', color);
      particle.style.setProperty('--top', top);
      particle.style.setProperty('--left', left);
      particle.style.setProperty('--tx', (Math.random() - 0.5) * 120 + 'px');
      particle.style.setProperty('--ty', (Math.random() - 0.5) * 120 + 'px');
      particle.style.setProperty('--duration', Math.random() * 1 + 1.5 + 's');
      particle.style.setProperty('--delay', Math.random() * 0.3);
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
          particle.remove();
      }, 3000);
  }
}

function createStar() {
  const star = document.createElement('div');
  star.className = 'star-bg';
  
  // Random size between 1-3px
  const size = Math.random() * 2 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  
  // Random position
  star.style.left = Math.random() * 100 + 'vw';
  star.style.top = Math.random() * 100 + 'vh';
  
  // Random twinkle duration and delay
  star.style.setProperty('--duration', Math.random() * 3 + 2 + 's');
  star.style.setProperty('--delay', Math.random() * 5);
  star.style.setProperty('--brightness', Math.random() * 0.7 + 0.3);
  
  container.appendChild(star);
}


const startShootAnimation = ()=>{
   // Tạo mưa sao băng nhỏ liên tục (mỗi 3-6 giây)
   setInterval(() => {
    if (!meteorShowerActive) {
      createContinuousMeteorShower();
    }
  }, Math.random() * 3000 + 3000);
  
  // Tạo mưa sao băng lớn định kỳ (mỗi 6-12 giây)
  setInterval(() => {
    if (Math.random() > 0.6) {
      createMeteorShower();
    }
  }, Math.random() * 6000 + 6000);
  
  // Tạo các trận mưa sao băng đặc biệt (cứ 15-30 giây)
  setInterval(() => {
    createMeteorShower();
  }, Math.random() * 15000 + 15000);
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const blow = async()=>{
  flameOne.classList.add('opacity')
  flameTwo.classList.add('opacity')

  await delay(1000)
  disAppear(title)
  disAppear(blowButton)
  disAppear(cake)

  await delay(2000)
  turnOffLights() 

  await delay(1000)
  container.classList.remove('bg-phase-1')
  container.classList.add('bg-phase-2')
  removeBubble()
  createStars()
  // Create firework explosions
  setInterval(createFireworkExplosion, 800);
  for (let i = 0; i < 200; i++) {
    createStar();
  }
  
  await delay(1000)
  startShootAnimation()
  await delay(200)
  animateBirthdayText()
}

blowButton.addEventListener('click',blow)
clickBtn.addEventListener('click',playMusic)

