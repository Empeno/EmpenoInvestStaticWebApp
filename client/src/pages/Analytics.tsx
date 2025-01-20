import { useEffect, useState } from 'react';

interface PortfolioItem {
  stock: string;
  ticker: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}

interface Data {
  name: string;
  email: string;
  portfolio: PortfolioItem[];
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

        const jsonData = await response.json();
        console.log('Fetched Data:', jsonData);

        setData({
          name: jsonData.user.name,
          email: jsonData.user.email,
          portfolio: jsonData.user.portfolio,
        });
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
          <div className="p-3">
            <div>{data?.name}</div>
            <div>{data?.email}</div>
            <div>
              <h3>Portfolio:</h3>
              {data?.portfolio.map((item, index) => (
                <div key={index}>
                  <div>Stock: {item.stock}</div>
                  <div>Ticker: {item.ticker}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>Purchase Price: {item.purchasePrice}</div>
                  <div>Current Price: {item.currentPrice}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-96 bg-base-100 rounded-lg shadow-md"></div>
      <div className="w-full h-96 bg-base-100 rounded-lg shadow-md"></div>
    </div>
  );
};

export default Analytics;
