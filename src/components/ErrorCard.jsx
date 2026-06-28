function ErrorCard({ error }) {
  if (!error) return null;

  return (
    <div className="error-card">
      <span className="error-icon">⚠️</span>

      <div>
        <h3>Oops!</h3>
        <p>{error}</p>
      </div>
    </div>
  );
}

export default ErrorCard;