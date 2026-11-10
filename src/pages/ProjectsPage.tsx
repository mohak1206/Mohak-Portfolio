import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { SelectedWorks } from '../components/sections/SelectedWorks';
import { LabIdeas } from '../components/sections/LabIdeas';
import { Footer } from '../components/layout/Footer';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-burnt-orange transition-colors"
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
