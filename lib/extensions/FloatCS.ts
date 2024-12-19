//! Probably best practice to just use the FloatCS class in place of the SingleCS, DoubleCS, and DecimalCS classes.

import { out } from "@/emul";

export default class FloatCS
{

    public static TryParse(s: Nullable<string>, result: out<number>): boolean
    {
        if (s === null)
        {
            result.value = 0;
            return false;
        }

        const parsed = parseFloat(s); //TODO: this is NOT the same as what goes on in c#
        if (isNaN(parsed))
        {
            result.value = 0;
            return false;
        }

        result.value = parsed;
        return true;
    }

}

const SingleCS = FloatCS;
const DoubleCS = FloatCS;
const DecimalCS = FloatCS;
export { SingleCS, DoubleCS, DecimalCS, FloatCS };