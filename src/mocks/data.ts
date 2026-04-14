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

export const mockCampaigns: Campaign[] = [
  // Google Ads
  {
    id: 'gad-001',
    name: 'Summer Sale 2024',
    platform: 'google',
    status: 'active',
    totalSpend: 4250.50,
    dailyBudget: 150,
    conversionRate: 3.45,
    impressions: 125000,
    clicks: 3850,
  },
  {
    id: 'gad-002',
    name: 'Brand Awareness Campaign',
    platform: 'google',
    status: 'active',
    totalSpend: 2100.00,
    dailyBudget: 100,
    conversionRate: 2.10,
    impressions: 98000,
    clicks: 2100,
  },
  {
    id: 'gad-003',
    name: 'Mobile App Install',
    platform: 'google',
    status: 'paused',
    totalSpend: 1500.75,
    dailyBudget: 75,
    conversionRate: 4.20,
    impressions: 45000,
    clicks: 1890,
  },
  {
    id: 'gad-004',
    name: 'Retargeting - Cart Abandoners',
    platform: 'google',
    status: 'active',
    totalSpend: 3200.00,
    dailyBudget: 120,
    conversionRate: 5.80,
    impressions: 89000,
    clicks: 5150,
  },

  // Meta (Facebook/Instagram)
  {
    id: 'meta-001',
    name: 'Facebook Feed - Womens Fashion',
    platform: 'meta',
    status: 'active',
    totalSpend: 5100.25,
    dailyBudget: 200,
    conversionRate: 2.95,
    impressions: 210000,
    clicks: 6180,
  },
  {
    id: 'meta-002',
    name: 'Instagram Stories - Youth Segment',
    platform: 'meta',
    status: 'active',
    totalSpend: 2750.00,
    dailyBudget: 110,
    conversionRate: 3.20,
    impressions: 142000,
    clicks: 4544,
  },
  {
    id: 'meta-003',
    name: 'Messenger Ads - Support Lead Gen',
    platform: 'meta',
    status: 'paused',
    totalSpend: 1850.50,
    dailyBudget: 85,
    conversionRate: 6.15,
    impressions: 67000,
    clicks: 4120,
  },
  {
    id: 'meta-004',
    name: 'Video Campaign - Product Demo',
    platform: 'meta',
    status: 'active',
    totalSpend: 3600.00,
    dailyBudget: 130,
    conversionRate: 4.50,
    impressions: 156000,
    clicks: 7020,
  },
  {
    id: 'meta-005',
    name: 'Collection Ads - Premium Line',
    platform: 'meta',
    status: 'active',
    totalSpend: 2200.75,
    dailyBudget: 95,
    conversionRate: 2.75,
    impressions: 98000,
    clicks: 2695,
  },

  // TikTok
  {
    id: 'tiktok-001',
    name: 'TikTok - Gen Z Creators',
    platform: 'tiktok',
    status: 'active',
    totalSpend: 1950.00,
    dailyBudget: 90,
    conversionRate: 1.85,
    impressions: 580000,
    clicks: 10730,
  },
  {
    id: 'tiktok-002',
    name: 'TikTok - Trending Sounds',
    platform: 'tiktok',
    status: 'active',
    totalSpend: 2400.50,
    dailyBudget: 105,
    conversionRate: 2.10,
    impressions: 720000,
    clicks: 15120,
  },
  {
    id: 'tiktok-003',
    name: 'TikTok - Brand Hashtag Challenge',
    platform: 'tiktok',
    status: 'paused',
    totalSpend: 3100.00,
    dailyBudget: 140,
    conversionRate: 3.50,
    impressions: 950000,
    clicks: 33250,
  },
  {
    id: 'tiktok-004',
    name: 'TikTok - Influencer Partnership',
    platform: 'tiktok',
    status: 'active',
    totalSpend: 2650.75,
    dailyBudget: 120,
    conversionRate: 4.80,
    impressions: 440000,
    clicks: 21120,
  },
]
