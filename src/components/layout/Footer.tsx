'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Smooth Score Quiz', href: '/quiz' },
        { label: 'Pricing Plans', href: '/pricing' },
        { label: 'Smooth AI Chat', href: '/dashboard/chat' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="relative bg-background/50 border-t border-white/5 pt-16 pb-8 backdrop-blur-md">
      {/* Decorative gradient blur background */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-80 w-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-purple/60 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-6 mb-12">
          {/* Logo & Brand Info */}
          <div className="col-span-1 md:col-span-3 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Smooth<span className="gradient-text font-black">Operator</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Smooth Operator — Fix the vibe before you fix the reply. 
              The premium, private confidence and communication improvement platform for Indian men.
            </p>
            <div className="text-sm">
              <span className="text-white/70">Support:</span>{' '}
              <a
                href="mailto:smoothoperation.info@gmail.com"
                className="text-purple hover:underline hover:text-purple/80 transition-colors"
              >
                smoothoperation.info@gmail.com
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {sections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-heading text-sm font-semibold tracking-wider text-white uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground space-y-4 md:space-y-0">
          <p>© {currentYear} Smooth Operator. All rights reserved.</p>
          <p className="flex space-x-4">
            <span>Designed for visual excellence. Private by default.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
