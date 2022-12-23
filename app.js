var app = new Vue({
    el: '#app',
    data: {
        birds: ["hojiro", "hiyodori", "misosazai", "uguisu", "ooruri", "kibitaki",
            "kogera", "tobi", "kakesu", "suzume", "kisekirei", "bosogarasu"],
        names: ["ホオジロ", "ヒヨドリ", "ミソサザイ", "ウグイス", "オオルリ", "キビタキ",
            "コゲラ", "トビ", "カケス", "スズメ", "キセキレイ", "ハシボソガラス"],
        playing: false,
        mainImage: "images/quiz.jpg",
        selectedBirdIdx: 0,
        name: "",
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
                this.name = "";
                
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
                this.name = this.names[this.selectedBirdIdx];
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
