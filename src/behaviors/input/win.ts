import { DungeonTileBehavior, DungeonTile } from "../../dungeon/dungeon-tile";
import { Dungeon } from "../../dungeon/dungeon";
import { Entity } from "phecs/dist/entity";
import { Direction } from "../../constants/directions";
import { ScoochDungeonScene } from "../../scenes/scooch-dungeon-scene";
import { MovementPlanner } from "../../dungeon/movement-planner";
import { SpriteComponent } from "../../components/sprite-component";
import { GridPositionComponent } from "../../components/grid-position-component";
import { ProgressDocument } from "../../persistence/progress-document";
import { DungeonScene } from "../../scenes/dungeon-scene";

export const WinBehavior: DungeonTileBehavior = {
  isApplicable(dungeon: Dungeon, dungeonTile: DungeonTile) {
    const cursor = dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);

    let isApplicable = false;

    if (cursor.right()) {
      isApplicable = isApplicable || cursor.getTile().isObjective();
    }

    cursor.reset();
    if (cursor.left()) {
      isApplicable = isApplicable || cursor.getTile().isObjective();
    }

    cursor.reset();
    if (cursor.up()) {
      isApplicable = isApplicable || cursor.getTile().isObjective();
    }

    cursor.reset();
    if (cursor.down()) {
      isApplicable = isApplicable || cursor.getTile().isObjective();
    }

    return isApplicable;
  },

  run(hero: Entity, direction: Direction, dungeon: Dungeon, dungeonTile: DungeonTile, scene: DungeonScene) {
    const cursor = dungeon.getCursor(dungeonTile.gridX, dungeonTile.gridY);
    cursor.move(direction);
    if (!cursor.getTile().isObjective()) return;

    cursor.getTile().getObject('objective')?.sprite.on(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      if (scene.levelManager.hasLevel(scene.levelNumber + 1)) {
        scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          const progressDocument = scene.persistence.getDocument<ProgressDocument>('progress');
          progressDocument.lastCompletedLevelNumber = scene.levelNumber;
          scene.persistence.store();

          scene.scene.restart({ levelNumber: scene.levelNumber + 1 });
        });
        scene.cameras.main.fadeOut(700);
      } else {
        console.log('beat all the levels')
      }
      });

    cursor.getTile().getObject('objective')?.sprite.anims.play('objective-win');
  }
};
