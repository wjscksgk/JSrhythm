// const gameBar = document.querySelector("#gameBar");
// const gameBarWidth = 1000;
// const gameBarHeight = document.body.scrollHeight;

// const ctx = gameBar.getContext("2d");

// gameBar.width = gameBarWidth;
// gameBar.height = gameBarHeight;

// ctx.fillStyle = "blue";

// ctx.fillRect(0, 0, gameBarWidth, gameBarHeight);

// const $clickable = document.querySelector(".clickable");
// const $bottom = document.querySelector(".bottom");

// const startTime = performance.now();
// const duration = 1000;
// const TRAVEL_DISTANCE = $bottom.getBoundingClientRect().top + 100;

// const animate = (timestamp) => {
//   const progress = Math.min(1, (timestamp - startTime) / duration);
//   $clickable.style.top = `${progress * TRAVEL_DISTANCE}px`;
//   if (progress < 1) requestAnimationFrame(animate);
// };
// requestAnimationFrame(animate);
