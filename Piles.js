function Piles() {
    let birds = new Birds();
    // --
    this.kumotoriyama = {
        cards: [birds.misosazai, birds.uguisu, birds.kakesu, birds.komadori, birds.fukurou,
            birds.koruri, birds.ruribitaki, birds.higara, birds.toratsugumi, birds.aogera,
            birds.ooakagera],
        location: '雲取山',
        filePrefix: 'kumotoriyama',
    };
    this.takanosuyama = {
        cards: [birds.ooruri, birds.kibitaki, birds.kogera, birds.kakesu, birds.komadori,
            birds.fukurou, birds.aobato, birds.yamadori, birds.koruri, birds.ruribitaki,
            birds.shijyukara, birds.higara, birds.akahara, birds.toratsugumi, birds.aogera,
            birds.ooakagera],
        location: '鷹ノ巣山',
        filePrefix: 'takanosuyama',
    };
    this.yamanofurusatomura = {
        cards: [birds.hojiro, birds.hiyodori, birds.misosazai, birds.uguisu, birds.ooruri,
            birds.kibitaki, birds.kogera, birds.tobi, birds.kakesu, birds.kisekirei,
            birds.hashibosogarasu, birds.gabicho, birds.ikaru, birds.jyobitaki, birds.yabusame,
            birds.sankoucho, birds.fukurou, birds.aobato, birds.kijibato, birds.yamadori,
            birds.mozu, birds.shijyukara, birds.yamasemi, birds.kawasemi, birds.higara,
            birds.toratsugumi, birds.aogera],
        location: '山のふるさと村',
        filePrefix: 'yamanofurusatomura',
    };
    this.nippara = {
        cards: [birds.hojiro, birds.hiyodori, birds.misosazai, birds.uguisu, birds.ooruri,
            birds.kibitaki, birds.kogera, birds.kakesu, birds.suzume, birds.kisekirei,
            birds.hashibosogarasu, birds.gabicho, birds.jyobitaki, birds.fukurou, birds.kijibato,
            birds.shijyukara, birds.toratsugumi, birds.aogera,],
        location: '日原',
        filePrefix: 'nippara',
    };
    this.shiromaru = {
        cards: [birds.hiyodori, birds.misosazai, birds.uguisu, birds.ooruri, birds.tobi,
            birds.kakesu, birds.kisekirei, birds.gabicho, birds.yabusame, birds.aobato,
            birds.kibitaki, birds.shijyukara, birds.kawasemi, birds.higara],
        location: '白丸湖',
        filePrefix: 'shiromaruko',
    };
    this.hikawa = {
        cards: [birds.hiyodori, birds.misosazai, birds.uguisu, birds.ooruri, birds.tobi,
            birds.suzume, birds.kisekirei, birds.hashibosogarasu, birds.gabicho, birds.kijibato,
            birds.mozu, birds.shijyukara],
        location: '氷川',
        filePrefix: 'hikawa',
    };
    this.ogouchijinja = {
        cards: [birds.kogera, birds.tobi, birds.kakesu, birds.fukurou, birds.kijibato,
            birds.shijyukara, birds.yamasemi, birds.kawasemi, birds.higara, birds.aogera],
        location: '小河内神社',
        filePrefix: 'ogouchijinja',
    };
    this.hinoharatominnomori = {
        cards: [birds.misosazai, birds.uguisu, birds.ooruri, birds.kibitaki, birds.kogera,
            birds.kakesu, birds.kisekirei, birds.yabusame, birds.aobato, birds.yamadori,
            birds.koruri, birds.shijyukara, birds.higara, birds.akahara, birds.toratsugumi,
            birds.aogera, birds.ooakagera],
        location: '檜原都民の森',
        filePrefix: 'hinoharatominnomori',
    };
    this.mitakesan = {
        cards: [birds.misosazai, birds.uguisu, birds.ooruri, birds.kibitaki, birds.kogera,
            birds.kakesu, birds.kisekirei, birds.gabicho, birds.ikaru, birds.yabusame,
            birds.fukurou, birds.aobato, birds.yamadori, birds.shijyukara, birds.higara,
            birds.toratsugumi, birds.aogera,],
        location: '御岳山',
        filePrefix: 'mitakesan',
    };
    this.pr_0 = {
        cards: [birds.uguisu, birds.tobi, birds.hashibosogarasu, birds.shijyukara],
        location: '卵道スペシャル',
        filePrefix: 'pr_0',
    };
    this.all = {
        cards: [birds.hojiro, birds.hiyodori, birds.misosazai, birds.uguisu, birds.ooruri,
            birds.kibitaki, birds.kogera, birds.tobi, birds.kakesu, birds.suzume,
            birds.kisekirei, birds.hashibosogarasu, birds.gabicho, birds.ikaru, birds.jyobitaki,
            birds.komadori, birds.yabusame, birds.sankoucho, birds.fukurou, birds.aobato,
            birds.kijibato, birds.yamadori, birds.koruri, birds.ruribitaki, birds.mozu,
            birds.shijyukara, birds.yamasemi, birds.kawasemi, birds.higara, birds.akahara,
            birds.toratsugumi, birds.aogera, birds.ooakagera],
        location: '全部MIX',
        filePrefix: 'all',
    };
    this.getPile = function (type) {
        switch (type) {
            case 'kmtr' :
                return this.kumotoriyama;
            case 'tkns' :
                return this.takanosuyama;
            case 'ymfr' :
                return this.yamanofurusatomura;
            case 'nppr' :
                return this.nippara;
            case 'srmr' :
                return this.shiromaru;
            case 'hkwa' :
                return this.hikawa;
            case 'ogch':
                return this.ogouchijinja;
            case 'hnhr' :
                return this.hinoharatominnomori;
            case 'mtke' :
                return this.mitakesan;
            case 'pr_0' :
                return this.pr_0;
            default :
                return this.all;
        }
    }
}