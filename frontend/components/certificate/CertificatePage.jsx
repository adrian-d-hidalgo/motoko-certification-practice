import React from "react";
import { useConnect } from "@connect2ic/react";

import { CertificateForm } from "./CertificateForm";
import { FindCertificate } from "./FindCertificate";

const CertificatePage = () => {
  const { principal } = useConnect();

  return (
    <div className="flex items-center justify-center flex-col p-4 w-full">
      {/* <h1 className="h1 text-center border-b border-gray-500 pb-2">
        Hi{" "}
        {principal ? principal : ", connect with Internet Identity to continue"}
        !
      </h1> */}

      {/* Create certificate section */}
      <div className="mt-4 space-y-2 w-96">
        <CertificateForm />
      </div>

      {/* Certificate section */}
      <div className="mt-4 space-y-2 w-96">
        <FindCertificate />
      </div>
    </div>
  );
};

export { CertificatePage };
