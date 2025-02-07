import { useState, useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa6';
import UpdateIndustry from './UpdateIndustry';

interface Industry {
  Id: string;
  Name: string;
  Description: string;
}

const ListIndustries = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
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

  const deleteIndustry = async (id: string) => {
    try {
      const response = await fetch(`/data-api/rest/Industries/Id/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete industry: ${response.status} - ${errorText}`,
        );
      }
      setIndustries((prevIndustries) =>
        prevIndustries.filter((industry) => industry.Id !== id),
      );
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('❌ Error deleting industry:', error);
    }
  };

  const handleIndustryUpdated = (updatedIndustry: Industry) => {
    setIndustries((prevIndustries) =>
      prevIndustries.map((industry) =>
        industry.Id === updatedIndustry.Id ? updatedIndustry : industry,
      ),
    );
  };

  return (
    <div className="max-w-f lg:max-w-lg flex flex-col gap-10">
      <h3 className="text-2xl font-bold">List of industries</h3>
      {loading ? (
        <div className="flex gap-3 items-center">
          <span className="loading loading-spinner loading-md"></span>
          <span>Loading data...</span>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {industries.map((industry) => (
            <li key={industry.Id} className="font-semibold">
              <div className="flex justify-between items-center pb-3">
                <div>{industry.Name}</div>
                <div className="flex gap-5">
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => {
                      setSelectedIndustry(industry);
                      setUpdateModalOpen(true);
                    }}
                  >
                    <FaPen /> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => {
                      setSelectedIndustry(industry);
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

      {isUpdateModalOpen && selectedIndustry && (
        <UpdateIndustry
          industry={selectedIndustry}
          setIndustryModal={setUpdateModalOpen}
          handleIndustryUpdated={handleIndustryUpdated}
        />
      )}

      {isDeleteModalOpen && selectedIndustry && (
        <div className="modal modal-open">
          <div className="modal-box flex flex-col gap-3 sm:p-12">
            <h3 className="font-bold text-xl">Confirm Delete</h3>
            <p className="md:text-lg">
              Are you sure you want to delete the industry "
              {selectedIndustry.Name}"?
            </p>
            <div className="flex justify-end gap-5">
              <button
                className="btn btn-error"
                onClick={() => deleteIndustry(selectedIndustry.Id)}
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

export default ListIndustries;
