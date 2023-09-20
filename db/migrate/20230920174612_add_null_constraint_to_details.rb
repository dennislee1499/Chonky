class AddNullConstraintToDetails < ActiveRecord::Migration[7.0]
  def change
      change_column_null :products, :details, false
  end
end
