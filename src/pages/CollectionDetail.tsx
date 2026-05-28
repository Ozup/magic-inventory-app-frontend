import { useEffect, useState } from "react"

import {
  Link,
  useParams
} from "react-router-dom"

import axios from "axios"

import CardItem from "../components/CardItem"

import AddCardForm from "../components/AddCardForm"

type Card = {
  id: number

  quantity: number

  card: {
    id: number
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

  const [cards, setCards] =
    useState<Card[]>([])

  const [editedQuantities,
  setEditedQuantities] =
    useState<
      Record<number, number>
    >({})

  const [collectionName,
  setCollectionName] =
    useState("")

  const [collectionType,
  setCollectionType] =
    useState("")

  const [viewMode,
  setViewMode] =
    useState<"view" | "edit">(
      "view"
    )

  const [cardSize,
  setCardSize] =
    useState<
      "compact"
      |
      "medium"
      |
      "large"
    >("medium")

  const [ownedCards,
  setOwnedCards] =
    useState(0)

  const [totalCards,
  setTotalCards] =
    useState(0)

  const [duplicates,
  setDuplicates] =
    useState(0)

  const [completionPercentage,
  setCompletionPercentage] =
    useState(0)

  const [loading, setLoading] =
    useState(true)

  const [typeFilter, setTypeFilter] =
    useState("")

  const [rarityFilter, setRarityFilter] =
    useState("")

  const [nameFilter, setNameFilter] =
    useState("")

  const [sortBy, setSortBy] =
    useState("")

  const updateLocalQuantity = (
    cardId: number,
    quantity: number
  ) => {

    setEditedQuantities(
      (prev) => ({

        ...prev,

        [cardId]: quantity
      })
    )
  }

  const saveChanges = async () => {

    try {

      await Promise.all(

        cards.map((item) => {

          const quantity =
            editedQuantities[
              item.card.id
            ]

          return axios.patch(
            `http://127.0.0.1:8000/collections/${id}/cards/${item.card.id}/quantity`,
            null,
            {
              params: {
                quantity
              }
            }
          )
        })
      )

      fetchCards()

      setViewMode("view")

      alert(
        "Changes saved!"
      )

    } catch (error) {

      console.error(error)

      alert(
        "Failed to save changes"
      )
    }
  }

  const cancelChanges = () => {

    const quantities:
      Record<number, number> = {}

    cards.forEach((item) => {

      quantities[
        item.card.id
      ] = item.quantity
    })

    setEditedQuantities(
      quantities
    )
    setViewMode("view")

    alert(
      "Changes discarded"
    )
  }

  const fetchCards = () => {

    setLoading(true)

    axios
      .get(
        `http://127.0.0.1:8000/collections/${id}`
      )
      .then((response) => {

        setCollectionName(
          response.data.name
        )

        setCollectionType(
          response.data.type
        )

        setOwnedCards(
          response.data.owned_cards
        )

        setTotalCards(
          response.data.total_cards
        )

        setDuplicates(
          response.data.duplicates
        )

        setCompletionPercentage(
          response.data.completion_percentage
        )

      })
      .catch((error) => {

        console.error(error)

      })

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

        const quantities:
          Record<number, number> = {}

        response.data.forEach(
          (item: Card) => {

            quantities[
              item.card.id
            ] = item.quantity
          }
        )

        setEditedQuantities(
          quantities
        )

        setLoading(false)

      })
      .catch((error) => {

        console.error(error)

        setLoading(false)

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

    <div
      style={{
        padding: "20px",

        minHeight: "100vh",

        overflowY: "auto"
      }}
    >

      <div
        style={{
          marginBottom: "25px"
        }}
      >

        <Link
          to="/"

          style={{
            textDecoration: "none",
            color: "#555",
            fontSize: "14px"
          }}
        >

          ← Back to Collections

        </Link>

        <h1
          style={{
            marginTop: "10px",
            marginBottom: "0px"
          }}
        >

          {
            collectionName ||
            "Collection"
          }

        </h1>

        {
          collectionType === "ALBUM"
          && (

            <div
              style={{
                marginTop: "15px",

                padding: "16px",

                backgroundColor: "#f5f5f5",

                borderRadius: "12px",

                display: "flex",

                gap: "20px",

                flexWrap: "wrap",

                alignItems: "center"
              }}
            >

              <div>

                <strong>
                  Collected:
                </strong>

                {" "}

                {ownedCards}

                {" / "}

                {totalCards}

              </div>

              <div
                style={{
                  minWidth: "220px"
                }}
              >

                <strong>
                  Completion:
                </strong>

                {" "}

                {completionPercentage}%

                <div
                  style={{
                    marginTop: "8px",

                    width: "100%",

                    height: "12px",

                    backgroundColor: "#ddd",

                    borderRadius: "999px",

                    overflow: "hidden"
                  }}
                >

                  <div
                    style={{
                      width:
                        `${completionPercentage}%`,

                      height: "100%",

                      backgroundColor: "#4caf50",

                      transition: "0.3s ease"
                    }}
                  />

                </div>

              </div>

              <div>

                <strong>
                  Duplicates:
                </strong>

                {" "}

                {duplicates}

              </div>

              {
                viewMode === "view"
                && (

                  <button
                    onClick={() =>
                      setViewMode("edit")
                    }

                    style={{
                      padding: "10px 16px",

                      borderRadius: "10px",

                      border: "1px solid #ccc",

                      cursor: "pointer"
                    }}
                  >

                    Edit Album

                  </button>

                )
              }

              {
                viewMode === "edit"
                && (

                  <>

                    <button
                      onClick={saveChanges}

                      style={{
                        padding: "10px 16px",

                        borderRadius: "10px",

                        border:
                          "1px solid #4caf50",

                        backgroundColor:
                          "#4caf50",

                        color: "white",

                        cursor: "pointer"
                      }}
                    >

                      Save Changes

                    </button>

                    <button
                      onClick={cancelChanges}

                      style={{
                        padding: "10px 16px",

                        borderRadius: "10px",

                        border:
                          "1px solid #ccc",

                        backgroundColor:
                          "white",

                        cursor: "pointer"
                      }}
                    >

                      Cancel

                    </button>

                  </>

                )
              }

              <div
                style={{
                  display: "flex",
                  gap: "10px"
                }}
              >

                <button
                  onClick={() =>
                    setCardSize("compact")
                  }

                  style={{
                    padding: "8px 12px",

                    borderRadius: "8px",

                    border: "1px solid #ccc",

                    cursor: "pointer",

                    backgroundColor:
                      cardSize === "compact"
                        ? "#ddd"
                        : "white"
                  }}
                >

                  Compact

                </button>

                <button
                  onClick={() =>
                    setCardSize("medium")
                  }

                  style={{
                    padding: "8px 12px",

                    borderRadius: "8px",

                    border: "1px solid #ccc",

                    cursor: "pointer",

                    backgroundColor:
                      cardSize === "medium"
                        ? "#ddd"
                        : "white"
                  }}
                >

                  Medium

                </button>

                <button
                  onClick={() =>
                    setCardSize("large")
                  }

                  style={{
                    padding: "8px 12px",

                    borderRadius: "8px",

                    border: "1px solid #ccc",

                    cursor: "pointer",

                    backgroundColor:
                      cardSize === "large"
                        ? "#ddd"
                        : "white"
                  }}
                >

                  Large

                </button>

              </div>

            </div>

          )
        }

      </div>

      {
        id
        &&
        collectionType !== "ALBUM"
        && (

          <AddCardForm
            collectionId={id}

            onCardAdded={fetchCards}
          />

        )
      }

      <div
        style={{
          display: "flex",

          flexWrap: "wrap",

          gap:
            viewMode === "view"
              ? "10px"
              : "16px"
        }}
      >

        {
          cards.map((item) => (

            <CardItem
              key={item.id}

              name={item.card.name}

              imageUrl={
                item.card.image_url
              }

              typeLine={
                item.card.type_line
              }

              manaCost={
                item.card.mana_cost
              }

              rarity={
                item.card.rarity
              }

              cmc={
                item.card.cmc
              }

              quantity={
                editedQuantities[
                  item.card.id
                ] ?? item.quantity
              }

              setName={
                item.card.set_name
              }

              collectionId={id!}

              cardId={item.card.id}

              collectionType={
                collectionType
              }

              viewMode={viewMode}

              cardSize={cardSize}

              onQuantityChange={
                updateLocalQuantity
              }

              onCardRemoved={
                fetchCards
              }
            />

          ))
        }

      </div>

    </div>

  )
}

export default CollectionDetail