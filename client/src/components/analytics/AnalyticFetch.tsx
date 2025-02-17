import { useEffect, useState } from 'react';

interface ExposureWarningStock {
  name: string;
  valueDKK: number;
  percentage: number;
}

interface PortfolioAnalysis {
  stockCount: number;
  totalValue: number;
  exposureWarning: {
    message: string;
    stocks: ExposureWarningStock[];
  };
  diversificationRecommendation: string;
  hhi: number;
}

const AnalyticFetch = () => {
  const [portfolioAnalysis, setPortfolioAnalysis] =
    useState<PortfolioAnalysis | null>(null);
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
        setPortfolioAnalysis(data);
      } catch (error) {
        console.error('Error fetching portfolio analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioAnalysis();
  }, []);

  return (
    <div className="overflow-x-auto">
      {/* Portfolio Summary */}
      {loading ? (
        <div className="text-center py-4">
          <span className="loading loading-spinner loading-md"></span>
          <span>Loading data...</span>
        </div>
      ) : portfolioAnalysis ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-4 ">
              <div className="flex-1 bg-base-100 rounded-lg shadow-md p-5">
                <p className="flex flex-col">
                  <strong>Total Value</strong>
                  <span className="text-xl">
                    {portfolioAnalysis.totalValue.toLocaleString()} DKK
                  </span>
                </p>
              </div>
              <div className="flex-1 bg-base-100 rounded-lg shadow-md p-5">
                <p className="flex flex-col">
                  <strong>Stock Count</strong>
                  <span className="text-xl">
                    {portfolioAnalysis.stockCount}
                  </span>
                </p>
              </div>
              <div className="flex-1 bg-base-100 rounded-lg shadow-md p-5">
                <p className="flex flex-col">
                  <strong>HHI</strong>
                  <span className="text-xl">
                    {portfolioAnalysis.hhi.toFixed(4)}
                  </span>
                </p>
              </div>
            </div>

            <div className="p-4 bg-base-100 rounded-lg shadow-md">
              <p className="flex flex-col ">
                <span className="text-xl flex items-center gap-2">
                  <span
                    className={`indicator-item indicator-middle indicator-start badge ${
                      portfolioAnalysis.diversificationRecommendation.includes(
                        'well-diversified',
                      )
                        ? 'badge-success'
                        : portfolioAnalysis.diversificationRecommendation.includes(
                            'moderately',
                          )
                        ? 'badge-warning'
                        : 'badge-error'
                    }`}
                  ></span>
                  {portfolioAnalysis.diversificationRecommendation}
                </span>
              </p>
            </div>

            {/* Exposure Warning */}
            {portfolioAnalysis.exposureWarning?.stocks?.length > 0 && (
              <div className="mb-4 p-6 bg-base-100 rounded-lg shadow-md">
                <h3 className="font-semibold flex items-center gap-2">
                  {portfolioAnalysis.exposureWarning.message}
                </h3>

                <div className="overflow-x-auto mt-4">
                  <table className="table md:table-lg w-full">
                    {/* Head */}
                    <thead>
                      <tr className="bg-base-200">
                        <th>#</th>
                        <th>Stock Name</th>
                        <th className="text-right">Value (DKK)</th>
                        <th className="text-right">Percentage</th>
                      </tr>
                    </thead>
                    {/* Body */}
                    <tbody>
                      {portfolioAnalysis.exposureWarning.stocks.map(
                        (stock, index) => (
                          <tr key={index} className="border-b border-base-300">
                            <th>{index + 1}</th>
                            <td>{stock.name}</td>
                            <td className="text-right">
                              {stock.valueDKK.toLocaleString()} DKK
                            </td>
                            <td className="text-right">
                              <span className="badge badge-neutral-content badge-outline badge-lg">
                                {stock.percentage.toFixed(2)}%
                              </span>
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-center">No portfolio data available.</p>
      )}
    </div>
  );
};

export default AnalyticFetch;
