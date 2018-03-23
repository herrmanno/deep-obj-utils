/**
 * A segment describing an key or index in an object or array
 */
export type Segment = string | number

/**
 * An path that describes an value in an object or array
 */
export type RawPath = Segment | Segment[]
