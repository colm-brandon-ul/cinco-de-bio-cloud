import { AppearanceProvider, Container, LanguageFilesRegistry, ModelElement } from '@cinco-glsp/cinco-glsp-api';
import {
    AbstractShape,
    Appearance,
    ApplyAppearanceUpdateAction,
    Color,
    Ellipse,
    Font,
    LineStyle,
    NodeStyle,
    Rectangle,
    AppearanceUpdateRequestAction,
    ContainerShape,
    Text,
} from '@cinco-glsp/cinco-glsp-common';

import {Node}  from '@cinco-glsp/cinco-glsp-api';


export class SibLibLabelApperanceProvider extends AppearanceProvider {


    getAppearance(
        action: AppearanceUpdateRequestAction,
        ...args: unknown[]
    ): ApplyAppearanceUpdateAction[] | Promise<ApplyAppearanceUpdateAction[]> {

        // parse action
        const modelElementId: string = action.modelElementId;
        let element = this.getElement(modelElementId);

        const message = 'Element [' + element.type + ', ' + modelElementId + '] is woohoo changing appearance.';
        this.log(message)
        // let labelNode = element as Node

        // if (labelNode.parent instanceof Container){

        // }

        // let sib = labelNode.parent as Container

        // if (labelNode.getProperty('name') != sib.getProperty('name')){
        //     labelNode.setProperty('name',sib.getProperty('name'))
        // }

        // if (labelNode.getProperty('label') != sib.getProperty('label')){
        //     labelNode.setProperty('label',sib.getProperty('label'))
        // }
        




        // return [];
       return [];
    }
}
// register into app
LanguageFilesRegistry.register(SibLibLabelApperanceProvider);
