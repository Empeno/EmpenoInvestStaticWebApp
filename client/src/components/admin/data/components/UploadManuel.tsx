import { useState } from 'react';
import SelectIndustry from './SelectIndustry';

const UploadManuel = () => {
  const [showToast, setShowToast] = useState(false);

  const handleIndustryCreated = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex flex-col gap-5 ">
      <form action="">
        <SelectIndustry onIndustryCreated={handleIndustryCreated} />

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Stock name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
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
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Quantity</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Create data
        </button>
      </form>

      {showToast && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>Industry created successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadManuel;
