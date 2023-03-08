function Piles() {
    let birds = new Birds();
    // --
    this.kumotoriyama = {
        cards: [birds.hiyodori, birds.misosazai],
        location: '雲取山',
        image: 'otherImages/kumotoriyama.jpg',
    };
    this.takanosuyama = {
        cards: [birds.hiyodori, birds.misosazai],
        location: '鷹ノ巣山',
        image: 'otherImages/takanosuyama.jpg',
    };
    this.yamanofurusatomura = {
        cards: [birds.hiyodori, birds.misosazai],
        location: '山のふるさと村',
        image: 'otherImages/yamanofurusatomura.jpg',
    };
    this.nippara = {
        cards: [birds.hiyodori, birds.misosazai, birds.oorui, birds.kibitaki, birds.kakesu, birds.kisekirei, birds.fukurou, birds.ikaru, birds.aobato, birds.toratsugumi, birds.hojiro],
        location: '日原',
        image: 'otherImages/nippara.jpg',
    };
    this.shiromaru = {
        cards: [birds.hiyodori, birds.misosazai, birds.oorui, birds.kibitaki, birds.kakesu, birds.kisekirei, birds.fukurou, birds.ikaru, birds.aobato, birds.yamasemi, birds.kawasemi],
        location: '白丸湖',
        image: 'otherImages/shiromaru.jpg',
    };
    this.hikawa = {
        cards: [birds.hiyodori, birds.misosazai],
        location: '氷川',
        image: 'otherImages/hikawa.jpg',
    };
    this.ogouchijinja = {
        cards: [birds.hiyodori, birds.misosazai],
        location: '小河内神社',
        image: 'otherImages/ogouchijinja.jpg',
    };
    this.hinoharatominnomori = {
        cards: [birds.hiyodori, birds.misosazai],
        location: '檜原都民の森',
        image: 'otherImages/hinoharatominnomori.jpg',
    };
    this.mitakesan = {
        cards: [birds.hiyodori, birds.misosazai],
        location: '御岳山',
        image: 'otherImages/mitakesan.jpg',
    };
    this.all = {
        cards: [birds.hiyodori, birds.misosazai],
        location: '全部MIX',
        image: 'otherImages/all.jpg',
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
            default :
                return this.all;
        }
    }
}