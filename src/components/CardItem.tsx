import { useState } from "react"

import axios from "axios"

type CardItemProps = {
  name: string
  imageUrl: string
  typeLine: string

  manaCost: string
  rarity: string
  cmc: number

  quantity: number

  setName: string

  collectionId: string

  cardId: number

  collectionType: string

  viewMode: "view" | "edit"

  cardSize:
    "compact"
    |
    "medium"
    |
    "large"

  onQuantityChange: (
    cardId: number,
    quantity: number
  ) => void

  onCardRemoved: () => void
}

function CardItem({
  name,
  imageUrl,
  typeLine,

  manaCost,
  rarity,
  cmc,

  quantity,

  setName,

  collectionId,

  cardId,

  collectionType,

  viewMode,

  cardSize,

  onQuantityChange,

  onCardRemoved
}: CardItemProps) {

  const [showModal, setShowModal] =
    useState(false)

  const [isHovered, setIsHovered] =
    useState(false)

  const removeCard = () => {

    const confirmed = window.confirm(
      "Remove this card from the collection?"
    )

    if (!confirmed) return

    axios
      .delete(
        `http://127.0.0.1:8000/collections/${collectionId}/cards/${cardId}`
      )
      .then(() => {

        onCardRemoved()

      })
      .catch((error) => {

        console.error(error)

      })
  }

  return (

    <>

      <div
        onMouseEnter={() =>
          setIsHovered(true)
        }

        onMouseLeave={() =>
          setIsHovered(false)
        }

        style={{
          border: "1px solid #ddd",

          borderRadius: "12px",

          padding:
            viewMode === "view"
              ? "6px"
              : "10px",

          width:

            viewMode === "edit"

              ? "220px"

              :

              cardSize === "compact"

                ? "120px"

                :

                cardSize === "medium"

                  ? "150px"

                  : "220px",

          backgroundColor: "white",

          transition: "0.2s ease",

          transform:
            isHovered
              ? "translateY(-6px)"
              : "translateY(0px)",

          boxShadow:
            isHovered
              ? "0 8px 20px rgba(0,0,0,0.18)"
              : "0 2px 6px rgba(0,0,0,0.08)"
        }}
      >

        <img
          src={imageUrl}
          alt={name}

          onClick={() =>
            setShowModal(true)
          }

          style={{
            width: "100%",

            borderRadius: "10px",

            cursor: "pointer",

            filter:
              quantity === 0
                ? "grayscale(100%)"
                : "grayscale(0%)",

            opacity:
              quantity === 0
                ? 0.6
                : 1,

            transition: "0.2s ease"
          }}
        />

        {
          viewMode === "edit"
          && (

            <h3
              style={{
                fontSize: "16px",
                marginTop: "10px",
                marginBottom: "10px"
              }}
            >

              {name}

            </h3>

          )
        }

        {
          viewMode === "edit"
          && (

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px"
              }}
            >

              <button
                onClick={() => {

                  if (
                    collectionType !== "ALBUM"
                    &&
                    quantity <= 1
                  ) {
                    return
                  }

                  if (
                    collectionType === "ALBUM"
                    &&
                    quantity < 0
                  ) {
                    return
                  }

                  onQuantityChange(
                    cardId,
                    quantity - 1
                  )
                }}

                disabled={
                  collectionType !== "ALBUM"
                  &&
                  quantity <= 1
                }

                style={{
                  padding: "5px 10px",

                  cursor:
                    (
                      collectionType !== "ALBUM"
                      &&
                      quantity <= 1
                    )
                      ? "not-allowed"
                      : "pointer",

                  opacity:
                    (
                      collectionType !== "ALBUM"
                      &&
                      quantity <= 1
                    )
                      ? 0.5
                      : 1,

                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
              >

                -

              </button>

              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "16px"
                }}
              >

                {quantity}

              </span>

              <button
                onClick={() =>
                  onQuantityChange(
                    cardId,
                    quantity + 1
                  )
                }

                style={{
                  padding: "5px 10px",
                  cursor: "pointer",

                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
              >

                +

              </button>

            </div>

          )
        }

        {
          viewMode === "edit"
          &&
          collectionType !== "ALBUM"
          && (

            <button
              onClick={removeCard}

              style={{
                marginTop: "12px",

                padding: "8px",

                width: "100%",

                cursor: "pointer",

                borderRadius: "8px",

                border: "1px solid #ccc",

                transition: "0.2s"
              }}
            >

              Remove

            </button>

          )
        }

      </div>

      {
        showModal && (

          <div
            onClick={() =>
              setShowModal(false)
            }

            style={{
              position: "fixed",

              top: 0,
              left: 0,

              width: "100%",
              height: "100%",

              backgroundColor:
                "rgba(0,0,0,0.75)",

              backdropFilter: "blur(4px)",

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              zIndex: 1000
            }}
          >

            <div
              onClick={(event) =>
                event.stopPropagation()
              }

              style={{
                backgroundColor: "white",

                padding: "20px",

                borderRadius: "18px",

                width: "400px",

                maxHeight: "90vh",

                overflowY: "auto",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.25)"
              }}
            >

              <img
                src={imageUrl}
                alt={name}

                style={{
                  width: "100%",
                  borderRadius: "12px",

                  filter:
                    quantity === 0
                      ? "grayscale(100%)"
                      : "grayscale(0%)",

                  opacity:
                    quantity === 0
                      ? 0.6
                      : 1
                }}
              />

              <h2
                style={{
                  marginTop: "15px",
                  marginBottom: "15px"
                }}
              >

                {name}

              </h2>

              <p>
                <strong>
                  Type:
                </strong>
                {" "}
                {typeLine}
              </p>

              <p>
                <strong>
                  Mana Cost:
                </strong>
                {" "}
                {manaCost || "None"}
              </p>

              <p>
                <strong>
                  Rarity:
                </strong>
                {" "}
                {rarity}
              </p>

              <p>
                <strong>
                  Set:
                </strong>
                {" "}
                {setName}
              </p>

              <p>
                <strong>
                  CMC:
                </strong>
                {" "}
                {cmc}
              </p>

              <button
                onClick={() =>
                  setShowModal(false)
                }

                style={{
                  marginTop: "15px",

                  width: "100%",

                  padding: "10px",

                  cursor: "pointer",

                  borderRadius: "10px",

                  border: "1px solid #ccc"
                }}
              >

                Close

              </button>

            </div>

          </div>

        )
      }

    </>

  )
}

export default CardItem