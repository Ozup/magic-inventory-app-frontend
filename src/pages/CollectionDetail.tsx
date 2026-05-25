import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"

import CardItem from "../components/CardItem"

type Card = {
  id: number

  quantity: number

  card: {
    name: string
    type_line: string
    image_url: string

    mana_cost: string
    rarity: string
    cmc: number

    set_name: string
  }
}

function CollectionDetail() {

  const { id } = useParams()

  const [cards, setCards] = useState<Card[]>([])

  const [typeFilter, setTypeFilter] = useState("")

  useEffect(() => {

    axios
      .get(
        `http://127.0.0.1:8000/collections/${id}/cards`,
        {
          params: {
            type: typeFilter
          }
        }
      )
      .then((response) => {

        setCards(response.data)

      })
      .catch((error) => {

        console.error(error)

      })

  }, [id, typeFilter])

  return (

    <div style={{ padding: "20px" }}>

      <h1>Collection Detail</h1>

      <input
        type="text"

        placeholder="Filter by type"

        value={typeFilter}

        onChange={(event) =>
          setTypeFilter(event.target.value)
        }

        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "250px"
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >

        {
          cards.map((item) => (

            <CardItem
              key={item.id}

              name={item.card.name}
              imageUrl={item.card.image_url}
              typeLine={item.card.type_line}

              manaCost={item.card.mana_cost}
              rarity={item.card.rarity}
              cmc={item.card.cmc}

              quantity={item.quantity}

              setName={item.card.set_name}
            />

          ))
        }

      </div>

    </div>

  )
}

export default CollectionDetail