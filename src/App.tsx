import { useEffect, useState } from "react"

import axios from "axios"

import CollectionCard from "./components/CollectionCard"

import CreateCollectionForm from "./components/CreateCollectionForm"

type Collection = {
  id: number

  name: string

  type: string
}

function App() {

  const [collections, setCollections] = useState<
    Collection[]
  >([])

  const fetchCollections = () => {

    axios
      .get("http://127.0.0.1:8000/collections/")
      .then((response) => {

        setCollections(response.data)

      })
      .catch((error) => {

        console.error(error)

      })
  }

  useEffect(() => {

    fetchCollections()

  }, [])

  return (

    <div style={{ padding: "20px" }}>

      <h1>Magic Inventory App</h1>

      <CreateCollectionForm
        onCollectionCreated={
          fetchCollections
        }
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >

        {
          collections.map((collection) => (

            <CollectionCard
              key={collection.id}

              id={collection.id}

              name={collection.name}

              type={collection.type}

              onCollectionDeleted={
                fetchCollections
              }
            />

          ))
        }

      </div>

    </div>

  )
}

export default App