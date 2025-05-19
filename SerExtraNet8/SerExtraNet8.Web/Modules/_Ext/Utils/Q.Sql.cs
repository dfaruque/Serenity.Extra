public static partial class Q
{
    public static string SqlRound(string fieldExp, int? precision = 2)
    {
        return $"ROUND({fieldExp}, {precision})";
    }
    
    public static string SqlDistinctCount(string exp)
    {
        return $"COUNT(DISTINCT {exp})";
    }
}
