export type Lang = 'uk' | 'en'

export const t = {
  uk: {
    // Nav
    nav_pricing: 'Ціни',
    nav_open_app: 'Відкрити додаток',
    nav_try: 'Спробувати →',

    // Hero
    hero_tag: '✦ AI-генератор changelogs',
    hero_h1_1: 'Більше ніяких нудних',
    hero_h1_2: 'changelogs вручну',
    hero_desc: 'Вставте git-коміти — отримайте красивий, зрозумілий changelog за 3 секунди. Ваші користувачі нарешті зрозуміють, що змінилось.',
    hero_cta: 'Спробувати безкоштовно',
    hero_pricing: 'Переглянути ціни',

    // Demo
    demo_title: 'Живе демо',
    demo_input_label: 'ВАШІ GIT-КОМІТИ',
    demo_output_label: 'РЕЗУЛЬТАТ',
    demo_btn: '✦ Згенерувати Changelog',
    demo_generating: 'Генерую...',
    demo_placeholder: '← Натисніть кнопку для генерації',
    demo_commits_count: 'комітів',

    // Format/Audience selects
    fmt_markdown: 'Markdown',
    fmt_html: 'HTML',
    fmt_plaintext: 'Plaintext',
    aud_users: 'Для користувачів',
    aud_devs: 'Для розробників',
    aud_investors: 'Для інвесторів',

    // Features
    features_title: 'Чому GitLog AI?',
    features: [
      { icon: '⚡', title: '3 секунди', desc: 'Changelog готовий швидше, ніж ви встигнете відкрити документ' },
      { icon: '🎯', title: 'Для вашої аудиторії', desc: 'Різні стилі для користувачів, розробників та інвесторів' },
      { icon: '🔗', title: 'Lemon Squeezy', desc: 'Оплата працює в Україні — виведення на Monobank / ПриватБанк' },
      { icon: '🌍', title: 'Мультимовність', desc: 'Генерація українською, англійською та іншими мовами' },
      { icon: '📋', title: '3 формати', desc: 'Markdown, HTML та Plaintext — вибирайте потрібний' },
      { icon: '💰', title: 'Від $9/міс', desc: 'Доступно для freelancers, команд і open-source проектів' },
    ],

    // CTA section
    cta_h2_1: 'Готові заощадити',
    cta_h2_2: 'годину на тиждень?',
    cta_desc: 'Починайте безкоштовно з 10 генерацій. Без кредитної картки.',
    cta_btn: 'Почати безкоштовно →',

    // Footer
    footer: '© 2025 GitLog AI',

    // Dashboard
    dash_title: 'Генератор Changelog',
    dash_subtitle: 'Вставте git-коміти нижче та налаштуйте параметри',
    dash_input_label: 'GIT КОМІТИ',
    dash_output_label: 'РЕЗУЛЬТАТ',
    dash_copy: 'Копіювати',
    dash_copied: '✓ Скопійовано',
    dash_generating: '● Генерую changelog...',
    dash_empty: 'Результат з\'явиться тут після генерації...',
    dash_btn: '✦ Згенерувати',
    dash_btn_limit: 'Ліміт вичерпано',
    dash_format_label: 'ФОРМАТ',
    dash_audience_label: 'АУДИТОРІЯ',
    dash_language_label: 'МОВА CHANGELOG',
    dash_upgrade: 'Оновити →',
    dash_remaining: 'Залишилось:',
    dash_used_month: 'Використано цього місяця',
    dash_limit_msg: 'Ваш ліміт вичерпано.',
    dash_limit_link: 'Оновіть план →',
    dash_error_empty: 'Вставте ваші git-коміти',
    dash_error_limit: 'Ліміт вичерпано. Оновіть план для продовження.',
    dash_tips_title: 'ПОРАДИ',
    dash_tips: [
      { t: 'Conventional Commits', d: 'feat:, fix:, chore: → краща структура' },
      { t: 'По одному коміту на рядок', d: 'Кожен коміт = окремий рядок' },
      { t: 'Детальніші коміти', d: 'Більше контексту = кращий результат' },
    ],
    lang_uk: 'Українська',
    lang_en: 'English',
    lang_de: 'Deutsch',
    lang_pl: 'Polski',

    // Pricing
    pricing_tag: 'Прозорі ціни',
    pricing_h1: 'Обери свій план',
    pricing_desc: 'Починайте безкоштовно. Масштабуйте коли зростаєте. Скасуйте будь-коли.',
    pricing_popular: '✦ ПОПУЛЯРНИЙ',
    pricing_month: '/місяць',
    pricing_loading: 'Завантаження...',
    pricing_path_title: 'ШЛЯХ ДО $1,000/МІС',
    pricing_path_pro: 'Pro клієнтів → $1,015',
    pricing_path_starter: 'Starter клієнтів → $1,008',
    plans: [
      {
        id: 'free', name: 'Free', price: 0, limit: '10 генерацій',
        features: ['10 генерацій/місяць', 'Markdown та Plaintext', '3 аудиторії', 'Базовий функціонал'],
        cta: 'Почати безкоштовно', featured: false,
      },
      {
        id: 'starter', name: 'Starter', price: 9, limit: '100 генерацій',
        features: ['100 генерацій/місяць', 'Всі формати виводу', '3 аудиторії + мови', 'Email підтримка'],
        cta: 'Почати Starter', featured: false,
      },
      {
        id: 'pro', name: 'Pro', price: 29, limit: 'Необмежено',
        features: ['Необмежені генерації', 'API доступ', 'GitHub webhook', 'Кастомні шаблони', 'Пріоритетна підтримка'],
        cta: 'Почати Pro', featured: true,
      },
    ],

    // Success
    success_title: 'Оплата успішна!',
    success_desc_1: 'Дякуємо за підписку на план',
    success_desc_2: 'Ваш акаунт вже активовано.',
    success_btn: 'Відкрити додаток →',
  },

  en: {
    nav_pricing: 'Pricing',
    nav_open_app: 'Open app',
    nav_try: 'Try now →',

    hero_tag: '✦ AI-powered changelog generator',
    hero_h1_1: 'No more boring',
    hero_h1_2: 'changelogs by hand',
    hero_desc: 'Paste your git commits — get a beautiful, readable changelog in 3 seconds. Your users will finally understand what changed.',
    hero_cta: 'Try for free',
    hero_pricing: 'View pricing',

    demo_title: 'Live demo',
    demo_input_label: 'YOUR GIT COMMITS',
    demo_output_label: 'RESULT',
    demo_btn: '✦ Generate Changelog',
    demo_generating: 'Generating...',
    demo_placeholder: '← Click the button to generate',
    demo_commits_count: 'commits',

    fmt_markdown: 'Markdown',
    fmt_html: 'HTML',
    fmt_plaintext: 'Plaintext',
    aud_users: 'End users',
    aud_devs: 'Developers',
    aud_investors: 'Investors',

    features_title: 'Why GitLog AI?',
    features: [
      { icon: '⚡', title: '3 seconds', desc: 'Changelog ready faster than you can open a document' },
      { icon: '🎯', title: 'For your audience', desc: 'Different styles for users, developers and investors' },
      { icon: '🔗', title: 'Lemon Squeezy', desc: 'Payments work worldwide — withdraw to any bank' },
      { icon: '🌍', title: 'Multilingual', desc: 'Generate in Ukrainian, English and other languages' },
      { icon: '📋', title: '3 formats', desc: 'Markdown, HTML and Plaintext — pick what you need' },
      { icon: '💰', title: 'From $9/mo', desc: 'Affordable for freelancers, teams and open-source projects' },
    ],

    cta_h2_1: 'Ready to save',
    cta_h2_2: 'an hour a week?',
    cta_desc: 'Start free with 10 generations. No credit card required.',
    cta_btn: 'Start for free →',

    footer: '© 2025 GitLog AI',

    dash_title: 'Changelog Generator',
    dash_subtitle: 'Paste your git commits below and configure the options',
    dash_input_label: 'GIT COMMITS',
    dash_output_label: 'RESULT',
    dash_copy: 'Copy',
    dash_copied: '✓ Copied',
    dash_generating: '● Generating changelog...',
    dash_empty: 'Result will appear here after generation...',
    dash_btn: '✦ Generate',
    dash_btn_limit: 'Limit reached',
    dash_format_label: 'FORMAT',
    dash_audience_label: 'AUDIENCE',
    dash_language_label: 'CHANGELOG LANGUAGE',
    dash_upgrade: 'Upgrade →',
    dash_remaining: 'Remaining:',
    dash_used_month: 'Used this month',
    dash_limit_msg: 'Your limit is reached.',
    dash_limit_link: 'Upgrade plan →',
    dash_error_empty: 'Please paste your git commits',
    dash_error_limit: 'Limit reached. Upgrade your plan to continue.',
    dash_tips_title: 'TIPS',
    dash_tips: [
      { t: 'Conventional Commits', d: 'feat:, fix:, chore: → better structure' },
      { t: 'One commit per line', d: 'Each commit = separate line' },
      { t: 'More detailed commits', d: 'More context = better result' },
    ],
    lang_uk: 'Українська',
    lang_en: 'English',
    lang_de: 'Deutsch',
    lang_pl: 'Polski',

    pricing_tag: 'Transparent pricing',
    pricing_h1: 'Choose your plan',
    pricing_desc: 'Start free. Scale as you grow. Cancel anytime.',
    pricing_popular: '✦ POPULAR',
    pricing_month: '/month',
    pricing_loading: 'Loading...',
    pricing_path_title: 'PATH TO $1,000/MO',
    pricing_path_pro: 'Pro customers → $1,015',
    pricing_path_starter: 'Starter customers → $1,008',
    plans: [
      {
        id: 'free', name: 'Free', price: 0, limit: '10 generations',
        features: ['10 generations/month', 'Markdown & Plaintext', '3 audiences', 'Basic features'],
        cta: 'Start for free', featured: false,
      },
      {
        id: 'starter', name: 'Starter', price: 9, limit: '100 generations',
        features: ['100 generations/month', 'All output formats', '3 audiences + languages', 'Email support'],
        cta: 'Start Starter', featured: false,
      },
      {
        id: 'pro', name: 'Pro', price: 29, limit: 'Unlimited',
        features: ['Unlimited generations', 'API access', 'GitHub webhook', 'Custom templates', 'Priority support'],
        cta: 'Start Pro', featured: true,
      },
    ],

    success_title: 'Payment successful!',
    success_desc_1: 'Thank you for subscribing to the',
    success_desc_2: 'plan. Your account is now active.',
    success_btn: 'Open the app →',
  },
}

export function getLang(lang: string): Lang {
  return lang === 'en' ? 'en' : 'uk'
}
