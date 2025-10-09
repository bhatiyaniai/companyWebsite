import React from 'react';

const Blog2 = () => {
  return (
    <section className="pt-32 pb-20 bg-white dark:bg-secondary-950">
      <div className="container-custom max-w-4xl mx-auto px-4 sm:px-8">
        <h1 className="text-4xl font-bold mb-6 dark:text-white">Implementing Real-time Object Detection for Industrial Applications</h1>
        <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8">Step-by-step guide to implementing YOLOv8 for real-time object detection in manufacturing settings.</p>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            Real-time object detection has become a cornerstone technology in modern manufacturing, enabling automated quality control, defect detection, and process optimization. YOLOv8 represents the cutting-edge of object detection algorithms, offering superior speed and accuracy for industrial applications. This guide walks you through implementing YOLOv8 for manufacturing environments.
          </p>

          <h2>Understanding YOLOv8 for Manufacturing</h2>
          <p>
            YOLOv8 uses a single-stage architecture that processes entire images in one forward pass. It predicts bounding boxes and class probabilities simultaneously which makes it well-suited for real-time production-line scenarios.
          </p>

          <h2>System Requirements & Hardware Setup</h2>
          <ul>
            <li><strong>CPU:</strong> 8–24 core processors (e.g., AMD EPYC, Intel Xeon)</li>
            <li><strong>GPU:</strong> NVIDIA RTX-class GPUs (multi-GPU for training); RTX PRO series for large VRAM</li>
            <li><strong>RAM:</strong> 64GB+ recommended</li>
            <li><strong>Storage:</strong> NVMe SSDs for fast dataset and checkpoint I/O</li>
          </ul>

          <h3>Quick performance comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-secondary-200 dark:border-secondary-800 text-left mb-6">
              <thead className="bg-secondary-50 dark:bg-secondary-900">
                <tr>
                  <th className="px-4 py-2">Aspect</th>
                  <th className="px-4 py-2">CPU</th>
                  <th className="px-4 py-2">GPU</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-4 py-2">Inference time</td><td className="px-4 py-2">~500 ms / image</td><td className="px-4 py-2">~15 ms / image</td></tr>
                <tr><td className="px-4 py-2">Training speed</td><td className="px-4 py-2">~2 epochs / hour</td><td className="px-4 py-2">~30 epochs / hour</td></tr>
                <tr><td className="px-4 py-2">Batch processing</td><td className="px-4 py-2">2–4 images</td><td className="px-4 py-2">16–32 images</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Installation & Environment Setup</h2>
          <ol>
            <li>
              <strong>Prepare Python environment</strong>
              <pre className="bg-secondary-50 dark:bg-secondary-900 rounded-md p-3 overflow-x-auto"><code>{`python -m venv yolov8-industrial
# Linux / macOS
source yolov8-industrial/bin/activate
# Windows (PowerShell)
# .\\yolov8-industrial\\Scripts\\Activate.ps1
pip install --upgrade pip
`}</code></pre>
            </li>
            <li>
              <strong>Install YOLOv8 (Ultralytics)</strong>
              <pre className="bg-secondary-50 dark:bg-secondary-900 rounded-md p-3 overflow-x-auto"><code>{`pip install ultralytics
# verify with
# yolo --help
`}</code></pre>
            </li>
            <li>
              <strong>GPU (optional)</strong>
              <pre className="bg-secondary-50 dark:bg-secondary-900 rounded-md p-3 overflow-x-auto"><code>{`# check GPU
nvidia-smi
# install CUDA-compatible PyTorch (example for CUDA 11.8)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
`}</code></pre>
            </li>
          </ol>

          <h2>Camera Integration & Image Acquisition</h2>
          <p>Choose cameras and settings that match line speed and defect granularity. High-speed GigE or USB3 cameras with modern CMOS sensors are common in production settings.</p>

          <h2>Dataset Preparation & Augmentation</h2>
          <p>Collect representative images across lighting conditions and product variations. Annotate defects and normal examples consistently. Aim for 1,000+ images per class where feasible.</p>
          <ul>
            <li>Rotation, scaling, and perspective transforms</li>
            <li>Brightness / contrast adjustments and noise injection</li>
            <li>MixUp / Mosaic augmentations supported by YOLO training pipelines</li>
          </ul>

          <h2>Model Training (Example)</h2>
          <pre className="bg-secondary-50 dark:bg-secondary-900 rounded-md p-3 overflow-x-auto"><code>{`# CLI training (example)
yolo task=detect mode=train model=yolov8n.pt \\
  imgsz=640 data=industrial_data.yaml \\
  epochs=100 batch=16 name=industrial_detector
`}</code></pre>

          <pre className="bg-secondary-50 dark:bg-secondary-900 rounded-md p-3 overflow-x-auto"><code>{`# Python API example
from ultralytics import YOLO
model = YOLO('yolov8n.pt')
model.train(data='industrial_data.yaml', imgsz=640, epochs=100, batch=16, name='industrial_detector')
`}</code></pre>

          <h2>Model Selection Guidelines</h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-secondary-200 dark:border-secondary-800 text-left">
              <thead className="bg-secondary-50 dark:bg-secondary-900">
                <tr>
                  <th className="px-4 py-2 font-semibold">Model</th>
                  <th className="px-4 py-2 font-semibold">Parameters</th>
                  <th className="px-4 py-2 font-semibold">Speed</th>
                  <th className="px-4 py-2 font-semibold">Accuracy</th>
                  <th className="px-4 py-2 font-semibold">Use case</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-4 py-2">YOLOv8n</td><td className="px-4 py-2">3.2M</td><td className="px-4 py-2">Fastest</td><td className="px-4 py-2">~37% mAP</td><td className="px-4 py-2">Edge / high-speed lines</td></tr>
                <tr><td className="px-4 py-2">YOLOv8s</td><td className="px-4 py-2">11.2M</td><td className="px-4 py-2">Fast</td><td className="px-4 py-2">~45% mAP</td><td className="px-4 py-2">Balanced accuracy/speed</td></tr>
                <tr><td className="px-4 py-2">YOLOv8m</td><td className="px-4 py-2">25.9M</td><td className="px-4 py-2">Medium</td><td className="px-4 py-2">~50% mAP</td><td className="px-4 py-2">Higher accuracy needs</td></tr>
                <tr><td className="px-4 py-2">YOLOv8l</td><td className="px-4 py-2">43.7M</td><td className="px-4 py-2">Slower</td><td className="px-4 py-2">~53% mAP</td><td className="px-4 py-2">Critical QC</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Real-time Inference Example</h2>
          <pre className="bg-secondary-50 dark:bg-secondary-900 rounded-md p-3 overflow-x-auto mb-6"><code>{`import cv2
from ultralytics import YOLO
model = YOLO('industrial_detector.pt')
cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    if not ret:
        break
    results = model(frame)
    annotated = results[0].plot()
    cv2.imshow('Industrial Detection', annotated)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
`}</code></pre>

          <h2>Batch Processing Example</h2>
          <pre className="bg-secondary-50 dark:bg-secondary-900 rounded-md p-3 overflow-x-auto mb-6"><code>{`import os
from pathlib import Path
from ultralytics import YOLO
model = YOLO('industrial_detector.pt')
input_dir = 'production_images'
output_dir = 'quality_results'
Path(output_dir).mkdir(parents=True, exist_ok=True)
for image_file in os.listdir(input_dir):
    if image_file.lower().endswith(('.jpg', '.jpeg', '.png')):
        image_path = os.path.join(input_dir, image_file)
        results = model(image_path)
        output_path = os.path.join(output_dir, f'detected_{image_file}')
        results[0].save(output_path)
`}</code></pre>

          <h2>Performance Optimization Strategies</h2>
          <ul>
            <li>INT8 quantization for faster inference on supported hardware</li>
            <li>Batch processing to better utilize GPUs</li>
            <li>NVIDIA TensorRT for optimized GPU kernels</li>
          </ul>

          <h2>Industrial Integration & Deployment</h2>
          <ul>
            <li>Edge deployments for minimal latency</li>
            <li>PLC integration using industrial protocols (Ethernet/IP, Modbus, PROFINET)</li>
            <li>Comprehensive logging for traceability and QA</li>
          </ul>

          <h2>Best Practices & Troubleshooting</h2>
          <ul>
            <li>Standardize lighting and camera mounts to reduce variance</li>
            <li>Retrain models periodically with new production data</li>
            <li>Plan redundancy for high-availability inspection systems</li>
          </ul>

          <h2>Return on Investment</h2>
          <p>
            Properly implemented YOLOv8 inspection systems can reduce rework, improve yields, and increase throughput. Typical benefits include reduced scrap, fewer manual inspections, and consistent product quality.
          </p>

        </article>
      </div>
    </section>
  );
};

export default Blog2;
