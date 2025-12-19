//Force rebuild
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    AIRLINE: "",
    ORIGIN: "",
    ORIGIN_CITY: "",
    DEST: "",
    DEST_CITY: "",
    DEP_DELAY: "",
    CANCELLED: "",
    DIVERTED: "",
    DISTANCE: 0
  });
  
const BACKEND_URL = "https://ai-flight-delay-predictor-backend-production.up.railway.app";

  const [meta, setMeta] = useState({
    airlines: [],
    origins: [],
    destinations: [],
    origin_cities: [],
    dest_cities: [],
    route_distance: {} 
  });
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [result, setResult] = useState(null);


  useEffect(() => {
    // fetch("https://ai-flight-delay-predictor-backend-1.onrender.com/metadata")
       fetch(`${BACKEND_URL}/metadata`)
      .then(res => res.json())
      .then(data => {
        setMeta(data);
        setLoadingMeta(false);

      })
        .catch(err => console.error("Metadata load error:", err));
  }, []);


  const handleChange = (e) => {
  let updated = { ...form, [e.target.name]: e.target.value };


  if (updated.ORIGIN && updated.DEST && meta.route_distance) {
  const key = `${updated.ORIGIN},${updated.DEST}`;
  if (meta.route_distance.hasOwnProperty(key)) {
    updated.DISTANCE = meta.route_distance[key];
  }
}


  setForm(updated);
};

const predictDelay = async () => {

if (
  form.DEP_DELAY === "" ||
  form.CANCELLED === "" ||
  form.DIVERTED === ""
) {
  alert("Please fill Departure Delay, Cancelled and Diverted fields first.");
  return;
}

if (![0, 1].includes(Number(form.CANCELLED))) {
  alert("CANCELLED must be 0 or 1.");
  return;
}

if (![0, 1].includes(Number(form.DIVERTED))) {
  alert(" DIVERTED must be 0 or 1.");
  return;
}


  if (parseInt(form.CANCELLED) === 1) {
    setResult({
      special: "cancelled",
      probability: 1,
      is_delayed: 1,
      message: "This flight was cancelled — delay prediction does not apply."
    });
    return;
  }

  if (parseInt(form.DIVERTED) === 1) {
    setResult({
      special: "diverted",
      probability: 1,
      is_delayed: 1,
      message: "This flight was diverted — delay analysis is irrelevant."
    });
    return;
  }

  try {
    // const response = await fetch("https://ai-flight-delay-predictor-backend-1.onrender.com/predict", {
    const response = await fetch(`${BACKEND_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setResult(data);

  } catch (error) {
    console.error("Error:", error);
  }
};


useEffect(() => {
  if (result) {
    setTimeout(() => {
      const box = document.querySelector(".predict-result");
      if (box) {
        box.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 200);
  }
}, [result]);

  return (
    <div className="container">
      <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "400px" }}>

        <div className="title-row">
  <img src="download.png" alt="plane" className="title-icon" />
  <h2>Flight Delay Predictor</h2>
</div>


      
        <label>Airline:</label>
        <select name="AIRLINE" onChange={handleChange} disabled={loadingMeta}>
  <option value="">{loadingMeta ? "Loading..." : "Select Airline"}</option>
  {meta.airlines?.map((d, index) => (
    <option key={index}>{d}</option>
  ))}
</select>

        <br /><br />

    

       

      
        <label>Origin:</label>
       <select name="ORIGIN" onChange={handleChange} disabled={loadingMeta}>
  <option value="">
    {loadingMeta ? "Loading..." : "Select Origin City"}
  </option>
  {meta.origins?.map((code, index) => (
    <option key={index} value={code}>
      {code} — {meta.origin_cities[index] ?? "City Not Listed"}
    </option>
  ))}
</select>


        <br /><br />

        
        <label>Destination:</label>
<select name="DEST" onChange={handleChange} disabled={loadingMeta}>
  <option value="">
    {loadingMeta ? "Loading..." : "Select Destination City"}
  </option>
  {meta.destinations?.map((code, index) => (
    <option key={index} value={code}>
      {code} — {meta.dest_cities[index] ?? "City Not Listed"}
    </option>
  ))}
</select>


        <br /><br />

       
        <label>Departure Delay (minutes):</label>
        <input name="DEP_DELAY" type="number" onChange={handleChange} />
        <br /><br />

        <label>Cancelled (0 / 1):</label>
          <select name="CANCELLED" onChange={handleChange}>
          <option value="">Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>        <br /><br />

        <label>Diverted (0 / 1):</label>
          <select name="DIVERTED" onChange={handleChange}>
          <option value="">Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>        <br /><br />

        <label>Distance (miles):</label>
<input name="DISTANCE" type="number" value={form.DISTANCE} readOnly />
        <br /><br />

        <button onClick={predictDelay}>Predict Delay</button>

        <div className="result-card">
          {result && (
            <div className="predict-result" style={{ marginTop: "20px" }}>
              <h3>Prediction Result</h3>

              <p>
  Status:  
  {result?.special === "cancelled"
    ? " Flight Cancelled"
    : result?.special === "diverted"
    ? " Flight Diverted Mid-Route"
    : result.is_delayed === 1
    ? "Yes  (Delayed)"
    : "The flight is on time."}
</p>
{result?.special === "cancelled" && (
  <p style={{color:"red"}}>
    This flight did not operate. A cancelled flight represents 100% operational failure.
  </p>
)}

{result?.special === "diverted" && (
  <p style={{color:"orange"}}>
    This flight was diverted mid-route — indicating major operational disruption.
  </p>
)}


              <p>
                Probability:{" "}
                {result?.probability !== undefined
                  ? result.probability.toFixed(2)
                  : "N/A"}
              </p>

           
              <div className="meter">
                <div
                  className="meter-fill"
                  style={{
                    width: `${((result?.probability ?? 0) * 100).toFixed(0)}%`,
                    backgroundColor:
                      result?.probability < 0.3
                        ? "green"
                        : result?.probability < 0.7
                        ? "orange"
                        : "red",
                  }}
                ></div>
              </div>

              <p>
                Risk Level:{" "}
                {result?.probability < 0.3
                  ? "Low"
                  : result?.probability < 0.7
                  ? "Medium"
                  : "High"}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
