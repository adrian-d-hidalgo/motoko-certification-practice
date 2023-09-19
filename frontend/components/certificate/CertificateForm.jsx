import React, { useState } from "react";
import { useCanister } from "@connect2ic/react";

const CertificateForm = () => {
  const [certificate] = useCanister("certificate");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading("Loading...");

    await certificate.createCertificate(
      e.target[0].value,
      e.target[1].value,
      e.target[2].value,
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center border mt-4 border-gray-500 p-5 space-x-2 w-96">
          <div className="flex flex-col space-y-2 w-full">
            <input
              id="student"
              placeholder="Estudiante"
              required
              className="border border-gray-500 px-2"
              type="text"
            />

            <input
              id="course"
              placeholder="Curso"
              required
              className="border border-gray-500 px-2"
              type="text"
            />

            <input
              id="instution"
              placeholder="Institución"
              required
              className="border border-gray-500 px-2"
              type="text"
            />

            <button
              type="submit"
              className="w-full p-2 rounded-sm bg-gray-950 hover:bg-gray-900 text-white text-lg font-bold"
            >
              Crear
            </button>
          </div>
        </div>
      </form>

      <p className="mx-2">{loading}</p>
    </div>
  );
};

export { CertificateForm };
