import type { PersonEvent, TransactionEvent } from './lib/domain'

export const personEvents: PersonEvent[] = [
  {
    id: 'rdm_id_123',
    timestamp: 1234,
    operation: 'person_created',
    description: null,
    person: {
      belongings: ['phone', 'earbuds'],
      id: 678,
      name: 'nathan',
      age: 46,
    },
  },

  // --- empty ---
  {
    id: 'rdm_id_234',
    timestamp: 1224,
    operation: 'person_created',
    description: null,
    person: {
      id: 678,
      belongings: null,
      name: null,
      age: null,
    },
  },
  {
    id: 'rdm_id_345',
    timestamp: 1200,
    operation: 'person_created',
    description: null,
    person: {
      id: 678,
      belongings: null,
      name: null,
      age: null,
    },
  },
  {
    id: 'rdm_id_345',
    timestamp: 1200,
    operation: 'person_created',
    description: null,
    person: {
      id: 678,
      belongings: null,
      name: null,
      age: null,
    },
  },

  // --- full ---
  // {
  //   id: 'rdm_id_234',
  //   timestamp: 1224,
  //   operation: 'person_deleted',
  //   description: null,
  //   person: {
  //     belongings: null,
  //     id: 678,
  //     name: null,
  //     age: null,
  //   },
  // },
  {
    id: 'rdm_id_345',
    timestamp: 1200,
    operation: 'person_created',
    description: null,
    person: {
      belongings: ['bag', 'phone'],
      id: 678,
      name: null,
      age: 45,
    },
  },
  // {
  //   id: 'rdm_id_345',
  //   timestamp: 1200,
  //   operation: 'person_created',
  //   description: 'initial commit',
  //   person: {
  //     belongings: ['bag'],
  //     id: 678,
  //     name: 'nathalie',
  //     age: null,
  //   },
  // },
]

export const transactionEvents: TransactionEvent[] = [
  {
    id: 'xZx',
    timestamp: 61238,
    operation: 'transaction_deleted',
    description: 'D! mf D!',
    transaction: {
      id: 78926,
      balance: -20,
      currency: 'GBP',
      details: {
        id: 'xb7dd',
        reason: 'expired',
      },
    },
  },
  {
    id: 'yFy',
    timestamp: 61230,
    operation: 'transaction_created',
    description: null,
    transaction: {
      id: 48201,
      balance: 299,
      currency: 'GBP',
      details: {
        id: 'xb7dd',
        reason: null,
      },
    },
  },
  {
    id: '7t7',
    timestamp: 61000,
    operation: 'transaction_created',
    description: "it's all about the $",
    transaction: {
      id: 90864,
      balance: 56,
      currency: 'GBP',
      details: {
        id: '667xg',
        reason: null,
      },
    },
  },
]
