
import { Component, markRaw } from 'vue'
import FormItem from './FormItem.vue';
import { FormKitTypeDefinition, FormKitSchemaNode } from '@formkit/core';
import { createSection, FormKitSection } from '@formkit/inputs';

function isComponent(obj: any): obj is Component {
    return (
        (typeof obj === 'function' && obj.length === 2) ||
        (typeof obj === 'object' &&
            !Array.isArray(obj) &&
            !('$el' in obj) &&
            !('$cmp' in obj) &&
            !('if' in obj))
    )
}

let totalCreated = 1
export default (schemaOrComponent: FormKitSchemaNode | FormKitSection | Component, definitionOptions?: Partial<FormKitTypeDefinition>): FormKitTypeDefinition => {
    const definition: FormKitTypeDefinition = {
        type: 'input',
        props: ["labelWidth", "labelPosition", ...definitionOptions?.props ?? []],
        features: definitionOptions?.features ?? [],
        schemaMemoKey: `${Math.random()}`
    }


    const FormItemSection = createSection('FormItem', () => ({
        $cmp: 'FormItem',
        props: {
            context: '$node.context',
        },
    }))

    let inputSection: FormKitSection
    if (isComponent(schemaOrComponent)) {
        const cmpName = `CustomSchemaComponent${totalCreated++}`
        inputSection = createSection('input', () => ({
            $cmp: cmpName,
            props: {
                context: '$node.context',
            },
        }))
        definition.library = { [cmpName]: markRaw(schemaOrComponent), FormItem }
        definition.schema = FormItemSection(inputSection())
    } else if (typeof schemaOrComponent === 'function') {
        inputSection = schemaOrComponent
        definition.library = { FormItem }
        definition.schema = FormItemSection(inputSection())
    } else {
        definition.library = { FormItem }
        inputSection = createSection('input', () => schemaOrComponent)
    }
    definition.schema = FormItemSection(inputSection())

    return definition
};