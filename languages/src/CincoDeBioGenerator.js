"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CincoDeBioGenerator = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
class CincoDeBioGenerator extends cinco_glsp_api_1.GeneratorHandler {
    constructor() {
        super(...arguments);
        this.CHANNEL_NAME = 'CincoDeBio Workflow [' + this.modelState.root.id + ']';
    }
    execute(action, ...args) {
        // parse action
        const model = this.getElement(action.modelElementId);
        this.warn("Generating Workflow Execution Program");
        // generate
        this.generate(model);
        this.info("Finished Generation");
        this.notify('Generation successfull!', 'OK');
        return [];
    }
    canExecute(action, ...args) {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }
    /**
     * generate files
     */
    generate(model) {
        const pipeline = {};
        // var vars = model.getProperty("environmentVariable").map(env => [env.name, env.value]);
        // pipeline.variables = Object.fromEntries(vars);
    }
}
exports.CincoDeBioGenerator = CincoDeBioGenerator;
