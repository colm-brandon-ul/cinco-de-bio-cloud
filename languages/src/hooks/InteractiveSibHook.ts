import { Node, AbstractNodeHook, LanguageFilesRegistry, Container, ResizeBounds } from '@cinco-glsp/cinco-glsp-api';
import { MetaSpecification, getGraphSpecOf } from '@cinco-glsp/cinco-glsp-common';
import { Point } from 'sprotty-protocol';


export class InteractiveSibHook extends AbstractNodeHook {
    override CHANNEL_NAME: string | undefined = 'InteractiveSibHook [' + this.modelState.root.id + ']';

   
    override postCreate(node: Node): void {
        // node.setProperty("name", `${this.VERBS[this.random(0, this.VERBS.length)]} ${this.NOUNS[this.random(0, this.NOUNS.length)]}`)
        if(node.isPrime) {
            const image = node as Container
            const reference = node.primeReference! as Container
            const referenceInfo = node.primeReferenceInfo!;



            node.setProperty('name',reference.getProperty('name'))
            node.setProperty('label',reference.getProperty('label'))
            
            reference._containments.forEach((child: Node) => {

                if (child.type == 'siblibrary:input'){
                    let n = new Node()
                    n.position = { x : child.position.x, y : child.position.y }
                    n.size =  { width: node.size.width, height: child.size.height }
                    n.type = "cincodebio:inputport";
                    n.setProperty('name',child.getProperty('name'))
                    n.setProperty('typeName',child.getProperty('typeName'))
                    image._containments.push(n)

                }

                if (child.type == 'siblibrary:output') {
                    let n = new Node()
                    n.position = { x : child.position.x, y : child.position.y }
                    n.size =  { width: node.size.width, height: child.size.height }
                    n.type = "cincodebio:outputport";
                    n.setProperty('name',child.getProperty('name'))
                    n.setProperty('typeName',child.getProperty('typeName'))
                    image._containments.push(n)

                } 

                if (child.type == 'siblibrary:label') {
                    let n = new Node()
                    n.position = { x : child.position.x, y : child.position.y }
                    n.size =  { width: node.size.width, height: child.size.height }
                    n.type = "cincodebio:siblabel";
                    n.setProperty('name',child.getProperty('name'))
                    n.setProperty('label',child.getProperty('label'))
                    image._containments.push(n)

                }
            });
               
        }
    }

    override postMove(node: Node, oldPosition?: Point | undefined): void {
        
    }

    override postResize(node: Node, resizeBounds: ResizeBounds): void {
        // layout(node as Container);
    }
}


LanguageFilesRegistry.register(InteractiveSibHook);
