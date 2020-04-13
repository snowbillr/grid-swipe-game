import { DirectionInputEffects, DirectionInputTypes, DirectionInputEffect } from "./direction-input-effects";
import { EnterEffect, EnterEffects } from "./enter-effects";

type DungeonTileProperties = {
  walkable: boolean;
};

export class DungeonTile {
  public readonly onEnterEffect?: EnterEffect;

  constructor(
    public readonly x: number,
    public readonly y: number,
    private properties: DungeonTileProperties,
  ) {
    this.onEnterEffect = EnterEffects.CONTINUE_MOVEMENT;
  }

  isWalkable() {
    return this.properties.walkable;
  }

  isPosition(x: number, y: number) {
    return x === this.x && y === this.y;
  }
}