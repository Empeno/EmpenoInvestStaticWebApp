import { useState, useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa6';

interface Industry {
  Name: string;
}

const ListIndustries = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);

  useEffect(() => {
    const fetchIndustries = () => {
      const data = [
        { Name: 'Technology' },
        { Name: 'Healthcare' },
        { Name: 'Finance' },
        { Name: 'Education' },
        { Name: 'Retail' },
      ];
      setIndustries(data);
    };

    fetchIndustries();
  }, []);

  return (
    <div className="max-w-lg flex flex-col gap-10">
      <h3 className="text-2xl font-bold">List of industries</h3>
      <ul className="flex flex-col gap-5">
        {industries.map((industry, index) => (
          <li key={index} className="">
            <div className="flex justify-between items-center pb-5">
              <div>{industry.Name}</div>
              <div className="flex gap-5">
                <button className="btn">
                  <FaPen /> Edit
                </button>
                <button className="btn">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
            <hr className="border-base-300 rounded-md" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListIndustries;
