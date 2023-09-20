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
    <form onSubmit={handleSubmit}>
      <div class="space-y-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Registro de certificado
        </h2>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-6">
            <label
              for="student"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Estudiante
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="student"
                id="student"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder
                required
              />
            </div>
          </div>

          <div class="sm:col-span-6">
            <label
              for="course"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Curso
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="course"
                id="course"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder
                required
              />
            </div>
          </div>

          <div class="sm:col-span-6">
            <label
              for="instution"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Institución
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="institution"
                id="instution"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        {/* <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button> */}
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Registrar
        </button>
      </div>
      <p className="mx-2">{loading}</p>
    </form>
  );
};

export { CertificateForm };
