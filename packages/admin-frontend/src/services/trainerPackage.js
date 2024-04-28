/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from "./http";
import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;

const create = async (submittedData) => {
  const formData = new FormData();

  Object.keys(submittedData).forEach((key) => {
    if (key !== "icon" && key !== "cover") {
      formData.append(key, submittedData[key]);
    }
  });

  if (submittedData.icon[0]) {
    formData.append("icon", submittedData.icon[0]);
  }
  if (submittedData.cover[0]) {
    formData.append("cover", submittedData.cover[0]);
  }

  const response = await apiClient.post(
    `${API_BASE_URL}/trainer/package`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const fetch = async ({ id }) => {
  try {
    const withId = id ? `/${id}` : "";
    const response = await apiClient.get(
      `${API_BASE_URL}/trainer/package${withId}`
    );
    return response.data;
  } catch (err) {
    console.log(JSON.stringify(err));
    throw err;
  }
};

const getPresignedUploadUrl = async ({ trainerPackageId }) => {
  try {
    const response = await apiClient.get(
      `${API_BASE_URL}/trainer/package/${trainerPackageId}/videoLesson/upload-link`
    );
    return {
      presignedUploadUrl: response.data.preSignedUrl,
      videoKey: response.data.videoKey,
    };
  } catch (err) {
    console.log(JSON.stringify(err));
    throw err;
  }
};

const uploadFile = async ({ presignedUploadUrl, file }) => {
  const uploadResponse = await axios.request({
    url: presignedUploadUrl,
    method: "PUT",
    data: file,
    headers: {
      "Content-Type": file.type,
    },
  });
  if (!uploadResponse.status === 200) {
    console.log("Upload response:", uploadResponse);
    throw new Error("Failed to upload video");
  }
};

const getPresignedAudioUploadUrl = async ({ trainerPackageId }) => {
  try {
    const response = await apiClient.get(
      `${API_BASE_URL}/trainer/package/${trainerPackageId}/audioLesson/upload-link`
    );
    return {
      presignedUploadUrl: response.data.preSignedUrl,
      audioKey: response.data.audioKey,
    };
  } catch (err) {
    console.log(JSON.stringify(err));
    throw err;
  }
};

const getPresignedWorkbookUploadUrl = async ({ trainerPackageId }) => {
  try {
    const response = await apiClient.get(
      `${API_BASE_URL}/trainer/package/${trainerPackageId}/workbook/upload-link`
    );
    return {
      presignedUploadUrl: response.data.preSignedUrl,
      workbookKey: response.data.workbookKey,
    };
  } catch (err) {
    console.log(JSON.stringify(err));
    throw err;
  }
};

const confirmUpload = async ({
  trainerPackageId,
  videoKey,
  thumbnail,
  name,
  shortDescription,
  duration,
}) => {
  const formData = new FormData();

  formData.append("thumbnail", thumbnail);
  formData.append("videoKey", videoKey);
  formData.append("name", name);
  formData.append("shortDescription", shortDescription);
  formData.append("duration", duration);

  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/trainer/package/${trainerPackageId}/videoLesson`,
      formData
    );
    return response.data;
  } catch (err) {
    console.log(JSON.stringify(err));
    throw err;
  }
};

const confirmAudioUpload = async ({
  trainerPackageId,
  audioKey,
  name,
  shortDescription,
  notes,
}) => {
  const formData = new FormData();

  formData.append("notes", notes);
  formData.append("audioKey", audioKey);
  formData.append("name", name);
  formData.append("shortDescription", shortDescription);

  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/trainer/package/${trainerPackageId}/audioLesson`,
      formData
    );
    return response.data;
  } catch (err) {
    console.log(JSON.stringify(err));
    throw err;
  }
};

const confirmWorkbookUpload = async ({
  trainerPackageId,
  workbookKey,
  shortDescription,
}) => {
  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/trainer/package/${trainerPackageId}/workbook`,
      {
        workbookKey,
        shortDescription
      }
    );
    return response.data;
  } catch (err) {
    console.log(JSON.stringify(err));
    throw err;
  }
};

const getVideoDuration = (file) =>
  new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const media = document.createElement("video");

    media.src = objectUrl;
    console.log("media", media);

    media.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl); // Clean up the object URL
      resolve(media.duration);
    };

    media.onerror = (e) => {
      URL.revokeObjectURL(objectUrl); // Clean up the object URL
      reject("Error loading video: " + e.target.error);
    };

    media.load(); // Ensure the video starts loading its metadata
  });

const createVideoLesson = async ({
  trainerPackageId,
  name,
  shortDescription,
  files,
}) => {
  const duration = await getVideoDuration(files.video);
  const { presignedUploadUrl, videoKey } = await getPresignedUploadUrl({
    trainerPackageId,
  });
  await uploadFile({
    presignedUploadUrl,
    file: files.video,
  });
  await confirmUpload({
    trainerPackageId,
    videoKey,
    thumbnail: files.thumbnail,
    name,
    shortDescription,
    duration,
  });
};

const createAudioLesson = async ({
  trainerPackageId,
  name,
  shortDescription,
  files,
}) => {
  const { presignedUploadUrl, audioKey } = await getPresignedAudioUploadUrl({
    trainerPackageId,
  });
  await uploadFile({
    presignedUploadUrl,
    file: files.audio,
  });
  await confirmAudioUpload({
    trainerPackageId,
    audioKey,
    name,
    shortDescription,
    notes: files.notes,
  });
};

const createWorkbook = async ({
  trainerPackageId,
  shortDescription,
  workbookPdf,
}) => {
  const { presignedUploadUrl, workbookKey } =
    await getPresignedWorkbookUploadUrl({
      trainerPackageId,
    });
  console.log({ presignedUploadUrl, workbookKey });
  await uploadFile({
    presignedUploadUrl,
    file: workbookPdf,
  });
  await confirmWorkbookUpload({
    trainerPackageId,
    workbookKey,
    shortDescription,
  });
};

// запросы на удаление видео, аудио урока и тетрадей
const deleteVideoLesson = async ({
  trainerPackageId,
  videoLessonId,
  key
}) => {
  console.log(trainerPackageId, videoLessonId, key)
  try {
    const response = await apiClient.delete(
      `${API_BASE_URL}/trainer/package/${trainerPackageId}/videoLesson/${videoLessonId}`,
      { data: { key: key } }
    );
    return response.data;
  } catch (err) {
    console.log(JSON.stringify(err));
    throw err;
  }
};

const deleteAudioLesson = async ({
  trainerPackageId,
  audioLessonId,
  key
}) => {
  console.log(trainerPackageId, audioLessonId, key)
  try {
    const response = await apiClient.delete(
      `${API_BASE_URL}/trainer/package/${trainerPackageId}/audioLesson/${audioLessonId}`,
      { data: { key: key } }
    );
    return response.data;
  } catch (err) {
    console.log(JSON.stringify(err));
    throw err;
  }
};

const deleteWorkbookLesson = async ({
  trainerPackageId,
  workbookLessonId,
  key
}) => {
  console.log(trainerPackageId, workbookLessonId, key)
  try {
    const response = await apiClient.delete(
      `${API_BASE_URL}/trainer/package/${trainerPackageId}/workbook/${workbookLessonId}`,
      { data: { key: key } }
    );
    return response.data;
  } catch (err) {
    console.log(JSON.stringify(err));
    throw err;
  }
};

export default {
  create,
  fetch,
  createVideoLesson,
  createAudioLesson,
  createWorkbook,
  deleteVideoLesson,
  deleteAudioLesson,
  deleteWorkbookLesson
};
