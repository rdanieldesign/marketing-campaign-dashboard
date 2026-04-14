import { http, HttpResponse, delay } from 'msw'
import { mockCampaigns } from './data'

// Shared in-memory variable for simulating errors
export let simulateError = false

// Mutable copy of campaigns for toggling status
let campaigns = structuredClone(mockCampaigns)

export const handlers = [
  http.get('/api/campaigns', async () => {
    await delay(300)
    return HttpResponse.json(campaigns)
  }),

  http.patch('/api/campaigns/:id', async ({ params }) => {
    await delay(300)

    if (simulateError) {
      return HttpResponse.json(
        { error: 'Failed to update campaign' },
        { status: 500 }
      )
    }

    const { id } = params
    const campaign = campaigns.find((c) => c.id === String(id))

    if (!campaign) {
      return HttpResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      )
    }

    campaign.status = campaign.status === 'active' ? 'paused' : 'active'

    return HttpResponse.json(campaign)
  }),
]
