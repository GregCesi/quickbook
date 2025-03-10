import { useSupabaseClient, useSupabaseUser } from '#imports'

// ---------- DTO : Structures issues de la BD (Supabase) ----------

// Client stocké en base
interface ClientDTO {
  id: number
  name: string
  phone: string
  address: string
}

// Reservation stockée en base
interface ReservationDTO {
  id: number
  title: string
  start_datetime: string
  end_datetime: string
  status: string
  description: string | null
  clients?: ClientDTO // Jointure optionnelle
}

// Relation reservation_users (jointure entre user_id et reservations)
interface ReservationUsersDTO {
  reservation_id: number
  user_id: string
  reservations: ReservationDTO // Jointure
}

// ---------- Objets pour notre code (affichage) ----------

interface Client {
  id: number
  name: string
  phone: string
  address: string
}

// Notre structure finale pour le planning
export interface Reservation {
  id: number
  title: string
  start: string
  end: string
  status: string
  description: string
  color: string
  client: Client
}

// ---------- Fonctions utilitaires de mapping ----------

function statusToColor(status: string): string {
  switch (status) {
    case 'en cours':
      return '#1E40AF' // Bleu
    case 'terminé':
      return '#16A34A' // Vert
    case 'annulé':
      return '#DC2626' // Rouge
    default:
      return '#6B7280' // Gris par défaut
  }
}

function mapClientDTOtoClient(dto: ClientDTO | undefined): Client {
  // On gère le cas où dto est undefined
  return {
    id: dto?.id ?? 0,
    name: dto?.name ?? 'Client inconnu',
    phone: dto?.phone ?? 'Contact inconnu',
    address: dto?.address ?? 'Adresse inconnue'
  }
}

function mapReservationDTOtoReservation(dto: ReservationDTO): Reservation {
  return {
    id: dto.id,
    title: dto.title,
    start: dto.start_datetime,
    end: dto.end_datetime,
    status: dto.status,
    description: dto.description ?? '',
    color: statusToColor(dto.status),
    client: mapClientDTOtoClient(dto.clients)
  }
}

// ---------- Fonction principale : récupérer les réservations ----------

export async function useReservations(): Promise<Reservation[]> {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // Si aucun utilisateur connecté, on renvoie un tableau vide
  if (!user.value) {
    return []
  }

  // Requête sur la table "reservation_users"
  // pour récupérer toutes les réservations de l'utilisateur connecté
  const { data, error } = await supabase
  .from('reservations_users')
  .select(`
    reservation_id,
    user_id,
    reservations!inner(
      id,
      title,
      start_datetime,
      end_datetime,
      status,
      description,
      clients!inner(
        id,
        name,
        phone,
        address
      )
    )
  `)
  .eq('user_id', user.value.id);


  // Gestion d'erreur Supabase
  if (error) {
    console.error('Erreur lors de la récupération des réservations :', error)
    return []
  }

  console.log("✅ Données récupérées depuis Supabase :", data);

  // Vérifier que data est un tableau
  if (!Array.isArray(data)) {
    console.error('Données inattendues :', data)
    return []
  }

  // Transformer chaque entrée en Reservation
  const reservations: Reservation[] = data.map((row: ReservationUsersDTO) => {
    return mapReservationDTOtoReservation(row.reservations)
  })

  return reservations
}
