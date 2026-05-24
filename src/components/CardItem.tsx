type CardItemProps = {
  name: string
  imageUrl: string
  typeLine: string

  manaCost: string
  rarity: string
  cmc: number

  quantity: number

  setName: string
}

function CardItem({
  name,
  imageUrl,
  typeLine,

  manaCost,
  rarity,
  cmc,

  quantity,

  setName
}: CardItemProps) {

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

    </div>

  )
}

export default CardItem