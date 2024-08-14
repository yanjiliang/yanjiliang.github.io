# 3D数据可视化

## Three.js
核心模块：
- Scene
  - 创建管理场景
- Camera
  - 视锥：摄像机的视锥体是一个截头四棱锥形区域，只有在这个区域内的物体才会被渲染到屏幕上，而在这个区域之外的物体则不会被渲染。
  - 投影方式：
    - 透视投影：模拟人眼视角，物体会越远越小
```js
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // fov 视角，以垂直方向的度数来表示
    // aspect 视口宽高比，通常为窗口的宽高 window.innerWidth / window.innerHeight
    // near 近截面 离摄像机的最近距离
    // far 远截面 离摄像机的最远距离
```
    - 正交投影：没有透视效果，物体大小不会随距离变化
```js
    const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    // left: 视口左边坐标
    // right: 视口右边坐标
    // top: 视口上边坐标
    // bottom: 视口下边坐标
    // near: 近截面 离摄像机的最近距离
    // far：远截面 离摄像机的最远距离
```
- Renderer
- Mesh
- Geometry
- Material
- Light
- Texture
- Animation
- Controls