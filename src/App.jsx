import { useMemo, useState } from 'react';

const sampleText = `Vehicle permit renewal is due on 12 November 2026.
Please check the route before departure and confirm the loading place.
The truck must be inspected before the end of the week.
The penalty notice states that the driver must report to the transport office.
Please ensure all driving papers are available in the vehicle.`;

const translationRules = [
  { pattern: /permit/gi, replacement: 'അനുമതി' },
  { pattern: /renewal/gi, replacement: 'പുതുക്കൽ' },
  { pattern: /vehicle/gi, replacement: 'വാഹനം' },
  { pattern: /route/gi, replacement: 'റൂട്ട് / വഴി' },
  { pattern: /inspection/gi, replacement: 'പരിശോധന' },
  { pattern: /penalty/gi, replacement: 'പിഴ' },
  { pattern: /notice/gi, replacement: 'നോട്ടീസ്' },
  { pattern: /driver/gi, replacement: 'ഡ്രൈവർ' },
  { pattern: /transport office/gi, replacement: 'യാത്രാ ഓഫീസ്' },
  { pattern: /load/gi, replacement: 'ലോഡ്' },
  { pattern: /departure/gi, replacement: 'പുറപ്പെടൽ' },
  { pattern: /check/gi, replacement: 'പരിശോധിക്കുക' },
  { pattern: /paper(s)?/gi, replacement: 'പേപ്പർ' },
  { pattern: /documents?/gi, replacement: 'രേഖകൾ' },
  { pattern: /Please/gi, replacement: 'ദയവായി' },
  { pattern: /must/gi, replacement: 'അവശ്യമാണ്' },
  { pattern: /available/gi, replacement: 'ലഭ്യമാക്കേണ്ടത്' },
  { pattern: /before/gi, replacement: 'മുമ്പ്' },
  { pattern: /due/gi, replacement: 'കാലാവധി' },
  { pattern: /truck/gi, replacement: 'ట്രക്ക്' },
  { pattern: /week/gi, replacement: 'ആഴ്ച' },
  { pattern: /report/gi, replacement: 'അറിയിക്കുക' },
  { pattern: /confirm/gi, replacement: 'ഉറപ്പാക്കുക' },
  { pattern: /loading place/gi, replacement: 'ലോഡ് ചെയ്യാനുള്ള സ്ഥലം' },
];

const glossary = [
  ['Permit', 'അനുമതി'],
  ['Vehicle Fitness', 'വാഹന സുരക്ഷാ പരിശോധന'],
  ['Route', 'വഴി / റൂട്ടു'],
  ['Penalty', 'പിഴ'],
  ['Challan', 'ചലൻ'],
  ['Delivery', 'വിതരണം'],
  ['Insurance', 'ഇൻഷുറൻസ്'],
  ['Checkpoint', 'ചെക്ക്‌പോയിന്റ്'],
];

const features = [
  {
    icon: '📄',
    title: 'Document reading',
    text: 'Understand permits, notices, route orders, challans, and transport instructions clearly.',
  },
  {
    icon: '💬',
    title: 'Message translation',
    text: 'Convert WhatsApp messages and SMS updates into simple Malayalam with plain meaning.',
  },
  {
    icon: '🧭',
    title: 'Route & timing help',
    text: 'Spot arrival deadlines, inspection dates, and checkpoint warnings before travel.',
  },
  {
    icon: '🔤',
    title: 'Simple explanations',
    text: 'Break down legal and technical wording into everyday driver-friendly language.',
  },
];

function translateText(input) {
  if (!input || !input.trim()) {
    return 'Please enter a document or message to translate.';
  }

  let output = input;
  translationRules.forEach(({ pattern, replacement }) => {
    output = output.replace(pattern, replacement);
  });

  return output.trim();
}

function buildSummary(text) {
  const lower = text.toLowerCase();
  const items = [];

  if (lower.includes('അനുമതി') || lower.includes('permit')) {
    items.push('Check your permit validity and renew it before the expiry date.');
  }
  if (lower.includes('റൂട്ട്') || lower.includes('വഴി') || lower.includes('route')) {
    items.push('Follow the route and confirm the destination before departure.');
  }
  if (lower.includes('പരിശോധന') || lower.includes('inspection')) {
    items.push('Arrange the vehicle inspection early to avoid delays or penalties.');
  }
  if (lower.includes('പിഴ') || lower.includes('penalty')) {
    items.push('Do not ignore penalty notices; report and clear them on time.');
  }

  if (items.length === 0) {
    return [
      'Review the full document carefully before starting the trip.',
      'Keep all paper work ready for inspection or checks.',
      'Ask for help if the message is unclear or urgent.',
    ];
  }

  return items;
}

export default function App() {
  const [sourceText, setSourceText] = useState(sampleText);
  const [uploadMessage, setUploadMessage] = useState('No file selected yet.');

  const translation = useMemo(() => translateText(sourceText), [sourceText]);
  const summary = useMemo(() => buildSummary(translation), [translation]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setUploadMessage('No file selected yet.');
      return;
    }

    setUploadMessage(`Loaded file: ${file.name}`);

    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result || '');
      if (content) {
        setSourceText(content.slice(0, 2500));
      }
    };
    reader.readAsText(file, 'UTF-8');
  };

  return (
    <>
      <header className="topbar">
        <div className="container nav">
          <div className="brand">
            <div className="brand-mark">M</div>
            <div>
              <span className="brand-name">Malayalam Logistics</span>
              <small>Driver Assistant</small>
            </div>
          </div>

          <nav>
            <a href="#features">Features</a>
            <a href="#translate">Translate</a>
            <a href="#glossary">Glossary</a>
            <a href="#contact">Support</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Malayalam support for local drivers</span>
              <h1>Understand your documents and messages in Malayalam.</h1>
              <p>
                A simple tool for lorry operators to read official transport notices, WhatsApp updates,
                fine letters, and route instructions in clear Malayalam and daily language.
              </p>

              <div className="hero-actions">
                <a className="btn primary" href="#translate">Try Translator</a>
                <a className="btn secondary" href="#features">See Features</a>
              </div>

              <ul className="hero-points">
                <li>Reads official documents</li>
                <li>Explains messages in simple Malayalam</li>
                <li>Highlights dates, penalties, and vehicle details</li>
              </ul>
            </div>

            <div className="panel hero-panel">
              <div className="mini-header">
                <span className="dot green" />
                <span>Live document insights</span>
              </div>

              <div className="insight-card">
                <span className="tag">Permit</span>
                <strong>Renewal due in 6 days</strong>
                <small>License validity ends on 12 Nov 2026</small>
              </div>

              <div className="insight-card">
                <span className="tag warning">Route Notice</span>
                <strong>Inspection checkpoint ahead</strong>
                <small>Follow the marked route and report before 8:00 AM.</small>
              </div>

              <div className="insight-card">
                <span className="tag success">Message</span>
                <strong>Driver message translated</strong>
                <small>“Load must be checked before departure.”</small>
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="container stats-grid">
            <div>
              <strong>24/7</strong>
              <span>Document help</span>
            </div>
            <div>
              <strong>Malayalam</strong>
              <span>Simple translations</span>
            </div>
            <div>
              <strong>Mobile ready</strong>
              <span>Works on phone</span>
            </div>
            <div>
              <strong>Daily tasks</strong>
              <span>Truck, route, permit</span>
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Designed for lorry operators</span>
              <h2>What the assistant helps with</h2>
            </div>

            <div className="card-grid">
              {features.map(({ icon, title, text }) => (
                <article key={title} className="feature-card panel">
                  <div className="icon">{icon}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="translate" className="section alt">
          <div className="container workspace-grid">
            <div className="panel input-panel">
              <div className="panel-header">
                <h3>Translate a document or message</h3>
                <span className="status-pill">English / Hindi / Mixed</span>
              </div>

              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                rows={14}
                placeholder="Paste a notice, PDF text, or driver message here..."
              />

              <div className="actions-row">
                <label className="upload-btn">
                  <input type="file" accept=".pdf,.txt,.doc,.docx" onChange={handleFileUpload} />
                  Upload file
                </label>
                <button className="btn secondary small" onClick={() => setSourceText(sampleText)}>
                  Load sample
                </button>
              </div>

              <p className="helper-text">{uploadMessage}</p>
            </div>

            <div className="panel output-panel">
              <div className="panel-header">
                <h3>Malayalam output</h3>
                <span className="status-pill success">Live preview</span>
              </div>

              <div className="result-box">
                <p className="placeholder-text">{translation}</p>
              </div>

              <div className="summary-box">
                <h4>Plain language summary</h4>
                <ul>
                  {summary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Core use cases</span>
              <h2>Built around daily logistics tasks</h2>
            </div>

            <div className="usecase-grid">
              <div className="usecase-item panel">
                <h3>Vehicle papers</h3>
                <p>Registration, fitness, permit, and insurance validity reminders.</p>
              </div>
              <div className="usecase-item panel">
                <h3>Trip instructions</h3>
                <p>Route details, warehouse timing, and delivery destination updates.</p>
              </div>
              <div className="usecase-item panel">
                <h3>Penalty notices</h3>
                <p>Interpret challans, warning messages, and due amounts in simple terms.</p>
              </div>
              <div className="usecase-item panel">
                <h3>Emergency messages</h3>
                <p>Read urgent alerts and safety instructions without confusion.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="glossary" className="section alt">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Helpful dictionary</span>
              <h2>Common transport terms</h2>
            </div>

            <div className="glossary-grid">
              {glossary.map(([term, malayalam]) => (
                <div className="term panel" key={term}>
                  <span>{term}</span>
                  <strong>{malayalam}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="container footer-inner">
          <div>
            <h3>Malayalam Logistics Assistant</h3>
            <p>Built for lorry operators, drivers, and local transport workers.</p>
          </div>
          <a href="#translate" className="btn primary small">
            Open translator
          </a>
        </div>
      </footer>
    </>
  );
}
