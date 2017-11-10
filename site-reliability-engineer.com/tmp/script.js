function run() {
    var converter = new showdown.Converter(),
    text      = '#hello, markdown!',
    document.body.innerHTML = converter.makeHtml(text);
}
