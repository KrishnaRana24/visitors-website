"use client";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import TableOne from "@/components/Tables/TableOne";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
