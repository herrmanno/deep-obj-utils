/**
 * A segment describing an key, index, matcher or wildcard in an object or array
 */
type PatternSegment = string | number | RegExp

/**
 * An pattern that describes a number of paths that fulfills the pattern regarding an specific object or array
 */
type Pattern = PatternSegment | PatternSegment[]

export { PatternSegment, Pattern }
