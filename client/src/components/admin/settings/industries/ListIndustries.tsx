import { useState, useEffect } from 'react';
import { MdArrowForward, MdNavigateNext } from 'react-icons/md';
import ViewIndustry from './ViewIndustry';

interface Industry {
  Id: string;
  Name: string;
  Description: string;
}

const ListIndustries = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(
    null,
  );

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('/data-api/rest/Industries');
        if (!response.ok) {
          throw new Error('Failed to fetch industries');
        }
        const data = await response.json();
        setIndustries(data.value);
      } catch (error) {
        console.error('Error fetching industries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  if (selectedIndustry) {
    return (
      <ViewIndustry
        industry={selectedIndustry}
        goBack={() => setSelectedIndustry(null)}
      />
    );
  }

  return (
    <div className="max-w-f lg:max-w-lg flex flex-col gap-10">
      <h3 className="text-2xl font-bold">List of industries</h3>
      {loading ? (
        <div className="flex gap-3 items-center">
          <span className="loading loading-spinner loading-md"></span>
          <span>Loading data...</span>
        </div>
      ) : (
        <ul className="flex flex-col gap-5">
          {industries.map((industry) => (
            <li key={industry.Id} className="font-semibold">
              <div className="flex justify-between items-center pb-3">
                <div>{industry.Name}</div>
                <div className="flex gap-5">
                  <button
                    className="btn btn-sm"
                    onClick={() => setSelectedIndustry(industry)}
                  >
                    Details <MdNavigateNext size={17} />
                  </button>
                </div>
              </div>
              <hr className="border-base-300 rounded-md" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListIndustries;
