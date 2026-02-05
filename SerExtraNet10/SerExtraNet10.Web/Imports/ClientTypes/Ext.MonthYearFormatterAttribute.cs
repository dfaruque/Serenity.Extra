namespace Ext;

public partial class MonthYearFormatterAttribute : CustomFormatterAttribute
{
    public const string Key = "Ext.MonthYearFormatter";

    public MonthYearFormatterAttribute()
        : base(Key)
    {
    }
}