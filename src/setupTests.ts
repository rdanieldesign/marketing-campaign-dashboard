import '@testing-library/jest-dom'
import { server } from './mocks/server'
import { afterAll, afterEach, beforeAll } from 'vitest'

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Clean up after all tests
afterAll(() => server.close())
