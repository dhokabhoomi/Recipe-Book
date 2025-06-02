function Home() {
  return (
    <>
      <section className="welcome-section">
        <h2>Welcome to RecipeRipple</h2>
        <p>
          Discover, add, and share delicious recipes that ripple through the
          community.
        </p>
      </section>

      <section className="recipes-preview">
        <h3>Featured Recipes</h3>
        <div className="recipe-cards">
          <article className="recipe-card">
            <img src="https://via.placeholder.com/150" alt="Recipe 1" />
            <h4>Spicy Avocado Toast</h4>
            <p>A quick and healthy breakfast option.</p>
          </article>
          <article className="recipe-card">
            <img src="https://via.placeholder.com/150" alt="Recipe 2" />
            <h4>Classic Margherita Pizza</h4>
            <p>Simple, fresh, and always delicious.</p>
          </article>
          <article className="recipe-card">
            <img src="https://via.placeholder.com/150" alt="Recipe 3" />
            <h4>Hearty Vegetable Soup</h4>
            <p>Comfort food for chilly days.</p>
          </article>
        </div>
      </section>
    </>
  );
}
export default Home;
