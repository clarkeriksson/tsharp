import { out } from "@/emul";
import { type ICollection, type IList } from "@/System.Collections.Generic";

//! Not implementing the IStructuralComparable and IStructuralEquatable interfaces.
//! Not implementing the ICloneable interface.
/**
 * @todo Much of this is extremely barebones and copied from List<T> implementation. Needs to be fleshed out.
 * @class ArrayCS<T>
 * @namespace System
 * @description Represents a fixed-size List with the possibility of multiple dimensions.
 * @param {T} T - The type of elements in the list.
 * 
 * @remarks This is a weird one. I will have to improve this later.
 */
class ArrayCS<T = any> implements ICollection<T>, IList<T>, Iterable<T>
{

    ["System.ArrayCS"]: true = true;

    ["System.Collections.Generic.ICollection"]: true = true;
    ["System.Collections.Generic.IList"]: true = true;

    private _items: Array<T>;
    private _dimensions: Array<number>;
    [index: number]: T;

    public readonly IsFixedSize: boolean = true;

    public readonly IsReadOnly: boolean = false;

    public get Rank(): number { return this._dimensions.length; }

    public get Length(): number { return this._items.length; }

    public get Count(): number { return this._items.length; }

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
    
    constructor(...dimensions: Array<number>)
    {
        this._dimensions = dimensions;
        this._items = new Array<T>(this._dimensions.reduce((a, b) => a * b, 1));

        return new Proxy(this, {
            get: (target, prop, receiver) =>
            {
                const parsedIndices = new out<Array<number>>();
                if (typeof prop === "string" && this.isValidIndex(prop, parsedIndices))
                {
                    const internalIndex = this.calculateInternalIndex(parsedIndices.value);
                    return Reflect.get(this._items, internalIndex);
                }
                return Reflect.get(target, prop, receiver);
            },
            set: (target, prop, value, receiver) =>
            {
                const parsedIndices = new out<Array<number>>();
                if (typeof prop === "string" && this.isValidIndex(prop, parsedIndices))
                {
                    const internalIndex = this.calculateInternalIndex(parsedIndices.value);
                    return Reflect.set(this._items, internalIndex, value);
                }
                return Reflect.set(target, prop, value, receiver);
            }
        })
    }

    public IndexOf(item: T): number
    {
        if (this.Rank > 1) throw Error("The list is multidimensional.");
        return this._items.indexOf(item);
    }

    public Insert(index: number, item: T): void
    {
        throw Error("The list is fixed-size.");
    }

    public RemoveAt(index: number): void
    {
        throw Error("The list is fixed-size.");
    }

    public Get(indices: Array<number>): T
    {
        for (let i = 0; i < this.Rank; i++)
        {
            if (indices[i] >= this._dimensions[i])
            {
                throw RangeError(`Index ${indices[i]} is out of range for dimension ${i} with length ${this._dimensions[i]}`)
            }
        }

        const internalIndex = this.calculateInternalIndex(indices);
        return this._items[internalIndex];
    }

    public Set(indices: Array<number>, value: T): void
    {
        for (let i = 0; i < this.Rank; i++)
        {
            if (indices[i] >= this._dimensions[i])
            {
                this._dimensions[i] = indices[i] + 1;
                //throw RangeError(`Index ${indices[i]} is out of range for dimension ${i} with length ${this._dimensions[i]}`)
            }
        }

        const internalIndex = this.calculateInternalIndex(indices);
        this._items[internalIndex] = value;
    }

    /**
     * @todo this is not based on c# implementation, need to check
     */
    public GetLength(rank: number): number
    {
        if (rank >= this.Rank) throw RangeError(`Rank ${rank} is out of range for the list with rank ${this.Rank}`);
        return this._dimensions[rank];
    }

    public Add(item: T): void
    {
        throw Error("The list is fixed-size.");
    }

    public Remove(item: T): boolean
    {
        throw Error("The list is fixed-size.");
    }

    /**
     * @remarks This method maintains the size of the list.
     * @inheritdoc
     */
    public Clear(): void
    {
        if (this.IsReadOnly) throw Error("The list is read-only.");

        const length = this.Count;

        this._items = new Array<T>(length);
    }

    public Contains(item: T): boolean
    {
        return this._items.includes(item);
    }

    public CopyTo(array: T[], arrayIndex: number): void
    {
        throw Error("The list is multidimensional.");
    }

    /**
     * @todo Subject to change
     * @description Determines whether the specified indices are valid for the list.
     * @param {string} index - The string coerced indices to check.
     * @param {out<Array<number>>} parsedIndices - The parsed indices.
     * @returns {boolean} True if the indices are valid; otherwise, false.
     */
    private isValidIndex(index: string, parsedIndices: out<Array<number>>): boolean
    {
        const indices = index.split(",");
        const parsed = indices.map(value => parseInt(value));
        if (parsed.length === this.Rank && parsed.every((value, index) => value < this._dimensions[index]))
        {
            parsedIndices.value = parsed;
            return true;
        }
        return false;
    }

    /**
     * @todo Check on this, kind of just believing in the heart of the cards with copilot here
     * @description Calculates the internal index of the list from the specified indices.
     * @param {Array<number>} indices - The indices to calculate the internal index from.
     * @returns {number} The internal index of the list.
     */
    private calculateInternalIndex(indices: Array<number>): number
    {
        return indices.reduce((a, b, i) => a + b * this._dimensions.slice(i + 1).reduce((a, b) => a * b, 1), 0);
    }

}
export default ArrayCS;