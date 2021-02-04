import React from 'react';
import { useGetAllCharactersQuery, useGetOneCharacterQuery } from '../../__generated__/graphql';
import { CharacterDetails } from '../components/character-details';
import { addApolloState, initializeApollo } from '../libs/apollo';

import ALL_CHARACTERS_QUERY from './all-characters.query.graphql';
import A_CHARACTER_QUERY from './a-character.query.graphql';


const IndexPage = ({ id }: { id: number }) => {
  console.log({ id })
  const [charId, setCharId] = React.useState(id);
  const { loading, error, data } = useGetAllCharactersQuery();
  const { loading: charLoading, error: charError, data: charData } = useGetOneCharacterQuery({ variables: { id: charId } });

  console.log({ data, charData })

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
            <li onClick={() => { setCharId(data.id) }}> {data.name}</li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default IndexPage;

export async function getServerSideProps() {
  const id = 1;
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: ALL_CHARACTERS_QUERY,
  })
  await apolloClient.query({
    query: A_CHARACTER_QUERY,
    variables: { id }
  })


  return addApolloState(apolloClient, {
    props: { id },
    revalidate: 1,
  })
}

