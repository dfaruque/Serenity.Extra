using Serenity;
using System;

public static partial class Q
{
    public static void CheckNull(object value, string paramName)
    {
        if (value == null)
            throw new ArgumentNullException(String.Format(LocalText.Get("Validation.FieldIsRequired"), paramName), new Exception());
    }

    public static void CheckNullOrEmpty(string value, string paramName)
    {
        if (value == null)
            throw new ArgumentNullException(paramName);

        if (value.Length == 0)
            throw new ArgumentException(String.Format("'{0}' cannot be empty!", paramName), paramName);
    }

    public static void CheckNullOrWhiteSpace(string value, string paramName)
    {
        if (value == null)
            throw new ArgumentNullException(paramName);

        if (value.Length == 0)
            throw new ArgumentException(String.Format("'{0}' cannot be empty!", paramName), paramName);

        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException(String.Format("'{0}' cannot be whitespace!", paramName), paramName);
    }
}
