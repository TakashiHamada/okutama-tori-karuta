var app = new Vue({
    el: '#app',
    data: {
        birds : ["tobi", "uguisu", "kibitaki", "mejiro"],
    },
    created: function () {
        
        
        this.blink();
        
        
    },
    methods: {
        async blink() {
            while (true) {
                playSe(this.birds[3]);
                await waitSec(4);
            }
        },
        test() {
          console.log("ok");  
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

        new Howl({
            src: ["audios/" + fileName + ".mp3"],
            volume: volume,
            onend: function () {
                resolve();
            }
        }).play();
    })
}
