using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Serenity;
using Serenity.Data;

namespace _Ext.DevTools.Model
{
    public class EnumExprolerPageModel
    {
        public List<EnumInfo> EnumInfos { get; set; } = new List<EnumInfo>();

        public EnumExprolerPageModel(ITextLocalizer localizer)
        {
            var assembly = Assembly.GetAssembly(typeof(EnumExprolerPageModel));

            var enumTypes = assembly.GetTypes().Where(t => t.IsEnum);

            foreach (var enumType in enumTypes)
            {
                var enumInfo = new EnumInfo
                {
                    EnumName = enumType.Name,
                    EnumFullName = enumType.FullName
                };

                foreach (var enumValue in enumType.GetEnumValues())
                {
                    enumInfo.EnumValues.Add(new EnumInfo.EnumValue
                    {
                        Value = (int)enumValue,
                        Name = enumType.GetEnumName(enumValue),
                        Description = localizer.FormatEnum(enumValue.GetType(), enumValue)
                    });
                }

                EnumInfos.Add(enumInfo);
            }
        }
    }

    public class EnumInfo
    {
        public string EnumName { get; set; }
        public string EnumFullName { get; set; }
        public List<EnumValue> EnumValues { get; set; } = new List<EnumValue>();

        public class EnumValue
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public int Value { get; set; }
        }
    }
}