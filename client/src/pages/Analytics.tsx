import { useEffect, useState } from 'react';

const Analytics = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`/api/http_trigger`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { text } = await response.json();
        setData(text);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <div className="w-full h-96 bg-base-100 rounded-lg shadow-md"></div>
      <div className="w-full h-96 bg-base-100 rounded-lg shadow-md"></div>
      <div className="w-full h-96 bg-base-100 rounded-lg shadow-md">
        {error ? <div>Error: {error}</div> : <div>{data}</div>}
      </div>
    </div>
  );
};

export default Analytics;
