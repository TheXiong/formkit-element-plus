import { FormKitNode, FormKitPlugin } from "@formkit/core";

export function createDuplicatePropPlugin(
    options?: any
): FormKitPlugin {
    const duplicatePropPlugin = (node: FormKitNode) => {
        node.on("created", ()=>{
            if(node.context && node.context?.attrs) {
                const duplicatePropKeys = Object.keys(node.context?.attrs).filter(ele=>ele.startsWith('$$'));

                duplicatePropKeys.forEach(key => {
                    node.context!.attrs[key.replace('$$', '')] = node.context!.attrs[key]
                })
            }
        })
    }
    return duplicatePropPlugin
}