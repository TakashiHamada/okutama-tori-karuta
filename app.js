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
            if (detectFullGame(this.pile.cards.length)) {
                this.pile.cards.forEach(card => card.selected = true);
                this.scrollToBottomIfPossible();
            }
            else {
                playSe("instructions/collect");
            }
        },
        async startGame() {
            this.mode = "main_game";

            // 山札をコピーする(リセット)
            this.playingCards = shuffleArray(this.pile.cards);

            this.mainImage = "otherImages/game_start.jpg";

            // 場所の読み上げ
            if (!detectFullGame(this.pile.cards.length))
                await playSe("instructions/here");

            await playSe("locations/" + this.pile.filePrefix);
            await playSe("instructions/start");

            this.onPushed();
        },
        // 「これはテスト音声です…」
        playTestSe() {
            playSe("instructions/test");
        },
        result() {
            this.playing = false;
            
            playSe("instructions/end");
            this.mainImage = "otherImages/game_over.jpg";
            this.name = "";
            
            // 山札をコピーする(リセット)
            this.playingCards = shuffleArray(this.pile.cards);
        },
        async onPushed() {
            this.playing = !this.playing;

            if (this.playing) {

                // 山札がなくなったらリロードする
                if (this.playingCards.length === 0) {
                    this.result();
                    return;
                }

                this.name = "";
                this.selectedCard = this.playingCards.shift();
                this.mainImage = "otherImages/quiz.jpg";

                while (this.playing) {
                    await playSe(this.selectedCard.filePrefix);
                    await waitSec(1.5);
                }

            } else {
                // 正解の表示
                this.mainImage = "birdImages/" + this.selectedCard.filePrefix + ".jpg";
                this.name = this.selectedCard.name;

                await playSe("names/" + this.selectedCard.filePrefix);
                playSe(this.selectedCard.filePrefix)
            }
        },
        getBirdImageURL(card) {
            return "./birdImages/" + card.filePrefix + ".jpg";
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
        }
    }
})