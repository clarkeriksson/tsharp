/**
 * @type Comparison<T>
 * @namespace System
 * @description Represents a method that compares two objects of the same type.
 * 
 * @remarks The type parameter T is contravariant.
 */
type Comparison<T> = (x: T, y: T) => number; // int
export type { Comparison };