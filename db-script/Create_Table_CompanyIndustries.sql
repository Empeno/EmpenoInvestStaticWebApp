-- Create a new table called '[TableName]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[CompanyIndustries]', 'U') IS NOT NULL
DROP TABLE [dbo].[CompanyIndustries]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[CompanyIndustries]
(
    [CompanyId] INT NOT NULL,
    [IndustryId] INT NOT NULL,
    PRIMARY KEY ([CompanyId], [IndustryId]),  -- Composite primary key
    CONSTRAINT FK_CompanyIndustries_Company FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Companies]([Id]) ON DELETE CASCADE,
    CONSTRAINT FK_CompanyIndustries_Industry FOREIGN KEY ([IndustryId]) REFERENCES [dbo].[Industries]([Id]) ON DELETE CASCADE
);

GO