"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SibLibLabelApperanceProvider = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
class SibLibLabelApperanceProvider extends cinco_glsp_api_1.AppearanceProvider {
    getAppearance(action, ...args) {
        // parse action
        const modelElementId = action.modelElementId;
        let element = this.getElement(modelElementId);
        const message = 'Element [' + element.type + ', ' + modelElementId + '] is woohoo changing appearance.';
        this.log(message);
        // let labelNode = element as Node
        // if (labelNode.parent instanceof Container){
        // }
        // let sib = labelNode.parent as Container
        // if (labelNode.getProperty('name') != sib.getProperty('name')){
        //     labelNode.setProperty('name',sib.getProperty('name'))
        // }
        // if (labelNode.getProperty('label') != sib.getProperty('label')){
        //     labelNode.setProperty('label',sib.getProperty('label'))
        // }
        // return [];
        return [];
    }
}
exports.SibLibLabelApperanceProvider = SibLibLabelApperanceProvider;
// register into app
cinco_glsp_api_1.LanguageFilesRegistry.register(SibLibLabelApperanceProvider);
