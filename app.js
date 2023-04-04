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
            let left = this.playingCards.length;
            return left == 0 ? "最後の1" : left + 1;
        },
        remainingCardCount: function () {
            return this.pile.cards.filter(card => !card.selected).length;
        }
    },
    created: function () {
        let piles = new Piles();
        let type = getUrlQueries()['type'];
        this.pile = piles.getPile(type);

        // 全種類の場合、準備の工程をスキップする
        if (detectFullGame(this.pile.cards.length))
            this.mode = "main_game";
        
    },
    methods: {
        startPreparation() {
            playSe("instructions/collect");
            this.mode = "preparation";
        },
        async startGame() {
            this.mode = "main_game";

            // 山札をコピーする(リセット)
            this.playingCards = shuffleArray(this.pile.cards);

            this.mainImage = "otherImages/game_over.jpg";
            
            // 場所の読み上げ
            if (!detectFullGame(this.pile.cards.length))
                await playSe("instructions/here");
            
            await playSe("locations/" + this.pile.filePrefix);
        
            await playSe("instructions/start");

            this.onPushed();
        },
        playTestSe() {
            playSe("instructions/test");
        },
        async reload() {
            playSe("instructions/end");

            this.mainImage = "otherImages/game_over.jpg";
            this.name = "リロードします...";
            await waitSec(2);
            window.location.reload();
        },
        async onPushed() {
            this.playing = !this.playing;

            if (this.playing) {

                // 山札がなくなったらリロードする
                if (this.playingCards.length === 0) {
                    this.reload();
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
                this.mainImage = "birdimages/" + this.selectedCard.filePrefix + ".jpg";
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