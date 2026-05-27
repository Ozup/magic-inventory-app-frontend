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

  onCardRemoved: () => void
}

function CardItem({
  name,
  imageUrl,

  quantity,

  collectionId,

  cardId,

  onCardRemoved
}: CardItemProps) {

  const removeCard = () => {

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

  const updateQuantity = (
    newQuantity: number
  ) => {

    axios
      .patch(
        `http://127.0.0.1:8000/collections/${collectionId}/cards/${cardId}/quantity`,
        null,
        {
          params: {
            quantity: newQuantity
          }
        }
      )
      .then(() => {

        onCardRemoved()

      })
      .catch((error) => {

        console.error(error)

      })
  }

  return (

    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "10px",
        width: "220px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        backgroundColor: "white"
      }}
    >

      <img
        src={imageUrl}
        alt={name}

        style={{
          width: "100%",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      />

      <h3
        style={{
          fontSize: "16px",
          marginTop: "10px",
          marginBottom: "10px"
        }}
      >

        {name}

      </h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px"
        }}
      >

        <button
          onClick={() =>
            updateQuantity(quantity - 1)
          }

          disabled={quantity <= 1}

          style={{
            padding: "5px 10px",
            cursor:
              quantity <= 1
                ? "not-allowed"
                : "pointer",

            opacity:
              quantity <= 1
                ? 0.5
                : 1
          }}
        >

          -

        </button>

        <span
          style={{
            fontWeight: "bold"
          }}
        >

          {quantity}

        </span>

        <button
          onClick={() =>
            updateQuantity(quantity + 1)
          }

          style={{
            padding: "5px 10px",
            cursor: "pointer"
          }}
        >

          +

        </button>

      </div>

      <button
        onClick={removeCard}

        style={{
          marginTop: "12px",
          padding: "8px",
          width: "100%",
          cursor: "pointer",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      >

        Remove

      </button>

    </div>

  )
}

export default CardItem