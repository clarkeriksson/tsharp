import out from "./out";

export default class ref<T>
{

    private _value: T;

    public get value(): T
    {
        return this._value;
    }

    public set value(value: T)
    {
        this._value = value;
    }

    constructor(value: T)
    {
        this._value = value;
    }

    public outify(): out<T>
    {
        const result = new out<T>();
        result.value = this._value;
        return result;
    }

}