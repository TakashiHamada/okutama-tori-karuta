var app = new Vue({
    el: '#app',
    data: {
        pile: {},
        playingCards: {},
        selectedCard: null,
        playing: false,
        mainImage: "",
        name: "",
        mode: "instruction",
        stopper: false,
    },
    computed: { // getter
        resetCountDown: function () {
            if (!this.playing) return "";

            let left = this.playingCards.length;
            return "残り" + (left == 0 ? "最後の1" : left + 1) + "枚";
        },
        remainingCardCount: function () {
            return this.pile.cards.filter(card => !card.selected).length;
        }
    },
    created: function () {
        let piles = new Piles();
        let type = getUrlQueries()['type'];
        this.pile = piles.getPile(type);
    },
    methods: {
        startPreparation() {
            this.mode = "preparation";

            // 全種類の場合、カードを全て選択する
            if (this.checkSkipPreparation()) {
                this.pile.cards.forEach(card => card.selected = true);
                this.scrollToBottomIfPossible();
            } else {
                playSe("instructions/collect");
            }
        },
        async startGame() {
            this.mode = "main_game";
            this.mainImage = "otherImages/game_start.jpg";

            // 山札をコピーする(リセット)
            this.playingCards = shuffleArray(this.pile.cards);

            // 場所の読み上げ
            if (!this.checkSkipPreparation())
                await playSe("instructions/here");

            // todo ランウェイ用の音声を用意したほうがベター
            if (this.pile.filePrefix != "pr_0")
                await playSe("locations/" + this.pile.filePrefix);
            
            await playSe("instructions/start");

            this.onPushed();
        },
        // 「これはテスト音声です…」
        playTestSe() {
            playSe("instructions/test");
        },
        async result() {
            this.playing = false;
            this.stopper = true;

            this.mainImage = "otherImages/game_over.jpg";
            this.name = "";
            await playSe("instructions/end");

            // 山札をコピーする(リセット)
            this.playingCards = shuffleArray(this.pile.cards);
            this.stopper = false;
        },
        async onPushed() {
            // 連続押しの防止
            if (this.stopper) return;

            this.playing = !this.playing;

            if (this.playing) {

                // 山札がなくなったらリロードする
                if (this.playingCards.length === 0) {
                    this.result();
                    return;
                }

                // 画面遷移後の連続押しの予防
                stopSe();
                this.lock(1.5);

                this.name = "";
                this.selectedCard = this.playingCards.shift();
                this.mainImage = "otherImages/quiz.jpg";

                while (this.playing) {
                    await playSe(this.selectedCard.filePrefix);
                    await waitSec(1);
                }

            } else {
                // 正解の表示
                this.mainImage = "birdImages/" + this.selectedCard.filePrefix + ".jpg";
                this.name = this.selectedCard.name;
                this.stopper = true;
                await playSe("names/" + this.selectedCard.filePrefix);
                playSe(this.selectedCard.filePrefix)
                this.stopper = false;
            }
        },
        async lock(time) {
            this.stopper = true;
            await waitSec(time);
            this.stopper = false;
        },
        getBirdImageURL(card) {
            return "./birdImages/" + card.filePrefix + ".jpg";
        },
        supposeBirdIdx(card) {
            let piles = new Piles();
            let all = piles.all.cards;

            for (let idx = 0; idx < all.length; idx++) {
                if (card.name == all[idx].name)
                    return idx + 1;
            }
            return -1;
        },
        scrollToBottomIfPossible() {
            if (0 < this.remainingCardCount) return;

            // 参照:https://mebee.info/2020/11/23/post-17840/#outline__4
            let elm = document.documentElement;
            //scrollHeight ページの高さ clientHeight ブラウザの高さ
            let bottom = elm.scrollHeight - elm.clientHeight;
            //垂直方向へ移動
            window.scroll({
                top: bottom,
                behavior: "smooth"
            });
        },
        checkSkipPreparation() {
            switch (this.pile.filePrefix) {
                default:
                    return false;
                case "all" :
                case "pr_0":
                    return true;
            }
        }
    }
})