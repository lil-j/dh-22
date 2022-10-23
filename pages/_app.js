import "../styles/globals.css";
import NextNProgress from 'nextjs-progressbar';

function MyApp({Component, pageProps}) {
    return (
        <>
            <NextNProgress
                color={"gold"}
            />
            <Component {...pageProps} />
            <footer className="w-full bg-white mt-24 mb-2">
                <p className="text-center text-md px-3">Made with 💜 @ DubHacks 2022</p>
            </footer>
        </>
    );
}

export default MyApp;
