import { type IList } from "@/System.Collections.Generic";

class Array1<T> implements IList<T>
{
    private _items: T[] = [];

    constructor(length: number, values?: T[])
    {

    }
}
export default Array1;