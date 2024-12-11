import autoAnimate from '@formkit/auto-animate'
import {
  FormKitNode,
  FormKitSchemaComponent,
  FormKitPlugin,
  isDOM,
  isComponent,
  FormKitSchemaDOMNode
} from '@formkit/core'
import { eachSection } from '@formkit/inputs'

const pendingIds: Map<string, any | undefined> = new Map()
const optionOverrides = new Map<string, any | undefined>()

let autoAnimateOptionsId = 0

let observer: MutationObserver | null = null
let observerTimeout: ReturnType<typeof setTimeout> | number = 0

/**
 * Create a new mutation observer that checks for the document for ids. We do
 * this instead of iterating over the mutations because getElementById is by far
 * the fastest way check for an element in the DOM, much faster that iterating
 * over the mutations themselves.
 */
function createObserver() {
  observeIds()
  observer = new MutationObserver(() => {
    observeIds()
    if (!pendingIds.size && observer) {
      observer.disconnect()
      observer = null
    }
  })
  observer.observe(document, { childList: true, subtree: true })
}

function observeIds() {
  pendingIds.forEach((options, id) => {
    const outer = document.getElementById(id)
    if (outer) {
      clearTimeout(observerTimeout)
      pendingIds.delete(id)
      observerTimeout = setTimeout(() => {
        const targets = document.querySelectorAll('[data-auto-animate]')
        targets.forEach((target) => {
          // get the value of data-auto-animate
          let overrideOptions: any | undefined
          const optionsId = target.getAttribute('data-auto-animate')
          if (optionsId) {
            overrideOptions = optionOverrides.get(optionsId)
          }
          autoAnimate(target as HTMLElement, overrideOptions || options || {})
        })
      }, 250)
    }
  })
}


export function createAutoAnimatePlugin(
  options?: any,
  animationTargets: Record<string, string[]> = {}
): FormKitPlugin {
  return (node: FormKitNode) => {
    node.on('created', () => {
      if (typeof node.props.definition?.schema === 'function') {
        if (typeof window === undefined) return

        // make a copy of the original schema
        const originalSchema = node.props.definition.schema

        // add an outer wrapper id or get the current one
        node.props.definition.schema = (extensions) => {
          const schema = originalSchema(extensions)
          const finalSchema = Array.isArray(schema) ? schema[0] : schema

          eachSection(
            finalSchema,
            (section: FormKitSchemaComponent | FormKitSchemaDOMNode) => {
              if (isDOM(section) || isComponent(section)) {
                let isAnimationTarget = false
                const sectionName = section?.meta?.section
                let instanceId: boolean | string = true

                // If we have explicit autoAnimate meta set, use that
                if (section?.meta?.autoAnimate) {
                  isAnimationTarget = true

                  if (typeof section.meta.autoAnimate === 'object') {
                    const newOptions = Object.assign(
                      {},
                      options,
                      section.meta.autoAnimate
                    )
                    instanceId = `${node.props.id}-${autoAnimateOptionsId++}`
                    optionOverrides.set(instanceId, newOptions)
                  }
                }

                // if didn't have meta but we have a section name, check if it's a known animation target
                if (
                  !isAnimationTarget &&
                  sectionName &&
                  typeof sectionName === 'string'
                ) {
                  if (
                    animationTargets.global?.includes(sectionName) ||
                    animationTargets[node.props.type]?.includes(sectionName)
                  ) {
                    isAnimationTarget = true
                  }
                }

                // bail if we we're not a match
                if (!isAnimationTarget) return

                // add the auto-animate attribute which our observer will pick up
                if (isDOM(section)) {
                  if (!section?.attrs) {
                    section.attrs = { 'data-auto-animate': instanceId }
                  } else {
                    Object.assign(section.attrs, {
                      'data-auto-animate': instanceId,
                    })
                  }
                } else {
                  if (!section?.props) {
                    section.props = { 'data-auto-animate': instanceId }
                  } else {
                    Object.assign(section.props, {
                      'data-auto-animate': instanceId,
                    })
                  }
                }

                // add the node id to the pending list
                if (node.props.id) {
                  pendingIds.set(node.props.id, options)
                }
              }
            }
          )
          return finalSchema
        }
      }
      if (!observer && typeof window !== 'undefined') createObserver()
    })
  }
}
