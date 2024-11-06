"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFlowCheck = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
class DataFlowCheck extends cinco_glsp_api_1.ValidationHandler {
    constructor() {
        super(...arguments);
        this.CHANNEL_NAME = 'Workflow [' + this.modelState.graphModel.id + ']';
    }
    execute(action, ...args) {
        // next actions
        const modelElement = this.getElement(action.modelElementId);
        const name = `${modelElement.getSpec().label} (${modelElement.id})`;
        const workflow = modelElement;
        // sibs ->
        const sibs = workflow.containedElements;
        // need to go through each input port for each sib and make sure it has an incoming edge
        // if it doesn't then that's an error
        // if it does, need to check for type mismatch
        return [];
    }
    canExecute(action, ...args) {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }
}
exports.DataFlowCheck = DataFlowCheck;
// register into app
cinco_glsp_api_1.LanguageFilesRegistry.register(DataFlowCheck);
