import { FormKitNode, FormKitPlugin } from '@formkit/core'
import { normalizeOptions } from '@formkit/inputs'
import { nextTick } from 'vue';

export function createOptionsLoaderPlugin(
  optionsLoaderOptions?: any
): FormKitPlugin {
  const optionsLoaderPlugin = (node: FormKitNode) => {
    node.on("created", () => {
      if (node.context && node.context?.optionsLoader) {
        if (typeof node.context?.optionsLoader !== "function") {
          console.warn('optionsLoader必须为函数')
          return
        }

        const depIds = (node.context?.optionsDepIds as string[]) || []
        const loader = node.context?.optionsLoader as Function;

        const loadOptions = async (param: Record<string, any>) => {
          try {
            if (node.context) {
              node.context.attrs.loading = true
              const options = await loader(param)
              node.context.attrs.loading = false
              node.context.options = options
            }
          } catch (error) {
            if (node.context) {
              node.context!.options = []
            }
          }

        }

        nextTick(() => {
          const depNodes: Array<FormKitNode | undefined> = depIds.map(node.at)
          depNodes.forEach(dNode => {
            if (dNode) {
              dNode.on('commit', () => {
                loadOptions(
                  depNodes.reduce((prev, dNode) => {
                    if (dNode) prev[dNode.name] = dNode?.value;
                    return prev
                  }, {})
                )
              })
            }
          })
          loadOptions(
            depNodes.reduce((prev, dNode) => {
              if (dNode) prev[dNode.name] = dNode?.value;
              return prev
            }, {})
          )
        })

      }
    })
  }
  return optionsLoaderPlugin
}