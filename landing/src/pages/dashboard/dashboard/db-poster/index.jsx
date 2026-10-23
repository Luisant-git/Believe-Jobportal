import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-poster";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Poster || Believe Jobs",
  description: "Believe Jobs",
};

export default function PosterPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
