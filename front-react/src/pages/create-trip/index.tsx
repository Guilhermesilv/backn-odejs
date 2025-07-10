import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './ModalConvidarEmail'
import { ConfirmTripModal } from './ModalConfirmar'
import { DestinationAndDateStep } from './steps/InputsInicio'
import { InviteGuestsStep } from './steps/InputsInicioConvidados'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'
import { Safari } from "@/components/magicui/safari"
import { AboutProductSection } from '@/components/about-product-section'
import { ScrollButton } from '@/components/scroll-button'
import { SmoothCursor } from '@/components/ui/smooth-cursor'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }


  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }

    const data = {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    }

    const response = await api.post('/trips', data)

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <>
      <SmoothCursor />
      <div className="relative overflow-hidden">
        {/* Padrão de fundo com CSS simples em vez do componente InteractiveGridPattern */}
        <div className="fixed inset-0 z-0 bg-grid-pattern opacity-[0.02]" 
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />

        {/* Imagem de fundo ocupando toda a página */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/pexelsteste4')"
          }}
        />
        
        {/* Efeito de luz no canto superior esquerdo */}
        <div 
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 1800px 1400px at top left, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 15%, rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0.03) 45%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0.01) 75%, transparent 100%)'
          }}
        />
        
        {/* Efeito de luz no canto inferior direito */}
        <div 
          className="absolute bottom-0 right-0 w-full h-full z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 1800px 1400px at bottom right, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 15%, rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0.03) 45%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0.01) 75%, transparent 100%)'
          }}
        />

        {/* Conteúdo da primeira seção */}
        <div className="min-h-screen">
          {/* Container principal que agrupa inputs */}
          <div className="flex flex-col items-center space-y-6 relative z-30 pt-16 w-full min-w-[320px]">
            {/* Conteúdo principal - inputs */}
            <div className="max-w-4xl w-full px-6 text-center space-y-8">
              <div className='flex flex-col items-center gap-3 min-h-[120px]'>
                <img src="/logo.png?v=1" alt="itinity" className='w-40 h-20'  />
                <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
              </div>

              <div className='space-y-4 min-w-[300px]'>
                <DestinationAndDateStep
                  closeGuestsInput={closeGuestsInput}
                  isGuestsInputOpen={isGuestsInputOpen}
                  openGuestsInput={openGuestsInput}
                  setDestination={setDestination}
                  eventStartAndEndDates={eventStartAndEndDates}
                  setEventStartAndEndDates={setEventStartAndEndDates}
                />

                {isGuestsInputOpen && (
                  <InviteGuestsStep
                    openGuestsModal={openGuestsModal}
                    openConfirmTripModal={openConfirmTripModal}
                    emailsToInvite={emailsToInvite}
                  />
                )}
              </div>

              <p className="text-sm text-zinc-500 mt-4">
                Ao planejar sua viagem pela Itiny você automaticamente concorda <br />
                com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
              </p>
            </div>
          </div>
          
          {/* Safari posicionado abaixo do conteúdo */}
          <div className="relative mt-16 -mb-48 flex justify-center items-center">
            <div className="w-[90%] max-w-[1400px]">
              <Safari
                url="itiny.com"
                className="w-full h-auto"
                imageSrc="/freepikteste.png?v=1"
              />  
            </div>
          </div>

          {/* Botão de rolagem */}
          <ScrollButton targetId="about" />
        </div>

        {/* Seção Sobre o Produto */}
        <AboutProductSection />

        {/* Footer */}
        <footer className="relative z-30 border-t border-zinc-800 py-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="itinity" className="w-24 h-12" />
              <div className="h-6 w-px bg-zinc-800" />
              <p className="text-zinc-400 text-sm">
                Desenvolvido com ❤️ por{" "}
                <a 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  Guilherme Silveira
                </a>
              </p>
            </div>
            
            <div className="flex items-center gap-6">
            
            </div>
          </div>
        </footer>

        {isGuestsModalOpen && (
          <InviteGuestsModal  
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            closeGuestsModal={closeGuestsModal}
            removeEmailFromInvites={removeEmailFromInvites}
          />
        )}

        {isConfirmTripModalOpen && (
          <ConfirmTripModal 
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
            destination={destination}
            eventStartAndEndDates={eventStartAndEndDates}
          />
        )}
      </div>
    </>
  )
}
