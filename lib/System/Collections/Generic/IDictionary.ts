import { ICollection, KeyValuePair } from "@/System.Collections.Generic";

type IKeyValueCollection<TKey, TValue> = Omit<ICollection<KeyValuePair<TKey, TValue>>, "Add" | "Remove"> & {
    Add(key: TKey, value: TValue): void;
    Remove(key: TKey): boolean;
}

/**
 * @interface IDictionary<TKey,TValue>
 * @namespace System.Collections.Generic
 * @description Represents a generic collection of key/value pairs.
 * @param {TKey} TKey - The type of keys in the dictionary.
 * @param {TValue} TValue - The type of values in the dictionary.
 * 
 * @remarks IKeyValueCollection is a helper interface that allows the method signature of Add and Remove to be overwritten. In C# it would be ICollection<KeyValuePair<TKey, TValue>>.
 */
interface IDictionary<TKey, TValue> extends IKeyValueCollection<TKey, TValue>
{

    Add(key: TKey, value: TValue): void;
    Remove(key: TKey): boolean;

}