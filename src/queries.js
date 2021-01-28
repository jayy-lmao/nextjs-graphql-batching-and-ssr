import gql from 'graphql-tag';

export const ALL_CHARACTERS = gql`
    query allCharacters {
        characters {
            results {
                id
                name
            }
        }
    }
`;

export const A_CHARACTER = gql`
    query character($id: Int!) {
        character(id: $id) {
                id
                name
        }
    }
`;
