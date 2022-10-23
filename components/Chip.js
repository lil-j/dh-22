export default function Chip({textColor, children}) {
    return <div
        style={textColor && {color:textColor}}
        className={`rounded-xl ${textColor ? "bg-white" : "bg-white/30 "} px-3 py-2 font-medium text-white`}>
        {children}
    </div>
}