import { useState, useEffect } from 'react';
import CreateIndustry from './CreateIndustry';

interface Industry {
  Id: number;
  Name: string;
  Description: string;
}

interface SelectIndustryProps {
  onIndustryCreated?: (newIndustry: Industry) => void;
}

const SelectIndustry = ({ onIndustryCreated }: SelectIndustryProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);

  const handleIndustryCreated = (newIndustry: Industry) => {
    setIndustries((prevIndustries) => [...prevIndustries, newIndustry]);
    if (onIndustryCreated) {
      onIndustryCreated(newIndustry);
    }
  };

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('/data-api/rest/Industries', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch industries, Status: ${response.status}`,
          );
        }

        const data = await response.json();

        if (
          data.value &&
          Array.isArray(data.value) &&
          data.value.every(
            (industry: Industry) =>
              industry && typeof industry.Name === 'string',
          )
        ) {
          setIndustries(data.value);
        } else {
          throw new Error(
            'Fetched data is not an array of objects with Name property',
          );
        }
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
          value={selectedIndustry ?? ''}
          onChange={(e) => setSelectedIndustry(Number(e.target.value))}
        >
          <option disabled value="">
            Pick one
          </option>
          {industries.map((industry) => (
            <option key={industry.Id} value={industry.Id}>
              {industry.Name}
            </option>
          ))}
        </select>
        <CreateIndustry onIndustryCreated={handleIndustryCreated} />
      </label>
    </div>
  );
};

export default SelectIndustry;
