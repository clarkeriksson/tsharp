import { type Comparison } from "@/System";
import { type IList, type IReadOnlyList, type IComparer } from "@/System.Collections.Generic";

/**
 * @class List<T>
 * @namespace System.Collections.Generic
 */
class List<T> implements IList<T>, IReadOnlyList<T>, Iterable<T>
{

    protected _items: T[] = new Array<T>();
    [index: number]: T;

    get Count(): number
    {
        return this._items.length;
    }

    public readonly IsFixedSize: boolean = false;

    public readonly IsReadOnly: boolean = false;

    [Symbol.iterator](): IterableIterator<T>
    {
        return this._items[Symbol.iterator]();
    }

    constructor(items: Iterable<T> = [])
    {
        this._items = Array.from<T>(items);
        return new Proxy(this, {
            get: (target, prop, receiver) =>
            {
                if (typeof prop === "string" && this.isValidIndex(prop))
                {
                    return Reflect.get(this._items, prop);
                }
                return Reflect.get(target, prop, receiver);
            },
            set: (target, prop, value, receiver) =>
            {
                if (typeof prop === "string" && this.isValidIndex(prop))
                {
                    return Reflect.set(this._items, prop, value);
                }
                return Reflect.set(target, prop, value, receiver);
            },
        });
    }

    public IndexOf(item: T): number
    {
        return this._items.indexOf(item);
    }

    public Insert(index: number, item: T): void
    {
        if (index < 0 || index > this.Count) throw RangeError("Index is out of range.");
        if (this.IsReadOnly) throw Error("The list is read-only.");

        this._items.splice(index, 0, item);
    }

    public RemoveAt(index: number): void
    {
        if (index < 0 || index > this.Count) throw RangeError("Index is out of range.");
        if (this.IsReadOnly) throw Error("The list is read-only.");

        this._items.splice(index, 1);
    }

    public Add(item: T): void
    {
        if (this.IsReadOnly) throw Error("The list is read-only.");

        this._items.push(item);
    }

    public Clear(): void
    {
        if (this.IsReadOnly) throw Error("The list is read-only.");

        this._items = new Array<T>();
    }

    public Contains(item: T): boolean
    {
        return this._items.includes(item);
    }

    public CopyTo(array: T[], arrayIndex: number): void
    {
        if (array === null) throw TypeError("The array cannot be null.");
        if (arrayIndex < 0) throw RangeError("The array index is out of range.");
        if (arrayIndex + this.Count > array.length) throw RangeError("The number of elements in the source collection is greater than the available space from arrayIndex to the end of the destination array.");

        for (let i = 0; i < this.Count; i++)
        {
            array[arrayIndex + i] = this._items[i];
        }
    }

    public Remove(item: T): boolean
    {
        if (this.IsReadOnly) throw Error("The list is read-only.");

        const index = this.IndexOf(item);
        if (index === -1) return false;

        this._items.splice(index, 1);
        return true;
    }

    /**
     * C# {start: int, length: int}
     */
    public Slice(start: number, length: number): List<T>
    {
        if (start < 0) throw RangeError("The start index is out of range.");
        if (length < 0) throw RangeError("The length is less than zero.");

        if (start + length > this.Count) throw RangeError("The start index and length do not denote a valid range in the list.");

        return new List<T>(this._items.slice(start, start + length));
    }

    private isValidIndex(prop: string): boolean
    {
        const uint = Number.parseInt(prop, 10);
        const s = uint + "";
        return prop === s && uint !== 0xFFFFFFFF && uint < this.Count;
    }

    /**
     * @custom Found in NetCollection in the SDV source code, moved here.
     * @description Removes all elements that match the conditions defined by the predicate.
     * @param {(item: T) => boolean} match - The delegate that defines the conditions of the elements to remove.
     */
    public RemoveWhere(match: (item: T) => boolean): void
    {
        for (let i = this.Count - 1; i >= 0; i--)
        {
            if (match(this[i]))
            {
                this.RemoveAt(i);
            }
        }
    }

    /**
     * @description Sorts the elements in the entire List<T> using the specified comparer.
     * @param {Comparison<T>} comparison - The Comparison<T> to use when comparing elements.
     * @param {number} index - The zero-based starting index of the range to sort.
     * @param {number} count - The length of the range to sort.
     * @param {IComparer<T>} comparer - The IComparer<T> implementation to use when comparing elements, or null to use the default comparer Comparer<T>.Default
     */
    public Sort(comparison: Comparison<T>): void
    public Sort(index: number, count: number, comparer: IComparer<T>): void
    public Sort(arg0: Comparison<T> | number, arg1?: number, arg2?: IComparer<T>): void
    {
        if (typeof arg0 !== "number")
        {
            this._items.sort(arg0);
        }
        else if (typeof arg0 === "number" && typeof arg1 === "number" && arg2 !== undefined)
        {
            if (arg0 < 0 || arg1 < 0) throw Error("The index or count is less than zero.");
            if (arg0 + arg1 > this.Count) throw Error("The index and count do not denote a valid range in the list.");
            if (arg2 === null) throw TypeError("The comparer is null.");

            const items = this._items.slice(arg0, arg0 + arg1);
            items.sort(arg2.Compare);
            this._items.splice(arg0, arg1, ...items);
        }
    }

}
export default List;