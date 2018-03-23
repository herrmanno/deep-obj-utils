import { RawPath, Segment } from "./RawPath"
import valuesAndPaths from "./valuesAndPaths"

/**
 * Retrieves all primitive value from an object
 *
 * The order of the returned values is not guarenteed to be sorted in any way
 *
 * @param object the object to retrieve all primitives values from
 * @return an array of all primitive values
 *
 * @example
 * ```javascript
 * const object = { foo: { bar: "bar", baz: [true, 0] }}
 * const result = values(object)
 * // result === [ "bar", true, 0 ]
 * ```
 */
export default function values(object: object | any[]): Array<any> {
  return valuesAndPaths(object).map(o => o.value)
}
