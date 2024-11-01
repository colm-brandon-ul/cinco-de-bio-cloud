import { Container, Node,  GraphModel, LanguageFilesRegistry, ValidationHandler } from '@cinco-glsp/cinco-glsp-api';
import { Action, ValidationResponseAction, ValidationRequestAction, ValidationStatus } from '@cinco-glsp/cinco-glsp-common';

export class DataFlowCheck extends ValidationHandler {
    override CHANNEL_NAME: string | undefined = 'Workflow [' + this.modelState.graphModel.id + ']';

    override execute(action: ValidationRequestAction, ...args: unknown[]): Promise<Action[]> | Action[] {
        // next actions

        const modelElement = this.getElement(action.modelElementId);
        const name = `${modelElement.getSpec().label} (${modelElement.id})`

        const workflow = modelElement as GraphModel;


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

    override canExecute(action: ValidationRequestAction, ...args: unknown[]): Promise<boolean> | boolean {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }
}




 // register into app
 LanguageFilesRegistry.register(DataFlowCheck);
