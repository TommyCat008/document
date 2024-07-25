# docker 配置 MySQL 相关内容

## 拉取镜像

```shell
docker pull mysql:5.7   # 拉取 mysql 5.7
docker pull mysql       # 拉取最新版mysql镜像
```

## 检查是否拉取成功

```shell
docker images
```

## 创建镜像

### 直接生成容器

```shell
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```

### 创建映射目录

首先需要在目录/Users/tangmimao/zhangyaqi/docker/mysql 下创建 conf.d 文件夹

```shell
sudo docker run -p 3306:3306 --name mysql \
-v /Users/tangmimao/zhangyaqi/docker/mysql:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql
```

## 参考文档

https://www.cnblogs.com/sablier/p/11605606.html
