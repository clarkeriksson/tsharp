import { out } from "@/lib/emul/_namespace";
import { type ICollection, KeyValuePair } from "@/System.Collections.Generic";

interface IKeyValueCollection<TKey, TValue> extends Omit<ICollection<KeyValuePair<TKey, TValue>>, "Add" | "Remove"> {
    Add(key: TKey, value: TValue): void;
    Remove(key: TKey): boolean;
}

//export const IDictionary = Symbol("System.Collections.Generic.IDictionary");

/**
 * @interface IDictionary<TKey,TValue>
 * @namespace System.Collections.Generic
 * @description Represents a generic collection of key/value pairs.
 * @param {TKey} TKey - The type of keys in the dictionary.
 * @param {TValue} TValue - The type of values in the dictionary.
 * 
 * @remarks IKeyValueCollection is a helper interface that allows the method signature of Add and Remove to be overwritten. In C# it would be ICollection<KeyValuePair<TKey, TValue>>.
 */
export interface IDictionary<TKey, TValue> extends IKeyValueCollection<TKey, TValue>
{

    //[IDictionary]: true;

    /**
     * @description Gets an ICollection containing the keys of the IDictionary.
     * @returns {ICollection<TKey>} An ICollection containing the keys of the IDictionary.
     */
    get Keys(): ICollection<TKey>;

    /**
     * @description Gets an ICollection containing the values in the IDictionary.
     * @returns {ICollection<TValue>} An ICollection containing the values in the IDictionary.
     */
    get Values(): ICollection<TValue>;

    /**
     * @description Gets the element with the specified key.
     * @param {TKey} key - The key of the element to get.
     * @returns {TValue} The element with the specified key.
     * @throws {ArgumentNullException} key is null.
     * @throws {KeyNotFoundException} The key is not found.
     */
    Get(key: TKey): TValue;

    /**
     * @description Sets the element with the specified key.
     * @param {TKey} key - The key of the element to set.
     * @param {TValue} value - The value of the element to set.
     * @throws {ArgumentNullException} key is null.
     * @throws {NotSupportedException} The dictionary is read-only.
     */
    Set(key: TKey, value: TValue): void;

    /**
     * @description Adds an element with the provided key and value to the IDictionary.
     * @param {TKey} key - The object to use as the key of the element to add.
     * @param {TValue} value - The object to use as the value of the element to add.
     * @throws {ArgumentNullException} key is null.
     * @throws {ArgumentException} An element with the same key already exists in the IDictionary.
     * @throws {NotSupportedException} The IDictionary is read-only.
     */
    Add(key: TKey, value: TValue): void;

    /**
     * @description Determines whether the IDictionary contains an element with the specified key.
     * @param {TKey} key - The key to locate in the IDictionary.
     * @returns {boolean} True if the IDictionary contains an element with the key; otherwise, false.
     * @throws {ArgumentNullException} key is null.
     */
    ContainsKey(key: TKey): boolean;

    /**
     * @description Removes the element with the specified key from the IDictionary.
     * @param {TKey} key - The key of the element to remove.
     * @param {out<TValue>} value - When this method returns, the value associated with the specified key, if the key is found; otherwise, the default value for the type of the value parameter. This parameter is passed uninitialized in C#. In this implementation it is emulated using an initialized object.
     * @returns {boolean} True if the element is successfully removed; otherwise, false. This method also returns false if key was not found in the original IDictionary.
     * @throws {ArgumentNullException} key is null.
     * @throws {NotSupportedException} The IDictionary is read-only.
     */
    Remove(key: TKey): boolean;

    /**
     * @description Gets the value associated with the specified key.
     * @param {TKey} key - The key whose value to get.
     * @param {out<TValue>} value - When this method returns, the value associated with the specified key, if the key is found; otherwise, the default value for the type of the value parameter. This parameter is passed uninitialized in C#. In this implementation it is emulated using an initialized object.
     * @returns {boolean} True if the object that implements IDictionary<TKey, TValue> contains an element with the specified key; otherwise, false.
     * @throws {ArgumentNullException} key is null.
     */
    TryGetValue(key: TKey, value: out<TValue>): boolean;

}

enum InsertionBehavior
{

    OverwriteExisting,

    ThrowOnExisting,

    None,

}
export { InsertionBehavior };