export default function SearchBox() {
  return (
    <div className="searchbar-container">
      <input type="text" id="search-input" placeholder="Search" />
      <button id="search-button">
        <i
          className="fa-solid fa-magnifying-glass fa-xl"
          style={{ color: "#244cbb" }}
        ></i>
      </button>
    </div>
  );
}
