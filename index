<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FieldAssist APM Deck - Opportunity-Led Execution</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap');

        :root {
            /* FieldAssist Exact Branding */
            --fa-dark-blue: #074C7A;
            --fa-light-blue: #009FE3;
            --bg-body: #F5F7F9;
            --text-main: #1E293B;
            --text-muted: #64748B;
            --border-color: #E2E8F0;
            --deck-bg: #FFFFFF;
            --deck-slide: #F8FAFC;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }

        body {
            background-color: #cbd5e1;
            display: flex; justify-content: center; align-items: center;
            height: 100vh; overflow: hidden;
        }

        #deck-container {
            width: 100vw; height: 100vh; max-width: 1400px; max-height: 787px;
            background-color: var(--deck-bg); position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden;
        }

        .header {
            position: absolute; top: 0; left: 0; width: 100%; padding: 30px 60px;
            display: flex; justify-content: space-between; align-items: center; z-index: 10;
        }

        .slide-counter {
            font-size: 14px; color: var(--text-muted); font-weight: 600;
            background: var(--deck-slide); padding: 8px 16px; border-radius: 20px;
            border: 1px solid var(--border-color);
        }

        .slide {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            padding: 110px 60px 60px 60px; opacity: 0; transition: opacity 0.3s ease-in-out;
            pointer-events: none; display: flex; flex-direction: column;
            background-color: var(--deck-bg);
        }

        .slide.active { opacity: 1; pointer-events: auto; }

        h1 { font-size: 44px; font-weight: 800; color: var(--text-main); margin-bottom: 8px; line-height: 1.2; letter-spacing: -0.02em; }
        h2 { font-size: 22px; font-weight: 500; color: var(--fa-light-blue); margin-bottom: 40px; letter-spacing: 0.01em; }
        h3 { font-size: 20px; font-weight: 700; color: var(--text-main); margin-bottom: 12px; margin-top: 10px; }
        p, li { font-size: 17px; line-height: 1.6; color: var(--text-muted); margin-bottom: 16px; }
        strong { color: var(--text-main); font-weight: 600; }
        ul { padding-left: 24px; }

        .card { background: var(--deck-slide); padding: 32px; border-radius: 16px; border: 1px solid var(--border-color); height: 100%; }
        .grid-2 { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; flex-grow: 1; align-items: center; }
        .grid-2-even { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; flex-grow: 1; }

        /* Slide 1 & 12 Specific */
        .title-slide { justify-content: center; align-items: center; text-align: center; background: radial-gradient(circle at 50% 0%, #e6f6fd 0%, var(--deck-bg) 70%); padding: 50px; }
        .title-slide h1 { font-size: 56px; margin-top: 20px; }
        .title-slide h2 { color: var(--text-muted); font-weight: 500; font-size: 24px; margin-bottom: 20px; }

        /* Flow Diagrams */
        .flow-container { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; position: relative; gap: 20px; }
        .flow-node { flex: 1; background: white; border: 2px solid var(--border-color); border-radius: 12px; padding: 24px; text-align: center; z-index: 2; position: relative; }
        .flow-node-title { font-size: 18px; font-weight: 800; color: var(--fa-dark-blue); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .flow-node-desc { font-size: 14px; color: var(--text-muted); line-height: 1.5; }
        .flow-arrow { display: flex; flex-direction: column; align-items: center; color: #ef4444; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .broken-line { width: 40px; height: 2px; background: repeating-linear-gradient(90deg, #ef4444, #ef4444 4px, transparent 4px, transparent 8px); margin: 8px 0; }

        /* Loop Diagram */
        .loop-container { display: flex; align-items: stretch; gap: 0; margin-top: 40px; background: #F8FAFC; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden;}
        .loop-step { flex: 1; padding: 30px 20px; position: relative; border-right: 1px solid #E2E8F0; }
        .loop-step:last-child { border-right: none; }
        .step-number { width: 32px; height: 32px; background: var(--fa-light-blue); color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: 800; font-size: 16px; margin-bottom: 16px; }
        .step-q { font-size: 18px; font-weight: 800; color: var(--text-main); line-height: 1.3; margin-bottom: 12px; }
        .step-solve { font-size: 14px; color: var(--fa-dark-blue); font-weight: 600; background: #e6f6fd; padding: 6px 12px; border-radius: 6px; display: inline-block; }
        .loop-arrow { position: absolute; top: 50%; right: -15px; transform: translateY(-50%); width: 30px; height: 30px; background: white; border: 1px solid #E2E8F0; border-radius: 50%; display: flex; justify-content: center; align-items: center; z-index: 5; color: var(--fa-light-blue); font-weight: bold; }

        /* Phone UI Replica Base */
        .phone { width: 320px; height: 640px; border: 10px solid #000; border-radius: 40px; background: var(--bg-body); position: relative; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3); margin: 0 auto; display: flex; flex-direction: column; font-family: 'Inter', sans-serif; }
        .status-bar { background: #000; color: #fff; display: flex; justify-content: space-between; padding: 8px 16px 16px 16px; font-size: 11px; font-family: 'JetBrains Mono', monospace; font-weight: 600; z-index: 100; }
        .ui-app-header { background: #fff; padding: 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #E2E8F0; z-index: 50; }
        .ui-scroll { flex-grow: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
        .ui-label { font-size: 10px; font-weight: 700; color: #94A3B8; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 4px; }
        .ui-val { font-size: 18px; font-weight: 800; color: var(--fa-light-blue); }
        .ui-val-dark { color: var(--text-main); }
        .ui-card { background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #F1F5F9; }
        .ui-card.active-card { border: 2px solid var(--fa-light-blue); box-shadow: 0 4px 12px rgba(0,159,227,0.15); }
        .ui-pill { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .ui-pill-gray { background: #F1F5F9; color: #475569; }
        .ui-pill-blue { background: #E0F2FE; color: #0284C7; }
        .ui-btn { background: var(--fa-light-blue); color: #fff; padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 13px; text-align: center; border: none; width: 100%; display: flex; justify-content: center; align-items: center; gap: 6px; cursor: pointer;}
        .opp-text { font-size: 12px; font-style: italic; color: #64748B; margin-top: 6px; display: flex; align-items: center; gap: 4px;}
        .opp-icon { color: var(--fa-light-blue); font-size: 14px; font-style: normal;}
        .ui-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .ui-modal { background: #fff; border-radius: 16px; width: 100%; padding: 20px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); }

        /* Print Settings for PDF Export */
        @media print {
            body { background: white; height: auto; overflow: visible; display: block; }
            #deck-container { width: 100%; max-width: none; height: auto; max-height: none; box-shadow: none; display: block; }
            .slide { position: relative; opacity: 1; pointer-events: auto; page-break-after: always; height: 100vh; padding: 60px; display: flex; flex-direction: column; justify-content: center; background: white !important; }
            .header { display: none !important; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
    </style>
</head>
<body>

    <div id="deck-container">
        <!-- Global Header -->
        <div class="header" id="global-header" style="display: none;">
            <div style="display: flex; align-items: center;">
                <img src="https://cdn.brandfetch.io/fieldassist.com/logo" alt="FieldAssist Logo" style="height: 24px; max-width: 150px; object-fit: contain;">
            </div>
            <div class="slide-counter"><span id="current-page">1</span> / 12</div>
        </div>

        <!-- Slide 1: Title -->
        <div class="slide active title-slide" id="slide-1">
            <img src="https://cdn.brandfetch.io/fieldassist.com/logo" alt="FieldAssist Logo" style="height: 60px; max-width: 300px; object-fit: contain; margin-bottom: 30px;">
            <h1>The Opportunity-Led<br>Execution Layer</h1>
            <h2>Helping Field Reps Prioritize, Pitch, and Convert at the Last Mile</h2>
            
            <div style="margin-top: 20px; margin-bottom: 40px;">
                <h3 style="margin-bottom: 16px; color: var(--text-main); font-size: 22px;">By Ayush Tiwari</h3>
                <a href="https://ayush-field-assist.vercel.app/" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; background: #E0F2FE; color: #0284C7; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 15px; border: 1px solid #BAE6FD; transition: background 0.2s;">
                    📱 View Interactive Prototype
                </a>
                <p style="font-size: 13px; color: var(--text-muted); margin-top: 12px; font-style: italic;">(Best viewed in mobile view)</p>
            </div>

            <p style="font-size: 14px; color: #94A3B8;">Use Right Arrow ➔ or Spacebar to navigate</p>
        </div>

        <!-- Slide 2: Empathy & Environmental Friction -->
        <div class="slide" id="slide-2">
            <h1>The Reality of the Last Mile</h1>
            <h2>Empathy & Situational Friction</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
                <div class="card" style="border-top: 4px solid var(--fa-dark-blue);">
                    <h3 style="color: var(--fa-dark-blue); font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">🚶‍♂️ The FSR's Reality</h3>
                    <p style="font-size: 22px; font-weight: 500; color: var(--text-main); font-style: italic; line-height: 1.4;">"25 outlets left. 40°C outside. Target pressure is high. Manager is asking for updates.</p>
                    <p style="font-size: 18px; font-weight: 700; color: var(--fa-light-blue);">What do I pitch here so I can get the order and leave?"</p>
                </div>
                <div class="card" style="border-top: 4px solid var(--fa-dark-blue);">
                    <h3 style="color: var(--fa-dark-blue); font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">🏪 The Retailer's Reality</h3>
                    <p style="font-size: 22px; font-weight: 500; color: var(--text-main); font-style: italic; line-height: 1.4;">"Footfall is dropping. Zepto/Blinkit are eating my margins. Stock is piling up.</p>
                    <p style="font-size: 18px; font-weight: 700; color: var(--fa-light-blue);">I do not have the mental space for a long sales pitch right now."</p>
                </div>
            </div>
            <div style="background: #e6f6fd; border: 1px solid #BAE6FD; padding: 24px; border-radius: 12px; text-align: center;">
                <h3 style="margin: 0; color: var(--fa-dark-blue);">The Real Constraint is Time</h3>
                <p style="margin: 8px 0 0 0; font-size: 16px;">In this chaotic environment, an FSR has a maximum of <strong>3 minutes</strong> to make an impact. Complex data dashboards completely fail here.</p>
            </div>
        </div>

        <!-- Slide 3: Problem Decomposition -->
        <div class="slide" id="slide-3">
            <h1>Why Demand Opportunities Are Lost</h1>
            <h2>The Information Disconnect at the Point of Sale</h2>
            <p style="text-align: center; font-size: 18px; max-width: 800px; margin: 0 auto 30px auto;">Macro-forecasts fail to convert into micro-actions because the intelligence breaks down before reaching the shelf.</p>
            <div class="flow-container">
                <div class="flow-node">
                    <div class="flow-node-title">🏢 The Brand</div>
                    <div class="flow-node-desc">Generates national/regional macro demand forecasts. Struggles to translate data into outlet-level actions.</div>
                </div>
                <div class="flow-arrow"><div class="broken-line"></div><div>Lost Data</div></div>
                <div style="flex: 1.5; display: flex; flex-direction: column; gap: 20px;">
                    <div class="flow-node" style="border-color: #ef4444; background: #FEF2F2;">
                        <div class="flow-node-title" style="color: #ef4444;">💻 The System (Status Quo)</div>
                        <div class="flow-node-desc">Highly transactional. Captures orders perfectly but offers <strong>limited proactive guidance</strong> during the visit.</div>
                    </div>
                    <div class="flow-node">
                        <div class="flow-node-title">🚶‍♂️ The Rep</div>
                        <div class="flow-node-desc">Overwhelmed and fatigued. Defaults to muscle-memory staples and misses narrow opportunity windows.</div>
                    </div>
                </div>
                <div class="flow-arrow"><div class="broken-line"></div><div>Lost Pitch</div></div>
                <div class="flow-node">
                    <div class="flow-node-title">🏪 The Retailer</div>
                    <div class="flow-node-desc">Lacks macro-insights. Makes blind inventory decisions based solely on gut-feel and visible shelf space.</div>
                </div>
            </div>
        </div>

        <!-- Slide 4: Opportunity Mapping -->
        <div class="slide" id="slide-4">
            <h1>The Execution Loop</h1>
            <h2>Where Can Product Intervene?</h2>
            <p style="font-size: 18px; margin-bottom: 20px;">To solve the disconnect, the product must answer the exact questions an FSR asks in real-time.</p>
            <div class="loop-container">
                <div class="loop-step"><div class="step-number">1</div><div class="step-q">Which outlet should I prioritize today?</div><div class="step-solve">Route Prioritization</div><div class="loop-arrow">➔</div></div>
                <div class="loop-step"><div class="step-number">2</div><div class="step-q">Why does this specific outlet matter?</div><div class="step-solve">Context & Pitching</div><div class="loop-arrow">➔</div></div>
                <div class="loop-step"><div class="step-number">3</div><div class="step-q">How do I convert this opportunity quickly?</div><div class="step-solve">Scheme Optimization</div><div class="loop-arrow">➔</div></div>
                <div class="loop-step"><div class="step-number">4</div><div class="step-q">What should the system learn if they say no?</div><div class="step-solve">Post-Visit Intelligence</div></div>
            </div>
            <div style="width: 100%; display: flex; justify-content: center; margin-top: 20px;">
                <svg width="600" height="40" viewBox="0 0 600 40" fill="none"><path d="M 550 0 Q 550 30 300 30 Q 50 30 50 0" stroke="#009FE3" stroke-width="2" stroke-dasharray="6 6" fill="none" /><path d="M 45 5 L 50 0 L 55 5" stroke="#009FE3" stroke-width="2" fill="none" /></svg>
            </div>
            <p style="text-align: center; color: var(--fa-light-blue); font-weight: 700; font-size: 14px; margin-top: -15px;">System refines priority for tomorrow based on today's learning</p>
        </div>

        <!-- Slide 5: Strategic Choices -->
        <div class="slide" id="slide-5">
            <h1>Protecting the Rep: Strategic Trade-offs</h1>
            <h2>Designing for Human Relief, Not Just Feature Parity</h2>
            <div class="grid-2-even">
                <div class="card" style="border-top: 4px solid var(--fa-light-blue); background: #ffffff; box-shadow: 0 10px 25px -5px rgba(0, 159, 227, 0.1);">
                    <h3 style="color: var(--fa-light-blue);">What I Chose: Guided Context</h3>
                    <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 15px 0;">
                    <p style="font-size: 18px; color: var(--text-main); line-height: 1.6;">I chose to help the FSR make quick, confident decisions by feeding them simple, bite-sized bullet points. </p>
                    <p style="font-size: 18px; color: var(--text-main); line-height: 1.6;">I want the rep to feel guided—exactly like having their best Area Manager whispering the right pitch in their ear—while the system quietly handles the heavy lifting in the background.</p>
                </div>
                <div class="card" style="border-top: 4px solid #ef4444;">
                    <h3 style="color: #ef4444;">What I Deprioritized: Mid-Pitch Analytics</h3>
                    <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 15px 0;">
                    <p style="font-size: 18px; color: var(--text-main); line-height: 1.6;">I explicitly deprioritized the need for the rep to check dashboards or read long threads of information during a conversation.</p>
                    <p style="font-size: 18px; color: var(--text-main); line-height: 1.6;">No matter how impressive the analytics are, they will completely overwhelm the rep at the point of sale. I chose to provide simple information in the user's own language.</p>
                </div>
            </div>
        </div>

        <!-- Slide 6: Hero Solution Overview -->
        <div class="slide" id="slide-6">
            <h1>The Solution: An Invisible Guide for the FSR</h1>
            <h2>Empowering the Rep to Close More Deals</h2>
            <div style="text-align: center; margin-top: 40px;">
                <p style="font-size: 24px; color: var(--text-main); max-width: 800px; margin: 0 auto 40px auto; line-height: 1.5;">Instead of building another dashboard, I designed a workflow that acts as a co-pilot. It takes the burden of remembering 280+ SKUs off the rep's shoulders, allowing them to focus entirely on building relationships and closing the order.</p>
                <div style="background: #e6f6fd; border: 2px dashed var(--fa-light-blue); padding: 40px; border-radius: 16px; display: inline-block; margin-top: 20px;">
                    <h3 style="color: var(--fa-light-blue); margin-top:0; text-transform:uppercase; font-size: 16px; letter-spacing: 1px;">The Execution Framework</h3>
                    <p style="font-size: 32px; font-weight: 800; color: var(--fa-dark-blue); margin:0; letter-spacing: -0.5px;">Data ➔ Simple Context ➔ Easy Action ➔ Outcome ➔ Learning</p>
                </div>
            </div>
        </div>

        <!-- Slide 7: User Flow Step 1 -->
        <div class="slide" id="slide-7">
            <h1>Step 1: Telling the Rep Exactly Where to Start</h1>
            <h2>User Flow: Removing Decision Fatigue Before They Park</h2>
            <div class="grid-2">
                <div>
                    <h3>🎯 Removing the Guesswork</h3>
                    <p>In a 40-outlet day, reps shouldn't have to guess who is most likely to buy today. By surfacing the highest ROI stop immediately, we remove decision fatigue before they even step off their bike.</p>
                    <h3 style="margin-top: 30px;">👆 One Clear Action</h3>
                    <p>I don't want the rep hunting through menus. The system tells them exactly where to go next, allowing them to just hit "Start Visit" and walk in confidently.</p>
                </div>
                <div class="phone">
                    <div class="status-bar"><span>10:42</span><span>5G 🔋</span></div>
                    <div class="ui-app-header" style="border:none;">
                        <div style="display:flex; align-items:center; gap:6px;"><span style="font-size:20px; font-weight:700; color:var(--fa-dark-blue);">Field<span style="font-weight:400; color:var(--fa-light-blue);">Assist</span></span></div>
                        <div style="background:#F1F5F9; font-size:9px; padding:4px 8px; border-radius:12px; font-weight:700; color:#475569; display:flex; align-items:center; gap:4px;"><div style="width:6px;height:6px;background:#10B981;border-radius:50%;"></div> REP ACTIVE</div>
                    </div>
                    <div style="height:4px; background:#F1F5F9; width:100%;"></div>
                    <div class="ui-scroll">
                        <div style="margin-bottom:8px;"><h2 style="color:#0F172A; font-weight:800; font-size:20px; margin:0; letter-spacing:0;">Today's Beat</h2></div>
                        <div class="ui-card active-card" style="padding:0;">
                            <div style="padding:16px;">
                                <div style="display:flex; gap:12px;">
                                    <div style="width:40px; height:40px; background:#E2E8F0; border-radius:8px; display:flex; justify-content:center; align-items:center; position:relative; font-size:10px;"><div style="position:absolute; top:-5px; left:-5px; background:#475569; color:white; width:18px; height:18px; border-radius:50%; display:flex; justify-content:center; align-items:center; font-weight:700;">1</div>IMG</div>
                                    <div style="flex:1;">
                                        <div style="display:flex; gap:6px; margin-bottom:4px;"><span class="ui-pill ui-pill-gray">CHEMIST</span><span class="ui-pill ui-pill-blue">PRIORITY</span></div>
                                        <div style="font-weight:700; font-size:14px; color:#0F172A;">Pashan Medico</div>
                                        <div class="opp-text"><span class="opp-icon">✨</span> Hydration demand expected</div>
                                    </div>
                                </div>
                                <hr style="border:0; border-top:1px solid #F1F5F9; margin:12px 0;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <div><div class="ui-label">VALUE OPPORTUNITY</div><div class="ui-val-dark" style="font-weight:800; font-size:14px;">₹8,500</div></div>
                                    <button class="ui-btn" style="width:auto; padding:8px 16px;">✈ Start Visit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 8: User Flow Step 2 -->
        <div class="slide" id="slide-8">
            <h1>Step 2: Giving Them the Words to Win</h1>
            <h2>User Flow: Equipping the Pitch in 3 Minutes</h2>
            <div class="grid-2">
                <div>
                    <h3>ℹ️ Building Rep Confidence</h3>
                    <p>A rep won't push a product if they don't know <em>why</em> the retailer needs it. We give them the localized 'why' so they walk into the store with unshakeable confidence.</p>
                    <h3 style="margin-top: 20px;">💬 Conversational Pitch Helper</h3>
                    <p>Instead of making the rep do mental math to explain a scheme, I provided ready-to-read opening lines. It uses the exact simple language their manager would use to handle a retailer's dead-stock fears.</p>
                </div>
                <div class="phone">
                    <div class="status-bar"><span>10:45</span><span>5G 🔋</span></div>
                    <div class="ui-app-header" style="background:#F1F5F9; border-bottom:none;"><span style="font-weight:bold;">←</span> <span style="font-weight:700; font-size:14px;">Pashan Medico</span> <span style="color:transparent;">X</span></div>
                    <div style="position:relative; flex-grow:1;">
                        <div class="ui-overlay" style="align-items:flex-end; padding:0; background:rgba(0,0,0,0.5);">
                            <div class="ui-modal" style="border-radius:24px 24px 0 0; padding:24px;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                                    <h3 style="font-size:14px; margin:0; letter-spacing:0.5px; text-transform:uppercase;">Retailer Pitch Talking Points</h3>
                                    <span style="color:#94A3B8; font-size:18px; cursor: pointer;">✕</span>
                                </div>
                                <div class="ui-label" style="color:#009DE0; margin-bottom:8px;">SUGGESTED OPENER:</div>
                                <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px; font-size:13px; font-style:italic; color:#0F172A; margin-bottom:16px;">"Uncle, temperatures are spiking this week. Let's make sure you have ORS stock prepared today so you don't miss out."</div>
                                <div class="ui-label" style="color:#009DE0; margin-bottom:8px;">DEAD STOCK WORRIES:</div>
                                <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px; font-size:13px; font-style:italic; color:#0F172A; margin-bottom:16px;">"Let's start with a smaller box. If it sells out in 3 days, I'll expedite a repeat delivery."</div>
                                <button class="ui-btn">CLOSE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 9: User Flow Step 3 -->
        <div class="slide" id="slide-9">
            <h1>Step 3: Doing the Math for Them</h1>
            <h2>User Flow: Cart & Scheme Optimization</h2>
            <div class="grid-2">
                <div>
                    <h3>🧮 Removing Mental Math</h3>
                    <p>FSRs aren't human calculators. When a retailer asks, <em>"What do I get if I buy 2 more?"</em>, the rep shouldn't have to pause, pull out a calculator, or fumble through a printed scheme sheet.</p>
                    <h3 style="margin-top: 20px;">🎁 Auto-Applying Best Outcomes</h3>
                    <p>I designed the cart to automatically calculate "buy more, get more" incentives directly in the order summary. By visually flagging when a retailer is close to a higher margin bracket, the system helps the rep upsell effortlessly and look like an expert.</p>
                </div>
                <!-- Prototype Replica: Cart -->
                <div class="phone">
                    <div class="status-bar"><span>10:48</span><span>5G 🔋</span></div>
                    <div class="ui-app-header">
                        <span style="font-weight:bold;">←</span> <span style="font-weight:700; font-size:14px;">Order Summary</span> <span></span>
                    </div>
                    <div class="ui-scroll" style="background:#F1F5F9;">
                        <!-- Cart Item -->
                        <div style="background:#fff; padding:16px; border-radius:12px; border:1px solid #E2E8F0;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                                <div style="font-weight:700; font-size:14px; color:#0F172A;">Electral 50g Sachet Box</div>
                                <div style="font-weight:800; font-size:14px; color:var(--fa-dark-blue);">₹1,800</div>
                            </div>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="font-size:12px; color:#64748B;">Qty: 9 Boxes</div>
                                <div style="display:flex; gap:8px; align-items:center;">
                                    <div style="width:24px; height:24px; background:#E2E8F0; border-radius:4px; display:flex; align-items:center; justify-content:center; font-weight:bold;">-</div>
                                    <div style="font-weight:700;">9</div>
                                    <div style="width:24px; height:24px; background:var(--fa-light-blue); color:white; border-radius:4px; display:flex; align-items:center; justify-content:center; font-weight:bold;">+</div>
                                </div>
                            </div>
                        </div>

                        <!-- Scheme Nudge -->
                        <div style="background:#E0F2FE; border:1px dashed #0284C7; padding:16px; border-radius:12px;">
                            <div style="display:flex; gap:8px; margin-bottom:8px;">
                                <span>✨</span> <div style="font-size:13px; font-weight:700; color:#0284C7;">SCHEME ALERT</div>
                            </div>
                            <p style="font-size:13px; color:#0F172A; margin:0 0 12px 0;">Add <strong>1 more box</strong> of Electral to unlock 1 Free Box (Increases margin to 18%).</p>
                            <button style="background:#0284C7; color:white; border:none; padding:8px 12px; border-radius:6px; font-size:12px; font-weight:700; width:100%;">+ Add 1 Box Automatically</button>
                        </div>
                        <div style="margin-top:auto;">
                            <button class="ui-btn" style="background:#10B981;">Place Order (₹1,800)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 10: User Flow Step 4 -->
        <div class="slide" id="slide-10">
            <h1>Step 4: Learning from "No" Without the Paperwork</h1>
            <h2>User Flow: Closing the Intelligence Loop</h2>
            <div class="grid-2">
                <div>
                    <h3>⚡ Zero-Friction Feedback</h3>
                    <p>If a retailer rejects the pitch, I absolutely do not want the rep filling out a 5-minute text survey. I added a simple, 1-click reason tag.</p>
                    <h3 style="margin-top: 20px;">🛡️ Protecting Tomorrow's Route</h3>
                    <p>This isn't just about feeding data to management; it's about protecting the rep's time tomorrow. By capturing this 1-second feedback, the system learns and won't force the rep to blindly pitch the same rejected product next week.</p>
                </div>
                <!-- Prototype Replica: Feedback -->
                <div class="phone">
                    <div class="status-bar"><span>10:52</span><span>5G 🔋</span></div>
                    <div class="ui-app-header" style="background:#F1F5F9; border-bottom:none;"><span style="font-weight:bold;">←</span> <span style="font-weight:700; font-size:14px;">End Visit</span> <span style="color:transparent;">X</span></div>
                    <div style="position:relative; flex-grow:1; background:#F1F5F9;">
                        <div class="ui-overlay" style="align-items:flex-end; padding:0; background:rgba(0,0,0,0.4);">
                            <div class="ui-modal" style="border-radius:24px 24px 0 0; padding:24px;">
                                <h3 style="font-size:16px; margin:0 0 8px 0; color:#0F172A;">Opportunity Missed</h3>
                                <p style="font-size:13px; color:#64748B; margin-bottom:16px;">The recommended 'Hydration' items weren't ordered. Help us improve tomorrow's pitch.</p>
                                <div class="ui-label" style="color:#009DE0; margin-bottom:12px;">WHY DID THE RETAILER SAY NO?</div>
                                <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
                                    <div style="padding:8px 12px; border:1px solid #CBD5E1; border-radius:20px; font-size:12px; color:#475569; font-weight:500; cursor:pointer;">Has Existing Stock</div>
                                    <div style="padding:8px 12px; background:#E0F2FE; border:1px solid #0284C7; border-radius:20px; font-size:12px; color:#0284C7; font-weight:700; cursor:pointer;">Competitor Scheme Better</div>
                                    <div style="padding:8px 12px; border:1px solid #CBD5E1; border-radius:20px; font-size:12px; color:#475569; font-weight:500; cursor:pointer;">No Local Demand</div>
                                    <div style="padding:8px 12px; border:1px solid #CBD5E1; border-radius:20px; font-size:12px; color:#475569; font-weight:500; cursor:pointer;">Credit Limit Reached</div>
                                </div>
                                <button class="ui-btn">SAVE & COMPLETE VISIT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 11: Success Metrics -->
        <div class="slide" id="slide-11">
            <h1>Measuring Real Impact, Not Just Clicks</h1>
            <h2>How We Validate the Execution Loop</h2>
            
            <div class="grid-2-even" style="margin-top: 40px; align-items: start;">
                <div class="card" style="background: var(--fa-dark-blue); color: white; border: none;">
                    <h3 style="color: white; margin-bottom: 8px;">The North Star Metric</h3>
                    <p style="font-size: 24px; font-weight: 800; color: #BAE6FD; margin-bottom: 12px;">Out-of-Stock (OOS) Reduction</p>
                    <p style="color: #E2E8F0; font-size: 15px;">The decrease in stockout incidents for system-flagged priority SKUs.</p>
                    <p style="color: #E2E8F0; font-size: 14px; margin-top:10px; font-style: italic;">Proof that the product is actually on the shelf when the consumer wants it.</p>
                    
                    <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.2); margin: 24px 0;">
                    
                    <h3 style="color: white; margin-bottom: 8px;">The Success Metric</h3>
                    <p style="font-size: 20px; font-weight: 700; color: #BAE6FD; margin-bottom: 12px;">Target SKU Strike Rate</p>
                    <p style="color: #E2E8F0; font-size: 15px;">The percentage of visits where the system-recommended item was successfully converted into a billed line item.</p>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    <div class="card" style="padding: 24px; border-left: 4px solid var(--fa-light-blue);">
                        <h3 style="margin: 0 0 12px 0;">Adoption Metrics (Action at the Cart)</h3>
                        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">Measuring adoption exclusively on the Order Booking screen, where the transaction happens.</p>
                        
                        <div style="margin-bottom: 12px;">
                            <span style="font-weight: 700; color: var(--text-main); font-size: 15px;">1. Recommendation Add Rate</span>
                            <p style="font-size: 13px; margin: 4px 0 0 0;">How often the flagged SKU is successfully added to the cart.</p>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <span style="font-weight: 700; color: var(--text-main); font-size: 15px;">2. Scheme Nudge Usage</span>
                            <p style="font-size: 13px; margin: 4px 0 0 0;">How often the 1-click "+ Add Box" optimization is utilized.</p>
                        </div>
                        
                        <div>
                            <span style="font-weight: 700; color: var(--text-main); font-size: 15px;">3. Feedback Capture Rate</span>
                            <p style="font-size: 13px; margin: 4px 0 0 0;">How often a rejected recommendation receives a 1-click reason tag.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 12: Thank You -->
        <div class="slide title-slide" id="slide-12">
            <img src="https://cdn.brandfetch.io/fieldassist.com/logo" alt="FieldAssist Logo" style="height: 60px; max-width: 300px; object-fit: contain; margin-bottom: 30px;">
            <h1>Thank You</h1>
            <h2 style="margin-bottom: 10px;">Ready to build products that champion the Field Sales Rep.</h2>
        </div>

    </div>

    <script>
        const slides = document.querySelectorAll('.slide');
        const header = document.getElementById('global-header');
        const pageCounter = document.getElementById('current-page');
        let currentSlide = 0;

        function updateSlide() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentSlide) slide.classList.add('active');
            });
            
            if (currentSlide === 0 || currentSlide === slides.length - 1) {
                header.style.display = 'none'; // Hide header on first and last slide
            } else {
                header.style.display = 'flex';
                pageCounter.textContent = currentSlide + 1;
            }
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                if (currentSlide < slides.length - 1) { currentSlide++; updateSlide(); }
            } else if (e.key === 'ArrowLeft') {
                if (currentSlide > 0) { currentSlide--; updateSlide(); }
            }
        });

        document.getElementById('deck-container').addEventListener('click', (e) => {
            // Prevent clicking inside the phone UI OR specific links from triggering a slide change
            if(e.target.closest('.phone') || e.target.closest('a')) return; 
            
            const width = window.innerWidth;
            if (e.clientX > width / 2) {
                if (currentSlide < slides.length - 1) { currentSlide++; updateSlide(); }
            } else {
                if (currentSlide > 0) { currentSlide--; updateSlide(); }
            }
        });

        updateSlide();
    </script>
</body>
</html>
