import { Container, Node,  GraphModel, LanguageFilesRegistry, ValidationHandler } from '@cinco-glsp/cinco-glsp-api';
import { Action, ValidationResponseAction, ValidationRequestAction, ValidationStatus } from '@cinco-glsp/cinco-glsp-common';

export class ControlFlowCheck extends ValidationHandler {
    override CHANNEL_NAME: string | undefined = 'Workflow [' + this.modelState.graphModel.id + ']';

    override execute(action: ValidationRequestAction, ...args: unknown[]): Promise<Action[]> | Action[] {
        // next actions

        const modelElement = this.getElement(action.modelElementId);
        const name = `${modelElement.getSpec().label} (${modelElement.id})`

        const workflow = modelElement as GraphModel;

        const sibs = workflow.containedElements
            .filter(element => (element.type == "cincodebio:automatedsib" || element.type == "cincodebio:interactivesib"));

        var responses: ValidationResponseAction[] = []

        const no_sucessors = sibs.filter(a => a.successors.length == 0).map(a => a.getProperty('label'))
        const no_predecessors = sibs.filter(a => a.predecessors.length == 0).map(a => {a.getProperty('label')})
        
        this.log(JSON.stringify(no_sucessors))

        const cycles = this.hasAnyCycle(sibs)
        this.log(`${cycles}`)
        
        responses.push(ValidationResponseAction.create(workflow.id,
                workflow.id,
                [
                        {
                            name: `Workflow (${workflow.id})`,
                            message: cycles ? 'Workflow has Cycle(s)' : 'OK',
                            status: cycles ? ValidationStatus.Error : ValidationStatus.Pass
                        },
                        {
                            name: `Workflow (${workflow.id})`,
                            message: no_sucessors.length > 1
                            ? `A valid workflow can only have 1 SIB without an incoming ControlFlow edge, this workflow has ${no_sucessors.length}: ${JSON.stringify(no_sucessors)}`
                            : `OK`,
                            status: no_sucessors.length > 1 ? ValidationStatus.Error : ValidationStatus.Pass
                        }
                    ],
                action.requestId
            ));

        return responses;
    }

    override canExecute(action: ValidationRequestAction, ...args: unknown[]): Promise<boolean> | boolean {
        const element = this.getElement(action.modelElementId);
        return element !== undefined;
    }

    hasAnyCycle(jobs : Node[]) {
        const path = [];
        const cache = {};
    
        for (let job of jobs) {
            if (this.isCyclic(job, path, cache))
                return true;
        }
    
        return false;
     }

    isCyclic(node: Node, path: Node[], cache: { [key: string]: boolean }): boolean {
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




 // register into app
 LanguageFilesRegistry.register(ControlFlowCheck);
