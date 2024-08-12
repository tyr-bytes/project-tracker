/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("coisd3m6a4w98xb")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_ghvXKeO` ON `projects` (`project_code`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("coisd3m6a4w98xb")

  collection.indexes = [
    "CREATE INDEX `idx_ghvXKeO` ON `projects` (`project_code`)"
  ]

  return dao.saveCollection(collection)
})
