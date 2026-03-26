export default function UploadGraph({ setGraph }) {
    const handleUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const json = JSON.parse(event.target.result);
        setGraph(json);
      };
  
      reader.readAsText(file);
    };
  
    return (
      <div>
        <input type="file" accept=".json" onChange={handleUpload} />
      </div>
    );
  }