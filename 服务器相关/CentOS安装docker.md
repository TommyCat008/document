#### 安装docker

```shell
# 使用官方安装脚本自动安装
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

#### 删除旧版

```shell
# 如果存在旧版的，需要删除掉旧版。
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

#### 设置仓库

```shell
# yum-utils 提供了 yum-config-manager ，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2。
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

#### 添加国内的镜像源

```shell
# 因为官方的源下载较慢，需要添加国内的镜像源
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

#### 安装 Docker Engine-Community

```shell
# 安装最新版本的 Docker Engine-Community 和 containerd，或者转到下一步安装特定版本：
sudo yum install docker-ce docker-ce-cli containerd.io
```

#### 启动docker

```shell
sudo systemctl start docker
```

#### 验证

```shell
sudo docker run hello-world
```

#### 设置开机自动启动docker

```shell
sudo systemctl enable docker
```


