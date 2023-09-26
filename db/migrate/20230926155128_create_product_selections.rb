class CreateProductSelections < ActiveRecord::Migration[7.0]
  def change
    create_table :product_selections do |t|
      t.references :product, null: false, foreign_key: true
      t.string :size
      t.decimal :price

      t.timestamps
    end
  end
end
