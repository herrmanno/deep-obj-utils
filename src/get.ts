import { Path, isPath } from "./Path"

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
function get<T>(path: Path, obj: T): any {
  if (process && process.env && process.env.NODE_ENV === "development") {
    if (!isPath(path)) {
      throw new TypeError(`${path} is not a valid path`)
    }
  }

  const pathArr: Path = new Array<any>().concat(path)
  return pathArr.reduce((o: any, segment) => {
    if (null !== o && undefined !== o) {
      return o[segment]
    } else {
      return o
    }
  }, obj)
}

export default get
export { get }
