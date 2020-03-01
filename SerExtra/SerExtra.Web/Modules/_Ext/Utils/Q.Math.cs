using System;

public static partial class Q
{
    public static decimal Round(decimal? value, int decimals = 5, MidpointRounding mode = MidpointRounding.AwayFromZero)
    {
        return Math.Round(value ?? 0, decimals, mode);
    }
}
