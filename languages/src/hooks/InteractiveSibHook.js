"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractiveSibHook = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
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
            node.setProperty('name', reference.getProperty('name'));
            node.setProperty('label', reference.getProperty('label'));
            reference._containments.forEach((child) => {
                if (child.type == 'siblibrary:input') {
                    let n = new cinco_glsp_api_1.Node();
                    n.position = { x: child.position.x, y: child.position.y };
                    n.size = { width: node.size.width, height: child.size.height };
                    n.type = "cincodebio:inputport";
                    n.setProperty('name', child.getProperty('name'));
                    n.setProperty('typeName', child.getProperty('typeName'));
                    image._containments.push(n);
                }
                if (child.type == 'siblibrary:output') {
                    let n = new cinco_glsp_api_1.Node();
                    n.position = { x: child.position.x, y: child.position.y };
                    n.size = { width: node.size.width, height: child.size.height };
                    n.type = "cincodebio:outputport";
                    n.setProperty('name', child.getProperty('name'));
                    n.setProperty('typeName', child.getProperty('typeName'));
                    image._containments.push(n);
                }
                if (child.type == 'siblibrary:label') {
                    let n = new cinco_glsp_api_1.Node();
                    n.position = { x: child.position.x, y: child.position.y };
                    n.size = { width: node.size.width, height: child.size.height };
                    n.type = "cincodebio:siblabel";
                    n.setProperty('name', child.getProperty('name'));
                    n.setProperty('label', child.getProperty('label'));
                    image._containments.push(n);
                }
            });
        }
    }
    postMove(node, oldPosition) {
    }
    postResize(node, resizeBounds) {
        // layout(node as Container);
    }
}
exports.InteractiveSibHook = InteractiveSibHook;
cinco_glsp_api_1.LanguageFilesRegistry.register(InteractiveSibHook);
