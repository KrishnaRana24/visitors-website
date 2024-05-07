"use client";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import ChartThree from "../../components/Charts/chartThree/page";
import ChartOne from "@/components/Charts/chartOne/page";
import ChartTwo from "@/components/Charts/chartTwo/page";

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <ChartOne />
      <ChartTwo />
      <ChartThree />
    </DefaultLayout>
  );
};

export default BasicChartPage;
