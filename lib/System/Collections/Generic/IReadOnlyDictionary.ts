import { out } from "@/lib/emul/_namespace";
import { type ICollection, type IReadOnlyCollection, KeyValuePair } from "@/System.Collections.Generic";

/**
 * @interface IReadOnlyDictionary<TKey,TValue>
 * @namespace System.Collections.Generic
 * @description Represents a generic collection of key/value pairs.
 * @param {TKey} TKey - The type of keys in the dictionary.
 * @param {TValue} TValue - The type of values in the dictionary.
 * 
 * @remarks IKeyValueCollection is a helper interface that allows the method signature of Add and Remove to be overwritten. In C# it would be ICollection<KeyValuePair<TKey, TValue>>.
 */

//export const IReadOnlyDictionary: unique symbol = Symbol("System.Collections.Generic.IReadOnlyDictionary");

export interface IReadOnlyDictionary<TKey, TValue> extends IReadOnlyCollection<KeyValuePair<TKey, TValue>>
{

    //[IReadOnlyDictionary]: true;

    /**
     * @description Gets an ICollection containing the keys of the IReadOnlyDictionary.
     * @returns {ICollection<TKey>} An ICollection containing the keys of the IReadOnlyDictionary.
     */
    get Keys(): ICollection<TKey>;

    /**
     * @description Gets an ICollection containing the values in the IReadOnlyDictionary.
     * @returns {ICollection<TValue>} An ICollection containing the values in the IReadOnlyDictionary.
     */
    get Values(): ICollection<TValue>;

    /**
     * @description Gets the element with the specified key.
     * @param {TKey} key - The key of the element to get.
     * @returns {TValue} The element with the specified key.
     * @throws {ArgumentNullException} key is null.
     * @throws {KeyNotFoundException} The property is retrieved and key is not found.
     * @throws {NotSupportedException} The property is set and the dictionary is read-only.
     */
    Get(key: TKey): TValue;

    /**
     * @description Determines whether the IReadOnlyDictionary contains an element with the specified key.
     * @param {TKey} key - The key to locate in the IReadOnlyDictionary.
     * @returns {boolean} True if the IReadOnlyDictionary contains an element with the key; otherwise, false.
     * @throws {ArgumentNullException} key is null.
     */
    ContainsKey(key: TKey): boolean;

    /**
     * @description Gets the value associated with the specified key.
     * @param {TKey} key - The key whose value to get.
     * @param {out<TValue>} value - When this method returns, the value associated with the specified key, if the key is found; otherwise, the default value for the type of the value parameter. This parameter is passed uninitialized in C#. In this implementation it is emulated using an initialized object.
     * @returns {boolean} True if the object that implements IReadOnlyDictionary<TKey, TValue> contains an element with the specified key; otherwise, false.
     * @throws {ArgumentNullException} key is null.
     */
    TryGetValue(key: TKey, value: out<TValue>): boolean;

}