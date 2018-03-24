import { Path, PathSegment } from "./Path"

/**
 * Retrieves all primitive value and their corresponding paths from an object
 *
 * The order of the returned values is not guarenteed to be sorted in any way
 *
 * @param object the object to retrieve all primitives values from
 * @return an array of all primitive values and their corresponding paths
 *
 * @example
 * ```javascript
 * const object = { foo: { bar: "bar", baz: [true, 0] }}
 * const result = values(object)
 * // result === [
 *   { path: [ "foo", "bar", ], value: "bar" },
 *   { path: [ "foo", "baz", 0 ], value: true },
 *   { path: [ "foo", "baz", 1 ], value: 0 }
 * ]
 * ```
 */
function valuesAndPaths(
  object: object | any[]
): Array<{ path: Path; value: any }> {
  return _valuesAndPaths(object, [])
}

/**
 * @private
 * @hidden
 */
function _valuesAndPaths(
  object: object | any[],
  prefix: PathSegment[]
): Array<{ path: Path; value: any }> {
  if (null === object || typeof object !== "object") {
    return [{ path: prefix, value: object }]
  } else {
    if (object instanceof Array) {
      return object
        .map((element, i) => _valuesAndPaths(element, [...prefix, i]))
        .reduce((a, b) => [...a, ...b], [])
    } else {
      return Object.keys(object)
        .map((key: string) =>
          _valuesAndPaths((<any>object)[key], [...prefix, key])
        )
        .reduce((a, b) => [...a, ...b], [])
    }
  }
}

export default valuesAndPaths
export { valuesAndPaths }
