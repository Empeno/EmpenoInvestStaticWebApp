import { useState } from 'react';

interface Industry {
  Id: string;
  Name: string;
  Description: string;
}

const UpdateIndustry = ({
  industry,
  setIndustryModal,
  handleIndustryUpdated,
}: {
  industry: Industry;
  setIndustryModal: (isOpen: boolean) => void;
  handleIndustryUpdated: (updatedIndustry: Industry) => void;
}) => {
  const [industryName, setIndustryName] = useState(industry.Name);
  const [industryDescription, setIndustryDescription] = useState(
    industry.Description,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateIndustry = async () => {
    setLoading(true);
    setError(null);

    const updatedIndustry = {
      Name: industryName,
      Description: industryDescription,
    };

    try {
      const response = await fetch(
        `/data-api/rest/Industries/Id/${industry.Id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(updatedIndustry),
        },
      );
      const responseText = await response.text();
      console.log('🔄 Full API Response:', responseText);

      if (!response.ok) {
        throw new Error(
          `Failed to update industry: ${response.status} - ${responseText}`,
        );
      }
      const result = JSON.parse(responseText);
      console.log('✅ Updated Industry Response:', result);

      handleIndustryUpdated({ Id: industry.Id, ...updatedIndustry });
      setIndustryModal(false);
    } catch (err) {
      console.error('❌ Error:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box flex flex-col gap-2 md:p-12">
        <h3 className="font-bold text-xl">Update Industry</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateIndustry();
          }}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder="Industry Name"
            className="input input-bordered input-lg"
            value={industryName}
            onChange={(e) => setIndustryName(e.target.value)}
            required
          />
          <textarea
            placeholder="Industry Description"
            className="textarea textarea-bordered textarea-lg resize-none"
            value={industryDescription}
            onChange={(e) => setIndustryDescription(e.target.value)}
            rows={5}
            required
          ></textarea>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end gap-5">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            <button
              className="btn"
              type="button"
              onClick={() => setIndustryModal(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateIndustry;
