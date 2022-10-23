import SearchBar from "../Searchbar";
import Button from "../Button";
import Logo from "../Logo";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {config} from "../Firebase/config";
import {signOut} from "firebase/auth"

const Navbar = ({noSearchBar}) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(getAuth(initializeApp(config)));
  return (
    <div className="w-full h-14 bg-white/10 backdrop-blur-sm flex flex-row items-center " >
      <div className={`${noSearchBar ? "basis-3/4" : "basis-1/4"} w-1/4 flex flex-col justify-center px-10`}>
        <Logo/>
      </div>
      {!noSearchBar && <SearchBar className="basis-1/4"/>}
      <div className={`${noSearchBar ? "basis-1/2" : "basis-1/2"} flex flex-row items-center justify-self-end justify-end pl-[20%]`}>
          {
              !user ? <>
                  <div className="mx-auto">
                      <Button className="basis-1/2  " text={"Login"} isBgTransparent onClick={() => router.push("/login")}/>
                  </div>
                  <div className="mx-auto">
                      <Button className="basis-1/2" text={"Sign Up"} />
                  </div>
              </> : <div className="mx-auto flex w-full gap-3">
                  <Button className="basis-1/2" text={"Profile"} onClick={() => {
                      router.push("/profile")
                  }} />
                  <Button className="basis-1/2 mr-3" text={"Log Out"} onClick={() => {
                      signOut(getAuth(initializeApp(config)))
                      router.push("/login")
                  }} />

              </div>
          }

      </div>
    </div>
  );
};

export default Navbar;