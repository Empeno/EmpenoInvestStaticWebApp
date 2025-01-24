CREATE TABLE [dbo].[Industries]
(
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- Auto-incrementing integer ID
    [Name] NVARCHAR(50) NOT NULL,
    [Description] NVARCHAR(300) NOT NULL
);
GO

