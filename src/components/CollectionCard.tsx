import axios from "axios"

import { Link } from "react-router-dom"

type CollectionCardProps = {
  id: number

  name: string

  type: string

  onCollectionDeleted: () => void
}

function CollectionCard({
  id,
  name,
  type,
  onCollectionDeleted
}: CollectionCardProps) {

  const deleteCollection = () => {

    const confirmed = window.confirm(
      "Delete this collection?"
    )

    if (!confirmed) return

    axios
      .delete(
        `http://127.0.0.1:8000/collections/${id}`
      )
      .then(() => {

        onCollectionDeleted()

      })
      .catch((error) => {

        console.error(error)

      })
  }

  return (

    <div
      style={{
        position: "relative"
      }}
    >

      <button
        onClick={(event) => {

          event.preventDefault()

          event.stopPropagation()

          deleteCollection()
        }}

        style={{
          position: "absolute",

          top: "10px",

          right: "10px",

          zIndex: 10,

          border: "none",

          background: "white",

          borderRadius: "50%",

          width: "32px",

          height: "32px",

          cursor: "pointer",

          boxShadow:
            "0 2px 5px rgba(0,0,0,0.2)"
        }}
      >

        🗑

      </button>

      <Link
        to={`/collections/${id}`}
        style={{
          textDecoration: "none",
          color: "inherit"
        }}
      >

        <div
          style={{
            border: "1px solid #ccc",

            borderRadius: "10px",

            padding: "16px",

            width: "300px",

            boxShadow:
              "0 2px 5px rgba(0,0,0,0.1)",

            cursor: "pointer"
          }}
        >

          <h3>{name}</h3>

          <p>
            Type: {type}
          </p>

        </div>

      </Link>

    </div>

  )
}

export default CollectionCard