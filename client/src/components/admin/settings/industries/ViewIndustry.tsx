import React from 'react';

interface Industry {
  Id: string;
  Name: string;
  Description: string;
}

const ViewIndustry = ({
  industry,
  goBack,
}: {
  industry: Industry;
  goBack: () => void;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl font-bold">Industry Details</h3>
      <div>
        <strong>Name:</strong> {industry.Name}
      </div>
      <div>
        <strong>Description:</strong> {industry.Description}
      </div>
      <button className="btn btn-primary mt-5" onClick={goBack}>
        Back
      </button>
    </div>
  );
};

export default ViewIndustry;
