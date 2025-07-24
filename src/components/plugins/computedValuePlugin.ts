import { FormKitNode, FormKitPlugin } from "@formkit/core";

export function createComputedValuePlugin(): FormKitPlugin {
  const computedValuePlugin = (node: FormKitNode) => {
    // Dont run this for groups/lists:
    // if (node.type !== 'input') return

    // Add our special prop to make it reactive
    node.addProps(["computedValue"]);

    node.on("prop:computedValue", ({ payload }) => {
      // if the prop `computedValue` changes, set that as the
      // value of the input.
      node.input(payload);
    });

    node.on("mounted", () => {
      // If the intitial value is not the same as the computed one,
      // then set it.
      if (typeof node.props.computedValue !== "undefined" && !node._value) {
        node.input(node.props.computedValue);
      }
    });
  };
  return computedValuePlugin;
}
