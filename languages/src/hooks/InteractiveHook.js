"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractiveHook = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
class InteractiveHook extends cinco_glsp_api_1.AbstractNodeHook {
    constructor() {
        super(...arguments);
        this.CHANNEL_NAME = 'InteractiveHook [' + this.modelState.root.id + ']';
    }
    postCreate(node) {
        // node.setProperty("name", `${this.VERBS[this.random(0, this.VERBS.length)]} ${this.NOUNS[this.random(0, this.NOUNS.length)]}`)
        node.setProperty("name", 'interactive');
        node.setProperty("label", 'Interactive');
        this.notify(node.toJSON());
        const input = new cinco_glsp_api_1.Node();
        const label = new cinco_glsp_api_1.Node();
        const output = new cinco_glsp_api_1.Node();
        const image = node;
        input.position = { x: 0, y: 10 };
        input.size = { width: node.size.width, height: 20 };
        input.type = "siblibrary:input";
        label.position = { x: 0, y: 10 + 30 };
        label.size = { width: node.size.width, height: 20 };
        label.type = "siblibrary:label";
        output.position = { x: 0, y: node.size.height - 30 };
        output.size = { width: node.size.width, height: 20 };
        output.type = "siblibrary:output";
        image.containments.push(input, output, label);
    }
    postMove(node, oldPosition) {
    }
    postResize(node, resizeBounds) {
        // layout(node as Container);
    }
}
exports.InteractiveHook = InteractiveHook;
cinco_glsp_api_1.LanguageFilesRegistry.register(InteractiveHook);
