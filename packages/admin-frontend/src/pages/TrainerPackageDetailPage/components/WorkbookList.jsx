import React from "react";

import WorkbookCard from "./WorkbookCard";

function WorkbookList({ workbooks, refetch }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {workbooks && workbooks.map((lesson) => (
        <WorkbookCard key={lesson.id} lesson={lesson} refetch={refetch}/>
      ))}
    </div>
  );
}

export default WorkbookList;
