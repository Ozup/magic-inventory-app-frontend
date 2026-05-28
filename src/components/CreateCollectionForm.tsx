import {
  useEffect,
  useState
} from "react"

import axios from "axios"

type Props = {
  onCollectionCreated: () => void
}

type ScryfallSet = {
  code: string

  name: string

  set_type: string
}

function CreateCollectionForm({
  onCollectionCreated
}: Props) {

  const [name, setName] =
    useState("")

  const [type, setType] =
    useState("DECK")

  const [sets, setSets] =
    useState<ScryfallSet[]>([])

  const [setCode, setSetCode] =
    useState("")

  useEffect(() => {

    axios
      .get(
        "https://api.scryfall.com/sets"
      )
      .then((response) => {

        const filteredSets =
          response.data.data.filter(
            (set: ScryfallSet) =>
              [
                "expansion",
                "core",
                "masters"
              ].includes(set.set_type)
          )

        setSets(filteredSets)

      })
      .catch((error) => {

        console.error(error)

      })

  }, [])

  const createCollection = () => {

    axios
      .post(
        "http://127.0.0.1:8000/collections/",
        {
          name: name,

          type: type,

          set_code:
            type === "ALBUM"
              ? setCode
              : null
        }
      )
      .then(() => {

        setName("")

        setType("DECK")

        setSetCode("")

        onCollectionCreated()

      })
      .catch((error) => {

        console.error(error)

      })
  }

  return (

    <div
      style={{
        marginBottom: "30px"
      }}
    >

      <h2>
        Create Collection
      </h2>

      <input
        type="text"

        placeholder="Collection name"

        value={name}

        onChange={(event) =>
          setName(event.target.value)
        }

        style={{
          padding: "10px",
          width: "250px"
        }}
      />

      <select
        value={type}

        onChange={(event) =>
          setType(event.target.value)
        }

        style={{
          padding: "10px",
          marginLeft: "10px"
        }}
      >

        <option value="DECK">
          Deck
        </option>

        <option value="ALBUM">
          Album
        </option>

        <option value="COLLECTION">
          Collection
        </option>

      </select>

      {
        type === "ALBUM" && (

          <select
            value={setCode}

            onChange={(event) =>
              setSetCode(
                event.target.value
              )
            }

            style={{
              padding: "10px",
              marginLeft: "10px",
              width: "250px"
            }}
          >

            <option value="">
              Select Set
            </option>

            {
              sets.map((set) => (

                <option
                  key={set.code}

                  value={set.code}
                >

                  {set.name}
                  {" ("}
                  {set.code.toUpperCase()}
                  {")"}

                </option>

              ))
            }

          </select>

        )
      }

      <button
        onClick={createCollection}

        style={{
          padding: "10px",
          marginLeft: "10px",
          cursor: "pointer"
        }}
      >

        Create

      </button>

    </div>

  )
}

export default CreateCollectionForm