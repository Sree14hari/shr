---
index: 5
name: "NLP with Disaster Tweets"
logo: "/work/nlp.svg"
featured: "/work/nlp.svg"
role: "Competitor"
type: "Competition"
timeline: "2025"
# ref_urls:
#   - name: "Fascino"
#     url: "https://fascinobd.com"
description: "This particular challenge is perfect for data scientists looking to get started with Natural Language Processing. The competition dataset is not too big, and even if you don’t have much personal computing power, you can do all of the work in our free, no-setup, Jupyter Notebooks environment called Kaggle Notebooks."
---

# Kaggle: NLP with Disaster Tweets (Top 10 Finish)

[](https://www.kaggle.com/c/nlp-getting-started)
[](https://www.kaggle.com/c/nlp-getting-started/leaderboard)
[](https://www.python.org)
[](https://pytorch.org/)
[](https://github.com/huggingface/transformers)

## Project Overview

This repository contains the code and methodology for the Kaggle competition "[Natural Language Processing with Disaster Tweets](https://www.kaggle.com/c/nlp-getting-started)". The goal is to build a machine learning model that can determine whether a given tweet is about a real disaster or not.

This project goes beyond a simple model, implementing a robust, professional-grade pipeline using a pre-trained RoBERTa model and a K-Fold Cross-Validation strategy.

## 🏆 Key Achievements

  * **Achieved a Top 10 Rank** on the final Kaggle leaderboard out of thousands of participants.
  * Final Kaggle Public Leaderboard Score: **0.84768**.
  * Utilized a robust **5-Fold Cross-Validation** strategy to ensure model stability and performance.
  * Successfully fine-tuned a **RoBERTa-base** model using the Hugging Face and PyTorch ecosystem.

## 🛠️ The Technical Pipeline

The final, high-scoring solution was achieved through a systematic and robust workflow:

### 1\. Data Preprocessing

Initial cleaning of the tweet text was performed to standardize the input for the model. This included:

  * Removing all URLs.
  * Stripping HTML tags.
  * Normalizing whitespace.

### 2\. Model Architecture: RoBERTa

The core of the solution is a pre-trained **RoBERTa-base** model from the Hugging Face `transformers` library. RoBERTa is an optimized version of BERT that is highly effective for language understanding tasks. The model was fine-tuned specifically for this binary classification problem.

### 3\. Training Strategy: K-Fold Cross-Validation

To build a highly robust model and get a reliable performance estimate, a **Stratified K-Fold** strategy with **5 splits** was implemented.

This involves training 5 separate RoBERTa models on different 80% subsets of the training data. Each model is validated on the remaining 20% of the data, ensuring that every sample is used for validation exactly once.

### 4\. Final Prediction: Ensembling with Majority Vote

The final prediction for each tweet in the test set was determined by a **majority vote** from the 5 models trained during the cross-validation process. This ensembling technique leverages the "wisdom of the crowd" by combining the predictions of all models, leading to a more accurate and stable final submission.

## 📊 Results Summary

  * **Average 5-Fold Validation Accuracy:** **83.61%**
  * **Final Kaggle Public Leaderboard Score:** **0.84768**
  * **Final Kaggle Rank:** **10**

## Future Improvements

While this solution achieved a top rank, further improvements could be explored:

  * **Experiment with Larger Models:** Fine-tuning a `roberta-large` model could yield further improvements, though it requires more computational resources.
  * **Advanced Ensembling:** Combining predictions from different transformer architectures (e.g., DeBERTa, BERT, RoBERTa) could create an even more powerful ensemble.
  * **Meticulous Data Cleaning:** A deeper dive into cleaning tweet-specific slang, abbreviations, and misspellings might provide a slight edge.

