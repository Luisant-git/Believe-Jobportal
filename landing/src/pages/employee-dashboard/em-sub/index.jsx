import React from "react";
import DashboardPage from "../../../components/dashboard/dashboard/em-sub";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Subscription || Believe Jobs ",
  description: "Believe Jobs",
};

export default function SubList() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
