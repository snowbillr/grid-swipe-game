extends Node2D

onready var player = $Player
onready var tilemap = $TileMap as TileMap

func _ready() -> void:
    print("level ready")
    var tilemap_limits = tilemap.get_used_rect()
    var cell_size = tilemap.cell_size
    var camera = player.get_node("Camera2D") as Camera2D
    camera.limit_left = tilemap_limits.position.x * cell_size.x
    camera.limit_top = tilemap_limits.position.y * cell_size.y
    camera.limit_right = tilemap_limits.end.x * cell_size.x
    camera.limit_bottom = tilemap_limits.end.y * cell_size.y
