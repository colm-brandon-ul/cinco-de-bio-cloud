"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomatedHook = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
class AutomatedHook extends cinco_glsp_api_1.AbstractNodeHook {
    constructor() {
        super(...arguments);
        this.CHANNEL_NAME = 'AutomatedHook [' + this.modelState.root.id + ']';
    }
    postCreate(node) {
        node.setProperty("name", 'automated');
        node.setProperty("label", 'Automated');
        this.notify(node.toJSON());
        const input = new cinco_glsp_api_1.Node();
        const label = new cinco_glsp_api_1.Node();
        const output = new cinco_glsp_api_1.Node();
        const image = node;
        input.position = { x: 0, y: 10 };
        input.size = { width: node.size.width, height: 20 };
        input.type = "siblibrary:input";
        input.setProperty('name', 'myInput');
        input.setProperty('typeName', 'MyType');
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
exports.AutomatedHook = AutomatedHook;
cinco_glsp_api_1.LanguageFilesRegistry.register(AutomatedHook);
