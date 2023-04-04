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
        if (this.pile.cards.length === 33)
            this.mode = "main_game";
        
        // 山札をコピーする(リセット)
        this.playingCards = shuffleArray(this.pile.cards);
        
        this.onPushed();
    },
    methods: {
        playTestSe() {
            playSe("uguisu");
        },
        async twitter() {
            while (this.playing) {
                await playSe(this.selectedCard.filePrefix);
                await waitSec(1.5);
            }
        },
        async reload() {
            this.mainImage = "otherImages/game_over.jpg";
            this.name = "リロードします...";
            await waitSec(2);
            window.location.reload();
        },
        onPushed() {
            this.playing = !this.playing;

            if (this.playing) {
                
                // 山札がなくなったらリロードする
                if (this.playingCards.length === 0) {
                    this.reload();
                    return;
                }

                this.name = "";
                this.selectedCard = this.playingCards.shift();

                this.twitter();
                this.mainImage = "otherImages/quiz.jpg";
            } else {
                this.mainImage = "birdimages/" + this.selectedCard.filePrefix + ".jpg";
                this.name = this.selectedCard.name;
            }
        },
        getBirdImageURL(card) {
            return "./birdImages/" + card.filePrefix + ".jpg";
        },
        proceedGameState() {
            switch (this.mode) {
                case "instruction":
                    this.mode = "preparation";
                    break;
                case "preparation":
                    this.mode = "main_game";
                    break;
                default:
                    this.mode = "instruction";
                    break;
            }
        },
        scrollToBottomIfPossible(){
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