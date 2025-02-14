import { FaPen, FaTrash } from 'react-icons/fa6';

interface Company {
  Id: string;
  Name: string;
  Description: string;
  Ticker: string;
}

const ViewCompany = ({
  company,
  goBack,
  setUpdateModalOpen,
}: {
  company: Company;
  goBack: () => void;
  setUpdateModalOpen: (open: boolean) => void;
}) => {
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
      goBack();
    } catch (error) {
      console.error('❌ Error deleting company:', error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl font-bold">Company Details</h3>
      <div>
        <strong>Name:</strong> {company.Name}
      </div>
      <div>
        <strong>Description:</strong> {company.Description}
      </div>
      <div>
        <strong>Ticker:</strong> {company.Ticker}
      </div>
      <div className="flex gap-5 mt-5">
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => setUpdateModalOpen(true)}
        >
          <FaPen /> Edit
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => deleteCompany(company.Id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
      <button className="btn btn-primary mt-5" onClick={goBack}>
        Back
      </button>
    </div>
  );
};

export default ViewCompany;
