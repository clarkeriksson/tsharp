/**
 * @interface IDisposable
 * @namespace System
 * @description Provides a mechanism for releasing unmanaged resources.
 */
interface IDisposable
{

    /**
     * @description Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
     */
    Dispose(): void;

}
export default IDisposable;