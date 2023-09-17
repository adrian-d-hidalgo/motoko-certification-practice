import React, { useEffect, useState } from "react";
import { useCanister, useConnect } from "@connect2ic/react";
import { useDropzone } from "react-dropzone";

// import { CertificateItem } from "./CertificateItem";

const IcpCertificate = () => {
  const [certificate] = useCanister("certificate");

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState("");
  const [file, setFile] = useState(null);

  const { principal } = useConnect();

  useEffect(() => {
    refreshCertificates(); // Llama a refreshCertificates cuando el componente se monta
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        try {
          const firstFile = acceptedFiles[0];
          const newFile = await resizeImage(firstFile, ImageMaxWidth);
          setFile(newFile);
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  const refreshCertificates = async () => {
    setLoading("Loading...");
    try {
      const result = await certificate.getCertificates();
      setCertificates(result.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))); // Ordenar posts por ID
      setLoading("Done");
    } catch (e) {
      console.log(e);
      setLoading("Error happened fetching certificate list");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file == null) {
      return;
    }

    setLoading("Loading...");
    const fileArray = await fileToCanisterBinaryStoreFormat(file);

    await certificate.createCertificate(e.target[0].value, fileArray);
    await refreshCertificates();
  };

  const handleRefresh = async () => {
    await refreshCertificates();
  };

  return (
    <div className="flex items-center justify-center flex-col p-4 w-full">
      <h1 className="h1 text-center border-b border-gray-500 pb-2">
        Hi{" "}
        {principal ? principal : ", connect with Internet Identity to continue"}
        !
      </h1>
      {/* Create certificate section */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center border mt-4 border-gray-500 p-5 space-x-2 w-96">
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="message">What are you thinking about?</label>
            <input
              id="message"
              required
              className="border border-gray-500 px-2"
              type="text"
            />
            <button
              className="w-full"
              {...getRootProps({ className: "dropzone" })}
            >
              <p className="bg-gray-950 hover:bg-gray-900 text-white p-2">
                Pick an image
              </p>
              <input required {...getInputProps()} />
            </button>
            <p className="mt-2 border-b border-gray-500">
              {file ? file.name : "No file selected"}
            </p>
            <button
              type="submit"
              className="w-full p-2 rounded-sm bg-gray-950 hover:bg-gray-900 text-white text-lg font-bold"
            >
              Create
            </button>
          </div>
        </div>
      </form>

      <p className="mx-2">{loading}</p>

      {/* Certificate section */}
      <div className="mt-4 space-y-2 w-96">
        <h2 className="h2 font-bold text-xl text-start">Certificates</h2>
        <button
          className="w-full bg-gray-950 hover:bg-gray-900 text-white p-2 font-bold"
          onClick={handleRefresh}
        >
          Refresh
        </button>
        {/* {certificates.map((cert) => 
          <CertificateItem
            key={cert[0]}
            certificate={cert}
            refresh={handleRefresh}
          />
        )} */}
      </div>
    </div>
  );
};

export { IcpCertificate };
