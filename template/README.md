#### webpack & react模板

```

npm i react react-dom  -s
npm i webpack webpack-cli webpack-dev-server webpack-merge html-webpack-plugin mini-css-extract-plugin copy-webpack-plugin clean-webpack-plugin -D
npm i @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D
npm i style-loader sass-loader postcss-loader file-loader css-loader babel-loader -D
npm i cross-env -D
```
babel-loader：使用 Babel 和 webpack 来转译 JavaScript 文件。
@babel/core：babel 的核心模块
@babel/preset-env：转译 ES2015+的语法
@babel/preset-react：转译 react 的 JSX
@babel/plugin-proposal-class-properties：用来编译类(class)
@babel/plugin-transform-runtime：防止污染全局，代码复用和减少打包体积
