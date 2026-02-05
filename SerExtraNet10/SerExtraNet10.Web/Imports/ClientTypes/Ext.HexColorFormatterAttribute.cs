namespace Ext;

public partial class HexColorFormatterAttribute : CustomFormatterAttribute
{
    public const string Key = "Ext.HexColorFormatter";

    public HexColorFormatterAttribute()
        : base(Key)
    {
    }
}