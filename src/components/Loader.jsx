function Loader({ loading }) {
  if (!loading) return null;

  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading weather...</p>
    </div>
  );
}

export default Loader;