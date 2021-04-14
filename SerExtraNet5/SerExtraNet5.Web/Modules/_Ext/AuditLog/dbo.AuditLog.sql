CREATE TABLE [AuditLog] (
    [Id]         BIGINT         IDENTITY (1, 1) NOT NULL,
    [VersionNo]  INT            NOT NULL,
    [UserId]     INT            NOT NULL,
    [ActionType] INT            NOT NULL,
    [ActionDate] DATETIME       NOT NULL,
    [TableName]  VARCHAR (100)  NOT NULL,
    [EntityId]   BIGINT         NOT NULL,
    [OldEntity]  NVARCHAR (MAX) NULL,
    [NewEntity]  NVARCHAR (MAX) NULL,
    [IpAddress]  VARCHAR (100)  NULL,
    [SessionId]  VARCHAR (100)  NULL
);

