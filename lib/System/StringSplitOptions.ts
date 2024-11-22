/**
 * @enum StringSplitOptions
 * @namespace System
 * @description Specifies whether applicable string splitting methods should remove empty substrings from the result.
 */
enum StringSplitOptions //TODO: implement the rest of the enum
{
    None = 0,
    RemoveEmptyEntries = 1,
    TrimEntries = 2,
}
export default StringSplitOptions;