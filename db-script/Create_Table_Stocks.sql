CREATE TABLE [dbo].[Stocks] 
(
    [StockId] UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY, 
    [Name] NVARCHAR(100) NOT NULL,
    [Ticker] NVARCHAR(10) NOT NULL UNIQUE, 
    [IndustryId] UNIQUEIDENTIFIER NOT NULL, 
    [Price] DECIMAL(18,2) NOT NULL, 
    [CreatedAt] DATETIME DEFAULT GETDATE(),
    [Quantity] INT NOT NULL DEFAULT 0

    CONSTRAINT FK_Stocks_Industries FOREIGN KEY ([IndustryId])
    REFERENCES [dbo].[Industries]([Id]) ON DELETE CASCADE
);
GO
