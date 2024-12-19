/**
 * @interface ICollection<T>
 * @namespace System.Collections.Generic
 * @description Defines methods to manipulate generic collections.
 * @param {T} T - The type of elements in the collection.
 * 
 * @remarks #nullable enable
 */
interface ICollection<T = any> extends Iterable<T>
{

    [index: number]: T;

    /**
     * @description Gets the number of elements contained in the collection.
     * @returns {number} The number of elements contained in the collection.
     */
    get Count(): number;

    /**
     * @description Gets a value indicating whether the collection is read-only.
     * @returns {boolean} True if the collection is fixed-size; otherwise, false.
     */
    get IsFixedSize(): boolean;

    /**
     * @description Gets a value indicating whether the collection is read-only.
     * @returns {boolean} True if the collection is read-only; otherwise, false.
     */
    get IsReadOnly(): boolean;

    /**
     * @description Adds an item to the collection.
     * @param {T} item - The object to add to the collection.
     * @throws {System.NotSupportedException} The collection is read-only.
     */
    Add(item: T): void;

    /**
     * @description Removes all items from the collection.
     * @throws {System.NotSupportedException} The collection is read-only.
     */
    Clear(): void;

    /**
     * @description Determines whether the collection contains a specific value.
     * @param {T} item - The object to locate in the collection.
     * @returns {boolean} True if item is found in the collection; otherwise, false.
     */
    Contains(item: T): boolean;

    /**
     * @description Copies the elements of the collection to an array, starting at a particular array index.
     * @param {T[]} array - The one-dimensional array that is the destination of the elements copied from the collection. The array must have zero-based indexing.
     * @param {number} arrayIndex - The zero-based index in array at which copying begins.
     * @throws {System.ArgumentNullException} array is null.
     * @throws {System.ArgumentOutOfRangeException} arrayIndex is less than 0.
     * @throws {System.ArgumentException} The number of elements in the source collection is greater than the available space from arrayIndex to the end of the destination array.
     */
    CopyTo(array: T[], arrayIndex: number): void;

    /**
     * @description Removes the first occurrence of a specific object from the collection.
     * @param {T} item - The object to remove from the collection.
     * @returns {boolean} True if item was successfully removed from the collection; otherwise, false. This method also returns false if item is not found in the original collection.
     * @throws {System.NotSupportedException} The collection is read-only.
     */
    Remove(item: T): boolean;

}
export type { ICollection };