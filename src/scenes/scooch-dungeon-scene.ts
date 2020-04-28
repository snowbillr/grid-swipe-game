import { PersistencePlugin } from "../plugins/global/persistence-plugin";
import { PhecsPlugin } from "phecs";
import { LevelManagerPlugin } from "../plugins/global/level-manager-plugin";
import { SwipePlugin } from "../plugins/scene/swipe-plugin";

export abstract class ScoochDungeonScene extends Phaser.Scene {
  public persistence!: PersistencePlugin;
  public phecs!: PhecsPlugin;
  public levelManager!: LevelManagerPlugin;
  public swipe!: SwipePlugin;
}