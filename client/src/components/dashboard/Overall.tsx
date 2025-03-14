import { useEffect, useState } from 'react';
import { MdArrowDropUp } from 'react-icons/md';

interface PortfolioAnalysis {
  totalValue: number;
}

const Overall = () => {
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioAnalysis = async () => {
      try {
        const response = await fetch(
          'https://func-empeno-invest.azurewebsites.net/api/Analyze',
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch portfolio analysis: ${response.statusText}`,
          );
        }

        const data: PortfolioAnalysis = await response.json();
        setTotalValue(data.totalValue);
      } catch (error) {
        console.error('Error fetching portfolio analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioAnalysis();
  }, []);

  return (
    <div className="flex flex-row justify-between gap-3 md:gap-5">
      <div className="w-full min-w-40 h-40 bg-base-100 rounded-lg shadow-md p-5">
        <div className="flex flex-col justify-between h-full">
          <span className="text-gray-500 text-sm lg:text-lg font-bold">
            Total Investments
          </span>
          <span className="text-lg md:text-3xl lg:text-3xl text-primary">
            {loading ? 'Loading...' : `${totalValue?.toLocaleString()} DKK`}
          </span>
          <span className="text-gray-400 text-xs">Last updated Oct 2024</span>
        </div>
      </div>
      <div className="w-full min-w-40 h-40 bg-base-100 rounded-lg shadow-md p-5">
        <div className="flex flex-col justify-between h-full relative">
          <span className="text-gray-500 text-sm lg:text-lg font-bold">
            Profit/Loss
          </span>
          <span className="md:text-3xl lg:text-4xl text-primary flex items-center">
            75%
            <div>
              <MdArrowDropUp className="text-3xl lg:text-7xl text-base-content" />
            </div>
          </span>
          <span className="text-gray-400 text-xs">Last 30 days</span>
        </div>
      </div>
      <div className="hidden lg:flex w-full min-w-40 h-40 bg-base-100 rounded-lg shadow-md p-5">
        <div className="flex flex-col justify-between h-full">
          <span className="text-gray-500 text-sm lg:text-lg font-bold">
            Best Output
          </span>
          <span className="md:text-xl lg:text-3xl text-primary">
            Nova Nordisk
          </span>
          <span className="text-gray-400 text-xs">204.205 DKK</span>
        </div>
      </div>
    </div>
  );
};

export default Overall;
