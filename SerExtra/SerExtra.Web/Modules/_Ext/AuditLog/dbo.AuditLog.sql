CREATE TABLE [dbo].[AuditLog] (
    [Id]         BIGINT         IDENTITY (1, 1) NOT NULL,
    [UserId]     BIGINT            NOT NULL,
    [ActionType] INT            NOT NULL,
    [ActionDate] DATETIME       NOT NULL,
    [TableName]  VARCHAR (100)  NOT NULL,
    [EntityId]   BIGINT         NOT NULL,
    [Changes]    NVARCHAR (MAX) NULL,
    [IpAddress]  VARCHAR (100)  NULL,
    [SessionId]  VARCHAR (100)  NULL
);

