# 工具

# 1. 微前端框架：qiankun/wujie对比

- ## qiankun框架
基于single-spa封装，使用HTML Entry作为加载子应用的方式
沙箱机制：
    - 默认Proxy沙箱机制
        > 通过Proxy代理全局window对象，每个子应用激活时，拥有一个独立的window代理对象
        > 优点：性能好，有效隔离全局变量与函数
        > 缺点：兼容性差
    - SnapShot沙箱机制
        > 通过快照的方式，在子应用激活时，对当前window对象进行快照，在子应用卸载时，将window对象恢复到快照状态
        > 优点：兼容性好
        > 缺点：性能差，需要频繁的快照与恢复
    - Legacy沙箱机制
        > 通过iframe的方式，每个子应用激活时，创建一个iframe，将子应用加载到iframe中
        > 优点：兼容性好，性能好
        > 缺点：需要频繁的创建与销毁iframe，对主应用性能有一定影响
    - Shadow DOM沙箱机制
        > 通过Shadow DOM的方式，每个子应用激活时，创建一个Shadow DOM，将子应用加载到Shadow DOM中
        > 优点：兼容性好，性能好
        > 缺点：需要频繁的创建与销毁Shadow DOM，对主应用性能有一定影响

样式隔离：
    - CSS Module
        > 通过CSS Module的方式，每个子应用激活时，创建一个CSS Module，将子应用样式加载到CSS Module中
        > 优点：兼容性好，性能好
        > 缺点：需要频繁的创建与销毁CSS Module，对主应用性能有一定影响

    - Css-in-js
        > 通过Css-in-js的方式，每个子应用激活时，创建一个Css-in-js，将子应用样式加载到Css-in-js中
        > 优点：兼容性好，性能好
        > 缺点：需要频繁的创建与销毁Css-in-js，对主应用性能有一定影响

    - 动态创建样式前缀
        > 通过动态创建样式前缀的方式，每个子应用激活时，创建一个样式前缀，将子应用样式加载到样式前缀中
        > 优点：兼容性好，性能好
        > 缺点：需要频繁的创建与销毁样式前缀，对主应用性能有一定影响

可以使用loadMicroApp加载子应用
- ## wujie框架
基于Web Component和iframe的方式实现
将子应用的JS在主应用的iframe中加载，实现JS隔离，子应用实例instance，DOM使用web component添加到主应用容器内，通过代理iframe的document到web component，可以实现两者互联
子应用保留iframe和Web component，应用内的state保留，从而实现应用保活。

通信机制：
    - props
    - window.parent
    - event bus

路由同步
    劫持iframe的pushState和replaceState，将子应用的URL同步到主应用的query中，当刷新浏览器初始化iframe时，读回子应用的url并使用iframe的history.replaceState同步




