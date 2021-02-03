import React from 'react';
import {withApollo} from '../libs/apollo';
import {useGetAllCharactersQuery, useGetOneCharacterQuery} from '../../__generated__/graphql';
import {CharacterDetails} from '../components/character-details';

const IndexPage = () => {
  const [charId, setCharId] = React.useState(1);
  const {loading, error, data} = useGetAllCharactersQuery();
  const {loading: charLoading, error: charError, data: charData} = useGetOneCharacterQuery({variables: {id: charId}});
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
            <li onClick={() => {setCharId(data.id)}}> {data.name}</li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default withApollo({ssr: true})(IndexPage);
