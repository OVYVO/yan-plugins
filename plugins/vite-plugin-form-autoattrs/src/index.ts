import MagicString from "magic-string";

export const searchFormClear = (
  options = {
    rules: [
      {
        components: ["el-input", "el-select", "el-date-picker"],
        attrs: ["clearable"],
      },
    ],
  }
) => {
  return {
    name: "vite-plugin-elformitem-autoattrs",
    enforce: "pre",
    transform(code: any, id: any) {
      if (!/views.*\.vue$/.test(id)) return;
      if (!code.includes("<el-form")) return;
      const s = new MagicString(code);
      for (const rule of options.rules) {
        const { components, attrs } = rule;
        const componentTags = components
          .map((tag) => tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
          .join("|");
        const inputRegex = new RegExp(`<(${componentTags})\\b[^>]*?\\/?>`, "g");
        let match: any;
        while ((match = inputRegex.exec(code)) !== null) {
          const tag = match[0];
          const tagStart = match.index;
          const tagEnd = match.index + tag.length;
          if (/no-autoattrs\b/.test(tag)) continue;
          attrs.forEach((attr) => {
            const attrName = attr.split("=")[0];
            if (!new RegExp(`${attrName}\\b`).test(tag)) {
              const isSelfClosing = /\/>/.test(tag);
              const insertIndex = isSelfClosing
                ? tag.lastIndexOf("/")
                : tag.length - 1;
              const newTag = [
                tag.slice(0, insertIndex),
                ` ${attr}`,
                tag.slice(insertIndex),
              ].join("");
              s.overwrite(tagStart, tagEnd, newTag);
            }
          });
        }
      }
      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: s.generateMap({ hires: true, source: id }),
        };
      }
    },
  };
};
