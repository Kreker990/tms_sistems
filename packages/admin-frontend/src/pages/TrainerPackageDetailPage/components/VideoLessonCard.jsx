import React, { useState } from "react";
import trainerPackage from "../../../services/trainerPackage";
import { useMutation } from "@tanstack/react-query";


function VideoLessonCard({ lesson, refetch }) {
  const [visible, setvisible] = useState(true)
  const {
    mutate: deleteVideoLesson,
    isLoading,
  } = useMutation(
    () => trainerPackage.deleteVideoLesson({
      trainerPackageId: lesson.trainerPackageId,
      videoLessonId: lesson.id,
      key: lesson.key
    }), {
    onSuccess: () => {
      console.log('good')
      setvisible(false)
      refetch();
    }
  }
  );

  const handleDelete = () => {
    deleteVideoLesson();
  };
  return (
    <div className="relative border p-4 rounded-lg shadow-lg" style={{ display: visible ? 'block' : 'none' }}>
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center">
          Видео удаляется...
        </div>
      )}
      <h3 className="text-lg font-medium mb-4">{lesson.name}</h3>
      <p>{lesson.shortDescription}</p>
      <p className="mt-2">
        Видео:{" "}
        <a className="text-blue-500 underline break-words" href={lesson.url} target="blank">
          {lesson.url}
        </a>
      </p>
      <img
        className="mt-4 w-full aspect-video object-cover rounded-md"
        src={lesson.thumbnailUrl}
        alt="Thumbnail"
      />
      <button
        onClick={handleDelete}
        className="float-right inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-105 mt-5"
      >
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        Удалить
      </button>
    </div>
  );
}

export default VideoLessonCard;
