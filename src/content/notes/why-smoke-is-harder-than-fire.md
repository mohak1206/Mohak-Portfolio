---
title: Why smoke is harder to detect than fire
date: 2026-11-20
summary: A YOLOv8n fire and smoke detector reached 91.2% mAP@50 on fire but only 41.5% on smoke.
tags: Computer Vision, YOLOv8
draft: true
---
## The result that surprised me
Overall mAP@50 was 66.3%: fire reached 91.2% while smoke reached 41.5%.
## The dataset
5,068 original images grew to 12,122 after augmentation (640x640, 70/20/10 split). Augmentations: flipping, blur, brightness changes and grayscale. TODO(Mohak): source and labelling notes.
## Why smoke is harder
Smoke changes shape and density, fades into the background and looks different in every scene. TODO(Mohak): examples you actually saw.
## What I'd try next
TODO(Mohak): your own ideas, e.g. more varied smoke images, a larger model or higher resolution (only list what you really plan to try).

