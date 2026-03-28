import { useState } from "react";

export default function UploadGraph({ setGraph, setPredictions }) {
  const [fileName, setFileName] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const json = JSON.parse(event.target.result);
      setGraph(json);
      setPredictions(null);
      setFileName(file.name);
    };
    reader.readAsText(file);
  };

  return (
    <div className={`upload-area ${fileName ? "has-file" : ""}`}>
      <input type="file" accept=".json" onChange={handleUpload} />
      <span className="upload-icon">{fileName ? "✅" : "📂"}</span>
      <div className="upload-title">
        {fileName ? "File loaded" : "Upload graph JSON"}
      </div>
      {fileName ? (
        <div className="upload-filename">{fileName}</div>
      ) : (
        <div className="upload-subtitle">Click or drag &amp; drop a .json file</div>
      )}
    </div>
  );
}
