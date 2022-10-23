import SearchBar from "../Searchbar";
import colors from "../../styles/colors";


const Navbar = ({text, isBgTransparent, onClick, className}) => {
  return (
    <button className={`self-center block rounded px-3 py-2 font-bold ${isBgTransparent ? "text-pink-500" : "text-white"} ${className}`}  style={isBgTransparent ? {} : { backgroundColor: colors.PRIMARY }}  type="submit" onClick={onClick}>
      {text}
    </button>
  );
};

export default Navbar;