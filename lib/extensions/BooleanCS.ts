//* Utility class with missing boolean methods from c#

import { out } from "@/emul";

export default class BooleanCS
{

    public static TryParse(value: Nullable<string>, result: out<boolean>): boolean
    {
        if (value === null)
        {
            result.value = false;
            return false;
        }

        if (BooleanCS.IsTrueStringIgnoreCase(value))
        {
            result.value = true;
            return true;
        }

        if (BooleanCS.IsFalseStringIgnoreCase(value))
        {
            result.value = false;
            return true;
        }

        value = value.trim();

        if (BooleanCS.IsTrueStringIgnoreCase(value))
        {
            result.value = true;
            return true;
        }

        if (BooleanCS.IsFalseStringIgnoreCase(value))
        {
            result.value = false;
            return true;
        }

        result.value = false;
        return true;

    }

    private static IsTrueStringIgnoreCase(value: string): boolean
    {
        return value.length === 4 &&
            (value[0] === "t" || value[0] === "T") &&
            (value[1] === "r" || value[1] === "R") &&
            (value[2] === "u" || value[2] === "U") &&
            (value[3] === "e" || value[3] === "E");
    }

    private static IsFalseStringIgnoreCase(value: string): boolean
    {
        return value.length === 5 &&
            (value[0] === "f" || value[0] === "F") &&
            (value[1] === "a" || value[1] === "A") &&
            (value[2] === "l" || value[2] === "L") &&
            (value[3] === "s" || value[3] === "S") &&
            (value[4] === "e" || value[4] === "E");
    }

}