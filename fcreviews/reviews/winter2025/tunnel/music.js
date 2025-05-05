const muteBtn = document.querySelector('.mute');
const unmuteBtn = document.querySelector('.unmute');

var sound = new Howl({
    src: ['./assets/Finale.webm', './assets/Finale.m4a'],
    autoplay: true,
    loop: true,
    volume: 0.5,
    onend: function() {
        console.log('Finished!');
      }
});

let id = sound.play();

muteBtn.onclick = function() {
  sound.mute(true, id);
}