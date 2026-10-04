import { INSTAGRAM_REELS } from "@/constants/instagram";
import { INSTAGRAM_URL } from "@/lib/seo";



export default function InstagramPortfolio() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
        {INSTAGRAM_REELS.map((reel) => (
          <article key={reel.id} className="rounded-2xl border border-brand-light-gray bg-brand-white overflow-hidden">
            <iframe
              src={`https://www.instagram.com/p/${reel.id}/embed/`}
              title={`WillShoot property video: ${reel.title}`}
              loading="lazy"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-[620px] border-0 bg-brand-soft-white"
            />
            <div className="p-6 space-y-3">
              <h2 className="text-lg font-bold tracking-tight">{reel.title}</h2>
              <p className="text-sm leading-relaxed text-brand-dark-gray">{reel.description}</p>
              <a href={`https://www.instagram.com/willshootau/reel/${reel.id}/`} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-brand-red underline underline-offset-4">Watch on Instagram</a>
            </div>
          </article>
        ))}
      </div>
      <p className="text-sm text-brand-dark-gray leading-relaxed text-center">
        More recent shoots on <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">@willshootau</a>.
        {" "}If Instagram playback is unavailable in your browser, use the watch links above.
      </p>
    </div>
  );
}
