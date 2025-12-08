AI Flight Delay Predictor — Frontend (React UI)

This repository contains the user interface for the AI Flight Delay Prediction system.

Users can:

- Select airline, origin, destination
- Auto-detect route distance
- Enter flight delay conditions
- Get AI prediction + risk level meter
---


 Features

- Select airport + city mapping
- Smart dropdown auto-fill distance
- Predict button with scroll-to-results
- Probability meter (green → orange → red)
- Risk interpretation text
- Professional aviation-style UI


Backend repo link ↓
👉 https://github.com/IshaKumari22/ai-flight-delay-predictor-backend

---

How to Run Frontend Locally
Step 1 — Install dependencies
npm install

Step 2 — Start development server
npm start


Frontend runs at:

➡ http://localhost:3000



## Data Source  
Real flight delay data is downloaded automatically using this Kaggle dataset:

**Dataset:**  
[`patrickzel/flight-delay-and-cancellation-dataset-2019-2023`](https://www.kaggle.com/datasets/patrickzel/flight-delay-and-cancellation-dataset-2019-2023)






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


