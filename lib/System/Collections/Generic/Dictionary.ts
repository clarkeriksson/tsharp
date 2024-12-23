import { out } from "@/lib/emul/_namespace";
import { type IDictionary, type IReadOnlyDictionary, type ICollection, type IReadOnlyCollection, KeyValuePair } from "@/System.Collections.Generic";
/**
 * @class Dictionary<TKey,TValue>
 * @namespace System.Collections.Generic
 * @description Represents a generic collection of key/value pairs.
 * @param {TKey} TKey - The type of keys in the dictionary.
 * @param {TValue} TValue - The type of values in the dictionary.
 */
class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue>, IReadOnlyDictionary<TKey, TValue>, Iterable<KeyValuePair<TKey, TValue>>
{

    //private static readonly __brand: unique symbol = Symbol("Dictionary");

    //[IDictionary]: true = true;
    //[ICollection]: true = true;
    //[IReadOnlyCollection]: true = true;
    //[IReadOnlyDictionary]: true = true;

    protected _map: Map<TKey, TValue> = new Map<TKey, TValue>();

    [Symbol.iterator](): Iterator<KeyValuePair<TKey, TValue>>
    {
        let entries = this._map.entries();

        const next = (): IteratorResult<KeyValuePair<TKey, TValue>> => {
            const entry = entries.next();
            if (entry.done)
            {
                return { value: null, done: true };
            }
            return { value: new KeyValuePair(entry.value[0], entry.value[1]), done: false };
        }

        const iterator: IterableIterator<KeyValuePair<TKey, TValue>> = { next, [Symbol.iterator]() { return iterator; } };
        return iterator;
    }

    [index: number]: KeyValuePair<TKey, TValue>;

    constructor(items: Iterable<KeyValuePair<TKey, TValue> | [TKey, TValue]> = [])
    {
        for (const item of items)
        {
            if (item instanceof KeyValuePair)
            {
                this.Add(item.Key, item.Value);
            }
            else
            {
                this.Add(item[0], item[1]);
            }
        }
    }

    public readonly IsFixedSize = false;

    public readonly IsReadOnly = false;

    public get Keys(): KeyCollection<TKey, TValue>
    {
        return new KeyCollection(this);
    }

    public get Values(): ValueCollection<TKey, TValue>
    {
        return new ValueCollection(this);
    }

    public get Count(): number
    {
        return this._map.size;
    }

    public Get(key: TKey): TValue
    {
        if (key === null) throw Error("key is null");
        const result = this._map.get(key);

        if (result === undefined) throw Error("The key is not found");

        return result;
    }

    public Set(key: TKey, value: TValue): void
    {
        if (key === null) throw Error("key is null");
        if (this.IsReadOnly) throw Error("The dictionary is read-only");

        this._map.set(key, value);
    }
    
    public Add(key: TKey, value: TValue): void
    {
        if (key === null) throw Error("key is null");
        if (this._map.has(key)) throw Error("An element with the same key already exists in the dictionary");

        this.Set(key, value);
    }

    /**
     * @description Attempts to add the specified key and value to the dictionary.
     * @param {TKey} key - The key of the element to add.
     * @param {TValue} value - The value of the element to add.
     * @returns {boolean} True if the key/value pair was added to the dictionary successfully; otherwise, false.
     * @throws {ArgumentNullException} key is null.
     * 
     * @remarks This method is similar to the Add method, but Add will throw an exception if the key already exists in the dictionary. This method will not.
     */
    public TryAdd(key: TKey, value: TValue): boolean
    {
        if (key === null) throw Error("key is null");
        if (this._map.has(key)) return false;

        this.Set(key, value);
        return true;
    }

    public ContainsKey(key: TKey): boolean
    {
        if (key === null) throw Error("key is null");

        return this._map.has(key);
    }

    public ContainsValue(value: TValue): boolean
    {
        return Array.from(this._map.values()).includes(value);
    }

    public Remove(key: TKey): boolean
    {
        if (key === null) throw Error("key is null");
        if (this.IsReadOnly) throw Error("The dictionary is read-only");

        return this._map.delete(key);
    }

    public TryGetValue(key: TKey, value: out<TValue>): boolean 
    {
        if (key === null) throw Error("key is null");

        const result = this._map.get(key);

        if (result === undefined)
        {
            return false;
        }

        value.value = result;
        return true;
    }

    public Clear(): void
    {
        if (this.IsReadOnly) throw Error("The dictionary is read-only");

        this._map.clear();
    }

    public Contains(item: KeyValuePair<TKey, TValue>): boolean
    {
        if (item === null) throw Error("item is null");

        const {Key, Value} = item;
        const result = this._map.get(Key);

        if (result === undefined)
        {
            return false;
        }

        return result === Value;
    }

    public CopyTo(array: KeyValuePair<TKey, TValue>[], arrayIndex: number): void
    {
        if (array === null) throw Error("The array cannot be null");
        if (arrayIndex < 0) throw Error("The array index is out of range");
        if (arrayIndex + this.Count > array.length) throw Error("The number of elements in the source collection is greater than the available space from arrayIndex to the end of the destination array");

        const entries = Array.from(this._map.entries());
        for (let i = 0; i < this.Count; i++)
        {
            array[arrayIndex + i] = new KeyValuePair(entries[i][0], entries[i][1]);
        }
    }

    /**
     * @todo Check this more carefully
     * @custom Found in NetCollection in the SDV source code, moved here.
     * @description Removes all elements that match the conditions defined by the predicate.
     * @param {(item: KeyValuePair<TKey, TValue>) => boolean} match - The delegate that defines the conditions of the elements to remove.
     */
    public RemoveWhere(match: (item: KeyValuePair<TKey, TValue>) => boolean): number
    {
        if (this.Count === 0)
        {
            return 0;
        }
        let removed = 0;
        for (let value of this)
        {
            if (match(value))
            {
                this.Remove(value.Key);
                removed++;
            }
        }
        return removed;
    }
}
export default Dictionary;

/**
 * @todo Implement more carefully, AI mostly wrote this from my other code.
 */
class KeyCollection<TKey, TValue> implements ICollection<TKey>, IReadOnlyCollection<TKey>, Iterable<TKey>
{

    //private static readonly __brand: unique symbol = Symbol("KeyCollection");

    //[ICollection]: true = true;
    //[IReadOnlyCollection]: true = true;

    private _dictionary: Dictionary<TKey, TValue>;

    public readonly IsFixedSize = false;

    public readonly IsReadOnly = true;

    constructor(dictionary: Dictionary<TKey, TValue>)
    {
        this._dictionary = dictionary;
    }

    [Symbol.iterator](): Iterator<TKey>
    {
        return this._dictionary.Keys[Symbol.iterator]();
    }

    [index: number]: TKey;

    public get Count(): number
    {
        return this._dictionary.Count;
    }

    public Contains(item: TKey): boolean
    {
        return this._dictionary.ContainsKey(item);
    }

    public CopyTo(array: TKey[], arrayIndex: number): void
    {
        this._dictionary.Keys.CopyTo(array, arrayIndex);
    }

    public Add(item: TKey): void
    {
        throw Error("The collection is read-only");
    }

    public Clear(): void
    {
        throw Error("The collection is read-only");
    }

    public Remove(item: TKey): boolean
    {
        throw Error("The collection is read-only");
    }

}

/**
 * @todo Implement more carefully, AI mostly wrote this from my other code.
 */
class ValueCollection<TKey, TValue> implements ICollection<TValue>, IReadOnlyCollection<TValue>, Iterable<TValue>
{

    //private static readonly __brand: unique symbol = Symbol("ValueCollection");

    //[ICollection]: true = true;
    //[IReadOnlyCollection]: true = true;

    private _dictionary: Dictionary<TKey, TValue>;

    public readonly IsFixedSize = false;

    public readonly IsReadOnly = true;

    constructor(dictionary: Dictionary<TKey, TValue>)
    {
        this._dictionary = dictionary;
    }

    [Symbol.iterator](): Iterator<TValue>
    {
        return this._dictionary.Values[Symbol.iterator]();
    }

    [index: number]: TValue;

    public get Count(): number
    {
        return this._dictionary.Count;
    }

    public Contains(item: TValue): boolean
    {
        return this._dictionary.ContainsValue(item);
    }

    public CopyTo(array: TValue[], arrayIndex: number): void
    {
        this._dictionary.Values.CopyTo(array, arrayIndex);
    }

    public Add(item: TValue): void
    {
        throw Error("The collection is read-only");
    }

    public Clear(): void
    {
        throw Error("The collection is read-only");
    }

    public Remove(item: TValue): boolean
    {
        throw Error("The collection is read-only");
    }

}