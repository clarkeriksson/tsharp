//* Utility class with missing string methods from c#

import { StringSplitOptions, StringComparison } from "@/System";
import { List } from "@/System.Collections.Generic";

export default class StringCS {

    public static IsNullOrWhiteSpace(value: Nullable<string>): boolean 
    {
        return value === null || value.trim() === "";
    }

    public static Split(input: string, separator: string, count: number = -1, options: StringSplitOptions = StringSplitOptions.None): List<string>
    {
        const splitArrayBeforeProcessing = input?.split(separator) ?? null;

        if (splitArrayBeforeProcessing === null)
        {
            return new List<string>();
        }

        let splitArray: string[] = splitArrayBeforeProcessing;

        if (options & StringSplitOptions.TrimEntries)
        {
            splitArray = splitArrayBeforeProcessing.map((item) => item.trim());
        }
        if (options & StringSplitOptions.RemoveEmptyEntries)
        {
            splitArray = splitArrayBeforeProcessing.filter((item) => item !== "");
        }

        if (!(count <= -1) && splitArray.length > count)
        {
            return new List(splitArray.slice(0, count));
        }

        return new List(splitArray);
    }

    public static Equals(string0: Nullable<string>, string1: Nullable<string>, comparisonType: StringComparison): boolean
    {
        if (string0 === null || string1 === null)
        {
            return false;
        }
        switch (comparisonType)
        {
            case StringComparison.Ordinal:
                if (string0.length !== string1.length)
                {
                    return false;
                }
                return string0 === string1;
            case StringComparison.OrdinalIgnoreCase:
                if (string0.length !== string1.length)
                {
                    return false;
                }
                return (string0.trim()).toLowerCase() === (string1.trim()).toLowerCase();
        }
    }

    public static Compare(strA: Nullable<string>, strB: Nullable<string>, comparisonType: StringComparison): number
    {
        if (strA === strB)
        {
            return 0;
        }

        if (strA === null)
        {
            return -1;
        }
        if (strB === null)
        {
            return 1;
        }

        switch (comparisonType)
        {
            case StringComparison.OrdinalIgnoreCase:
            {
                return strA.toLowerCase().localeCompare(strB.toLowerCase());
            }
            default: throw Error("StringComparison not supported");
        }
    }

    /**
     * @todo Implement
     */
    public static StartsWith(value0: Nullable<string>, value1: Nullable<string>, comparisonType: StringComparison = StringComparison.Ordinal): boolean
    {
        if (value0 === null || value1 === null)
        {
            throw Error("value cannot be null");
        }

        if (value0 === value1)
        {
            StringCS.CheckStringComparison(comparisonType);
            return true;
        }

        if (value0.length === 0 && value1.length === 0)
        {
            StringCS.CheckStringComparison(comparisonType);
            return true;
        }

        switch (comparisonType)
        {
            case StringComparison.Ordinal:
            {
                if (value0.length < value1.length || value0[0] !== value1[0])
                {
                    return false;
                }
                return (value0.length === 1) ? true : value0.startsWith(value1);
            }
            default: throw Error("StringComparison not supported");
        }
    }

    /**
     * @todo Figure out what this actually does
     */
    private static CheckStringComparison(comparisonType: StringComparison): void
    {
        if (comparisonType > StringComparison.OrdinalIgnoreCase)
        {
            throw Error("StringComparison not supported");
        }
    }

}