export class SubSystem {
  static idOf(target: unknown) {
    if (target == null) throw new Error();

    if (target instanceof SubSystem) {
      return this.idOf(target.constructor);
    }

    if (target !== SubSystem) {
      return Object.prototype.
    }
  }


}
