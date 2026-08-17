import confetti from 'canvas-confetti';

export function triggerTaskConfetti() {
  confetti({
    particleCount: 30,
    spread: 60,
    origin: { y: 0.8 },
    colors: ['#FF5722', '#FF7A00', '#FFA726', '#FFFFFF']
  });
}

export function triggerLevelUpConfetti() {
  const duration = 2500;
  const animationEnd = Date.now() + duration;

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 40 * (timeLeft / duration);
    confetti({
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ['#FF5722', '#FF7A00', '#FFD54F', '#E040FB', '#FFFFFF']
    });
  }, 200);
}
