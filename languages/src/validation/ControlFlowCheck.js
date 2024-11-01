"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlFlowCheck = void 0;
const cinco_glsp_api_1 = require("@cinco-glsp/cinco-glsp-api");
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
        //     const jobs = workflow.containedElements
        //        .filter(element => element.type == "rig:job");
        //     const duplicateNames = jobs
        //        .map(element => element.getProperty("name"))
        //        .filter((element, index, array) => array.indexOf(element) !== index)
        //    //const duplicateNamedJobs = jobs.filter(job => duplicateNames.includes(job.getProperty("name")));
        //    const responses = jobs
        //        .map(job => ValidationResponseAction.create(this.modelState.graphModel.id, job.id, [
        //            {
        //                name: `Job ${job.getProperty("name")} (${job.id})`,
        //                message: duplicateNames.includes(job.getProperty("name")) 
        //                    ? `Duplicate job name ${job.getProperty("name")}`
        //                    : "Ok",
        //                status: duplicateNames.includes(job.getProperty("name")) ? ValidationStatus.Error : ValidationStatus.Pass
        //            }
        //        ]), action.requestId);
        //    const hasCycle = hasAnyCycle(jobs);
        //    responses.push(ValidationResponseAction.create(this.modelState.graphModel.id, this.modelState.graphModel.id, [
        //        {
        //            name: name,
        //            message: "Cycle Checking is currently disabled",
        //            status: ValidationStatus.Info
        //        }
        //    ]));
        return [];
        // return responses;
    }
    canExecute(action, ...args) {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }
}
exports.ControlFlowCheck = ControlFlowCheck;
// register into app
cinco_glsp_api_1.LanguageFilesRegistry.register(ControlFlowCheck);
