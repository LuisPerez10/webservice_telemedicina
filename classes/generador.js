function Generador() {
    const dec = "0123456789";
    const model = "xxxxxx";
    var str = "";
    for (var i = 0; i < model.length; i++) {
        var rnd = Math.floor(Math.random() * dec.length);
        str += dec[rnd];
    }
    return str;
}

module.exports = { Generador };