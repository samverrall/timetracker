import { writable } from 'svelte/store'

export function create (data) {
  return writable(JSON.parse(JSON.stringify(data)))
}