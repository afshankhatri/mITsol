export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogParagraphBlock {
  type: 'paragraph';
  content: string;
}

export interface BlogListBlock {
  type: 'list';
  heading?: string;
  ordered?: boolean;
  items: string[];
}

export interface BlogCardsBlock {
  type: 'cards';
  items: {
    heading: string;
    text: string;
  }[];
}

export interface BlogTableBlock {
  type: 'table';
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface BlogFaqBlock {
  type: 'faq';
  items: BlogFaq[];
}

export interface BlogCalloutBlock {
  type: 'callout';
  title?: string;
  content: string;
}

export interface BlogQuoteBlock {
  type: 'quote';
  content: string;
  attribution?: string;
}

export interface BlogHeadingBlock {
  type: 'heading';
  level?: 3 | 4;
  content: string;
}

export interface BlogImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export type BlogContentBlock =
  | BlogParagraphBlock
  | BlogListBlock
  | BlogCardsBlock
  | BlogTableBlock
  | BlogFaqBlock
  | BlogCalloutBlock
  | BlogQuoteBlock
  | BlogHeadingBlock
  | BlogImageBlock;

export interface BlogSection {
  id: string;
  title?: string;
  blocks: BlogContentBlock[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  // primaryKeyword:string;
  secondaryKeyword:string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  coverImage?: string;
  coverImageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: BlogSection[];
}

export const blogs: BlogPost[] = [
  {
    slug: 'laptop-repair-cost-mumbai',
    title: 'Laptop Repair Cost in Mumbai: PriceGuide List | Meridian',
    excerpt:
      'Laptop repair cost in Mumbai Guide: Prices for screen, battery, keyboard, and motherboard jobs, and what pushes a quote up. Free diagnosis. ',
    category: 'Laptop Tips',
    // primaryKeyword:'Laptop Tips'
    secondaryKeyword: 'Laptop Tips, Tips, Laptop',
    author: 'Meridian InfoTech Solutions',
    publishedAt: '2026-10-28',
    readingTime: 6,
    metaDescription:
      'Laptop repair cost in Mumbai Guide: Prices for screen, battery, keyboard, and motherboard jobs, and what pushes a quote up. Free diagnosis. ',
    sections: [
      {
        id: 'laptop-repair-cost-in-mumbai',
        title: 'Laptop Repair Cost in Mumbai: Screen, Battery, Keyboard and Motherboard Prices',
        blocks: [
          {
            type: 'paragraph',
            content:
              'Most laptop repairs in Mumbai fall between ₹800 and ₹12,000. A loose charging jack or a hinge fix sits at the bottom of that range, a screen or battery lands in the middle, and chip-level motherboard work is the expensive end. The exact figure depends on your model, the part grade, and whether the fault is really what it looks like.',
          },
          {
            type: 'paragraph',
            content:
              'Below is what most shops across the city usually quote in 2026, based on what comes across our bench at Dongri and Kurla. These are market ranges, not a fixed rate card. Get an exact quote after a free diagnosis.',
          },
          // {
          //   type: 'list',
          //   heading: 'A few safe checks to try first',
          //   items: [
          //     'Restart the laptop if it has been running for a long time.',
          //     'Close apps and browser tabs you are not using.',
          //     'Check whether storage is nearly full and remove files you no longer need.',
          //     'Install operating system updates from the official update settings.',
          //   ],
          // },
        ],
      },
      {
        id: 'how-much-does-laptop-repair-cost-in-mumbai-in-2026',
        title: 'How much does laptop repair cost in Mumbai in 2026',
        blocks: [
          {
            type: 'paragraph',
            content:
              'Expect ₹800 to ₹6,000 for the common jobs. That covers most screen, battery, and keyboard replacements on mainstream Windows laptops. Gaming laptops, 2-in-1 touch models, and anything with an OLED panel cost more, sometimes double.',
          },
          // {
          //   type: 'cards',
          //   items: [
          //     {
          //       heading: 'Too many startup apps',
          //       text: 'The laptop takes a long time to become usable after you sign in.',
          //     },
          //     {
          //       heading: 'Low available storage',
          //       text: 'Updates may fail, and apps may take longer to open or save files.',
          //     },
          //     {
          //       heading: 'Heat or dust buildup',
          //       text: 'Performance drops after the laptop has been running for a while, or the fan runs loudly.',
          //     },
          //   ],
          // },
          {
            type: 'table',
            caption: 'Match the symptom to a sensible next check',
            headers: ['Repair', 'Typical Mumbai Market Range', 'Ususal Turnaround'],
            rows: [
              ['Slow startup', 'Apps that launch at startup', 'Disable apps you do not need at sign-in'],
              ['Slow when multitasking', 'Memory use and open apps', 'Close unused apps; ask a technician about a memory upgrade'],
              ['Slow after extended use', 'Heat, vents, and fan noise', 'Keep vents clear and arrange a cleaning if needed'],
              ['Frequent freezes', 'Updates, storage, and error messages', 'Back up important files and get the device diagnosed'],
            ],
          },
          {
            type: 'paragraph',
            content:
              'Treat these as typical ranges most shops quote. Get an exact quote after a free diagnosis.',
          },
        ],
      },
      {
        id: 'when-to-get-help',
        title: 'When to get professional help',
        blocks: [
          {
            type: 'paragraph',
            content:
              'If the laptop keeps freezing, overheats, makes unusual noises, or shows storage errors, back up important files and have it checked. Avoid opening the device unless you are comfortable working with laptop hardware.',
          },
          {
            type: 'callout',
            title: 'Before a repair or upgrade',
            content:
              'Tell the technician what changed, when the issue began, and whether the laptop was dropped, exposed to liquid, or recently updated. This context helps guide diagnosis.',
          },
        ],
      },
    ],
  },
  {
    slug: 'refurbished-laptop-buying-checklist',
    title: 'A Practical Checklist for Buying a Refurbished Laptop',
    excerpt:
      'Compare condition, specifications, battery, warranty, and your everyday needs with this step-by-step refurbished laptop buying guide.',
    category: 'Buying Guide',
    // primaryKeyword: 'Buying Guide',
    secondaryKeyword: 'Buying Guide, Buying, Guide',
    author: 'Meridian InfoTech Solutions',
    publishedAt: '2026-10-20',
    readingTime: 7,
    metaDescription:
      'Use this refurbished laptop buying checklist to compare specifications, physical condition, battery health, warranty, and value.',
    sections: [
      {
        id: 'start-with-your-needs',
        title: 'Start with what you need the laptop to do',
        blocks: [
          {
            type: 'paragraph',
            content:
              'A good choice starts with your everyday workload, not just the model name. Make a short list of the apps you use, whether you travel with the laptop, and how much storage your files require.',
          },
          {
            type: 'table',
            caption: 'Use your workload to guide the comparison',
            headers: ['Typical use', 'What to prioritize', 'Questions to ask'],
            rows: [
              ['Web, email, and documents', 'Comfortable keyboard, reliable battery, sufficient memory', 'Can I try the keyboard, camera, and Wi-Fi?'],
              ['Study and video calls', 'Webcam, microphone, screen quality, portability', 'Are the webcam and microphone tested?'],
              ['Creative or technical work', 'Processor, memory, graphics, and upgrade options', 'Will my required apps run on this configuration?'],
            ],
          },
          {
            type: 'callout',
            title: 'Keep it practical',
            content:
              'Choose a configuration that supports your actual workload and budget. A higher specification is not automatically better value if you do not need it.',
          },
        ],
      },
      {
        id: 'inspect-before-you-buy',
        title: 'Inspect the device and confirm what is included',
        blocks: [
          {
            type: 'list',
            ordered: true,
            heading: 'A useful inspection order',
            items: [
              'Check the screen for visible marks, flicker, or uneven brightness.',
              'Test the keyboard, trackpad, ports, speakers, camera, and wireless connection.',
              'Ask how the battery was checked and what battery condition is expected.',
              'Confirm the charger, operating system, and any accessories included with the sale.',
              'Review the return, warranty, and support terms before completing the purchase.',
            ],
          },
          {
            type: 'cards',
            items: [
              {
                heading: 'Condition',
                text: 'Ask about cosmetic wear and whether any parts have been replaced.',
              },
              {
                heading: 'Testing',
                text: 'Find out which hardware functions were checked and whether the device was reset.',
              },
              {
                heading: 'After-sales support',
                text: 'Get the warranty period and service process in writing.',
              },
              {
                heading: 'Total value',
                text: 'Compare the price with the configuration, condition, and included support.',
              },
            ],
          },
        ],
      },
      {
        id: 'make-the-final-choice',
        title: 'Make the final choice with confidence',
        blocks: [
          {
            type: 'quote',
            content: 'The right refurbished laptop is one that fits your work, budget, and support expectations.',
            attribution: 'Meridian InfoTech Solutions',
          },
          {
            type: 'paragraph',
            content:
              'Write down the configuration and warranty details of the models you are considering. If the seller cannot clearly explain the device condition or support terms, take time to compare other options.',
          },
        ],
      },
    ],
  },
  {
    slug: 'simple-computer-maintenance-habits',
    title: 'Simple Computer Maintenance Habits for Home and Office',
    excerpt:
      'Small, regular habits can make computers easier to manage. Learn a straightforward routine for updates, backups, airflow, and troubleshooting.',
    category: 'Maintenance',
    // primaryKeyword: 'Maintenance',
    secondaryKeyword: 'Maintenance,Maintenance i, Maintenance n',
    author: 'Meridian InfoTech Solutions',
    publishedAt: '2026-10-12',
    readingTime: 5,
    metaDescription:
      'Explore simple computer maintenance habits for updates, backups, ventilation, and knowing when to ask for technical support.',
    sections: [
      {
        id: 'quick-weekly-checks',
        title: 'A few quick checks to do regularly',
        blocks: [
          {
            type: 'list',
            heading: 'A simple routine',
            items: [
              'Save important work and keep a separate backup of important files.',
              'Install system and application updates from trusted sources.',
              'Keep drinks away from computers and avoid blocking cooling vents.',
              'Restart devices when updates or troubleshooting steps require it.',
            ],
          },
          {
            type: 'quote',
            content: 'A backup is useful only when you can access the files you need.',
            attribution: 'A reminder for your regular maintenance routine',
          },
          {
            type: 'paragraph',
            content:
              'Pick a routine you can actually follow. For example, check updates and backup status on a regular day each week, and keep a note of any recurring error messages.',
          },
        ],
      },
      {
        id: 'protect-performance',
        title: 'Protect performance and avoid preventable problems',
        blocks: [
          {
            type: 'cards',
            items: [
              {
                heading: 'Keep devices ventilated',
                text: 'Use a firm surface and leave air vents unobstructed to support normal cooling.',
              },
              {
                heading: 'Use trusted downloads',
                text: 'Download software and updates from the publisher or your organization’s approved source.',
              },
              {
                heading: 'Keep a record',
                text: 'Note when an issue started and what changed recently, such as a new app or update.',
              },
            ],
          },
          {
            type: 'table',
            caption: 'Maintenance routine by frequency',
            headers: ['When', 'Task', 'Why it helps'],
            rows: [
              ['Weekly', 'Check backup and update status', 'Helps keep files protected and devices current'],
              ['Monthly', 'Review available storage and unused apps', 'Makes it easier to spot low-storage issues'],
              ['When needed', 'Arrange a hardware check for unusual heat or noise', 'Can help identify a developing device problem'],
            ],
          },
        ],
      },
      {
        id: 'know-when-to-call',
        title: 'Know when a problem needs a technician',
        blocks: [
          {
            type: 'paragraph',
            content:
              'Repeated shutdowns, liquid spills, burning smells, unusual clicking, or failing storage warnings deserve prompt attention. Stop using the device if you suspect electrical or liquid damage, and seek qualified help rather than repeatedly restarting it.',
          },
          {
            type: 'faq',
            items: [
              {
                question: 'Should I open my computer to clean it?',
                answer:
                  'Only if you are familiar with the device and its safe cleaning procedure. For laptops or devices under warranty, consult the manufacturer or a qualified technician first.',
              },
              {
                question: 'Does routine maintenance prevent every failure?',
                answer:
                  'No. Maintenance can help with common preventable issues, but components can still wear out or fail unexpectedly. Keep backups regardless.',
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((blog) => blog.slug === slug);
}
