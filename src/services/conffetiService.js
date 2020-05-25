var myCanvas = document.createElement('canvas');
document.appendChild(myCanvas);
 
var myConfetti = confetti.create(myCanvas, {
  resize: true,
  useWorker: true
});
confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });