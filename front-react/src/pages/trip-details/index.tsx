import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
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
  const { tripId } = useParams();

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  // Componente de chat com IA
  function ChatIA() {
    const [pergunta, setPergunta] = useState('');
    const [resposta, setResposta] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    const handlePerguntar = async () => {
      if (!pergunta.trim()) return;
      setCarregando(true);
      setErro('');
      setResposta('');
      try {
        const response = await api.post(`/trips/${tripId}/ai-chat`, { pergunta });
        setResposta(response.data.resposta);
      } catch (e) {
        setErro('Erro ao consultar IA. Tente novamente.');
      }
      setCarregando(false);
    };

    return (
      <div className="mt-8 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">Pergunte e tire dúvidas de pontos turísticos, restaurantes, hotéis, etc. para nossa Inteligência Artificial</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none"
            placeholder="Ex: Quais os melhores restaurantes?"
            value={pergunta}
            onChange={e => setPergunta(e.target.value)}
            disabled={carregando}
          />
          <Button
            variant="primary"
            size="default"
            onClick={handlePerguntar}
            disabled={carregando || !pergunta.trim()}
          >
            {carregando ? 'Perguntando...' : 'Perguntar'}
          </Button>
        </div>
        {erro && <div className="text-red-400 text-sm mb-2">{erro}</div>}
        {resposta && (
          <div className="mt-2 p-3 bg-zinc-800 rounded text-zinc-100 whitespace-pre-line">
            {resposta}
          </div>
        )}
      </div>
    );
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
            {/* Chat com IA */}
            <ChatIA />
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