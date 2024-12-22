import { type ICollection } from "@/System.Collections.Generic";

/**
 * @interface ISet<T>
 * @namespace System.Collections.Generic
 * @description Provides the base interface for the abstraction of sets.
 * @param {T} T - The type of elements in the set.
 */

export const ISet: unique symbol = Symbol("System.Collections.Generic.ISet");

export interface ISet<T = any> extends ICollection<T>, Iterable<T>
{

    [ISet]: true;

    /**
     * @description Adds an element to the current set and returns a value to indicate if the element was successfully added.
     * @param {T} item - The element to add to the set.
     * @returns {boolean} true if the element is added to the set; false if the element is already in the set.
     */
    Add(item: T): boolean;

    //! TODO: document and include the following methods, not done yet because it is uneccessary for the current project

    // ExceptWith(other: Iterable<T>): void;

    // IntersectWith(other: Iterable<T>): void;

    // IsProperSubsetOf(other: Iterable<T>): boolean;

    // IsProperSupersetOf(other: Iterable<T>): boolean;

    // IsSubsetOf(other: Iterable<T>): boolean;

    // IsSupersetOf(other: Iterable<T>): boolean;

    // Overlaps(other: Iterable<T>): boolean;

    // SetEquals(other: Iterable<T>): boolean;

    // SymmetricExceptWith(other: Iterable<T>): void;

    // UnionWith(other: Iterable<T>): void;

}