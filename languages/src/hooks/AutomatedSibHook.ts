import { Node, AbstractNodeHook, LanguageFilesRegistry, Container, ResizeBounds } from '@cinco-glsp/cinco-glsp-api';
import { MetaSpecification, getGraphSpecOf } from '@cinco-glsp/cinco-glsp-common';
import { Action, CustomAction } from '@cinco-glsp/cinco-glsp-common';
import { CreateNodeOperation } from '@eclipse-glsp/server';


import { Point } from 'sprotty-protocol';

export const HEADER_HEIGHT: number = 20;
export const FOOTER_HEIGHT: number = 20;
export const IO_HEIGHT: number = 20;
export const LABEL_HEIGHT: number = 50
export const PADDING: number = 5

const map = {
    "cincodebio:inputport":IO_HEIGHT,
    "cincodebio:siblabel": LABEL_HEIGHT,
    "cincodebio:outputport": IO_HEIGHT
}

export class AutomatedSibHook extends AbstractNodeHook {
    override CHANNEL_NAME: string | undefined = 'AutomatedSibHook [' + this.modelState.root.id + ']';
   
    override postCreate(node: Node): void {
        // node.setProperty("name", `${this.VERBS[this.random(0, this.VERBS.length)]} ${this.NOUNS[this.random(0, this.NOUNS.length)]}`)
        if(node.isPrime) {
            const image = node as Container
            const reference = node.primeReference! as Container
            const referenceInfo = node.primeReferenceInfo!;
            node.setProperty('name',reference.getProperty('name'))
            node.setProperty('label',reference.getProperty('label'))
            image.size = reference.size
            this.log(referenceInfo.modelType)


            reference.containments.forEach((child: Node) => {

                if (child.type == 'siblibrary:input'){

                    let n = new Node()
                    n.position = { x : child.position.x, y : child.position.y }
                    n.size =  { width: node.size.width, height: child.size.height }
                    n.type = "cincodebio:inputport";
                    n.setProperty('name',child.getProperty('name'))
                    n.setProperty('typeName',child.getProperty('typeName'))
                    image.containments.push(n)
                    
                   

                }

                if (child.type == 'siblibrary:output') {
                    let n = new Node()
                    n.position = { x : child.position.x, y : child.position.y }
                    n.size =  { width: node.size.width, height: child.size.height }
                    n.type = "cincodebio:outputport";
                    n.setProperty('name',child.getProperty('name'))
                    n.setProperty('typeName',child.getProperty('typeName'))
                    image.containments.push(n)

                } 

                if (child.type == 'siblibrary:label') {
                    let n = new Node()
                    n.position = { x : child.position.x, y : child.position.y }
                    n.size =  { width: node.size.width, height: child.size.height }
                    n.type = "cincodebio:siblabel";
                    n.setProperty('name',child.getProperty('name'))
                    n.setProperty('label',child.getProperty('label'))
                    image.containments.push(n)

                }
            });
            
            layout(image)
            
        }
    }

    override postMove(node: Node, oldPosition?: Point | undefined): void {
        
    }

    override postResize(node: Node, resizeBounds: ResizeBounds): void {
        layout(node as Container);
    }
}

export function layout(sib : Container, ignore? : Node) {
        
    const width = sib.size.width;

    // const nodes = sib.containments.sort((a, b) => a.position.y - b.position.y);
    // parition into inputs, outputs and labels

    // Sort alphabetically by type, then numerically by y
    const nodes = sib.containments.sort((a, b) => {
        const result = a.type.replace('sib','').localeCompare(b.type.replace('sib',''));
        if (result !== 0) {
        return result; 
        }
        return a.position.y - b.position.y;
    });

    var delta = HEADER_HEIGHT

    for (let node of nodes) {
        // do not layout ignored slot
        if (node == ignore)
            continue;
        
        // make slot as wide as slottable
        node.size = {
            width: width,
            height: map[node.type]
        }

        // and put into correct position
        node.position = {
            x : 0,
            y : delta
        }

        delta += (map[node.type] + PADDING)
    }

    delta += FOOTER_HEIGHT

    sib.size = {
        width : width,
        height: delta
    }
}


LanguageFilesRegistry.register(AutomatedSibHook);



