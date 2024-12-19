class Path
{
    public static GetFileNameWithoutExtension(path: Nullable<string>): Nullable<string>
    {
        if (path === null)
        {
            return null;
        }
        //* GetFileNameWithoutExtension overload is called here, with return type of ReadOnlySpan<char>
        const lastPeriod: number = path.lastIndexOf(".");
        const result = lastPeriod === -1 ? path : path.slice(0, lastPeriod);
        if (path.length === result.length)
        {
            return path;
        }
        return result;
    }
}
export default Path;