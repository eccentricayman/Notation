/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      title
      type
      data
      tags
<<<<<<< HEAD
      users
=======
      owner
>>>>>>> 92434eff0623ed4dd702441fa7961d272a1fdbff
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        type
        data
        tags
<<<<<<< HEAD
        users
=======
        owner
>>>>>>> 92434eff0623ed4dd702441fa7961d272a1fdbff
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
