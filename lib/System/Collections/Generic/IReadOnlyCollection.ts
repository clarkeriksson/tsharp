/**
 * @interface IReadOnlyCollection<T>
 * @namespace System.Collections.Generic
 * @description Represents a strongly-typed, read-only collection of elements.
 * @param {T} T - The type of the elements.
 */

export const IReadOnlyCollection: unique symbol = Symbol("System.Collections.Generic.IReadOnlyCollection");

export interface IReadOnlyCollection<T = any> extends Iterable<T>
{

    [IReadOnlyCollection]: true;

    /**
     * @description Gets the number of elements in the collection.
     * @returns {number} The number of elements in the collection.
     */
    get Count(): number;

}