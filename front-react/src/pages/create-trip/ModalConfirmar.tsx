import { AtSign, User, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  destination: string
  eventStartAndEndDates: DateRange | undefined
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  setOwnerName,
  setOwnerEmail,
  createTrip,
  destination,
  eventStartAndEndDates
}: ConfirmTripModalProps) {
  
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
      displayedDate = `${format(eventStartAndEndDates.from, "PPP", { locale: ptBR })} até ${format(eventStartAndEndDates.to, "PPP", { locale: ptBR })}`;
    }
  }
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-zinc-100'>Confirmar criação de viagem</h2>
            <button type='button' onClick={closeConfirmTripModal}>
              <X className='size-5 text-zinc-400' />
            </button>
          </div>
          <p className='text-sm text-zinc-400'>
            Para concluir a criação da viagem para <span className='font-semibold text-zinc-100'>{destination}</span> nas datas de <span className='font-semibold text-zinc-100'>{displayedDate || 'data não selecionada'}</span> preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className='space-y-3'>

          <div 
            className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 relative overflow-hidden'
            style={{
              boxShadow: `
                inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), 
                inset 1px 0px 0px rgba(255, 255, 255, 0.06),
                inset 0px 1px 0px rgba(255, 255, 255, 0.06)
              `
            }}
          >
            {/* Efeito de luz no canto superior esquerdo */}
            <div 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 180px 120px at top left, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 20%, rgba(255, 255, 255, 0.015) 40%, transparent 60%)'
              }}
            />
            <User className='text-zinc-400 size-5 relative z-10' />
            <input
              type="text"
              name='name'
              placeholder='Seu nome completo'
              className='bg-transparent text-lg text-white placeholder-zinc-400 outline-none flex-1 relative z-10'
              onChange={event => setOwnerName(event.target.value)}
            />
          </div>

          <div 
            className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 relative overflow-hidden'
            style={{
              boxShadow: `
                inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), 
                inset 1px 0px 0px rgba(255, 255, 255, 0.06),
                inset 0px 1px 0px rgba(255, 255, 255, 0.06)
              `
            }}
          >
            {/* Efeito de luz no canto superior esquerdo */}
            <div 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 180px 120px at top left, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 20%, rgba(255, 255, 255, 0.015) 40%, transparent 60%)'
              }}
            />
            <AtSign className='text-zinc-400 size-5 relative z-10' />
            <input
              type="email"
              name='email'
              placeholder='Seu e-mail pessoal'
              className='bg-transparent text-lg text-white placeholder-zinc-400 outline-none flex-1 relative z-10'
              onChange={event => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type='submit' variant="primary" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}