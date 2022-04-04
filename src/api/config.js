import faker from 'faker'
import Storage from 'utils/storage'

// eslint-disable-next-line import/no-mutable-exports
let labels = Storage.labels.get()

if (!labels.length) {
  labels = new Set([...Array(10)].map(() => faker.lorem.word()))

  Storage.labels.set(Array.from(labels))
}

export { labels }
