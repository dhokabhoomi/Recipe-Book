import "./HeroHeader.css";
function HeroHeader() {
  return (
    <>
      <div className="hero-banner fade-in">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Discover Your Next Favorite Recipe Today!</h1>
              <p>
                Welcome to RecipeRipple, your ultimate destination for exploring
                and sharing a diverse array of recipes. Whether you're a novice
                cook or a seasoned chef, our curated selection will inspire your
                culinary journey.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Recipes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Chefs</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Countries</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img src="/herobanner.jpg" alt="Delicious food" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HeroHeader;
