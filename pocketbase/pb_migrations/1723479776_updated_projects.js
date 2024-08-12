/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("coisd3m6a4w98xb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9b3na0zc",
    "name": "project_code",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("coisd3m6a4w98xb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9b3na0zc",
    "name": "project_code",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
