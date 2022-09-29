```
pnpm install eslint eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser  --save-dev

npx eslint --init

```


renderToString

这个方法可以把模板元素转换成 HTML 字符串返回。它的底层和客户端模板编译其实是一样的，都是根据 AST （也就是虚拟 DOM ）来转化成真实 DOM 的过程，React 在它的基础上，提供了更多流相关的能力，返回了一套 server 相关的 api   
TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.

tsconfig.json
"jsx": "react-jsx", // 全局导入, 不再需要每个文件定义react
