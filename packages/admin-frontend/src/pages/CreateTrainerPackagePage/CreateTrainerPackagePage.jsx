import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import PageBase from "../../components/PageBase";

import trainerPackageService from "../../services/trainerPackage";

const CreateTrainerPackagePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(trainerPackageService.create, {
    onSuccess: (newPackage) => {
      navigate(`/package/${newPackage.id}`);
    }
  });

  const onSubmit = (submittedData) => {
    mutation.mutate(submittedData);
  };

  return (
    <PageBase>
      <div className="container mx-auto p-4">
        <a href="/" className="underline text-blue">К списку пакетов</a>
        <h2 className="text-2xl font-bold mt-8 mb-4">Новый пакет</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="icon" className="block mb-2">
              1. Загрузите иконку
            </label>
            <input
              type="file"
              {...register("icon", {
                required: "Обязательное поле",
              })}
            />
            {errors.icon && (
              <p className="text-red-500">{errors.icon.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="cover" className="block mb-2">
              2. Выберите обложку
            </label>
            <input
              type="file"
              {...register("cover", {
                required: "Обязательное поле",
              })}
            />
            {errors.cover && (
              <p className="text-red-500">{errors.cover.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="name" className="block mb-2">
              3. Название пакета
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Обязательное поле",
              })}
              className="p-2 border rounded w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block mb-2">
              4. Описание пакета
            </label>
            <textarea
              name="description"
              {...register("description", {
                required: "Обязательное поле",
              })}
              className="p-2 border rounded w-full"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Создать
          </button>
        </form>

        <div className="mt-4">
          {mutation.isLoading ? <span>Создаем...</span> : null}
          {mutation.isError ? (
            <div>Что-то пошло не так: {mutation.error.message}</div>
          ) : null}
          {mutation.isSuccess ? <div>Пакет создан.</div> : null}
        </div>
      </div>
    </PageBase>
  );
};

export default CreateTrainerPackagePage;
