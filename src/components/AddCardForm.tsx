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

  const [suggestions, setSuggestions] = useState<
    string[]
  >([])

  const fetchSuggestions = (
    value: string
  ) => {

    setCardName(value)

    if (!value) {

      setSuggestions([])

      return
    }

    axios
      .get(
        "http://127.0.0.1:8000/cards/autocomplete",
        {
          params: {
            query: value
          }
        }
      )
      .then((response) => {

        setSuggestions(response.data)

      })
      .catch((error) => {

        console.error(error)

      })
  }

  const addCard = () => {

    if (!cardName) return

    axios
      .post(
        `http://127.0.0.1:8000/collections/${collectionId}/cards/by-name/${cardName}`
      )
      .then(() => {

        setCardName("")

        setSuggestions([])

        onCardAdded()

      })
      .catch((error) => {

        console.error(error)

      })
  }

  return (

    <div
      style={{
        marginBottom: "20px",
        position: "relative"
      }}
    >

      <input
        type="text"

        placeholder="Card name"

        value={cardName}

        onChange={(event) =>
          fetchSuggestions(event.target.value)
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

      {
        suggestions.length > 0 && (

          <div
            style={{
              border: "1px solid #ccc",
              width: "250px",
              backgroundColor: "white",
              marginTop: "5px"
            }}
          >

            {
              suggestions.map((suggestion) => (

                <div
                  key={suggestion}

                  onClick={() => {

                    setCardName(suggestion)

                    setSuggestions([])
                  }}

                  style={{
                    padding: "8px",
                    cursor: "pointer"
                  }}
                >

                  {suggestion}

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  )
}

export default AddCardForm