var app = new Vue({
    el: '#app',
    data: {
        birds: ["tobi", "uguisu", "kibitaki", "mejiro"],
        playing: false,
        mainImage: "images/quiz.jpg",
    },
    created: function () {
    },
    methods: {
        async twitter(idx) {
            while (this.playing) {
                await playSe(this.birds[idx]);
                await waitSec(1.5);
            }
        },
        onPushed() {
            this.playing = !this.playing;

            if (this.playing) {
                let idx = Math.floor(Math.random() * this.birds.length);
                this.twitter(idx);
            } else {
                // show
            }
        },
    }
})

// --
function waitSec(sec) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, sec * 1000);
    })
}

function playSe(fileName, volume = 1.0) {
    return new Promise(resolve => {

        new Howl({
            src: ["audios/" + fileName + ".mp3"],
            volume: volume,
            onend: function () {
                resolve();
            }
        }).play();
    })
}
