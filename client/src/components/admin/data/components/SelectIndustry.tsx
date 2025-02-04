import { useEffect } from 'react';

interface Industry {
  Id: string;
  Name: string;
  Description: string;
}

const SelectIndustry = ({
  industries,
  selectedIndustryId,
  setSelectedIndustryId,
  setIndustries,
}: {
  industries: Industry[];
  selectedIndustryId: string | null;
  setSelectedIndustryId: React.Dispatch<React.SetStateAction<string | null>>;
  setIndustries: React.Dispatch<React.SetStateAction<Industry[]>>;
}) => {
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
        console.error('❌ Error fetching industries:', error);
      }
    };

    fetchIndustries();
  }, [setIndustries]);

  return (
    <div className="flex flex-col">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Select Industry</span>
        </div>

        <select
          className="select select-bordered w-full"
          value={selectedIndustryId || ''}
          onChange={(e) => {
            setSelectedIndustryId(e.target.value);
          }}
        >
          <option disabled value="">
            {industries.length === 0 ? 'Loading...' : 'Pick one'}
          </option>
          {industries.map((industry) => (
            <option key={industry.Id} value={industry.Id}>
              {industry.Name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectIndustry;
