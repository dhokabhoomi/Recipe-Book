import "./HeroHeader.css";

function HeroStat({ number, label }) {
  return (
    <div className="stat-item">
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function HeroHeader() {
  return (
    <>
      <div className="hero-banner fade-in">
        <div className="container">
          <div className="hero-content">
            <div className="hero-image">
              <img src="/herobanner.jpg" alt="Delicious food" />
            </div>
            <div className="hero-text">
              <h1>Discover Your Next Favorite Recipe Today!</h1>
              <p>
                Welcome to RecipeRipple, your ultimate destination for exploring
                and sharing a diverse array of recipes. Whether you're a novice
                cook or a seasoned chef, our curated selection will inspire your
                culinary journey.
              </p>
              <div className="hero-stats">
                <HeroStat number="1000+" label="Recipes" />
                <HeroStat number="500+" label="Chefs" />
                <HeroStat number="50+" label="Countries" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HeroHeader;
