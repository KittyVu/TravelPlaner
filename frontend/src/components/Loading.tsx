function LoadingSpinner() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "50px",
      gap: "15px",
    }}>
      {/* Ring spinner */}
      <div style={{
        border: "6px solid #f3f3f3",
        borderTop: "6px solid #3498db",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        animation: "spin 1s linear infinite",
      }} />

      <div style={{ fontSize: "16px", fontWeight: 500 }}>
        Generating your trip plan... Please wait ⏳
      </div>

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
export default LoadingSpinner;