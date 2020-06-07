import { DungeonTile } from './dungeon-tile';
import { DungeonScene } from '../scenes/dungeon-scene';

export interface DungeonObjectConstructor {
  new (
    scene: DungeonScene,
    dungeonTile: DungeonTile,
    name: string,
    sprite: Phaser.GameObjects.Sprite,
  ): DungeonObject;
}

export class DungeonObject {
  constructor(
    public scene: DungeonScene,
    protected dungeonTile: DungeonTile,
    public name: string,
    public sprite: Phaser.GameObjects.Sprite,
  ) {}

  destroy() {
    this.sprite.destroy();
  }
}
