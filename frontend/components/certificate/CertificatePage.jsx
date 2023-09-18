import React, { useEffect, useState } from "react";
import { useCanister, useConnect } from "@connect2ic/react";

import { CertificateForm } from "./CertificateForm";
// import { CertificateItem } from "./CertificateItem";

const CertificatePage = () => {
  const [certificate] = useCanister("certificate");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState("");

  const { principal } = useConnect();

  useEffect(() => {
    refreshCertificates(); // Llama a refreshCertificates cuando el componente se monta
  }, []);

  const refreshCertificates = async () => {
    setLoading("Loading...");
    try {
      const result = await certificate.getCertificates();
      setCertificates(result.sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
      setLoading("Done");
    } catch (e) {
      console.log(e);
      setLoading("Error happened fetching certificate list");
    }
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
      <CertificateForm />

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

export { CertificatePage };
