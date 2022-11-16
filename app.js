var app = new Vue({
    el: '#app',
    data: {
        birds: ["hojiro", "hiyodori", "misosazai", "uguisu", "ooruri", "kibitaki",
            "kogera", "tobi", "kakesu", "suzume", "kisekirei", "bosogarasu"],
        playing: false,
        mainImage: "images/quiz.jpg",
        selectedBirdIdx: 0,
    },
    created: function () {
    },
    methods: {
        async twitter() {
            while (this.playing) {
                await playSe(this.birds[this.selectedBirdIdx]);
                await waitSec(1.5);
            }
            
            // // 1回目
            // await playSe(this.birds[this.selectedBirdIdx]);
            // await waitSec(1.5);
            //
            // // 画像を表示
            // this.mainImage = "images/" + this.birds[this.selectedBirdIdx] + ".jpg";
            // while (this.playing) {
            //     // ループ
            //     await playSe(this.birds[this.selectedBirdIdx]);
            //     await waitSec(1.5);
            // }
        },
        onPushed() {
            this.playing = !this.playing;

            if (this.playing) {
                
                while (true) {
                    let tmp = Math.floor(Math.random() * this.birds.length);
                    if (this.selectedBirdIdx !== tmp) {
                        this.selectedBirdIdx = tmp;
                        break;
                    }
                }
                
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
        
        // 前のSEを止める
        Howler.stop();

        new Howl({
            src: ["audios/" + fileName + ".mp3"],
            volume: volume,
            onend: function () {
                resolve();
            }
        }).play();
    })
}
