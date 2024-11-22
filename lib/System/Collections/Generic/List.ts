import { IList, IReadOnlyList } from "@/System.Collections.Generic";

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

    public readonly IsReadOnly: boolean = false;

    [Symbol.iterator](): IterableIterator<T>
    {
        let index = 0;
        const next = (): IteratorResult<T> => {
            if (index < this.Count)
            {
                return { value: this[index++], done: false };
            }
            else
            {
                return { value: null, done: true };
            }
        }

        const iterator: IterableIterator<T> = { next, [Symbol.iterator]() { return iterator; } };

        return iterator;
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

}
export default List;