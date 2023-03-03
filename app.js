var app = new Vue({
    el: '#app',
    data: {
        test: [],
        birds: ["hojiro", "hiyodori", "misosazai", "uguisu", "ooruri", "kibitaki",
            "kogera", "tobi", "kakesu", "suzume", "kisekirei", "bosogarasu"],
        names: ["ホオジロ", "ヒヨドリ", "ミソサザイ", "ウグイス", "オオルリ", "キビタキ",
            "コゲラ", "トビ", "カケス", "スズメ", "キセキレイ", "ハシボソガラス"],
        playing: false,
        mainImage: "images/quiz.jpg",
        selectedBirdIdx: 0,
        name: "",
        showFlags: [],
    },
    computed: { // getter
        BirdRest: function () {
            // return this.selectedBirdIdx;
            return this.showFlags.filter(v => v === false).length;
            // let tmp = 0;
            // for (let idx = 0; idx < this.showFlags.length; idx++) {
            //     console.log(this.showFlags[idx]);
            //     if (this.showFlags[idx] === true)
            //         tmp ++;
            // }
            // return tmp;
        }
    },
    created: function () {
        this.showFlags = [...Array(this.birds.length)].map((_) => false);
        
        let birds = new Pile();
        this.test = [birds.hiyodori, birds.misosazai];
        
        console.log(birds);
    },
    methods: {
        async twitter() {
            // while (this.playing) {
            while (true) { // <= ずっと鳴る仕様に変更
                await playSe(this.birds[this.selectedBirdIdx]);
                await waitSec(1.5);
            }
        },
        async reload() {
            this.mainImage = "images/game_over.jpg";
            this.name = "リロードします...";
            await waitSec(2);
            window.location.reload();
        },
        onPushed() {
            this.playing = !this.playing;


            if (this.playing) {

                // すべてフラグが立ったらリロードする
                if (this.showFlags.every(v => v === true)) {
                    this.reload();
                    return;
                }

                this.name = "";

                // 出るまで繰り返すので非効率, 山札から引くほうが良い
                while (true) {
                    let tmp = Math.floor(Math.random() * this.birds.length);
                    if (this.showFlags[tmp] === false) {
                        this.selectedBirdIdx = tmp;
                        this.showFlags[tmp] = true;
                        break;
                    }
                }
                // 更新（リアクティブ対処）
                this.showFlags.splice();

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
