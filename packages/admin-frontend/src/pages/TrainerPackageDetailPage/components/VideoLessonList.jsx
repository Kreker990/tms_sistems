import React from "react";

import VideoLessonCard from "./VideoLessonCard";

function VideoLessonList({ videoLessons, refetch }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {videoLessons &&
        videoLessons.map((lesson) => (
          <VideoLessonCard key={lesson.id} lesson={lesson} refetch={refetch} />
        ))}
    </div>
  );
}

export default VideoLessonList;
