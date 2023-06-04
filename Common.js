// https://qiita.com/akinov/items/26a7fc36d7c0045dd2db
function getUrlQueries() {
    var queryStr = window.location.search.slice(1);  // 文頭?を除外
    queries = {};

    // クエリがない場合は空のオブジェクトを返す
    if (!queryStr) {
        return queries;
    }

    // クエリ文字列を & で分割して処理
    queryStr.split('&').forEach(function (queryStr) {
        // = で分割してkey,valueをオブジェクトに格納
        var queryArr = queryStr.split('=');
        queries[queryArr[0]] = queryArr[1];
    });

    return queries;
}

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

function stopSe() {
    Howler.stop();
}

// https://zenn.dev/k_kazukiiiiii/articles/cf3256ef6cbd84
function shuffleArray(array) {
    let cloneArray = [...array]

    for (let i = cloneArray.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1))
        // 配列の要素の順番を入れ替える
        let tmpStorage = cloneArray[i]
        cloneArray[i] = cloneArray[rand]
        cloneArray[rand] = tmpStorage
    }

    return cloneArray
}

function detectFullGame(length) {
    return length === 33;
}