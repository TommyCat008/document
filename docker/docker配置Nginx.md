# docker 配置 Nginx 以及相关 Nginx 的配置

## docker 启动 Nginx 命令

在本地创建 nginx 文件夹作为映射目录，目前可以映射 html 目录、conf 配置文件、虚拟主机配置文件以及 logs 日志文件。

`注意创建文件夹的时候，需要在conf文件夹创建一个nginx.conf以及在conf.d文件夹下创建default.conf文件，否则在docker启动容器的时候会将文件转成文件夹。`

```shell
docker run  \
--name nginx \
-d -p 8080:80 \
-v /Users/zhangyaqi04/zhangyaqi/docker/nginx/html:/usr/share/nginx/html \
-v /Users/zhangyaqi04/zhangyaqi/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /Users/zhangyaqi04/zhangyaqi/docker/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf  \
-v /Users/zhangyaqi04/zhangyaqi/docker/nginx/logs:/var/log/nginx \
nginx
```


## nginx.conf 基本的配置内容

```shell

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';


        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            try_files $uri $uri/index.html $uri.html =404;
        }

        location /networkLink {
            # 为什么这里要设置alias而不是root呢？
            alias   /usr/share/nginx/html/networkLink;
            index  index.html index.htm;
            try_files $uri $uri/index.html $uri.html =404;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

}
```

### root 和 alias 的区别

参考文档：

<https://developer.aliyun.com/article/603563>
