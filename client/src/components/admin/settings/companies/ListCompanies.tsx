import { useState, useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa6';

interface Company {
  Id: string;
  Name: string;
  Description: string;
  Ticker: string;
}

const ListCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
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

  const deleteCompany = async (id: string) => {
    try {
      const response = await fetch(`/data-api/rest/Companies/Id/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete company: ${response.status} - ${errorText}`,
        );
      }
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.Id !== id),
      );
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('❌ Error deleting company:', error);
    }
  };

  const handleCompanyUpdated = (updatedCompany: Company) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.Id === updatedCompany.Id ? updatedCompany : company,
      ),
    );
  };

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
                    onClick={() => {
                      setSelectedCompany(company);
                      setUpdateModalOpen(true);
                    }}
                  >
                    <FaPen /> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => {
                      setSelectedCompany(company);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
              <hr className="border-base-300 rounded-md" />
            </li>
          ))}
        </ul>
      )}

      {/* {isUpdateModalOpen && selectedCompany && (
        <UpdateCompany
          company={selectedCompany}
          setCompanyModal={setUpdateModalOpen}
          handleCompanyUpdated={handleCompanyUpdated}
        />
      )} */}

      {isDeleteModalOpen && selectedCompany && (
        <div className="modal modal-open">
          <div className="modal-box flex flex-col gap-3 sm:p-12">
            <h3 className="font-bold text-xl">Confirm Delete</h3>
            <p className="md:text-lg">
              Are you sure you want to delete the company "
              {selectedCompany.Name}"?
            </p>
            <div className="flex justify-end gap-5">
              <button
                className="btn btn-error"
                onClick={() => deleteCompany(selectedCompany.Id)}
              >
                Delete
              </button>
              <button className="btn" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCompanies;
