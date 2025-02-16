import{_ as n,c as a,o as s,a3 as i}from"./chunks/framework.Dcugq_a2.js";const e="/assets/Stage-model.CT3s3_MU.png",y=JSON.parse('{"title":"Harmony OS","description":"","frontmatter":{},"headers":[],"relativePath":"web2/harmony/index.md","filePath":"web2/harmony/index.md"}'),p={name:"web2/harmony/index.md"},t=i('<h1 id="harmony-os" tabindex="-1">Harmony OS <a class="header-anchor" href="#harmony-os" aria-label="Permalink to &quot;Harmony OS&quot;">​</a></h1><h2 id="arkts" tabindex="-1">ArkTS <a class="header-anchor" href="#arkts" aria-label="Permalink to &quot;ArkTS&quot;">​</a></h2><ul><li><h2 id="低开销运行时-通过严格限制typescript的动态类型-减少了运行时的开销-提升效率。" tabindex="-1">低开销运行时：通过严格限制TypeScript的动态类型，减少了运行时的开销，提升效率。 <a class="header-anchor" href="#低开销运行时-通过严格限制typescript的动态类型-减少了运行时的开销-提升效率。" aria-label="Permalink to &quot;低开销运行时：通过严格限制TypeScript的动态类型，减少了运行时的开销，提升效率。&quot;">​</a></h2></li></ul><h2 id="stage模型" tabindex="-1">Stage模型 <a class="header-anchor" href="#stage模型" aria-label="Permalink to &quot;Stage模型&quot;">​</a></h2><p><img src="'+e+`" alt="stage-model"></p><p>AbilityStage</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>每一个Entry类型或者Feature类型的HAP在运行期间都有一个AbilityStage类实例，当HAP被首次加载到进程中，系统就会创建AbilityStage的实例</p></div><p>UIAbility和ExtensionAbility</p><div class="info custom-block"><p class="custom-block-title">INFO</p><ul><li><p>UIAbility组件是一种包含UI的应用组件，主要用于和用户交互。</p><ul><li>系统调度的基本单元</li><li>一个应用可以包含一个或者多个UIAbility</li><li>生命周期： <ul><li><p>onCreate:页面初始化：变量定义、资源加载</p><div class="language-ets vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ets</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { AbilityConstant, UIAbility, Want } from &#39;@kit.AbilityKit&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default class EntryAbility extends UIAbility {</span></span>
<span class="line"><span>    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam){</span></span>
<span class="line"><span>        // want是消息传递的载体</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div></li><li><p>onWindowStageCreate:创建WindowStage后的回调，可以进行设置UI加载，WindowStage的事件订阅</p><div class="language-ets vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ets</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { UIAbility } from &#39;@kit.AbilityKit&#39;;</span></span>
<span class="line"><span>import { window } from &#39;@kit.ArkUI&#39;;</span></span>
<span class="line"><span>import { hilog } from &#39;@kit.PerformanceAnalysisKit&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const TAG: string = &#39;[EntryAbility]&#39;;</span></span>
<span class="line"><span>const DOMAIN_NUMBER: number = 0xFF00;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default class EntryAbility extends UIAbility {</span></span>
<span class="line"><span>// ...</span></span>
<span class="line"><span>onWindowStageCreate(windowStage: window.WindowStage): void {</span></span>
<span class="line"><span>    // 设置WindowStage的事件订阅（获焦/失焦、可见/不可见）</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>    windowStage.on(&#39;windowStageEvent&#39;, (data) =&gt; {</span></span>
<span class="line"><span>        let stageEventType: window.WindowStageEventType = data;</span></span>
<span class="line"><span>        switch (stageEventType) {</span></span>
<span class="line"><span>        case window.WindowStageEventType.SHOWN: // 切到前台</span></span>
<span class="line"><span>            hilog.info(DOMAIN_NUMBER, TAG, &#39;windowStage foreground.&#39;);</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        case window.WindowStageEventType.ACTIVE: // 获焦状态</span></span>
<span class="line"><span>            hilog.info(DOMAIN_NUMBER, TAG, &#39;windowStage active.&#39;);</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        case window.WindowStageEventType.INACTIVE: // 失焦状态</span></span>
<span class="line"><span>            hilog.info(DOMAIN_NUMBER, TAG, &#39;windowStage inactive.&#39;);</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        case window.WindowStageEventType.HIDDEN: // 切到后台</span></span>
<span class="line"><span>            hilog.info(DOMAIN_NUMBER, TAG, &#39;windowStage background.&#39;);</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    } catch (exception) {</span></span>
<span class="line"><span>    hilog.error(DOMAIN_NUMBER, TAG, &#39;Failed to enable the listener for window stage event changes. Cause:&#39; + JSON.stringify(exception));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    hilog.info(DOMAIN_NUMBER, TAG, &#39;%{public}s&#39;, &#39;Ability onWindowStageCreate&#39;);</span></span>
<span class="line"><span>    // 设置UI加载</span></span>
<span class="line"><span>    windowStage.loadContent(&#39;pages/Index&#39;, (err, data) =&gt; {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>}</span></span></code></pre></div></li><li><p>onForeGround：UIAbility切换至前台时触发。可以在onForeground()回调中申请系统需要的资源，或者重新申请在onBackground()中释放的资源。</p></li><li><p>onBackGround:UIAbility切换至后台时候触发。可以在onBackground()回调中释放UI不可见时无用的资源，或者在此回调中执行较为耗时的操作，例如状态保存等。</p></li><li><p>onNewWant:非首次加载再次调用该UIAbility实例，会触发此回调，不会触发onCreate\\onWindowStageCreate</p></li><li><p>onDestroy:系统资源的释放、数据的保存等操作。</p></li></ul></li><li>模式：配置module.json5中的launchType <ul><li>单实例模式 singleton：默认启动模式</li><li>多实例模式 multiton：</li><li>指定实例模式 specified</li></ul></li><li>通过startAbility启动指定的UIAbility</li><li>通过terminateSelf来停止当前的UIAbility<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>调用terminateSelf()方法停止当前UIAbility实例时，默认会保留该实例的快照（Snapshot），即在最近任务列表中仍然能查看到该实例对应的任务。如不需要保留该实例的快照，可以在其对应UIAbility的module.json5配置文件中，将abilities标签的removeMissionAfterTerminate字段配置为true。</p></div></li><li>如需要关闭应用所有的UIAbility实例，可以调用ApplicationContext的killAllProcesses()方法实现关闭应用所有的进程。</li></ul></li><li><p>ExtensionAbility是一种面向特定场景的应用组件。不直接从ExtensionAbility派生，而是使用ExtensionAbility的派生类。</p><ul><li>卡片场景的FormExtensionAbility</li><li>输入法场景的InputMethodExtensionAbility</li><li>闲时任务场景的WorkerSchedulerExtensionAbility</li></ul></li></ul></div><p>WindowStage</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>每个UIAbility都会与一个WindowStage类实例绑定，该类起到了进程中窗口管理器的作用。UIAbility通过WindowStage持有了一个主窗口，主窗口是ArkUI的绘制区域</p></div><p>Context</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>在Stage模型上，Context及其派生类向开发者提供在运行期可以调用的各种资源和能力。UIAbility组件和各种ExtensionAbility组件的派生类都有各自不同的Context类，他们都继承自基类Context，但是各自又根据所属组件，提供不同的能力。</p></div><h2 id="状态管理" tabindex="-1">状态管理 <a class="header-anchor" href="#状态管理" aria-label="Permalink to &quot;状态管理&quot;">​</a></h2><p>鸿蒙通过修饰符来管理状态 @State：@State装饰的变量拥有其所属组件的状态，可以作为其子组件单向和双向同步的数据源。当其数值改变时，会引起相关组件的渲染刷新。 @Prop：@Prop装饰的变量可以和父组件建立单向同步关系，@Prop装饰的变量是可变的，但修改不会同步回父组件。 @Link：@Link装饰的变量可以和父组件建立双向同步关系，子组件中@Link装饰变量的修改会同步给父组件中建立双向数据绑定的数据源，父组件的更新也会同步给@Link装饰的变量。 @Provide/@Consume: @Provide/@Consume装饰的变量用于跨组件层级（多层组件）同步状态变量，可以不需要通过参数命名机制传递，通过alias（别名）或者属性名绑定。 @Observed:@Observed装饰class，需要观察多层嵌套场景的class需要被@Observed装饰。单独使用@Observed没有任何作用，需要和@ObjectLink、@Prop联用。 @ObjectLink:@ObjectLink装饰的变量接收@Observed装饰的class的实例，应用于观察多层嵌套场景，和父组件的数据源构建双向同步。 @Watch用于监听状态变量的变化。</p><p>$$运算符：给内置组件提供TS变量的引用，使得TS变量和内置组件的内部状态保持同步。</p><p>AppStorage是应用程序中的一个特殊的单例LocalStorage对象，是应用级的数据库，和进程绑定，通过@StorageProp和@StorageLink装饰器可以和组件联动。</p><p>AppStorage是应用状态的“中枢”，将需要与组件（UI）交互的数据存入AppStorage，比如持久化数据PersistentStorage和环境变量Environment。UI再通过AppStorage提供的装饰器或者API接口，访问这些数据。</p><p>框架还提供了LocalStorage，AppStorage是LocalStorage特殊的单例。LocalStorage是应用程序声明的应用状态的内存“数据库”，通常用于页面级的状态共享，通过@LocalStorageProp和@LocalStorageLink装饰器可以和UI联动。</p>`,19),l=[t];function o(c,r,d,b,g,A){return s(),a("div",null,l)}const h=n(p,[["render",o]]);export{y as __pageData,h as default};
