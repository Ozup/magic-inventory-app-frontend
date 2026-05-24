import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"

type Card = {
  id: number

  quantity: number

  card: {
    name: string
    type_line: string
    image_url: string
  }
}

function CollectionDetail() {

  const { id } = useParams()

  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {

    axios
      .get(`http://127.0.0.1:8000/collections/${id}/cards`)
      .then((response) => {

        setCards(response.data)

      })
      .catch((error) => {

        console.error(error)

      })

  }, [id])

  return (

    <div style={{ padding: "20px" }}>

      <h1>Collection Detail</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >

        {
          cards.map((item) => (

            <div
              key={item.id}

              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "12px",
                width: "220px"
              }}
            >

              <img
                src={item.card.image_url}
                alt={item.card.name}

                style={{
                  width: "100%",
                  borderRadius: "8px"
                }}
              />

              <h3>{item.card.name}</h3>

              <p>{item.card.type_line}</p>

              <p>
                Quantity: {item.quantity}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  )
}

export default CollectionDetail