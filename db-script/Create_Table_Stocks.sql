CREATE TABLE [dbo].[Stocks]
(
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- Auto-incrementing integer ID
    [Name] NVARCHAR(50) NOT NULL,
    TradeDate DATE,
    Quantity INT,
    PurchasePrice DECIMAL(18,2),
    Fees DECIMAL(18,2),
    IndustryID INT FOREIGN KEY REFERENCES Industries(Id), -- Integer foreign key
    [ColumnName3] NVARCHAR(50) NOT NULL
);
GO
