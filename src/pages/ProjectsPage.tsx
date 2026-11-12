import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { SelectedWorks } from '../components/sections/SelectedWorks';
import { LabIdeas } from '../components/sections/LabIdeas';
import { Footer } from '../components/layout/Footer';
import { usePageMeta } from '../hooks/usePageMeta';

export const ProjectsPage: React.FC = () => {
  usePageMeta({
    title: 'Projects',
    description:
      'Explore machine learning models, computer vision systems, and full-stack software built by Mohak Agrawal.',
    path: '/projects',
  });
  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            to="/#projects"
            className="draw-underline-link inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-burnt-orange transition-colors py-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </Link>
        </div>

        <SelectedWorks showAll={true} />
        <LabIdeas />
      </main>

      <Footer />
    </div>
  );
};
