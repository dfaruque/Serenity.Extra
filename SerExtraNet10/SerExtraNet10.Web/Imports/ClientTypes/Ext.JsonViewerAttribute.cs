namespace Ext;

public partial class JsonViewerAttribute : CustomEditorAttribute
{
    public const string Key = "Ext.JsonViewer";

    public JsonViewerAttribute()
        : base(Key)
    {
    }
}