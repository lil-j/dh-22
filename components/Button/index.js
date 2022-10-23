import SearchBar from "../Searchbar";
import colors from "../../styles/colors";


const Navbar = ({text, isBgTransparent}) => {
  return (
    <button className={`self-center block rounded px-3 py-2 mx-auto font-bold ${isBgTransparent ? "text-pink-500" : "text-white"}`}  style={isBgTransparent ? {} : { backgroundColor: colors.PRIMARY }}  type="submit">
      {text}
    </button>
  );
};

export default Navbar;