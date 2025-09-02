---
index: 2
name: "Wav2Vec2 Emotion Recognition"
logo: "/work/xai.svg"
featured: "/work/xai.svg"
role: "Ai Engineer"
type: "Deep Learning"
timeline: "2025"
ref_urls:
  - name: "X-Ai"
    url: "https://github.com/Sree14hari/Emotion-Detection-XAi.git"
description: "Implementing a fine-tuning pipeline for Facebook's Wav2Vec2 model to perform emotion recognition from audio data. The model classifies audio into 21 different emotion categories with varying intensity levels."
---

# Wav2Vec2 Emotion Recognition Model Analysis

## Overview

This notebook implements a fine-tuning pipeline for Facebook's Wav2Vec2 model to perform emotion recognition from audio data. The model classifies audio into 21 different emotion categories with varying intensity levels.

## Dataset Structure

- **Training set**: 2,486 samples
- **Validation set**: 410 samples  
- **Test set**: 738 samples
- **Total**: 3,634 audio files

## Emotion Labels (21 categories)

The model predicts emotions with intensity levels:

- **ANG** (Anger): HI, LO, MD, XX (High, Low, Medium, Unknown intensity)
- **DIS** (Disgust): HI, LO, MD, XX
- **FEA** (Fear): HI, LO, MD, XX
- **HAP** (Happy): HI, LO, MD, XX
- **NEU** (Neutral): XX only
- **SAD** (Sad): HI, LO, MD, XX

## Technical Implementation

### 1. Data Loading and Preprocessing

- Uses Hugging Face `datasets` library to load CSV files
- Audio resampling to 16kHz (standard for Wav2Vec2)
- Padding/truncation to 5 seconds maximum length
- Label mapping from text to integer IDs

### 2. Data Augmentation (Training Only)

Uses `audiomentations` library with:

- **Gaussian Noise**: 0.001-0.015 amplitude (50% probability)
- **Pitch Shift**: ±4 semitones (50% probability)
- **Time Stretch**: 0.8-1.25x speed (50% probability)

### 3. Model Architecture

- Base model: `facebook/wav2vec2-base`
- Added classification head for 21 emotion classes
- Uses `AutoModelForAudioClassification`

### 4. Training Configuration

- Batch size: 4 (both train/eval)
- Learning rate: 1e-5
- Epochs: 15 (interrupted at ~10 epochs)
- Evaluation every 500 steps
- Weight decay: 0.01
- No mixed precision (fp16=False)

## Training Results Analysis

### Performance Progression

| Step | Training Loss | Validation Loss | Accuracy |
|------|---------------|-----------------|----------|
| 500  | 2.539         | 2.360          | 26.6%    |
| 1000 | 2.103         | 1.936          | 38.5%    |
| 3000 | 1.071         | 1.454          | 54.9%    |
| 4500 | 0.731         | 1.608          | 62.4%    |
| 6000 | 0.513         | 1.799          | 61.0%    |

### Key Observations

#### ✅ Positive Indicators

1. **Strong Learning**: Training loss decreased from 2.54 to 0.51 (80% reduction)
2. **Good Initial Progress**: Validation accuracy improved from 26.6% to 62.4%
3. **Reasonable Baseline**: 60% accuracy on 21-class problem (vs 4.8% random chance)

#### ⚠️ Concerning Patterns

1. **Overfitting Signs**:
   - Training loss continues decreasing while validation loss increases after step 3000
   - Gap between training and validation loss widens significantly
   - Validation accuracy plateaus around 60%

2. **Model Convergence Issues**:
   - Validation loss becomes unstable (increases from 1.45 to 1.80)
   - Performance degradation in later steps suggests overtraining

## Final Test Results

- **Test Accuracy**: 59.8%
- **Test Loss**: 1.824

## Recommendations for Improvement

### 1. Address Overfitting

- **Early Stopping**: Implement based on validation loss (stop around step 3000)
- **Regularization**: Increase dropout, add L2 regularization
- **Data**: Collect more training samples if possible

### 2. Hyperparameter Tuning

- **Learning Rate**: Try 5e-6 or 2e-5
- **Batch Size**: Experiment with larger batches (8, 16) if GPU memory allows
- **Augmentation**: Reduce augmentation intensity or probability

### 3. Model Architecture

- **Freeze Layers**: Freeze early Wav2Vec2 layers, only fine-tune later layers
- **Different Base**: Try `wav2vec2-large` or `wav2vec2-large-960h`

### 4. Data Analysis

- **Class Balance**: Check for class imbalance issues
- **Data Quality**: Analyze misclassified samples
- **Cross-validation**: Implement k-fold validation

### 5. Advanced Techniques

- **Ensemble Methods**: Combine multiple models
- **Pseudo-labeling**: Use model predictions on unlabeled data
- **Multi-task Learning**: Joint training with related tasks

## Code Quality Assessment

### Strengths

- Well-structured pipeline with clear sections
- Proper data cleaning and validation
- Good use of Hugging Face ecosystem
- Comprehensive augmentation strategy

### Areas for Improvement

- Missing early stopping implementation
- No hyperparameter search
- Limited error analysis and visualization
- Could benefit from more detailed logging and metrics

## Conclusion

This is a solid implementation that achieves reasonable performance (60% accuracy) on a challenging 21-class emotion recognition task. The main issue is overfitting, which could be addressed with early stopping and regularization techniques. The code demonstrates good understanding of modern NLP/audio processing pipelines.
