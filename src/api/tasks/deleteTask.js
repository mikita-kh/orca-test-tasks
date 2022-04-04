import Storage from 'utils/storage'
import delay from 'utils/delay'

export default delay(taskId => {
  const tasks = Storage.tasks.get()
  const task = tasks.find(t => t.id === taskId)

  if (task) {
    Storage.tasks.set(tasks.filter(t => t.id !== taskId))

    return task
  }

  throw new Error(`SubTask [${taskId}] not found`)
})
