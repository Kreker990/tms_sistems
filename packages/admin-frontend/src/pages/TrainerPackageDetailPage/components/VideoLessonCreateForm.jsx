import React from "react";

import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import trainerPackageService from "../../../services/trainerPackage";

function VideoLessonCreateForm({ onCreate }) {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation(trainerPackageService.createVideoLesson, {
    onSuccess: () => {
      console.log("Video lesson created successfully");
      onCreate();
      reset();
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate({
      trainerPackageId: id,
      name: data.name,
      shortDescription: data.shortDescription,
      files: {
        video: data.video[0],
        thumbnail: data.thumbnail[0],
      },
    });
  };
  return (
    <div className="relative border p-6 rounded-lg shadow-lg">
      {mutation.isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center">
          Видео загружается...
        </div>
      )}
      <h3 className="text-xl font-medium mb-4">Загрузить видео урок</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            1. Название урока:
          </label>
          <input
            {...register("name", { required: "Обязательное поле" })}
            className="mt-2 p-2 border rounded-md w-full"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            2. Краткое описание
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
            3. Выберите видео:
          </label>
          <input
            type="file"
            {...register("video", { required: "Обязательное поле" })}
            className="mt-2 p-2 border rounded-md w-full"
          />
          {errors.video && (
            <span className="text-red-500 text-xs">{errors.video.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            4. Выберите обложку видео
          </label>
          <input
            type="file"
            {...register("thumbnail", { required: "Обязательное поле" })}
            className="mt-2 p-2 border rounded-md w-full"
          />
          {errors.thumbnail && (
            <span className="text-red-500 text-xs">
              {errors.thumbnail.message}
            </span>
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

export default VideoLessonCreateForm;
