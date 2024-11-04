"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = exports.AutomatedHook = exports.PADDING = exports.LABEL_HEIGHT = exports.IO_HEIGHT = exports.FOOTER_HEIGHT = exports.HEADER_HEIGHT = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
exports.HEADER_HEIGHT = 20;
exports.FOOTER_HEIGHT = 20;
exports.IO_HEIGHT = 20;
exports.LABEL_HEIGHT = 50;
exports.PADDING = 5;
const map = {
    "siblibrary:input": exports.IO_HEIGHT,
    "siblibrary:label": exports.LABEL_HEIGHT,
    "siblibrary:output": exports.IO_HEIGHT
};
class AutomatedHook extends cinco_glsp_api_1.AbstractNodeHook {
    constructor() {
        super(...arguments);
        this.CHANNEL_NAME = 'AutomatedHook [' + this.modelState.root.id + ']';
    }
    postCreate(node) {
        node.setProperty("name", 'automated');
        node.setProperty("label", 'Automated');
        const input = new cinco_glsp_api_1.Node();
        const label = new cinco_glsp_api_1.Node();
        const output = new cinco_glsp_api_1.Node();
        const image = node;
        var delta = 0;
        input.position = { x: 0, y: exports.HEADER_HEIGHT };
        input.size = { width: node.size.width, height: exports.IO_HEIGHT };
        input.type = "siblibrary:input";
        delta = (input.position.y + input.size.height + exports.PADDING);
        label.position = { x: 0, y: delta };
        label.size = { width: node.size.width, height: exports.LABEL_HEIGHT };
        label.type = "siblibrary:label";
        delta = (label.position.y + label.size.height + exports.PADDING);
        output.position = { x: 0, y: delta };
        output.size = { width: node.size.width, height: exports.IO_HEIGHT };
        output.type = "siblibrary:output";
        delta = (output.position.y + output.size.height + exports.PADDING);
        image.containments.push(input, output, label);
        image.size.height = (delta + exports.FOOTER_HEIGHT);
    }
    postMove(node, oldPosition) {
    }
    postResize(node, resizeBounds) {
        layout(node);
    }
}
exports.AutomatedHook = AutomatedHook;
function layout(sib, ignore) {
    const width = sib.size.width;
    // const nodes = sib.containments.sort((a, b) => a.position.y - b.position.y);
    // parition into inputs, outputs and labels
    // Sort alphabetically by type, then numerically by y
    const nodes = sib.containments.sort((a, b) => {
        const result = a.type.localeCompare(b.type);
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
cinco_glsp_api_1.LanguageFilesRegistry.register(AutomatedHook);
