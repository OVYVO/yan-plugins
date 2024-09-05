import { parse } from "@vue/compiler-sfc";
import { stringify } from "./serializer";
import type { SFCParseResult } from "@vue/compiler-sfc";

const travers = (node: any) => {
  if (!node.props.some((prop: any) => prop.name === "clearable")) {
    node.props.push({
      type: 6 /* ATTRIBUTE */,
      name: ":clearable",
      value: {
        type: 2 /* TEXT */,
        content: "true",
        loc: node.loc,
      },
      loc: node.loc,
    });
  }
};
export const gogo = () => {
  return {
    name: "vite-plugin-searchform-clear",
    enforce: "pre",
    transform(src, id) {
      if (!id.endsWith("App.vue")) return;
      const { descriptor } = parse(src);
      if (descriptor!.template!.type !== "template") return;
      function walkNode(nodeList = []) {
        if (!Array.isArray(nodeList)) return;
        nodeList.forEach((node: any) => {
          const { props = [] } = node;
          if (!props.length) return;
          const target: any =
            props.find((item: any) => item.name == "class") || {};
          const targetClass = target?.value?.content ?? "";
          if (node.type === 1 && node.tag.includes("el-")) {
            travers(node);
          }
          if (
            node.children &&
            node.children.length &&
            node.tagType == 0 &&
            targetClass == "action-box"
          ) {
            walkNode(node.children);
          }
        });
      }
      walkNode(descriptor?.template?.ast?.children as undefined);
      const code = stringify({ descriptor } as SFCParseResult);

      // 返回修改后的模板代码
      return {
        code,
        map: null, // 如果需要source map，这里需要正确处理
      };
    },
  };
};
