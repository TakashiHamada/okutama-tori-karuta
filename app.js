var app = new Vue({
    el: '#app',
    data: {
        pile: {},
        playing: false,
        mainImage: "images/quiz.jpg",
        selectedBirdIdx: 0,
        name: "",
        showFlags: [],
    },
    computed: { // getter
        BirdRest: function () {
            let left = this.showFlags.filter(v => v === false).length;
            return left == 0 ? "最後の1" : left + 1;
        }
    },
    created: function () {
        let piles = new Piles();
        let type = getUrlQueries()['type'];
        this.pile = piles.getPile(type);
        this.showFlags = [...Array(this.pile.cards.length)].map((_) => false);
    },
    methods: {
        async twitter() {
            // while (this.playing) {
            while (true) { // <= ずっと鳴る仕様に変更
                await playSe(this.pile.cards[this.selectedBirdIdx].filePrefix);
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
                    let tmp = Math.floor(Math.random() * this.pile.cards.length);
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
                this.mainImage = "images/" + this.pile.cards[this.selectedBirdIdx].filePrefix + ".jpg";
                this.name = this.pile.cards[this.selectedBirdIdx].name;
            }
        },
    }
})