import { Container, Node,  GraphModel, LanguageFilesRegistry, ValidationHandler } from '@cinco-glsp/cinco-glsp-api';
import { Action, ValidationResponseAction, ValidationRequestAction, ValidationStatus } from '@cinco-glsp/cinco-glsp-common';

export class SibCheck extends ValidationHandler {
    override CHANNEL_NAME: string | undefined = 'Workflow [' + this.modelState.graphModel.id + ']';

    override execute(action: ValidationRequestAction, ...args: unknown[]): Promise<Action[]> | Action[] {
        // next actions

        const modelElement = this.getElement(action.modelElementId);
        const name = `${modelElement.getSpec().label} (${modelElement.id})`

        const workflow = modelElement as GraphModel;



        return [];
    }

    override canExecute(action: ValidationRequestAction, ...args: unknown[]): Promise<boolean> | boolean {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }
}




 // register into app
 LanguageFilesRegistry.register(SibCheck);
