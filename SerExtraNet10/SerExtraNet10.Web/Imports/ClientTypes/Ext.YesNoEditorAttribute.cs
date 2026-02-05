namespace Ext;

public partial class YesNoEditorAttribute : CustomEditorAttribute
{
    public const string Key = "Ext.YesNoEditor";

    public YesNoEditorAttribute()
        : base(Key)
    {
    }
}