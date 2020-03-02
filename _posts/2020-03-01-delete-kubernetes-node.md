---
title: 'Delete Kubernetes Node'
date: 2020-03-01
sitemap: false
permalink: /posts/2020/03/01/delete-kubernetes-node.html
tags:
  - kubernetes
  - ubuntu
---

In order to delete a node from a Kubernetes cluster, the following steps need to be perofrmed.

1) Identify the node that needs to remove from the cluster:

```code
kubectl get nodes
```

2) Drain the node

```code
kubectl drain <node>
```

3) Delete the node

```code
kubectl delete node <node>
```

4) Reset the machine

```code
kubeadm reset
```
