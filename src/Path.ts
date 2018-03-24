/**
 * A segment describing an key or index in an object or array
 */
type PathSegment = string | number

/**
 * An path that describes an value in an object or array
 */
type Path = PathSegment | PathSegment[]

export { PathSegment, Path }
