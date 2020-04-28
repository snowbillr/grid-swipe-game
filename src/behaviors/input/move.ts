import { DungeonTileBehavior, DungeonTile } from "../../dungeon/dungeon-tile";
import { MovementPlanner } from "../../dungeon/movement-planner";
import { Direction } from "../../constants/directions";
import { Dungeon } from "../../dungeon/dungeon";
import { DungeonScene } from "../../scenes/dungeon-scene";

export const MoveBehavior: DungeonTileBehavior = {
  isApplicable(dungeonTile: DungeonTile, dungeon: Dungeon) {
    return dungeonTile.isWalkable();
  },

  run(direction: Direction, dungeonTile: DungeonTile, scene: DungeonScene) {
    const movementTimeline = MovementPlanner.buildMovementTimeline(scene.hero, direction, scene.dungeon, scene);
    movementTimeline.play();
  }
}