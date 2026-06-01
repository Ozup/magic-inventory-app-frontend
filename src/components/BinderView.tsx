import { useState } from "react"

type BinderViewProps = {
  cards: any[]

  binderLayout:
    | "2x2"
    | "3x3"
    | "4x4"
}

function BinderView({
  cards,
  binderLayout
}: BinderViewProps) {

  const columns =
    binderLayout === "2x2"
      ? 2
      : binderLayout === "3x3"
      ? 3
      : 4

  const cardsPerPage =
    binderLayout === "2x2"
      ? 4
      : binderLayout === "3x3"
      ? 9
      : 16

  const totalPages =
    Math.ceil(
      cards.length /
      cardsPerPage
    )

  const [currentPage,
    setCurrentPage] =
      useState(1)

  const visibleCards =
    cards.slice(
      (currentPage - 1)
        * cardsPerPage,

      currentPage
        * cardsPerPage
    )

  return (

    <>

      <div
        style={{
          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          gap: "20px",

          marginBottom: "20px"
        }}
      >

        <button
          disabled={
            currentPage === 1
          }

          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
        >

          Previous

        </button>

        <span>

          Page {currentPage}
          {" / "}
          {totalPages}

        </span>

        <button
          disabled={
            currentPage ===
            totalPages
          }

          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
        >

          Next

        </button>

      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            `repeat(${columns}, 1fr)`,

          gap: "20px"
        }}
      >

        {
          visibleCards.map((item) => (

            <div
              key={item.id}

              style={{
                border:
                  "1px solid #ddd",

                borderRadius: "12px",

                padding: "10px",

                textAlign: "center"
              }}
            >

              <img
                src={
                  item.card.image_url
                }

                alt={
                  item.card.name
                }

                style={{
                  width: "100%",

                  borderRadius:
                    "8px"
                }}
              />

              <div
                style={{
                  marginTop: "8px",

                  fontSize: "12px"
                }}
              >

                {
                  item.card.name
                }

              </div>

            </div>

          ))
        }

      </div>

    </>

  )
}

export default BinderView