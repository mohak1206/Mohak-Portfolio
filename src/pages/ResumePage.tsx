import React from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Printer,
  ArrowLeft,
  Mail,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
} from 'lucide-react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { credentials, type Credential } from '../data/credentials';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { usePageMeta } from '../hooks/usePageMeta';
import { m } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { EASING, staggerContainerVariants, staggerItemVariants } from '../lib/animation';

export const ResumePage: React.FC = () => {
  const prefersReduced = useReducedMotion();

  usePageMeta({
    title: 'Resume',
    description:
      'Curriculum Vitae of Mohak Agrawal — AI/ML and Full-Stack Developer.',
    path: '/resume',
  });

  const featuredProjects = projectsData.filter((p) => p.isFeatured);
  const relevantExperience = experienceData.filter((e) => e.id !== 'btech-aiml');
  
  // 4 featured certificates + IBM Data Fundamentals + Cisco Introduction to Data Science
  const certifications = credentials.filter(
    (c) => c.tier === 'featured' || c.id === 'ibm-data-fundamentals' || c.id === 'cisco-intro-data-science'
  );

  const formatCertDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length >= 2) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (monthIdx >= 0 && monthIdx < 12) {
        return `${months[monthIdx]} ${year}`;
      }
    }
    return dateStr;
  };

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://mohakagrawal.dev';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col selection:bg-burnt-orange selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Action Bar (hidden in print) */}
          <m.div
            initial={prefersReduced ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASING }}
            className="print-hide mb-8 flex flex-wrap items-center justify-between gap-4 bg-card-surface border border-warm-border rounded-lg p-4 shadow-2xs"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-grey hover:text-burnt-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to homepage</span>
            </Link>

            <div className="flex items-center gap-3">
              <a
                href="/Mohak_Agrawal_Resume.pdf"
                download="Mohak_Agrawal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium text-white bg-burnt-orange hover:bg-light-orange rounded-[5px] shadow-2xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium text-charcoal bg-ivory hover:bg-cream border border-warm-border hover:border-burnt-orange rounded-[5px] shadow-2xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </m.div>

          {/* Printable A4 Resume Sheet */}
          <m.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASING }}
            className="bg-card-surface border border-warm-border p-8 sm:p-12 shadow-sm rounded-lg print:border-none print:shadow-none print:p-0 print:m-0 print:max-w-none text-charcoal print:opacity-100 print:transform-none"
          >
            {/* Header */}
            <header className="border-b border-warm-border pb-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">
                    {profileData.name}
                  </h1>
                  <p className="font-mono text-sm sm:text-base text-burnt-orange font-medium mt-1">
                    {profileData.roleTitle}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-grey">
                  <MapPin className="w-3.5 h-3.5 text-burnt-orange print:text-charcoal" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              {/* Contact & Links Bar (No phone, no home address) */}
              <div className="mt-4 pt-3 border-t border-warm-border/60 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-mono text-charcoal/80">
                <a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-burnt-orange transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-burnt-orange print:text-charcoal" />
                  <span>{profileData.email}</span>
                </a>

                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="print-url inline-flex items-center gap-1.5 hover:text-burnt-orange transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-burnt-orange print:text-charcoal" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="print-url inline-flex items-center gap-1.5 hover:text-burnt-orange transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-burnt-orange print:text-charcoal" />
                  <span>GitHub</span>
                </a>
              </div>
            </header>

            {/* Sections container: stagger on screen only */}
            <m.div
              variants={staggerContainerVariants(0.06, 0.1)}
              initial="hidden"
              animate="visible"
              className="space-y-6 print:space-y-6"
            >
              {/* Summary */}
              <m.section
                variants={prefersReduced ? undefined : staggerItemVariants}
                className="mb-6 print-page-break-avoid print:opacity-100 print:transform-none"
              >
                <h2 className="font-serif text-lg font-bold text-charcoal uppercase tracking-wider border-b border-burnt-orange/40 pb-1 mb-2">
                  Summary
                </h2>
                <p className="text-sm leading-relaxed text-charcoal/90">
                  {profileData.aboutIntro}
                </p>
              </m.section>

              {/* Education */}
              <m.section
                variants={prefersReduced ? undefined : staggerItemVariants}
                className="mb-6 print-page-break-avoid print:opacity-100 print:transform-none"
              >
                <h2 className="font-serif text-lg font-bold text-charcoal uppercase tracking-wider border-b border-burnt-orange/40 pb-1 mb-3">
                  Education
                </h2>
                <div className="space-y-1.5 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className="font-semibold text-charcoal">
                      {profileData.education.degree}
                    </span>
                    <span className="font-mono text-xs text-muted-grey">
                      Expected {profileData.education.expectedGraduation}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-muted-grey text-xs">
                    <span>{profileData.education.institution}</span>
                    <span className="font-mono font-medium text-burnt-orange print:text-charcoal">
                      {profileData.education.cgpa}
                    </span>
                  </div>
                </div>
              </m.section>

              {/* Experience */}
              <m.section
                variants={prefersReduced ? undefined : staggerItemVariants}
                className="mb-6 print-page-break-avoid print:opacity-100 print:transform-none"
              >
                <h2 className="font-serif text-lg font-bold text-charcoal uppercase tracking-wider border-b border-burnt-orange/40 pb-1 mb-3">
                  Experience
                </h2>
                <div className="space-y-4">
                  {relevantExperience.map((exp) => (
                    <div key={exp.id} className="text-sm print-page-break-avoid">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <span className="font-semibold text-charcoal">
                          {exp.role}
                        </span>
                        <span className="font-mono text-xs text-muted-grey">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-xs text-muted-grey mb-1">
                        {exp.organization}
                        {exp.department ? ` · ${exp.department}` : ''}
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </m.section>

              {/* Projects */}
              <m.section
                variants={prefersReduced ? undefined : staggerItemVariants}
                className="mb-6 print-page-break-avoid print:opacity-100 print:transform-none"
              >
                <h2 className="font-serif text-lg font-bold text-charcoal uppercase tracking-wider border-b border-burnt-orange/40 pb-1 mb-3">
                  Featured Projects
                </h2>
                <div className="space-y-4">
                  {featuredProjects.map((p) => (
                    <div key={p.slug} className="text-sm print-page-break-avoid">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <span className="font-semibold text-charcoal">
                          {p.title}
                        </span>
                        {p.highlight && (
                          <span className="font-mono text-xs font-medium text-burnt-orange print:text-charcoal">
                            {p.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal/80 my-1 leading-relaxed">
                        {p.oneLiner}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1 text-[11px] font-mono text-muted-grey">
                        <span>Stack: {p.stack.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </m.section>

              {/* Skills */}
              <m.section
                variants={prefersReduced ? undefined : staggerItemVariants}
                className="mb-6 print-page-break-avoid print:opacity-100 print:transform-none"
              >
                <h2 className="font-serif text-lg font-bold text-charcoal uppercase tracking-wider border-b border-burnt-orange/40 pb-1 mb-3">
                  Technical Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-charcoal block mb-0.5">
                      AI & Computer Vision:
                    </span>
                    <span className="text-charcoal/80">
                      YOLOv8, PyTorch, OpenCV, Object Detection, Dataset Preparation, Roboflow
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block mb-0.5">
                      Web & Backend:
                    </span>
                    <span className="text-charcoal/80">
                      React 19, TypeScript, Tailwind CSS, Flask, REST APIs, MySQL, Firebase
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block mb-0.5">
                      Mobile Development:
                    </span>
                    <span className="text-charcoal/80">
                      Flutter, Dart (Android, iOS, Web, Windows)
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block mb-0.5">
                      Languages & Tools:
                    </span>
                    <span className="text-charcoal/80">
                      Python, JavaScript, TypeScript, Git, GitHub, VS Code, Google Colab
                    </span>
                  </div>
                </div>
              </m.section>

              {/* Certifications */}
              <m.section
                variants={prefersReduced ? undefined : staggerItemVariants}
                className="print-page-break-avoid print:opacity-100 print:transform-none"
              >
                <h2 className="font-serif text-lg font-bold text-charcoal uppercase tracking-wider border-b border-burnt-orange/40 pb-1 mb-3">
                  Certifications
                </h2>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  {certifications.map((cert) => {
                    const dateStr = formatCertDate(cert.date);
                    return (
                      <div key={cert.id} className="text-charcoal/90 leading-snug">
                        <span className="font-semibold text-charcoal">{cert.title}</span>,{' '}
                        <span className="text-charcoal/80">{cert.issuer}</span>
                        {dateStr && <span className="font-mono text-xs text-muted-grey"> ({dateStr})</span>}
                      </div>
                    );
                  })}
                  <p className="text-xs font-mono text-muted-grey pt-1">
                    More certificates at{' '}
                    <a href={`${siteUrl}/#credentials`} className="text-burnt-orange hover:underline">
                      {siteUrl}
                    </a>
                  </p>
                </div>
              </m.section>
            </m.div>
          </m.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResumePage;
