"4.9.null"

function generate(tag, options={}, parent=false, oninit=function(){}){
    const children = options.children || [];
    delete options.children;
    const el = Object.assign(document.createElement(tag), options);
    const ad = parent && (parent?.nodeType === Node.ELEMENT_NODE) ? parent.appendChild(el) : el;
    children.forEach(child => ad.appendChild(child));
    oninit(ad);
    return ad;
};

const me = Object.assign(generate, {
    $: function name(selector, all=false, searchIn=document, async=false, onlyObserve=false){
        if (async === false) return all ? searchIn.querySelectorAll(selector) : searchIn.querySelector(selector);
        return new Promise(resolve => {
            const elem = searchIn.querySelector(selector);
            if (elem !== null && !onlyObserve) return resolve(elem);
            let id;
            let observer = new MutationObserver(MutationRecords => {
                MutationRecords.forEach(record => {
                    record.addedNodes.forEach(function(node) {
                        const elem = node.matches?.(selector) ? node : node.querySelector?.(selector);
                        if (elem) {
                            id && clearTimeout(id);
                            observer.disconnect();
                            resolve(elem);
                        }
                    });
                });
            });
            observer.observe(searchIn, {
                childList: true,
                subtree: true
            });
            if (typeof async == 'number') {
                id = setTimeout(() => {
                    observer.disconnect();
                    resolve(null);
                }, async);
            }
        });
    },
    css: (css, id) => {
        return document.head.appendChild(me('style', {textContent: css, id: id}));
    },
    f: {
    },
    g: {
        next: '__next',
        ad: 'side',
        drawingContainer: 'drawingContainer',
        background: 'background',
        content: 'content',
        nextData: '__NEXT_DATA__',
        item: 'item',
        drawing: 'drawing',
        balloon: 'balloon',
    },
    ss: {
    },
    c: {
        get whatIsCSS(){return "https://www.w3schools.com/css/"},
    },
    game: {
    },
    init: function(){
        me.f.globalObserver();
    },
    icons: {
        copyButton: `data:image/svg+xml;charset=UTF-8,%3c?xml version='1.0' encoding='iso-8859-1'?%3e%3c!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='561px' height='561px' viewBox='0 0 561 561' style='enable-background:new 0 0 561 561;' xml:space='preserve'%3e%3cg%3e%3cg id='content-copy'%3e%3cpath fill='%23FFFFFF' d='M395.25,0h-306c-28.05,0-51,22.95-51,51v357h51V51h306V0z M471.75,102h-280.5c-28.05,0-51,22.95-51,51v357 c0,28.05,22.95,51,51,51h280.5c28.05,0,51-22.95,51-51V153C522.75,124.95,499.8,102,471.75,102z M471.75,510h-280.5V153h280.5V510 z'/%3e%3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e`,
        downloadButton: `https://garticphone.com/images/download.svg`,
        ytPlayButtonActiveSVG: `%3Csvg%20height%3D%22100%25%22%20version%3D%221.1%22%20viewBox%3D%220%200%2068%2048%22%20width%3D%22100%25%22%3E%3Cpath%20class%3D%22ytp-large-play-button-bg%22%20d%3D%22M66.52%2C7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79%2C.13%2C34%2C0%2C34%2C0S12.21%2C.13%2C6.9%2C1.55%20C3.97%2C2.33%2C2.27%2C4.81%2C1.48%2C7.74C0.06%2C13.05%2C0%2C24%2C0%2C24s0.06%2C10.95%2C1.48%2C16.26c0.78%2C2.93%2C2.49%2C5.41%2C5.42%2C6.19%20C12.21%2C47.87%2C34%2C48%2C34%2C48s21.79-0.13%2C27.1-1.55c2.93-0.78%2C4.64-3.26%2C5.42-6.19C67.94%2C34.95%2C68%2C24%2C68%2C24S67.94%2C13.05%2C66.52%2C7.74z%22%20fill%3D%22%23f00%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M%2045%2C24%2027%2C14%2027%2C34%22%20fill%3D%22%23fff%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E`,
        ytPlayButtonInactiveSVG: `<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>`,
    },
});

delete generate;


me("style", {
	textContent: '.side{display:none !important;}'
}, document.head);

me.f.globalObserver = function(){
    let observer = new MutationObserver(mutation => {
        mutation.forEach(record => {
            record.addedNodes.forEach(me.f.onAddedNode);
        });
    });
    observer.observe(document, {childList: true, subtree: true});
}

me.f.onAddedNode = function(node){
    switch (node?.tagName) {
        case 'DIV': me.f.ondiv(node); break;
    }
}

me.f.ondiv = function(div){
    Array.from(div.querySelectorAll(`.${me.g.item}`)).concat(div.classList.contains(me.g.item) ? [div] : []).forEach(me.f.onBookItem);
}

me.f.onBookItem = function(item){
    if (item.querySelector(`.${me.g.drawing}`)){
        me.f.addDrawingItemsButtons(item);
    }
}

me.f.addDrawingItemsButtons = function(item){
    item.style = 'display:flex;flex-direction:row;';
    me('div', {
        id: 'drawing-item-buttons-area',
        style: `display:flex;flex-direction:column;margin-top:30px;height:fit-content;`,
        children: [
            me('button', {
                className: 'download-button-on-drawing-item',
                onclick: me.f.itemDownloadButton
            }),
            me('button', {
                className: 'copy-button-on-drawing-item',
                onclick: me.f.itemCopyButton
            }),
        ]
    }, item);
}

me.f.itemCopyButton = async function(){
    const solidCanvas = me.f.mergeCanvases(Array.from(this.closest(`.${me.g.item}`).getElementsByTagName('canvas')));

    solidCanvas.toBlob(blob => {
        navigator.clipboard.write([
            new window.ClipboardItem({
                [blob.type]: blob
            })
        ]).then(() => {
            me.log('Copied', 'succes');
        })
    })
}
a
me.f.mergeCanvases = function(canvases){
    const mainCanvas = me('canvas', {
        width: canvases[0].width,
        height: canvases[0].height
    }),
          mainCtx = mainCanvas.getContext('2d');

    canvases.forEach(canvas => {
        mainCtx.drawImage(canvas, 0, 0, canvases[0].width, canvases[0].height);
    });

    return mainCanvas;
}

me.css(`
html {
    overflow: hidden;
    !important
}

.setting-tab-selected {
    color: #fff;
    background-color: #000;
}

.my-settings-checkbox-area {
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
}

.my-settings-radiobutton-area {
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
}

.my-settings-text {
    color: #fff;
    font-family: "Black";
    text-transform: uppercase;
    flex: 1;
}

.my-settings-checkbox {
    margin: 0px 7px 2px 0px;
}

.my-settings-radiobutton{
    margin: 0px 7px 2px 0px;
}

.my-settings-label {
    color: #fff;
    margin: 0px auto 0px auto;
    padding: 10px;
    max-height: 15px;
    font-family: "Black";
    text-transform: uppercase;
    flex: 1;
}

.my-settings-range-area {
    display: flex;
    flex-direction: column;
}

.my-settings-range-text {
    color: #fff;
    padding: 0px 0px 6px 10px;
    max-height: 15px;
    font-family: "Black";
    text-transform: uppercase;
    font-size: 15px;
    flex: 1;
}

.my-settings-range {
    margin: 5px 10px 6px 10px;
    height: 5px;
}

.my-background {
    position: absolute;
    z-index: 100;
    display: flex;
    inset: 0px;
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
}

.load-file-button {
    font-family: 'Black';
    font-size: 20px;
    border-radius: 5px;
    margin: 0px 10px 0px 10px;
    height: 35px;
    outline: none;
    appearance: none;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #fff;
}

.load-file-button:hover{
    border: 2px solid;
    color: #fff;
    background-color: #000;
}

.load-file-plate {
    display: flex;
    flex-direction: column;
    margin: 10px 0px 0px 0px;
}

.load-file-label {
    color: #fff;
    flex: 1;
    font-family: 'Black';
    text-transform: uppercase;
    margin: 0px 0px 5px 0px;
    text-align: center;
}

.copy-button-on-drawing-item {
    background-image: url("${me.icons.copyButton}");
    background-size: 100%;
    background-repeat: no-repeat;
    border: none;
    appearance: none;
    outline: none;
    background-color: transparent;
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin: 2px;
}

.download-button-on-drawing-item {
    background-image: url("${me.icons.downloadButton}");
    background-size: 100%;
    background-repeat: no-repeat;
    border: none;
    appearance: none;
    outline: none;
    background-color: transparent;
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin: 2px;
}



`, 'myConstantStyles');



me.init();
