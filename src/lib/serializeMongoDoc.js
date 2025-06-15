export function serializeMongoDoc(doc) {
  if (!doc) return doc

  // Handle array of docs
  if (Array.isArray(doc)) {
    return doc.map(serializeMongoDoc)
  }

  // Convert Mongoose document to plain object (if needed)
  const plain = typeof doc.toObject === 'function' ? doc.toObject() : doc

  const result = {}

  for (const key in plain) {
    const value = plain[key]

    if (value instanceof Date) {
      result[key] = value.toISOString()
    } else if (typeof value === 'object' && value !== null && value._bsontype === 'ObjectId') {
      result[key] = value.toString()
    } else {
      result[key] = value
    }
  }

  return result
}
