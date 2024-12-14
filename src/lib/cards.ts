type Suite = 'Club' | 'Diamond' | 'Spade' | 'Heart'

type Rank =
  | 'Ace'
  | 'Two'
  | 'Three'
  | 'Four'
  | 'Five'
  | 'Six'
  | 'Seven'
  | 'Eight'
  | 'Nine'
  | 'Ten'
  | 'Jack'
  | 'Queen'
  | 'King'

type Card = `${Rank}Of${Suite}`

type Hand = Array<Card>
type Deck = Array<Card>

type Player = { Name: string; Hand: Hand }
type Game = { Players: Array<Player>; Deck: Deck }

type Deal = (deck: Deck) => [Deck, Card]
type PickupCard = (hand: Hand) => (card: Card) => Hand

// const pick: PickupCard = (hand: Hand) => (card: Card) => {
//   return hand.concat(card)
// }

// const deal: Deal = (deck: Deck) => {
//   return [deck.splice(0, 3)]
// }

