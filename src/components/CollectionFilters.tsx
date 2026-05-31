type CollectionFiltersProps = {
  typeFilter: string
  rarityFilter: string
  nameFilter: string
  sortBy: string

  setTypeFilter: (
    value: string
  ) => void

  setRarityFilter: (
    value: string
  ) => void

  setNameFilter: (
    value: string
  ) => void

  setSortBy: (
    value: string
  ) => void
}

function CollectionFilters({
  typeFilter,
  rarityFilter,
  nameFilter,
  sortBy,

  setTypeFilter,
  setRarityFilter,
  setNameFilter,
  setSortBy
}: CollectionFiltersProps) {

  return (

    <>

      <select
        value={typeFilter}
        onChange={(event) =>
          setTypeFilter(
            event.target.value
          )
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
          setRarityFilter(
            event.target.value
          )
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
          setNameFilter(
            event.target.value
          )
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
          setSortBy(
            event.target.value
          )
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

    </>

  )
}

export default CollectionFilters