import { RawPath } from "./RawPath"

/**
 * Creates an object that is similiar to a given object but differs at a specific path
 *
 * @param path the path at which the the created object shall be different
 * @param obj the object to use as blueprint
 * @param value the value to insert at the given path
 *
 * @example
 * ```javascript
 * const object = { foo: [null, { bar: "BAR" }] }
 *
 * let result = set(["foo", 0, "baz"], object, "baz")
 * // result === { foo: ["baz", { bar: "BAR" }] }
 * // object === { foo: [null, { bar: "BAR" }] } !
 *
 * // with autovivication
 * const object = {}
 *
 * let result = set(["foo", 0, "baz"], object, "baz")
 * // result === { foo: ["baz", { bar: "BAR" }] }
 * // *missing* segments will be created on the fly
 * // if `typeof segment === "string"`  an empty object will be created at the non-existing path
 * // if `typeof segment === "number"`  an empty array will be created at the non-existing path
 * ```
 */
// TODO: make autovivication configurable
export default function set<T>(path: RawPath, obj: T, value: any): T {
  const pathArr: RawPath = new Array<any>().concat(path)
  if (pathArr.length === 0) {
    return value
  } else {
    const segment = pathArr[0]
    const numberSegment = isNaN(+segment) ? NaN : +segment
    const isNumber = !isNaN(numberSegment)

    const objOrDefault: any = obj || (isNumber ? new Array(segment) : {})

    if (isNumber) {
      return <any>[
        ...objOrDefault.slice(0, segment),
        set(pathArr.slice(1), objOrDefault[segment], value),
        ...objOrDefault.slice(<number>segment + 1)
      ]
    } else {
      return {
        ...objOrDefault,
        [segment]: set(pathArr.slice(1), objOrDefault[segment], value)
      }
    }
  }
}
