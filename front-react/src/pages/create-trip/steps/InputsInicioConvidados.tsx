import { ArrowRight, UserRoundPlus } from "lucide-react"
import { Button } from "../../../components/button"

interface InviteGuestsStepProps {
  openGuestsModal: () => void
  openConfirmTripModal: () => void
  emailsToInvite: string[]
}

export function InviteGuestsStep({
  openGuestsModal,
  emailsToInvite,
  openConfirmTripModal
}: InviteGuestsStepProps) {
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
      
      <button type='button' onClick={openGuestsModal} className='flex items-center gap-2 flex-1 relative z-10'>
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className='text-zinc-100 text-lg flex-1 text-left'>
            {emailsToInvite.length} pessoas(s) convidada(s)
          </span>
        ) : (
          <span className='text-zinc-400 text-lg flex-1 text-left'>Quem estará na viagem?</span>
        )}
      </button>

      <div className='w-px h-6 bg-zinc-800 relative z-10' />

      <Button onClick={openConfirmTripModal} variant="primary" className="relative z-10">
        Confirmar Viagem
        <ArrowRight className='size-5' />
      </Button>
    </div>
  )
}