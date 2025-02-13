import { useState, useEffect } from 'react';
import SelectIndustry from '../upload/SelectIndustry';
import { MdArrowBackIos } from 'react-icons/md';

interface Stock {
  stockId: string;
  name: string;
  ticker: string;
  quantity: number;
  price: number;
  industryId: string;
}

interface Industry {
  Id: string;
  Name: string;
  Description: string;
}

interface AssetUpdateProps {
  stockId: string;
  onBack: () => void;
}

const AssetUpdate = ({ stockId, onBack }: AssetUpdateProps) => {
  const [stock, setStock] = useState<Stock | null>(null);
  const [stockName, setStockName] = useState('');
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | null>(
    null,
  );
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch(
          `/data-api/rest/Stocks/StockId/${stockId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch stock: ${response.status} - ${errorText}`,
          );
        }

        const data = await response.json();

        if (!data.value || data.value.length === 0) {
          throw new Error('Stock data is empty');
        }

        const stockData = data.value[0];

        setStock(stockData);
        setStockName(stockData.Name);
        setTicker(stockData.Ticker);
        setQuantity(stockData.Quantity || '');
        setPrice(stockData.Price || '');
        setSelectedIndustryId(stockData.IndustryId);
      } catch (error) {
        console.error('❌ Error fetching stock:', error);
        setError('Failed to fetch stock. Please try again.');
      }
    };

    fetchStock();
  }, [stockId]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('/data-api/rest/Industries');
        if (!response.ok) {
          throw new Error('Failed to fetch industries');
        }
        const data = await response.json();
        setIndustries(data.value || data);
      } catch (error) {
        throw new Error('Failed to fetch industries');
      }
    };

    fetchIndustries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stock) return;

    setLoading(true);
    setError(null);

    const updatedStock = {
      Name: stockName,
      Ticker: ticker,
      Quantity: quantity,
      Price: price,
      IndustryId: selectedIndustryId,
    };

    try {
      const response = await fetch(`/data-api/rest/Stocks/StockId/${stockId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(updatedStock),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          `Failed to update stock: ${response.status} - ${responseText}`,
        );
      }
    } catch (error) {
      setError('Failed to update stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!stock) {
    return (
      <div className="flex items-center justify-center gap-3">
        <span className="loading loading-spinner loading-md"></span>
        <span>Loading stock data...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 items-start">
      <button type="button" className="btn btn-ghost" onClick={onBack}>
        <MdArrowBackIos /> Back
      </button>
      <div className="flex flex-col gap-5 w-full">
        <h2 className="text-2xl">Update</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-start"
        >
          {error && <p className="text-error">{error}</p>}

          <div className="relative w-full max-w-xs">
            <SelectIndustry
              industries={industries}
              selectedIndustryId={selectedIndustryId}
              setSelectedIndustryId={setSelectedIndustryId}
              setIndustries={setIndustries}
            />
          </div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Stock name</span>
            </div>
            <input
              type="text"
              placeholder="Type Name (e.g., Novo Nordisk A/S)"
              className="input input-bordered input-md w-full max-w-xs"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Ticker Symbol</span>
            </div>
            <input
              type="text"
              placeholder="Type Ticker (e.g., AAPL)"
              className="input input-bordered input-md w-full max-w-xs"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Quantity</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value === '' ? '' : Number(e.target.value))
              }
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="number"
              step="0.01"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === '' ? '' : Number(e.target.value))
              }
              required
            />
          </label>

          <div className=" mt-5">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetUpdate;
