export function generateSlots(startTime, endTime) {
  const slots = []
  let current = new Date(`1970-01-01T${startTime}`)
  const end = new Date(`1970-01-01T${endTime}`)

  while (current < end) {
    slots.push(current.toTimeString().slice(0, 5))
    current.setMinutes(current.getMinutes() + 30)
  }

  return slots
}
