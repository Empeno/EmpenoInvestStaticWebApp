import { useState } from 'react';
import SelectIndustry from './SelectIndustry';
import CreateIndustry from './CreateIndustry';

interface Industry {
  Id: string;
  Name: string;
  Description: string;
}

const UploadManuel = () => {
  const [showToast, setShowToast] = useState(false);
  const [isIndustryModalOpen, setIndustryModal] = useState(false);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | null>(
    null,
  );

  const [stockName, setStockName] = useState('');
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0.0);

  const handleIndustryCreated = (newIndustry: Industry) => {
    if (!newIndustry.Id) {
      console.error('Error: New industry has no ID!');
      return;
    }

    setIndustries((prevIndustries) => {
      const exists = prevIndustries.some(
        (industry) => industry.Id === newIndustry.Id,
      );
      if (exists) {
        return prevIndustries;
      }
      return [...prevIndustries, newIndustry];
    });

    setSelectedIndustryId(newIndustry.Id);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedIndustryId) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    console.log('Selected IndustryId:', selectedIndustryId);

    const stockData = {
      Name: stockName,
      Ticker: ticker,
      Quantity: quantity,
      Price: price,
      IndustryId: selectedIndustryId,
    };

    try {
      const response = await fetch('/data-api/rest/Stocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Failed to create stock: ${response.status} - ${errorMessage}`,
        );
      }

      console.log('Stock created successfully!');
      setStockName('');
      setTicker('');
      setQuantity(0);
      setPrice(0.0);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Error creating stock:', error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-start">
        <div className="relative w-full max-w-xs">
          <SelectIndustry
            industries={industries}
            selectedIndustryId={selectedIndustryId}
            setSelectedIndustryId={setSelectedIndustryId}
            setIndustries={setIndustries}
          />
          <button
            className="link absolute right-0 -bottom-7"
            type="button"
            onClick={() => setIndustryModal(true)}
          >
            Create New Industry
          </button>
        </div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Stock name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
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
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
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
            onChange={(e) => setQuantity(Number(e.target.value))}
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
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Create data
        </button>
      </form>

      {showToast && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>
              {selectedIndustryId
                ? 'Stock is created successfully.'
                : 'Please select an industry.'}
            </span>
          </div>
        </div>
      )}

      {isIndustryModalOpen && (
        <CreateIndustry
          setIndustryModal={setIndustryModal}
          setIndustries={setIndustries}
          handleIndustryCreated={handleIndustryCreated}
        />
      )}
    </div>
  );
};

export default UploadManuel;
