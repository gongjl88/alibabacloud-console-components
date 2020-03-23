(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{"2ubk":function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return i})),t.d(n,"_demoSrcFiles",(function(){return c}));var o=t("mXGw"),a=t.n(o),r=t("BgHK");t("x5/J");var s=r.Grid.Row,l=r.Grid.Col,i=function(e){var n,t;function o(n){var t;return(t=e.call(this,n)||this).state={gutter:0},t.handleChange=t.handleChange.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}t=e,(n=o).prototype=Object.create(t.prototype),n.prototype.constructor=n,n.__proto__=t;var i=o.prototype;return i.handleChange=function(e){this.setState({gutter:e})},i.render=function(){var e=this.state.gutter;return a.a.createElement("div",{className:"gutter-demo"},a.a.createElement(r.Range,{value:e,onChange:this.handleChange,marks:4,step:4,max:16,hasTip:!1,style:{width:"400px",marginLeft:"20px",marginTop:"30px"}}),a.a.createElement(s,{gutter:e},a.a.createElement(l,{span:"6"},a.a.createElement("div",{className:"demo-col-inset"},"col-6")),a.a.createElement(l,{span:"6"},a.a.createElement("div",{className:"demo-col-inset"},"col-6")),a.a.createElement(l,{span:"6"},a.a.createElement("div",{className:"demo-col-inset"},"col-6")),a.a.createElement(l,{span:"6"},a.a.createElement("div",{className:"demo-col-inset"},"col-6"))))},o}(a.a.Component),c={"index.html":'<!DOCTYPE html>\n<html>\n  <head>\n    <title>Parcel Sandbox</title>\n    <meta charset="UTF-8" />\n  </head>\n\n  <body>\n    <div id="app"></div>\n\n    <script src="src/index.jsx"><\/script>\n  </body>\n</html>\n',".babelrc":'{\n  "presets": ["env"],\n  "plugins": [\n    "transform-runtime",\n    [\n      "transform-react-jsx",\n      {\n        "pragma": "React.createElement"\n      }\n    ],\n    "@babel/plugin-proposal-class-properties"\n  ],\n  "parserOpts": {\n    "plugins": ["dynamicImport"]\n  }\n}\n',"package.json":'{\n  "name": "parcel-sandbox",\n  "version": "1.0.0",\n  "description": "Simple Parcel Sandbox",\n  "main": "index.html",\n  "scripts": {\n    "start": "parcel index.html --open",\n    "build": "parcel build index.html"\n  },\n  "dependencies": {\n    "react": "16.8.6",\n    "react-dom": "16.8.6",\n    "@alicloud/console-components": "latest",\n    "styled-components": "^4.2.0",\n    "moment": "^2.21.0",\n    "react-copy-to-clipboard": "^5.0.1",\n    "react-dnd": "^8.0.0",\n    "react-dnd-html5-backend": "^8.0.0"\n  },\n  "devDependencies": {\n    "@babel/core": "7.2.0",\n    "parcel-bundler": "^1.6.1",\n    "typescript": "^3.7.2",\n    "@types/styled-components": "^4.1.8",\n    "@types/react": "16.8.8",\n    "@types/react-dom": "16.8.2"\n  }\n}\n',"sandbox.config.json":'{\n  "infiniteLoopProtection": true,\n  "hardReloadOnChange": false,\n  "view": "browser"\n}',"src/index.jsx":'import * as React from "react";\nimport { render } from "react-dom";\nimport "@alicloud/console-components/dist/wind.css";\nimport App from "./demo/demo3";\nimport "./styles.less";\n\nconst rootElement = document.getElementById("app");\nrender(<App />, rootElement);\n',"src/styles.less":"","src/demo/demo3.js":'import React from \'react\'\nimport { Range, Grid } from \'@alicloud/console-components\'\nimport \'./demo3.less\'\n\nconst { Row, Col } = Grid\n\nexport default class Demo extends React.Component {\n  constructor(props) {\n    super(props)\n    this.state = {\n      gutter: 0\n    }\n    this.handleChange = this.handleChange.bind(this)\n  }\n\n  handleChange(gutter) {\n    this.setState({\n       gutter\n    })\n  }\n\n  render() {\n    const { gutter } = this.state;\n\n    return (\n      <div className="gutter-demo">\n        <Range value={gutter} onChange={this.handleChange} marks={4} step={4} max={16} hasTip={false} style={{ width: \'400px\', marginLeft: \'20px\', marginTop: \'30px\' }} />\n        <Row gutter={gutter}>\n          <Col span="6"><div className="demo-col-inset">col-6</div></Col>\n          <Col span="6"><div className="demo-col-inset">col-6</div></Col>\n          <Col span="6"><div className="demo-col-inset">col-6</div></Col>\n          <Col span="6"><div className="demo-col-inset">col-6</div></Col>\n        </Row>\n      </div>\n    )\n  }\n}\n\n\n',"src/demo/demo3.less":".gutter-demo .demo-title {\n    margin-left: 20px;\n}\n\n.gutter-demo .next-row {\n    margin: 10px 0;\n}\n\n.gutter-demo .demo-col-inset {\n    border:1px solid #CCC;\n    border-radius: 3px;\n    background-color:#ECECEC;\n    height: 30px;\n    line-height: 30px;\n    text-align: center;\n}","demoMeta.json":'{"entryPath":"src/demo/demo3.js"}'}}}]);
//# sourceMappingURL=131-1659e9ba8bc93e2a3a43.js.map