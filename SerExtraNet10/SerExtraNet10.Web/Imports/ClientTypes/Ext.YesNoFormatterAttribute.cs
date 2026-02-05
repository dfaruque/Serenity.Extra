namespace Ext;

public partial class YesNoFormatterAttribute : CustomFormatterAttribute
{
    public const string Key = "Ext.YesNoFormatter";

    public YesNoFormatterAttribute()
        : base(Key)
    {
    }
}