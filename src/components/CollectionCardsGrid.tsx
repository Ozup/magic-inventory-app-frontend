import CardItem from "./CardItem"

type CollectionCardsGridProps = {
  cards: any[]

  editedQuantities:
    Record<number, number>

  editedFoilQuantities:
    Record<number, number>

  collectionId: string

  collectionType: string

  viewMode: "view" | "edit"

  cardSize:
    | "compact"
    | "medium"
    | "large"

  updateLocalQuantity: (
    cardId: number,
    quantity: number
  ) => void


  updateLocalFoilQuantity: (
    cardId: number,
    quantity: number
  ) => void

  fetchCards: () => void
}

function CollectionCardsGrid({
  cards,
  editedQuantities,

  collectionId,
  collectionType,

  viewMode,
  cardSize,

  updateLocalQuantity,

  editedFoilQuantities,

  updateLocalFoilQuantity,
  fetchCards
}: CollectionCardsGridProps) {


return (

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

          usdPrice={
            item.card.usd_price
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

          foilQuantity={
          editedFoilQuantities[
            item.card.id
          ] ?? item.foil_quantity
        }

          setName={
            item.card.set_name
          }

          collectionId={collectionId}

          cardId={item.card.id}

          collectionType={
            collectionType
          }

          viewMode={viewMode}

          cardSize={cardSize}

          onQuantityChange={
            updateLocalQuantity
          }

          updateLocalFoilQuantity={
            updateLocalFoilQuantity
          }

          onCardRemoved={
            fetchCards
          }
        />

      ))
    }

  </div>

)

}

export default CollectionCardsGrid