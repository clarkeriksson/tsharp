export default class out<T>
{

    private _value: T;
    private _isSet: boolean;

    public get value(): T
    {
        if (this._isSet)
        {
            return this._value;
        }
        else
        {
            throw Error("T# out variables should not be accessed before being set.");
        }
    }

    public set value(value: T)
    {
        this._value = value;
        this._isSet = true;
    }

    constructor()
    {
        // I am trying to emulate the [MaybeNullWhen(false)] attribute here.

        // Scenario 1 => The type T is nullable, and the value is set to null.
            // this casting is fine because the type T was nullable.

        // Scenario 2 => The type T is nullable, and the value is set to a non-null value.
            // this casting is fine because this._value is overwritten with a non-null value of type T.

        // Scenario 3 => The type T is non-nullable, and the value is set to null.
            // this cannot be done without typescript complaining about it.
            // if this is intended, then the application is something like a TryGet method, and if the value is not found and this remains null, it will not be accessed anyways.

        // Scenario 4 => The type T is non-nullable, and the value is set to a non-null value.
            // this casting is fine because this._value is overwritten with a non-null value of type T.

        this._isSet = false;
        this._value = null as T;
    }

}