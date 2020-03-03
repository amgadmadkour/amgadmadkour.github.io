---
title: 'Force Pod Deletion'
date: 2020-03-02
sitemap: false
permalink: /posts/2020/03/02/force-pod-deletion.html
tags:
  - kubernetes
---

In some instances, pods are not immediately terminated. The status of a pod may remain terminating even if the kubernetes cluster restarts. To force a pod to delete, the following command can be used:

```code
kubectl delete pod <pod_Name> --grace-period=0 --force --namespace <namespace>
```
The **pod_name** parameter can be identified using the following command:

```code
kubectl get pods
```
The **namespace** parameter indicates the namespace used when creating the pod.