import { useState, useEffect } from 'react';

interface Industry {
  Id: number;
  Name: string;
  Description: string;
}

const ListIndustries = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('/data-api/rest/Industries');
        if (!response.ok) {
          throw new Error('Failed to fetch industries');
        }
        const data = await response.json();
        if (
          data.value &&
          Array.isArray(data.value) &&
          data.value.every(
            (industry: Industry) =>
              industry && typeof industry.Name === 'string',
          )
        ) {
          setIndustries(data.value);
        } else {
          throw new Error(
            'Fetched data is not an array of objects with Name property',
          );
        }
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };

    fetchIndustries();
  }, []);

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Edit industry with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log(`Delete industry with id: ${id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold">Industries</h2>
      <ul className="list-disc pl-5">
        {industries.map((industry) => (
          <li key={industry.Id} className="flex justify-between items-center">
            <span>{industry.Name}</span>
            <div>
              <button
                className="btn btn-secondary btn-sm mr-2"
                onClick={() => handleEdit(industry.Id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(industry.Id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListIndustries;
