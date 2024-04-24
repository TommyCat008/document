### 启动 nginx 镜像

```shell
# docker run -it -p 80:80 nginx

docker run \
--name test-nginx \
-d -p 8787:80 \
-v /Users/zhangyaqi31/dockerData/nginx/nginx.conf:/etc/nginx/nginx.conf \
-v /Users/zhangyaqi31/dockerData/nginx/html:/usr/share/nginx/html \
nginx:lts

docker run \
--name nginx \
-d -p 80:80 \
-v /home/jd/dockerVolume/nginx/nginx.conf:/etc/nginx/nginx.conf \
-v /home/jd/dockerVolume/nginx/html:/usr/share/nginx/html \
nginx:latest

# centOS 8 版本添加docker-componse
curl -L https://github.com/docker/compose/releases/download/1.26.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

```

### 拷贝容器中的资源到本地，或者拷贝本地的资源到容器中

```shell
docker cp  793f33152806:/etc/nginx/conf.d/default.conf /Users/zhangyaqi31/Desktop

docker cp /Users/tangmimao/zhangyaqi/docker/nginx/conf/mime.types b2dfdc2cf2b4:/etc/nginx/mime.types

docker cp /Users/zhangyaqi31/Desktop/default.conf 793f33152806:/etc/nginx/conf.d/default.conf
```

### 拷贝本地资源到容器

```shell
docker cp /Users/zhangyaqi31/nginx/app 793f33152806://usr/share/nginx/html
```

### docker 下安装 vim

```shell
apt-get update

apt-get install vim
```

### 镜像的导出和导入

```shell
docker save -o /Users/zhangyaqi31/nginx.tar nginx

docker load --input /Users/zhangyaqi31/Desktop/nginx.tar
```

### 容器导入和导出

```shell
docker export 793f33152806 > /Users/zhangyaqi31/Desktop/prd.tar

docker import /Users/zhangyaqi31/Desktop/prd.tar prd
```

### 只需要导出容器即可，因为容器中会有添加的静态资源

### 运行导入的容器

```shell
# 运行nginx的内容，后接的内容是docker容器运行的COMMAND
docker run -d -p 80:80 prd nginx -g 'daemon off;'
```

<!-- /docker-entrypoint.sh kong docker-start -->