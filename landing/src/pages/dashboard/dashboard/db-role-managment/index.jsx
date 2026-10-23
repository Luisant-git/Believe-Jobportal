import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-role-managment";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Admin/Super Admin Management || Believe Jobs",
  description: "Believe Jobs",
};

export default function AdminSuperAdminManagementPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
