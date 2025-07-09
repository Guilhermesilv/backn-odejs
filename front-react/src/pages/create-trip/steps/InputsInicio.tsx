import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from '../../../components/button';
import { useState } from "react";
import { type DateRange, DayPicker } from "react-day-picker";
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import 'react-day-picker/dist/style.css';
import '../../../day-picker-custom.css';


interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  let displayedDate = null;

  if (eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to) {
    const dayFrom = format(eventStartAndEndDates.from, "d")
    const monthFrom = format(eventStartAndEndDates.from, "LLL", { locale: ptBR })
    const yearFrom = format(eventStartAndEndDates.from, "yyyy")
    const dayTo = format(eventStartAndEndDates.to, "d")
    const monthTo = format(eventStartAndEndDates.to, "LLL", { locale: ptBR })
    const yearTo = format(eventStartAndEndDates.to, "yyyy")

    if (monthFrom === monthTo && yearFrom === yearTo)
      displayedDate = `${dayFrom} até ${dayTo} de ${monthFrom} de ${yearTo}`;
    else if (monthFrom !== monthTo && yearFrom === yearTo)
      displayedDate = `${dayFrom} de ${monthFrom} até ${dayTo} de ${monthTo} de ${yearTo}`;
    else {
      //displayedDate = `${dayFrom}/${monthFrom}/${yearFrom} até ${dayTo}/${monthTo}/${yearTo}`;
      displayedDate = `${format(eventStartAndEndDates.from, "PPP")} até ${format(eventStartAndEndDates.to, "PPP")}`;
    }
  }
  

  return (
    <div 
      className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3 relative overflow-hidden"
      style={{
        boxShadow: `
          0px 8px 8px rgba(0, 0, 0, 0.1), 
          0px 4px 4px rgba(0, 0, 0, 0.1), 
          0px 2px 2px rgba(0, 0, 0, 0.1), 
          0px 0px 0px 1px rgba(0, 0, 0, 0.1), 
          inset 0px 0px 0px 1px rgba(255, 255, 255, 0.04), 
          inset 0px 1px 0px rgba(255, 255, 255, 0.04),
          inset 1px 0px 0px rgba(255, 255, 255, 0.08),
          inset 0px 1px 0px rgba(255, 255, 255, 0.08)
        `
      }}
    >
      {/* Efeito de luz no canto superior esquerdo */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 200px 150px at top left, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 20%, rgba(255, 255, 255, 0.02) 40%, transparent 60%)'
        }}
      />
      
      <div className='flex items-center gap-2 flex-1 relative z-10'>
        <MapPin className="size-5 text-zinc-400" />
        <input 
          disabled={isGuestsInputOpen} 
          type="text" 
          placeholder="Para onde você vai?" 
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className='flex items-center gap-2 text-left min-w-[320px] relative z-10'>
        <Calendar className="size-5 text-zinc-400 shrink-0" />
        <span className="text-lg text-zinc-400 truncate">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-100">Selecione a data</h2>
                <button type="button" onClick={closeDatePicker} className="hover:bg-zinc-800 p-2 rounded-lg transition-colors">
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker 
              mode="range" 
              selected={eventStartAndEndDates} 
              onSelect={setEventStartAndEndDates}
              locale={ptBR}
              className="text-zinc-300"
            />
          </div>
        </div>
      )}

      <div className='w-px h-6 bg-zinc-800 relative z-10' />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary" className="relative z-10">
          Alterar local/data
          <Settings2 className='size-5' />
        </Button>
      ) : (
        <Button onClick={openGuestsInput} variant="primary" className="relative z-10">
          Continuar
          <ArrowRight className='size-5' />
          </Button>
      )}

    </div>
  )
}