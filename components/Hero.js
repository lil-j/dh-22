export default function Hero({backgroundColor, header, subheader, children}) {
    return <div className="w-full py-24" style={{backgroundColor: backgroundColor}}>
        <div className="max-w-4xl mx-auto">
            <h1 className="text-white font-bold text-5xl">{header}</h1>
            <h3 className="mt-3 text-white font-medium">{subheader}</h3>
            <div className="flex gap-6 mt-7">
                {children}
            </div>
        </div>
    </div>
}