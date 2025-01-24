import { useState, useEffect } from 'react';
import CreateIndustry from './CreateIndustry';

const SelectIndustry = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [industries, setIndustries] = useState<string[]>([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('/data-api/rest/Industries');
        if (!response.ok) {
          throw new Error('Failed to fetch industries');
        }
        const data = await response.json();
        setIndustries(data.map((industry: { Name: string }) => industry.Name));
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };

    fetchIndustries();
  }, []);

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
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
        <CreateIndustry />
      </label>
    </div>
  );
};

export default SelectIndustry;
