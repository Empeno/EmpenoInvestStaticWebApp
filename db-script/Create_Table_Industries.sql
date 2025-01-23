-- Create a new table called '[Industries]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[Industries]', 'U') IS NOT NULL
DROP TABLE [dbo].[Industries]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[Industries]
(
    [Id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [Name] NVARCHAR(50) NOT NULL,
    [Description] NVARCHAR(300) NOT NULL
    -- Specify more columns here
);
GO