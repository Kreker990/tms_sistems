import React from "react";

import AudioLessonCard from "./AudioLessonCard";

function AudioLessonList({ audioLessons, refetch }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {audioLessons &&
        audioLessons.map((lesson) => (
          <AudioLessonCard key={lesson.id} lesson={lesson} refetch={refetch} />
        ))}
    </div>
  );
}

export default AudioLessonList;
