import { QueryClient, isServer } from '@tanstack/react-query'
import { cache } from 'react'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// Prevent immediate client-side refetch after server render
				staleTime: 60 * 1000, // 1 minute
			},
		},
	})
}

let browserQueryClient: QueryClient | undefined = undefined

// cache() ensures a new QueryClient per request on the server
// and reuses the same one on the client
export const getQueryClient = cache(() => {
	if (isServer) {
		// Server: always create a new client per request
		return makeQueryClient()
	} else {
		// Browser: create once and reuse
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
})
