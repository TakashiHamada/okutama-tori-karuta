var app = new Vue({
    el: '#app',
    data: {
        shiromaru: [], // 白丸湖
        nippara: [], // 日原
        cards: [],
        playing: false,
        mainImage: "images/quiz.jpg",
        selectedBirdIdx: 0,
        name: "",
        showFlags: [],
        location,
    },
    computed: { // getter
        BirdRest: function () {
            let left = this.showFlags.filter(v => v === false).length;
            return left == 0 ? "最後の1" : left + 1;
        }
    },
    created: function () {
        // 登録
        let pile = new Pile();
        this.shiromaru = [pile.hiyodori, pile.misosazai, pile.oorui, pile.kibitaki, pile.kakesu, pile.kisekirei, pile.fukurou, pile.ikaru, pile.aobato, pile.yamasemi, pile.kawasemi];
        this.nippara = [pile.hiyodori, pile.misosazai, pile.oorui, pile.kibitaki, pile.kakesu, pile.kisekirei, pile.fukurou, pile.ikaru, pile.aobato, pile.toratsugumi, pile.hojiro];
        // --
        switch (getUrlQueries()['type']) {
            case 'srmr' :
                this.cards = this.shiromaru;
                this.location = '白丸湖';
                break;
            case 'nppr' :
                this.cards = this.nippara;
                this.location = '日原';
                break;
        }

        this.showFlags = [...Array(this.cards.length)].map((_) => false);
    },
    methods: {
        async twitter() {
            // while (this.playing) {
            while (true) { // <= ずっと鳴る仕様に変更
                await playSe(this.cards[this.selectedBirdIdx].filePrefix);
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
                    let tmp = Math.floor(Math.random() * this.cards.length);
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
                this.mainImage = "images/" + this.cards[this.selectedBirdIdx].filePrefix + ".jpg";
                this.name = this.cards[this.selectedBirdIdx].name;
            }
        },
    }
})