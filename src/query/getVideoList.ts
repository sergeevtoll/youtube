import { YOUTUBE_KEY, YOUTUBE_URL } from './../config/index'
import axios from './query'

interface VideosResponse {
  items: {
    etag: string
    snippet: {
      channelTitle: string
      title: string
      thumbnails: {
        medium: {
          url: string
        }
      }
    }
  }[]
  pageInfo: {
    totalResults: number
  }
}

type VideosReques = {
  seacrh: string
  max: number
}

export const getVideoList = async ({ seacrh, max }: VideosReques) => {
  if (!seacrh) return undefined

  const { data } = await axios.get<VideosResponse>(
    `${YOUTUBE_URL}maxResults=${max}&q=${seacrh}&key=${YOUTUBE_KEY}`,
  )

  return data
}
