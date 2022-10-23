import SearchBar from "../Searchbar";
import Button from "../Button";

const Navbar = () => {
  return (
    <div className="w-full h-14 bg-white/10 backdrop-blur-sm flex flex-row items-center" >
      <div className="basis-1/2 w-1/4 flex flex-col justify-center px-10">
        <h4>Logo</h4>
      </div>
      <SearchBar className="basis-1/4"/>
      <Button className="basis-1/4" text={"Login"} isBgTransparent/>
      <Button className="basis-1/4" text={"Sign Up"} />
    </div>
  );
};

export default Navbar;