/**
 * A segment describing an key, index, matcher or wildcard in an object or array
 */
type PatternSegment = string | number | RegExp

/**
 * An pattern that describes a number of paths that fulfills the pattern regarding an specific object or array
 */
type Pattern = PatternSegment | PatternSegment[]

/**
 * Checks if an object is a valid pattern
 * @param p the object to check
 * @returns true if {@code p} is a valid pattern
 */
function isPattern(p: any): p is Pattern {
  return new Array<PatternSegment>().concat(p).every(s => {
    return typeof s === "string" || typeof s === "number" || s instanceof RegExp
  })
}

export { PatternSegment, Pattern, isPattern }
