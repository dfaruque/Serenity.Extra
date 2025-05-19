using System;

public static partial class Q
{
    public static decimal Round(decimal? value, int decimals = 0, MidpointRounding mode = MidpointRounding.AwayFromZero)
    {
        return Math.Round(value ?? 0, decimals, mode);
    }

    public static decimal Round2(decimal? value, MidpointRounding mode = MidpointRounding.AwayFromZero)
    {
        return Math.Round(value ?? 0, 2, mode);
    }
}
