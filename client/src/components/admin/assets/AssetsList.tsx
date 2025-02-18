import { useState, useEffect } from 'react';

interface Stock {
  gak: number;
  name: string;
  numberOfShares: number;
  returnPercent: number;
  returnInDkk: number;
  sharePrice: number;
  valueDKK: number;
  percentage: number;
}

const AssetsList = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(
          'https://func-empeno-invest.azurewebsites.net/api/GetStocks',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stocks');
        }
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Number of Shares</th>
            <th>Share Price</th>
            <th>Value (DKK)</th>
            <th>Return (%)</th>
            <th>Return (DKK)</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            stocks.map((stock, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{stock.name}</td>
                <td>{stock.numberOfShares}</td>
                <td>{stock.sharePrice}</td>
                <td>{stock.valueDKK}</td>
                <td>{stock.returnPercent.toFixed(2)}</td>
                <td>{stock.returnInDkk}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsList;
