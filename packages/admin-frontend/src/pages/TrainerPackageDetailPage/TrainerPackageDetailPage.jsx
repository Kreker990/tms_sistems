import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import trainerPackageService from "../../services/trainerPackage";
import PageBase from "../../components/PageBase";

import VideoLessonList from "./components/VideoLessonList";
import VideoLessonCreateForm from "./components/VideoLessonCreateForm";
import AudioLessonList from "./components/AudioLessonList";
import AudioLessonCreateForm from "./components/AudioLessonCreateForm";
import WorkbookList from "./components/WorkbookList";
import WorkbookCreateForm from "./components/WorkbookCreateForm";

function TrainerPackageDetailPage() {
  const { id } = useParams();

  const {
    data: packageDetail,
    error,
    isLoading,
    refetch,
  } = useQuery(["trainerPackage", id], () =>
    trainerPackageService.fetch({ id })
  );

  const {
    VideoLessons: videoLessons,
    AudioLessons: audioLessons,
    Workbooks: workbooks,
  } = packageDetail || {};

  if (isLoading) {
    return (
      <PageBase>
        <div className="flex-grow bg-gray-100">
          <div className="container mx-auto"></div>
          <p>Загружаем...</p>
        </div>
      </PageBase>
    );
  }

  if (error) {
    return (
      <PageBase>
        <div className="flex-grow bg-gray-100">
          <div className="container mx-auto"></div>
          <p>Что-то пошло не так.</p>
        </div>
      </PageBase>
    );
  }

  return (
    <PageBase>
      <div className="flex-grow bg-gray-100">
        <div className="container mx-auto">
          <div className="py-6 flex flex-col justify-center sm:py-12">
            <span className="mb-8">
              <a href="/" className="underline text-blue mt-4">
                К списку пакетов
              </a>
            </span>
            <h1 className="text-3xl font-bold mb-4">{packageDetail.name}</h1>
            <p className="text-gray-700 mb-6">{packageDetail.description}</p>

            <div className="flex space-x-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Обложка</h2>
                <img
                  src={packageDetail.coverUrl}
                  alt="Package Cover"
                  className="w-72 rounded shadow-md"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Иконка</h2>
                <img
                  src={packageDetail.iconUrl}
                  alt="Package Icon"
                  className="w-32 h-32 rounded-full shadow-md"
                />
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Видео-уроки</h2>
              <VideoLessonList videoLessons={videoLessons} refetch={refetch}/>

              <VideoLessonCreateForm onCreate={refetch} />
            </div>

            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Аудио-уроки</h2>
              <AudioLessonList audioLessons={audioLessons} refetch={refetch}/>

              <AudioLessonCreateForm onCreate={refetch} />
            </div>

            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Тетради</h2>
              <WorkbookList workbooks={workbooks} refetch={refetch}/>

              <WorkbookCreateForm onCreate={refetch} />
            </div>
          </div>
        </div>
      </div>
    </PageBase>
  );
}

export default TrainerPackageDetailPage;
