import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateActivityModal } from './ModalCriaAtividade';
import { ImportantLinks } from './LinksAirbnb';
import { Guests } from './Convidados';
import { Activities } from './Atividades';
import { DestinationAndDateHeader } from './DestinoAndData';
import { Button } from '@/components/button';
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

export function TripDetailPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  return (
    <div className="min-h-screen relative bg-zinc-950">
      {/* Grid interativo de fundo */}
      <div className="absolute inset-0 z-0 opacity-[0.02]">
        <InteractiveGridPattern 
          width={50} 
          height={50} 
          className="!border-none" 
          squares={[40, 20]}
          squaresClassName="stroke-white/10 [&:not(:hover)]:duration-700 hover:fill-white/5"
        />
      </div>
      
      {/* Efeito de luz no canto superior esquerdo */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 1800px 1400px at top left, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 15%, rgba(255, 255, 255, 0.03) 30%, rgba(255, 255, 255, 0.02) 45%, rgba(255, 255, 255, 0.01) 60%, rgba(255, 255, 255, 0.005) 75%, transparent 100%)'
        }}
      />

      <div className="max-w-6xl px-6 py-10 mx-auto space-y-8 relative z-10">
        <DestinationAndDateHeader />

        <main className='flex gap-16 px-4'>
          <div className='flex-1 space-y-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-3xl font-semibold text-zinc-100'>Atividades</h2>
              <Button variant='primary' size='default' onClick={openCreateActivityModal}>
                <Plus className='size-5' />
                Cadastrar atividade
              </Button>
            </div>

            <Activities />
          </div>
          <div className='w-80 space-y-6'>
            <ImportantLinks />

            <div className='w-full h-px bg-zinc-800' />

            <Guests />
          </div>
        </main>

        {isCreateActivityModalOpen && (
          <CreateActivityModal
            closeCreateActivityModal={closeCreateActivityModal}
          />
        )}
      </div>
    </div>
  )
}