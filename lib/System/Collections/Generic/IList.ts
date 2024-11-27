import { type ICollection } from "@/System.Collections.Generic";

/**
 * @interface IList<T>
 * @namespace System.Collections.Generic
 * @description Represents a collection of objects that can be individually accessed by index.
 * @param {T} T - The type of elements in the list.
 * 
 * @remarks using System.Reflection
 */
interface IList<T = any> extends ICollection<T>, Iterable<T>
{

    /**
     * @description Gets or sets the element at the specified index.
     * @param {number} index - The zero-based index of the element to get or set.
     * @returns {T} The element at the specified index.
     * @throws {System.ArgumentOutOfRangeException} index is not a valid index in the list.
     * @throws {System.NotSupportedException} The property is set and the list is read-only.
     */
    [index: number]: T;
    [Symbol.iterator](): Iterator<T>;

    /**
     * @description Determines the index of a specific item in the list.
     * @param {T} item - The object to locate in the list.
     * @returns {number} The index of item if found in the list; otherwise, -1.
     */
    IndexOf(item: T): number;

    /**
     * @description Inserts an item to the list at the specified index.
     * @param {number} index - The zero-based index at which item should be inserted.
     * @param {T} item - The object to insert into the list.
     * @throws {System.ArgumentOutOfRangeException} index is not a valid index in the list.
     * @throws {System.NotSupportedException} The list is read-only.
     */
    Insert(index: number, item: T): void;

    /**
     * @description Removes the item at the specified index.
     * @param {number} index - The zero-based index of the item to remove.
     * @throws {System.ArgumentOutOfRangeException} index is not a valid index in the list.
     * @throws {System.NotSupportedException} The list is read-only.
     */
    RemoveAt(index: number): void;

}
export type { IList };