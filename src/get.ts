import { RawPath } from "./RawPath"

/**
 * Retrieves a value in an object described by an path
 * @param path the path at which the objects value should be retrieved
 * @param obj the object to retrieve a value from
 *
 * @example
 * ```javascript
 * const object = { foo: [null, { bar: "BAR" }] }
 * const result = get(["foo", 1, "bar"], object)
 * // result === "BAR"
 * ```
 */
export default function get<T>(path: RawPath, obj: T): any {
  const pathArr: RawPath = new Array<any>().concat(path)
  return pathArr.reduce((o: any, segment) => {
    if (null !== o && undefined !== o) {
      return o[segment]
    } else {
      return o
    }
  }, obj)
}
