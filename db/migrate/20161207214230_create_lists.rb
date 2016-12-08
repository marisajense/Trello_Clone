class CreateLists < ActiveRecord::Migration[5.0]
  def change
    create_table :lists do |t|
      t.string :title
      t.belongs_to :board

      t.timestamps
    end
  end
end
