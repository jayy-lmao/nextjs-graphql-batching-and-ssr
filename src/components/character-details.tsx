import { CharacterDetailsFragment } from "../../__generated__/graphql"

interface Props {
    character: CharacterDetailsFragment
}


export const CharacterDetails = ({ character }: Props) => {
    console.log({ character })
    return (<div>
        <div>
            <b>Name:</b><span>{character.name}</span>
        </div>
    </div>
    )

}
