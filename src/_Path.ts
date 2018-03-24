import { Path } from "./Path"
import get from "./get"

/**
 * Encapsulates the {@link get} function in an object oriented manner
 * @private
 * @hidden
 */
export default class _Path {
  readonly path: Path

  constructor(path: Path) {
    this.path = path
  }

  get(object: object | any[]): any {
    return get(this.path, object)
  }
}
