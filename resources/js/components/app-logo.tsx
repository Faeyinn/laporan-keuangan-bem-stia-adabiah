export default function AppLogo() {
    return (
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-green-50 shadow-sm">
                <img src="/logo-bemstiaadabiah.png" alt="BEM KM STIA ADABIAH" className="h-full w-full object-cover" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">BEM KM STIA ADABIAH</span>
            </div>
        </div>
    );
}
