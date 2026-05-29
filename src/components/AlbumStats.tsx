type AlbumStatsProps = {
  ownedCards: number
  totalCards: number
  duplicates: number
  completionPercentage: number
}

function AlbumStats({
  ownedCards,
  totalCards,
  duplicates,
  completionPercentage
}: AlbumStatsProps) {

  return (

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

    </div>

  )
}

export default AlbumStats