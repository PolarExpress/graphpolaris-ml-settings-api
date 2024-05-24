import { useSettings } from "@graphpolaris/vis-api/react";
import { type RawJSONSettings, default_config, themes } from "./config";

import "./App.css";

type DropdownProps = {
  key_: keyof RawJSONSettings,
  configuration: RawJSONSettings,
  values: string[],
  updateConfig: (changes: Partial<RawJSONSettings>) => void
};

function Dropdown({ key_, configuration, values, updateConfig }: DropdownProps) {
  return (
    <select id={key_} value={configuration[key_] as string} onChange={e => updateConfig({ [key_]: e.target.value as any })}>
      {values.map(val => 
        <option key={val} value={val}>{val}</option>)}
    </select>
  );
}

function Checkbox({ key_, configuration, updateConfig }: Omit<DropdownProps, "values">) {
  return (
    <input id={key_} type="checkbox" value={configuration[key_] as any} onChange={_ => updateConfig({ [key_]: !configuration[key_] })} />
  )
}

export default function RawJSONSettings() {
  const [configuration, updateConfig] = useSettings(default_config);

  if (!configuration) {
    return <h1>No configuration to show for!</h1>;
  } else {
    return (
      <div>
        <label htmlFor="theme">Select a theme</label>
        <Dropdown key_={"theme"} configuration={configuration} updateConfig={updateConfig} values={themes} /><br />
        <label htmlFor="iconStyle">Choose an icon style</label>
        <Dropdown values={['circle', 'square', 'triangle']} key_="iconStyle" configuration={configuration} updateConfig={updateConfig} /><br />
        <label htmlFor="showDataTypes">Show data types</label>
        <Checkbox key_="showDataTypes" configuration={configuration} updateConfig={updateConfig} /><br />
        <label htmlFor="showObjectSize">Show object size</label>
        <Checkbox key_="showObjectSize" configuration={configuration} updateConfig={updateConfig} /><br />
        <label htmlFor="enableClipboard">Enable clipboard:</label>
        <Checkbox key_="enableClipboard" configuration={configuration} updateConfig={updateConfig} /><br />
      </div>
    );
  }
};