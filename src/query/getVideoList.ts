import { YOUTUBE_KEY, YOUTUBE_URL } from './../config/index'
import axios from './query'

export const getVideoList = async ({ seacrh, max }: { seacrh: string; max: number }) => {
  if (!seacrh) return undefined

  const { data } = await axios.get(`${YOUTUBE_URL}maxResults=${max}&q=${seacrh}&key=${YOUTUBE_KEY}`)

  return data
}
