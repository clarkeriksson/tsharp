/**
 * @interface IDisposable
 * @namespace System
 * @description Provides a mechanism for releasing unmanaged resources.
 */

export const IDisposable: unique symbol = Symbol("System.IDisposable");

export interface IDisposable
{

    [IDisposable]: true;

    /**
     * @description Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
     */
    Dispose(): void;

}