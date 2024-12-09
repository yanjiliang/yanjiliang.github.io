<!-- Nest.js -->

## Controllers

![NestJS Controllers](https://docs.nestjs.com/assets/Controllers_1.png)

控制器的目的是接收应用程序的特定请求。路由机制控制哪个控制器接收哪些请求。通常，每个控制器都有多个路由，并且不同的路由可以执行不同的操作。为了创建基本控制器，我们使用类和装饰器。装饰器将类与所需的元数据关联起来，并使 Nest 能够创建路由映射（将请求绑定到相应的控制器）。

```bash
# 快速生成CRUD
nest g resource [name]
```

@Controller()

@Request() | @Req()

@Response() | @Res()

@Next()

@Session()

@Param(key?: string)

@Body(key?: string)

@Query(key?: string)

@Headers(name?: string)

@Ip()

@HostParam()

## 自定义装饰器

```ts
// user.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
```

## Providers

### 自定义 Providers

```ts
import { Injectable, Optional, Inject } from "@nestjs/common";

@Injectable()
export class HttpService<T> {
  contructor(@Optional() @Inject("HTTP_OPTIONS") private httpClient: T) {}
}
```

## Modules

- providers
- controllers
- imports
- exports

## Middleware

中间件

```ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request...");
    next();
  }
}
```

应用

```ts
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("cats");
  }
}
```
