#  AI Flight Delay Predictor  
A full-stack + machine learning system that predicts whether a flight will be delayed using real aviation datasets and ML models.



---

##  Project Status  
**Completed :**
- Dataset download automation (Kaggle API)
- Data cleaning pipeline (train_clean.csv)
- Feature transformation & label creation (is_delayed)
- ML model training (XGBoost)
- API development using FastAPI
- React UI for taking flight inputs and visualizing delay prediction with probability meter



---



## Data Source  
Real flight delay data is downloaded automatically using this Kaggle dataset:

**Dataset:**  
[`patrickzel/flight-delay-and-cancellation-dataset-2019-2023`](https://www.kaggle.com/datasets/patrickzel/flight-delay-and-cancellation-dataset-2019-2023)

**File:**  
`src/download_kaggle_flights.py`

---

##  Data Cleaning 

The script:


performs:

- Selecting important aviation columns  
- Converting `FL_DATE` to datetime  
- Filling missing values  
- Creating target label `is_delayed`  
- Saving cleaned dataset to `data/processed/train_clean.csv`

---
 Features

- Flight delay probability prediction
- Dynamic UI with probability meter
- Auto-distance filling from route mapping
- Airport + city dropdown selection
- Cancelled/Diverted logic handling
- Smooth UI animations & result scrolling

---

## 🖥️ Backend

Using **FastAPI**:
- `/predict` API endpoint  
- Returns delay probability & prediction  
- Connects with model.pkl  

---

## 🎨 Frontend 

Using **React**:
- Flight form  
- Prediction results  


---
Machine Learning Model

- XGBoost (best performance for tabular prediction)

Output

-Binary target: delayed or not
- Probability score 0–1
<img width="847" height="864" alt="Screenshot 2025-12-07 223016" src="https://github.com/user-attachments/assets/b98faeb4-f229-4da7-88c3-2175c4ec0a70" />
<img width="714" height="869" alt="Screenshot 2025-12-07 223248" src="https://github.com/user-attachments/assets/3717e683-8b03-4f41-b16a-b1d7e1d75b92" />
<img width="740" height="871" alt="Screenshot 2025-12-07 223348" src="https://github.com/user-attachments/assets/f0f968b2-ff1a-45fa-b923-a6c96f5ecf1e" />


