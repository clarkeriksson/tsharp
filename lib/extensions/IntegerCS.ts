//* Utility class with missing int methods from c#

import { out } from "@/emul";

export default class IntegerCS {

    public static TryParse(s: Nullable<string>, result: out<number>): boolean
    {
        if (s === null)
        {
            result.value = 0;
            return false;
        }

        const parsed = parseInt(s); //TODO: this is NOT the same as what goes on in c#
        if (isNaN(parsed))
        {
            result.value = 0;
            return false;
        }

        result.value = parsed;
        return true;
    } 

}