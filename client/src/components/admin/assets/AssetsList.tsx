import { useEffect, useState } from 'react';

interface ExposureWarningStock {
  stockName: string;
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

const AssetsList = () => {
  const [portfolioAnalysis, setPortfolioAnalysis] =
    useState<PortfolioAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioAnalysis = async () => {
      try {
        const response = await fetch(
          'https://func-empeno-invest.azurewebsites.net/api/Analyze',
        ); // Brug proxy her!

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
    <div className="overflow-x-auto p-4">
      {/* Portfolio Summary */}
      {loading ? (
        <div className="text-center py-4">
          <span className="loading loading-spinner loading-md"></span>
          <span>Loading data...</span>
        </div>
      ) : portfolioAnalysis ? (
        <>
          <div className="mb-4 p-4 bg-base-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Portfolio Overview</h2>
            <p>
              <strong>Stock Count:</strong> {portfolioAnalysis.stockCount}
            </p>
            <p>
              <strong>Total Value:</strong>{' '}
              {portfolioAnalysis.totalValue.toLocaleString()} DKK
            </p>
            <p>
              <strong>Diversification:</strong>{' '}
              {portfolioAnalysis.diversificationRecommendation}
            </p>
            <p>
              <strong>HHI:</strong> {portfolioAnalysis.hhi.toFixed(4)}
            </p>
          </div>

          {/* Exposure Warning */}
          {portfolioAnalysis.exposureWarning?.stocks?.length > 0 && (
            <div className="mb-4 p-4 bg-warning text-black rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">
                {portfolioAnalysis.exposureWarning.message}
              </h3>
              <ul>
                {portfolioAnalysis.exposureWarning.stocks.map(
                  (stock, index) => (
                    <li key={index}>
                      {stock.stockName}: {stock.valueDKK.toLocaleString()} DKK (
                      {stock.percentage.toFixed(2)}%)
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p className="text-center">No portfolio data available.</p>
      )}
    </div>
  );
};

export default AssetsList;
