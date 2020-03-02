---
title: 'Allow Kubernetes To Pull Large Image Sizes'
date: 2020-02-29
sitemap: false
permalink: /posts/2020/02/29/k8s-size-restriction.html
tags:
  - kubernetes
  - docker
---

The bare-metla version of Kubernetes has a restriction on the image size being pulled. In order to overcome this issue, the following update needs to be performed on every node in the cluster.

**Steps:**
- Connect to every node via SSH
- Change the configuration file of kubernetes:
```code
# nano /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
```
- Add the following line:
```code
Environment="KUBELET_OPTS=--image-pull-progress-deadline=60m"
```
- Restart kubelet using sudo systemctl restart kubelet
- Redeploy your service