"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SibLibLabelAppearanceProvider = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
const cinco_glsp_common_1 = require("@cinco-glsp/cinco-glsp-common");
class SibLibLabelAppearanceProvider extends cinco_glsp_api_1.AppearanceProvider {
    getAppearance(action, ...args) {
        var _a, _b;
        // parse action
        const modelElementId = action.modelElementId;
        let element = this.getElement(modelElementId);
        const message = 'Element [' + element.type + ', ' + modelElementId + '] is woohoo changing appearance.';
        this.warn(message);
        this.log('HELLO');
        let labelNode = element;
        let sib = labelNode.parent;
        const shape = element.shape;
        const propertyValue = (_a = shape.children) === null || _a === void 0 ? void 0 : _a.find(shape => shape.type == "IMAGE");
        this.log(JSON.stringify(labelNode.properties));
        if (labelNode.getProperty('name') != sib.getProperty('name')) {
            labelNode.setProperty('name', sib.getProperty('name'));
        }
        if (labelNode.getProperty('label') != sib.getProperty('label')) {
            labelNode.setProperty('label', sib.getProperty('label'));
        }
        (_b = shape.children) === null || _b === void 0 ? void 0 : _b.forEach(a => {
            if (a.type == 'IMAGE') {
                const b = a;
                if (sib.type == 'siblibrary:service') {
                    this.log(b.path);
                    b.path = 'icons/service.png';
                    this.log(b.path);
                }
                else {
                    this.log(b.path);
                    b.path = 'icons/task.png';
                    this.log(b.path);
                }
            }
            else {
            }
        });
        const appearanceUpdate = cinco_glsp_common_1.ApplyAppearanceUpdateAction.create(modelElementId);
        // return [];
        return [appearanceUpdate];
    }
}
exports.SibLibLabelAppearanceProvider = SibLibLabelAppearanceProvider;
// register into app
cinco_glsp_api_1.LanguageFilesRegistry.register(SibLibLabelAppearanceProvider);
