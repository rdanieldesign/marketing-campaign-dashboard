export interface Campaign {
  id: string
  name: string
  platform: 'google' | 'meta' | 'tiktok'
  status: 'active' | 'paused'
  totalSpend: number
  dailyBudget: number
  conversionRate: number
  impressions: number
  clicks: number
}
