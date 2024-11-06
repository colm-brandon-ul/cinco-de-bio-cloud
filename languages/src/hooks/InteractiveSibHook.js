"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = exports.InteractiveSibHook = exports.PADDING = exports.LABEL_HEIGHT = exports.IO_HEIGHT = exports.FOOTER_HEIGHT = exports.HEADER_HEIGHT = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
exports.HEADER_HEIGHT = 20;
exports.FOOTER_HEIGHT = 20;
exports.IO_HEIGHT = 20;
exports.LABEL_HEIGHT = 50;
exports.PADDING = 5;
const map = {
    "cincodebio:inputport": exports.IO_HEIGHT,
    "cincodebio:siblabel": exports.LABEL_HEIGHT,
    "cincodebio:outputport": exports.IO_HEIGHT
};
class InteractiveSibHook extends cinco_glsp_api_1.AbstractNodeHook {
    constructor() {
        super(...arguments);
        this.CHANNEL_NAME = 'InteractiveSibHook [' + this.modelState.root.id + ']';
    }
    postCreate(node) {
        // node.setProperty("name", `${this.VERBS[this.random(0, this.VERBS.length)]} ${this.NOUNS[this.random(0, this.NOUNS.length)]}`)
        if (node.isPrime) {
            const image = node;
            const reference = node.primeReference;
            const referenceInfo = node.primeReferenceInfo;
            image.size = reference.size;
            node.setProperty('name', reference.getProperty('name'));
            node.setProperty('label', reference.getProperty('label'));
            // this.actionDispatcher.dispatch()
            reference.containments.forEach((child) => {
                if (child.type == 'siblibrary:input') {
                    let n = new cinco_glsp_api_1.Node();
                    n.position = { x: child.position.x, y: child.position.y };
                    n.size = { width: node.size.width, height: child.size.height };
                    n.type = "cincodebio:inputport";
                    n.setProperty('name', child.getProperty('name'));
                    n.setProperty('typeName', child.getProperty('typeName'));
                    image.containments.push(n);
                }
                if (child.type == 'siblibrary:output') {
                    let n = new cinco_glsp_api_1.Node();
                    n.position = { x: child.position.x, y: child.position.y };
                    n.size = { width: node.size.width, height: child.size.height };
                    n.type = "cincodebio:outputport";
                    n.setProperty('name', child.getProperty('name'));
                    n.setProperty('typeName', child.getProperty('typeName'));
                    image.containments.push(n);
                }
                if (child.type == 'siblibrary:label') {
                    let n = new cinco_glsp_api_1.Node();
                    n.position = { x: child.position.x, y: child.position.y };
                    n.size = { width: node.size.width, height: child.size.height };
                    n.type = "cincodebio:siblabel";
                    n.setProperty('name', child.getProperty('name'));
                    n.setProperty('label', child.getProperty('label'));
                    image.containments.push(n);
                }
            });
            layout(image);
        }
    }
    postMove(node, oldPosition) {
    }
    postResize(node, resizeBounds) {
        layout(node);
    }
}
exports.InteractiveSibHook = InteractiveSibHook;
function layout(sib, ignore) {
    const width = sib.size.width;
    // const nodes = sib.containments.sort((a, b) => a.position.y - b.position.y);
    // parition into inputs, outputs and labels
    // Sort alphabetically by type, then numerically by y
    const nodes = sib.containments.sort((a, b) => {
        const result = a.type.replace('sib', '').localeCompare(b.type.replace('sib', ''));
        if (result !== 0) {
            return result;
        }
        return a.position.y - b.position.y;
    });
    var delta = exports.HEADER_HEIGHT;
    for (let node of nodes) {
        // do not layout ignored slot
        if (node == ignore)
            continue;
        // make slot as wide as slottable
        node.size = {
            width: width,
            height: map[node.type]
        };
        // and put into correct position
        node.position = {
            x: 0,
            y: delta
        };
        delta += (map[node.type] + exports.PADDING);
    }
    delta += exports.FOOTER_HEIGHT;
    sib.size = {
        width: width,
        height: delta
    };
}
exports.layout = layout;
cinco_glsp_api_1.LanguageFilesRegistry.register(InteractiveSibHook);
