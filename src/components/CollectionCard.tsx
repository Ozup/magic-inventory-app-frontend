import { Link } from "react-router-dom"

type CollectionCardProps = {
  id: number
  name: string
  type: string
}

function CollectionCard({
  id,
  name,
  type
}: CollectionCardProps) {

  return (

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
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          cursor: "pointer"
        }}
      >

        <h3>{name}</h3>

        <p>
          Type: {type}
        </p>

      </div>

    </Link>

  )
}

export default CollectionCard