import { out } from "@/emul";
import { IDictionary, IReadOnlyDictionary, ICollection, List, KeyValuePair } from "@/System.Collections.Generic";

/**
 * @class Dictionary<TKey,TValue>
 * @namespace System.Collections.Generic
 * @description Represents a generic collection of key/value pairs.
 * @param {TKey} TKey - The type of keys in the dictionary.
 * @param {TValue} TValue - The type of values in the dictionary.
 */
class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue>, IReadOnlyDictionary<TKey, TValue>
{

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

    public readonly IsReadOnly = false;

    public get Keys(): ICollection<TKey>
    {
        return new List<TKey>(this._map.keys());
    }

    public get Values(): ICollection<TValue>
    {
        return new List<TValue>(this._map.values());
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

    public Remove(key: TKey, value?: out<TValue>): boolean
    {
        if (key === null) throw Error("key is null");
        if (this.IsReadOnly) throw Error("The dictionary is read-only");

        if (value !== undefined)
        {
            const result = this._map.get(key);
            if (result === undefined) return false;
            value.value = result;
        }
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

}
export default Dictionary;