IF OBJECT_ID('[dbo].[Stocks]', 'U') IS NOT NULL
DROP TABLE [dbo].[Stocks]
GO

CREATE TABLE [dbo].[Stocks]
(
    [Id] INT NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL,
    TradeDate DATE,
    Quantity INT,
    PurchasePrice DECIMAL(18,2),
    Fees DECIMAL(18,2),    
    IndustryID INT FOREIGN KEY REFERENCES Industries(Id),
    [ColumnName3] NVARCHAR(50) NOT NULL
);
GO