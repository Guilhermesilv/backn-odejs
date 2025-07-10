import { Calendar, Tag, X } from "lucide-react"
import { Button } from "../../components/button"
import { FormEvent, useState } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"
import { AxiosError } from "axios"
import { useToast } from "../../lib/toast-context"

interface CreativeActivityModalProps {
  closeCreateActivityModal: () => void
}

// Referência externa para forçar atualização das atividades
export const forceActivitiesRefresh = {
  timestamp: 0
};

export function CreateActivityModal({ closeCreateActivityModal }:CreativeActivityModalProps) {
  const { tripId } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) return

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at')?.toString()

    // Validação básica antes de enviar
    if (!title || !occurs_at) {
      showToast('Por favor, preencha todos os campos', 'error')
      return
    }

    try {
      setIsSubmitting(true)
      
      // Criar a atividade
      await api.post(`/trips/${tripId}/activities`, {
        title,
        occurs_at
      })

      // Fecha o modal
      closeCreateActivityModal()
      
      // Força atualização das atividades
      forceActivitiesRefresh.timestamp = Date.now()
      
      // Mostra mensagem de sucesso
      showToast('Atividade criada com sucesso!', 'success')

    } catch (error) {
      console.error('Erro ao criar atividade:', error)
      
      let errorMessage = 'Erro ao criar atividade. Verifique se a data está dentro do período da viagem.'
      
      if (error instanceof AxiosError && error.response?.data?.message) {
        errorMessage = error.response.data.message
      }
      
      showToast(errorMessage, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  function getDefaultDateTime() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Cadastrar atividade</h2>
            <button type='button' onClick={closeCreateActivityModal}>
              <X className='size-5 text-zinc-400' />
            </button>
          </div>
          <p className='text-sm text-zinc-400'>
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className='space-y-3'>
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
            <div 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 180px 120px at top left, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 20%, rgba(255, 255, 255, 0.015) 40%, transparent 60%)'
              }}
            />
            <Tag className='text-zinc-400 size-5 relative z-10' />
            <input
              type="text"
              name='title'
              placeholder='Qual a atividade?'
              className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 relative z-10'
              required
              disabled={isSubmitting}
            />
          </div>

          <div className='flex items-center gap-2'>
            <div 
              className='h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 relative overflow-hidden'
              style={{
                boxShadow: `
                  inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), 
                  inset 1px 0px 0px rgba(255, 255, 255, 0.06),
                  inset 0px 1px 0px rgba(255, 255, 255, 0.06)
                `
              }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 180px 120px at top left, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 20%, rgba(255, 255, 255, 0.015) 40%, transparent 60%)'
                }}
              />
              <Calendar className='text-zinc-400 size-5 relative z-10' />
              <input
                type="datetime-local"
                name='occurs_at'
                placeholder='Data e horário da atividade'
                className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 relative z-10'
                defaultValue={getDefaultDateTime()}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <Button variant="primary" size="full" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar atividade'}
          </Button>
        </form>
      </div>
    </div>
  )
}