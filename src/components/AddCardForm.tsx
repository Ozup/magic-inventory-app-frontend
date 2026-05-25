import { useState } from "react"

import axios from "axios"

type Props = {
  collectionId: string

  onCardAdded: () => void
}

function AddCardForm({
  collectionId,
  onCardAdded
}: Props) {

  const [cardName, setCardName] = useState("")

  const addCard = () => {

    if (!cardName) return

    axios
      .post(
        `http://127.0.0.1:8000/collections/${collectionId}/cards/by-name/${cardName}`
      )
      .then(() => {

        setCardName("")

        onCardAdded()

      })
      .catch((error) => {

        console.error(error)

      })
  }

  return (

    <div
      style={{
        marginBottom: "20px"
      }}
    >

      <input
        type="text"

        placeholder="Card name"

        value={cardName}

        onChange={(event) =>
          setCardName(event.target.value)
        }

        style={{
          padding: "10px",
          width: "250px"
        }}
      />

      <button
        onClick={addCard}

        style={{
          padding: "10px",
          marginLeft: "10px",
          cursor: "pointer"
        }}
      >

        Add Card

      </button>

    </div>

  )
}

export default AddCardForm