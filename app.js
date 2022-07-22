var app = new Vue({
    el: '#app',
    data: {
        birds: ["tobi", "uguisu", "kibitaki", "mejiro"],
        playing: false,
        mainImage: "images/quiz.jpg",
        selectedBirdIdx : 0,
    },
    created: function () {
    },
    methods: {
        async twitter() {
            while (this.playing) {
                await playSe(this.birds[this.selectedBirdIdx]);
                await waitSec(1.5);
            }
        },
        onPushed() {
            this.playing = !this.playing;

            if (this.playing) {
                this.selectedBirdIdx = Math.floor(Math.random() * this.birds.length);
                this.twitter();
                this.mainImage = "images/quiz.jpg";
            } else {
                this.mainImage = "images/" + this.birds[this.selectedBirdIdx] + ".jpg";
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
