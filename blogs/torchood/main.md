---
title: torchood 使用文档
date: 2024-12-16
heroImage: /logo.png
heroText: Welcome to hep.
categories:
 - 技术
tags:
 - python
 - 我的开源作品
 - 技术文档

isShowTitleInHome: true
actionText: About
---

<center>

![](https://kirigaya.cn/files/images/bird.png)

[[torchood](https://github.com/LSTM-Kirigaya/torchood)]: 通用 OOD 方法的 pytorch 实现

</center>

## 前言

这个项目最早源于我对 OOD 一类方法在医学图像分类任务上的探索，下面是这个过程中诞生的一篇博客。

<detail-url
    href="https://kirigaya.cn/blog/article?seq=154"
    logo="kirigaya"
    title="EDL（Evidential Deep Learning） 原理与代码实现"
    desc="OOD 指这么一类任务 ..."
></detail-url>

## 支持的模型

| 支持的模型 | 来源 |
|:---|:---|
| Robust Classification with Convolutional Prototype Learning (Prototype Networks) | [CVPR 2018: Rbust classification with convolutional prototype learning](https://arxiv.org/pdf/1805.03438) |
| Predictive Uncertainty Estimation via Prior Networks(Prior Networks) | [NeurIPS 2018: Predictive Uncertainty Estimation via Prior Networks]() |
| Evidential Deep Learning to Quantify Classification Uncertainty (EDL) | [NeurIPS 2018: Evidential Deep Learning to Quantify Classification Uncertainty](https://papers.nips.cc/paper/2018/hash/a981f2b708044d6fb4a71a1463242520-Abstract.html) |
| Posterior Network (PostNet) | [NeurIPS 2020: Posterior Network: Uncertainty Estimation without OOD Samples via Density-Based Pseudo-Counts]() |
| Evidential Neural Network (ENN) | [NeurIPS 2018: Evidential Deep Learning to Quantify Classification Uncertainty](https://arxiv.org/pdf/1806.01768) |
| Evidence Reconciled Neural Network(ERNN) | [MICCAI 2023: Evidence Reconciled Neural Network for Out-of-Distribution Detection in Medical Images](https://conferences.miccai.org/2023/papers/249-Paper2401.html) |
| Redundancy Removing Evidential Neural Network(R2ENN) | - |

## 使用方法

### 安装

```bash
pip install torchood
```

### 将分类器模型转换为能够输出不确定度的模型

```python
import torchood

class UserDefineModel(nn.Module):
    ...

classifier = UserDefineModel(...)
classifier = torchood.EvidenceNeuralNetwork(classifier)
```


### 训练

```python
for data, label in train_loader:
    # 将 data & label 转换到对应的 device 上面
    # ...

    _, evidence, _ = classifier(data)
    loss = classifier.criterion(evidence, label)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

### 推理

```python
prob, uncertainty = classifier.predict(inputs)
```

:::info
`uncertainty` 可以作为系统的拒答流的响应阈值进行使用.
:::

---

## 实践场景

下面罗列使用了这套方法的项目：

<detail-url
    href="https://github.com/LSTM-Kirigaya/Lagrange.RagBot"
    logo="github"
    title="LSTM-Kirigaya/Lagrange.RagBot"
    desc="基于 ENN 的客服机器人"
></detail-url>
