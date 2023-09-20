import React, { useState } from "react";
import { useCanister } from "@connect2ic/react";

const CertificateForm = () => {
  const [certificate] = useCanister("certificate");
  const [loading, setLoading] = useState(false);
  let form = undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await certificate.createCertificate(
        e.target[0].value,
        e.target[1].value,
        e.target[2].value,
      );
      setLoading(false);
      // form.reset(); //TODO: Fix this error
      alert("Certificado registrado con ID: " + response);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={(el) => (form = el)}>
      <div className="space-y-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Registro de certificado
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="student"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Estudiante
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="student"
                id="student"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 :text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="course"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Curso
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="course"
                id="course"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 :text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="instution"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Institución
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="institution"
                id="instution"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 :text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => form.reset()}
        >
          Limpiar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Registrar
        </button>
      </div>
      <p className="mx-2">{loading && "Loading..."}</p>
    </form>
  );
};

export { CertificateForm };
