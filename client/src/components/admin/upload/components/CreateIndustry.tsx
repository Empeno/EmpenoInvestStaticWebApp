import { useState } from 'react';

interface Industry {
  Id: string;
  Name: string;
  Description: string;
}

const CreateIndustry = ({
  setIndustryModal,
  setIndustries,
  handleIndustryCreated,
}: {
  setIndustryModal: (isOpen: boolean) => void;
  setIndustries: React.Dispatch<React.SetStateAction<Industry[]>>;
  handleIndustryCreated: (newIndustry: Industry) => void;
}) => {
  const [industryName, setIndustryName] = useState('');
  const [industryDescription, setIndustryDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createIndustry = async () => {
    setLoading(true);
    setError(null);

    const newIndustry = {
      Name: industryName,
      Description: industryDescription,
    };

    try {
      const response = await fetch('/data-api/rest/Industries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIndustry),
      });

      if (!response.ok) {
        throw new Error(`Failed to create industry: ${response.status}`);
      }

      const result = await response.json();
      console.log('Created Industry Response:', result);
      const createdIndustry = result.value?.[0];

      if (!createdIndustry || !createdIndustry.Id) {
        throw new Error('Error: Created industry does not have a valid ID.');
      }

      setIndustries((prevIndustries) => [...prevIndustries, createdIndustry]);

      handleIndustryCreated(createdIndustry);
      setIndustryModal(false);
    } catch (err) {
      const errorMessage = (err as Error).message;
      console.error('❌ Error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box flex flex-col gap-2 md:p-12">
        <h3 className="font-bold text-xl">Create New Industry</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createIndustry();
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
            required
          ></textarea>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end gap-5">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create'}
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

export default CreateIndustry;
