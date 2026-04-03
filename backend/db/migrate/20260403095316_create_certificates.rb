class CreateCertificates < ActiveRecord::Migration[5.2]
  def change
    create_table :certificates do |t|
      t.string :name, null: false, default: ""
      t.text :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
