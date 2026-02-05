namespace Ext;

public partial class EmptyLookupEditorAttribute : LookupEditorBaseAttribute
{
    public const string Key = "Ext.EmptyLookupEditor";

    public EmptyLookupEditorAttribute()
        : base(Key)
    {
    }
}