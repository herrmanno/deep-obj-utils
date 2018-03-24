import { Pattern, PatternSegment } from "./Pattern"
import { Path } from "./Path"

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
function expand(pattern: Pattern, object: object | any[]): Path[] {
  const patternArr: Pattern = new Array<PatternSegment>().concat(pattern)
  const [segment, nextSegment] = patternArr

  // primitive type does return no mathing paths
  if (null === object || typeof object !== "object") {
    return [] // matches(segment, object) ? [object] : []
  } else {
    if (patternArr.length > 1) {
      const nextPatternArr = patternArr.slice(1)
      // find all subobject that matches segment
      // and return all results of expand(patternArr.slice(1), subObj).flatMap().map(path => [segment, ...path])
      // if segment is "**" return all those results and also thoose, expand the existing pattern (w/ leading '**') over subObj
      if (object instanceof Array) {
        return object
          .filter((_, i) => matches(segment, i))
          .map((element, i) => {
            if (segment === "**") {
              return [
                ...expand(patternArr, element).map(path => [
                  i,
                  ...new Array<any>().concat(path)
                ]),
                ...expand(nextPatternArr, element).map(path => [
                  i,
                  ...new Array<any>().concat(path)
                ])
              ]
            } else {
              return expand(nextPatternArr, element).map(path => [
                i,
                ...new Array<any>().concat(path)
              ])
            }
          })
          .reduce((a, b) => [...a, ...b], [])
      } else {
        return Object.keys(object)
          .filter(k => matches(segment, k))
          .map((key: string) => {
            if (segment === "**") {
              return [
                ...expand(patternArr, (<any>object)[key]).map(path => [
                  key,
                  ...new Array<any>().concat(path)
                ]),
                ...expand(nextPatternArr, (<any>object)[key]).map(path => [
                  key,
                  ...new Array<any>().concat(path)
                ])
              ]
            } else {
              return expand(nextPatternArr, (<any>object)[key]).map(path => [
                key,
                ...new Array<any>().concat(path)
              ])
            }
          })
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

/**
 * Checks if an pattern segment matches a path segment
 * @param patternSegment the pattern segment
 * @param key the path segment to test against
 *
 * @private
 * @hidden
 */
function matches(patternSegment: PatternSegment, key: string | number) {
  if (patternSegment instanceof RegExp) {
    return patternSegment.test(String(key))
  } else if (patternSegment === "**") {
    return true
  } else if (patternSegment === "*") {
    return true
  } else {
    return patternSegment === key
  }
}

export default expand
export { expand }
