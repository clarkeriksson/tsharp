import { List } from "@/System.Collections.Generic";

/**
 * @class Random
 * @namespace System
 * @description Represents a pseudo-random number generator, a device that produces random data.
 */
class Random //TODO: this is mostly filled out with what I need exclusively, but I should probably fill out the rest of the class.
{

    //private static readonly __brand: unique symbol = Symbol("Random");

    public static readonly MAX_VALUE: number = 0x100000000;

    private static SplitMix32(seed: number): () => number
    {
        return function()
        {
            seed |= 0;
            seed = seed + 0x9e3779b9 | 0;
            let t = seed ^ seed >>> 16;
            t = Math.imul(t, 0x21f0aaad);
            t = t ^ t >>> 15;
            t = Math.imul(t, 0x735a2d97);
            return ((t = t ^ t >>> 15) >>> 0);
        }
    }

    private _random: () => number;

    constructor(seed: number)
    {
        this._random = Random.SplitMix32(seed);
    }

    /**
     * @description Returns a non-negative random integer.
     * @param {number} value0 - If there are two arguments, this argument is the exclusive upper bound. Otherwise, this argument is the inclusive lower bound.
     * @param {number} value1 - The exclusive upper bound.
     * @returns {number} A non-negative random integer.
     * 
     * @remarks If there are no arguments, the return value can be anywhere in the range of 0 to Int32 maximum.
     */
    public Next(value0?: number, value1?: number): number
    {
        if (value0 === undefined)
        {
            return this._random();
        }
        else if (value1 === undefined)
        {
            return Math.floor(this.NextDouble() * value0);
        }
        else
        {
            return Math.floor(this.NextDouble() * (value1 - value0) + value0);
        }
    }

    /**
     * @description Returns a non-negative random floating-point number that is less than 1.0.
     * @returns {number} A non-negative random floating-point number that is less than 1.0.
     */
    public NextDouble(): number
    {
        return this._random() / Random.MAX_VALUE;
    }
    
    /**
     * @description Returns a random boolean value.
     * @returns {boolean} A random boolean value.
     */
    public NextBool(): boolean
    {
        return this.NextDouble() < 0.5;
    }

    /**
     * @description Returns a random element from the specified list.
     * @param {List<T>} options - The list to choose from.
     * @returns {T} A random element from the specified list.
     */
    public ChooseFrom<T>(options: List<T>): T
    {
        return options[this.Next(options.Count)];
    }

}
export default Random;