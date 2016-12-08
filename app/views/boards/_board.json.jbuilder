json.extract! board, :id, :name, :created_at, :updated_at
json.url board_url(board, format: :json)

json.lists board.lists do |list|
  json.id list.id
  json.title list.title
end
