//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script = {
  name: 'YcbViewLoading',
  props: {
    load: {
      type: Function,
      required: true,
      validator: val => {
        if (!Object.prototype.toString.call(val) === '[object Function]') {
          console.error('ViewStatus props load Must be Function');
          return false
        }
        return true
      }
    }
  },
  data() {
    return {
      status: 'loading'
    }
  },
  mounted() {
    this.handleLoad();
  },
  methods: {
    handleLoad() {
      if (!this.load || typeof this.load !== 'function') {
        return
      }

      const p = this.load();

      if (p && p.then) {
        p.then(() => {
          this.status = 'success';
        })
          .catch(e => {
            console.log(`YcbViewLoading err ${e}`);
            this.status = 'fail';
          });
      }
    },
    reload() {
      this.status = 'loading';
      this.handleLoad();
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "ycb-view-loading" },
    [
      _vm.status === "loading"
        ? [
            _vm.$scopedSlots.loading
              ? _vm._t("loading")
              : _c("div", { staticClass: "ycb-view-loading__loading" }, [
                  _c("span", { staticClass: "ycb-view-loading-spinner" }, [
                    _c(
                      "svg",
                      {
                        staticClass: "ycb-view-loading-circular",
                        attrs: { viewBox: "25 25 50 50" }
                      },
                      [
                        _c("circle", {
                          attrs: { cx: "50", cy: "50", r: "20", fill: "none" }
                        })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "ycb-view-loading-text" }, [
                    _vm._v("\n        加载中...\n      ")
                  ])
                ])
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.status === "success"
        ? [_vm._t("default"), _vm._v(" "), _c("div", { staticClass: "_empty" })]
        : _vm._e(),
      _vm._v(" "),
      _vm.status === "fail"
        ? [
            _vm.$scopedSlots.fail
              ? _vm._t("fail")
              : _c(
                  "div",
                  {
                    staticClass: "ycb-view-loading__fail",
                    on: { click: _vm.reload }
                  },
                  [_vm._v("\n      加载失败，点击重试。\n    ")]
                )
          ]
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-4f82fe17_0", { source: ".ycb-view-loading .ycb-view-loading__loading, .ycb-view-loading .ycb-view-loading__fail {\n  position: relative;\n  margin-top: 10px;\n  font-size: 12px;\n  line-height: 20px;\n  text-align: center;\n  z-index: 1;\n}\n.ycb-view-loading .ycb-view-loading__loading {\n  color: #c8c9cc;\n}\n.ycb-view-loading .ycb-view-loading-spinner {\n  position: relative;\n  display: inline-block;\n  width: 16px;\n  max-width: 100%;\n  height: 16px;\n  max-height: 100%;\n  vertical-align: middle;\n  animation: rotate 2s linear infinite;\n}\n.ycb-view-loading .ycb-view-loading-spinner .ycb-view-loading-circular {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.ycb-view-loading .ycb-view-loading-spinner .ycb-view-loading-circular circle {\n  animation: circular 1.5s ease-in-out infinite;\n  stroke: currentColor;\n  stroke-width: 3;\n  stroke-linecap: round;\n}\n.ycb-view-loading .ycb-view-loading-text {\n  display: inline-block;\n  margin-left: 8px;\n  vertical-align: middle;\n  color: #969799;\n}\n@keyframes rotate {\nfrom {\n    transform: rotate(0deg);\n}\nto {\n    transform: rotate(360deg);\n}\n}\n@keyframes circular {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 90, 150;\n    stroke-dashoffset: -40;\n}\n100% {\n    stroke-dasharray: 90, 150;\n    stroke-dashoffset: -120;\n}\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["D:\\@ycb\\vue-view-loading\\src\\ViewLoading\\index.vue","index.vue"],"names":[],"mappings":"AAmFA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,UAAA;AClFA;ADqFA;EACA,cAAA;ACnFA;ADsFA;EACA,kBAAA;EACA,qBAAA;EACA,WAAA;EACA,eAAA;EACA,YAAA;EACA,gBAAA;EACA,sBAAA;EACA,oCAAA;ACpFA;ADqFA;EACA,cAAA;EACA,WAAA;EACA,YAAA;ACnFA;ADqFA;EACA,6CAAA;EACA,oBAAA;EACA,eAAA;EACA,qBAAA;ACnFA;ADwFA;EACA,qBAAA;EACA,gBAAA;EACA,sBAAA;EACA,cAAA;ACtFA;ADyFA;AACA;IACA,uBAAA;ACvFE;AD0FF;IACA,yBAAA;ACxFE;AACF;AD0FA;AACA;IACA,wBAAA;IACA,oBAAA;ACxFE;AD2FF;IACA,yBAAA;IACA,sBAAA;ACzFE;AD4FF;IACA,yBAAA;IACA,uBAAA;AC1FE;AACF;;AAEA,oCAAoC","file":"index.vue","sourcesContent":["<template>\r\n  <div class=\"ycb-view-loading\">\r\n    <template v-if=\"status==='loading'\">\r\n      <slot v-if=\"$scopedSlots.loading\" name=\"loading\" />\r\n      <div v-else class=\"ycb-view-loading__loading\">\r\n        <span class=\"ycb-view-loading-spinner\">\r\n          <svg class=\"ycb-view-loading-circular\" viewBox=\"25 25 50 50\">\r\n            <circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" />\r\n          </svg>\r\n        </span>\r\n        <span class=\"ycb-view-loading-text\">\r\n          加载中...\r\n        </span>\r\n      </div>\r\n    </template>\r\n\r\n    <template v-if=\"status==='success'\">\r\n      <slot />\r\n      <div class=\"_empty\" />\r\n    </template>\r\n\r\n    <template v-if=\"status==='fail'\">\r\n      <slot v-if=\"$scopedSlots.fail\" name=\"fail\" />\r\n      <div v-else class=\"ycb-view-loading__fail\" @click=\"reload\">\r\n        加载失败，点击重试。\r\n      </div>\r\n    </template>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n\r\nexport default {\r\n  name: 'YcbViewLoading',\r\n  props: {\r\n    load: {\r\n      type: Function,\r\n      required: true,\r\n      validator: val => {\r\n        if (!Object.prototype.toString.call(val) === '[object Function]') {\r\n          console.error('ViewStatus props load Must be Function')\r\n          return false\r\n        }\r\n        return true\r\n      }\r\n    }\r\n  },\r\n  data() {\r\n    return {\r\n      status: 'loading'\r\n    }\r\n  },\r\n  mounted() {\r\n    this.handleLoad()\r\n  },\r\n  methods: {\r\n    handleLoad() {\r\n      if (!this.load || typeof this.load !== 'function') {\r\n        return\r\n      }\r\n\r\n      const p = this.load()\r\n\r\n      if (p && p.then) {\r\n        p.then(() => {\r\n          this.status = 'success'\r\n        })\r\n          .catch(e => {\r\n            console.log(`YcbViewLoading err ${e}`)\r\n            this.status = 'fail'\r\n          })\r\n      }\r\n    },\r\n    reload() {\r\n      this.status = 'loading'\r\n      this.handleLoad()\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.ycb-view-loading {\r\n  .ycb-view-loading__loading, .ycb-view-loading__fail {\r\n    position: relative;\r\n    margin-top: 10px;\r\n    font-size: 12px;\r\n    line-height: 20px;\r\n    text-align: center;\r\n    z-index: 1;\r\n  }\r\n\r\n  .ycb-view-loading__loading {\r\n    color: #c8c9cc;\r\n  }\r\n\r\n  .ycb-view-loading-spinner {\r\n    position: relative;\r\n    display: inline-block;\r\n    width: 16px;\r\n    max-width: 100%;\r\n    height: 16px;\r\n    max-height: 100%;\r\n    vertical-align: middle;\r\n    animation: rotate 2s linear infinite;\r\n    .ycb-view-loading-circular {\r\n      display: block;\r\n      width: 100%;\r\n      height: 100%;\r\n\r\n      circle {\r\n        animation: circular 1.5s ease-in-out infinite;\r\n        stroke: currentColor;\r\n        stroke-width: 3;\r\n        stroke-linecap: round;\r\n      }\r\n    }\r\n  }\r\n\r\n  .ycb-view-loading-text {\r\n    display: inline-block;\r\n    margin-left: 8px;\r\n    vertical-align: middle;\r\n    color: #969799;\r\n  }\r\n\r\n  @keyframes rotate {\r\n    from {\r\n      transform: rotate(0deg);\r\n    }\r\n\r\n    to {\r\n      transform: rotate(360deg);\r\n    }\r\n  }\r\n  @keyframes circular {\r\n    0% {\r\n      stroke-dasharray: 1, 200;\r\n      stroke-dashoffset: 0;\r\n    }\r\n\r\n    50% {\r\n      stroke-dasharray: 90, 150;\r\n      stroke-dashoffset: -40;\r\n    }\r\n\r\n    100% {\r\n      stroke-dasharray: 90, 150;\r\n      stroke-dashoffset: -120;\r\n    }\r\n  }\r\n}\r\n\r\n</style>\r\n\r\n",".ycb-view-loading .ycb-view-loading__loading, .ycb-view-loading .ycb-view-loading__fail {\n  position: relative;\n  margin-top: 10px;\n  font-size: 12px;\n  line-height: 20px;\n  text-align: center;\n  z-index: 1;\n}\n.ycb-view-loading .ycb-view-loading__loading {\n  color: #c8c9cc;\n}\n.ycb-view-loading .ycb-view-loading-spinner {\n  position: relative;\n  display: inline-block;\n  width: 16px;\n  max-width: 100%;\n  height: 16px;\n  max-height: 100%;\n  vertical-align: middle;\n  animation: rotate 2s linear infinite;\n}\n.ycb-view-loading .ycb-view-loading-spinner .ycb-view-loading-circular {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.ycb-view-loading .ycb-view-loading-spinner .ycb-view-loading-circular circle {\n  animation: circular 1.5s ease-in-out infinite;\n  stroke: currentColor;\n  stroke-width: 3;\n  stroke-linecap: round;\n}\n.ycb-view-loading .ycb-view-loading-text {\n  display: inline-block;\n  margin-left: 8px;\n  vertical-align: middle;\n  color: #969799;\n}\n@keyframes rotate {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes circular {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n  }\n  50% {\n    stroke-dasharray: 90, 150;\n    stroke-dashoffset: -40;\n  }\n  100% {\n    stroke-dasharray: 90, 150;\n    stroke-dashoffset: -120;\n  }\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    browser,
    undefined,
    undefined
  );

__vue_component__.install = function (Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
};

export { __vue_component__ as default };
