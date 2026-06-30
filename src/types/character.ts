import type { CharacterStatus, CharacterGender } from '@/constants/filters'

interface CharacterLocation {
  name: string
  url: string
}

export interface Character {
  id: number
  name: string
  url: string
  created: string
  status: CharacterStatus
  species: string
  type: string
  gender: CharacterGender
  origin: CharacterLocation
  location: CharacterLocation
  image: string
  episode: string[]
}
