import { useState, useEffect } from 'react';

import AssetUpdate from './AssetUpdate';
import { MdArrowForwardIos } from 'react-icons/md';

interface Stock {
  stockId: string;
  name: string;
  ticker: string;
  quantity: number;
  price: number;
  industryId: string;
}

const Assets = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStockId, setSelectedStockId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('/data-api/rest/Stocks');

        if (!response.ok) {
          throw new Error(`Failed to fetch stocks: ${response.statusText}`);
        }

        const data = await response.json();

        const formattedData = data.value.map((stock: any) => ({
          stockId: stock.StockId,
          name: stock.Name,
          ticker: stock.Ticker,
          quantity: stock.Quantity,
          price: stock.Price,
          industryId: stock.IndustryId,
        }));

        setStocks(formattedData);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleUpdateClick = (stockId: string) => {
    setSelectedStockId(stockId);
  };

  const handleBack = () => {
    setSelectedStockId(null);
  };

  if (selectedStockId) {
    return <AssetUpdate stockId={selectedStockId} onBack={handleBack} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Ticker</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={5}
                className="text-center flex items-center justify-center gap-3"
              >
                <span className="loading loading-spinner loading-md"></span>
                <span>Loading data...</span>
              </td>
            </tr>
          ) : (
            stocks.map((stock, index) => (
              <tr
                key={stock.stockId || index}
                className={index % 2 === 0 ? 'bg-base-200' : ''}
              >
                <th>{index + 1}</th>
                <td>{stock.name}</td>
                <td>{stock.ticker}</td>
                <td>{stock.quantity}</td>
                <td>{stock.price} DKK</td>
                <td>
                  <button
                    className="btn btn-square btn-sm btn-neutral"
                    onClick={() => handleUpdateClick(stock.stockId)}
                  >
                    <MdArrowForwardIos />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Assets;
