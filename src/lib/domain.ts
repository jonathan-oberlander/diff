import type { Prettify } from './helpers'

type WithId<T> = { id: string | number } & T
type BaseEvent = WithId<{ timestamp: number; description: string | null }>
type WithEvent<T> = BaseEvent & T

type Belongings = string[] | null
type Person = WithId<{
  name: string | null
  age: number | null
  belongings: Belongings
}>

type Details = { id: string; reason: string | null }
type Transaction = WithId<{
  currency: string | null
  balance: number | null
  details: Details
}>

type OnPerson = 'person_created' | 'person_deleted' | 'person_updated'
type OnTransaction =
  | 'transaction_created'
  | 'transaction_deleted'
  | 'transaction_updated'

export type PersonEvent = WithEvent<{ operation: OnPerson; person: Person }>
export type TransactionEvent = WithEvent<{
  operation: OnTransaction
  transaction: Transaction
}>

export type Event = PersonEvent | TransactionEvent
export type Operation = OnPerson | OnTransaction

export type View = Prettify<Event>

// export function onOperation(operation: Operation): Event {
//   switch (operation) {
//     case 'person_created':
//     case 'person_updated':
//     case 'person_deleted': {
//       return {
//         id: 'rdm_id',
//         timestamp: 12,
//         operation,
//         description: '',
//         person: {
//           belongings: [],
//           id: 55,
//           age: 23,
//           name: 'bruce',
//         },
//       }
//     }

//     case 'transaction_created':
//     case 'transaction_deleted':
//     case 'transaction_updated': {
//       return {
//         id: 'rdm_id',
//         timestamp: 12,
//         operation,
//         description: null,
//         transaction: {
//           id: 55,
//           balance: 8,
//           currency: 'GBP',
//           details: {
//             id: '888',
//             reason: null,
//           },
//         },
//       }
//     }

//     default: {
//       // exhaustive check
//       const out: never = operation
//       return out
//     }
//   }
// }

