"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlFlowCheck = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
const cinco_glsp_common_1 = require("@cinco-glsp/cinco-glsp-common");
class ControlFlowCheck extends cinco_glsp_api_1.ValidationHandler {
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
        var responses = [];
        const no_sucessors = sibs.filter(a => a.successors.length == 0).map(a => a.getProperty('label'));
        const no_predecessors = sibs.filter(a => a.predecessors.length == 0).map(a => { a.getProperty('label'); });
        this.log(JSON.stringify(no_sucessors));
        const cycles = this.hasAnyCycle(sibs);
        this.log(`${cycles}`);
        responses.push(cinco_glsp_common_1.ValidationResponseAction.create(workflow.id, workflow.id, [
            {
                name: `Workflow (${workflow.id})`,
                message: cycles ? 'Workflow has Cycle(s)' : 'OK',
                status: cycles ? cinco_glsp_common_1.ValidationStatus.Error : cinco_glsp_common_1.ValidationStatus.Pass
            },
            {
                name: `Workflow (${workflow.id})`,
                message: no_sucessors.length > 1
                    ? `A valid workflow can only have 1 SIB without an incoming ControlFlow edge, this workflow has ${no_sucessors.length}: ${JSON.stringify(no_sucessors)}`
                    : `OK`,
                status: no_sucessors.length > 1 ? cinco_glsp_common_1.ValidationStatus.Error : cinco_glsp_common_1.ValidationStatus.Pass
            }
        ], action.requestId));
        return responses;
    }
    canExecute(action, ...args) {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }
    hasAnyCycle(jobs) {
        const path = [];
        const cache = {};
        for (let job of jobs) {
            if (this.isCyclic(job, path, cache))
                return true;
        }
        return false;
    }
    isCyclic(node, path, cache) {
        // Could make this more useful by identify the path which has cycles?
        // Check the cache first
        if (cache[node.id] !== undefined) {
            return cache[node.id];
        }
        // Add the current node to the path
        path.push(node);
        // Check if the current node is already in the path, indicating a cycle
        if (path.indexOf(node, 0) !== path.lastIndexOf(node)) {
            // Cycle found, cache the result
            cache[node.id] = true;
            return true;
        }
        // Recursively check the node's successors
        for (let successor of node.successors) {
            if (this.isCyclic(successor, path, cache)) {
                // Cycle found, cache the result
                cache[node.id] = true;
                return true;
            }
        }
        // No cycle found, remove the current node from the path and cache the result
        path.splice(path.indexOf(node, 0), 1);
        cache[node.id] = false;
        return false;
    }
}
exports.ControlFlowCheck = ControlFlowCheck;
// register into app
cinco_glsp_api_1.LanguageFilesRegistry.register(ControlFlowCheck);
