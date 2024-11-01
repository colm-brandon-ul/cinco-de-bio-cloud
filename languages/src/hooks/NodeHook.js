"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeHook = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
class NodeHook extends cinco_glsp_api_1.AbstractNodeHook {
    constructor() {
        super(...arguments);
        this.CHANNEL_NAME = 'NodeHook [' + this.modelState.root.id + ']';
    }
    postCreate(node) {
        // node.setProperty("name", `${this.VERBS[this.random(0, this.VERBS.length)]} ${this.NOUNS[this.random(0, this.NOUNS.length)]}`)
    }
    postMove(node, oldPosition) {
    }
    postResize(node, resizeBounds) {
        // layout(node as Container);
    }
    postDelete(node) {
    }
}
exports.NodeHook = NodeHook;
cinco_glsp_api_1.LanguageFilesRegistry.register(NodeHook);
