// Optional: Add little animations for floating emojis
document.addEventListener("DOMContentLoaded", () => {
  const emojis = document.querySelectorAll(".floating-emoji");
  emojis.forEach((emoji, i) => {
    emoji.style.top = `${20 + i * 15}%`;
    emoji.style.left = `${10 + i * 20}%`;
  });
});
