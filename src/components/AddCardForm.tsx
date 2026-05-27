import { useEffect, useState } from "react"

import axios from "axios"

type Props = {
  collectionId: string

  onCardAdded: () => void
}

type Suggestion = {
  name: string

  set_name: string

  set_code: string

  collector_number: string

  rarity: string

  image_url: string

  scryfall_id: string
}

function AddCardForm({
  collectionId,
  onCardAdded
}: Props) {

  const [cardName, setCardName] =
    useState("")

  const [debouncedCardName,
  setDebouncedCardName] =
    useState("")

  const [selectedCardId,
  setSelectedCardId] =
    useState("")

  const [suggestions, setSuggestions] =
    useState<Suggestion[]>([])

  useEffect(() => {

    const timeout = setTimeout(() => {

      setDebouncedCardName(cardName)

    }, 300)

    return () => clearTimeout(timeout)

  }, [cardName])

  useEffect(() => {

    if (!debouncedCardName) {

      setSuggestions([])

      return
    }

    axios
      .get(
        "http://127.0.0.1:8000/cards/autocomplete",
        {
          params: {
            query: debouncedCardName
          }
        }
      )
      .then((response) => {

        setSuggestions(response.data)

      })
      .catch((error) => {

        console.error(error)

      })

  }, [debouncedCardName])

  const addCard = () => {

    if (!selectedCardId) return

    axios
      .post(
        `http://127.0.0.1:8000/collections/${collectionId}/cards/by-scryfall-id/${selectedCardId}`
      )
      .then(() => {

        setCardName("")

        setDebouncedCardName("")

        setSelectedCardId("")

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

      {
        suggestions.length > 0 && (

          <div
            style={{
              border: "1px solid #ccc",
              width: "420px",
              backgroundColor: "white",
              marginTop: "5px",
              borderRadius: "8px",
              overflow: "hidden",
              maxHeight: "500px",
              overflowY: "auto"
            }}
          >

            {
              suggestions.map((suggestion) => (

                <div
                  key={suggestion.scryfall_id}

                  onClick={() => {

                    setCardName(
                      suggestion.name
                    )

                    setSelectedCardId(
                      suggestion.scryfall_id
                    )

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

                    <div
                      style={{
                        fontWeight: "bold"
                      }}
                    >
                      {suggestion.name}
                    </div>

                    <div
                      style={{
                        fontSize: "12px",
                        color: "gray"
                      }}
                    >

                      {suggestion.set_name}
                      {" • "}
                      {suggestion.set_code}
                      {" • #"}
                      {suggestion.collector_number}
                      {" • "}
                      {suggestion.rarity}

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