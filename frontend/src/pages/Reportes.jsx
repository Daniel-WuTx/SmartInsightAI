import { MdAssessment } from "react-icons/md"

export default function Reportes() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Análisis</p>
        <h1 className="text-xl font-bold text-white">Reportes</h1>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-10 flex flex-col items-center justify-center text-center">
        <MdAssessment className="text-orange-400 text-5xl mb-4" />
        <h2 className="text-white font-semibold text-lg mb-2">Próximamente</h2>
        <p className="text-slate-400 text-sm max-w-sm">
          Aquí podrás generar reportes personalizados de tus datasets con exportación a PDF y Excel.
        </p>
      </div>
    </div>
  )
}