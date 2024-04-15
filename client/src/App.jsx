import { useEffect, useRef, useState } from "react";
import { BACKEND_URI, getAllFiles, uploadFile } from "./services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [allFiles, setAllFiles] = useState([]);


  const setFiles = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };


  useEffect(() => {
    getAllFiles().then((data) => {
      setAllFiles(data)
    })
  }, [ allFiles ])
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        toast.success("File Added")
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
        <h1 className="text-4xl">
          Enter your File
        </h1>
        <br />
        <input onChange={(e) => setFiles(e)} ref={fileRef} className="hidden" type="file" name="file" /> <br />
        <button className="border w-1/5 border-white p-2" onClick={() => onUploadClick()}>
          Upload
        </button>
        <div>
          <h1 className="mt-8 text-4xl">
            All Files
          </h1>
          {allFiles.map((m, i) => (
            <div key={i}>
              Name : {m.id} <br />
              Id:{m.name} <br />
              <a href={`${BACKEND_URI}/download/${m.id}`}  >Download </a>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        className="custom-toast"
        toastClassName="toastify"
      />
    </>
  );
}

export default App;
