import { useEffect, useState } from 'react';

interface Data {
  key1: string;
  key2: string;
  danskebank: string;
}

const Analytics = () => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`/api/http_trigger`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Response:', response);
        const jsonData: Data = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <div className="w-full h-96 bg-base-100 rounded-lg shadow-md">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div>
            <div>{data?.key1}</div>
            <div>{data?.key2}</div>
            <div>{data?.danskebank}</div>
          </div>
        )}
      </div>
      <div className="w-full h-96 bg-base-100 rounded-lg shadow-md"></div>
      <div className="w-full h-96 bg-base-100 rounded-lg shadow-md"></div>
    </div>
  );
};

export default Analytics;
