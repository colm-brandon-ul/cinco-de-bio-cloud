"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputAppearanceProvider = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
class OutputAppearanceProvider extends cinco_glsp_api_1.AppearanceProvider {
    getAppearance(action, ...args) {
        // parse action
        const modelElementId = action.modelElementId;
        const element = this.getElement(modelElementId);
        const message = 'Element [' + element.type + ', ' + modelElementId + '] is changing appearance.';
        this.warn(message);
        return [];
        // return [appearanceUpdate];
    }
}
exports.OutputAppearanceProvider = OutputAppearanceProvider;
// register into app
cinco_glsp_api_1.LanguageFilesRegistry.register(OutputAppearanceProvider);
