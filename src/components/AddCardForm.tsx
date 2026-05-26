import { useState } from "react"

import axios from "axios"

type Props = {
  collectionId: string

  onCardAdded: () => void
}

type Suggestion = {
  name: string

  set_name: string

  image_url: string

  scryfall_id: string
}

function AddCardForm({
  collectionId,
  onCardAdded
}: Props) {

  const [cardName, setCardName] = useState("")

  const [suggestions, setSuggestions] = useState<
    Suggestion[]
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
        `http://127.0.0.1:8000/collections/${collectionId}/cards/by-name`,
        null,
        {
          params: {
            card_name: cardName
          }
        }
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
              width: "350px",
              backgroundColor: "white",
              marginTop: "5px",
              borderRadius: "8px",
              overflow: "hidden"
            }}
          >

            {
              suggestions.map((suggestion) => (

                <div
                  key={suggestion.scryfall_id}

                  onClick={() => {

                    setCardName(suggestion.name)

                    setSuggestions([])
                  }}

                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    borderBottom: "1px solid #ddd"
                  }}
                >

                  <img
                    src={suggestion.image_url}

                    alt={suggestion.name}

                    style={{
                      width: "50px",
                      borderRadius: "4px"
                    }}
                  />

                  <div>

                    <div>
                      {suggestion.name}
                    </div>

                    <div
                      style={{
                        fontSize: "12px",
                        color: "gray"
                      }}
                    >

                      {suggestion.set_name}

                    </div>

                  </div>

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