# Harmony OS

## ArkTS
- 低开销运行时：通过严格限制TypeScript的动态类型，减少了运行时的开销，提升效率。
  - 

## Stage模型
![stage-model](../../../static/images/harmony/Stage-model.png)

AbilityStage
::: info 
每一个Entry类型或者Feature类型的HAP在运行期间都有一个AbilityStage类实例，当HAP被首次加载到进程中，系统就会创建AbilityStage的实例
:::
UIAbility和ExtensionAbility
::: info 
- UIAbility组件是一种包含UI的应用组件，主要用于和用户交互。
  - 系统调度的基本单元
  - 一个应用可以包含一个或者多个UIAbility
  - 生命周期：
    - onCreate:页面初始化：变量定义、资源加载
        ```ets
        import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';

        export default class EntryAbility extends UIAbility {
            onCreate(want: Want, launchParam: AbilityConstant.LaunchParam){
                // want是消息传递的载体
            }
        }
        ```
    - onWindowStageCreate:创建WindowStage后的回调，可以进行设置UI加载，WindowStage的事件订阅
        ```ets
        import { UIAbility } from '@kit.AbilityKit';
        import { window } from '@kit.ArkUI';
        import { hilog } from '@kit.PerformanceAnalysisKit';

        const TAG: string = '[EntryAbility]';
        const DOMAIN_NUMBER: number = 0xFF00;

        export default class EntryAbility extends UIAbility {
        // ...
        onWindowStageCreate(windowStage: window.WindowStage): void {
            // 设置WindowStage的事件订阅（获焦/失焦、可见/不可见）
            try {
            windowStage.on('windowStageEvent', (data) => {
                let stageEventType: window.WindowStageEventType = data;
                switch (stageEventType) {
                case window.WindowStageEventType.SHOWN: // 切到前台
                    hilog.info(DOMAIN_NUMBER, TAG, 'windowStage foreground.');
                    break;
                case window.WindowStageEventType.ACTIVE: // 获焦状态
                    hilog.info(DOMAIN_NUMBER, TAG, 'windowStage active.');
                    break;
                case window.WindowStageEventType.INACTIVE: // 失焦状态
                    hilog.info(DOMAIN_NUMBER, TAG, 'windowStage inactive.');
                    break;
                case window.WindowStageEventType.HIDDEN: // 切到后台
                    hilog.info(DOMAIN_NUMBER, TAG, 'windowStage background.');
                    break;
                default:
                    break;
                }
            });
            } catch (exception) {
            hilog.error(DOMAIN_NUMBER, TAG, 'Failed to enable the listener for window stage event changes. Cause:' + JSON.stringify(exception));
            }
            hilog.info(DOMAIN_NUMBER, TAG, '%{public}s', 'Ability onWindowStageCreate');
            // 设置UI加载
            windowStage.loadContent('pages/Index', (err, data) => {
            // ...
            });
        }
        }
        ```
        
    - onForeGround：UIAbility切换至前台时触发。可以在onForeground()回调中申请系统需要的资源，或者重新申请在onBackground()中释放的资源。
    - onBackGround:UIAbility切换至后台时候触发。可以在onBackground()回调中释放UI不可见时无用的资源，或者在此回调中执行较为耗时的操作，例如状态保存等。
    - onNewWant:非首次加载再次调用该UIAbility实例，会触发此回调，不会触发onCreate\onWindowStageCreate
    - onDestroy:系统资源的释放、数据的保存等操作。
  - 模式：配置module.json5中的launchType
    - 单实例模式 singleton：默认启动模式
    - 多实例模式 multiton：
    - 指定实例模式 specified
  - 通过startAbility启动指定的UIAbility
  - 通过terminateSelf来停止当前的UIAbility
    ::: tip 
    调用terminateSelf()方法停止当前UIAbility实例时，默认会保留该实例的快照（Snapshot），即在最近任务列表中仍然能查看到该实例对应的任务。如不需要保留该实例的快照，可以在其对应UIAbility的module.json5配置文件中，将abilities标签的removeMissionAfterTerminate字段配置为true。
    :::
  - 如需要关闭应用所有的UIAbility实例，可以调用ApplicationContext的killAllProcesses()方法实现关闭应用所有的进程。   
  
- ExtensionAbility是一种面向特定场景的应用组件。不直接从ExtensionAbility派生，而是使用ExtensionAbility的派生类。
  - 卡片场景的FormExtensionAbility
  - 输入法场景的InputMethodExtensionAbility
  - 闲时任务场景的WorkerSchedulerExtensionAbility
:::
WindowStage
::: info 
每个UIAbility都会与一个WindowStage类实例绑定，该类起到了进程中窗口管理器的作用。UIAbility通过WindowStage持有了一个主窗口，主窗口是ArkUI的绘制区域
:::
Context
::: info 
在Stage模型上，Context及其派生类向开发者提供在运行期可以调用的各种资源和能力。UIAbility组件和各种ExtensionAbility组件的派生类都有各自不同的Context类，他们都继承自基类Context，但是各自又根据所属组件，提供不同的能力。
:::


## 状态管理
鸿蒙通过修饰符来管理状态
@State：@State装饰的变量拥有其所属组件的状态，可以作为其子组件单向和双向同步的数据源。当其数值改变时，会引起相关组件的渲染刷新。
@Prop：@Prop装饰的变量可以和父组件建立单向同步关系，@Prop装饰的变量是可变的，但修改不会同步回父组件。
@Link：@Link装饰的变量可以和父组件建立双向同步关系，子组件中@Link装饰变量的修改会同步给父组件中建立双向数据绑定的数据源，父组件的更新也会同步给@Link装饰的变量。
@Provide/@Consume: @Provide/@Consume装饰的变量用于跨组件层级（多层组件）同步状态变量，可以不需要通过参数命名机制传递，通过alias（别名）或者属性名绑定。
@Observed:@Observed装饰class，需要观察多层嵌套场景的class需要被@Observed装饰。单独使用@Observed没有任何作用，需要和@ObjectLink、@Prop联用。
@ObjectLink:@ObjectLink装饰的变量接收@Observed装饰的class的实例，应用于观察多层嵌套场景，和父组件的数据源构建双向同步。
@Watch用于监听状态变量的变化。

$$运算符：给内置组件提供TS变量的引用，使得TS变量和内置组件的内部状态保持同步。

AppStorage是应用程序中的一个特殊的单例LocalStorage对象，是应用级的数据库，和进程绑定，通过@StorageProp和@StorageLink装饰器可以和组件联动。

AppStorage是应用状态的“中枢”，将需要与组件（UI）交互的数据存入AppStorage，比如持久化数据PersistentStorage和环境变量Environment。UI再通过AppStorage提供的装饰器或者API接口，访问这些数据。

框架还提供了LocalStorage，AppStorage是LocalStorage特殊的单例。LocalStorage是应用程序声明的应用状态的内存“数据库”，通常用于页面级的状态共享，通过@LocalStorageProp和@LocalStorageLink装饰器可以和UI联动。