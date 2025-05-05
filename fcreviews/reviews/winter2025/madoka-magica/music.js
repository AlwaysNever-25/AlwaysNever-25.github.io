var sound = new Howl({
    src: ['./assets/Magia.webm', './assets/Magia.mp4'],
    autoplay: true,
    loop: true,
    volume: 0.5,
    onend: function() {
        console.log('Finished!');
      }
});

sound.play();