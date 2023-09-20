import React, { useState } from "react";
import { useCanister } from "@connect2ic/react";

const FindCertificate = () => {
  const [certificate] = useCanister("certificate");
  const [cert, setCert] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const certificateId = event.target[0].value;

    try {
      const certFound = await certificate.getCertificate(certificateId);
      setCert(certFound[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Buscar certificado
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="certificate-id"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ID de certificado
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="certificate-id"
                  id="certificate-id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gr:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Buscar
          </button>
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
