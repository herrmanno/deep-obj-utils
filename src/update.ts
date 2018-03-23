import set from "./set"
import get from "./get"
import { RawPath } from "./RawPath"

/**
 * Creates an object that is similiar to a given object but differs at a specific path
 *
 * @param path the path at which the the created object shall be different
 * @param obj the object to use as blueprint
 * @param updater a function that transforms the given objects value at path to a new value
 *
 * @example
 * ```javascript
 * const object = { foo: [null, { bar: "bar" }] }
 *
 * let result = update(["foo", 1, "bar"], v => v.toUpperCase())
 * // result === { foo: [null, { bar: "BAR" }] }
 *
 * // with autovivication
 * const object = {}
 *
 * let result = set(["foo", 1, "bar"], object, v => v.toUpperCase())
 * // result === { foo: [null, { bar: "BAR" }] }
 * // *missing* segments will be created on the fly
 * // if `typeof segment === "string"`  an empty object will be created at the non-existing path
 * // if `typeof segment === "number"`  an empty array will be created at the non-existing path
 * ```
 */
export default function update<T>(
  path: RawPath,
  obj: T,
  updater: (o: any) => any
): T {
  return set(path, obj, updater(get(path, obj)))
}
