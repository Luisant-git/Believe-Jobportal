import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-payment";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Payment || Believe Jobs",
  description: "Believe Jobs",
};

export default function PaymentList() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
