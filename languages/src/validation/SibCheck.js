"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SibCheck = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
const cinco_glsp_common_1 = require("@cinco-glsp/cinco-glsp-common");
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
        const sibs = workflow.containedElements
            .filter(element => (element.type == "cincodebio:automatedsib" || element.type == "cincodebio:interactivesib"));
        if (sibs[0].primeReference) {
            this.log(`${sibs[0].primeReference.id}`);
            const primeRef = sibs[0].primeReference;
            var cache = {};
            this.validatePrime(sibs[0], primeRef, cache);
        }
        // Check if all input ports have an incoming edge
        const responses = sibs.map(sib => {
            const csib = sib;
            const failedIO = csib.containments.filter((a) => a.type === 'cincodebio:inputport');
            const m = failedIO.map((fio) => ({
                name: `SIB ${sib.getProperty("name")} (${sib.id})`,
                message: fio.incomingEdges.length !== 1
                    ? `Missing dataflow edge for ${fio.getProperty('name')} : ${fio.getProperty('typeName')}`
                    : `OK`,
                status: fio.incomingEdges.length !== 1 ? cinco_glsp_common_1.ValidationStatus.Error : cinco_glsp_common_1.ValidationStatus.Pass
            }));
            return cinco_glsp_common_1.ValidationResponseAction.create(this.modelState.graphModel.id, sib.id, m
                ? m
                : [
                    {
                        name: `SIB ${sib.getProperty("name")} (${sib.id})`,
                        message: 'OK',
                        status: cinco_glsp_common_1.ValidationStatus.Pass
                    }
                ], action.requestId);
        });
        return responses;
    }
    canExecute(action, ...args) {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }
    validatePrime(node, ref, cache) {
        const refChildren = ref.containments.filter(a => a.type !== 'siblibrary:branch');
        if (!node.containments.length === ref.containments.filter(a => a.type !== 'siblibrary:branch').length) {
            return false;
        }
        this.log(`${node.getProperty('label')}`);
        this.log(`${ref.getProperty('label')}`);
        // this.log(node.type + ' ' + ref.type)
    }
}
exports.SibCheck = SibCheck;
// register into app
cinco_glsp_api_1.LanguageFilesRegistry.register(SibCheck);
