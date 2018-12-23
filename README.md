
## node 环境
建议服务器上有 nvm工具 可切换node版本 进行node 版本切换到
可能需要 node-v 为 v8.11.4 进行 npm install


## Getting started


```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-element-admin.git

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9527.

## Build

```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```

## Advanced

```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --generate a bundle size analytics. default: bundle-report.html
npm run build:prod --generate_report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/PanJiaChen/vue-element-admin/releases).



##  nginx 配置
```
  server {
        listen       80;
        server_name  api.laidanl.com;
        charset utf-8;
        location /api{
          add_header 'Access-Control-Allow-Origin' '*';
          add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
          add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
          add_header Access-Control-Allow-Headers 'User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,Range,token';
        }
    }
```


npm cache clean --force

## 发送达达测试账号
18916483717
123456

## 老 http://mgr.diaosinaicha.com/order/list
licenling
abcd1234


18702145378
abcd5678


```
http://deploy.laidanl.com/ 发布平台
zhangcheng/52laidanl
cicada-cms
```
