/**
 * @interface IStringable<T>
 * @namespace System
 * @description Represents an object that provides a meaningful ToString() method.
 * @param {T} T - The type of the object that provides a meaningful ToString() method.
 * 
 * @remarks This interface does not exist in C#, instead the ToString() method is defined in the Object class.
 */

//export const IStringable: unique symbol = Symbol("System.IStringable");

export interface IStringable<T = any>
{

    //[IStringable]: true;

    /**
     * @description Returns a string that represents the current object.
     * @returns {string} A string that represents the current object.
     */
    ToString(): string;

}