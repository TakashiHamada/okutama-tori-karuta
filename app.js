var app = new Vue({
    el: '#app',
    data: {
        pile: {},
        playing: false,
        mainImage: "",
        selectedBirdIdx: 0,
        name: "",
        showFlags: [],
        mode: "instruction",
    },
    computed: { // getter
        resetCountDown: function () {
            let left = this.showFlags.filter(v => v === false).length;
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
        if (this.pile.cards.length === 33) this.mode = "main_game";
        
        this.showFlags = [...Array(this.pile.cards.length)].map((_) => false);
        // タイトル表示
        this.mainImage = this.pile.image;
    },
    methods: {
        playTestSe() {
            playSe("uguisu");
        },
        async twitter() {
            // while (this.playing) {
            while (true) { // <= ずっと鳴る仕様に変更
                await playSe(this.pile.cards[this.selectedBirdIdx].filePrefix);
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
                this.mainImage = "otherImages/quiz.jpg";
            } else {
                this.mainImage = "birdImages/" + this.pile.cards[this.selectedBirdIdx].filePrefix + ".jpg";
                this.name = this.pile.cards[this.selectedBirdIdx].name;
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