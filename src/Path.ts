import { isPattern } from "./Pattern"

/**
 * A segment describing an key or index in an object or array
 */
type PathSegment = string | number

/**
 * An path that describes an value in an object or array
 */
type Path = PathSegment | PathSegment[]

/**
 * Checks if an object is a valid path
 * @param p the object to check
 * @returns true if {@code p} is a valid path
 */
function isPath(p: any): p is Path {
  return (
    isPattern(p) &&
    new Array<PathSegment>().concat(p as any).every(s => {
      return (
        (typeof s === "string" || typeof s === "number") &&
        s !== "*" &&
        s !== "**"
      )
    })
  )
}

/**
 * Checks if an path contains number-like strings
 * @param p the path to check
 * @returns true, if {@code p} contains a number-like string
 */
function hasNumberlikeStrings(p: Path) {
  return new Array<PathSegment>().some(s => {
    return typeof s === "string" && !isNaN(Number(s))
  })
}

export { PathSegment, Path, isPath, hasNumberlikeStrings }
