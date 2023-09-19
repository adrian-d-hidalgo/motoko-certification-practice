import React, { useState } from "react";
import { useCanister } from "@connect2ic/react";

const FindCertificate = () => {
  const [certificate] = useCanister("certificate");
  const [cert, setCert] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const certificateId = event.target[0].value;

    try {
      const certFound = await certificate.getCertificate(certificateId);
      setCert(certFound[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center border mt-4 border-gray-500 p-5 space-x-2 w-96">
          <div className="flex flex-col space-y-2 w-full">
            <input
              id="certificate-id"
              placeholder="ID de certificado"
              required
              className="border border-gray-500 px-2"
              type="text"
            />
            <button className="w-full bg-gray-950 hover:bg-gray-900 text-white p-2 font-bold">
              Buscar
            </button>
          </div>
        </div>
      </form>
      <div>
        {cert && (
          <div>
            <p>
              <strong>Estudiante</strong>: {cert.student}
            </p>
            <p>
              <strong>Curso</strong>: {cert.course}
            </p>
            <p>
              <strong>Instutición</strong>: {cert.institution}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { FindCertificate };
