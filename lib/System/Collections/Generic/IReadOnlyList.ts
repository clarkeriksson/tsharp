import { type IReadOnlyCollection } from "@/System.Collections.Generic";

/**
 * @interface IReadOnlyList<T>
 * @namespace System.Collections.Generic
 * @description Represents a read-only collection of elements that can be accessed by index.
 * @param {T} T - The type of elements in the read-only list.
 */
interface IReadOnlyList<T = any> extends IReadOnlyCollection<T>, Iterable<T>
{

    /**
     * @description Gets the element at the specified index in the read-only list.
     * @param {number} index - The zero-based index of the element to get.
     * @returns {T} The element at the specified index in the read-only list.
     */
    [index: number]: T;
    [Symbol.iterator](): Iterator<T>;

}
export type { IReadOnlyList };