import { Container, GeneratorHandler, GraphModel, LanguageFilesRegistry, ModelElement, Node } from '@cinco-glsp/cinco-glsp-api';
import { GeneratorAction, deletableValue} from '@cinco-glsp/cinco-glsp-common';

export class CincoDeBioGenerator extends GeneratorHandler {
    override CHANNEL_NAME: string | undefined = 'CincoDeBio Workflow [' + this.modelState.root.id + ']';


    override execute(action: GeneratorAction, ...args: unknown[]) {
        // parse action
        const model = this.getElement(action.modelElementId);

        this.warn("Generating Workflow Execution Program")

        // generate
        this.generate(model as GraphModel);

        this.info("Finished Generation")
        this.notify('Generation successfull!', 'OK');
        return [];
    }

    override canExecute(action: GeneratorAction, ...args: unknown[]): Promise<boolean> | boolean {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }

    /**
     * generate files
     */
    generate (model: GraphModel): void {

        const pipeline : any = {}
        // var vars = model.getProperty("environmentVariable").map(env => [env.name, env.value]);
        // pipeline.variables = Object.fromEntries(vars);

    }

}

