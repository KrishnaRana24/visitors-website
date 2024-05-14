"use client";
import ChartFour from "@/components/Charts/ChartFour/page";
import ChartOne from "@/components/Charts/ChartOne/page";
import ChartThree from "@/components/Charts/ChartThree/page";
import ChartTwo from "@/components/Charts/ChartTwo/page";
import DefaultLayout from "@/components/Layout/DefaultLayout";

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <ChartOne />
      <ChartTwo />
      <ChartThree />
      <ChartFour />
    </DefaultLayout>
  );
};

export default BasicChartPage;
