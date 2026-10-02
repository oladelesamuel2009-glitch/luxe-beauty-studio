import React, { useState } from 'react';
import { Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../common/SocialIcons';
import { instagramPosts } from '../../data/instagramData';
import { salonConfig } from '../../data/salonConfig';

export const InstagramSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20 lg:py-24 bg-ivory-50 relative border-t border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-200/80 text-charcoal-800 text-xs font-semibold tracking-widest uppercase">
              <InstagramIcon className="w-3.5 h-3.5 text-bronze-600" />
              Social Gallery
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal-950 tracking-tight">
              Follow the Latest Looks.
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Join <span className="font-semibold text-charcoal-900">{salonConfig.socials.instagram.followerCount}</span> beauty lovers on Instagram for daily studio transformation reels.
            </p>
          </div>

          <div>
            <a
              href={salonConfig.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal-900 text-ivory-50 hover:bg-charcoal-800 text-xs font-medium tracking-wide transition-all shadow-xs group"
            >
              <InstagramIcon className="w-4 h-4 text-rose-400" />
              <span>Follow {salonConfig.socials.instagram.handle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-bronze-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={salonConfig.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-sand-200 shadow-xs hover:shadow-xl transition-all duration-300 block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              <div
                className={`absolute inset-0 bg-charcoal-950/75 p-3 flex flex-col justify-between text-white transition-opacity duration-200 ${
                  hoveredId === post.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-bronze-300 font-mono">
                  <span>{post.tag}</span>
                  <InstagramIcon className="w-3.5 h-3.5" />
                </div>

                <p className="text-[10px] text-ivory-100 line-clamp-3 leading-tight">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-[10px] text-ivory-300 font-medium pt-1 border-t border-charcoal-700">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-xs text-white/90 group-hover:opacity-0 transition-opacity">
                <InstagramIcon className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
