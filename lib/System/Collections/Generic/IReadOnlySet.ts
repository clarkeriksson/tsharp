import { IReadOnlyCollection } from "@/System.Collections.Generic";

/**
 * @interface IReadOnlySet<T>
 * @namespace System.Collections.Generic
 * @description Provides a readonly abstraction of a set.
 * @param {T} T - The type of elements in the set.
 */
interface IReadOnlySet<T = any> extends IReadOnlyCollection<T>, Iterable<T>
{

    /**
     * @description Determines whether the set contains a specific value.
     * @param {T} item - The item to check if the set contains.
     * @returns {boolean} true if the set contains the item; otherwise, false.
     */
    Contains(item: T): boolean;

    //! TODO: document and include the following methods, not done yet because it is uneccessary for the current project

    // IsProperSubsetOf(other: Iterable<T>): boolean;

    // IsProperSupersetOf(other: Iterable<T>): boolean;

    // IsSubsetOf(other: Iterable<T>): boolean;

    // IsSupersetOf(other: Iterable<T>): boolean;

    // Overlaps(other: Iterable<T>): boolean;

    // SetEquals(other: Iterable<T>): boolean;

}
export default IReadOnlySet;