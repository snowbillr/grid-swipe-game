import Phaser from 'phaser';
import { PhecsPlugin } from 'phecs';

class GameScene extends Phaser.Scene {
  phecs: PhecsPlugin;

  init() {
    /*
    this.phecs.register.system(PointDisplaySystem);

    this.phecs.register.prefab('point', {
      components: [
        {
          component: PointComponent,
        }
      ]
    });
    */
  }

  preload() {
    this.load.image('dungeon-spritesheet', 'assets/maps/dungeon-spritesheet.png');
    this.load.tilemapTiledJSON('level-001', 'assets/levels/001.json');

    this.load.spritesheet('hero', 'assets/characters/hero/spritesheet.png', { frameWidth: 32, frameHeight: 56 });
    this.load.animation('hero-animations', 'assets/characters/hero/animations.json');
  }

  create() {
    this.cameras.main.setBackgroundColor(0xCCCCCC);

    const level = this.add.tilemap('level-001');
    level.addTilesetImage('dungeon-tileset', 'dungeon-spritesheet');
    const floor = level.createStaticLayer('floor', 'dungeon-tileset', 100, 100);
    level.createStaticLayer('walls', 'dungeon-tileset', 100, 100);

    const markers = level.getObjectLayer('markers');
    const heroStart = markers.objects.find(o => o.name === 'hero-start');
    if (heroStart == null) {
      throw new Error('Level: `hero-start` marker missing');
    }
    const heroStartTile = floor.getTileAtWorldXY(heroStart.x + 100, heroStart.y + 100);

    const heroPosition = floor.tileToWorldXY(heroStartTile.x, heroStartTile.y);
    const hero = this.add.sprite(heroPosition.x + 16, heroPosition.y + 16, 'hero');

    /*
    this.phecs.add.prefab('point', {}, 10, 20);
    this.phecs.add.prefab('point', {}, 100, 20);
    this.phecs.add.prefab('point', {}, 50, 100);

    this.phecs.add.entity([PointComponent], 100, 100);
    */


  }
}

const game = new Phaser.Game({
  width: 352,
  height: 600,
  scene: [GameScene],
  plugins: {
    scene: [
      {
        key: 'Phecs',
        plugin: PhecsPlugin,
        mapping: 'phecs',
      }
    ]
  }
});