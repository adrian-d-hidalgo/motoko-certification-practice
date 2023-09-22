import React, { useEffect, useState } from "react";
import { useCanister } from "@connect2ic/react";

const CertificateForm = () => {
  // Canisters
  const [certificate] = useCanister("certificate");
  const [organization] = useCanister("organization");
  const [course] = useCanister("course");

  // States
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [courses, setCourses] = useState([]);

  let form = undefined;

  useEffect(async () => {
    const [allOrgs, allCourses] = await Promise.all([
      organization.getAll(),
      course.getAll(),
    ]);
    setOrganizations(allOrgs);
    setCourses(allCourses);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await certificate.create(
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
              <select
                name="course"
                id="course"
                data-te-select-init
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 :text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              >
                <option>Selecciona un curso</option>
                {courses.map((course) => (
                  <option key={course[0]} value={course[1].name}>
                    {course[1].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="organization"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Organización
            </label>
            <div className="mt-2">
              <select
                name="organization"
                id="organization"
                data-te-select-init
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 :text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              >
                <option>Selecciona una organización</option>
                {organizations.map((org) => (
                  <option key={org[0]} value={org[1].name}>
                    {org[1].name}
                  </option>
                ))}
              </select>
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
