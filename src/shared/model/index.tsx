import {z} from 'zod'

export const authDataSchema = z.object({
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    token: z.string(),

  });
  export interface User {
    name: string
    email: string
    avatar?: string
  }
  export interface List {
    id: string
    title: string
    type: ListType
    itemCount: number
    collaborators: number
    updatedAt: string
    targetDate?: string
    description?: string
    archived?: boolean
    archivedAt?: string
  }
  export type ListType = 'grocery' | 'tasks' | 'event' | 'other' | 'registry' | 'goal' | 'bills'
  export interface ListItem {
    id: string
    content: string
    completed: boolean
    description?: string
    dueDate?: string
    time?: string
    location?: string
    attendees?: number
    quantity?: number
    category?: string
    price?: string
    assignedTo?: string
    priority?: 'low' | 'medium' | 'high'
  }

export type AuthDataSchemaInterface = z.infer<typeof authDataSchema>
