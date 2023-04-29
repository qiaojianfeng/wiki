---
title: vue-router源码了解一下
date: 2020-01-14 18:02:34
---

突然今天想了想，你自己天天用的 `vue-router` 到底是个啥？这个插件实现的方案是什么？

<!-- more -->

> 以前开发没有前后端分离，前端只做 UI 然后拿去服务器端去做模板渲染，路由这个概念也就是从后台过来的，简单来说就是定位页面 URL 用的，现在分离开发比较流行 单页应用（SPA），大型单页应用最显著特点之一就是采用前端路由系统，通过改变 URL，在不重新请求页面的情况下，更新页面视图。

# 路由模式

目前浏览器中可以实现这种功能的大概有两种方法

- `hash` 利用 `URL` 中的 hash（“#”）
- `histroy` 利用 `History interface` 在 `HTML5` 中新增的方法

下面我们找到 `vue-router` 源码看看具体他是用的什么方案

源码地址：`https://github.com/vuejs/vue-router/blob/dev/src/index.js`

```js
export default class VueRouter {
  static install: () => void;
  static version: string;

  app: any;
  apps: Array<any>;
  ready: boolean;
  readyCbs: Array<Function>;
  options: RouterOptions;
  mode: string;
  history: HashHistory | HTML5History | AbstractHistory;
  matcher: Matcher;
  fallback: boolean;
  beforeHooks: Array<?NavigationGuard>;
  resolveHooks: Array<?NavigationGuard>;
  afterHooks: Array<?AfterNavigationHook>;

  constructor (options: RouterOptions = {}) {
    // ... 省略部分
    let mode = options.mode || 'hash'
    this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) {
      mode = 'hash'
    }
    // 如浏览器不支持，'history'模式需回滚为'hash'模式
    if (!inBrowser) {
      mode = 'abstract'
      // 不在浏览器环境下运行需强制为'abstract'模式
    }
    this.mode = mode

    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }
```

上面 👆 我 copy 了一部分源码看下，我们知道在使用过程中实例化 `vue-router` 的时候会去传入 `mode`这项，这就设置是否采用哪种方案，源码中很清楚的可以看到默认开启的是`hash`模式，而在非浏览器模式（node）中采用的是`abstract`模式,一般也就是 `ssr` 渲染方案,

# HashHistory

这个方法其实核心就是用到了`URL`中类似 `http://example.com#index`这样的方式去控制页面位置，我们看下具体 `vue-router` 具体源码

```js
push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  this.transitionTo(location, route => {
    pushHash(route.fullPath)
    onComplete && onComplete(route)
  }, onAbort)
}

function pushHash (path) {
  window.location.hash = path
}
replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  this.transitionTo(location, route => {
    replaceHash(route.fullPath)
    onComplete && onComplete(route)
  }, onAbort)
}

function replaceHash (path) {
  const i = window.location.href.indexOf('#')
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  )
}

//注册路由监听事件
 setupListeners () {
    const router = this.router
    const expectScroll = router.options.scrollBehavior
    const supportsScroll = supportsPushState && expectScroll

    if (supportsScroll) {
      setupScroll()
    }

    window.addEventListener(
      supportsPushState ? 'popstate' : 'hashchange',
      () => {
        const current = this.current
        if (!ensureSlash()) {
          return
        }
        this.transitionTo(getHash(), route => {
          if (supportsScroll) {
            handleScroll(this.router, route, current, true)
          }
          if (!supportsPushState) {
            replaceHash(route.fullPath)
          }
        })
      }
    )
  }
```

通过摘录的部分 `HashHistory` 方法可以看到就是通过修改 `href` 去操作的，路由监听是通过`popstate` or `hashchange`'

# HTML5History

`History interface` 是浏览器历史记录栈提供的接口，通过 back(), forward(), go()等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作。

从 HTML5 开始，`History interface` 有进一步修炼：pushState(), replaceState() 这下不仅是读取了，还可以对浏览器历史记录栈进行修改：

- stateObject: 当浏览器跳转到新的状态时，将触发 popState 事件，该事件将携带这个 stateObject 参数的副本
- title: 所添加记录的标题
- URL: 所添加记录的 URL

上面几句是我抄来的 `history` 概念，看了看我想那么 `vue-router` 中 `history` 八成也是这个原理了，废话不多说看源码

```js
export class HTML5History extends History {
  constructor (router: Router, base: ?string) {
    super(router, base)

    const expectScroll = router.options.scrollBehavior
    const supportsScroll = supportsPushState && expectScroll

    if (supportsScroll) {
      setupScroll()
    }

    const initLocation = getLocation(this.base)
    // 通过popstate页面地址变化
    window.addEventListener('popstate', e => {
      const current = this.current

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      const location = getLocation(this.base)
      if (this.current === START && location === initLocation) {
        return
      }

      this.transitionTo(location, route => {
        if (supportsScroll) {
          handleScroll(router, route, current, true)
        }
      })
    })
  }

  go (n: number) {
    window.history.go(n)
  }

  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(location, route => {
      pushState(cleanPath(this.base + route.fullPath))
      handleScroll(this.router, route, fromRoute, false)
      onComplete && onComplete(route)
    }, onAbort)
  }

  replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(location, route => {
      replaceState(cleanPath(this.base + route.fullPath))
      handleScroll(this.router, route, fromRoute, false)
      onComplete && onComplete(route)
    }, onAbort)
  }
```

跟预想的一样没有什么黑科技就是通过 `popstate` `pushState` `replaceState` 这些方法操作的页面地址

# 视图更新

上面提到的俩种方法是用来改版页面地址然后去定位视图，那么如何去定位视图？我们看到了一个`this.transitionTo`方法，不用猜也知道就是用来定位视图的啊，顺藤摸瓜看源码!

```js
History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;
  var route = this.router.match(location, this.current);
  this.confirmTransition(
    route,
    function () {
      this$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1.ensureURL();
      // fire ready cbs once
      if (!this$1.ready) {
        this$1.ready = true;
        this$1.readyCbs.forEach(function (cb) {
          cb(route);
        });
      }
    },
    function (err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1.ready) {
        this$1.ready = true;
        this$1.readyErrorCbs.forEach(function (cb) {
          cb(err);
        });
      }
    }
  );
};
History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};
History.prototype.listen = function listen(cb) {
  this.cb = cb;
};
```

可以看到，当路由变化时，调用了 `History` 中的`this.cb`方法，而 `this.cb` 方法是通过 `History.listen(cb)`进行设置的。回到 `VueRouter` 类定义中，找到了在 `init()`方法中对其进行了设置：

```js
init (app: any /* Vue component instance */) {
  this.apps.push(app)
  history.listen(route => {
    this.apps.forEach((app) => {
      app._route = route
    })
  })
}

```

根据注释，`app` 为 `Vue` 组件实例，但我们知道 `Vue` 作为渐进式的前端框架，本身的组件定义中应该是没有有关路由内置属性`_route`，如果组件中要有这个属性，应该是在插件加载的地方，即 `VueRouter` 的 `install()`方法中混合入 `Vue` 对象的，查看 `install.js` 源码，有如下一段：

```js
export function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (isDef(this.$options.router)) {
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      }
      registerInstance(this, this);
    },
  });
}
```

通过 `Vue.mixin()`方法，全局注册一个混合，影响注册之后所有创建的每个 `Vue` 实例，该混合在 `beforeCreate` 钩子中通过 `Vue.util.defineReactive()`定义了响应式的 `_route` 属性。所谓响应式属性，即当 `_route` 值改变时，会自动调用 `Vue` 实例的 `render()`方法，更新视图。

总结一下，从设置路由改变到视图更新的流程如下：
`$router.push() -->`
`HashHistory.push() -->`
`History.transitionTo() -->`
`History.updateRoute() -->`
`{app._route = route} --> vm.render()`

# 两种模式比较

> 在一般的需求场景中，hash 模式与 history 模式是差不多的，但几乎所有的文章都推荐使用 history 模式，理由竟然是："#" 符号太丑...0_0 "

如果不想要很丑的 hash，我们可以用路由的 history 模式 ——官方文档

当然，严谨的我们肯定不应该用颜值评价技术的好坏。根据 MDN 的介绍，调用 `history.pushState()`相比于直接修改 `hash` 主要有以下优势：

- `pushState` 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改#后面的部分，故只可设置与当前同文档的 URL
- `pushState` 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发记录添加到栈中
- `pushState` 通过 `stateObject` 可以添加任意类型的数据到记录中；而 hash 只可添加短字符串
- `pushState` 可额外设置 `title` 属性供后续使用
