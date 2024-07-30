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

type View = Prettify<Event>

export function onOperation(operation: Operation): Event {
  switch (operation) {
    case 'person_created':
    case 'person_updated':
    case 'person_deleted': {
      return {
        id: 'rdm_id',
        timestamp: 12,
        operation,
        description: '',
        person: {
          belongings: [],
          id: 55,
          age: 23,
          name: 'bruce',
        },
      }
    }

    case 'transaction_created':
    case 'transaction_deleted':
    case 'transaction_updated': {
      return {
        id: 'rdm_id',
        timestamp: 12,
        operation,
        description: null,
        transaction: {
          id: 55,
          balance: 8,
          currency: 'GBP',
          details: {
            id: '888',
            reason: null,
          },
        },
      }
    }

    default: {
      // exhaustive check
      const out: never = operation
      return out
    }
  }
}

// type Suite = 'Club' | 'Diamond' | 'Spade' | 'Heart'

// type Rank =
//   | 'Ace'
//   | 'Two'
//   | 'Three'
//   | 'Four'
//   | 'Five'
//   | 'Six'
//   | 'Seven'
//   | 'Eight'
//   | 'Nine'
//   | 'Ten'
//   | 'Jack'
//   | 'Queen'
//   | 'King'

// type Card = `${Rank}Of${Suite}`

// type Hand = Array<Card>
// type Deck = Array<Card>

// type Player = { Name: string; Hand: Hand }
// type Game = { Players: Array<Player>; Deck: Deck }

// type Deal = (deck: Deck) => [Deck, Card]
// type PickupCard = (hand: Hand) => (card: Card) => Hand

// const pick: PickupCard = (hand: Hand) => (card: Card) => {
//   return hand.concat(card)
// }

// const deal: Deal = (deck: Deck) => {
//   return [deck.splice(0, 3)]
// }

// type Context = { [key: string]: unknown }
// type RT<T extends unknown[], R> = (ctx: Context) => (...args: T) => R

// const curry =
//   <T extends unknown[], R>(fn: (ctx: Context, ...args: T) => R): RT<T, R> =>
//   (ctx: Context) =>
//   (...args: T) =>
//     fn(ctx, ...args)

// // Usage
// // const greet = (context: Context, name: string): string =>
// //   `Hello, ${name}! My name is ${context.name}.`

// const context = { name: 'Alice' }
// const greetWithContext = curry(greet)(context)

// // console.log(greetWithContext('Bob'))
