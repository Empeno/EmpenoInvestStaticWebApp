import AnalyticFetch from '../components/analytics/AnalyticFetch';

const Analytics = () => {
  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <AnalyticFetch />

      <div className="w-full h-96 bg-base-100 rounded-lg shadow-md"></div>
      <div className="w-full h-96 bg-base-100 rounded-lg shadow-md"></div>
    </div>
  );
};

export default Analytics;
