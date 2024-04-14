import { useEffect, useRef, useState } from "react";
import { uploadFile } from "./services/api";

function App() {
  const fileRef = useRef();
  const [file, setFile] = useState(null);

  const setFiles = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        try {
          const res = await uploadFile(data);
          console.log(res);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };
    getImage();
  }, [file]);

  function onUploadClick() {
    fileRef.current.click();
  }

  return (
    <>
      <div className="h-screen bg-blue-500 flex flex-col items-center justify-center">
        Enter your File <br />
        <input onChange={(e) => setFiles(e)} ref={fileRef} className="hidden" type="file" name="file" /> <br />
        <button className="border w-1/5 border-white p-2" onClick={() => onUploadClick()}>
          Upload
        </button>
      </div>
    </>
  );
}

export default App;
