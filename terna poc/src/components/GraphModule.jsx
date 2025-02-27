/*
TODO:  
- Migliorare Asse Y, i valori sono in centesimi
*/
import React, { useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Dot } from "recharts";
import { Button, ButtonGroup } from "react-bootstrap";

const threshold = 0; // Valore soglia per i punti speciali

const extractData = (key,selectedItem) => {
  console.log("selectedItem",selectedItem);
  const jsData =selectedItem;
  return jsData.map(entry => ({
    time: new Date(entry.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: entry[key] !== null ? entry[key] : null
  }));
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "white", padding: "5px", border: "1px solid #ccc" }}>
        <p><strong>Time:</strong> {payload[0].payload.time}</p>
        <p><strong>Value:</strong> {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  
  // Non mostrare il punto se il valore è nullo, garantisce grafico "spezzato"
  if (payload.value === null) {
    return null; 
  }


  const isHighlighted = payload.value <= threshold;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={isHighlighted ? 8 : 4}
      fill="green"
      stroke={isHighlighted ? "red" : "none"}
      strokeWidth={isHighlighted ? 2 : 0}
    />
  );
};

const GraphModule = ({selectedItem}) => {
  const [selectedMetric, setSelectedMetric] = useState("Frequenza");
  const chartRef = useRef(null);
  const data = extractData(selectedMetric,selectedItem);

  const toggleFullscreen = () => {
    if (chartRef.current) {
      if (!document.fullscreenElement) {
        chartRef.current.requestFullscreen().catch(err => {
          console.error("Fullscreen error:", err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return <>
    {selectedItem && selectedItem.length ? <>

    {/* DEBUG:   {JSON.stringify(selectedItem)} */}
     
    <div ref={chartRef} className="characteristics" id="graphLine">
      <div className="d-flex justify-content-between button-group-graph">
        <ButtonGroup>
          <Button size="sm" variant={selectedMetric === "Frequenza" ? "primary" : "secondary"} onClick={() => setSelectedMetric("Frequenza")}>Frequenza</Button>
          <Button size="sm" variant={selectedMetric === "Potenza_Attiva" ? "primary" : "secondary"} onClick={() => setSelectedMetric("Potenza_Attiva")}>Potenza</Button>
          <Button size="sm" variant={selectedMetric === "Tensione" ? "primary" : "secondary"} onClick={() => setSelectedMetric("Tensione")}>Tensione</Button>
          <Button size="sm" variant={selectedMetric === "Corrente" ? "primary" : "secondary"} onClick={() => setSelectedMetric("Corrente")}>Corrente</Button>
        </ButtonGroup>
        <Button size="sm" variant="outline-dark" onClick={toggleFullscreen}>Toggle Fullscreen</Button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis domain={[0, 10]} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="value" stroke="green" strokeWidth={2} dot={<CustomDot />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
      </>:<>
        {/* No Data Selected */}
      </>}
    </>
};

export default GraphModule;
