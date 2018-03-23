import { RawPattern, Segment } from "./RawPattern"
import { RawPath } from "./RawPath"

/**
 * Expands a pattern to all matching conrete paths over an object
 * @param pattern the pattern to expand
 * @param object the object to expand onto
 *
 * @example
 * ```javascript
 * const o = {
 *   foo: {
 *     bar: "bar",
 *     baz: "baz",
 *   },
 *   foo2: [
 *     "one",
 *     "two",
 *   ]
 * }
 * let result = expand(["*"], o)
 * // result === [ ["foo"], ["foo2"] ]
 * let result = expand(["*", "*"], o)
 * // result === [ ["foo", "bar"], ["foo", "baz"], ["foo2", 0], ["foo2", 1] ]
 * let result = expand(["foo", "*"], o)
 * // result ===  [ ["foo", "bar"], ["foo", "baz"] ]
 * ```
 */
// TODO: support "**" path segment
export default function expand(
  pattern: RawPattern,
  object: object | any[]
): RawPath[] {
  const patternArr: RawPattern = new Array<Segment>().concat(pattern)
  const [segment] = patternArr

  // primitive type does return theirself, if the match the current segment
  if (null === object || typeof object !== "object") {
    return [] // matches(segment, object) ? [object] : []
  } else {
    if (patternArr.length > 1) {
      // find all subobject that matches segment
      // and return all results of expand(patternArr.slice(1), subObj).flatMap().map(path => [segment, ...path])
      if (object instanceof Array) {
        return object
          .filter((_, i) => matches(segment, i))
          .map((element, i) =>
            expand(patternArr.slice(1), element).map(path => [
              i,
              ...new Array<any>().concat(path)
            ])
          )
          .reduce((a, b) => [...a, ...b], [])
      } else {
        return Object.keys(object)
          .filter(k => matches(segment, k))
          .map((key: string) =>
            expand(patternArr.slice(1), (<any>object)[key]).map(path => [
              key,
              ...new Array<any>().concat(path)
            ])
          )
          .reduce((a, b) => [...a, ...b], [])
      }
    } else {
      // find all keys in object that matches segment
      // and return this keys
      if (object instanceof Array) {
        return object.map((_, i) => i).filter(i => matches(segment, i))
      } else {
        return Object.keys(object).filter(k => matches(segment, k))
      }
    }
  }
}

function matches(patternSegment: Segment, key: string | number) {
  if (patternSegment instanceof RegExp) {
    return patternSegment.test(String(key))
  } else if (patternSegment === "*") {
    return true
  } else {
    return patternSegment === key
  }
}
