'use client';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchItem {
  id: string;
  title: string;
  category: 'Route' | 'Domain' | 'Story' | 'Record';
  href: string;
  meta?: string;
}

const ITEMS: SearchItem[] = [
  { id: 'r-overview', title: 'Atlas — what changed', category: 'Route', href: '/overview/', meta: 'Topics and years across the record' },
  { id: 'r-questions', title: 'Questions', category: 'Route', href: '/questions/', meta: 'Core policy inquiries' },
  { id: 'r-stories', title: 'Stories', category: 'Route', href: '/stories/', meta: 'Sequential evidence & disputes' },
  { id: 'r-search', title: 'Records — find any record', category: 'Route', href: '/search/', meta: 'Comprehensive index' },
  { id: 'r-serieq', title: 'Indicator series', category: 'Route', href: '/search/?layer=series', meta: 'Time series data' },
  { id: 'r-ledger', title: 'Reforms, events and episodes', category: 'Route', href: '/search/?layer=ledger', meta: 'Historical ledger' },
  { id: 'r-provenance', title: 'Measurement disputes', category: 'Route', href: '/search/?layer=provenance', meta: 'Contested methodologies' },
  { id: 'r-unmeasured', title: 'Gaps — what is not measured', category: 'Route', href: '/unmeasured/', meta: 'Data absences and gaps' },
  { id: 'r-exposure', title: 'Exposure to shocks', category: 'Route', href: '/exposure/', meta: 'Demonetisation, COVID-19' },
  { id: 'r-terms', title: 'Terms of government', category: 'Route', href: '/terms/', meta: 'Term 1, Term 2, Term 3' },
  { id: 'r-peers', title: 'Four comparator countries', category: 'Route', href: '/peers/', meta: 'BGD, VNM, IDN, CHN' },
  { id: 'r-compare', title: 'Compare — side-by-side series', category: 'Route', href: '/compare/', meta: 'Side-by-side indicator comparisons' },
  { id: 'r-about', title: 'About — method, sources, data and corrections', category: 'Route', href: '/method/', meta: 'How the record was built and changed' },
  { id: 'r-method', title: 'Method — evidence rules and source tiers', category: 'Route', href: '/method/', meta: 'Validation criteria and project limits' },

  // Domains
  { id: 'd-employment', title: 'Employment & Labour', category: 'Domain', href: '/domains/employment/', meta: 'PLFS, CMIE, female LFPR, informal sector' },
  { id: 'd-infrastructure', title: 'Infrastructure & Highways', category: 'Domain', href: '/domains/infrastructure/', meta: 'Highways, power, railways, ports' },
  { id: 'd-education', title: 'Education & Learning', category: 'Domain', href: '/domains/education/', meta: 'ASER, GER, higher education, school enrolment' },
  { id: 'd-human-dev', title: 'Human Development & Health', category: 'Domain', href: '/domains/human-development/', meta: 'NFHS, sanitation, stunting, anaemia' },
  { id: 'd-macro', title: 'Macroeconomy & GDP', category: 'Domain', href: '/domains/macro/', meta: 'GDP revisions, fiscal deficit, inflation' },
  { id: 'd-banking', title: 'Banking & Financial System', category: 'Domain', href: '/domains/banking/', meta: 'NPA ratios, write-offs, credit growth' },
  { id: 'd-environment', title: 'Environment & Renewable Energy', category: 'Domain', href: '/domains/environment/', meta: 'Renewables, coal production, emissions' },
  { id: 'd-poverty', title: 'Poverty', category: 'Domain', href: '/domains/poverty/', meta: 'Poverty lines, consumption and multidimensional measures' },
  { id: 'd-welfare', title: 'Welfare Delivery', category: 'Domain', href: '/domains/welfare/', meta: 'Benefits, schemes and delivery systems' },
  { id: 'd-governance', title: 'Governance & Institutions', category: 'Domain', href: '/domains/governance/', meta: 'Institutions, administration and accountability' },
  { id: 'd-kashmir', title: 'Kashmir', category: 'Domain', href: '/domains/kashmir/', meta: 'Rights, security and institutional change' },
  { id: 'd-foreign', title: 'Foreign Relations', category: 'Domain', href: '/domains/foreign/', meta: 'Trade, counterparties and external relations' },
  { id: 'd-defence', title: 'Defence & Security', category: 'Domain', href: '/domains/defence/', meta: 'Capital expenditure, modernisation and security' },
  { id: 'd-federalism', title: 'Federalism & State Finances', category: 'Domain', href: '/domains/federalism/', meta: 'Cess/surcharge share, devolution' },

  // Stories
  { id: 's-read', title: 'Can Indian children read?', category: 'Story', href: '/stories/can-indian-children-read/', meta: 'ASER vs PARAKH reading dispute' },
  { id: 's-jobs', title: 'Did jobs grow after 2014?', category: 'Story', href: '/stories/did-jobs-grow/', meta: 'PLFS vs CMIE opposing signals' },
  { id: 's-dead', title: 'Who counts the dead in Kashmir?', category: 'Story', href: '/stories/who-counts-the-dead/', meta: 'Civilian and security fatalities' },
  { id: 's-renewable', title: 'How much of India’s electricity is renewable?', category: 'Story', href: '/stories/how-renewable/', meta: 'Installed capacity vs generation' },
  { id: 's-edu-spend', title: 'Is India spending more on education, or less?', category: 'Story', href: '/stories/what-counts-as-education-spending/', meta: 'Two budget totals dispute' },
  { id: 's-detainees', title: 'Two counts of Kashmir’s detainees', category: 'Story', href: '/stories/two-counts-one-boundary/', meta: 'Foreign national boundary counts' },
  { id: 's-zero', title: 'A zero that is not a zero', category: 'Story', href: '/stories/a-zero-that-is-not-a-zero/', meta: 'Welfare statutory powers' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      // ONLY AN OPEN PALETTE OWNS ESCAPE. This used to call `close()` even while closed, which
      // scheduled focus onto Quick Search one animation frame after another control handled the
      // same key. The All-pages disclosure closed correctly and focused its summary; this dormant
      // listener then stole focus, so the failure appeared to live in the disclosure.
      if (e.key === 'Escape' && open) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close, open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return ITEMS.slice(0, 8);
    const q = trimmed.toLowerCase();
    const matches = ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.meta && item.meta.toLowerCase().includes(q)),
    ).slice(0, 9);
    return [
      ...matches,
      {
        id: 'search-all-records',
        title: `Search every record for “${trimmed}”`,
        category: 'Record' as const,
        href: `/search/?q=${encodeURIComponent(trimmed)}`,
        meta: 'Series, ledger records and measurement disputes',
      },
    ];
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
    } else if (e.key === 'Tab') {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href]',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="cmd-trigger"
        onClick={() => setOpen(true)}
        aria-keyshortcuts="Meta+K Control+K"
        title="Quick search (Cmd+K)"
      >
        <span className="cmd-trigger-icon" aria-hidden="true">⌕</span>
        <span className="cmd-trigger-text">Quick Search</span>
        <kbd className="cmd-kbd" aria-hidden="true">⌘K</kbd>
      </button>

      {open ? (
        <div className="cmd-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div
            ref={dialogRef}
            className="cmd-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Quick search"
            onKeyDown={handleKeyNavigation}
          >
            <div className="cmd-search-box">
              <span className="cmd-search-icon">⌕</span>
              <input
                ref={inputRef}
                type="text"
                className="cmd-input"
                placeholder="Search pages and topics, or search the full record…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-results"
                aria-activedescendant={results[selectedIndex] ? `cmd-option-${results[selectedIndex].id}` : undefined}
              />
              {query ? (
                <button
                  type="button"
                  className="cmd-clear"
                  onClick={() => {
                    setQuery('');
                    setSelectedIndex(0);
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : null}
            </div>

            <div className="cmd-results" id="cmd-results" role="listbox" aria-label="Search results">
              {results.length === 0 ? (
                <p className="cmd-empty">No matching records found for &quot;{query}&quot;</p>
              ) : (
                results.map((item, idx) => (
                  <button
                    key={item.id}
                    id={`cmd-option-${item.id}`}
                    type="button"
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
                  </button>
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
