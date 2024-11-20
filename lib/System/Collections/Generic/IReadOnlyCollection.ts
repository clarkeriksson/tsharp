/**
 * @interface IReadOnlyCollection<T>
 * @namespace System.Collections.Generic
 * @description Represents a strongly-typed, read-only collection of elements.
 * @param {T} T - The type of the elements.
 */
interface IReadOnlyCollection<T = any> extends Iterable<T>
{

    /**
     * @description Gets the number of elements in the collection.
     * @returns {number} The number of elements in the collection.
     */

}
export default IReadOnlyCollection;