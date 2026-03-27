import { MdHelp, MdUploadFile, MdDashboard, MdFolder } from "react-icons/md"

const faqs = [
  {
    pregunta: "¿Cómo subo un dataset?",
    respuesta: "Ve a 'Subir Excel' en el sidebar y selecciona un archivo .xlsx o .csv. El análisis se genera automáticamente."
  },
  {
    pregunta: "¿Qué tipos de archivos acepta?",
    respuesta: "SmartInsight acepta archivos Excel (.xlsx) y CSV (.csv)."
  },
  {
    pregunta: "¿Cómo se generan los insights?",
    respuesta: "Al subir un dataset, el sistema analiza automáticamente las columnas numéricas, detecta ventas, fechas y categorías para generar insights relevantes."
  },
  {
    pregunta: "¿Puedo exportar el análisis?",
    respuesta: "Sí, desde el Dashboard puedes exportar el análisis completo en formato PDF."
  },
  {
    pregunta: "¿Mis datos son privados?",
    respuesta: "Sí, cada usuario solo puede ver sus propios datasets y análisis."
  },
]

const pasos = [
  { icon: MdUploadFile, label: "Sube tu archivo Excel o CSV" },
  { icon: MdDashboard, label: "El sistema analiza tus datos automáticamente" },
  { icon: MdFolder, label: "Explora los insights y gráficas generadas" },
]

export default function Ayuda() {
  return (
    <div className="p-6 max-w-3xl space-y-6">

      <div>
        <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Soporte</p>
        <h1 className="text-xl font-bold text-white">Ayuda</h1>
      </div>

      {/* CÓMO FUNCIONA */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5">
        <div className="flex items-center gap-2 mb-4">
          <MdHelp className="text-orange-400 text-lg" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            ¿Cómo funciona?
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {pasos.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex-1 flex flex-col items-center text-center bg-slate-700/50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-orange-400/10 flex items-center justify-center mb-3">
                <Icon className="text-orange-400 text-xl" />
              </div>
              <span className="text-xs text-slate-300 leading-relaxed">{i + 1}. {label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQS */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
          Preguntas frecuentes
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map(({ pregunta, respuesta }, i) => (
            <div key={i} className="border-b border-slate-700 last:border-0 pb-3 last:pb-0">
              <p className="text-sm font-medium text-white mb-1">{pregunta}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{respuesta}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}