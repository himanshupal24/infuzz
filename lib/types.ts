export interface Creator {
    _id: string;
    name: string;
    email: string;
    country: string;
    platform: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    whatsapp?: string;
    niche: string;
    followers: number;
    avgLikes: number;
    avgComments: number;
    postsPerMonth: number;
    audienceCountry?: string;
    audienceAge?: string;
    audienceGender?: string;
    pricePost?: number;
    priceStory?: number;
    priceYoutube?: number;
    contentType?: string[];
    engagementRate: number;
    creatorScore: number;
    badge: string;
    status: 'pending' | 'approved' | 'rejected' | string;
    createdAt: string;
    updatedAt?: string;
}
