namespace Ext;

public partial class YesNoColoredFormatterAttribute : CustomFormatterAttribute
{
    public const string Key = "Ext.YesNoColoredFormatter";

    public YesNoColoredFormatterAttribute()
        : base(Key)
    {
    }
}