import Overall from "../components/dashboard/Overall";

import LineChart from "../components/dashboard/LineChart";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <Overall />
      <div className=" flex justify-center p-5 bg-base-100 rounded-lg shadow-md">
        <LineChart />
      </div>
    </div>
  );
};

export default Dashboard;
