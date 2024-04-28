import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import trainerPackageService from "../../services/trainerPackage";
import PageBase from "../../components/PageBase";

function TrainerPackageListPage() {
  const navigate = useNavigate();
  const {
    data: packages,
    error,
    isLoading,
  } = useQuery(["trainerPackage"], trainerPackageService.fetch);

  const handlePackageClick = (id) => {
    navigate(`/package/${id}`);
  };

  return (
    <PageBase>
      <div className="flex-grow bg-gray-100">
        <div className="container mx-auto">
          <div className="py-6 flex flex-col justify-center sm:py-12">
            <div>
              <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-center text-gray-800">
                  Пакеты
                </h1>
                <button
                  onClick={() => navigate("/create")}
                  className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 active:bg-blue-700 focus:outline-none"
                >
                  Создать
                </button>
              </div>

              <div className="px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                {isLoading && (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-500"></div>
                    <p className="ml-2">Загружаем...</p>
                  </div>
                )}

                {error && (
                  <div className="text-red-500">Что-то пошло не так.</div>
                )}

                {packages && (
                  <ul>
                    {packages.map((pkg) => (
                      <li
                        key={pkg.id}
                        className="mb-4 p-4 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200"
                        onClick={() => handlePackageClick(pkg.id)}
                      >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          {pkg.name}
                        </h2>
                        <p className="text-gray-600">{pkg.description}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageBase>
  );
}

export default TrainerPackageListPage;
