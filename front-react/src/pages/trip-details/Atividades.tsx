import { CheckCircle2} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { forceActivitiesRefresh } from "./ModalCriaAtividade";

interface Activity {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export function Activities() {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastRefreshTimestamp, setLastRefreshTimestamp] = useState(0)

  // Função para buscar as atividades
  async function fetchActivities() {
    setIsLoading(true)
    try {
      const response = await api.get(`/trips/${tripId}/activities`)
      setActivities(response.data.activities)
      // Atualiza o timestamp da última atualização
      setLastRefreshTimestamp(Date.now())
    } catch (error) {
      console.error('Erro ao buscar atividades:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
    
    // Configura um intervalo para verificar novas atividades a cada 30 segundos
    const intervalId = setInterval(() => {
      fetchActivities()
    }, 30000)
    
    return () => clearInterval(intervalId)
  }, [tripId])

  // Efeito para verificar se houve uma solicitação de atualização forçada
  useEffect(() => {
    if (forceActivitiesRefresh.timestamp > lastRefreshTimestamp) {
      fetchActivities()
    }
  }, [forceActivitiesRefresh.timestamp])

  if (isLoading && activities.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <p className="text-zinc-400">Carregando atividades...</p>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      {activities.length === 0 ? (
        <p className="text-zinc-400 text-center py-4">Nenhuma atividade cadastrada ainda.</p>
      ) : (
        activities.map(category => {
        return (
          <div key={category.date} className='space-y-2.5'>
            <div className='flex gap-2 items-baseline'>
              <span className='text-xl text-zinc-300 font-semibold'>Dia {format(category.date, "d")}</span>
              <span className='text-xs text-zinc-500'>{format(category.date, "EEEE", { locale: ptBR })}</span>
            </div>

            {category.activities.length > 0 ? (
              <>
                {category.activities.map(activity => {
                  return (
                    <div key={activity.id} className='space-y-2.5'>
                      <div className='px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3'>
                        <CheckCircle2 className='size-5 text-primary-500' />
                        <span className='text-zinc-100'>{activity.title}</span>
                        <span className='text-zinc-400 text-sm ml-auto'>
                          {format(activity.occurs_at, "HH:mm'h'", { locale: ptBR })}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : (
              <p className='text-sm text-zinc-500'>Nenhuma atividade cadastrada nessa data.</p>
            )}
          </div>
        )
        })
      )}
    </div>
  )
}