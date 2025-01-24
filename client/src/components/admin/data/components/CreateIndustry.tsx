import { useState, useEffect } from 'react';

const CreateIndustry = () => {
  const [industryModal, setIndustryModal] = useState(false);
  const [industryName, setIndustryName] = useState('');
  const [industryDescription, setIndustryDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Industry Modal State: ', industryModal);
  }, [industryModal]);

  const createIndustry = async () => {
    setLoading(true);
    setError(null);
    const data = {
      Name: industryName,
      Description: industryDescription,
    };
    try {
      const response = await fetch('/data-api/rest/Industries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to create industry: ${response.status}`);
      }
      const result = await response.json();
      console.log('Industry created successfully!', result);
      setIndustryModal(false);
      setIndustryName('');
      setIndustryDescription('');
    } catch (err) {
      const errorMessage = (err as Error).message;
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!industryName || !industryDescription) {
      setError('Please fill out all fields.');
      return;
    }
    createIndustry();
  };

  return (
    <>
      <button
        className="link link-primary flex justify-end"
        onClick={() => setIndustryModal(true)}
      >
        Create industry category
      </button>

      {industryModal && (
        <div className="modal modal-open">
          <div className="modal-box w-auto max-w-5xl flex flex-col gap-2 md:p-12">
            <h3 className="font-bold text-xl">Create industry category</h3>
            <div className="modal-action flex flex-col gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Industry Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={industryName}
                  onChange={(e) => setIndustryName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Industry Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter a description"
                  value={industryDescription}
                  onChange={(e) => setIndustryDescription(e.target.value)}
                  required
                  style={{ resize: 'none' }}
                ></textarea>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
              <button className="btn" onClick={() => setIndustryModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateIndustry;
