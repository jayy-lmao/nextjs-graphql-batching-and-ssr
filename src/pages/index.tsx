import React from 'react';
import Link from 'next/link'

import { useGetAllCharactersQuery, useGetOneCharacterQuery } from '../../__generated__/graphql';
import { CharacterDetails } from '../components/character-details';
import { addApolloState, initializeApollo } from '../libs/apollo';

import ALL_CHARACTERS_QUERY from './all-characters.query.graphql';
import A_CHARACTER_QUERY from './a-character.query.graphql';


const IndexPage = ({ id }: { id: number }) => {
  const { loading, error, data } = useGetAllCharactersQuery();
  const { loading: charLoading, error: charError, data: charData } = useGetOneCharacterQuery({ variables: { id } });


  if (error || charError) return <h1>Error</h1>;
  if (loading || charLoading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>
        <h3>Setting up Apollo GraphQL in Next.js with Server Side Rendering</h3>
      </h1>
      <CharacterDetails character={charData.character} />
      <br />
      <br />
      <br />
      <div>
        {data.characters.results.map((data) => (
          <ul key={data.id}>
            <li>
              <Link href={`/?id=${data.id}`}>{data.name}</Link>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default IndexPage;

export async function getServerSideProps({req, query}) {
  const id = query?.id || 1;
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: ALL_CHARACTERS_QUERY,
  })
  await apolloClient.query({
    query: A_CHARACTER_QUERY,
    variables: { id }
  })


  const state = addApolloState(apolloClient, {
    props: { id },
  })
  return state;
}


