import { useSettings } from "@graphpolaris/vis-api/react";
import { type LinkPredictionSettings, default_config } from "./config";
import "./App.css";

// Define a Slider component for reuse
function Slider({ id, value, onMouseUp, min, max, step }) {
  return (
    <input
      type="range"
      id={id}
      value={value}
      onMouseUp={onMouseUp}
      min={min}
      max={max}
      step={step}
      style={{ width: '100%' }} // Stretch the slider to fill container width
    />
  );
}

export default function LinkPredictionSettings() {
  const [configuration, updateConfig] = useSettings(default_config);

  if (!configuration) {
    return <h1>No configuration to show for!</h1>;
  } 
  else {
    const handleJaccardThresholdChange = (event) => {
      const value = parseFloat(event.target.value);
      if(value >= 0 && value <= 1) {
        updateConfig({ jaccardthreshold: value });
      }
    };

    return (
      <div>
        <label htmlFor="jaccardThreshold">Jaccard Threshold:</label>
        <Slider
          id="jaccardThreshold"
          value={configuration.jaccardthreshold}
          onMouseUp={handleJaccardThresholdChange}
          min="0"
          max="1"
          step="0.01"
        /><br />
      </div>
    );
  }
};