/**
 * @class KeyValuePair<TKey, TValue>
 * @namespace System.Collections.Generic
 * @description Provides the Create factory method for KeyValuePair<TKey, TValue>.
 * @param {TKey} TKey - The type of the key.
 * @param {TValue} TValue - The type of the value.
 */

class KeyValuePair<TKey, TValue>
{

    private static readonly __brand: unique symbol = Symbol("KeyValuePair");

    private readonly key: TKey;
    private readonly value: TValue;

    public get Key(): TKey { return this.key; }
    public get Value(): TValue { return this.value; }

    constructor(key: TKey, value: TValue)
    {
        this.key = key;
        this.value = value;
    }

}
export default KeyValuePair;