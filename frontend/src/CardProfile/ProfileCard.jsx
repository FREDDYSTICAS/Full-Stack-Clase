/**
 * ProfileCard – Tres variantes según referencia (segunda imagen):
 * - traditional: imagen con margen blanco, borde inferior definido, nombre sobre la imagen (negro), resto centrado
 * - overlay: imagen a ancho completo, borde inferior definido, nombre sobre la imagen (negro), resto centrado
 * - fullWidth: imagen con degradado suave al blanco, nombre en zona mezclada (negro), checkmark gris, resto centrado
 */
function ProfileCard({
  name,
  verified = false,
  bio,
  followers = 0,
  posts = 0,
  avatarUrl,
  onFollow,
  className = '',
  buttonText = 'Follow +',
  variant = 'fullWidth',
}) {
  const cardShadow = { boxShadow: '0 10px 30px -8px rgba(0,0,0,0.12)' }

  const VerifiedBadgeGreen = () => (
    <span
      className="shrink-0 w-5 h-5 rounded-full bg-[#4CAF50] flex items-center justify-center"
      aria-label="Verificado"
    >
      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </span>
  )

  const VerifiedBadgeGray = () => (
    <span
      className="shrink-0 w-5 h-5 rounded-full border-2 border-neutral-400 bg-neutral-100 flex items-center justify-center"
      aria-label="Verificado"
    >
      <svg className="w-3 h-3 text-neutral-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </span>
  )

  const StatsIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
  )
  const MessageIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
    </svg>
  )

  const EngagementRow = () => (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#374151]">
      <span className="flex items-center gap-1.5">
        <StatsIcon />
        <span>{followers}</span>
      </span>
      <span className="flex items-center gap-1.5">
        <MessageIcon />
        <span>{posts}</span>
      </span>
      <button
        type="button"
        onClick={onFollow}
        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#e5e7eb] text-[#1a1a1a] text-sm font-bold border-0 hover:bg-[#d1d5db] transition-colors"
      >
        {buttonText}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )

  const ContentBlock = ({ children }) => (
    <div className="px-5 pb-5 pt-1 text-center">
      {children}
      <EngagementRow />
    </div>
  )

  // —— Card 1: Traditional — imagen con margen blanco, borde definido, nombre sobre imagen (negro)
  if (variant === 'traditional') {
    return (
      <article
        className={`max-w-[300px] w-full bg-white rounded-[16px] overflow-hidden ${className}`.trim()}
        style={cardShadow}
      >
        <div className="p-4 pb-0">
          <div className="relative rounded-t-[12px] overflow-hidden bg-neutral-100 aspect-[4/3]">
            <img
              src={avatarUrl}
              alt={`Foto de perfil de ${name}`}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 flex items-center justify-center gap-2">
              <h2 className="text-base font-bold text-[#1a1a1a] truncate">{name}</h2>
              {verified && <VerifiedBadgeGreen />}
            </div>
          </div>
        </div>
        <ContentBlock>
          <p className="text-sm text-[#6b7280] leading-snug mb-4">{bio}</p>
        </ContentBlock>
      </article>
    )
  }

  // —— Card 2: Overlay — imagen a ancho completo, borde definido, nombre sobre imagen (negro)
  if (variant === 'overlay') {
    return (
      <article
        className={`max-w-[300px] w-full bg-white rounded-[16px] overflow-hidden ${className}`.trim()}
        style={cardShadow}
      >
        <div className="relative aspect-[4/3] bg-neutral-100">
          <img
            src={avatarUrl}
            alt={`Foto de perfil de ${name}`}
            className="w-full h-full object-cover object-top rounded-t-[16px]"
          />
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-3 pt-10 flex items-center justify-center gap-2">
            <h2 className="text-base font-bold text-[#1a1a1a] truncate">{name}</h2>
            {verified && <VerifiedBadgeGreen />}
          </div>
        </div>
        <ContentBlock>
          <p className="text-sm text-[#6b7280] leading-snug mb-4">{bio}</p>
        </ContentBlock>
      </article>
    )
  }

  // —— Card 3: FullWidth — imagen con degradado suave al blanco, nombre en zona mezclada, checkmark gris
  return (
    <article
      className={`max-w-[300px] w-full bg-white rounded-[16px] overflow-hidden ${className}`.trim()}
      style={cardShadow}
    >
      <div className="relative aspect-[4/3] bg-white">
        <img
          src={avatarUrl}
          alt={`Foto de perfil de ${name}`}
          className="absolute inset-0 w-full h-full object-cover object-top rounded-t-[16px]"
        />
        <div
          className="absolute inset-0 rounded-t-[16px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 30%, rgba(255,255,255,0.4) 65%, white 85%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-3 pt-12 flex items-center justify-center gap-2">
          <h2 className="text-base font-bold text-[#1a1a1a] truncate">{name}</h2>
          {verified && <VerifiedBadgeGray />}
        </div>
      </div>
      <ContentBlock>
        <p className="text-sm text-[#6b7280] leading-snug mb-4">{bio}</p>
      </ContentBlock>
    </article>
  )
}

export default ProfileCard
