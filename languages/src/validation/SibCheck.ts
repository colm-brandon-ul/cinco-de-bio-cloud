import { Container, Node, GraphModel, LanguageFilesRegistry, ValidationHandler } from '@cinco-glsp/cinco-glsp-api';
import { Action, ValidationResponseAction, ValidationRequestAction, ValidationStatus, ValidationMessage } from '@cinco-glsp/cinco-glsp-common';

export class SibCheck extends ValidationHandler {
    override CHANNEL_NAME: string | undefined = 'Workflow [' + this.modelState.graphModel.id + ']';

    override execute(action: ValidationRequestAction, ...args: unknown[]): Promise<Action[]> | Action[] {
        // next actions

        const modelElement = this.getElement(action.modelElementId);
        const name = `${modelElement.getSpec().label} (${modelElement.id})`

        const workflow = modelElement as GraphModel;

        const sibs = workflow.containedElements
            .filter(element => (element.type == "cincodebio:automatedsib" || element.type == "cincodebio:interactivesib"));

        if (sibs[0].primeReference){
            this.log(`${sibs[0].primeReference.id}`)
            const primeRef = sibs[0].primeReference as Container;
            var cache = {}
            this.validatePrime(sibs[0],primeRef,cache)
        }
        
        

        // Check if all input ports have an incoming edge
        const responses = sibs.map(sib => {
            const csib = sib as Container;
            const failedIO = csib.containments.filter((a) => a.type === 'cincodebio:inputport');

            const m = failedIO.map((fio) => ({
                name: `SIB ${sib.getProperty("name")} (${sib.id})`,
                message: fio.incomingEdges.length !== 1
                    ? `Missing dataflow edge for ${fio.getProperty('name')} : ${fio.getProperty('typeName')}`
                    : `OK`,
                status: fio.incomingEdges.length !== 1 ? ValidationStatus.Error : ValidationStatus.Pass
            }));

            return ValidationResponseAction.create(
                this.modelState.graphModel.id,
                sib.id,
                m
                    ? m
                    : [
                        {
                            name: `SIB ${sib.getProperty("name")} (${sib.id})`,
                            message: 'OK',
                            status: ValidationStatus.Pass
                        }
                    ],
                action.requestId
            );
        });

        return responses;
    }

    override canExecute(action: ValidationRequestAction, ...args: unknown[]): Promise<boolean> | boolean {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }

    validatePrime(node: any, ref: any, cache: any ){
        const refChildren = ref.containments.filter(a => a.type !== 'siblibrary:branch')

        if (!node.containments.length === ref.containments.filter(a => a.type !== 'siblibrary:branch').length){
            return false
        }
        this.log(`${node.getProperty('label')}`)
        this.log(`${ref.getProperty('label')}`)
    
        // this.log(node.type + ' ' + ref.type)
    
    }
}



// register into app
LanguageFilesRegistry.register(SibCheck);

