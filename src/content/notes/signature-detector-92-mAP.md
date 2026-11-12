---
title: How I trained a signature detector to 92.4% mAP@50
date: 2026-11-15
summary: Preparing a 7,004-image dataset and training YOLOv8 to find signatures in documents.
tags: Computer Vision, YOLOv8
draft: true
---
## The problem
TODO(Mohak): 2 to 3 sentences: why detect signatures, and what documents you tested on.
## The dataset
7,004 images split into 4,902 for training, 1,401 for validation and 701 for testing, prepared with Roboflow. TODO(Mohak): where the images came from, labelling, augmentation.
## Training
YOLOv8 with Ultralytics and PyTorch on a Tesla T4 GPU in Google Colab. TODO(Mohak): model size, epochs, image size, batch size.
## Results
On the held-out test split: precision 86.39%, recall 92.04%, mAP@50 92.40%, mAP@50-95 73.48%.
## What went wrong
TODO(Mohak): failure cases (layouts, faint signatures, stamps or handwriting mistaken for signatures).
## What I'd do next
TODO(Mohak): your own next steps.

