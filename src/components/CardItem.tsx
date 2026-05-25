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
  typeLine,

  manaCost,
  rarity,
  cmc,

  quantity,

  setName,

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

  return (

    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "12px",
        width: "220px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}
    >

      <img
        src={imageUrl}
        alt={name}

        style={{
          width: "100%",
          borderRadius: "8px"
        }}
      />

      <h3>{name}</h3>

      <p>{typeLine}</p>

      <p>
        Mana Cost: {manaCost}
      </p>

      <p>
        Rarity: {rarity}
      </p>

      <p>
        Set: {setName}
      </p>

      <p>
        CMC: {cmc}
      </p>

      <p>
        Quantity: {quantity}
      </p>

      <button
        onClick={removeCard}

        style={{
          marginTop: "10px",
          padding: "8px",
          cursor: "pointer"
        }}
      >

        Remove

      </button>

    </div>

  )
}

export default CardItem