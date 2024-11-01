"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SibCheck = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
class SibCheck extends cinco_glsp_api_1.ValidationHandler {
    constructor() {
        super(...arguments);
        this.CHANNEL_NAME = 'Workflow [' + this.modelState.graphModel.id + ']';
    }
    execute(action, ...args) {
        // next actions
        const modelElement = this.getElement(action.modelElementId);
        const name = `${modelElement.getSpec().label} (${modelElement.id})`;
        const workflow = modelElement;
        return [];
    }
    canExecute(action, ...args) {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }
}
exports.SibCheck = SibCheck;
// register into app
cinco_glsp_api_1.LanguageFilesRegistry.register(SibCheck);
