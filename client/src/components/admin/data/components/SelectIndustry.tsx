import { useState, useEffect } from 'react';
import CreateIndustry from './CreateIndustry';

interface Industry {
  Id: number;
  Name: string;
  Description: string;
}

const Endpoint =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:7071/api/http_trigger'
    : '/data-api/rest/Industries';

interface SelectIndustryProps {
  onIndustryCreated?: (newIndustry: Industry) => void;
}

const SelectIndustry: React.FC<SelectIndustryProps> = ({
  onIndustryCreated,
}) => {
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
        const response = await fetch(Endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch industries');
        }
        const data = await response.json();

        if (data.industries && typeof data.industries === 'object') {
          const industriesArray = Object.entries(data.industries).flatMap(
            ([, industryGroup]: [string, any]) =>
              industryGroup.companies.map((company: any) => ({
                Name: company.name,
                Id: company.ticker,
                Description: company.currentPrice,
              })),
          );
          setIndustries(industriesArray);
        } else {
          throw new Error(
            'Fetched data is not an object with industries property',
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
          value={selectedIndustry !== null ? String(selectedIndustry) : ''}
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
