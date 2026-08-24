import React from 'react';

const PARTNERS = [
  {
    name: 'Company 1',
    logo: 'https://lh3.googleusercontent.com/d/1yfg0Gk-kgStD-YwWqvFp1yZDhH7BFK_x',
    fallback: 'https://drive.google.com/thumbnail?id=1yfg0Gk-kgStD-YwWqvFp1yZDhH7BFK_x&sz=w800',
  },
  {
    name: 'Company 2',
    logo: 'https://lh3.googleusercontent.com/d/11aBF3rbrHHVl15M2209W-kBvrA-2C_rm',
    fallback: 'https://drive.google.com/thumbnail?id=11aBF3rbrHHVl15M2209W-kBvrA-2C_rm&sz=w800',
  },
  {
    name: 'Company 3',
    logo: 'https://lh3.googleusercontent.com/d/1PDBRvb6_eEsht2RUDBalWK8BI15isG1d',
    fallback: 'https://drive.google.com/thumbnail?id=1PDBRvb6_eEsht2RUDBalWK8BI15isG1d&sz=w800',
  },
  {
    name: 'Company 4',
    logo: 'https://lh3.googleusercontent.com/d/17Q_6kCOeTAlYqOerLHEP8XIHPR5FdIhj',
    fallback: 'https://drive.google.com/thumbnail?id=17Q_6kCOeTAlYqOerLHEP8XIHPR5FdIhj&sz=w800',
  },
  {
    name: 'Company 5',
    logo: 'https://lh3.googleusercontent.com/d/1eoGx7-EDW3rFfM4l_gD00aIbpEmUGfJO',
    fallback: 'https://drive.google.com/thumbnail?id=1eoGx7-EDW3rFfM4l_gD00aIbpEmUGfJO&sz=w800',
  },
  {
    name: 'Company 6',
    logo: 'https://lh3.googleusercontent.com/d/15S3cqSCSGnrdxlt7Hvgd4FGN3qvS9DpB',
    fallback: 'https://drive.google.com/thumbnail?id=15S3cqSCSGnrdxlt7Hvgd4FGN3qvS9DpB&sz=w800',
  },
];

export const LogoCarousel: React.FC = () => {
  return (
    <section className="py-8 sm:py-10 bg-slate-50 border-y border-slate-200/80" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 6 Partner Logos displayed cleanly without containers, dots, or text */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {PARTNERS.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== partner.fallback) {
                    target.src = partner.fallback;
                  }
                }}
                className="h-8 sm:h-10 md:h-12 w-auto max-w-[130px] object-contain opacity-85 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

