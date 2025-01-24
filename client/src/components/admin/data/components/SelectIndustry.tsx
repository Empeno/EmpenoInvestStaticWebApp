import { useState } from 'react';
import CreateIndustry from './CreateIndustry';

const SelectIndustry = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Star Wars');

  return (
    <div className="flex flex-col relative">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Select Industry</span>
        </div>
        <select
          className="select select-bordered"
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          <option disabled value="">
            Pick one
          </option>
          <option value="Star Wars">Star Wars</option>
          <option value="Harry Potter">Harry Potter</option>
          <option value="Lord of the Rings">Lord of the Rings</option>
          <option value="Planet of the Apes">Planet of the Apes</option>
          <option value="Star Trek">Star Trek</option>
        </select>
        <CreateIndustry />
      </label>
    </div>
  );
};

export default SelectIndustry;
