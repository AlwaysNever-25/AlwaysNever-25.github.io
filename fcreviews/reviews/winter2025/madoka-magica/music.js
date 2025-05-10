document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const muteButton = document.getElementById('muteButton');

  // State
  let isMuted = false;
  
  // Create Howl instance
  const sound = new Howl({
    src: ['./assets/Magia.webm', './assets/Magia.mp4'],
    html5: true,
    loop: true,
    autoplay: true,
    volume: 0.5
  });
  
  // Toggle mute/unmute
  muteButton.addEventListener('click', function() {
    isMuted = !isMuted;
    sound.mute(isMuted);
    updateMuteButton();
  });
  
  // Update UI based on mute state
  function updateMuteButton() {
    if (isMuted) {
      muteButton.innerHTML = `
        <span>Unmute</span>
      `;
    } else {
      muteButton.innerHTML = `
        <span>Mute</span>
      `;
    }
  }
});