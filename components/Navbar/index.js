import SearchBar from "../Searchbar";

const Navbar = () => {
  return (
    <div className="w-full h-14 bg-white/10 backdrop-blur-sm flex flex-row justify-between items-center" >
      <div className="w-1/4 flex flex-col justify-center px-10">
        <h4>Logo</h4>
      </div>
      <SearchBar/>
    </div>
  );
};

export default Navbar;