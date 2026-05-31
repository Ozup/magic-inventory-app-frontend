type AlbumToolbarProps = {
  viewMode: "view" | "edit"

  cardSize:
    | "compact"
    | "medium"
    | "large"

  setViewMode: (
    mode: "view" | "edit"
  ) => void

  setCardSize: (
    size:
      | "compact"
      | "medium"
      | "large"
  ) => void

  saveChanges: () => void

  cancelChanges: () => void
}

function AlbumToolbar({
  viewMode,
  cardSize,

  setViewMode,
  setCardSize,

  saveChanges,
  cancelChanges
}: AlbumToolbarProps) {

  return (

    <>

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

          Large

        </button>

      </div>

    </>

  )
}

export default AlbumToolbar