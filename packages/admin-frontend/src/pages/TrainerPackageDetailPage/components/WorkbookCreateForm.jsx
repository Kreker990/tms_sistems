import React from "react";

import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import trainerPackageService from "../../../services/trainerPackage";

function WorkbookCreateForm({ onCreate }) {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation(trainerPackageService.createWorkbook, {
    onSuccess: () => {
      console.log("Workbook created successfully");
      onCreate();
      reset();
    },
  });

  const onSubmit = async (data) => {
    console.log('data', data);
    mutation.mutate({
      trainerPackageId: id,
      shortDescription: data.shortDescription,
      workbookPdf: data.workbookPdf[0],
    });
  };
  return (
    <div className="relative border p-6 rounded-lg shadow-lg">
      {mutation.isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center">
          Тетрадь загружается...
        </div>
      )}
      <h3 className="text-xl font-medium mb-4">Загрузить тетрадь</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            1. Краткое описание тетради
          </label>
          <textarea
            {...register("shortDescription", {
              required: "Обязательное поле",
            })}
            className="mt-2 p-2 border rounded-md w-full"
          ></textarea>
          {errors.shortDescription && (
            <span className="text-red-500 text-xs">
              {errors.shortDescription.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            2. Выберите PDF файл:
          </label>
          <input
            type="file"
            {...register("workbookPdf", { required: "Обязательное поле" })}
            className="mt-2 p-2 border rounded-md w-full"
          />
          {errors.workbookPdf && (
            <span className="text-red-500 text-xs">{errors.workbookPdf.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Загрузить
        </button>
      </form>
    </div>
  );
}

export default WorkbookCreateForm;
