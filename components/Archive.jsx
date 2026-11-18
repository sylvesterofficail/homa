import { Reveal, MaskWords } from './motion';

// IDs and classes below are driven by the interactive layer (vault, search, filters, list, export).
export default function Archive() {
  return (
    <section id="archive" className="bg-raised py-24 md:py-32">
      <div className="page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal as="p" className="label">Archive</Reveal>
            <MaskWords as="h2" className="h-section mt-4 block" text="Every milestone, kept" />
          </div>
          <Reveal as="p" className="lede lg:col-span-5" delay={0.1}>
            Search career moments, projects and coursework by year or name. Private records sit behind the career vault.
          </Reveal>
        </div>

        <Reveal className="vault-banner mt-12 flex flex-col gap-4 rounded-lg bg-olive p-6 text-cream md:flex-row md:items-center md:justify-between md:p-8" id="vaultBanner">
          <div className="max-w-2xl">
            <h3 className="text-base font-semibold">
              <i className="fa-solid fa-shield-halved mr-2 text-[#d8af65]" aria-hidden="true" />
              <span id="vaultBannerTitle">Public and private records</span>
            </h3>
            <p id="vaultBannerDesc" className="mt-2 text-sm text-cream/75">
              You are viewing the public portfolio. Unlock the career vault to see transcripts, performance reviews and internal documents.
            </p>
          </div>
          <button id="vaultUnlockBtn" className="b bg-cream text-olive hover:bg-[#e9d7b0]">
            <i className="fa-solid fa-lock-open" aria-hidden="true" /> <span id="vaultUnlockBtnText">Unlock career vault</span>
          </button>
        </Reveal>

        <Reveal className="archive-toolbar mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <label className="archive-search-wrap flex items-center gap-3 border-b border-ink/30 py-2 md:w-80">
            <i className="fa-solid fa-magnifying-glass text-sm text-muted" aria-hidden="true" />
            <input type="search" id="archiveSearch" placeholder="Search by year, company or project" aria-label="Search the archive" className="w-full bg-transparent text-sm outline-none placeholder:text-muted" />
          </label>
          <div className="archive-filter-chips flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filter archive">
            {[['all', 'All'], ['Career', 'Career'], ['Project', 'Projects'], ['Education', 'Education'], ['Personal', 'Personal']].map(([k, l], i) => (
              <button key={k} className={`chip-btn tab ${i === 0 ? 'active' : ''}`} data-filter={k}>{l}</button>
            ))}
          </div>
          <button id="addArchiveBtn" className="b-solid">
            <i className="fa-solid fa-plus" aria-hidden="true" /> Add entry
          </button>
        </Reveal>

        <div className="archive-list mt-8 flex flex-col" id="archiveList" />
        <div className="archive-empty-state py-16 text-center text-muted" id="archiveEmpty" style={{ display: 'none' }}>
          <i className="fa-solid fa-folder-open mb-3 block text-2xl" aria-hidden="true" />
          Nothing matches that search. Try a year like 2025, or add a new entry.
        </div>

        <div className="mt-8 flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p><i className="fa-solid fa-lock mr-2" aria-hidden="true" />Entries you add are saved in this browser only.</p>
          <div className="flex gap-3">
            <button id="manageArchiveBtn" className="b-line px-4 py-2">Manage entries</button>
            <button id="exportArchiveBtn" className="b-line px-4 py-2"><i className="fa-solid fa-download" aria-hidden="true" /> Export backup</button>
          </div>
        </div>
      </div>
    </section>
  );
}
