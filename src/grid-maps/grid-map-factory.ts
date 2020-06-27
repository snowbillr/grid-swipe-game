import { ScoochDungeonScene } from '../scenes/scooch-dungeon-scene';
import { GridTileData } from './grid-tile-data';
import { normalize } from '../lib/tiled-properties-normalizer';
import { GridTile } from './grid-tile';
import { GridTileFactory } from './grid-tile-factory';
import { GridMap } from './grid-map';
import { GridMarker } from './grid-marker';

export class GridMapFactory {
  private gridTileFactory: GridTileFactory;

  constructor(
    private scene: ScoochDungeonScene
  ) {
    this.gridTileFactory = new GridTileFactory(scene);
  }

  public createGridMap(levelKey: string, x: number, y: number) {
    const tilemap = this.scene.add.tilemap(levelKey);
    tilemap.addTilesetImage('overworld-tileset', 'overworld-tilesheet');

    const floor = this.createFloor(tilemap, x, y);
    const gridTiles = this.createGridTiles(tilemap, floor);

    const gridMarkers = this.createGridMarkers(tilemap, x, y);

    const gridMap = new GridMap(gridTiles, gridMarkers, floor, tilemap);

    // gridTiles.forEach(gridTile => this.gridTileFactory.addBehaviors(gridTile, dungeon));

    return gridMap;
  }

  private createFloor(tilemap: Phaser.Tilemaps.Tilemap, x: number, y: number): Phaser.Tilemaps.DynamicTilemapLayer {
    return tilemap.createDynamicLayer('floor', 'overworld-tileset', x, y);
  }

  private createGridTiles(tilemap: Phaser.Tilemaps.Tilemap, floor: Phaser.Tilemaps.DynamicTilemapLayer): GridTile[] {
    const tileData = new GridTileData();

    // gather floor tile data
    floor.forEachTile(function(tile: Phaser.Tilemaps.Tile) {
      Object.entries(tile.properties).forEach(([key, value]) => {
        tileData.addKeyValue(tile.x, tile.y, key, value);
      });
    }, this, 0, 0, tilemap.width, tilemap.height, {
      isNotEmpty: true
    });

    // gather object tile data
    /*
    const objects = tilemap.getObjectLayer('objects').objects.map(o => {
      return {
        gridX: Math.round(o.x! / 32),
        gridY: Math.round((o.y! - 32) / 32),
        index: o.gid!,
        properties: normalize(o.properties!)
      }
    });
    objects.forEach(object => {
      tileData.addObject(object.gridX, object.gridY, object.index, object.properties);

      Object.entries(object.properties).forEach(([key, value]) => {
        tileData.addKeyValue(object.gridX, object.gridY, key, value);
      });
    });
    */

    // create tiles
    const gridTiles: GridTile[] = [];
    tileData.forEach((coordinates, properties, objects) => {
      const worldCoordinates = tilemap.tileToWorldXY(coordinates.x, coordinates.y);

      const dungeonTile = this.gridTileFactory.create(
        coordinates.x,
        coordinates.y,
        worldCoordinates.x,
        worldCoordinates.y,
        properties,
        [] //objects
      );
      gridTiles.push(dungeonTile);
    });

    return gridTiles;
  }

  private createGridMarkers(tilemap: Phaser.Tilemaps.Tilemap, x: number, y: number): Record<string, GridMarker> {
    const markers = tilemap.getObjectLayer('markers').objects;
    const dungeonMarkers: Record<string, GridMarker> = markers.reduce((acc, marker) => {
      const gridCoordinates = tilemap.getTileAtWorldXY(marker.x! + x, marker.y! + y);
      const worldCoordinates = tilemap.tileToWorldXY(gridCoordinates.x, gridCoordinates.y);

      acc[marker.name] = new GridMarker(marker.name, gridCoordinates.x, gridCoordinates.y, worldCoordinates.x, worldCoordinates.y);

      return acc;
    }, {} as Record<string, GridMarker>);

    return dungeonMarkers;
  }
}
