export const useApi = (path, options = {}) => {
  const config = useRuntimeConfig()

  return useFetch(path, {
    baseURL: config.public.apiBase,
    headers: { Accept: 'application/json' },
    ...options,
  })
}