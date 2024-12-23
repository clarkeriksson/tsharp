import { out } from "@/lib/emul/_namespace";
import { type ICollection, type ISet, type IReadOnlyCollection, type IReadOnlySet } from "@/System.Collections.Generic";

/**
 * @class HashSet<T>
 * @namespace System.Collections.Generic
 * @description Represents a set of values.
 * @param {T} T - The type of elements in the hash set.
 */
class HashSet<T = any> implements ICollection<T>, ISet<T>, IReadOnlyCollection<T>, IReadOnlySet<T>
{

    //private static readonly __brand = Symbol("HashSet");

    //[ICollection]: true = true;
    //[IReadOnlyCollection]: true = true;
    //[ISet]: true = true;
    //[IReadOnlySet]: true = true;

    private _set: Set<T> = new Set<T>();

    public readonly IsReadOnly = false;

    public readonly IsFixedSize = false;

    [index: number]: T;

    public get Count(): number
    {
        return this._set.size;
    }

    [Symbol.iterator](): Iterator<T>
    {
        return this._set.values();
    }

    public Add(item: T): boolean
    {
        if (this.IsReadOnly) throw Error("The hash set is read-only");

        this._set.add(item);
        if (this._set.has(item))
        {
            return true;
        }
        return false;
    }

    public Clear(): void
    {
        if (this.IsReadOnly) throw Error("The hash set is read-only");

        this._set.clear();
    }

    public Contains(item: T): boolean
    {
        return this._set.has(item);
    }

    public CopyTo(array: T[], arrayIndex: number): void
    {
        if (array === null) throw TypeError("The array cannot be null.");
        if (arrayIndex < 0) throw RangeError("The array index is out of range.");
        if (arrayIndex + this.Count > array.length) throw RangeError("The number of elements in the source collection is greater than the available space from arrayIndex to the end of the destination array.");

        const values = Array.from(this._set.values());
        for (let i = 0; i < this.Count; i++)
        {
            array[arrayIndex + i] = values[i];
        }
    }

    public Remove(item: T): boolean
    {
        if (this.IsReadOnly) throw Error("The hash set is read-only");

        return this._set.delete(item);
    }

    //TODO: this is a bit stupid how i've quickly implemented this
    public TryGetValue(equalValue: T, actualValue: out<T>)
    {
        if (this._set.has(equalValue))
        {
            actualValue.value = equalValue;
            return true;
        }
        return false
    }

}
export default HashSet;