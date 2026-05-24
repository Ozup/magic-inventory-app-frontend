import { useEffect, useState } from "react"
import axios from "axios"

type Collection = {
  id: number
  name: string
  type: string
}

function App() {

  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/collections/")
      .then((response) => {

        setCollections(response.data)

      })
      .catch((error) => {

        console.error(error)

      })

  }, [])

  return (
    <div style={{ padding: "20px" }}>

      <h1>Magic Inventory App</h1>

      <h2>Collections</h2>

      {
        collections.map((collection) => (

          <div key={collection.id}>

            <p>
              {collection.name} ({collection.type})
            </p>

          </div>

        ))
      }

    </div>
  )
}

export default App