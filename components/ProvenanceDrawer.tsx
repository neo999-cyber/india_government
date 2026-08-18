'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export interface ProvenancePreview {
  id: string;
  title: string;
  whatChanged: string;
  when?: string;
  directionOfBias?: string;
  bridgeNote?: string;
  affectsDomains?: string[];
  affectsSeries?: string[];
  competingAccounts?: { holder: string; position: string }[];
  sources?: { name: string; url: string; tier?: string }[];
}

export function ProvenanceDrawer({ provenanceData }: { provenanceData: ProvenancePreview[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeRecord = provenanceData.find((p) => p.id === activeId);

  const handleClose = useCallback(() => {
    setActiveId(null);
  }, []);

  // Intercept click on P-xx links or listen to custom event
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href) {
        const match = href.match(/\/provenance\/(P-\d{2,3})\/?$/);
        if (match && match[1]) {
          // If click modifier is present (Cmd, Ctrl, Shift), let default browser tab navigation work
          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
          e.preventDefault();
          setActiveId(match[1]);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeId) {
        handleClose();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeId, handleClose]);

  if (!activeId || !activeRecord) return null;

  return (
    <div className="prov-drawer-backdrop" onClick={handleClose}>
      <aside
        className="prov-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="prov-drawer-title"
        aria-modal="true"
      >
        <div className="prov-drawer-header">
          <div className="prov-drawer-meta">
            <span className="badge badge-dispute">{activeRecord.id}</span>
            {activeRecord.directionOfBias ? (
              <span className="badge badge-tier">BIAS: {activeRecord.directionOfBias.toUpperCase()}</span>
            ) : null}
            {activeRecord.when ? <span className="prov-drawer-when">{activeRecord.when}</span> : null}
          </div>
          <button
            type="button"
            className="prov-drawer-close"
            onClick={handleClose}
            aria-label="Close provenance drawer (Esc)"
          >
            ✕
          </button>
        </div>

        <div className="prov-drawer-content">
          <h2 id="prov-drawer-title" className="prov-drawer-title">
            {activeRecord.title}
          </h2>

          <div className="prov-drawer-section">
            <h3 className="prov-drawer-h3">What Changed &amp; Disputed Method</h3>
            <p className="prov-drawer-text">{activeRecord.whatChanged}</p>
            {activeRecord.bridgeNote ? (
              <p className="prov-drawer-bridge">
                <strong>Seam Rule:</strong> {activeRecord.bridgeNote}
              </p>
            ) : null}
          </div>

          {activeRecord.competingAccounts && activeRecord.competingAccounts.length > 0 ? (
            <div className="prov-drawer-section">
              <h3 className="prov-drawer-h3">Competing Accounts ({activeRecord.competingAccounts.length})</h3>
              <div className="prov-accounts-list">
                {activeRecord.competingAccounts.map((acc, i) => (
                  <div key={i} className="prov-account-item">
                    <strong className="prov-holder">{acc.holder}</strong>
                    <p className="prov-position">{acc.position}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeRecord.affectsSeries && activeRecord.affectsSeries.length > 0 ? (
            <div className="prov-drawer-section">
              <h3 className="prov-drawer-h3">Affected Indicator Series</h3>
              <div className="prov-series-chips">
                {activeRecord.affectsSeries.map((sid) => (
                  <Link key={sid} href={'/series/' + sid + '/'} className="prov-series-chip" onClick={handleClose}>
                    {sid} →
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {activeRecord.sources && activeRecord.sources.length > 0 ? (
            <div className="prov-drawer-section">
              <h3 className="prov-drawer-h3">Primary Sources &amp; Archive</h3>
              <div className="prov-sources-list">
                {activeRecord.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="prov-source-item"
                  >
                    {src.tier ? <span className="badge badge-tier">{src.tier}</span> : null}
                    <span className="prov-source-name">{src.name}</span>
                    <span className="prov-source-ext">↗</span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="prov-drawer-footer">
          <Link href={'/provenance/' + activeRecord.id + '/'} className="prov-full-link" onClick={handleClose}>
            Open full dispute record page →
          </Link>
        </div>
      </aside>
    </div>
  );
}
