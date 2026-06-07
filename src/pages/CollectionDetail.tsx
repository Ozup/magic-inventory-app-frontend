import { useEffect, useState } from "react"

import {
  Link,
  useParams
} from "react-router-dom"

import axios from "axios"

import CardItem from "../components/CardItem"

import AddCardForm from "../components/AddCardForm"

import AlbumStats from "../components/AlbumStats"

import CollectionFilters from "../components/CollectionFilters"

import AlbumToolbar from "../components/AlbumToolbar"

import CollectionCardsGrid from "../components/CollectionCardsGrid"

import BinderView from "../components/BinderView"

type Card = {
  id: number

  quantity: number

  foil_quantity: number

  card: {
    id: number
    name: string
    type_line: string
    image_url: string

    mana_cost: string
    rarity: string
    cmc: number

    set_name: string
    usd_price?: number
    usd_foil_price?: number
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
  const [editedFoilQuantities,
  setEditedFoilQuantities] =
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

  const [displayMode,
  setDisplayMode] =
    useState<"grid" | "binder">(
      "grid"
    )

  const [binderLayout,
  setBinderLayout] =
    useState<
      "2x2"
      | "3x3"
      | "4x4"
    >("3x3")

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

  const collectionValue =
    cards.reduce(
      (total, item) => {

        const quantity =
          editedQuantities[item.card.id]
          ?? item.quantity

        const foilQuantity =
          editedFoilQuantities[item.card.id]
          ?? item.foil_quantity

        return (
          total +

          (
            quantity *
            (item.card.usd_price ?? 0)
          )

          +

          (
            foilQuantity *
            (
              item.card.usd_foil_price
              ??
              item.card.usd_price
              ??
              0
            )
          )

        )

      },
      0
    )

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

  const updateLocalFoilQuantity = (
    cardId: number,
    quantity: number
  ) => {

    setEditedFoilQuantities(
      (prev) => ({

        ...prev,

        [cardId]: quantity
      })
    )
  }


  const saveChanges = async () => {

    try {

      await Promise.all(

        Object.entries(
          editedQuantities
        ).map(
          ([cardId, quantity]) => {

            return axios.patch(
              `http://127.0.0.1:8000/collections/${id}/cards/${cardId}/quantity`,
              null,
              {
                params: {
                  quantity,

                  foil_quantity:
                    editedFoilQuantities[
                      Number(cardId)
                    ] ?? 0
                }
              }
            )
          }
        )
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

        setEditedQuantities(
          (prev) => {

            const updated = {
              ...prev
            }

            response.data.forEach(
              (item: Card) => {

                if (
                  updated[
                    item.card.id
                  ] === undefined
                ) {

                  updated[
                    item.card.id
                  ] = item.quantity
                }
              }
            )

            return updated
          }     
        )

        setEditedFoilQuantities(
          (prev) => {

            const updated = {
              ...prev
            }

            response.data.forEach(
              (item: Card) => {

                if (
                  updated[
                    item.card.id
                  ] === undefined
                ) {

                  updated[
                    item.card.id
                  ] = item.foil_quantity
                }
              }
            )

            return updated
          }
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
              <AlbumStats
                ownedCards={ownedCards}
                totalCards={totalCards}
                duplicates={duplicates}
                completionPercentage={
                  completionPercentage
                }
              />
              <div
                style={{
                  padding: "12px 18px",

                  backgroundColor: "white",

                  borderRadius: "10px",

                  border: "1px solid #ddd",

                  fontWeight: "bold"
                }}
              >

                Collection Value

                <div
                  style={{
                    fontSize: "20px",

                    marginTop: "4px"
                  }}
                >

                  $
                  {
                    collectionValue.toFixed(2)
                  }

                </div>

              </div>


              <AlbumToolbar
              viewMode={viewMode}
              cardSize={cardSize}

              displayMode={displayMode}
              setDisplayMode={setDisplayMode}

              binderLayout={binderLayout}
              setBinderLayout={setBinderLayout}

              setViewMode={setViewMode}
              setCardSize={setCardSize}

              saveChanges={saveChanges}
              cancelChanges={cancelChanges}
            />

             

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
      <CollectionFilters
        typeFilter={typeFilter}
        rarityFilter={rarityFilter}
        nameFilter={nameFilter}
        sortBy={sortBy}

        setTypeFilter={setTypeFilter}
        setRarityFilter={setRarityFilter}
        setNameFilter={setNameFilter}
        setSortBy={setSortBy}
      />


      {
      displayMode === "grid"
        ? (

            <CollectionCardsGrid
              cards={cards}

              editedQuantities={
                editedQuantities
              }

              editedFoilQuantities={
                editedFoilQuantities
              }

              collectionId={id!}

              collectionType={
                collectionType
              }

              viewMode={viewMode}

              cardSize={cardSize}

              updateLocalQuantity={
                updateLocalQuantity
              }

              updateLocalFoilQuantity={
                updateLocalFoilQuantity
              }

              fetchCards={fetchCards}
            />

          )
        : (

            <BinderView
              cards={cards}

              editedQuantities={
                editedQuantities
              }

              binderLayout={
                binderLayout
              }
            />

          )
    }

    </div>

  )
}

export default CollectionDetail