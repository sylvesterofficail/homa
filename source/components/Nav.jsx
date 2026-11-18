import { asset } from '@/lib/asset';

const links = [
  ['#about', 'About'],
  ['#projects', 'Work'],
  ['#experience', 'Experience'],
  ['#life', 'Life'],
  ['#contact', 'Contact'],
];

export default function Nav() {
  return (
    <>
      <header id="navbar" className="main-header fixed inset-x-0 top-0 z-50">
        <div className="page flex h-[72px] items-center justify-between gap-6">
          <a href="#top" className="nav-mark font-display text-xl italic leading-none" aria-label="Victory Homa, back to top">
            Victory Homa
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="navlinks flex items-center gap-8 text-sm font-medium">
              {links.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="link-u">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button id="navVaultBtn" className="nav-icon hidden sm:inline-flex" aria-label="Career vault" title="Career vault">
              <i id="navVaultIcon" className="fa-solid fa-lock" aria-hidden="true" />
              <span id="navVaultText" className="sr-only">Career Vault</span>
            </button>
            <button id="themeToggle" className="nav-icon" aria-label="Switch colour theme" title="Switch colour theme">
              <i className="fa-solid fa-moon" aria-hidden="true" />
            </button>
            <button id="navCvBtn" className="nav-cv hidden sm:inline-flex">Read CV</button>
            <button id="menuBtn" className="nav-icon lg:hidden" aria-label="Open menu">
              <i className="fa-solid fa-bars-staggered" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div id="drawerBackdrop" className="mobile-drawer-backdrop" />
      <aside id="mobileDrawer" className="mobile-drawer" aria-label="Menu">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={asset('assets/images/homa_neck.webp')} alt="" className="h-11 w-11 rounded-full object-cover object-top" />
            <span className="font-display text-xl italic">Victory Homa</span>
          </div>
          <button id="drawerClose" className="nav-icon" aria-label="Close menu">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <ul className="mobile-navlinks mt-10 flex flex-col">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="block border-b border-cream/15 py-4 font-display text-3xl">{label}</a>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-3 pt-8">
          <a href="#cv" id="drawerCvBtn" className="b-ghost-light w-full">Read the CV</a>
          <button id="drawerVaultBtn" className="b-ghost-light w-full">
            <i className="fa-solid fa-lock" aria-hidden="true" /> Career vault
          </button>
        </div>
      </aside>
    </>
  );
}
