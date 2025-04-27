import * as FileSystem from 'expo-file-system'

export const getFileFromUriAsync = async (uri: string) => {
  const fileInfo = await FileSystem.getInfoAsync(uri)
  if (fileInfo.exists) {
    return {
      uri,
      name: uri.split('/').pop(),
      type: 'image/jpeg',
    }
  }
  return null
}