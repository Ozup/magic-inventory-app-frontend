import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"

import CardItem from "../components/CardItem"

import AddCardForm from "../components/AddCardForm"

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

  const [rarityFilter, setRarityFilter] = useState("")

  const [nameFilter, setNameFilter] = useState("")

  const [sortBy, setSortBy] = useState("")

  const fetchCards = () => {

    axios
      .get(
        `http://127.0.0.1:8000/collections/${id}/cards`,
        {
          params: {
            type: typeFilter,
            rarity: rarityFilter,
            name: nameFilter,
            sort_by: sortBy
          }
        }
      )
      .then((response) => {

        setCards(response.data)

      })
      .catch((error) => {

        console.error(error)

      })
  }

  useEffect(() => {

    fetchCards()

  }, [
    id,
    typeFilter,
    rarityFilter,
    nameFilter,
    sortBy
  ])

  return (

    <div style={{ padding: "20px" }}>

      <h1>Collection Detail</h1>

      {
        id && (

          <AddCardForm
            collectionId={id}

            onCardAdded={fetchCards}
          />

        )
      }

      <select
        value={typeFilter}

        onChange={(event) =>
          setTypeFilter(event.target.value)
        }

        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "250px"
        }}
      >

        <option value="">
          All Types
        </option>

        <option value="Creature">
          Creature
        </option>

        <option value="Instant">
          Instant
        </option>

        <option value="Sorcery">
          Sorcery
        </option>

        <option value="Artifact">
          Artifact
        </option>

        <option value="Enchantment">
          Enchantment
        </option>

        <option value="Land">
          Land
        </option>

        <option value="Planeswalker">
          Planeswalker
        </option>

      </select>

      <select
        value={rarityFilter}

        onChange={(event) =>
          setRarityFilter(event.target.value)
        }

        style={{
          padding: "10px",
          marginBottom: "20px",
          marginLeft: "10px",
          width: "250px"
        }}
      >

        <option value="">
          All Rarities
        </option>

        <option value="common">
          Common
        </option>

        <option value="uncommon">
          Uncommon
        </option>

        <option value="rare">
          Rare
        </option>

        <option value="mythic">
          Mythic
        </option>

      </select>

      <input
        type="text"

        placeholder="Search by card name"

        value={nameFilter}

        onChange={(event) =>
          setNameFilter(event.target.value)
        }

        style={{
          padding: "10px",
          marginBottom: "20px",
          marginLeft: "10px",
          width: "250px"
        }}
      />

      <select
        value={sortBy}

        onChange={(event) =>
          setSortBy(event.target.value)
        }

        style={{
          padding: "10px",
          marginBottom: "20px",
          marginLeft: "10px",
          width: "250px"
        }}
      >

        <option value="">
          No Sorting
        </option>

        <option value="name">
          Sort by Name
        </option>

        <option value="cmc">
          Sort by CMC
        </option>

        <option value="rarity">
          Sort by Rarity
        </option>

      </select>

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