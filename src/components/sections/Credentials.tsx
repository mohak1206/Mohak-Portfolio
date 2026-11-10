import React from 'react';
import { Award, Users, CheckCircle } from 'lucide-react';
import { credentialsData } from '../../data/credentials';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';

export const Credentials: React.FC = () => {
  return (
    <section id="credentials" aria-label="Credentials & Leadership" className="py-20 lg:py-28 bg-ivory border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Reveal>
          <div className="space-y-3">
            <SectionLabel label="CREDENTIALS & LEADERSHIP" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal">
              Certifications & Impact
            </h2>
            <p className="text-muted-grey text-base max-w-xl">
              Formal technical certifications from global industry leaders and institutional leadership contributions.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentialsData.map((cred, idx) => (
            <Reveal key={cred.id} delay={idx * 0.1} className="h-full">
              <Card
                className="p-6 space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-[4px] bg-ivory border border-warm-border flex items-center justify-center text-burnt-orange">
                      {cred.type === 'Leadership' ? (
                        <Users className="w-5 h-5 stroke-[1.8]" />
                      ) : (
                        <Award className="w-5 h-5 stroke-[1.8]" />
                      )}
                    </div>

                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-cream border border-warm-border text-charcoal/80">
                      {cred.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-semibold text-charcoal">{cred.title}</h3>
                    <div className="text-xs font-mono text-muted-grey mt-0.5">{cred.issuer}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-grey leading-relaxed">
                    {cred.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-warm-border/60 flex items-center justify-between text-xs text-muted-grey font-mono">
                  {cred.period ? (
                    <span>Academic Year {cred.period}</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-charcoal/70">
                      <CheckCircle className="w-3.5 h-3.5 text-burnt-orange" />
                      Verified Credential
                    </span>
                  )}
                  <span className="text-[11px] text-muted-grey/80">Documented</span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

