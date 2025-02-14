import { useState, useEffect } from 'react';
import { MdArrowForward } from 'react-icons/md';
import ViewCompany from './ViewCompany';

interface Company {
  Id: string;
  Name: string;
  Description: string;
  Ticker: string;
}

const ListCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/data-api/rest/Companies');
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await response.json();
        setCompanies(data.value);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (selectedCompany) {
    return (
      <ViewCompany
        company={selectedCompany}
        goBack={() => setSelectedCompany(null)}
        setUpdateModalOpen={() => {}}
      />
    );
  }

  return (
    <div className="max-w-f lg:max-w-lg flex flex-col gap-10">
      <h3 className="text-2xl font-bold">List of companies</h3>
      {loading ? (
        <div className="flex gap-3 items-center">
          <span className="loading loading-spinner loading-md"></span>
          <span>Loading data...</span>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {companies.map((company) => (
            <li key={company.Id} className="font-semibold">
              <div className="flex justify-between items-center pb-3">
                <div>{company.Name}</div>
                <div className="flex gap-5">
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => setSelectedCompany(company)}
                  >
                    <MdArrowForward /> Details
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

export default ListCompanies;
