'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface SearchItem {
  id: string;
  title: string;
  category: 'Route' | 'Domain' | 'Story' | 'Record';
  href: string;
  meta?: string;
}

const ITEMS: SearchItem[] = [
  { id: 'r-overview', title: 'What changed (Overview)', category: 'Route', href: '/overview/', meta: 'All topic cards & year scrubber' },
  { id: 'r-questions', title: 'Questions', category: 'Route', href: '/questions/', meta: 'Core policy inquiries' },
  { id: 'r-stories', title: 'Stories', category: 'Route', href: '/stories/', meta: 'Sequential evidence & disputes' },
  { id: 'r-search', title: 'Find a record (Search)', category: 'Route', href: '/search/', meta: 'Comprehensive index' },
  { id: 'r-serieq', title: 'Indicator series', category: 'Route', href: '/series/', meta: 'Time series data' },
  { id: 'r-ledger', title: 'Reforms, events and episodes', category: 'Route', href: '/ledger/', meta: 'Historical ledger' },
  { id: 'r-provenance', title: 'Measurement disputes', category: 'Route', href: '/provenance/', meta: 'Contested methodologies' },
  { id: 'r-unmeasured', title: 'What is not measured', category: 'Route', href: '/unmeasured/', meta: 'Data absences & gaps' },
  { id: 'r-exposure', title: 'Exposure to shocks', category: 'Route', href: '/exposure/', meta: 'Demonetisation, COVID-19' },
  { id: 'r-terms', title: 'Terms of government', category: 'Route', href: '/terms/', meta: 'Term 1, Term 2, Term 3' },
  { id: 'r-peers', title: 'Four comparator countries', category: 'Route', href: '/peers/', meta: 'BGD, VNM, IDN, CHN' },
  { id: 'r-compare', title: 'Compare series (Comparator Workbench)', category: 'Route', href: '/compare/', meta: 'Side-by-side indicator comparisons' },
  { id: 'r-method', title: 'Method, sources & tiers', category: 'Route', href: '/method/', meta: 'Validation criteria' },

  // Domains
  { id: 'd-employment', title: 'Employment & Labour', category: 'Domain', href: '/domains/employment/', meta: 'PLFS, CMIE, female LFPR, informal sector' },
  { id: 'd-infrastructure', title: 'Infrastructure & Highways', category: 'Domain', href: '/domains/infrastructure/', meta: 'Highways, power, railways, ports' },
  { id: 'd-education', title: 'Education & Learning', category: 'Domain', href: '/domains/education/', meta: 'ASER, GER, higher education, school enrolment' },
  { id: 'd-human-dev', title: 'Human Development & Health', category: 'Domain', href: '/domains/human-development/', meta: 'NFHS, sanitation, stunting, anaemia' },
  { id: 'd-macro', title: 'Macroeconomy & GDP', category: 'Domain', href: '/domains/macro/', meta: 'GDP revisions, fiscal deficit, inflation' },
  { id: 'd-banking', title: 'Banking & Financial System', category: 'Domain', href: '/domains/banking/', meta: 'NPA ratios, write-offs, credit growth' },
  { id: 'd-environment', title: 'Environment & Renewable Energy', category: 'Domain', href: '/domains/environment/', meta: 'Renewables, coal production, emissions' },
  { id: 'd-agriculture', title: 'Agriculture & Rural Economy', category: 'Domain', href: '/domains/agriculture/', meta: 'MSP, crop output, farm suicides' },
  { id: 'd-defense', title: 'Defence & Security', category: 'Domain', href: '/domains/defense/', meta: 'Capital expenditure, modernisation' },
  { id: 'd-federalism', title: 'Federalism & State Finances', category: 'Domain', href: '/domains/federalism/', meta: 'Cess/surcharge share, devolution' },

  // Stories
  { id: 's-read', title: 'Can Indian children read?', category: 'Story', href: '/stories/can-indian-children-read/', meta: 'ASER vs PARAKH reading dispute' },
  { id: 's-jobs', title: 'Did jobs grow after 2014?', category: 'Story', href: '/stories/did-jobs-grow/', meta: 'PLFS vs CMIE opposing signals' },
  { id: 's-dead', title: 'Who counts the dead in Kashmir?', category: 'Story', href: '/stories/who-counts-the-dead/', meta: 'Civilian and security fatalities' },
  { id: 's-renewable', title: 'How much of India’s electricity is renewable?', category: 'Story', href: '/stories/how-renewable/', meta: 'Installed capacity vs generation' },
  { id: 's-edu-spend', title: 'Is India spending more on education, or less?', category: 'Story', href: '/stories/what-counts-as-education-spending/', meta: 'Two budget totals dispute' },
  { id: 's-detainees', title: 'Two counts of Kashmir�s detainees', category: 'Story', href: '/stories/two-counts-one-boundary/', meta: 'Foreign national boundary counts' },
  { id: 's-zero', title: 'A zero that is not a zero', category: 'Story', href: '/stories/a-zero-that-is-not-a-zero/', meta: 'Welfare statutory powers' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return ITEMS.slice(0, 8);
    const q = query.toLowerCase();
    return ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.meta && item.meta.toLowerCase().includes(q)),
    ).slice(0, 10);
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const navigateTo = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery('');
      router.push(href);
    },
    [router],
  );

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigateTo(results[selectedIndex].href);
    }
  };

  return (
    <>
      <button
        type="button"
        className="cmd-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open search command palette (Cmd+K)"
        title="Quick search (Cmd+K)"
      >
        <span className="cmd-trigger-icon">⌕</span>
        <span className="cmd-trigger-text">Quick Search</span>
        <kbd className="cmd-kbd">⌘K</kbd>
      </button>

      {open ? (
        <div className="cmd-backdrop" onClick={() => setOpen(false)}>
          <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cmd-search-box">
              <span className="cmd-search-icon">⌕</span>
              <input
                type="text"
                autoFocus
                className="cmd-input"
                placeholder="Search series, stories, domains, records… (Press Esc to exit)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyNavigation}
              />
              {query ? (
                <button type="button" className="cmd-clear" onClick={() => setQuery('')}>
                  ✕
                </button>
              ) : null}
            </div>

            <div className="cmd-results" role="listbox">
              {results.length === 0 ? (
                <p className="cmd-empty">No matching records found for &quot;{query}&quot;</p>
              ) : (
                results.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`cmd-item${idx === selectedIndex ? ' is-selected' : ''}`}
                    onClick={() => navigateTo(item.href)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    role="option"
                    aria-selected={idx === selectedIndex}
                  >
                    <div className="cmd-item-main">
                      <span className={`cmd-badge cmd-badge-${item.category.toLowerCase()}`}>
                        {item.category}
                      </span>
                      <span className="cmd-title">{item.title}</span>
                    </div>
                    {item.meta ? <span className="cmd-meta">{item.meta}</span> : null}
                  </div>
                ))
              )}
            </div>

            <div className="cmd-footer">
              <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
              <span><kbd>Enter</kbd> to select</span>
              <span><kbd>Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
