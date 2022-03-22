---
title: Docker入门与实战
date: 2020-03-15
categories: Work
author: grace
tags: 
 - Docker
---

##### 一、基础概念：

虚拟技术、容器

##### 二、使用Docker镜像：


围绕Docker镜像的一系列重要命令操作，包括获取、查看、搜索、删除、创建、存出和载入、上传等。读者可以使用docker image help命令查看Docker支持的镜像操作子命令。

镜像操作子命令

 build       Build an image from a Dockerfile
  history     Show the history of an image
  import      Import the contents from a tarball to create a filesystem image
  inspect     Display detailed information on one or more images
  load        Load an image from a tar archive or STDIN
  ls          List images
  prune       Remove unused images
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rm          Remove one or more images
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  
  ##### 三、操作容器
  
  Docker提供了十分丰富的操作命令，允许用户高效地管理容器的整个生命周期。读者可以使用docker container help命令查看Docker支持的容器操作子命令。
  
  Commands:
  attach      Attach local standard input, output, and error streams to a running container
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  inspect     Display detailed information on one or more containers
  kill        Kill one or more running containers
  logs        Fetch the logs of a container
  ls          List containers
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  prune       Remove all stopped containers
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  run         Run a command in a new container
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  wait        Block until one or more containers stop, then print their exit codes

   ##### 参考

   《Docker入门与实战》第3版》 

