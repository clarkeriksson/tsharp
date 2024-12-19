/**
 * @interface IComparer<T>
 * @namespace System.Collections.Generic
 * @description Defines a method that a type implements to compare two objects.
 */
interface IComparer<T = any>
{

    /**
     * @description Compares two objects and returns a value indicating whether one is less than, equal to, or greater than the other.
     * @param {Nullable<T>} x - The first object to compare.
     * @param {Nullable<T>} y - The second object to compare.
     * @returns {number} A signed integer that indicates the relative values of x and y.
     */
    Compare(x: Nullable<T>, y: Nullable<T>): number;

}
export type { IComparer };