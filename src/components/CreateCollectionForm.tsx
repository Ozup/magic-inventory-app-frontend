import { useState } from "react"

import axios from "axios"

type Props = {
  onCollectionCreated: () => void
}

function CreateCollectionForm({
  onCollectionCreated
}: Props) {

  const [name, setName] = useState("")

  const [type, setType] = useState("DECK")

  const createCollection = () => {

    axios
      .post(
        "http://127.0.0.1:8000/collections/",
        {
          name: name,
          type: type
        }
      )
      .then(() => {

        setName("")

        setType("DECK")

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

      <h2>Create Collection</h2>

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

      </select>

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