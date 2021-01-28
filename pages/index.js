import React from 'react';
import {withApollo} from '../libs/apollo';
import {useQuery} from '@apollo/react-hooks';
import {
  ALL_CHARACTERS,
  A_CHARACTER
} from '../src/queries';

const IndexPage = () => {
  const [charId, setCharId] = React.useState("1");
  const {loading, error, data} = useQuery(ALL_CHARACTERS);
  const {loading: charLoading, error: charError, data: charData} = useQuery(A_CHARACTER, {variables: {id: charId}});
  if (error || charError) return <h1>Error</h1>;
  if (loading || charLoading) return <h1>Loading...</h1>;
  console.log({charData})

  return (
    <>
      <h1>
        <h3>Setting up Apollo GraphQL in Next.js with Server Side Rendering</h3>
      </h1>
      <div>
        <b>Name:</b><span>{charData?.character?.name}</span>
      </div>
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
