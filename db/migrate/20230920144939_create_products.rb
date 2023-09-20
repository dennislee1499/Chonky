class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name, null: false 
      t.string :category, null: false 
      t.float :price, null: false 
      t.float :rating, null: false
      t.string :details 
      t.string :color_options, array: true, default: []
      t.string :flavor_options, array: true, default: []
      t.string :size_options, array: true, default: []
      t.timestamps
    end
  end
end
