import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICreator extends Document {
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
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const CreatorSchema = new Schema<ICreator>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    country: { type: String, required: true },
    platform: {
      type: String,
      default: 'instagram',
      enum: ['instagram', 'youtube', 'tiktok', 'multi'],
    },
    instagram: { type: String, trim: true },
    youtube: { type: String, trim: true },
    tiktok: { type: String, trim: true },
    whatsapp: { type: String, trim: true },
    niche: {
      type: String,
      required: true,
      enum: ['Fitness', 'Tech', 'Fashion', 'Lifestyle', 'Food', 'Travel', 'Beauty', 'Gaming'],
    },
    followers: { type: Number, required: true, min: 0 },
    avgLikes: { type: Number, required: true, min: 0 },
    avgComments: { type: Number, required: true, min: 0 },
    postsPerMonth: { type: Number, required: true, min: 0 },
    audienceCountry: { type: String },
    audienceAge: { type: String },
    audienceGender: { type: String },
    pricePost: { type: Number, default: 0, min: 0 },
    priceStory: { type: Number, default: 0, min: 0 },
    priceYoutube: { type: Number, default: 0, min: 0 },
    contentType: [{ type: String, enum: ['UGC', 'Product Review', 'Tutorial', 'Lifestyle'] }],
    engagementRate: { type: Number, default: 0 },
    creatorScore: { type: Number, default: 0, min: 0, max: 100 },
    badge: {
      type: String,
      default: 'Needs Improvement',
      enum: ['Elite Creator', 'Pro Creator', 'Rising Creator', 'Needs Improvement'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common query patterns
CreatorSchema.index({ creatorScore: -1 });
CreatorSchema.index({ niche: 1, status: 1 });
CreatorSchema.index({ followers: 1, engagementRate: -1 });

const Creator: Model<ICreator> =
  mongoose.models.Creator || mongoose.model<ICreator>('Creator', CreatorSchema);

export default Creator;
