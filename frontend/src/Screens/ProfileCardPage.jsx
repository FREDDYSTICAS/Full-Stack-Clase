import ProfileCard from '../CardProfile/ProfileCard'

// Misma persona (Sophie Bennett) en las tres variantes, como en la imagen de referencia
const SOPHIE = {
  name: 'Sophie Bennett',
  verified: true,
  bio: 'Product Designer who focuses on simplicity & usability.',
  followers: 312,
  posts: 48,
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
  buttonText: 'Follow +',
}

// Card 3 en la referencia tiene esta bio
const SOPHIE_FULLWIDTH = {
  ...SOPHIE,
  bio: 'A Product Designer focused on intuitive user experiences.',
}

const VARIANTS = [
  { key: 'traditional', variant: 'traditional', ...SOPHIE },
  { key: 'overlay', variant: 'overlay', ...SOPHIE },
  { key: 'fullWidth', variant: 'fullWidth', ...SOPHIE_FULLWIDTH },
]

export default function ProfileCardPage() {
  const handleFollow = () => {
    console.log('Follow clicked')
  }

  return (
    <div className="min-h-screen bg-[#e5e5e5] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8">
          {VARIANTS.map(({ key, variant, ...user }) => (
            <ProfileCard
              key={key}
              variant={variant}
              {...user}
              onFollow={handleFollow}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
