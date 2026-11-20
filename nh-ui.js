/* AuraScale owner portal UI (design v3) - built from the approved demo, wired to live data */
(function(){
'use strict';
var CSS=":host{\n  --deep:#0A6B4B;--brand:#1BB880;--mint:#7CE6BC;\n  --bg:#F4F7F5;--surface:#FFFFFF;--surface-2:#F0F4F2;--surface-3:#E5ECE8;\n  --border:#E0E8E3;--border-strong:#C9D5CF;\n  --text:#0E1A15;--text-2:#40514A;--text-3:#5B6B64;\n  --primary:#0A6B4B;--primary-hover:#08583E;--on-primary:#FFFFFF;\n  --accent-soft:#E2F5EC;--accent-text:#075A3E;\n  --free-bg:#E8F8F0;--free-bd:#8FD6B7;--free-tx:#075A3E;\n  --occ-bg:#EDF2FC;--occ-bd:#B4C6EC;--occ-tx:#23407C;\n  --cln-bg:#FFF5E1;--cln-bd:#EDC77C;--cln-tx:#7A4E08;\n  --res-bg:#F2EDFC;--res-bd:#C9B8EF;--res-tx:#4F3291;\n  --danger:#B42318;--danger-bg:#FDECEA;--warn:#7A5300;--warn-bg:#FFF3D6;\n  --ok:#075A3E;--ok-bg:#E2F5EC;--info:#23407C;--info-bg:#EAF0FB;\n  --sb-bg:#05271B;--sb-tx:#C6E4D7;--sb-mut:#8DB8A6;\n  --shadow-sm:0 1px 2px rgba(12,30,22,.05);\n  --shadow:0 1px 2px rgba(12,30,22,.05),0 10px 28px -10px rgba(12,30,22,.14);\n  --shadow-lg:0 30px 70px -16px rgba(5,25,17,.35);\n  --r:14px;--r-lg:20px;\n  --font:\"Inter\",\"Hind Siliguri\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;\n}\n:host([data-theme=dark]){\n  --bg:#08100D;--surface:#0F1814;--surface-2:#14201B;--surface-3:#1B2A24;\n  --border:#1F2F28;--border-strong:#2D4239;\n  --text:#E6F0EB;--text-2:#AFC1B9;--text-3:#91A49B;\n  --primary:#1BB880;--primary-hover:#30C990;--on-primary:#03261A;\n  --accent-soft:#0F2D22;--accent-text:#7CE6BC;\n  --free-bg:#0D271D;--free-bd:#1E5A42;--free-tx:#7CE6BC;\n  --occ-bg:#121D35;--occ-bd:#2A4373;--occ-tx:#AFC6F6;\n  --cln-bg:#271D0D;--cln-bd:#684B16;--cln-tx:#F3C66E;\n  --res-bg:#1F1832;--res-bd:#47367C;--res-tx:#CDBBF8;\n  --danger:#FF8F84;--danger-bg:#371512;--warn:#F3C66E;--warn-bg:#2B210E;\n  --ok:#7CE6BC;--ok-bg:#0F2D22;--info:#AFC6F6;--info-bg:#141F37;\n  --sb-bg:#06140F;--sb-tx:#BFDCCF;--sb-mut:#7FA595;\n  --shadow-sm:none;--shadow:0 10px 30px -12px rgba(0,0,0,.6);--shadow-lg:0 30px 70px -16px rgba(0,0,0,.7);\n}\n*{box-sizing:border-box}\n[hidden]{display:none!important}\n:host{-webkit-text-size-adjust:100%;color-scheme:light}\n:host([data-theme=dark]){color-scheme:dark}\n:host{margin:0;background:var(--bg);color:var(--text);font-family:var(--font);font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}\n:host([lang=bn]){font-family:\"Hind Siliguri\",\"Inter\",system-ui,sans-serif;font-size:16px;line-height:1.55}\n:host(.locked){overflow:hidden}\nbutton{font:inherit;color:inherit}\nh1,h2,h3,p{margin:0}\na{color:inherit}\n.ic{flex:none;display:block}\n:focus-visible{outline:3px solid var(--brand);outline-offset:2px}\n.num,.tnum{font-variant-numeric:tabular-nums}\n.latin{font-family:\"Inter\",system-ui,sans-serif}\n.skip{position:absolute;left:-9999px;top:8px;z-index:200;background:var(--surface);padding:12px 16px;border-radius:10px}\n.skip:focus{left:12px}\n.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}\n.app{display:grid;grid-template-columns:256px minmax(0,1fr);min-height:100vh}\n.sidebar{position:sticky;top:0;height:100vh;background:var(--sb-bg);color:var(--sb-tx);display:flex;flex-direction:column;gap:20px;padding:22px 14px 18px;overflow-y:auto}\n.brand{display:flex;align-items:center;gap:11px;padding:2px 8px}\n.logo{width:36px;height:36px;border-radius:11px;background:var(--brand);display:grid;place-items:center;flex:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.15)}\n.logo i{width:14px;height:14px;border-radius:50%;border:3px solid #fff;display:block}\n.wm{font-family:\"Inter\",sans-serif;font-weight:700;font-size:19px;letter-spacing:-.025em;color:#fff;line-height:1.1}\n.wm span{color:var(--mint)}\n.wm-sub{font-size:12px;color:var(--sb-mut);margin-top:2px;line-height:1.3}\n.sb-nav{display:flex;flex-direction:column;gap:4px}\n.sb-item{display:flex;align-items:center;gap:12px;width:100%;min-height:48px;padding:0 12px;border:0;background:none;border-radius:12px;cursor:pointer;color:var(--sb-tx);font-weight:500;text-align:left;transition:background .15s,color .15s}\n.sb-item:hover{background:rgba(255,255,255,.06);color:#fff}\n.sb-item.on{background:rgba(124,230,188,.13);color:#fff}\n.sb-item.on .ic{color:var(--mint)}\n.sb-badge{margin-left:auto;min-width:22px;height:22px;padding:0 7px;border-radius:99px;background:#E5484D;color:#fff;font-size:12px;font-weight:700;display:grid;place-items:center}\n.sb-label{font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--sb-mut);padding:0 12px;font-weight:600}\n.sb-foot{margin-top:auto;display:flex;flex-direction:column;gap:12px}\n.home-card{border-radius:14px;background:rgba(255,255,255,.05);padding:12px;display:flex;gap:10px;align-items:center}\n.home-card b{display:block;color:#fff;font-size:14px;line-height:1.3;font-weight:600}\n.home-card span{font-size:12.5px;color:var(--sb-mut)}\n.sb-note{font-size:11.5px;color:var(--sb-mut);padding:0 8px;line-height:1.4}\n.main-col{min-width:0;display:flex;flex-direction:column}\n.appbar{position:sticky;top:0;z-index:20;min-height:64px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 32px;background:color-mix(in srgb,var(--bg) 82%,transparent);-webkit-backdrop-filter:saturate(1.4) blur(12px);backdrop-filter:saturate(1.4) blur(12px);border-bottom:1px solid var(--border)}\n.ab-brand{display:none;align-items:center;gap:10px}\n.ab-ctx b{display:block;font-weight:600;font-size:14.5px}\n.ab-ctx span{font-size:13px;color:var(--text-3)}\n.ab-right{display:flex;align-items:center;gap:8px}\n.iconbtn{width:44px;height:44px;border-radius:12px;border:1px solid var(--border);background:var(--surface);display:grid;place-items:center;cursor:pointer;color:var(--text-2);transition:background .15s}\n.iconbtn:hover{background:var(--surface-2);color:var(--text)}\n.langbtn{width:auto;padding:0 12px;font-weight:700;font-size:14px;display:flex;gap:6px;align-items:center}\n.avatar{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-weight:700;font-size:15px;flex:none;background:var(--accent-soft);color:var(--accent-text)}\n.avatar.lg{width:52px;height:52px;border-radius:16px;font-size:19px}\n.av-1{background:#E2F5EC;color:#075A3E}\n.av-2{background:#EAF0FB;color:#23407C}\n.av-3{background:#FFF3D6;color:#7A5300}\n.av-4{background:#F2EDFC;color:#4F3291}\n.av-5{background:#FDECEA;color:#9A2A1F}\n:host([data-theme=dark]) .av-1{background:#0F2D22;color:#7CE6BC}\n:host([data-theme=dark]) .av-2{background:#141F37;color:#AFC6F6}\n:host([data-theme=dark]) .av-3{background:#2B210E;color:#F3C66E}\n:host([data-theme=dark]) .av-4{background:#1F1832;color:#CDBBF8}\n:host([data-theme=dark]) .av-5{background:#371512;color:#FF8F84}\nmain{padding:28px 32px 56px;max-width:1280px;width:100%;margin:0 auto;outline:none}\n.bottomnav{display:none}\n@media (max-width:900px){.app{grid-template-columns:1fr}\n.sidebar{display:none}\n.appbar{background:var(--sb-bg);border:0;padding:env(safe-area-inset-top) 12px 0 16px;min-height:60px;-webkit-backdrop-filter:none;backdrop-filter:none}\n.ab-ctx,.ab-avatar{display:none}\n.ab-brand{display:flex}\n.appbar .iconbtn{background:rgba(255,255,255,.08);border-color:transparent;color:#fff}\nmain{padding:18px 16px 116px}\n.bottomnav{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--surface);border-top:1px solid var(--border);padding:6px 4px calc(6px + env(safe-area-inset-bottom));box-shadow:0 -8px 24px -16px rgba(0,0,0,.25)}}\n.bn-item{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:58px;border:0;background:none;color:var(--text-3);font-size:12.5px;font-weight:600;border-radius:14px;cursor:pointer;line-height:1.2;padding:4px 2px}\n.bn-item.on{color:var(--accent-text)}\n.bn-item .pip{width:46px;height:30px;border-radius:99px;display:grid;place-items:center;transition:background .2s}\n.bn-item.on .pip{background:var(--accent-soft)}\n.bn-fab .pip{width:52px;height:52px;border-radius:18px;background:var(--primary);color:var(--on-primary);margin-top:-22px;box-shadow:0 8px 20px -6px rgba(10,107,75,.6)}\n.bn-fab{color:var(--text)}\n.ph{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:22px;flex-wrap:wrap}\n.ph h1{font-size:28px;font-weight:700;letter-spacing:-.02em;line-height:1.2}\n.ph p.sub{color:var(--text-2);margin-top:4px}\n.eyebrow{font-size:13.5px;color:var(--text-3);font-weight:500;margin-bottom:4px}\n.ph-actions{display:flex;gap:10px;flex-wrap:wrap}\n@media (max-width:600px){.ph{margin-bottom:16px}\n.ph h1{font-size:23px}\n.ph-actions{width:100%;display:grid;grid-template-columns:1fr 1fr}\n.ph-actions .btn:only-child{grid-column:1/-1}\n.ph-actions .btn{padding:0 10px;white-space:normal;text-align:center}\n.inout>span{padding:8px 10px}}\n.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 18px;border-radius:12px;border:1px solid transparent;font-weight:600;font-size:15px;cursor:pointer;transition:background .15s,border-color .15s,transform .1s;white-space:nowrap;text-decoration:none;line-height:1.2}\n:host([lang=bn]) .btn{font-size:16px}\n.btn:active{transform:scale(.98)}\n.btn-primary{background:var(--primary);color:var(--on-primary)}\n.btn-primary:hover{background:var(--primary-hover)}\n.btn-secondary{background:var(--surface);border-color:var(--border-strong);color:var(--text)}\n.btn-secondary:hover{background:var(--surface-2)}\n.btn-mint{background:var(--mint);color:#03261A}\n.btn-mint:hover{background:#94EDCA}\n.btn-ghost{background:transparent;color:var(--text-2)}\n.btn-ghost:hover{background:var(--surface-2);color:var(--text)}\n.btn-danger{background:var(--danger-bg);color:var(--danger)}\n.btn-lg{min-height:56px;border-radius:14px;font-size:16px}\n.btn-sm{min-height:44px;padding:0 14px;font-size:14px}\n:host([lang=bn]) .btn-sm{font-size:15px}\n.btn-block{width:100%}\n.btn:disabled{opacity:.45;cursor:not-allowed;transform:none}\n.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-sm);padding:20px}\n.card.flush{padding:0;overflow:hidden}\n.card-h{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px}\n.card-h h2{font-size:16px;font-weight:600;letter-spacing:-.01em}\n.card-h .meta{font-size:13px;color:var(--text-3)}\n.link{background:none;border:0;color:var(--accent-text);font-weight:600;cursor:pointer;padding:8px 6px;border-radius:8px;display:inline-flex;gap:4px;align-items:center;font-size:14px}\n.link:hover{text-decoration:underline}\n.chips{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding:2px 2px 6px;margin:0 -2px}\n.chips::-webkit-scrollbar{display:none}\n.chip{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 14px;border-radius:99px;border:1px solid var(--border-strong);background:var(--surface);font-weight:500;cursor:pointer;white-space:nowrap;font-size:14.5px;color:var(--text-2)}\n.chip:hover{border-color:var(--text-3);color:var(--text)}\n.chip[aria-pressed=true]{background:var(--text);border-color:var(--text);color:var(--bg)}\n.chip .cnt{font-size:12.5px;padding:1px 8px;border-radius:99px;background:var(--surface-3);color:var(--text-2);font-weight:600}\n.chip[aria-pressed=true] .cnt{background:color-mix(in srgb,var(--bg) 22%,transparent);color:var(--bg)}\n.dot{width:10px;height:10px;border-radius:3px;flex:none}\n.d-free{background:var(--brand)}\n.d-occ{background:#4A6FC2}\n.d-clean{background:#E0A43A}\n.d-res{background:#8A6AD8}\n.st{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 11px;border-radius:99px;font-size:13px;font-weight:600;white-space:nowrap}\n:host([lang=bn]) .st{font-size:14px}\n.st::before{content:\"\";width:7px;height:7px;border-radius:50%;background:currentColor}\n.st-paid{background:var(--ok-bg);color:var(--ok)}\n.st-partial{background:var(--info-bg);color:var(--info)}\n.st-pending{background:var(--warn-bg);color:var(--warn)}\n.st-overdue{background:var(--danger-bg);color:var(--danger)}\n.st-dis{background:var(--surface-3);color:var(--text-2)}\n.kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:16px}\n.kpi{display:flex;flex-direction:column;text-align:left;cursor:pointer;transition:border-color .15s,transform .15s,box-shadow .15s;font:inherit;color:inherit;width:100%}\n.kpi:hover{border-color:var(--border-strong);box-shadow:var(--shadow);transform:translateY(-1px)}\n.kpi-h{display:flex;gap:10px;align-items:center;color:var(--text-2);font-size:14px;font-weight:500}\n:host([lang=bn]) .kpi-h{font-size:15px}\n.kpi-ic{width:34px;height:34px;border-radius:10px;background:var(--accent-soft);color:var(--accent-text);display:grid;place-items:center;flex:none}\n.kpi-ic.red{background:var(--danger-bg);color:var(--danger)}\n.kpi-v{font-size:32px;font-weight:700;letter-spacing:-.025em;margin:14px 0 12px;line-height:1.05;font-family:\"Inter\",\"Hind Siliguri\",sans-serif;font-variant-numeric:tabular-nums}\n.kpi-v .of{font-size:18px;color:var(--text-3);font-weight:600}\n.kpi-f{font-size:13.5px;color:var(--text-2);margin-top:auto;display:flex;flex-wrap:wrap;gap:4px 12px;align-items:center}\n:host([lang=bn]) .kpi-f{font-size:14.5px}\n.segbar{display:flex;height:8px;border-radius:99px;overflow:hidden;background:var(--surface-3);gap:2px;margin-bottom:12px}\n.segbar i{display:block;height:100%}\n.inout{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;margin:14px 0 4px}\n.inout>span{border-radius:14px;background:var(--surface-2);padding:10px 12px;min-width:0}\n.inout b{display:block;font-size:28px;font-weight:700;line-height:1.1;font-family:\"Inter\",\"Hind Siliguri\",sans-serif}\n.inout>span>span{font-size:13px;flex-wrap:wrap;color:var(--text-2);display:flex;gap:4px;align-items:center}\n.legend{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13px;color:var(--text-2)}\n:host([lang=bn]) .legend{font-size:14px}\n.legend span{display:inline-flex;gap:6px;align-items:center}\n.legend b{color:var(--text);font-weight:600}\n.pillwarn{display:inline-flex;align-items:center;gap:5px;font-size:12.5px;font-weight:600;color:var(--danger);background:var(--danger-bg);padding:2px 9px;border-radius:99px}\n.grid-2{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:16px;margin-bottom:16px;align-items:start}\n.spark-wrap{position:relative;height:150px;margin:6px 0 8px}\n.spark{width:100%;height:100%;display:block;overflow:visible}\n.sp-dot{position:absolute;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:var(--surface);border:2.5px solid var(--chart)}\n.sp-dot.last{width:14px;height:14px;margin:-7px 0 0 -7px;background:var(--chart);box-shadow:0 0 0 5px color-mix(in srgb,var(--chart) 22%,transparent)}\n.sp-tip{position:absolute;transform:translate(-100%,-130%);background:var(--text);color:var(--bg);font-size:12.5px;font-weight:600;padding:4px 9px;border-radius:8px;white-space:nowrap}\n.sp-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;font-size:12px;color:var(--text-3);text-align:center}\n.sp-days b{display:block;color:var(--text-2);font-weight:600;font-size:12px}\n.sp-days .on{color:var(--accent-text)}\n.sp-days .on b{color:var(--accent-text)}\n.big-total{font-size:26px;font-weight:700;letter-spacing:-.02em;font-family:\"Inter\",\"Hind Siliguri\",sans-serif}\n.trend{display:inline-flex;align-items:center;gap:4px;font-size:13px;font-weight:600;color:var(--ok);background:var(--ok-bg);padding:3px 9px;border-radius:99px}\n.alerts{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}\n.al{display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:10px;border-radius:14px;border:0;background:none;cursor:pointer;transition:background .15s}\n.al:hover{background:var(--surface-2)}\n.al-ic{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;flex:none}\n.tone-danger .al-ic{background:var(--danger-bg);color:var(--danger)}\n.tone-warn .al-ic{background:var(--warn-bg);color:var(--warn)}\n.tone-info .al-ic{background:var(--info-bg);color:var(--info)}\n.al-t{flex:1;min-width:0}\n.al-t b{display:block;font-weight:600;font-size:14.5px;line-height:1.35}\n:host([lang=bn]) .al-t b{font-size:15.5px}\n.al-t span{font-size:13px;color:var(--text-3)}\n.al .ic.chev{color:var(--text-3)}\n.wardbars{display:flex;flex-direction:column;gap:16px}\n.wb-top{display:flex;justify-content:space-between;font-size:14px;margin-bottom:7px}\n:host([lang=bn]) .wb-top{font-size:15px}\n.wb-top b{font-weight:600}\n.wb-top span{color:var(--text-3)}\n.bar{height:10px;border-radius:99px;background:var(--surface-3);overflow:hidden}\n.bar i{display:block;height:100%;border-radius:99px;background:var(--brand)}\n.bar i.hot{background:#E0A43A}\n.plist{list-style:none;margin:0;padding:0}\n.plist li{display:flex;align-items:center;gap:12px;padding:10px 0}\n.plist li+li{border-top:1px solid var(--border)}\n.plist .pt{flex:1;min-width:0}\n.plist .pt b{display:block;font-weight:600;font-size:14.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.plist .pt span{font-size:13px;color:var(--text-3)}\n.m-ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--surface-2);color:var(--text-2);flex:none}\n.amt{font-weight:700;font-variant-numeric:tabular-nums;font-family:\"Inter\",\"Hind Siliguri\",sans-serif}\n.fictional{margin-top:8px;font-size:12.5px;color:var(--text-3);display:flex;gap:6px;align-items:center}\n@media (max-width:1180px){.kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@media (max-width:1000px){.grid-2{grid-template-columns:minmax(0,1fr)}}\n@media (max-width:600px){.kpis{gap:10px;margin-bottom:10px}\n.kpi{padding:14px}\n.kpi-v{font-size:25px;margin:10px 0}\n.kpi-v .of{font-size:15px}\n.kpi.span-m{grid-column:span 2}\n.kpi-h{font-size:13.5px;gap:8px}\n.kpi-ic{width:30px;height:30px}\n.inout b{font-size:22px}\n.grid-2{gap:10px;margin-bottom:10px}\n.card{padding:16px;border-radius:18px}}\n.legend-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}\n.ward{margin-bottom:26px}\n.ward-h{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:12px}\n.ward-h h2{font-size:17px;font-weight:600}\n.ward-h span{font-size:13.5px;color:var(--text-3)}\n.bedgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(156px,1fr));gap:12px}\n.bed{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-height:118px;padding:12px 13px;border-radius:16px;border:1.5px solid;text-align:left;cursor:pointer;transition:transform .15s,box-shadow .15s;font:inherit;width:100%}\n.bed:hover{transform:translateY(-2px);box-shadow:var(--shadow)}\n.bed-top{display:flex;justify-content:space-between;align-items:center;gap:6px}\n.bed-no{font-family:\"Inter\",sans-serif;font-weight:700;font-size:18px;letter-spacing:-.01em}\n.bed-st{font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;gap:4px}\n:host([lang=bn]) .bed-st{font-size:13.5px}\n.bed-name{display:block;font-weight:600;font-size:14.5px;color:var(--text);line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.bed-meta{display:block;font-size:12.5px;color:var(--text-2)}\n.s-free{background:var(--free-bg);border-color:var(--free-bd);border-style:dashed;color:var(--free-tx)}\n.s-occ{background:var(--occ-bg);border-color:var(--occ-bd);color:var(--occ-tx)}\n.s-clean{background:var(--cln-bg);border-color:var(--cln-bd);color:var(--cln-tx)}\n.s-res{background:var(--res-bg);border-color:var(--res-bd);color:var(--res-tx)}\n.s-free .bed-cta{font-weight:600;font-size:14px;display:inline-flex;gap:4px;align-items:center}\n.due-flag{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:700;color:var(--danger);background:var(--surface);border-radius:99px;padding:1px 7px;margin-top:4px}\n@media (max-width:600px){.bedgrid{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}\n.bed{min-height:100px;padding:10px;border-radius:14px;gap:6px}\n.bed-no{font-size:16px}\n.bed-st .lbl{display:none}\n.bed-name{font-size:13.5px}\n.s-free .bed-cta{font-size:13px}\n.legend-bar{flex-wrap:nowrap;overflow-x:auto;margin:0 -16px 16px;padding:0 16px 4px;scrollbar-width:none}}\n.sumrow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:16px}\n.sum{padding:16px 18px}\n.sum span{font-size:13.5px;color:var(--text-3);display:block}\n:host([lang=bn]) .sum span{font-size:14.5px}\n.sum b{font-size:24px;font-weight:700;letter-spacing:-.02em;font-family:\"Inter\",\"Hind Siliguri\",sans-serif}\n.sum.due b{color:var(--danger)}\n.toolbar{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:14px}\n.search{position:relative;flex:1;min-width:240px;max-width:420px}\n.search .ic{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text-3)}\n.search input{padding-left:44px}\n.bill-head,.bill{display:grid;grid-template-columns:minmax(0,2.3fr) repeat(3,minmax(0,1fr)) 150px 196px;align-items:center;gap:16px;padding:12px 18px}\n.bill-head{font-size:12.5px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;background:var(--surface-2);padding:12px 18px}\n:host([lang=bn]) .bill-head{text-transform:none;letter-spacing:0;font-size:14px}\n.bill-head .r,.bill .num{text-align:right}\n.bill{border-top:1px solid var(--border);transition:background .15s}\n.bill:hover{background:color-mix(in srgb,var(--surface-2) 55%,transparent)}\n.person{display:flex;align-items:center;gap:12px;border:0;background:none;text-align:left;cursor:pointer;padding:4px;margin:-4px;border-radius:12px;min-width:0;font:inherit;color:inherit}\n.person .pn{min-width:0}\n.person b{display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.person span{font-size:13px;color:var(--text-3)}\n.bill .num{font-weight:600;font-family:\"Inter\",\"Hind Siliguri\",sans-serif}\n.bill .num.due{color:var(--danger)}\n.bill .num.zero{color:var(--text-3)}\n.lbl-m{display:none}\n.bill .act .btn{width:100%}\n@media (max-width:900px){.bill-head{display:none}\n.bill{grid-template-columns:repeat(3,minmax(0,1fr));grid-template-areas:\"p p s\" \"a b c\" \"x x x\";gap:12px;padding:16px}\n.bill .person{grid-area:p}\n.bill .st{grid-area:s;justify-self:end}\n.bill .n1{grid-area:a}\n.bill .n2{grid-area:b}\n.bill .n3{grid-area:c}\n.bill .act{grid-area:x}\n.bill .num{text-align:left;background:var(--surface-2);border-radius:12px;padding:8px 10px}\n.lbl-m{display:block;font-size:12px;color:var(--text-3);font-weight:500;font-family:var(--font)}\n:host([lang=bn]) .lbl-m{font-size:13px}\n.sumrow{gap:8px}\n.sum{padding:12px}\n.sum b{font-size:18px}\n.sum span{font-size:12.5px}\n.search{max-width:none;min-width:0;flex-basis:100%}}\n.empty{text-align:center;padding:52px 20px;display:flex;flex-direction:column;align-items:center;gap:10px}\n.empty .eic{width:68px;height:68px;border-radius:22px;background:var(--surface-2);display:grid;place-items:center;color:var(--text-3);margin-bottom:6px}\n.empty h3{font-size:17px;font-weight:600}\n.empty p{color:var(--text-2);max-width:340px}\n.comp-sum{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:16px}\n.cs{display:flex;gap:12px;align-items:center;padding:16px}\n.cs .al-ic{width:44px;height:44px}\n.cs b{font-size:24px;font-weight:700;display:block;line-height:1.1}\n.cs span{font-size:13.5px;color:var(--text-2)}\n.tl-wrap{overflow-x:auto;margin:0 -4px;padding:0 4px 4px}\n.tl{display:grid;grid-template-columns:repeat(12,minmax(64px,1fr));gap:6px;min-width:780px}\n.tl-m{min-height:96px;border-radius:12px;background:var(--surface-2);padding:8px;display:flex;flex-direction:column;gap:6px}\n.tl-m.now{background:var(--accent-soft)}\n.tl-m small{font-size:12px;color:var(--text-3);font-weight:600}\n.tl-m.now small{color:var(--accent-text)}\n.tl-ev{font-size:11.5px;font-weight:600;line-height:1.25;padding:4px 6px;border-radius:7px;border:0;text-align:left;cursor:pointer;font-family:inherit}\n:host([lang=bn]) .tl-ev{font-size:12.5px}\n.ev-danger{background:var(--danger-bg);color:var(--danger)}\n.ev-warn{background:var(--warn-bg);color:var(--warn)}\n.ev-ok{background:var(--surface);color:var(--text-2);box-shadow:inset 0 0 0 1px var(--border)}\n.lics{display:flex;flex-direction:column;gap:12px;margin-top:16px}\n.lic{display:grid;grid-template-columns:100px minmax(0,1fr) auto;gap:20px;align-items:center;padding:18px;scroll-margin-top:90px}\n.lic-days{width:100px;height:100px;border-radius:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}\n.lic-days b{font-size:32px;font-weight:700;line-height:1;font-family:\"Inter\",\"Hind Siliguri\",sans-serif}\n.lic-days span{font-size:12.5px;font-weight:600;margin-top:4px}\n.t-danger .lic-days{background:var(--danger-bg);color:var(--danger)}\n.t-warn .lic-days{background:var(--warn-bg);color:var(--warn)}\n.t-ok .lic-days{background:var(--ok-bg);color:var(--ok)}\n.lic h3{font-size:16.5px;font-weight:600;display:flex;gap:8px;align-items:center;flex-wrap:wrap}\n.lic .meta{font-size:13.5px;color:var(--text-3);margin-top:2px}\n.lic .exp{font-size:14px;color:var(--text-2);margin-top:6px;display:flex;gap:6px;align-items:center}\n.rem{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:12px}\n.rem>span{font-size:13px;color:var(--text-3);display:inline-flex;gap:5px;align-items:center;margin-right:4px}\n.rem .chip{min-height:40px;padding:0 12px;font-size:13.5px}\n.lic-act{display:flex;flex-direction:column;gap:8px}\n@media (max-width:700px){.lic{grid-template-columns:76px minmax(0,1fr);gap:14px;padding:16px}\n.lic-days{width:76px;height:76px;border-radius:20px}\n.lic-days b{font-size:24px}\n.lic-days span{font-size:11.5px}\n.lic-act{grid-column:1/-1}\n.comp-sum{gap:8px}\n.cs{flex-direction:column;align-items:flex-start;padding:12px;gap:8px}\n.cs .al-ic{width:36px;height:36px}\n.cs b{font-size:20px}}\n.scrim{position:fixed;inset:0;background:rgba(4,18,12,.45);opacity:0;pointer-events:none;transition:opacity .22s;z-index:45}\n.scrim.open{opacity:1;pointer-events:auto}\n.drawer{position:fixed;top:0;right:0;bottom:0;width:min(500px,100%);background:var(--surface);z-index:50;display:flex;flex-direction:column;box-shadow:var(--shadow-lg);transform:translateX(104%);transition:transform .3s cubic-bezier(.2,.8,.2,1);border-left:1px solid var(--border)}\n.drawer.open{transform:none}\n.handle{display:none;width:44px;height:5px;border-radius:99px;background:var(--border-strong);margin:8px auto 0}\n.dr-h{display:flex;gap:14px;align-items:center;padding:20px 20px 16px;border-bottom:1px solid var(--border)}\n.dr-h .tt{flex:1;min-width:0}\n.dr-h h2{font-size:20px;font-weight:700;letter-spacing:-.01em;line-height:1.25}\n.dr-h p{font-size:14px;color:var(--text-2);margin-top:2px}\n.dr-body{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:24px;overscroll-behavior:contain}\n.dr-f{padding:12px 20px calc(12px + env(safe-area-inset-bottom));border-top:1px solid var(--border);display:grid;grid-template-columns:1fr 1fr;gap:10px;background:var(--surface)}\n.dr-f .full{grid-column:1/-1}\n.sec-t{font-size:13px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}\n:host([lang=bn]) .sec-t{text-transform:none;letter-spacing:0;font-size:15px;color:var(--text-2)}\n.bal{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border:1px solid var(--border);border-radius:16px;overflow:hidden}\n.bal>div{padding:14px}\n.bal>div+div{border-left:1px solid var(--border)}\n.bal .k{font-size:12.5px;color:var(--text-3)}\n:host([lang=bn]) .bal .k{font-size:13.5px}\n.bal .v{font-size:19px;font-weight:700;margin-top:2px;font-family:\"Inter\",\"Hind Siliguri\",sans-serif;font-variant-numeric:tabular-nums}\n.bal .due{background:var(--danger-bg)}\n.bal .due .v,.bal .due .k{color:var(--danger)}\n.bal .clear{background:var(--ok-bg)}\n.bal .clear .v,.bal .clear .k{color:var(--ok)}\n.info{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:0}\n.info dt{font-size:12.5px;color:var(--text-3)}\n:host([lang=bn]) .info dt{font-size:13.5px}\n.info dd{margin:2px 0 0;font-weight:600;font-size:14.5px}\n.info a{display:inline-flex;gap:6px;align-items:center;text-decoration:none;color:var(--accent-text);min-height:32px}\n.lines{list-style:none;margin:0;padding:0;border:1px solid var(--border);border-radius:16px;overflow:hidden}\n.lines li{display:flex;align-items:center;gap:12px;padding:11px 14px}\n.lines li+li{border-top:1px solid var(--border)}\n.line-ic{width:36px;height:36px;border-radius:11px;background:var(--surface-2);display:grid;place-items:center;color:var(--text-2);flex:none}\n.line-t{flex:1;min-width:0}\n.line-t b{display:block;font-weight:600;font-size:14.5px}\n.line-t span{font-size:12.5px;color:var(--text-3)}\n.lines .tot{background:var(--surface-2);font-weight:700}\n.lines .new{animation:flash 1.6s ease}\n@keyframes flash{0%{background:var(--accent-soft)}100%{background:transparent}}\n@media (max-width:700px){.drawer{top:auto;left:0;width:100%;height:92vh;height:92dvh;border-radius:24px 24px 0 0;transform:translateY(104%);border-left:0}\n.handle{display:block}\n.dr-h{padding:12px 16px 14px}\n.dr-body{padding:16px;gap:20px}\n.dr-f{padding:10px 16px calc(10px + env(safe-area-inset-bottom))}\n.bal>div{padding:12px 10px}\n.bal .v{font-size:16px}}\n.modal-wrap{position:fixed;inset:0;z-index:60;display:grid;place-items:center;padding:24px;background:rgba(4,18,12,.5);opacity:0;transition:opacity .2s}\n.modal-wrap.open{opacity:1}\n.modal{width:min(560px,100%);max-height:calc(100vh - 48px);background:var(--surface);border-radius:24px;box-shadow:var(--shadow-lg);display:flex;flex-direction:column;transform:translateY(14px) scale(.98);transition:transform .25s cubic-bezier(.2,.8,.2,1);overflow:hidden}\n.modal.wide{width:min(640px,100%)}\n.modal-wrap.open .modal{transform:none}\n.m-h{display:flex;align-items:center;gap:12px;padding:18px 20px 14px}\n.m-h .tt{flex:1;min-width:0}\n.m-h h2{font-size:19px;font-weight:700;letter-spacing:-.01em}\n.m-h p{font-size:14px;color:var(--text-2);margin-top:2px}\n.m-b{padding:4px 20px 20px;overflow-y:auto;display:flex;flex-direction:column;gap:18px;overscroll-behavior:contain}\n.m-f{padding:12px 20px calc(12px + env(safe-area-inset-bottom));border-top:1px solid var(--border);display:flex;gap:10px}\n.m-f .btn{flex:1}\n.m-f .btn.grow{flex:1.6}\n@media (max-width:700px){.modal-wrap{padding:0;place-items:end stretch}\n.modal,.modal.wide{width:100%;max-height:94vh;max-height:94dvh;border-radius:24px 24px 0 0;transform:translateY(100%)}\n.m-h{padding:14px 16px 12px}\n.m-b{padding:4px 16px 18px}\n.m-f{padding:10px 16px calc(10px + env(safe-area-inset-bottom))}}\n.steps{display:flex;gap:6px;margin:0 20px 6px}\n.steps i{flex:1;height:5px;border-radius:9px;background:var(--surface-3);transition:background .3s}\n.steps i.on{background:var(--brand)}\n.steplbl{margin:0 20px 10px;font-size:13px;color:var(--text-3);font-weight:600}\n@media (max-width:700px){.steps{margin:0 16px 6px}\n.steplbl{margin:0 16px 10px}}\n.field label,.field .lab{display:block;font-weight:600;font-size:14.5px;margin-bottom:8px}\n:host([lang=bn]) .field label,:host([lang=bn]) .field .lab{font-size:15.5px}\n.field .opt{font-weight:400;color:var(--text-3)}\n.input{width:100%;height:56px;border-radius:14px;border:1.5px solid var(--border-strong);background:var(--surface);color:var(--text);padding:0 16px;font:inherit;font-size:17px;transition:border-color .15s,box-shadow .15s}\n.input::placeholder{color:var(--text-3);opacity:.8}\n.input:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 4px color-mix(in srgb,var(--brand) 22%,transparent)}\n.input.bad{border-color:var(--danger)}\n.pre{position:relative}\n.pre>span{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--text-2);font-weight:600;font-size:17px;pointer-events:none;font-family:\"Inter\",sans-serif}\n.pre .input{padding-left:52px}\n.pre.rs .input{padding-left:38px;font-weight:700;font-size:22px;font-family:\"Inter\",sans-serif}\n.pre.rs>span{font-size:22px;left:16px}\n.err{color:var(--danger);font-size:13.5px;margin-top:6px;display:flex;gap:6px;align-items:center;font-weight:500}\n.row2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}\n.tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\n.tile{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:78px;border-radius:16px;border:1.5px solid var(--border-strong);background:var(--surface);cursor:pointer;font-weight:600;padding:8px;font-size:15px;text-align:center;line-height:1.25;transition:border-color .15s,background .15s}\n.tile:hover{border-color:var(--text-3)}\n.tile[aria-pressed=true]{border-color:var(--primary);background:var(--accent-soft);color:var(--accent-text);box-shadow:inset 0 0 0 1px var(--primary)}\n.tile.sm{min-height:56px;flex-direction:row}\n.pills{display:flex;flex-wrap:wrap;gap:8px}\n.pill{min-height:48px;padding:0 16px;border-radius:14px;border:1.5px solid var(--border-strong);background:var(--surface);cursor:pointer;font-weight:600;font-size:15px;display:inline-flex;align-items:center;gap:8px;text-align:left;line-height:1.25}\n.pill:hover{border-color:var(--text-3)}\n.pill[aria-pressed=true]{border-color:var(--primary);background:var(--accent-soft);color:var(--accent-text);box-shadow:inset 0 0 0 1px var(--primary)}\n.pill small{font-weight:500;color:var(--text-3);font-size:12.5px;display:block}\n.pill.doc{flex-direction:column;align-items:flex-start;justify-content:center;padding:8px 14px;min-height:58px;gap:0}\n.bedpick{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:8px}\n.bp{min-height:60px;border-radius:14px;border:1.5px dashed var(--free-bd);background:var(--free-bg);color:var(--free-tx);font-weight:700;cursor:pointer;font-family:\"Inter\",sans-serif;font-size:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.2}\n.bp small{font-family:var(--font);font-size:12px;font-weight:500;color:var(--text-2)}\n.bp[aria-pressed=true]{border-style:solid;border-color:var(--primary);background:var(--primary);color:var(--on-primary)}\n.bp[aria-pressed=true] small{color:var(--on-primary)}\n.wardlbl{font-size:13.5px;font-weight:600;color:var(--text-2);margin:4px 0 8px}\n.mini{display:flex;gap:12px;align-items:center;padding:12px;border-radius:16px;background:var(--surface-2)}\n.mini .tt{flex:1;min-width:0}\n.mini b{display:block;font-weight:600}\n.mini span{font-size:13.5px;color:var(--text-2)}\n.qamts{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}\n.qamts .chip{min-height:40px;font-size:14px}\n.picklist{display:flex;flex-direction:column;gap:6px}\n.pick{display:flex;gap:12px;align-items:center;padding:10px;border-radius:14px;border:1px solid var(--border);background:var(--surface);cursor:pointer;text-align:left;width:100%;min-height:64px}\n.pick:hover{background:var(--surface-2)}\n.pick .tt{flex:1;min-width:0}\n.pick b{display:block;font-weight:600}\n.pick span{font-size:13px;color:var(--text-3)}\n.check{display:flex;gap:14px;align-items:center;width:100%;min-height:58px;padding:10px 14px;border-radius:14px;border:1.5px solid var(--border-strong);background:var(--surface);cursor:pointer;text-align:left;font-weight:500}\n.check .box{width:26px;height:26px;border-radius:8px;border:2px solid var(--border-strong);display:grid;place-items:center;flex:none;color:transparent;transition:all .15s}\n.check[aria-checked=true]{border-color:var(--primary);background:var(--accent-soft)}\n.check[aria-checked=true] .box{background:var(--primary);border-color:var(--primary);color:var(--on-primary)}\n.callout{display:flex;gap:12px;padding:14px;border-radius:14px;align-items:flex-start}\n.callout.warn{background:var(--warn-bg);color:var(--warn)}\n.callout.ok{background:var(--ok-bg);color:var(--ok)}\n.callout b{display:block}\n.callout p{font-size:14px;color:inherit;opacity:.9}\n.success{text-align:center;padding:16px 0 8px;display:flex;flex-direction:column;align-items:center;gap:10px}\n.success .ring{width:84px;height:84px;border-radius:50%;background:var(--accent-soft);display:grid;place-items:center;color:var(--accent-text);animation:pop .45s cubic-bezier(.2,1.4,.4,1)}\n.success h3{font-size:20px;font-weight:700}\n.success p{color:var(--text-2)}\n@keyframes pop{0%{transform:scale(.4);opacity:0}100%{transform:scale(1);opacity:1}}\n.toasts{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:90;display:flex;flex-direction:column;gap:8px;align-items:center;width:min(460px,calc(100% - 24px));pointer-events:none}\n@media (max-width:900px){.toasts{bottom:calc(88px + env(safe-area-inset-bottom))}}\n.toast{pointer-events:auto;display:flex;align-items:center;gap:12px;padding:10px 10px 10px 14px;border-radius:16px;background:#0D1F18;color:#F1F8F4;box-shadow:var(--shadow-lg);width:100%;animation:tin .3s cubic-bezier(.2,.8,.2,1);font-weight:500;font-size:14.5px;min-height:56px}\n:host([data-theme=dark]) .toast{background:#E6F0EB;color:#0D1F18}\n.toast .tic{width:30px;height:30px;border-radius:50%;background:var(--brand);color:#03261A;display:grid;place-items:center;flex:none}\n.toast.ti-info .tic{background:#AFC6F6;color:#122}\n.toast .tm{flex:1}\n.toast button{background:none;border:0;color:var(--mint);font-weight:700;min-height:40px;padding:0 10px;cursor:pointer;border-radius:10px}\n:host([data-theme=dark]) .toast button{color:var(--deep)}\n.toast.out{animation:tout .25s forwards}\n@keyframes tin{from{transform:translateY(16px);opacity:0}to{transform:none;opacity:1}}\n@keyframes tout{to{transform:translateY(10px);opacity:0}}\n.sk{background:linear-gradient(90deg,var(--surface-2) 25%,var(--surface-3) 40%,var(--surface-2) 60%);background-size:300% 100%;animation:shim 1.25s ease-in-out infinite;border-radius:8px}\n@keyframes shim{0%{background-position:100% 0}100%{background-position:0 0}}\n.sk-t{width:140px;height:14px;margin-bottom:10px}\n.sk-h{width:260px;max-width:70vw;height:30px}\n.sk-s{width:50%;height:14px}\n.sk-v{width:60%;height:30px;margin:16px 0 14px}\n.sk-b{width:100%;height:9px}\n.sk-block{height:200px;border-radius:14px}\n.sk-tile{height:118px;border-radius:16px}\n.sk-row{height:64px;border-radius:12px;margin-bottom:8px}\n.roles{display:flex;gap:4px;padding:4px;border-radius:14px;background:var(--surface-2);border:1px solid var(--border)}\n.role{min-height:40px;padding:0 12px;border-radius:10px;border:0;background:none;cursor:pointer;font-weight:600;font-size:14px;color:var(--text-2);display:inline-flex;align-items:center;gap:6px;white-space:nowrap;transition:background .15s,color .15s}\n.role[aria-pressed=true]{background:var(--surface);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.12)}\n.role .ic{color:var(--text-3)}\n.role[aria-pressed=true] .ic{color:var(--brand)}\n@media (max-width:900px){.appbar{flex-wrap:wrap;row-gap:0}\n.appbar .roles{order:3;width:calc(100% + 28px);margin:0 -16px 0 -16px;border-radius:0;border:0;border-top:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.18);overflow-x:auto;scrollbar-width:none;padding:6px 12px}\n.appbar .roles::-webkit-scrollbar{display:none}\n.appbar .role{color:rgba(255,255,255,.75);flex:1;justify-content:center}\n.appbar .role .ic{color:inherit}\n.appbar .role[aria-pressed=true]{background:rgba(124,230,188,.16);color:#fff;box-shadow:none}\n.appbar .role[aria-pressed=true] .ic{color:var(--mint)}}\n.whoami{display:flex;align-items:center;gap:10px;padding:6px 10px;border-radius:12px;background:var(--accent-soft);color:var(--accent-text);font-size:13.5px;font-weight:600;margin-bottom:14px;width:fit-content}\n.staff-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}\n.stf{display:flex;gap:12px;align-items:center;padding:14px}\n.stf .tt{flex:1;min-width:0}\n.stf b{display:block;font-weight:600}\n.stf .meta{font-size:13px;color:var(--text-3)}\n.stf a{color:var(--accent-text);text-decoration:none;font-size:13.5px;display:inline-flex;gap:4px;align-items:center;min-height:32px}\n.shift-h{display:flex;align-items:center;gap:10px;margin:22px 0 10px}\n.shift-h h2{font-size:16px;font-weight:600}\n.shift-h span{font-size:13px;color:var(--text-3)}\n.rounds{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:14px}\n@media (max-width:600px){.rounds{grid-template-columns:minmax(0,1fr);gap:10px}}\n.rc{padding:0;overflow:hidden}\n.rc-h{display:flex;gap:12px;align-items:center;padding:14px 16px;border-bottom:1px solid var(--border)}\n.rc-h .bedno{font-family:\"Inter\",sans-serif;font-weight:700;font-size:14px;width:46px;height:46px;border-radius:13px;background:var(--surface-2);display:grid;place-items:center;flex:none}\n.rc-h .tt{flex:1;min-width:0}\n.rc-h b{display:block;font-weight:600;font-size:15.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.rc-h .meta{font-size:13px;color:var(--text-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}\n.rc-b{padding:14px 16px;display:flex;flex-direction:column;gap:14px}\n.vrow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}\n.vm{border-radius:12px;background:var(--surface-2);padding:8px 10px;min-width:0}\n.vm.ab{background:var(--danger-bg)}\n.vm small{display:block;font-size:11.5px;color:var(--text-3);font-weight:600}\n:host([lang=bn]) .vm small{font-size:12.5px}\n.vm b{display:block;font-family:\"Inter\",sans-serif;font-weight:700;font-size:16px;line-height:1.25;white-space:nowrap}\n.vm.ab b,.vm.ab small{color:var(--danger)}\n.vm svg{display:block;width:100%;height:18px;margin-top:3px}\n.doses{display:flex;flex-wrap:wrap;gap:6px}\n.dose{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:4px 12px;border-radius:12px;border:1.5px solid var(--border-strong);background:var(--surface);cursor:pointer;font-weight:600;font-size:13.5px;text-align:left;line-height:1.25}\n.dose small{display:block;font-weight:500;font-size:11.5px;color:var(--text-3);font-family:\"Inter\",sans-serif}\n.dose.due{border-color:var(--warn);background:var(--warn-bg);color:var(--warn);animation:pulse 2s ease-in-out infinite}\n.dose.due small{color:var(--warn)}\n.dose.missed{border-color:transparent;background:var(--danger-bg);color:var(--danger)}\n.dose.missed small{color:var(--danger)}\n.dose.given{border-color:transparent;background:var(--ok-bg);color:var(--ok);cursor:default}\n.dose.given small{color:var(--ok)}\n.dose.up{border-style:dashed;color:var(--text-3);cursor:default}\n@keyframes pulse{0%,100%{box-shadow:0 0 0 0 color-mix(in srgb,var(--warn) 35%,transparent)}50%{box-shadow:0 0 0 5px transparent}}\n.rc-f{display:flex;gap:8px;padding:0 16px 14px;flex-wrap:wrap}\n.rc-f .btn{flex:1;min-width:140px}\n.note{font-size:14px;color:var(--text-2);background:var(--surface-2);border-radius:12px;padding:10px 12px}\n.note span{display:block;font-size:12px;color:var(--text-3);margin-top:2px}\n.qnote{display:flex;gap:8px}\n.qnote .input{height:48px;font-size:15px}\n.ho{display:flex;flex-direction:column;gap:10px}\n.ho li{display:flex;gap:10px;align-items:flex-start}\n.ho .when{font-family:\"Inter\",sans-serif;font-size:12.5px;color:var(--text-3);width:64px;flex:none;padding-top:2px}\n.ho .tx{flex:1;border-left:2px solid var(--border);padding-left:12px;font-size:14.5px}\n.ho .tx span{display:block;font-size:12.5px;color:var(--text-3)}\n.ho .pri{color:var(--danger);font-weight:600}\ntextarea.input{height:auto;min-height:96px;padding:12px 14px;font-size:15.5px;resize:vertical;line-height:1.5}\n.advice{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:14px;background:var(--ok-bg);color:var(--ok);font-size:14px}\n.advice b{display:block}\n.rdone{display:flex;align-items:center;gap:8px;min-height:40px;padding:0 12px;border-radius:12px;border:1.5px solid var(--border-strong);background:var(--surface);cursor:pointer;font-weight:600;font-size:13.5px;flex:none}\n.rdone[aria-pressed=true]{background:var(--ok-bg);border-color:transparent;color:var(--ok)}\n.ordtabs{display:flex;gap:6px;padding:4px;background:var(--surface-2);border-radius:14px}\n.ordtabs button{flex:1;min-height:44px;border:0;border-radius:10px;background:none;cursor:pointer;font-weight:600}\n.ordtabs button[aria-pressed=true]{background:var(--surface);box-shadow:0 1px 3px rgba(0,0,0,.12)}\n.ordlist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}\n.ord{display:flex;gap:10px;align-items:center;min-height:58px;padding:8px 12px;border-radius:14px;border:1.5px solid var(--border-strong);background:var(--surface);cursor:pointer;text-align:left}\n.ord .ck{width:22px;height:22px;border-radius:7px;border:2px solid var(--border-strong);display:grid;place-items:center;flex:none;color:transparent}\n.ord[aria-pressed=true]{border-color:var(--primary);background:var(--accent-soft)}\n.ord[aria-pressed=true] .ck{background:var(--primary);border-color:var(--primary);color:var(--on-primary)}\n.ord b{display:block;font-weight:600;font-size:14px;line-height:1.25}\n.ord span{font-size:12.5px;color:var(--text-3);font-family:\"Inter\",sans-serif}\n@media (max-width:420px){.ordlist{grid-template-columns:minmax(0,1fr)}}\n.advbar{display:flex;flex-direction:column;gap:8px;margin-bottom:18px}\n.advrow{display:flex;gap:12px;align-items:center;padding:12px 14px;border-radius:16px;background:var(--ok-bg);flex-wrap:wrap}\n.advrow .tt{flex:1;min-width:180px}\n.advrow b{display:block;font-weight:600;color:var(--text)}\n.advrow span{font-size:13.5px;color:var(--text-2)}\n@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}\n:host{\n  --bg:#F4F5F7;--surface:#FFFFFF;--surface-2:#F3F4F6;--surface-3:#E5E7EB;--border:#DCDFE4;--border-strong:#C4C9D1;\n  --text:#111827;--text-2:#374151;--text-3:#5B6472;\n  --primary:#0A6B4B;--primary-hover:#085A3F;--accent-soft:#E7F3EE;--accent-text:#075A3E;\n  --sb-bg:#FFFFFF;--sb-tx:#374151;--sb-mut:#6B7280;\n  --shadow-sm:none;--shadow:0 1px 2px rgba(17,24,39,.06),0 4px 12px -6px rgba(17,24,39,.12);--shadow-lg:0 18px 50px -12px rgba(17,24,39,.28);\n  --r:8px;--r-lg:10px;\n  --font:\"IBM Plex Sans\",\"Noto Sans Bengali\",system-ui,-apple-system,\"Segoe UI\",sans-serif;\n}\n:host([data-theme=dark]){\n  --bg:#0D1117;--surface:#151B23;--surface-2:#1B222C;--surface-3:#252E3A;--border:#2A3340;--border-strong:#3A4555;\n  --text:#E6EAF0;--text-2:#B4BDC9;--text-3:#94A0AF;\n  --primary:#1BB880;--primary-hover:#30C990;--on-primary:#04261A;--accent-soft:#11261F;--accent-text:#7CE6BC;\n  --sb-bg:#11161D;--sb-tx:#C3CBD6;--sb-mut:#8A96A6;\n}\n:host,:host([lang=bn]){font-family:\"IBM Plex Sans\",\"Noto Sans Bengali\",system-ui,sans-serif}\n:host([lang=bn]){font-family:\"Noto Sans Bengali\",\"IBM Plex Sans\",system-ui,sans-serif;font-size:15.5px}\n.kpi-v,.inout b,.big-total,.sum b,.bal .v,.amt,.lic-days b,.cs b,.vm b,.bill .num,.bed-no,.latin{font-family:\"IBM Plex Sans\",\"Noto Sans Bengali\",sans-serif!important;font-variant-numeric:tabular-nums}\n.mono,.bed-no,.rc-h .bedno{font-family:\"IBM Plex Mono\",ui-monospace,monospace!important}\n.sidebar{background:var(--sb-bg);border-right:1px solid var(--border);padding:0 12px 16px;gap:16px}\n.sidebar .brand{margin:0 -12px;padding:0 20px;height:64px;background:var(--brandblock);border-radius:0}\n.sidebar .wm-sub{color:rgba(255,255,255,.7)}\n.sb-item{min-height:44px;border-radius:6px;color:var(--text-2);font-size:14.5px}\n:host([lang=bn]) .sb-item{font-size:15px}\n.sb-item:hover{background:var(--surface-2);color:var(--text)}\n.sb-item.on{background:var(--accent-soft);color:var(--accent-text);font-weight:600}\n.sb-item.on .ic{color:var(--accent-text)}\n.sb-item .ic{color:var(--text-3)}\n.sidebar .btn-mint{background:var(--primary);color:var(--on-primary);min-height:48px;border-radius:6px}\n.sidebar .btn-mint:hover{background:var(--primary-hover)}\n.home-card{background:var(--surface-2)!important;border:1px solid var(--border);border-radius:8px}\n.home-card b{color:var(--text)!important}\n.home-card span{color:var(--text-3)}\n.home-card .avatar{background:var(--accent-soft)!important;color:var(--accent-text)!important}\n.sb-note{color:var(--text-3)}\n.sb-badge{background:#C2410C;border-radius:6px}\n.appbar{background:var(--surface);border-bottom:1px solid var(--border);min-height:64px;-webkit-backdrop-filter:none;backdrop-filter:none}\n.iconbtn{border-radius:6px;width:44px;height:44px}\n.avatar{border-radius:8px}\n.roles{border-radius:8px;padding:3px;background:var(--surface-2)}\n.role{border-radius:6px;font-size:13.5px}\n.ph{border-bottom:1px solid var(--border);padding-bottom:18px;margin-bottom:22px}\n.ph h1{font-size:24px;font-weight:600;letter-spacing:-.01em}\n.eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:11.5px;font-weight:600;color:var(--text-3)}\n:host([lang=bn]) .eyebrow{text-transform:none;letter-spacing:0;font-size:13px}\n.card{border-radius:10px;box-shadow:none;border:1px solid var(--border)}\n.card-h{margin:-20px -20px 16px;padding:14px 20px;border-bottom:1px solid var(--border);background:var(--surface-2);border-radius:10px 10px 0 0}\n.card-h h2{font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text-2)}\n:host([lang=bn]) .card-h h2{text-transform:none;letter-spacing:0;font-size:15px;color:var(--text)}\n.card.flush .card-h{margin:0}\n.kpi{border-radius:10px}\n.kpi-h{font-size:12px;text-transform:uppercase;letter-spacing:.07em;font-weight:600;color:var(--text-3)}\n:host([lang=bn]) .kpi-h{text-transform:none;letter-spacing:0;font-size:14px;color:var(--text-2)}\n.kpi-ic{border-radius:6px;width:30px;height:30px}\n.kpi-v{font-size:30px;font-weight:600}\n.kpi:hover{transform:none;box-shadow:var(--shadow)}\n.inout>span{border-radius:6px}\n.segbar,.bar{border-radius:2px}\n.segbar i,.bar i{border-radius:0}\n.btn{border-radius:6px;font-weight:600}\n.btn-lg{border-radius:6px}\n.chip,.pill,.tile,.opt-b,.check,.dose,.rdone,.fp{border-radius:6px}\n.chip[aria-pressed=true]{background:var(--primary);border-color:var(--primary);color:var(--on-primary)}\n.chip[aria-pressed=true] .cnt{background:rgba(255,255,255,.2);color:inherit}\n.st{border-radius:4px;height:26px;font-size:12px;font-weight:600}\n:host([lang=bn]) .st{font-size:13px}\n.st::before{border-radius:2px}\n.input{border-radius:6px;border-width:1px;height:52px}\n.input:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--primary) 20%,transparent)}\n.bed{border-radius:8px;border-width:1px;border-style:solid;min-height:108px;box-shadow:inset 0 3px 0 0 currentColor}\n.bed:hover{transform:none;box-shadow:inset 0 3px 0 0 currentColor,var(--shadow)}\n.s-free{border-style:solid}\n.bedgrid{gap:10px}\n.legend-bar .chip{border-radius:6px}\n.bill-head{background:var(--surface-2);font-size:11.5px}\n.bill{padding:10px 18px}\n.alerts .al{border-radius:6px}\n.al-ic,.m-ic,.line-ic{border-radius:6px}\n.sum{border-radius:10px}\n.sum span{text-transform:uppercase;letter-spacing:.06em;font-size:11.5px;font-weight:600}\n:host([lang=bn]) .sum span{text-transform:none;letter-spacing:0;font-size:14px}\n.lic-days{border-radius:8px}\n.tl-m{border-radius:6px}\n.rc-h{background:var(--surface-2)}\n.rc-h .bedno{border-radius:6px;background:var(--surface);border:1px solid var(--border)}\n.vm{border-radius:6px}\n.advrow{border-radius:8px;border:1px solid color-mix(in srgb,var(--ok) 30%,transparent)}\n.advice,.note,.callout,.mini{border-radius:8px}\n.drawer{border-left:1px solid var(--border)}\n.dr-h{background:var(--surface-2)}\n.bal{border-radius:8px}\n.lines{border-radius:8px}\n.modal{border-radius:12px}\n.m-h{border-bottom:1px solid var(--border);padding-bottom:14px;margin-bottom:12px;background:var(--surface-2)}\n.toast{border-radius:8px}\n.toast .tic{border-radius:6px}\n@media (max-width:900px){.appbar{background:var(--brandblock);border:0}\n.bn-item .pip{border-radius:6px}\n.bn-fab .pip{border-radius:10px}\n.ph{padding-bottom:14px}}\n@media (max-width:700px){.drawer{border-radius:12px 12px 0 0}\n.modal,.modal.wide{border-radius:12px 12px 0 0}}\n:host{--brandblock:#0A3F2D;--chart:#1BB880}\n:host([data-theme=dark]){--brandblock:#06261B}\n.skinpop{position:fixed;top:68px;right:24px;z-index:80;width:280px;background:var(--surface);border:1px solid var(--border);border-radius:10px;box-shadow:var(--shadow-lg);padding:10px;animation:fadeUp .18s ease}\n@media (max-width:900px){.skinpop{top:64px;right:10px;left:10px;width:auto}}\n@keyframes fadeUp{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}\n.skin{display:flex;align-items:center;gap:12px;width:100%;min-height:48px;padding:6px 10px;border:0;background:none;border-radius:6px;cursor:pointer;text-align:left;font-weight:500}\n.skin:hover{background:var(--surface-2)}\n.skin[aria-pressed=true]{background:var(--accent-soft);color:var(--accent-text);font-weight:600}\n.skin .sn{flex:1}\n.sws{display:flex;flex:none}\n.sws i{width:22px;height:22px;border-radius:50%;border:2px solid var(--surface);margin-left:-7px;box-shadow:0 0 0 1px var(--border)}\n.sws i:first-child{margin-left:0}\n.msl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}\n@media (max-width:800px){.msl{grid-template-columns:minmax(0,1fr)}}\n.ms-t{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px}\n.ms-t b{font-weight:600;font-size:14.5px}\n.abrow{display:grid;grid-template-columns:auto minmax(0,1.4fr) minmax(0,1.3fr) auto;gap:14px;align-items:center;padding:12px 18px;border-top:1px solid var(--border)}\n.abrow:first-child{border-top:0}\n.abrow .tt b{display:block;font-weight:600}\n.abrow .tt span{font-size:13px;color:var(--text-3)}\n.abid{display:flex;flex-direction:column;font-size:13.5px;min-width:0}\n.abid span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n@media (max-width:700px){.abrow{grid-template-columns:auto minmax(0,1fr);gap:8px 12px;padding:14px}\n.abid{grid-column:2}\n.abact{grid-column:1/-1}\n.abact .btn{width:100%}}\n.ctxl{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:12px}\n@media (max-width:600px){.ctxl{grid-template-columns:minmax(0,1fr)}}\n.ctxc{padding:0;overflow:hidden}\n.ctx-h{display:flex;gap:12px;align-items:center;padding:12px 16px;background:var(--surface-2);border-bottom:1px solid var(--border);flex-wrap:wrap}\n.ctx-h .tt{flex:1;min-width:140px}\n.ctx-h b{display:block;font-weight:600}\n.ctx-h span{font-size:13px;color:var(--text-3)}\n.tok-id{font-weight:600;font-size:13px;padding:6px 8px;border-radius:6px;background:var(--surface);border:1px solid var(--border)}\n.ctx-items{list-style:none;margin:0;padding:6px 8px}\n.ctx-items li{display:flex;gap:12px;align-items:center;padding:8px;min-height:52px}\n.ctx-items li+li{border-top:1px solid var(--border)}\n.ctx-items .tt{flex:1;min-width:0;font-weight:500;font-size:14.5px}\n.ctx-items small{display:block;font-size:11.5px;color:var(--text-3)}\n.logl{display:flex;flex-direction:column;gap:8px}\n.logi{border:1px solid var(--border);border-radius:8px;background:var(--surface);overflow:hidden}\n.logi summary{display:grid;grid-template-columns:56px minmax(0,1fr) 48px 70px;gap:10px;align-items:center;padding:10px 12px;cursor:pointer;list-style:none;min-height:48px}\n.logi summary::-webkit-details-marker{display:none}\n.logi[open] summary{border-bottom:1px solid var(--border);background:var(--surface-2)}\n.meth{font:600 11.5px/1 \"IBM Plex Mono\",monospace;padding:5px 6px;border-radius:4px;background:var(--info-bg);color:var(--info);text-align:center}\n.path{font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.code{font-size:13px;font-weight:600;text-align:center}\n.code.ok{color:var(--ok)}\n.code.bad{color:var(--danger)}\n.lt{font-size:12px;color:var(--text-3);text-align:right}\n.logb{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;padding:12px}\n@media (max-width:800px){.logb{grid-template-columns:minmax(0,1fr)}\n.logi summary{grid-template-columns:50px minmax(0,1fr) 40px}\n.lt{display:none}}\n.logb pre{margin:6px 0 0;padding:10px;border-radius:6px;background:#0D1117;color:#C9D7E3;font:12px/1.5 \"IBM Plex Mono\",monospace;overflow:auto;max-height:260px}\n.lbl{font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text-3)}\n.envr{display:flex;justify-content:space-between;gap:16px;padding:11px 0;border-top:1px solid var(--border);flex-wrap:wrap}\n.envr:first-of-type{border-top:0}\n.envr span{color:var(--text-3);font-size:14px}\n.envr b{font-weight:600;font-size:13.5px;word-break:break-all;text-align:right}\n:host([data-theme=light][data-skin=emerald]){--bg:#F7F5EF;--surface:#FFFEFB;--surface-2:#F2EFE7;--surface-3:#E7E2D6;--border:#E3DDD0;--border-strong:#CFC7B6;--text:#1A1A16;--text-2:#3E3D35;--text-3:#5F5C50;--accent-soft:#EAF3EC;--brandblock:#0A2E22;--chart:#0A6B4B}\n:host([data-skin=emerald]) .sidebar{background:#0B2B20;border-right-color:#0B2B20}\n:host([data-skin=emerald]) .sb-item{color:#CFE6DB}\n:host([data-skin=emerald]) .sb-item .ic{color:#8DB8A6}\n:host([data-skin=emerald]) .sb-item:hover{background:rgba(255,255,255,.06);color:#fff}\n:host([data-skin=emerald]) .sb-item.on{background:rgba(201,161,74,.18);color:#fff}\n:host([data-skin=emerald]) .sb-item.on .ic{color:#E3C27A}\n:host([data-skin=emerald]) .sidebar .home-card{background:rgba(255,255,255,.05)!important;border-color:rgba(255,255,255,.08)}\n:host([data-skin=emerald]) .sidebar .home-card b{color:#fff!important}\n:host([data-skin=emerald]) .sidebar .home-card span,:host([data-skin=emerald]) .sb-note{color:#9CC3B3}\n:host([data-skin=emerald]) .sidebar .btn-mint{background:#C9A14A;color:#1B1405}\n:host([data-skin=emerald]) .sidebar .btn-mint:hover{background:#D6B062}\n:host([data-skin=emerald]) .kpi-ic{background:#F5ECD6;color:#7A5410}\n:host([data-skin=emerald]) .card-h{background:#F6F2E8}\n:host([data-skin=emerald]) .ph h1{font-family:\"Noto Serif Bengali\",\"Georgia\",serif;font-weight:600}\n:host([data-theme=dark][data-skin=emerald]) .kpi-ic{background:#2C2410;color:#E3C27A}\n:host([data-theme=dark][data-skin=emerald]) .card-h{background:var(--surface-2)}\n:host([data-theme=light][data-skin=ocean]){--primary:#0E6A78;--primary-hover:#0A5662;--accent-soft:#E2F1F3;--accent-text:#0A5662;--bg:#F2F6F7;--surface-2:#EDF4F5;--surface-3:#DEE9EC;--border:#D6E2E5;--brandblock:#0B3D45;--chart:#0E8A9A;--ok:#0A5662;--ok-bg:#E2F1F3}\n:host([data-theme=dark][data-skin=ocean]){--primary:#3CC6D6;--primary-hover:#5BD3E0;--on-primary:#04252A;--accent-soft:#0F2B30;--accent-text:#7FDCE6;--brandblock:#06262B;--chart:#3CC6D6}\n:host([data-theme=light][data-skin=graphite]){--primary:#1F2937;--primary-hover:#111827;--accent-soft:#EEF0F3;--accent-text:#1F2937;--bg:#F5F5F4;--surface-2:#F1F1F0;--surface-3:#E4E4E2;--border:#DDDDDA;--border-strong:#C8C8C4;--brandblock:#111827;--chart:#1BB880}\n:host([data-skin=graphite]) .sb-item.on{box-shadow:inset 0 0 0 1px var(--border-strong)}\n:host([data-theme=dark][data-skin=graphite]){--primary:#E5E7EB;--primary-hover:#FFFFFF;--on-primary:#111827;--accent-soft:#232A35;--accent-text:#F3F4F6;--brandblock:#05070A;--chart:#7CE6BC}\n:host([data-theme=light][data-skin=clay]){--primary:#9C4A1C;--primary-hover:#843D16;--accent-soft:#F8EDE6;--accent-text:#86401A;--bg:#FAF6F2;--surface:#FFFDFB;--surface-2:#F4EEE8;--surface-3:#E9E0D7;--border:#E6DDD4;--border-strong:#D3C6B9;--text:#22170F;--text-2:#4A3A2E;--text-3:#6A584A;--brandblock:#3B2417;--chart:#C0652F}\n:host([data-theme=dark][data-skin=clay]){--primary:#E8955E;--primary-hover:#F0A877;--on-primary:#2A1305;--accent-soft:#3A2416;--accent-text:#F2B48A;--brandblock:#1E120A;--chart:#E8955E}\n:host([data-skin=midnight][data-theme]){color-scheme:dark;--bg:#0A0F1E;--surface:#111830;--surface-2:#172040;--surface-3:#202B52;--border:#263259;--border-strong:#34437A;--text:#E8ECF8;--text-2:#B8C0D8;--text-3:#97A1BE;--primary:#7CE6BC;--primary-hover:#98EDCB;--on-primary:#04261A;--accent-soft:#16304A;--accent-text:#7CE6BC;--brandblock:#060A16;--sb-bg:#0D1328;--sb-tx:#C3CBE0;--sb-mut:#8A96B8;--chart:#7CE6BC;\n  --free-bg:#0D271D;--free-bd:#1E5A42;--free-tx:#7CE6BC;--occ-bg:#121D35;--occ-bd:#2A4373;--occ-tx:#AFC6F6;--cln-bg:#271D0D;--cln-bd:#684B16;--cln-tx:#F3C66E;--res-bg:#1F1832;--res-bd:#47367C;--res-tx:#CDBBF8;\n  --danger:#FF948A;--danger-bg:#3A1613;--warn:#F3C66E;--warn-bg:#2B210E;--ok:#7CE6BC;--ok-bg:#0F2D22;--info:#AFC6F6;--info-bg:#141F37}\n:host([data-skin=midnight]){background:var(--bg)}\n:host([data-skin=midnight]) .av-1{background:#0F2D22;color:#7CE6BC}\n:host([data-skin=midnight]) .av-2{background:#152139;color:#AFC6F6}\n:host([data-skin=midnight]) .av-3{background:#2D220E;color:#F2C66C}\n:host([data-skin=midnight]) .av-4{background:#211936;color:#CFBDF7}\n:host([data-skin=midnight]) .av-5{background:#371519;color:#FF9AA8}\n.pstats{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;margin-bottom:14px}\n.pstat{display:flex;flex-direction:column;gap:2px;text-align:left;padding:12px 14px;border-radius:10px;border:1px solid var(--border);background:var(--surface);cursor:pointer;min-height:72px;transition:border-color .15s,box-shadow .15s}\n.pstat:hover{border-color:var(--border-strong)}\n.pstat b{font-size:24px;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums}\n.pstat span{font-size:13.5px;color:var(--text-2)}\n.pstat.on{border-color:var(--primary);box-shadow:inset 0 0 0 1px var(--primary);background:var(--accent-soft)}\n.pstat.on span,.pstat.on b{color:var(--accent-text)}\n@media (max-width:1000px){.pstats{grid-template-columns:repeat(3,minmax(0,1fr))}}\n@media (max-width:520px){.pstats{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}\n.pstat{min-height:64px;padding:10px 12px}\n.pstat b{font-size:20px}}\n.ptool{gap:10px}\n.psel{width:auto;min-width:170px;height:48px;cursor:pointer}\n@media (max-width:700px){.ptool .search{flex-basis:100%}\n.psel{flex:1;min-width:0}}\n.pl-row{display:grid;grid-template-columns:minmax(0,2.4fr) minmax(0,1.1fr) minmax(0,1.2fr) minmax(0,1.1fr) minmax(0,1.5fr) 118px 100px 22px;gap:14px;align-items:center;padding:12px 18px;border:0;border-top:1px solid var(--border);background:none;width:100%;text-align:left;cursor:pointer;font:inherit;color:inherit;transition:background .12s}\nbutton.pl-row:hover{background:var(--surface-2)}\n.pl-head{cursor:default;font-size:12.5px;font-weight:600;color:var(--text-3);background:var(--surface-2);border-top:0;padding:11px 18px}\n:host([lang=en]) .pl-head{text-transform:uppercase;letter-spacing:.05em;font-size:11.5px}\n.pl-row .r{text-align:right}\n.pp{display:flex;gap:12px;align-items:center;min-width:0}\n.pp .tt{min-width:0}\n.pp b{display:flex;gap:6px;align-items:center;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.pp .tt>span{font-size:12.5px;color:var(--text-3);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.abtag{font-size:10.5px;font-weight:700;letter-spacing:.04em;padding:1px 6px;border-radius:4px;background:var(--accent-soft);color:var(--accent-text);font-family:\"IBM Plex Sans\",\"Inter\",sans-serif}\n.algtag{width:20px;height:20px;border-radius:5px;background:var(--danger-bg);color:var(--danger);display:inline-grid;place-items:center}\n.pc{font-size:14px;min-width:0;overflow:hidden;text-overflow:ellipsis}\n.pc small{color:var(--text-3)}\n.pc.dx{white-space:nowrap}\n.pc b.due{color:var(--danger)}\n.pc b.zero{color:var(--text-3);font-weight:500}\n.pl-row .lm{display:none}\n.chev{color:var(--text-3)}\n.pl-foot{padding:10px 18px;font-size:13px;color:var(--text-3);border-top:1px solid var(--border);margin:0}\n@media (max-width:1100px){.pl-head{display:none}\n.pl-row{grid-template-columns:minmax(0,1fr) auto;grid-template-areas:\"p s\" \"a b\" \"c d\" \"e f\";gap:8px 14px;padding:14px 16px}\n.pl-row .pp{grid-area:p}\n.pl-row .pc:nth-of-type(6){grid-area:s;justify-self:end}\n.pl-row .lm{display:block;font-size:11.5px;color:var(--text-3)}\n.pl-row .pc.r{text-align:right}\n.chev{display:none}}\n.crumb{display:flex;align-items:center;gap:6px;color:var(--text-3);font-size:14px;margin:-6px 0 12px}\n.crumb .link{padding:6px 4px;min-height:40px}\n.crumb b{color:var(--text);font-weight:600}\n.prec{padding:0;overflow:hidden;margin-bottom:16px}\n.prec-top{display:flex;gap:18px;align-items:flex-start;padding:20px}\n.pava{width:76px;height:76px;border-radius:16px;display:grid;place-items:center;font-size:28px;font-weight:700;flex:none}\n.prec-id{flex:1;min-width:0}\n.prec-id h1{font-size:24px;font-weight:700;display:flex;gap:10px;align-items:center;flex-wrap:wrap;line-height:1.25}\n.prec-id p{display:flex;flex-wrap:wrap;gap:6px 8px;color:var(--text-2);margin-top:4px;font-size:14.5px;align-items:center}\n.prec-id p a{color:var(--accent-text);text-decoration:none;display:inline-flex;gap:4px;align-items:center}\n.prec-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}\n.ptag{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 10px;border-radius:6px;background:var(--surface-2);border:1px solid var(--border);font-size:13px;font-weight:600;color:var(--text-2)}\n.ptag.red{background:var(--danger-bg);border-color:transparent;color:var(--danger)}\n.ptag.amber{background:var(--warn-bg);border-color:transparent;color:var(--warn)}\n.ptag.green{background:var(--accent-soft);border-color:transparent;color:var(--accent-text)}\n.prec-act{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;max-width:440px}\n.prec-kpi{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--border);border-bottom:1px solid var(--border)}\n.prec-kpi>div{padding:12px 20px}\n.prec-kpi>div+div{border-left:1px solid var(--border)}\n.prec-kpi span{display:block;font-size:12.5px;color:var(--text-3)}\n.prec-kpi b{font-size:19px;font-weight:700;font-variant-numeric:tabular-nums}\n.prec-kpi .due b{color:var(--danger)}\n.ptabs{display:flex;gap:2px;padding:0 12px;overflow-x:auto;scrollbar-width:none}\n.ptabs::-webkit-scrollbar{display:none}\n.ptab{position:relative;min-height:50px;padding:0 14px;border:0;background:none;cursor:pointer;font-weight:600;color:var(--text-3);white-space:nowrap;font-size:14.5px}\n.ptab::after{content:\"\";position:absolute;left:10px;right:10px;bottom:0;height:3px;border-radius:3px 3px 0 0;background:transparent}\n.ptab:hover{color:var(--text)}\n.ptab[aria-selected=true]{color:var(--accent-text)}\n.ptab[aria-selected=true]::after{background:var(--primary)}\n@media (max-width:900px){.prec-top{flex-wrap:wrap;padding:16px;gap:14px}\n.pava{width:60px;height:60px;font-size:22px}\n.prec-id h1{font-size:20px}\n.prec-act{max-width:none;width:100%;justify-content:stretch}\n.prec-act .btn{flex:1}\n.prec-kpi{grid-template-columns:repeat(2,minmax(0,1fr))}\n.prec-kpi>div:nth-child(3){border-left:0}\n.prec-kpi>div:nth-child(n+3){border-top:1px solid var(--border)}\n.prec-kpi>div{padding:10px 14px}}\n.pgrid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:start}\n.pcol{display:flex;flex-direction:column;gap:16px;min-width:0}\n.pspan{grid-column:1/-1}\n@media (max-width:900px){.pgrid{grid-template-columns:minmax(0,1fr)}}\n.kvs{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px 18px;margin:0}\n.kvs dt{font-size:12.5px;color:var(--text-3)}\n.kvs dd{margin:2px 0 0;font-weight:500;font-size:14.5px;overflow-wrap:anywhere}\n.kvs a{color:var(--accent-text);text-decoration:none}\n@media (max-width:420px){.kvs{grid-template-columns:minmax(0,1fr)}}\n.subh{font-size:13px;font-weight:600;color:var(--text-2);margin:18px 0 10px;padding-top:14px;border-top:1px solid var(--border)}\n.tline{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}\n.tline li{display:flex;gap:12px;align-items:flex-start;padding:8px 0;position:relative}\n.tline li:not(:last-child)::before{content:\"\";position:absolute;left:16px;top:44px;bottom:-6px;width:2px;background:var(--surface-3)}\n.tl-ic{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;flex:none}\n.tl-blue{background:var(--info-bg);color:var(--info)}\n.tl-green{background:var(--ok-bg);color:var(--ok)}\n.tl-amber{background:var(--warn-bg);color:var(--warn)}\n.tl-violet{background:var(--res-bg);color:var(--res-tx)}\n.tl-grey{background:var(--surface-2);color:var(--text-2)}\n.tline b{display:block;font-weight:600;font-size:14.5px;line-height:1.35}\n.tline span{font-size:12.5px;color:var(--text-3)}\n.tblw{overflow-x:auto}\n.ptbl{width:100%;border-collapse:collapse;min-width:620px}\n.ptbl th{font-size:12.5px;font-weight:600;color:var(--text-3);text-align:left;padding:10px 18px;background:var(--surface-2);border-bottom:1px solid var(--border);white-space:nowrap}\n.ptbl td{padding:11px 18px;border-bottom:1px solid var(--border);font-size:14.5px;white-space:nowrap}\n.ptbl tr:last-child td{border-bottom:0}\n.ptbl td.ab{color:var(--danger);font-weight:600}\n.ptbl small{color:var(--text-3);font-size:12px}\n.card.flush>.card-h{margin:0;padding:14px 18px}\n.rng{position:relative;display:block;width:120px;height:8px;border-radius:4px;background:linear-gradient(90deg,var(--danger-bg) 0 20%,var(--ok-bg) 20% 80%,var(--danger-bg) 80%)}\n.rng i{position:absolute;top:-4px;width:4px;height:16px;border-radius:2px;background:var(--text);margin-left:-2px}\n.dr-full{width:100%}\n.modal.xwide{width:min(1000px,100%)}\n.sh-q{font-weight:600;font-size:15.5px;margin-bottom:-6px}\n.shsec{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}\n@media (max-width:600px){.shsec{grid-template-columns:minmax(0,1fr)}}\n.shck{display:flex;gap:12px;align-items:center;min-height:54px;padding:8px 12px;border-radius:8px;border:1.5px solid var(--border-strong);background:var(--surface);cursor:pointer;text-align:left}\n.shck .bx{width:22px;height:22px;border-radius:6px;border:2px solid var(--border-strong);display:grid;place-items:center;color:transparent;flex:none}\n.shck[aria-checked=true]{border-color:var(--primary);background:var(--accent-soft)}\n.shck[aria-checked=true] .bx{background:var(--primary);border-color:var(--primary);color:var(--on-primary)}\n.shck[aria-disabled=true]{cursor:default;opacity:.85}\n.shck .tt b{display:block;font-weight:600;font-size:14.5px;line-height:1.3}\n.shck .tt small{font-size:12px;color:var(--text-3)}\n.shm{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}\n@media (max-width:600px){.shm{grid-template-columns:minmax(0,1fr)}}\n.shmo{display:flex;gap:12px;align-items:center;min-height:74px;padding:10px 14px;border-radius:10px;border:1.5px solid var(--border-strong);background:var(--surface);cursor:pointer;text-align:left}\n.shmo .mi{width:44px;height:44px;border-radius:10px;background:var(--surface-2);display:grid;place-items:center;flex:none;color:var(--text-2)}\n.shmo b{display:block;font-weight:600;font-size:15px}\n.shmo small{font-size:12.5px;color:var(--text-3)}\n.shmo[aria-pressed=true]{border-color:var(--primary);background:var(--accent-soft);box-shadow:inset 0 0 0 1px var(--primary)}\n.shmo[aria-pressed=true] .mi{background:var(--primary);color:var(--on-primary)}\n.shmo:disabled{opacity:.5;cursor:not-allowed}\n.shcons{margin-top:4px}\n.shres{display:grid;grid-template-columns:300px minmax(0,1fr);gap:20px;align-items:start}\n@media (max-width:820px){.shres{grid-template-columns:minmax(0,1fr)}}\n.shqr{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;padding:16px;border:1px solid var(--border);border-radius:12px;background:var(--surface-2)}\n.shqr svg{border-radius:10px;border:8px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.12)}\n.pinbox{width:100%;padding:10px;border-radius:10px;background:var(--surface);border:1px dashed var(--border-strong)}\n.pinbox span{display:block;font-size:12.5px;color:var(--text-3)}\n.pinbox b{display:block;font-size:30px;font-weight:700;letter-spacing:.12em;color:var(--accent-text)}\n.pinbox small{font-size:12px;color:var(--text-3)}\n.lnk{display:flex;align-items:center;gap:6px;width:100%;justify-content:space-between;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:4px 4px 4px 10px;font-size:12.5px;overflow:hidden}\n.lnk span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.shact{display:flex;flex-direction:column;gap:8px;width:100%}\n.pdfic{width:80px;height:80px;border-radius:18px;background:var(--accent-soft);color:var(--accent-text);display:grid;place-items:center}\n.pvwrap{height:520px;overflow:hidden;border:1px solid var(--border);border-radius:10px;background:#E9ECEF;position:relative}\n.pvf{width:820px;height:1160px;border:0;background:#fff;transform:scale(.62);transform-origin:0 0;position:absolute;left:12px;top:12px;box-shadow:0 4px 18px rgba(0,0,0,.18)}\n@media (max-width:820px){.pvwrap{height:380px}\n.pvf{transform:scale(.4);left:8px;top:8px}}\n#dvLayer .dvw{position:fixed;inset:0;z-index:95;background:rgba(4,14,10,.6);display:grid;place-items:center;padding:16px;animation:fadeUp .2s ease}\n.dvphone{width:min(400px,100%);height:min(800px,calc(100vh - 32px));background:var(--surface);border-radius:28px;box-shadow:0 30px 80px -20px rgba(0,0,0,.6);overflow:hidden;display:flex;flex-direction:column;border:8px solid #111}\n.dvh{display:flex;gap:10px;align-items:center;padding:12px 12px 12px 14px;background:#0A3F2D;color:#fff}\n.dvh div{flex:1;min-width:0}\n.dvh b{display:block;font-size:15px}\n.dvh span{font-size:12px;color:#B7E2CF}\n.dvh .iconbtn{background:rgba(255,255,255,.1);border-color:transparent;color:#fff}\n.dvb{padding:24px 18px;flex:1;overflow:auto}\n.dvpin{display:flex;flex-direction:column;justify-content:center}\n.dvro{display:flex;gap:6px;align-items:center;justify-content:center;font-size:12.5px;padding:6px;background:var(--accent-soft);color:var(--accent-text);font-weight:600}\n.dvf{flex:1;width:100%;border:0;background:#fff}\n.sidebar .sb-item.on,.sidebar .sb-item.on:hover{background:var(--primary);color:var(--on-primary);font-weight:600;box-shadow:none}\n.sidebar .sb-item.on .ic{color:var(--on-primary)}\n:host([data-skin=emerald]) .sidebar .sb-item.on,:host([data-skin=emerald]) .sidebar .sb-item.on:hover{background:#C9A14A;color:#1B1405}\n:host([data-skin=emerald]) .sidebar .sb-item.on .ic{color:#1B1405}\n.skkpi{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:16px}\n@media (max-width:1100px){.skkpi{grid-template-columns:repeat(2,minmax(0,1fr))}}\n.skk{display:flex;gap:14px;align-items:flex-start;text-align:left;padding:16px;font:inherit;color:inherit;width:100%}\nbutton.skk{cursor:pointer}\nbutton.skk:hover{border-color:var(--border-strong)}\nbutton.skk[aria-pressed=true]{box-shadow:inset 0 0 0 2px var(--primary)}\n.skk .ki{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent-text);flex:none}\n.skk.bad .ki{background:var(--danger-bg);color:var(--danger)}\n.skk.warn .ki{background:var(--warn-bg);color:var(--warn)}\n.skk div{min-width:0}\n.skk span{display:block;font-size:13px;color:var(--text-3)}\n.skk b{display:block;font-size:24px;font-weight:700;line-height:1.25;margin-top:2px}\n.skk.bad b{color:var(--danger)}\n.skk small{display:block;font-size:12.5px;color:var(--text-3);margin-top:2px}\n.o2p{margin-bottom:16px}\n.o2p .card-h h2{display:flex;align-items:center;gap:8px}\n.o2grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:20px}\n@media (max-width:900px){.o2grid{grid-template-columns:minmax(0,1fr)}}\n.o2types{display:flex;flex-direction:column;gap:16px}\n.o2t b{font-weight:600;font-size:14.5px}\n.o2bar{display:flex;height:12px;border-radius:99px;overflow:hidden;background:var(--surface-3);margin:8px 0}\n.o2bar i{display:block;height:100%}\n.o2bar .f,.o2lg i.f{background:var(--primary)}\n.o2bar .u,.o2lg i.u{background:#3B82C4}\n.o2bar .e,.o2lg i.e{background:#B8B8B0}\n.o2lg{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13px;color:var(--text-2);margin-bottom:8px}\n.o2lg span{display:inline-flex;align-items:center;gap:6px}\n.o2lg i{width:10px;height:10px;border-radius:3px;display:inline-block}\n.o2use{list-style:none;margin:0;padding:0;border:1px solid var(--border);border-radius:10px}\n.o2use li{display:flex;align-items:center;gap:12px;padding:10px 12px;border-top:1px solid var(--border)}\n.o2use li:first-child{border-top:0}\n.o2use li div{flex:1;min-width:0}\n.o2use li b{display:block;font-weight:600;font-size:14.5px}\n.o2use li div span{font-size:12.5px;color:var(--text-3)}\n.o2use li.none{color:var(--text-3);justify-content:center;min-height:80px}\n.sktabs{margin:0 0 14px;border-bottom:1px solid var(--border)}\n.skexp{margin-left:auto}\n.skr{display:grid;grid-template-columns:minmax(0,2.6fr) minmax(0,1.5fr) .8fr .9fr 1fr 1fr auto;gap:12px;align-items:center;padding:12px 16px;border-top:1px solid var(--border)}\n.skr-head{border-top:0;font-size:12px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.04em;padding-top:10px;padding-bottom:10px;background:var(--surface-2)}\n.skr .r{text-align:right}\n.sk-it{display:flex;gap:12px;align-items:center;min-width:0}\n.sk-it .tt{min-width:0}\n.sk-it b{display:block;font-weight:600;font-size:14.5px;line-height:1.3}\n.sk-it .tt>span{display:block;font-size:12.5px;color:var(--text-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.sk-ic{width:36px;height:36px;border-radius:9px;display:grid;place-items:center;flex:none;background:var(--surface-2);color:var(--text-2)}\n.sk-ic.c-oxy{background:#E3F0FA;color:#1F5F95}\n.sk-ic.c-cons{background:var(--accent-soft);color:var(--accent-text)}\n.sk-ic.c-med{background:#F3E8FB;color:#6B3D96}\n.sk-ic.c-eq{background:#FDF0E1;color:#8A4B0F}\n.sk-ic.c-lin{background:var(--surface-3);color:var(--text-2)}\n:host([data-theme=dark]) .sk-ic.c-oxy{background:#16304A;color:#9CC9EE}\n:host([data-theme=dark]) .sk-ic.c-med{background:#2E2140;color:#CDB1EA}\n:host([data-theme=dark]) .sk-ic.c-eq{background:#3A2A17;color:#F0C48E}\n.sk-q b{font-size:15.5px;font-weight:700}\n.sk-q b small{font-weight:500;font-size:12.5px;color:var(--text-3)}\n.sk-q b.due{color:var(--danger)}\n.sk-q>small{display:block;font-size:12px;color:var(--text-3)}\n.sk-q .inuse{color:#3B82C4}\n.sk-bar{display:block;position:relative;height:6px;border-radius:99px;background:var(--surface-3);margin:5px 0 3px;max-width:150px}\n.sk-bar i{display:block;height:100%;border-radius:99px;background:var(--primary)}\n.sk-bar.low i,.sk-bar.out i{background:var(--danger)}\n.sk-bar.exp i{background:var(--warn)}\n.sk-bar em{position:absolute;top:-2px;width:2px;height:10px;background:var(--text-3);border-radius:2px}\n.sk-num{font-variant-numeric:tabular-nums}\n.sk-ex small{display:block;font-size:12px;color:var(--text-3)}\n.sk-ex small.warnx{color:var(--warn);font-weight:600}\n.sk-act{display:flex;gap:6px;justify-content:flex-end}\n.skr .lm{display:none}\n@media (max-width:1000px){.skr-head{display:none}\n.skr{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px 12px;padding:14px}\n.sk-it{grid-column:1/-1}\n.sk-act{grid-column:1/-1;justify-content:stretch}\n.sk-act .btn{flex:1}\n.skr .r{text-align:left}\n.skr .lm{display:block;font-size:11.5px;color:var(--text-3);font-weight:600}}\n.mv-row{display:grid;grid-template-columns:150px 110px minmax(0,2fr) 100px minmax(0,1.4fr) 100px;gap:12px;align-items:center;padding:11px 16px;border-top:1px solid var(--border);font-size:14px}\n.mv-head{border-top:0;font-size:12px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.04em;background:var(--surface-2)}\n.mv-row .r{text-align:right}\n.mv-w{color:var(--text-3);font-size:13px}\n.mv-i b{font-weight:600}\n.mv-q{font-weight:700;font-variant-numeric:tabular-nums}\n.mv-q small{font-weight:500;color:var(--text-3)}\n.mv-q.neg{color:var(--danger)}\n.mv-q.pos{color:var(--ok)}\n.mv-s{font-size:13px;color:var(--text-3)}\n@media (max-width:900px){.mv-head{display:none}\n.mv-row{grid-template-columns:minmax(0,1fr) auto;gap:4px 10px}\n.mv-i{grid-column:1}\n.mv-q{grid-column:2;grid-row:1}\n.mv-w,.mv-p,.mv-s{grid-column:1/-1;font-size:12.5px}\n.mv-row>span:nth-child(2){grid-column:2;grid-row:2;justify-self:end}}\n.iss{display:flex;align-items:center;gap:12px;padding:12px 16px;border-top:1px solid var(--border)}\n.card .card-h+.iss,.card>.iss:first-child{border-top:0}\n.iss .tt{flex:1;min-width:0}\n.iss b{display:block;font-weight:600;font-size:14.5px}\n.iss .tt span{font-size:12.5px;color:var(--text-3)}\n@media (max-width:600px){.iss{flex-wrap:wrap}\n.iss .tt{flex-basis:calc(100% - 52px)}}\n.skpp{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;max-height:212px;overflow:auto;padding:2px}\n.skp{display:flex;gap:10px;align-items:center;min-height:56px;padding:6px 10px;border-radius:10px;border:1.5px solid var(--border-strong);background:var(--surface);cursor:pointer;text-align:left;font:inherit;color:inherit}\n.skp span b{display:block;font-weight:600;font-size:14px;line-height:1.25}\n.skp small{font-size:12px;color:var(--text-3)}\n.skp[aria-pressed=true],.ski[aria-pressed=true]{border-color:var(--primary);background:var(--accent-soft);box-shadow:inset 0 0 0 1px var(--primary)}\n.skpsel{display:flex;gap:12px;align-items:center;padding:10px 12px;border-radius:10px;background:var(--surface-2);border:1px solid var(--border)}\n.skpsel b{display:block;font-weight:600}\n.skpsel span{font-size:13px;color:var(--text-3)}\n.search.sm{margin-bottom:8px;max-width:none}\n.skilist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-height:236px;overflow:auto;padding:2px}\n@media (max-width:600px){.skilist{grid-template-columns:minmax(0,1fr)}}\n.ski{display:flex;gap:10px;align-items:center;min-height:56px;padding:6px 10px;border-radius:10px;border:1.5px solid var(--border-strong);background:var(--surface);cursor:pointer;text-align:left;font:inherit;color:inherit}\n.ski b{display:block;font-weight:600;font-size:14px;line-height:1.25}\n.ski small{font-size:12px;color:var(--text-3)}\n.ski:disabled{opacity:.45;cursor:not-allowed}\n.skqty{display:flex;gap:8px;align-items:center;flex-wrap:wrap}\n.skqty .input{width:96px;text-align:center;font-size:18px;font-weight:700}\n.skqty .iconbtn{width:52px;height:52px}\n.skav{font-size:13.5px;color:var(--text-3);margin-left:6px}\n.sknote{display:flex;gap:8px;align-items:flex-start;font-size:13px;color:var(--text-3);margin:6px 0 0;line-height:1.45}\n.sknote .ic{flex:none;margin-top:2px}\n.skm4{grid-template-columns:repeat(4,minmax(0,1fr))}\n@media (max-width:820px){.skm4{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@media (max-width:420px){.skm4{grid-template-columns:minmax(0,1fr)}}\n.skm4 .shmo{flex-direction:column;align-items:flex-start;min-height:118px}\n.skpanel{display:flex;flex-direction:column;gap:12px;margin-top:4px}\n.fin{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}\n.dz{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:170px;padding:18px;border:2px dashed var(--border-strong);border-radius:14px;background:var(--surface-2);cursor:pointer;text-align:center;transition:border-color .15s,background .15s}\n.dz:hover,.dz:focus-visible,.dz.over{border-color:var(--primary);background:var(--accent-soft)}\n.dz b{font-weight:600;font-size:15.5px}\n.dz small{font-size:12.5px;color:var(--text-3)}\n.dz-ic{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;background:var(--surface);color:var(--accent-text);border:1px solid var(--border)}\n.skcam{position:relative}\n.sktpl{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:center}\n.sktpl small{font-size:12.5px;color:var(--text-3)}\n.skread{display:flex;gap:16px;align-items:center;padding:16px;border-radius:14px;background:var(--surface-2);border:1px solid var(--border)}\n.skread img{width:120px;height:150px;object-fit:cover;border-radius:8px;border:1px solid var(--border)}\n.skread div{flex:1}\n.skread b{display:block;margin-bottom:10px}\n.skprog{display:block;height:8px;border-radius:99px;background:var(--surface-3);overflow:hidden}\n.skprog i{display:block;height:100%;width:40%;background:var(--primary);border-radius:99px;animation:skprog 1.1s ease-in-out infinite}\n@keyframes skprog{0%{transform:translateX(-100%)}100%{transform:translateX(260%)}}\n.skrsrc{display:flex;gap:14px;align-items:flex-start;padding:12px;border-radius:12px;background:var(--surface-2);border:1px solid var(--border);margin-bottom:12px}\n.skrsrc img{width:84px;height:104px;object-fit:cover;border-radius:8px;border:1px solid var(--border);flex:none}\n.skrsrc div{flex:1;min-width:0}\n.skrsrc b{display:block}\n.skrsrc span{font-size:13px;color:var(--text-3)}\n.rv{border:1px solid var(--border);border-radius:12px;overflow:hidden}\n.rv-row{display:grid;grid-template-columns:44px minmax(0,2.4fr) 90px 100px minmax(0,1fr) 150px;gap:8px;align-items:center;padding:8px 10px;border-top:1px solid var(--border)}\n.rv-row.rv-head{border-top:0;background:var(--surface-2);font-size:12px;font-weight:600;color:var(--text-3)}\n.rv-row .r{text-align:right}\n.rv-row .input{min-height:42px;padding:0 10px;font-size:14px}\n.rv-row .input.r{text-align:right}\n.rv-n small{display:flex;gap:6px;align-items:center;font-size:12px;color:var(--text-3);margin-top:4px}\n.rv-n .st{height:22px;font-size:11.5px;padding:0 8px}\n.rv-row.off{opacity:.5}\n.rv-row.off .input{text-decoration:line-through}\n.rv-ck{width:30px;height:30px;border-radius:7px;border:2px solid var(--border-strong);background:var(--surface);display:grid;place-items:center;color:transparent;cursor:pointer}\n.rv-ck[aria-checked=true]{background:var(--primary);border-color:var(--primary);color:var(--on-primary)}\n.rv-row .lm{display:none}\n@media (max-width:820px){.rv-head{display:none}\n.rv-row{grid-template-columns:40px minmax(0,1fr) minmax(0,1fr);padding:12px 10px}\n.rv-n{grid-column:2/-1}\n.rv-row>span:not(.rv-n){grid-column:auto}\n.rv-row>span:nth-child(3){grid-column:2}\n.rv-row .lm{display:block;font-size:11.5px;color:var(--text-3);font-weight:600;text-align:left}\n.rv-row .r{text-align:left}\n.rv-row .input.r{text-align:left}}\n.idscan{border:1px solid var(--border);border-radius:14px;padding:14px;background:linear-gradient(180deg,var(--accent-soft),var(--surface) 70%);display:flex;flex-direction:column;gap:12px}\n.idscan-h{display:flex;gap:12px;align-items:flex-start}\n.idscan-h .idi{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;background:var(--primary);color:var(--on-primary);flex:none}\n.idscan-h b{display:block;font-weight:700;font-size:15.5px}\n.idscan-h span{font-size:13px;color:var(--text-3);line-height:1.4}\n.seg{display:inline-flex;padding:4px;border-radius:12px;background:var(--surface-3);gap:4px;align-self:flex-start}\n.seg button{min-height:42px;padding:0 16px;border-radius:9px;border:0;background:none;font:inherit;font-weight:600;color:var(--text-2);cursor:pointer}\n.seg button[aria-pressed=true]{background:var(--surface);color:var(--accent-text);box-shadow:0 1px 3px rgba(0,0,0,.12)}\n.idz2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}\n@media (max-width:480px){.idz2{grid-template-columns:minmax(0,1fr)}}\n.idz{min-height:150px;padding:12px}\n.idz.has{position:relative;border-radius:14px;overflow:hidden;border:1.5px solid var(--primary);background:#000;min-height:150px;display:block}\n.idz.has img{width:100%;height:150px;object-fit:cover;display:block;opacity:.95}\n.idz-l{position:absolute;left:8px;bottom:8px;background:rgba(0,0,0,.65);color:#fff;font-size:12px;font-weight:600;padding:3px 9px;border-radius:99px}\n.idz-x{position:absolute;right:6px;top:6px;width:36px;height:36px;background:rgba(0,0,0,.6);border-color:transparent;color:#fff}\n.idcard-ill{width:88px;height:56px;border-radius:8px;background:var(--surface);border:1.5px solid var(--border-strong);position:relative;display:block}\n.idcard-ill i{position:absolute;background:var(--surface-3);border-radius:3px}\n.idcard-ill .ph{left:8px;top:10px;width:20px;height:26px;background:var(--accent-soft)}\n.idcard-ill .l1{left:34px;top:12px;width:44px;height:5px}\n.idcard-ill .l2{left:34px;top:22px;width:34px;height:5px}\n.idcard-ill .l3{left:34px;top:32px;width:40px;height:5px}\n.idcard-ill.back .l1{left:8px}\n.idcard-ill.back .l2{left:8px;width:46px}\n.idcard-ill .qr{right:8px;bottom:8px;width:18px;height:18px;background:var(--text-3);opacity:.5}\n.idst{display:flex;gap:8px;align-items:center;font-size:13.5px;color:var(--text-2);margin:0;font-weight:500}\n.idst.ok{color:var(--ok);font-weight:600}\n.idst.rd{color:var(--accent-text)}\n.spin{width:16px;height:16px;border-radius:50%;border:2.5px solid var(--accent-soft);border-top-color:var(--primary);animation:spin .8s linear infinite;display:inline-block}\n@keyframes spin{to{transform:rotate(360deg)}}\n.idfoot{display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:12px;color:var(--text-3);margin:0}\n.fromid{display:inline-flex;gap:4px;align-items:center;margin-left:6px;padding:1px 8px;border-radius:99px;background:var(--accent-soft);color:var(--accent-text);font-size:11.5px;font-weight:600;vertical-align:middle}\n.au-f{align-items:flex-end;flex-wrap:wrap}\n.au-sel{display:flex;flex-direction:column;gap:4px;font-size:12.5px;font-weight:600;color:var(--text-3)}\n.au-sel .input{min-height:44px;min-width:150px;padding:0 12px;font-size:14.5px;font-weight:500;color:var(--text)}\n.au-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:4px 0 10px;font-size:14px;color:var(--text-3);font-weight:600;flex-wrap:wrap}\n.au-bar-r{display:flex;gap:6px}\n.au-day{margin-bottom:18px}\n.au-dh{font-size:14px;font-weight:700;color:var(--text-2);margin:0 0 8px;display:flex;gap:8px;align-items:center}\n.au-dh span{font-size:12px;font-weight:600;color:var(--text-3);background:var(--surface-3);padding:1px 8px;border-radius:99px}\n.au{border-top:1px solid var(--border)}\n.card>.au:first-child{border-top:0}\n.au-h{display:grid;grid-template-columns:76px 34px minmax(0,1fr) auto auto;gap:12px;align-items:center;width:100%;min-height:64px;padding:10px 16px;border:0;background:none;text-align:left;font:inherit;color:inherit;cursor:pointer}\n.au-h:hover{background:var(--surface-2)}\n.au.open .au-h{background:var(--accent-soft)}\n.au-t{font-size:13px;color:var(--text-3);font-variant-numeric:tabular-nums}\n.au-m{min-width:0}\n.au-m b{display:block;font-weight:600;font-size:14.5px;line-height:1.35}\n.au-m>span{display:flex;flex-wrap:wrap;gap:4px 8px;align-items:center;font-size:12.5px;color:var(--text-3);margin-top:3px}\n.rchip{display:inline-flex;align-items:center;height:20px;padding:0 8px;border-radius:5px;font-size:11.5px;font-weight:700}\n.r-owner{background:#FBF1DC;color:#7A5410}\n.r-reception{background:#E3F0FA;color:#1F5F95}\n.r-nurse{background:#FCE7EF;color:#9B2453}\n.r-doctor{background:#EDE7FB;color:#5A3AA0}\n.r-system{background:var(--surface-3);color:var(--text-2)}\n:host([data-theme=dark]) .r-owner{background:#3A2E14;color:#F0CF8A}\n:host([data-theme=dark]) .r-reception{background:#16304A;color:#9CC9EE}\n:host([data-theme=dark]) .r-nurse{background:#3E1A2A;color:#F2A9C5}\n:host([data-theme=dark]) .r-doctor{background:#2A2145;color:#C9B8F2}\n.au-a{font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap}\n.au-x{display:inline-flex;align-items:center;gap:4px;font-size:13px;font-weight:600;color:var(--accent-text);padding:6px 10px;border-radius:8px;border:1px solid var(--border);background:var(--surface);white-space:nowrap}\n.au-x .ic{transition:transform .2s}\n.au.open .au-x .ic{transform:rotate(180deg)}\n.au-d{padding:6px 16px 16px 138px;background:var(--accent-soft);animation:fadeUp .18s ease}\n.au-kv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 18px;margin:0 0 12px;padding:14px;background:var(--surface);border:1px solid var(--border);border-radius:10px}\n.au-kv dt{font-size:12px;color:var(--text-3);font-weight:600}\n.au-kv dd{margin:2px 0 0;font-size:14.5px}\n.au-kv .due{color:var(--danger)}\n.au-bill{margin-bottom:12px}\n.au-bill h3{font-size:14px;font-weight:700;margin:0 0 8px}\n.au-bill table{width:100%;border-collapse:collapse;background:var(--surface);border:1px solid var(--border);border-radius:10px;overflow:hidden;font-size:14px}\n.au-bill th{font-size:12px;text-align:left;color:var(--text-3);background:var(--surface-2);padding:8px 12px}\n.au-bill td{padding:8px 12px;border-top:1px solid var(--border)}\n.au-bill .r{text-align:right;font-variant-numeric:tabular-nums}\n.au-bill tr.tot td{font-weight:700;background:var(--surface-2)}\n.au-bill tr.tot.due td{color:var(--danger)}\n.au-bill tr.fresh td{background:var(--accent-soft)}\n.au-ba{display:flex;align-items:center;gap:14px;margin-bottom:12px;flex-wrap:wrap}\n.au-ba div{padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:10px;min-width:130px}\n.au-ba span{display:block;font-size:12px;color:var(--text-3)}\n.au-ba b{font-size:18px}\n.au-meta{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:12.5px;color:var(--text-3);padding:10px 0;border-top:1px dashed var(--border-strong)}\n.au-meta b{color:var(--text-2);font-weight:600}\n.au-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}\n.au-lock{display:inline-flex;gap:6px;align-items:center;font-size:12.5px;color:var(--ok);font-weight:600}\n@media (max-width:900px){.au-kv{grid-template-columns:repeat(2,minmax(0,1fr))}\n.au-d{padding:6px 12px 14px}}\n@media (max-width:600px){.au-h{grid-template-columns:34px minmax(0,1fr) auto;gap:4px 10px;padding:12px}\n.au-h .au-t{grid-column:2;grid-row:2;font-size:12px}\n.au-h .tl-ic{grid-row:1/3}\n.au-m{grid-column:2;grid-row:1}\n.au-a{grid-column:3;grid-row:1;font-size:14px}\n.au-x{grid-column:3;grid-row:2;padding:4px 8px;font-size:12px}\n.au-kv{grid-template-columns:minmax(0,1fr)}\n.au-sel{flex:1}\n.au-sel .input{min-width:0;width:100%}\n.au-f{width:100%}}\n.nfbell{position:relative}\n.nfb{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 5px;border-radius:99px;background:#E5484D;color:#fff;font-size:11.5px;font-weight:700;display:grid;place-items:center;border:2px solid var(--surface)}\n.nfb[hidden]{display:none}\n.nfpop{position:fixed;top:68px;right:24px;z-index:80;width:min(420px,calc(100vw - 24px));background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow-lg);animation:fadeUp .18s ease;display:flex;flex-direction:column;max-height:calc(100vh - 90px)}\n@media (max-width:600px){.nfpop{right:12px;top:62px}}\n.nfpop-h{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--border)}\n.nfpop-h b{font-size:16px;display:flex;gap:8px;align-items:center}\n.nfc{font-size:12px;background:#E5484D;color:#fff;padding:1px 8px;border-radius:99px}\n.nfpop-l{overflow:auto}\n.nfpop-f{display:flex;align-items:center;justify-content:center;gap:6px;min-height:48px;border:0;border-top:1px solid var(--border);background:var(--surface-2);font:inherit;font-weight:600;color:var(--accent-text);cursor:pointer;border-radius:0 0 12px 12px}\n.nf{position:relative;display:flex;gap:12px;align-items:flex-start;padding:12px 14px;border-top:1px solid var(--border)}\n.nfpop-l .nf:first-child,.nflist .nf:first-child{border-top:0}\n.nf-ic{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;flex:none}\n.t-danger .nf-ic{background:var(--danger-bg);color:var(--danger)}\n.t-warn .nf-ic{background:var(--warn-bg);color:var(--warn)}\n.t-info .nf-ic{background:var(--info-bg);color:var(--info)}\n.nf-b{flex:1;min-width:0}\n.nf-b b{display:block;font-weight:600;font-size:14.5px;line-height:1.35}\n.nf-b>span{display:block;font-size:13px;color:var(--text-3);margin-top:2px}\n.nf-b small{display:flex;gap:8px;align-items:center;font-size:12px;color:var(--text-3);margin-top:4px}\n.nf-tag{font-style:normal;font-weight:700;color:var(--danger);background:var(--danger-bg);padding:0 7px;border-radius:5px}\n.nf-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}\n.nf-go{width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:var(--surface);display:grid;place-items:center;cursor:pointer;color:var(--text-2);flex:none;align-self:center}\n.nf-dot{position:absolute;left:5px;top:50%;width:7px;height:7px;border-radius:50%;background:#3B82C4;transform:translateY(-50%)}\n.nf.rd{opacity:.62}\n.nf.rd b{font-weight:500}\n.nf-none{display:flex;gap:8px;align-items:center;justify-content:center;padding:28px 14px;color:var(--text-3);margin:0}\n.nflist .nf{padding:16px 18px}\n.imsteps{display:flex;gap:8px;list-style:none;padding:0;margin:0 0 16px;flex-wrap:wrap}\n.imsteps li{display:flex;align-items:center;gap:8px;font-weight:600;font-size:14px;color:var(--text-3);padding:6px 14px 6px 6px;border-radius:99px;background:var(--surface-2);border:1px solid var(--border)}\n.imsteps li span{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:var(--surface-3);font-size:13px}\n.imsteps li.on{color:var(--accent-text);background:var(--accent-soft);border-color:var(--primary)}\n.imsteps li.on span{background:var(--primary);color:var(--on-primary)}\n.imsteps li.done span{background:var(--ok);color:#fff}\n.imsteps li.done{color:var(--text-2)}\n.imcard{padding:22px}\n.imq{font-size:17px;font-weight:700;margin:0 0 14px}\n.imtypes{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}\n.imty{display:flex;flex-direction:column;gap:6px}\n.imty-b{display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:16px;border-radius:12px;border:1.5px solid var(--border-strong);background:var(--surface);text-align:left;font:inherit;color:inherit;cursor:pointer;min-height:200px;transition:border-color .15s,background .15s}\n.imty-b:hover{border-color:var(--primary);background:var(--accent-soft)}\n.imty-b b{font-size:16px;font-weight:700}\n.imty-b>span:not(.imty-ic){font-size:13.5px;color:var(--text-2);line-height:1.45}\n.imty-b small{font-size:11.5px;color:var(--text-3);margin-top:auto;line-height:1.5}\n.imty-b small em{font-style:normal;font-weight:700}\n.imty-ic{width:46px;height:46px;border-radius:12px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent-text);flex:none}\n.imsel{display:flex;gap:12px;align-items:center;padding:12px;border-radius:12px;background:var(--surface-2);border:1px solid var(--border);margin-bottom:14px}\n.imsel div{flex:1;min-width:0}\n.imsel b{display:block}\n.imsel span.latin{font-size:12.5px;color:var(--text-3)}\n.imdz{min-height:240px}\n.imfmt{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;justify-content:center}\n.imfmt i{display:inline-flex;gap:5px;align-items:center;font-style:normal;font-size:12.5px;font-weight:600;padding:4px 10px;border-radius:99px;background:var(--surface);border:1px solid var(--border);color:var(--text-2)}\n.imbtns{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 6px}\n.imbtns.c{justify-content:center}\n.imbtns label.btn{position:relative}\n@media (max-width:600px){.imbtns .btn{flex:1 1 100%}}\n.im-read{min-height:160px}\n.imsum{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0 8px}\n.immap{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13px;color:var(--text-3);margin:0 0 10px}\n.immap b{color:var(--text-2)}\n.imtbl-w{overflow:auto;border:1px solid var(--border);border-radius:10px;max-height:460px}\n.imtbl{width:100%;border-collapse:collapse;font-size:14px;min-width:720px}\n.imtbl th{position:sticky;top:0;background:var(--surface-2);font-size:12px;text-align:left;color:var(--text-3);padding:9px 10px;white-space:nowrap;z-index:1}\n.imtbl td{padding:9px 10px;border-top:1px solid var(--border);vertical-align:top}\n.imtbl td small{display:block;font-size:12px;color:var(--text-3);margin-top:4px;max-width:220px}\n.imtbl tr.v-err td{background:var(--danger-bg)}\n.imtbl tr.v-err td:not(:last-child){opacity:.7;text-decoration:line-through}\n.imtbl tr.v-warn td{background:color-mix(in srgb,var(--warn-bg) 55%,transparent)}\n.imfoot{display:flex;gap:10px;margin-top:16px}\n.imok{text-align:center;padding:16px 0}\n.imok-ic{width:72px;height:72px;border-radius:50%;display:grid;place-items:center;margin:0 auto 12px;background:var(--ok-bg);color:var(--ok)}\n.imok h2{font-size:22px;margin:0 0 6px}\n.imok p{color:var(--text-2);margin:0}\n.imhist{margin-top:16px}\n.setw{display:grid;grid-template-columns:220px minmax(0,1fr);gap:24px;align-items:start}\n@media (max-width:1000px){.setw{grid-template-columns:minmax(0,1fr)}\n.setnav{display:none!important}}\n.setnav{position:sticky;top:84px;display:flex;flex-direction:column;gap:2px;padding:12px;border:1px solid var(--border);border-radius:12px;background:var(--surface)}\n.setnav .eyebrow{margin:2px 8px 6px}\n.setnav a{display:flex;gap:10px;align-items:center;min-height:42px;padding:0 10px;border-radius:8px;color:var(--text-2);text-decoration:none;font-weight:500;font-size:14.5px}\n.setnav a:hover{background:var(--surface-2);color:var(--text)}\n.setnav a .ic{color:var(--text-3)}\n.setnav a.dz-l{color:var(--danger)}\n.setnav a.dz-l .ic{color:var(--danger)}\n.setcol{display:flex;flex-direction:column;gap:18px;max-width:860px;min-width:0}\n.setc{padding:22px;display:flex;flex-direction:column;gap:14px;scroll-margin-top:84px}\n.setc .field{margin:0}\n.setc-h{display:flex;gap:14px;align-items:flex-start;padding-bottom:14px;border-bottom:1px solid var(--border);margin-bottom:2px}\n.setc-h h2{font-size:18px;font-weight:700;margin:0;outline:none}\n.setc-h p{margin:3px 0 0;font-size:13.5px;color:var(--text-3)}\n.setc-ic{width:42px;height:42px;border-radius:11px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent-text);flex:none}\n.setc .hint{display:flex;gap:6px;align-items:flex-start;font-size:12.5px;color:var(--text-3);margin:5px 0 0;line-height:1.45}\n.setc .hint.r{justify-content:flex-end}\n.setc .hint .ic{flex:none;margin-top:2px}\n.setc .mut,.au-kv .mut{color:var(--text-3)}\n.input.ro{display:flex;align-items:center;flex-wrap:wrap;gap:8px;background:var(--surface-2);color:var(--text-2);min-height:52px;height:auto;padding-top:8px;padding-bottom:8px;overflow-wrap:anywhere}\n.input.ro .st{max-width:100%;white-space:normal;height:auto;min-height:26px}\n@media (max-width:600px){.setc .row2{grid-template-columns:minmax(0,1fr)}\n.setc{padding:16px}}\n.lockt{margin-left:auto;color:var(--text-3);display:inline-flex}\n.input.ta{min-height:92px;padding:12px 14px;resize:vertical;line-height:1.5;font:inherit}\n.input.up{text-transform:uppercase;letter-spacing:.06em}\n.gsth{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}\n.gsts{font-size:12.5px;font-weight:700;white-space:nowrap;margin-top:5px;color:var(--text-3)}\n.gsts.ok{color:var(--ok)}\n.gsts.bad{color:var(--danger);white-space:normal;text-align:right}\n.setnote{margin:8px 0 0;padding:10px 12px;border-radius:9px;background:var(--surface-2);border:1px solid var(--border);font-size:13px;color:var(--text-2);line-height:1.5}\n.billprev{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;padding:14px 16px;border:1px dashed var(--border-strong);border-left:4px solid #12976A;border-radius:10px;background:#fff;color:#14201b}\n.bp-l{display:flex;gap:10px;min-width:0;flex:1}\n.bp-l div{min-width:0}\n.bp-sq{width:32px;height:32px;border-radius:9px;background:#1BB880;display:grid;place-items:center;flex:none}\n.bp-sq i{width:12px;height:12px;border-radius:50%;border:3px solid #fff}\n.bp-l b{display:block;font-size:16px;color:#0b4f3a}\n.bp-l span{display:block;font-size:12px;color:#4a5b53;margin-top:2px;line-height:1.45}\n.bp-l span.mut{color:#a1a8a4}\n.bp-r{text-align:right}\n.bp-r b{display:block;font-size:14px;font-weight:800;letter-spacing:.05em;color:#12976A;font-family:\"IBM Plex Sans\",Inter,sans-serif}\n.bp-r small{font-size:11px;color:#6b7a73}\n.setmsg{display:flex;gap:8px;align-items:flex-start;margin:0;padding:10px 12px;border-radius:9px;font-size:13.5px;font-weight:500;line-height:1.45}\n.setmsg.ok{background:var(--ok-bg);color:var(--ok)}\n.setmsg.bad{background:var(--danger-bg);color:var(--danger)}\n.setmsg .ic{flex:none;margin-top:2px}\n.tmt{border:1px solid var(--border);border-radius:12px;overflow:hidden}\n.tmr{display:grid;grid-template-columns:minmax(0,1fr) 72px 84px 64px;gap:10px;align-items:center;padding:12px 14px;border-top:1px solid var(--border)}\n.tmr.tmh{border-top:0;background:var(--surface-2);font-size:12px;font-weight:600;color:var(--text-3);padding-top:9px;padding-bottom:9px}\n.tmr .r{text-align:right}\n.tmr.off .tm-s,.tmr.off .tm-r,.tmr.off .tm-c{opacity:.45}\n.tm-s b{display:block;font-weight:600;font-size:14.5px;line-height:1.35}\n.tm-s small{display:flex;gap:4px;align-items:center;flex-wrap:wrap;font-size:12.5px;color:var(--text-3);margin-top:2px}\n.tm-c{font-size:13px;color:var(--text-3)}\n.tm-r .rate{font-size:16px;color:var(--warn)}\n.tmlim{display:flex;gap:8px;align-items:center;font-size:12.5px;color:var(--text-3);margin-top:8px}\n.tmlim .pre{max-width:150px}\n.tmlim .input{min-height:40px}\n.tgl{width:48px;height:28px;border-radius:99px;border:0;background:var(--surface-3);position:relative;cursor:pointer;padding:0}\n.tgl i{position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .18s}\n.tgl[aria-checked=true]{background:var(--primary)}\n.tgl[aria-checked=true] i{transform:translateX(20px)}\n.tgl:disabled{opacity:.55;cursor:not-allowed}\n@media (max-width:600px){.tmr{grid-template-columns:minmax(0,1fr) auto auto}\n.tmr .tm-c,.tmr.tmh span:nth-child(2){display:none}}\n.tmcalc{padding:14px;border-radius:12px;background:var(--surface-2);border:1px solid var(--border)}\n.tmcalc h3{display:flex;gap:6px;align-items:center;font-size:14.5px;font-weight:700;margin:0 0 10px}\n.tmcg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\n.tmcg .au-sel .input{min-width:0;width:100%}\n@media (max-width:600px){.tmcg{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}\n.tmcg label:first-child{grid-column:1/-1}}\n.tmres{margin-top:10px;padding:10px 12px;border-radius:9px;background:var(--ok-bg);color:var(--ok)}\n.tmres.tax{background:var(--warn-bg);color:var(--warn)}\n.tmres b{display:block;font-size:15.5px}\n.tmres span{font-size:13px}\n.tmw{display:flex;flex-direction:column;gap:6px}\n.tmw div{display:flex;flex-wrap:wrap;gap:6px}\n.tmwc{font-size:13px;padding:5px 10px;border-radius:8px;background:var(--ok-bg);color:var(--ok)}\n.tmwc.tax{background:var(--warn-bg);color:var(--warn)}\n.tmwc b{font-weight:700}\n.setfoot{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}\n.setfoot small{display:flex;gap:6px;align-items:center;font-size:12.5px;color:var(--text-3)}\n.sgdz{min-height:120px}\n.field label.dz{display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:400}\n.field label.dz b{font-size:15px}\n.sgprev{display:flex;justify-content:flex-end;padding:14px;border:1px dashed var(--border-strong);border-radius:10px;background:#fff}\n.sgbox{width:240px;text-align:center;font-size:11.5px;color:#4a5b53;font-family:Arial,sans-serif}\n.sgbox img{max-width:200px;max-height:70px;display:block;margin:4px auto 2px}\n.sgnone{height:56px;display:flex;align-items:center;justify-content:center;color:#a1a8a4}\n.sgline{border-top:1px solid #14201b;padding-top:4px;color:#14201b;font-weight:600}\n.setbtns{display:flex;gap:10px;flex-wrap:wrap}\n.pwin{position:relative}\n.pwin .input{padding-right:52px}\n.pweye{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:42px;height:42px;border:0;background:none;color:var(--text-3);cursor:pointer;border-radius:8px;display:grid;place-items:center}\n.pwbar{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:8px}\n.pwbar i{height:5px;border-radius:99px;background:var(--surface-3)}\n.pwbar.s1 i:nth-child(-n+1){background:var(--danger)}\n.pwbar.s2 i:nth-child(-n+2){background:var(--warn)}\n.pwbar.s3 i{background:var(--ok)}\n.dzc{border-color:color-mix(in srgb,var(--danger) 45%,var(--border))}\n.dzc .setc-ic{background:var(--danger-bg);color:var(--danger)}\n.dzc h2{color:var(--danger)}\n.dzp{margin:0;font-size:14px;color:var(--text-2);line-height:1.55}\n.setc .btn-danger,#modal .btn-danger{background:var(--danger);color:#fff;border-color:var(--danger)}\n.dzbox{padding:12px 14px;border-radius:10px;background:var(--danger-bg);color:var(--danger)}\n.dzbox ul{margin:6px 0 0;padding-left:20px;font-size:13.5px;line-height:1.7}\n.dzname{user-select:all;background:var(--surface-2);padding:1px 6px;border-radius:5px;color:var(--text)}\n.bpsum{grid-template-columns:repeat(4,minmax(0,1fr))}\n@media (max-width:900px){.bpsum{grid-template-columns:repeat(2,minmax(0,1fr))}}\n.bp-row{display:grid;grid-template-columns:150px minmax(0,2fr) 120px 95px 120px 110px auto;gap:12px;align-items:center;padding:12px 16px;border-top:1px solid var(--border)}\n.bp-head{border-top:0;font-size:12px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.04em;padding-top:10px;padding-bottom:10px;background:var(--surface-2)}\n.bp-row .r{text-align:right}\n.bp-row .lm{display:none}\n.bp-no{display:flex;gap:10px;align-items:center}\n.bp-no b{font-weight:600;font-size:14px}\n.bp-p{display:flex;gap:10px;align-items:center;border:0;background:none;padding:0;text-align:left;font:inherit;color:inherit;cursor:pointer;min-width:0}\n.bp-p span{min-width:0}\n.bp-p b{display:block;font-weight:600;font-size:14.5px}\n.bp-p small{font-size:12.5px;color:var(--text-3)}\n.bp-p:hover b{color:var(--accent-text);text-decoration:underline}\n.bp-at{font-size:14px}\n.bp-at small,.bp-n small{display:block;font-size:12px;color:var(--text-3)}\n.bp-n small.ok{color:var(--ok)}\n.bp-n{font-variant-numeric:tabular-nums;font-weight:500}\n.bp-n .due{color:var(--danger)}\n.bp-act{display:flex;gap:6px;justify-content:flex-end}\n@media (max-width:1100px){.bp-head{display:none}\n.bp-row{grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 12px;padding:14px}\n.bp-no{grid-column:1/-1;order:-1}\n.bp-p{grid-column:1/-1}\n.bp-at{grid-column:1/-1}\n.bp-row .r{text-align:left}\n.bp-row .lm{display:block;font-size:11.5px;color:var(--text-3);font-weight:600}\n.bp-act{grid-column:1/-1;justify-content:stretch}\n.bp-act .btn{flex:1}}\n@media (max-width:400px){.appbar .ab-right{gap:6px}\n.appbar .ab-right .iconbtn{width:40px;height:40px;min-width:40px}\n.ab-brand .logo,.ab-brand svg:first-child{transform:scale(.9)}}\n.bottomnav.six .bn-item{font-size:11.5px}\n.bottomnav.six .bn-item .pip{width:40px}\n.bn-item .pip{position:relative}\n.bn-dot{position:absolute;top:-3px;right:-2px;min-width:18px;height:18px;padding:0 4px;border-radius:99px;background:#E5484D;color:#fff;font-size:10.5px;font-weight:700;font-style:normal;display:grid;place-items:center;border:2px solid var(--surface)}\n.mr-wrap{position:fixed;inset:0;z-index:90}\n.mr-scrim{position:absolute;inset:0;background:rgba(4,14,10,.5);opacity:0;transition:opacity .2s}\n.mr{position:absolute;left:0;right:0;bottom:0;background:var(--surface);border-radius:20px 20px 0 0;padding:8px 16px calc(18px + env(safe-area-inset-bottom));transform:translateY(100%);transition:transform .22s ease;max-height:80vh;overflow:auto}\n.mr-wrap.open .mr-scrim{opacity:1}\n.mr-wrap.open .mr{transform:none}\n@media (min-width:901px){.mr{left:auto;right:24px;bottom:24px;width:420px;border-radius:16px}}\n.mr .handle{margin:4px auto 10px}\n.mr-h{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:14px}\n.mr-h h2{font-size:18px;margin:0}\n.mr-h p{margin:2px 0 0;font-size:13px;color:var(--text-3)}\n.mr-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\n.mr-i{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:96px;padding:10px 6px;border-radius:14px;border:1px solid var(--border);background:var(--surface-2);font:inherit;font-size:13.5px;font-weight:600;color:var(--text);cursor:pointer;text-align:center;line-height:1.25}\n.mr-i.on{border-color:var(--primary);background:var(--accent-soft);color:var(--accent-text)}\n.mr-ic{position:relative;width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:var(--surface);color:var(--accent-text);border:1px solid var(--border)}\n.sbdemo{display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:600;color:var(--text-3)}\n.sbdemo .seg{flex-wrap:wrap}\n.sbdemo .seg button{min-height:38px;padding:0 12px;font-size:13px}\n.sblock{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:12px;background:var(--danger-bg);color:var(--danger);border:1px solid color-mix(in srgb,var(--danger) 35%,transparent);margin-bottom:16px}\n.sblock b{display:block}\n.sblock span{font-size:13.5px;line-height:1.5}\n.sblock .ic{flex:none;margin-top:2px}\n.sbgrid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:18px;margin-bottom:18px;align-items:start}\n@media (max-width:1000px){.sbgrid{grid-template-columns:minmax(0,1fr)}}\n.sbgrid .setc-h{align-items:center}\n.sbgrid .setc-h>div{flex:1}\n.sbbadge{font-size:12.5px;font-weight:700;padding:4px 12px;border-radius:99px;white-space:nowrap}\n.sbbadge.t-ok,.sbdays.t-ok{background:var(--ok-bg);color:var(--ok)}\n.sbbadge.t-soon,.sbdays.t-soon{background:var(--warn-bg);color:var(--warn)}\n.sbbadge.t-bad,.sbdays.t-bad{background:var(--danger-bg);color:var(--danger)}\n.sbbadge.t-info{background:var(--info-bg);color:var(--info)}\n.sbnote{margin:0;font-size:14px;color:var(--text-2);line-height:1.55}\n.sbdays{border-radius:14px;padding:16px;text-align:center;border:1px solid color-mix(in srgb,currentColor 25%,transparent)}\n.sbdn{display:flex;align-items:baseline;justify-content:center;gap:8px}\n.sbdn b{font-size:46px;font-weight:800;line-height:1}\n.sbdn span{font-size:15px;font-weight:700}\n.sbdays p{margin:6px 0 0;font-size:13px;color:var(--text-2)}\n.sbbar{height:8px;border-radius:99px;background:var(--surface-3);overflow:hidden;margin:12px 0 4px}\n.sbbar i{display:block;height:100%;border-radius:99px;background:currentColor;transition:width .4s}\n.sbbar.u-ok i{background:#3B82C4}\n.sbbar.u-warn i{background:var(--warn)}\n.sbbar.u-bad i{background:var(--danger)}\n.sbur{display:flex;justify-content:space-between;gap:10px;font-size:13.5px}\n.apcur{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;justify-content:space-between;border:1px solid var(--border);border-radius:12px;padding:14px 16px;background:var(--surface-2)}\n.apcur b{font-size:16px}\n.apcur .s{font-size:13px;color:var(--text-3)}\n.apcur .eyebrow{display:block;margin-bottom:2px}\n.apgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}\n.apc{border:1px solid var(--border);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px;background:var(--surface);min-width:0}\n.apc.cur{border:2px solid var(--primary)}\n.apc.soon{opacity:.85}\n.apc-top{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}\n.apnm{display:block;font-size:16px;font-weight:800}\n.ap-sub{display:block;font-size:12.5px;color:var(--text-3)}\n.aptag{font-size:11px;font-weight:700;padding:3px 9px;border-radius:99px;background:var(--ok-bg);color:var(--ok);white-space:nowrap}\n.aptag.g{background:var(--warn-bg);color:var(--warn)}\n.apc .seg{align-self:flex-start}\n.apc .seg button{min-height:36px;padding:0 12px;font-size:13px}\n.apts{display:grid;gap:6px}\n.apt{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-strong);background:var(--surface);font:inherit;color:inherit;cursor:pointer;text-align:left;min-height:54px}\n.apt.on{border-color:var(--primary);background:var(--accent-soft);box-shadow:inset 0 0 0 1px var(--primary)}\n.apt:disabled{cursor:default}\n.aptl,.aptr{display:flex;flex-direction:column;gap:2px}\n.aptr{align-items:flex-end;text-align:right}\n.aptl b,.aptr b{font-size:14.5px}\n.aptr small{font-size:11px;font-weight:600;color:var(--text-3)}\n.apc .of{font-size:11.5px;font-weight:700;color:#A86A12}\n.apc .sv{font-size:11.5px;font-weight:700;color:var(--ok)}\n:host([data-theme=dark]) .apc .of{color:#E3B866}\n.apnote{font-size:12.5px;color:var(--text-2);line-height:1.55}\n.apnote div{margin-top:3px}\n.apf{margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:var(--text-2)}\n.apsoon{text-align:center;font-weight:700;font-size:13px;color:var(--warn);background:var(--warn-bg);border-radius:10px;padding:12px;margin-top:auto}\n.apc .btn-block{margin-top:auto}\n.apamt{font-size:26px;font-weight:800}\n.apamt small{font-size:12.5px;font-weight:600;color:var(--text-3)}\n.invl{display:flex;flex-direction:column;gap:8px}\n.inv{display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--border);border-radius:10px;flex-wrap:wrap}\n.inv .tt{flex:1;min-width:160px}\n.inv b{display:block;font-size:14.5px}\n.inv .tt span{font-size:12.5px;color:var(--text-3)}\n.sbban{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;padding:10px 14px;border-radius:10px;margin:-6px 0 16px;font-size:13.5px;font-weight:600;text-align:center}\n.sbban.t-soon{background:var(--warn-bg);color:var(--warn)}\n.sbban.t-grace,.sbban.t-locked{background:var(--danger-bg);color:var(--danger)}\n.sbban .link{color:inherit;font-weight:700;text-decoration:underline}\n.sbbrk{border:1px solid var(--border);border-radius:10px;overflow:hidden}\n.sbbrk div{display:flex;justify-content:space-between;padding:9px 12px;border-top:1px solid var(--border);font-size:14px}\n.sbbrk div:first-child{border-top:0}\n.sbbrk span{color:var(--text-3)}\n.sbbrk .tot{background:var(--surface-2)}\n.sbbrk .tot b{font-size:17px}\n.sbqr{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}\n.sbqrbox{width:190px;height:190px;display:grid;place-items:center;background:#fff;border:1px solid var(--border);border-radius:12px;padding:10px}\n.sbupi{display:flex;gap:8px;align-items:center;font-size:13.5px}\n.sbupi span{color:var(--text-3)}\n.sbwa{color:#128C4A}\n#modal .m-b .hint{display:flex;gap:6px;align-items:flex-start;font-size:12.5px;color:var(--text-3);margin:0;line-height:1.5}\n#modal .m-b .hint .ic{flex:none;margin-top:2px}\n.sbok{text-align:center;padding:10px 0}\n.sbok h3{margin:8px 0 2px;font-size:20px}\n.sbokamt{display:block;font-size:30px;font-weight:800}\n.sbok p{margin:4px 0;color:var(--text-2)}\n.sbok .mut{color:var(--text-3)}\n.sbok .c{stroke-dasharray:170;stroke-dashoffset:170;animation:sbC .6s ease-out forwards}\n.sbok .p{stroke-dasharray:40;stroke-dashoffset:40;animation:sbC .35s .5s ease-out forwards}\n@keyframes sbC{to{stroke-dashoffset:0}}\n@media (prefers-reduced-motion:reduce){.sbok .c,.sbok .p{animation:none;stroke-dashoffset:0}}\n.sftabs{margin:0 0 16px;border-bottom:1px solid var(--border);overflow-x:auto;flex-wrap:nowrap}\n.sftabs .ptab{display:inline-flex;gap:6px;align-items:center;white-space:nowrap}\n.sftabs .cnt{background:var(--danger);color:#fff;border-radius:99px;font-size:11px;padding:0 6px;min-width:18px;text-align:center}\n.attsum{display:flex;gap:8px;align-items:center;font-size:14px;color:var(--text-2);margin:0 0 6px;font-weight:500}\n.stf.att{flex-wrap:wrap}\n.stf.att .tt{flex:1;min-width:150px}\n.att-in{display:block;margin-top:2px;color:var(--ok)!important}\n.attseg{display:flex;gap:4px;flex-wrap:wrap;align-items:center;width:100%}\n.attseg button{flex:1;min-height:40px;border-radius:8px;border:1.5px solid var(--border-strong);background:var(--surface);font:inherit;font-size:12.5px;font-weight:600;color:var(--text-2);cursor:pointer;padding:0 6px}\n.attseg button[aria-pressed=true].a-P{background:var(--ok-bg);border-color:var(--ok);color:var(--ok)}\n.attseg button[aria-pressed=true].a-h{background:var(--warn-bg);border-color:var(--warn);color:var(--warn)}\n.attseg button[aria-pressed=true].a-L{background:var(--info-bg);border-color:var(--info);color:var(--info)}\n.attseg button[aria-pressed=true].a-A{background:var(--danger-bg);border-color:var(--danger);color:var(--danger)}\n.tmrow{display:grid;grid-template-columns:minmax(0,2fr) 110px minmax(0,1.3fr) 120px 130px 340px;gap:12px;align-items:center;padding:12px 16px;border-top:1px solid var(--border)}\n.tmrh{background:var(--surface-2);font-size:12px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.04em;padding-top:9px;padding-bottom:9px}\n.tmrow.off .tm-n,.tmrow.off .tm-ph,.tmrow.off .tm-l{opacity:.55}\n.tm-n{display:flex;gap:10px;align-items:center;min-width:0}\n.tm-n b{display:block;font-weight:600}\n.tm-n small{font-size:12.5px;color:var(--text-3)}\n.tm-ph small{display:block;font-size:12px;color:var(--text-3)}\n.tm-l{font-size:13.5px;color:var(--text-2)}\n.tm-a{display:flex;gap:6px;justify-content:flex-end;flex-wrap:nowrap}\n.tm-rev{color:var(--danger)!important}\n.tm-own{display:inline-flex;gap:6px;align-items:center;font-size:12.5px;color:var(--text-3)}\n.tmrow .lm{display:none}\n@media (max-width:1100px){.tmrh{display:none}\n.tmrow{grid-template-columns:minmax(0,1fr) auto;gap:8px 12px}\n.tm-n{grid-column:1}\n.tmrow>span:nth-child(2){grid-column:2;grid-row:1;justify-self:end}\n.tm-ph,.tm-l{grid-column:1/-1;font-size:13px}\n.tmrow .lm{display:inline;font-size:12px;color:var(--text-3);margin-right:6px}\n.tmrow>span:nth-child(5){grid-column:1}\n.tm-a{grid-column:1/-1;justify-content:stretch}\n.tm-a .btn{flex:1}}\n.sf2{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:18px;align-items:start}\n@media (max-width:1000px){.sf2{grid-template-columns:minmax(0,1fr)}}\n.ivroles{display:grid;gap:8px}\n.ivroles .shmo{min-height:64px}\n.mnbar{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap}\n.mnw{overflow:auto;max-height:70vh}\n.mnt{border-collapse:separate;border-spacing:0;font-size:12.5px;min-width:100%}\n.mnt th,.mnt td{padding:0;text-align:center;border-bottom:1px solid var(--border);height:40px}\n.mnt thead th{position:sticky;top:0;background:var(--surface-2);z-index:2;font-weight:600;color:var(--text-3);min-width:30px}\n.mnt thead th span{display:block;font-size:12.5px;color:var(--text)}\n.mnt thead th small{display:block;font-size:10px}\n.mnt th.sun{color:var(--danger)}\n.mnt th.tod{background:var(--accent-soft);box-shadow:inset 0 -2px 0 var(--primary)}\n.mnt .mn-n{position:sticky;left:0;background:var(--surface);z-index:1;text-align:left;padding:4px 12px;min-width:170px;border-right:1px solid var(--border)}\n.mnt thead .mn-n{z-index:3;background:var(--surface-2)}\n.mn-n b{display:block;font-weight:600;font-size:13px;white-space:nowrap}\n.mn-n small{font-size:11px;color:var(--text-3)}\n.mnt td.ac{font-weight:700;font-size:12px;min-width:30px}\n.ac.a-P{color:var(--ok)}\n.ac.a-A{background:var(--danger-bg);color:var(--danger)}\n.ac.a-L{background:var(--info-bg);color:var(--info)}\n.ac.a-h{background:var(--warn-bg);color:var(--warn)}\n.ac.a-H{background:#EDE7FB;color:#5A3AA0}\n.ac.a-W{color:var(--text-3);background:var(--surface-2)}\n.ac.a-U{color:var(--text-3)}\n:host([data-theme=dark]) .ac.a-H{background:#2A2145;color:#C9B8F2}\n.mnt td.tot{font-weight:700;padding:0 10px;background:var(--surface-2)}\n.mnt td.tot.bad{color:var(--danger)}\n.ph2{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:12px}\n.ph2 h2{margin:0;font-size:18px}\n.ph2 .sub{margin:4px 0 0;font-size:13.5px;color:var(--text-3);max-width:640px}\n.slrow{display:grid;grid-template-columns:minmax(0,1.6fr) 95px 85px 95px 85px 105px 130px 110px;gap:10px;align-items:center;padding:11px 16px;border-top:1px solid var(--border);font-variant-numeric:tabular-nums}\n.slh{background:var(--surface-2);font-size:12px;font-weight:600;color:var(--text-3);border-top:0}\n.slrow .r{text-align:right}\n.slrow .neg{color:var(--danger)}\n.slrow .lm{display:none}\n.sl-n{border:0;background:none;padding:0;text-align:left;font:inherit;color:inherit;cursor:pointer}\n.sl-n b{display:block;font-weight:600}\n.sl-n small{font-size:12px;color:var(--text-3)}\n.sl-n:hover b{color:var(--accent-text);text-decoration:underline}\n.sl-net b{font-size:15px}\n.sl-when{display:block;font-size:11.5px;color:var(--text-3);margin-top:2px}\n.sl-a{text-align:right}\n.sltot{background:var(--surface-2);font-weight:600}\n@media (max-width:1100px){.slh{display:none}\n.slrow{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px 12px}\n.sl-n{grid-column:1/-1}\n.slrow .r{text-align:left}\n.slrow .lm{display:block;font-size:11.5px;color:var(--text-3);font-weight:600}\n.sl-a{grid-column:1/-1}\n.sl-a .btn{width:100%}\n.sltot{display:flex;justify-content:space-between}\n.sltot>span:empty{display:none}}\n.sdw{display:flex;flex-direction:column;gap:14px}\n.sdpick{max-width:420px}\n.sdg{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:18px;align-items:start}\n@media (max-width:1000px){.sdg{grid-template-columns:minmax(0,1fr)}}\n.sdg .setc-h{align-items:center}\n.sdg .setc-h>div{flex:1}\n.sdc{display:grid;grid-template-columns:1fr 1fr;gap:16px}\n@media (max-width:600px){.sdc{grid-template-columns:1fr}}\n.sdc h3{font-size:13px;color:var(--text-3);margin:0 0 6px;text-transform:uppercase;letter-spacing:.05em}\n.sdr{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px dashed var(--border);font-size:14px}\n.sdr span{color:var(--text-2)}\n.sdr.neg b{color:var(--danger)}\n.sdnet{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-radius:12px;background:var(--accent-soft);border:1.5px solid var(--primary)}\n.sdnet b{font-size:24px;color:var(--accent-text)}\n.sdmini{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}\n.sdmini div{border-radius:10px;padding:10px;text-align:center;background:var(--surface-2)}\n.sdmini b{display:block;font-size:22px}\n.sdmini span{font-size:12px}\n.sdmini .a-P{background:var(--ok-bg);color:var(--ok)}\n.sdmini .a-h{background:var(--warn-bg);color:var(--warn)}\n.sdmini .a-L{background:var(--info-bg);color:var(--info)}\n.sdmini .a-A{background:var(--danger-bg);color:var(--danger)}\n.hdate{width:46px;height:50px;border-radius:10px;background:var(--accent-soft);color:var(--accent-text);display:flex;flex-direction:column;align-items:center;justify-content:center;flex:none;line-height:1.1}\n.hdate b{font-size:18px}\n.hdate small{font-size:11px}\n.iss.hpast{opacity:.55}\n.acg{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:16px}\n@media (max-width:1000px){.acg{grid-template-columns:minmax(0,1fr)}}\n.aclg{display:flex;gap:6px;align-items:center;font-size:12.5px;color:var(--text-3)}\n.aclg i{width:10px;height:10px;border-radius:3px;display:inline-block}\n.aclg i.in,.acb-s i.in{background:var(--primary)}\n.aclg i.out,.acb-s i.out{background:#E0A43B}\n.aclg i.out{margin-left:8px}\n.acbars{display:flex;align-items:flex-end;gap:3px;height:200px;padding:8px 2px 0}\n.acb{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;min-width:0}\n.acb-s{flex:1;width:100%;display:flex;align-items:flex-end;justify-content:center;gap:1px}\n.acb-s i{display:block;width:45%;max-width:14px;border-radius:3px 3px 0 0;min-height:1px}\n.acb span{font-size:10.5px;color:var(--text-3);height:14px;white-space:nowrap}\n.acm{margin-bottom:12px}\n.acm-h{display:flex;justify-content:space-between;font-size:14px}\n.acm .sbbar{margin:6px 0 0}\n.acr{display:grid;grid-template-columns:140px minmax(0,1.5fr) minmax(0,1fr) 110px 120px;gap:10px;align-items:center;padding:10px 16px;border-top:1px solid var(--border);font-size:14px}\n.acr.ach{background:var(--surface-2);font-size:12px;font-weight:600;color:var(--text-3);border-top:0}\n.acr .r{text-align:right}\n.acr4{grid-template-columns:80px minmax(0,1.6fr) 110px 110px}\n.acr .pos{color:var(--ok)}\n.acr .neg{color:var(--danger)}\n@media (max-width:800px){.acr.ach{display:none}\n.acr,.acr4{grid-template-columns:minmax(0,1fr) auto;gap:2px 10px}\n.acr>span:nth-child(1){grid-column:1/-1;font-size:12px}\n.acr>span:last-child{grid-column:2;grid-row:2}}\n.acx{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:18px;align-items:start}\n@media (max-width:1000px){.acx{grid-template-columns:minmax(0,1fr)}}\n.exby{display:flex;flex-wrap:wrap;gap:8px;padding:12px 16px;border-top:1px solid var(--border)}\n.exby span{font-size:12.5px;background:var(--surface-2);border-radius:8px;padding:6px 10px;color:var(--text-2)}\n.exby b{display:block;font-size:14px;color:var(--text)}\n.au-bill tr.plnet td{font-size:16px}\n.drrow{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-radius:10px;background:var(--surface-2);font-weight:600}\n.wa-ph{border-radius:22px;overflow:hidden;border:8px solid #1f2a26;max-width:380px;justify-self:center;width:100%;box-shadow:var(--shadow-lg)}\n.wa-top{background:#075E54;color:#fff;padding:12px 14px;font-weight:700;display:flex;gap:8px;align-items:center}\n.wa-body{background:#ECE5DD;padding:16px 12px;min-height:360px}\n.wa-msg{background:#fff;border-radius:0 10px 10px 10px;padding:10px 12px 18px;font-size:13.5px;line-height:1.55;color:#111;position:relative;box-shadow:0 1px 1px rgba(0,0,0,.12);font-family:inherit}\n.wa-t{position:absolute;right:8px;bottom:3px;font-size:10.5px;color:#7b8a84}\n.rtrow{display:grid;grid-template-columns:minmax(0,1fr) 150px auto;gap:10px;align-items:center;padding:8px 0;border-bottom:1px dashed var(--border)}\n.rtrow b{display:block}\n.rtrow small{font-size:12.5px;color:var(--text-3)}\n.dpw{display:grid;grid-template-columns:320px minmax(0,1fr);gap:18px;align-items:start}\n@media (max-width:1000px){.dpw{grid-template-columns:minmax(0,1fr)}}\n.dpl{padding:10px;position:sticky;top:84px;max-height:calc(100vh - 110px);overflow:auto}\n@media (max-width:1000px){.dpl{position:static;max-height:none}}\n.dpg{margin-bottom:12px}\n.dpg h3{font-size:13px;font-weight:700;color:var(--text-2);margin:6px 6px 2px;display:flex;gap:6px;align-items:center}\n.dpg h3 span{font-size:11.5px;background:var(--surface-3);border-radius:99px;padding:0 7px;color:var(--text-3)}\n.dpg>p{font-size:12px;color:var(--text-3);margin:0 6px 6px}\n.dpi{display:flex;gap:10px;align-items:center;width:100%;min-height:58px;padding:8px;border-radius:10px;border:1.5px solid transparent;background:none;text-align:left;font:inherit;color:inherit;cursor:pointer}\n.dpi:hover{background:var(--surface-2)}\n.dpi.on{border-color:var(--primary);background:var(--accent-soft)}\n.dpi .tt{flex:1;min-width:0}\n.dpi b{display:block;font-weight:600;font-size:14px}\n.dpi small{display:block;font-size:12px;color:var(--text-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.dpr{display:flex;flex-direction:column;gap:16px;min-width:0}\n.dped .setc-h{align-items:center}\n.dped .setc-h>div{flex:1}\n.dpaper{background:#fff;color:#14201b;border-radius:6px;box-shadow:0 2px 14px rgba(0,0,0,.12);padding:26px 28px;border:1px solid var(--border)}\n@media (max-width:600px){.dpaper{padding:16px 14px}}\n.ds{font-size:12.5px;line-height:1.5;color:#14201b}\n.ds-h{display:flex;justify-content:space-between;gap:12px;border-bottom:2.5px solid #12976A;padding-bottom:10px;margin-bottom:12px;flex-wrap:wrap}\n.ds-l{display:flex;gap:10px}\n.ds-l b{display:block;font-size:17px;color:#0b4f3a}\n.ds-l span{display:block;font-size:11.5px;color:#5b6b64}\n.ds .bp-sq{width:32px;height:32px;border-radius:9px;background:#1BB880;display:grid;place-items:center;flex:none}\n.ds .bp-sq i{width:12px;height:12px;border-radius:50%;border:3px solid #fff;display:block}\n.ds-r{text-align:right}\n.ds-r b{display:block;font-size:15px;letter-spacing:.06em;color:#12976A;font-family:\"IBM Plex Sans\",Arial,sans-serif}\n.ds-r span{font-size:12px;color:#5b6b64}\n.ds-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px 14px;padding:10px 12px;background:#F4F8F6;border:1px solid #DCE6E1;border-radius:6px;margin-bottom:10px}\n.ds-g div span{display:block;font-size:10.5px;color:#5b6b64;text-transform:uppercase;letter-spacing:.04em}\n.ds-g div b{font-weight:600;font-size:12.5px}\n.ds-g small{font-weight:400;color:#5b6b64}\n@media (max-width:700px){.ds-g{grid-template-columns:repeat(2,minmax(0,1fr))}}\n.dsred{color:#B42318}\n.ds-s{padding:8px 0;border-bottom:1px solid #E3E8E5}\n.ds-s h4{margin:0 0 3px;font-size:11.5px;color:#0b4f3a;text-transform:uppercase;letter-spacing:.05em}\n.ds-s p{margin:0 0 2px}\n.ds-s ul{margin:0;padding-left:18px}\n.ds-s table{width:100%;border-collapse:collapse}\n.ds-s td{padding:4px 6px;border:1px solid #E3E8E5;vertical-align:top}\n.ds-s td span{display:block;font-size:10.5px;color:#5b6b64}\n.ds-s td b{color:#B42318}\n.ds-s td small{display:block;font-size:10px;color:#8a978f}\n.ds-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}\n.ds-warn{margin:10px 0;padding:8px 10px;border:1px solid #F3B9B9;background:#FDF1F1;border-radius:6px;color:#9B1C1C}\n.ds-warn b{display:block}\n.ds-warn .ic{width:14px;height:14px;vertical-align:-2px}\n.ds-sig{display:flex;justify-content:space-between;gap:20px;margin-top:34px}\n.ds-sig div{flex:1;max-width:240px;border-top:1px solid #8a978f;padding-top:4px;text-align:center;font-weight:600;position:relative}\n.ds-sig img{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);max-height:48px}\n.ds-sig small{display:block;font-weight:400;color:#5b6b64}\n@media print{.ds-g{grid-template-columns:repeat(4,1fr)}}\n.rcprev{border:1px solid var(--border);border-radius:10px;overflow:hidden;background:#eee}\n.rcprev iframe{width:100%;height:560px;border:0;display:block;background:#fff}\n.hpg{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:18px}\n.hpi{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:8px;padding:16px;min-height:150px;border-radius:14px;border:1.5px solid var(--border-strong);background:var(--surface);text-align:left;font:inherit;color:inherit;cursor:pointer}\n.hpi:hover{border-color:var(--primary);background:var(--accent-soft)}\n.hpi b{font-size:15.5px;line-height:1.35}\n.hpi small{font-size:12.5px;color:var(--text-3);margin-top:auto}\n.hpnum{position:absolute;top:12px;right:14px;font-size:12px;font-weight:700;color:var(--text-3)}\n.hpback{display:inline-flex;gap:4px;align-items:center;margin-bottom:6px;font-weight:600}\n.hps{list-style:none;margin:0 0 18px;padding:0;display:flex;flex-direction:column;gap:12px}\n.hps li{display:grid;grid-template-columns:44px minmax(0,1fr) 300px;gap:16px;align-items:center;padding:16px}\n@media (max-width:800px){.hps li{grid-template-columns:40px minmax(0,1fr)}\n.hps .hm{grid-column:1/-1}}\n.hpn{width:40px;height:40px;border-radius:50%;background:var(--primary);color:var(--on-primary);display:grid;place-items:center;font-weight:800;font-size:17px}\n.hpt p{margin:4px 0 0;font-size:15px;line-height:1.55}\n.hm{position:relative;border-radius:12px;background:var(--surface-2);border:1px solid var(--border);padding:12px;min-height:76px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}\n.hm-nav{flex-direction:column;align-items:stretch;background:#0b3d2e;border-color:#0b3d2e;gap:4px}\n.hm-nav span{display:flex;gap:8px;align-items:center;font-size:12.5px;color:#cfe7dc;padding:6px 8px;border-radius:7px}\n.hm-nav span.on{background:#C9A14A;color:#1B1405;font-weight:700}\n:host([data-skin]) :not([data-skin=emerald]) .hm-nav span.on{background:var(--primary);color:var(--on-primary)}\n.hm-b{display:inline-flex;align-items:center;gap:6px;padding:10px 16px;border-radius:9px;background:var(--primary);color:var(--on-primary);font-weight:700;font-size:13.5px}\n.hm-sq{padding:8px 12px;background:var(--surface);color:var(--text);border:1px solid var(--border)}\n.hm-tabs span{font-size:12.5px;padding:6px 10px;border-radius:7px;color:var(--text-3)}\n.hm-tabs span.on{background:var(--surface);color:var(--accent-text);font-weight:700;box-shadow:inset 0 -2px 0 var(--primary)}\n.hm-row{background:var(--surface)}\n.hm-row b{display:block;font-size:13.5px}\n.hm-row small{font-size:11.5px;color:var(--text-3)}\n.hm-av{width:32px;height:32px;border-radius:50%;background:#FCE7C8;color:#7A4A10;display:grid;place-items:center;font-weight:700}\n.hm-box{color:var(--accent-text)}\n.hm-box span{flex:1;height:10px;border-radius:99px;background:var(--surface-3)}\n.hm-box span+span{flex:.6}\n.hm-tap{position:absolute;right:14px;bottom:10px;width:24px;height:24px;border-radius:50%;background:rgba(229,72,77,.25);border:2px solid #E5484D;animation:tap 1.6s ease-in-out infinite}\n@keyframes tap{0%,100%{transform:scale(.8);opacity:.9}50%{transform:scale(1.15);opacity:.5}}\n@media (prefers-reduced-motion:reduce){.hm-tap{animation:none}}\n.hpc{margin-top:6px}\n@media (max-width:600px){.skk{padding:14px 12px;gap:10px}\n.skk .ki{display:none}\n.skk b{font-size:19px;overflow-wrap:anywhere}}";
var SKEL="\n<a class=\"skip\" href=\"#main\" id=\"skipLink\">Skip</a>\n<div class=\"app\">\n  <aside class=\"sidebar\" id=\"sidebar\"></aside>\n  <div class=\"main-col\">\n    <header class=\"appbar\" id=\"appbar\"></header>\n    <main id=\"main\" tabindex=\"-1\"></main>\n  </div>\n</div>\n<nav class=\"bottomnav\" id=\"bottomnav\"></nav>\n<div class=\"scrim\" id=\"scrim\"></div>\n<aside class=\"drawer\" id=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"dTitle\" hidden></aside>\n<div class=\"modal-wrap\" id=\"modalWrap\" hidden><div class=\"modal\" id=\"modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"mTitle\"></div></div>\n<div class=\"toasts\" id=\"toasts\" role=\"status\" aria-live=\"polite\"></div>\n<iframe id=\"printFrame\" title=\"bill\" aria-hidden=\"true\" tabindex=\"-1\" style=\"position:fixed;width:0;height:0;border:0;right:0;bottom:0;visibility:hidden\"></iframe>\n\n";
var AuraUI = window.AuraUI = window.AuraUI || {};
AuraUI.mounted = false;
(function () {
  if (document.getElementById('aura-ui-page-css')) return;
  var st = document.createElement('style'); st.id = 'aura-ui-page-css';
  st.textContent = 'body.aura-ui-on #app-shell{display:none!important}'
    + 'body.aura-ui-on{background:#f6f7f5}'
    + 'body.aura-ui-on .mod-ov{z-index:1000!important}'
    + 'body.aura-ui-on .ap-ov,body.aura-ui-on .as-ov,body.aura-ui-on .aura-tp-ov{z-index:1001!important}'
    + 'body.aura-ui-on .toast,body.aura-ui-on #nh-toast{z-index:1002!important}'
    + '#aura-ui{display:block}'
    + '#aura-ui>.aui-lg{display:flex!important;flex-direction:column;gap:16px;font-family:"IBM Plex Sans","Noto Sans Bengali",system-ui,sans-serif;font-size:14.5px;color:var(--text-primary,#18170f);min-width:0}'
    + '#aura-ui>.aui-lg:not([slot]){display:none!important}'
    + '#aura-ui>.aui-lg>.sh{display:none!important}'
    + '#aura-ui>.aui-lg .panel{border-radius:16px}'
    + '#aura-ui>.aui-only>*{display:none!important}#aura-ui>.aui-only>#sb-panel{display:block!important}'
    + '#aura-ui>#v-dashboard.aui-lg .dash-tab:first-child,#aura-ui>#v-dashboard.aui-lg #dtab-overview{display:none!important}'
    + '#aura-ui>#v-patients.aui-lg #pv-all,#aura-ui>#v-patients.aui-lg #pv-fam{display:none!important}'
    + '.aura-ui-back{position:fixed;right:14px;bottom:84px;z-index:90;border:0;border-radius:999px;padding:11px 16px;font:600 13px/1 system-ui,sans-serif;background:#0b4f3a;color:#fff;box-shadow:0 6px 18px rgba(0,0,0,.2);cursor:pointer}'
    + '@media(min-width:900px){.aura-ui-back{bottom:20px}}'
    + 'html:has(body.aura-ui-on){overflow-y:scroll;scrollbar-width:auto;scrollbar-color:#9db3a9 #eef2f0}'
    + 'html:has(body.aura-ui-on)::-webkit-scrollbar{width:14px;height:14px}'
    + 'html:has(body.aura-ui-on)::-webkit-scrollbar-track{background:#eef2f0}'
    + 'html:has(body.aura-ui-on)::-webkit-scrollbar-thumb{background:#9db3a9;border-radius:10px;border:3px solid #eef2f0;min-height:56px}'
    + 'html:has(body.aura-ui-on)::-webkit-scrollbar-thumb:hover{background:#6f8d80}'
    + 'html[data-theme=dark]:has(body.aura-ui-on){scrollbar-color:#3d5a4e #0c1511}'
    + 'html[data-theme=dark]:has(body.aura-ui-on)::-webkit-scrollbar-track{background:#0c1511}'
    + 'html[data-theme=dark]:has(body.aura-ui-on)::-webkit-scrollbar-thumb{background:#3d5a4e;border-color:#0c1511}';
  (document.head || document.documentElement).appendChild(st);
})();
AuraUI.want = function () { try { sessionStorage.removeItem('aura-ui-classic'); } catch (e) {} return true; };
AuraUI.unmount = function (classic) {
  var h = document.getElementById('aura-ui'); if (h) h.remove();
  document.body.classList.remove('aura-ui-on'); document.documentElement.style.overflow = '';
  AuraUI.mounted = false;
  if (classic) {
    try { sessionStorage.setItem('aura-ui-classic', '1'); } catch (e) {}
    try { if (typeof window.nav === 'function') window.nav('dashboard'); else if (typeof window.loadDashboard === 'function') window.loadDashboard(); } catch (e) {}
    if (!document.getElementById('aura-ui-back')) {
      var b = document.createElement('button'); b.id = 'aura-ui-back'; b.className = 'aura-ui-back'; b.type = 'button';
      b.textContent = '\u2728 ' + (((localStorage.getItem('aurascale_lang') || 'bn') === 'bn') ? 'নতুন ডিজাইনে ফিরুন' : 'Back to the new design');
      b.onclick = function () { try { sessionStorage.removeItem('aura-ui-classic'); } catch (e) {} b.remove(); AuraUI.mount(AuraUI.last); };
      document.body.appendChild(b);
    }
  }
};
AuraUI.mount = function (LIVE) {
  if (AuraUI.mounted) return true;
  AuraUI.last = LIVE || AuraUI.last || null;
  var ob = document.getElementById('aura-ui-back'); if (ob) ob.remove();
  if (!AuraUI.toastHooked && typeof window.showToast === 'function') {
    AuraUI.toastHooked = true; var _st = window.showToast;
    window.showToast = function (m) { if (AuraUI.mounted && AuraUI.toast) { try { AuraUI.toast(m); return; } catch (e) {} } return _st.apply(this, arguments); };
  }
  var host = document.createElement('div');
  host.id = 'aura-ui';
  document.body.appendChild(host);
  var root = host.attachShadow({ mode: 'open' });
  var st = document.createElement('style'); st.textContent = CSS; root.appendChild(st);
  var app = document.createElement('div'); app.className = 'aui-root'; app.innerHTML = SKEL; root.appendChild(app);
  var BODY = {
    classList: {
      add: function (c) { host.classList.add(c); if (c === 'locked') document.documentElement.style.overflow = 'hidden'; },
      remove: function (c) { host.classList.remove(c); if (c === 'locked') document.documentElement.style.overflow = ''; },
      contains: function (c) { return host.classList.contains(c); },
      toggle: function (c, on) { return host.classList.toggle(c, on); }
    },
    insertAdjacentHTML: function (p, h) { app.insertAdjacentHTML(p, h); },
    appendChild: function (e) { return app.appendChild(e); }
  };
  document.body.classList.add('aura-ui-on');
  AuraUI.host = host; AuraUI.root = root;
  AuraUI.mounted = true;
  RUN(root, host, BODY, LIVE || null);
  /* old screens' colours follow the new design's light / dark */
  var syncTh = function () { var th = host.dataset.theme === 'dark' ? 'dark' : 'light', d = document.documentElement; d.setAttribute('data-theme', th); d.setAttribute('data-aura-base', th); d.removeAttribute('data-aura-theme'); d.setAttribute('data-aura-side', th); };
  new MutationObserver(syncTh).observe(host, { attributes: true, attributeFilter: ['data-theme'] }); syncTh();
  /* when a window from the old screens closes (it may have saved something), refresh the numbers */
  var rlT = null, rl = function () { clearTimeout(rlT); rlT = setTimeout(function () { if (AuraUI.mounted && AuraUI.reload) AuraUI.reload(); }, 700); };
  new MutationObserver(function (ms) {
    for (var i = 0; i < ms.length; i++) { var m = ms[i];
      if (m.type === 'attributes' && m.target.classList && m.target.classList.contains('mod-ov') && /\bopen\b/.test(m.oldValue || '') && !m.target.classList.contains('open')) { rl(); return; }
      if (m.type === 'childList') for (var j = 0; j < m.removedNodes.length; j++) { var n = m.removedNodes[j]; if (n.nodeType === 1 && (n.id === 'as-claims' || /\b(as-ov|ap-ov)\b/.test(n.className || ''))) { rl(); return; } }
    }
  }).observe(document.body, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['class'], childList: true });
  return true;
};

function RUN(ROOT, HOST, BODY, LIVE){


/* =========================================================
   AuraScale OS — Nursing Home Portal (clickable prototype)
   All names, numbers and licence IDs are fictional sample data.
   ========================================================= */

const S = { role:'owner', ordTab:'test', lang:'bn', view:'dashboard', bedFilter:'all', billFilter:'all', billQuery:'', drawer:null, modal:null, loading:true };
const $ = id => ROOT.getElementById(id);
const DAY = 864e5;
const TODAY = new Date(); TODAY.setHours(12,0,0,0);
const dateAgo = n => new Date(TODAY.getTime() - n*DAY);
const dateIn  = n => new Date(TODAY.getTime() + n*DAY);

/* ---------- i18n ---------- */
const T = {
  appSub:['নার্সিং হোম পোর্টাল','Nursing Home Portal'],
  skip:['মূল অংশে যান','Skip to content'],
  navHome:['হোম','Home'], navBeds:['বেড ম্যাপ','Bed map'], navBilling:['বিলিং','Billing'], navCompliance:['লাইসেন্স','Licences'], navAdmit:['ভর্তি','Admit'],
  menu:['মেনু','Menu'],
  newAdmission:['নতুন ভর্তি','New admission'], recordPayment:['টাকা জমা নিন','Record payment'], addCharge:['খরচ যোগ করুন','Add charge'], discharge:['ছুটি দিন','Discharge'],
  greetMorning:['সুপ্রভাত','Good morning'], greetAfternoon:['শুভ দুপুর','Good afternoon'], greetEvening:['শুভ সন্ধ্যা','Good evening'],
  homeName:['শান্তি সেবা নার্সিং হোম','Shanti Seva Nursing Home'], homeTown:['বিষ্ণুপুর, বাঁকুড়া · ৩০ বেড','Bishnupur, Bankura · 30 beds'],
  ownerName:['ডা. সুব্রত মণ্ডল','Dr. Subrata Mondal'], ownerShort:['ডা. সুব্রত','Dr. Subrata'], ownerRole:['মালিক','Owner'],
  dashSub:['আজকের টাকা, বেড আর সমস্যা — এক নজরে','Money, beds and problems — at a glance'],
  bedsUsed:['বেড ব্যবহৃত','Beds in use'], bedsFreeN:['{n}টি খালি','{n} free'], occPct:['{n}% ভর্তি','{n}% occupied'],
  todayInOut:['আজ ভর্তি ও ছুটি','Today in & out'], admissions:['ভর্তি','Admitted'], discharges:['ছুটি','Discharged'],
  todayCollection:['আজকের আদায়','Today’s collection'], totalDues:['মোট বকেয়া','Total dues'], duesFrom:['{n} জন রোগীর কাছে','from {n} patients'], overdueN:['{n} জন জরুরি','{n} overdue'],
  cash:['নগদ','Cash'], upi:['ইউপিআই','UPI'], card:['কার্ড','Card'],
  revenue7:['গত ৭ দিনের আদায়','Collections, last 7 days'], weekTotal:['সপ্তাহে মোট','Week total'], vsAvg:['গড়ের চেয়ে {n}% বেশি','{n}% above average'], vsAvgLow:['গড়ের চেয়ে {n}% কম','{n}% below average'],
  alerts:['সতর্কতা','Alerts'], alertsClear:['কোনো সতর্কতা নেই — সব ঠিক আছে','No alerts — all clear'],
  alertDues:['{name} — {amt} বকেয়া','{name} owes {amt}'], alertDuesSub:['বেড {bed} · {d} ভর্তি','Bed {bed} · admitted {d}'],
  alertLic:['{name} — {d} দিনে মেয়াদ শেষ','{name} expires in {d} days'], alertLicSub:['শেষ তারিখ {date} · নবীকরণ শুরু করুন','Due {date} · start renewal'],
  alertDis:['{name} — ছুটির পরেও {amt} বাকি','{name} left with {amt} unpaid'], alertDisSub:['{when} ছুটি · পরিবারকে ফোন করুন','Discharged {when} · call the family'],
  alertClean:['{n}টি বেড পরিষ্কারের অপেক্ষায়','{n} beds waiting for cleaning'], alertCleanSub:['পরিষ্কার হলে বেড ম্যাপে খালি করুন','Mark them free on the bed map'],
  viewAll:['সব দেখুন','View all'], byWard:['ওয়ার্ড অনুযায়ী বেড','Beds by ward'], recentPay:['সাম্প্রতিক জমা','Recent payments'],
  fictional:['নমুনা তথ্য — সব নাম, ফোন নম্বর ও লাইসেন্স কাল্পনিক','Sample data — all names, phone numbers and licences are fictional'],
  wG:['জেনারেল ওয়ার্ড','General ward'], wF:['মহিলা ওয়ার্ড','Female ward'], wM:['প্রসূতি ওয়ার্ড','Maternity ward'], wI:['আইসিইউ / এইচডিইউ','ICU / HDU'],
  sfree:['খালি','Free'], socc:['রোগী আছে','Occupied'], sclean:['পরিষ্কার হচ্ছে','Cleaning'], sres:['সংরক্ষিত','Reserved'], all:['সব','All'],
  bedsTitle:['বেড ম্যাপ','Bed map'], bedsSub:['বেডে চাপ দিন — রোগী দেখতে বা নতুন রোগী ভর্তি করতে','Tap a bed to open the patient or admit someone'],
  admitHere:['ভর্তি করুন','Admit'], wardOcc:['{a} / {b} ব্যবহৃত','{a} of {b} in use'], dueFlag:['বকেয়া','Dues'],
  emptyBeds:['এই অবস্থায় কোনো বেড নেই','No beds in this state'], emptyBedsSub:['অন্য ফিল্টার বেছে নিন','Pick another filter'],
  bedN:['বেড {bed}','Bed {bed}'], cleanQ:['পরিষ্কার হয়ে গেলে বেডটি খালি করুন, তাহলে নতুন রোগী ভর্তি করা যাবে।','Once cleaned, mark the bed free so it can take a new patient.'],
  markFree:['খালি করুন','Mark free'], bedFreed:['বেড {bed} এখন খালি','Bed {bed} is now free'],
  reservedFor:['{name}-এর জন্য সংরক্ষিত','Reserved for {name}'], admitNow:['এখনই ভর্তি করুন','Admit now'], cancelRes:['সংরক্ষণ বাতিল','Cancel reservation'], resCancelled:['বেড {bed}-এর সংরক্ষণ বাতিল হয়েছে','Reservation on bed {bed} cancelled'],
  yrs:['{n} বছর','{n} yrs'], male:['পুরুষ','Male'], female:['মহিলা','Female'], otherSex:['অন্যান্য','Other'],
  phone:['ফোন','Phone'], familyPhone:['পরিবারের ফোন','Family phone'], doctor:['ভর্তি করেছেন','Admitting doctor'], admittedOn:['ভর্তির তারিখ','Admitted on'], daysAdmitted:['কত দিন','Days admitted'], reason:['ভর্তির কারণ','Reason'], dischargedOn:['ছুটির তারিখ','Discharged on'],
  charges:['খরচের তালিকা','Charges'], payments:['জমা হয়েছে','Payments received'], totalBill:['মোট বিল','Total bill'], paid:['জমা','Paid'], balance:['বাকি','Balance'], noPayments:['এখনও কোনো টাকা জমা হয়নি','No payments yet'],
  cbed:['বেড ভাড়া','Bed charges'], cmed:['ওষুধ','Medicine'], ctest:['পরীক্ষা','Tests'], cvisit:['ডাক্তার ভিজিট','Doctor visits'], cot:['ওটি (অপারেশন)','OT (operation)'], cother:['অন্যান্য','Other'],
  disTag:['ছুটি হয়েছে','Discharged'], close:['বন্ধ করুন','Close'], today:['আজ','today'], todayCap:['আজ','Today'], yesterday:['গতকাল','yesterday'], daysAgo:['{n} দিন আগে','{n} days ago'], admittedToday:['আজ ভর্তি','Admitted today'],
  billingTitle:['বিলিং','Billing'], billingSub:['কার কত বাকি, এক জায়গায়','Who owes what, in one place'], search:['নাম, ফোন বা বেড লিখে খুঁজুন','Search name, phone or bed'],
  stpaid:['পুরো জমা','Paid'], stpartial:['আংশিক জমা','Partly paid'], stpending:['জমা হয়নি','Pending'], stoverdue:['জরুরি বকেয়া','Overdue'],
  billed:['মোট বিল','Billed'], collected:['আদায়','Collected'], duesShort:['বকেয়া','Dues'], patient:['রোগী','Patient'], status:['অবস্থা','Status'],
  emptyBills:['কোনো বিল পাওয়া যায়নি','No bills found'], emptyBillsSub:['অন্য নাম লিখে দেখুন বা ফিল্টার মুছুন','Try another name or clear the filter'], clearFilter:['ফিল্টার মুছুন','Clear filter'], paidUp:['পুরো জমা হয়েছে','Paid up'],
  amount:['টাকার পরিমাণ','Amount'], payMethod:['কীভাবে দিলেন?','Paid by'], refNo:['রেফারেন্স নম্বর','Reference no.'], optional:['(ঐচ্ছিক)','(optional)'], fullBal:['পুরো বাকি','Full balance'],
  saveAmt:['{amt} জমা করুন','Save {amt}'], paySaved:['{amt} জমা হয়েছে — {name}','{amt} received from {name}'], choosePatient:['কার টাকা জমা নিচ্ছেন?','Whose payment is this?'], choosePatientSub:['যাঁদের টাকা বাকি আছে','Patients with a balance'],
  errAmt:['সঠিক টাকার পরিমাণ লিখুন','Enter a valid amount'], errMore:['বাকি টাকার চেয়ে বেশি হয়ে যাচ্ছে','That’s more than the balance due'], cancel:['বাতিল','Cancel'], noDues:['কারও টাকা বাকি নেই','Nobody owes anything'],
  chargeFor:['কী বাবদ খরচ?','Charge for'], note:['বিবরণ','Note'], notePh:['যেমন: এক্স-রে, স্যালাইন','e.g. X-ray, saline'], chargeSaved:['{amt} খরচ যোগ হয়েছে — {name}','{amt} charge added for {name}'],
  admTitle:['নতুন রোগী ভর্তি','Admit a patient'], stepOf:['ধাপ {n} / ৩ · {name}','Step {n} of 3 · {name}'], stepPatient:['রোগীর তথ্য','Patient'], stepFamily:['পরিবার ও ডাক্তার','Family & doctor'], stepBed:['বেড বেছে নিন','Choose bed'],
  pPhone:['রোগীর মোবাইল নম্বর','Patient mobile'], pName:['রোগীর পুরো নাম','Patient full name'], pNamePh:['যেমন: সুমিতা ঘোষ','e.g. Sumita Ghosh'], pAge:['বয়স (বছর)','Age (years)'], pSex:['লিঙ্গ','Sex'],
  fPhone:['পরিবারের একজনের মোবাইল','Family member’s mobile'], fPhoneHint:['বিল ও ছুটির খবর এই নম্বরে যাবে','Bills and discharge updates go to this number'], relation:['রোগীর কে হন?','Relation to patient'],
  rson:['ছেলে','Son'], rdaughter:['মেয়ে','Daughter'], rhusband:['স্বামী','Husband'], rwife:['স্ত্রী','Wife'], rparent:['বাবা / মা','Parent'], rother:['অন্য','Other'],
  admDoctor:['কোন ডাক্তার ভর্তি করছেন?','Admitting doctor'], reasonOpt:['ভর্তির কারণ','Reason for admission'], reasonPh:['যেমন: জ্বর, প্রসব, অপারেশন','e.g. fever, delivery, surgery'],
  chooseBed:['একটি খালি বেড বেছে নিন','Pick a free bed'], perDay:['{amt}/দিন','{amt}/day'], advance:['অগ্রিম জমা','Advance payment'],
  next:['পরবর্তী','Next'], back:['পিছনে','Back'], admitBtn:['ভর্তি করুন','Admit patient'],
  errName:['রোগীর নাম লিখুন','Enter the patient’s name'], errAge:['সঠিক বয়স লিখুন','Enter a valid age'], errSex:['লিঙ্গ বেছে নিন','Choose sex'], errPhone:['১০ সংখ্যার মোবাইল নম্বর লিখুন','Enter a 10-digit mobile number'], errBed:['একটি বেড বেছে নিন','Choose a bed'],
  admitted:['{name} বেড {bed}-এ ভর্তি হয়েছেন','{name} admitted to bed {bed}'], view:['দেখুন','View'], noFreeBeds:['এই মুহূর্তে কোনো খালি বেড নেই','No free beds right now'], noFreeBedsSub:['পরিষ্কার হওয়া বেড বেড ম্যাপে খালি করুন','Mark cleaned beds free on the bed map'],
  disTitle:['ছুটি দেওয়া','Discharge'], disStep1:['ধাপ ১ / ৩ · নিশ্চিত করুন','Step 1 of 3 · Confirm'], disStep2:['ধাপ ২ / ৩ · চূড়ান্ত বিল','Step 2 of 3 · Final bill'], disStep3:['ধাপ ৩ / ৩ · সম্পূর্ণ','Step 3 of 3 · Done'],
  chkTitle:['ছুটির আগে দেখে নিন','Before discharge'], chk1:['ওষুধ ও প্রেসক্রিপশন দেওয়া হয়েছে','Medicines & prescription handed over'], chk2:['ডিসচার্জ সামারি দেওয়া হয়েছে','Discharge summary given'], chk3:['রোগীর জিনিসপত্র ফেরত দেওয়া হয়েছে','Belongings returned'],
  finalBill:['চূড়ান্ত বিল','Final bill'], duesWarn:['{amt} এখনও বাকি','{amt} still due'], duesWarnSub:['এখন জমা নিন, অথবা বকেয়া রেখে ছুটি দিন — বকেয়া বিলিং তালিকায় থাকবে।','Collect now, or discharge with dues — it stays on the billing list.'],
  fullyPaid:['সব টাকা জমা হয়েছে','Fully paid'], fullyPaidSub:['বিল পরিষ্কার — ছুটি দেওয়া যাবে','Bill is clear — ready to discharge'],
  withDues:['বকেয়া রেখে ছুটি','Discharge with dues'], collectDis:['{amt} জমা নিয়ে ছুটি','Collect {amt} & discharge'],
  disDone:['{name}-এর ছুটি সম্পূর্ণ','{name} has been discharged'], disDoneSub:['বেড {bed} পরিষ্কারের তালিকায় গেছে','Bed {bed} moved to cleaning'], downloadBill:['বিল ডাউনলোড (PDF)','Download bill (PDF)'], done:['ঠিক আছে','Done'],
  billPreparing:['বিল তৈরি হচ্ছে — প্রিন্ট উইন্ডোতে “Save as PDF” বেছে নিন','Preparing bill — choose “Save as PDF” in the print window'], billBlocked:['এই প্রিভিউতে প্রিন্ট বন্ধ — ফাইলটি ব্রাউজারে খুলে চেষ্টা করুন','Printing is blocked in this preview — open the file in a browser'],
  billTitle:['চূড়ান্ত বিল','Final bill'], billNo:['বিল নং','Bill no.'], item:['বিবরণ','Item'], date:['তারিখ','Date'], billFoot:['নমুনা বিল — AuraScale OS প্রোটোটাইপ। সমস্ত তথ্য কাল্পনিক।','Sample bill — AuraScale OS prototype. All data is fictional.'],
  compTitle:['লাইসেন্স ও নিয়মকানুন','Licences & compliance'], compSub:['মেয়াদ শেষের আগেই আপনাকে মনে করিয়ে দেওয়া হবে','You’ll be reminded well before anything expires'],
  urgentN:['জরুরি (১৫ দিনের মধ্যে)','Urgent (≤ 15 days)'], soonN:['শীঘ্রই (৬০ দিনের মধ্যে)','Soon (≤ 60 days)'], okN:['ঠিক আছে','All good'],
  next12:['আগামী ১২ মাস','Next 12 months'], daysLeft:['দিন বাকি','days left'], expiresOn:['মেয়াদ শেষ {date}','Expires {date}'], remindMe:['মনে করান:','Remind me:'], before:['{n} দিন আগে','{n} days before'],
  markRenewed:['নবীকরণ হয়েছে','Mark renewed'], renewed:['{name} নবীকরণ হয়েছে — নতুন মেয়াদ {date} পর্যন্ত','{name} renewed — valid till {date}'], remOn:['{n} দিন আগে রিমাইন্ডার চালু','Reminder {n} days before is on'], remOff:['{n} দিন আগের রিমাইন্ডার বন্ধ','Reminder {n} days before is off'],
  tUrgent:['জরুরি','Urgent'], tSoon:['শীঘ্রই','Soon'], tOk:['ঠিক আছে','OK'], licNo:['নং','No.'],
  licCE:['ক্লিনিক্যাল এস্টাবলিশমেন্ট লাইসেন্স','Clinical Establishment licence'], authCE:['জেলা স্বাস্থ্য দপ্তর','District health office'],
  licBMW:['বায়োমেডিক্যাল বর্জ্য অনুমোদন','Biomedical waste authorisation'], authBMW:['রাজ্য দূষণ নিয়ন্ত্রণ পর্ষদ','State pollution control board'],
  licFire:['ফায়ার এনওসি','Fire NOC'], authFire:['দমকল ও জরুরি পরিষেবা','Fire & emergency services'],
  licTrade:['ট্রেড লাইসেন্স','Trade licence'], authTrade:['পৌরসভা','Municipality'],
  licPharm:['ফার্মেসি (ড্রাগ) লাইসেন্স','Pharmacy (drug) licence'], authPharm:['ড্রাগ কন্ট্রোল দপ্তর','Drug control office'],
  theme:['ডার্ক / লাইট মোড','Dark / light mode'], langLabel:['Switch to English','বাংলায় দেখুন'],
};
const li = () => S.lang === 'bn' ? 0 : 1;
function t(k, v){ const e = T[k]; let s = e ? e[li()] : k; if (v) for (const x in v) s = s.split('{'+x+'}').join(v[x]); return s; }
const loc = () => S.lang === 'bn' ? 'bn-IN' : 'en-IN';
const num = n => new Intl.NumberFormat(loc()).format(n);
const money = n => '₹' + num(Math.round(n));
const fdate = (d, o) => d.toLocaleDateString(loc(), o || {day:'numeric', month:'short'});
const daysTxt = n => S.lang === 'bn' ? num(n) + ' দিন' : n + (n === 1 ? ' day' : ' days');
const whenTxt = a => a === 0 ? t('today') : a === 1 ? t('yesterday') : t('daysAgo', {n:num(a)});
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtPhone = p => p ? '+91 ' + p.slice(0,5) + ' ' + p.slice(5) : '—';

/* ---------- Icons ---------- */
const IC = {
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  bed:'<path d="M3 18V6M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="10.5" r="1.8"/>',
  receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  shield:'<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  alert:'<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/>',
  upi:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
  card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  download:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  chevR:'<path d="m9 18 6-6-6-6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  sparkle:'<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
  lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  steth:'<path d="M5 3v6a5 5 0 0 0 10 0V3"/><path d="M10 14v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/>',
  cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  exit:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  rupee:'<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10"/>',
  inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z"/>',
  trend:'<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  arrIn:'<path d="M12 5v14M5 12l7 7 7-7"/>',
  arrOut:'<path d="M12 19V5M5 12l7-7 7 7"/>',
  pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"/><path d="m8.5 8.5 7 7"/>',
  flask:'<path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3"/><path d="M7 15h10"/>',
  scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
  dots:'<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  file:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 13h6M9 17h6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>',
  heart:'<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  desk:'<path d="M3 10h18v3H3zM5 13v7M19 13v7M8 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/>',
  note:'<path d="M4 4h16v12l-4 4H4z"/><path d="M16 20v-4h4M8 9h8M8 13h5"/>',
  send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  palette:'<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.3-.3-.3-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10.5" cy="7" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/>',
  folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="2.2"/><path d="M8.5 18a3.5 3.5 0 0 1 7 0"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
  lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
};
const ic = (n, s) => `<svg class="ic" width="${s||20}" height="${s||20}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;
const logo = () => `<span class="logo aura-real" role="img" aria-label="AuraScale"></span>`;
const wordmark = () => `<span class="wm">Aura<span>Scale</span></span>`;

/* ---------- Sample data (fictional) ---------- */
const WARDS = [];
const WARD = {};
const VISIT = 0;
const DOC = {};
const beds = {};
const P = [];
let nextId = 1;
const LIC = [];
const PREV_REV = [0, 0, 0, 0, 0, 0];

/* ---------- Derived ---------- */
const getP = id => P.find(p => p.id === id);
const nm = p => p.name[li()];
const docName = id => DOC[id] ? DOC[id].n[li()] : (id && typeof id === 'string' && !/^d\d+$/.test(id) ? id : '—');
function charges(p){ return (p.ch || []).concat(p.extra || []); }
function totals(p){
  const total = charges(p).reduce((a, c) => a + c.amt, 0);
  const paid = p.pays.reduce((a, x) => a + x.amt, 0);
  return {total, paid, bal:Math.max(0, total - paid)};
}
function status(p){
  const {bal, paid} = totals(p);
  if (bal <= 0) return 'paid';
  if (bal > 20000 || p.disc) return 'overdue';
  if (paid > 0) return 'partial';
  return 'pending';
}
function bedStats(){
  const s = {total:0, occ:0, free:0, clean:0, res:0};
  Object.values(beds).forEach(b => { s.total++; s[b.status]++; });
  return s;
}
function todayCollection(){
  const r = {cash:0, upi:0, card:0, total:0};
  (LV.rev || []).forEach(y => { if (agoD(y.created_at || y.payment_date) === 0) { const k = mKey(y.method), a = Number(y.amount) || 0; r[k === 'bank' ? 'card' : k] += a; r.total += a; } });
  return r;
}
function duesSummary(){
  let amt = 0, n = 0, over = 0;
  P.forEach(p => { const b = totals(p).bal; if (b > 0) { amt += b; n++; if (status(p) === 'overdue') over++; } });
  return {amt, n, over};
}
function licTone(d){ return d <= 15 ? 'danger' : d <= 60 ? 'warn' : 'ok'; }
function alerts(){
  const a = [];
  P.filter(p => !p.disc && totals(p).bal > 20000).sort((x, y) => totals(y).bal - totals(x).bal).forEach(p =>
    a.push({tone:'danger', icon:'rupee', title:t('alertDues', {name:nm(p), amt:money(totals(p).bal)}), sub:t('alertDuesSub', {bed:p.bed, d:daysTxt(p.days)}), act:'open', id:p.id}));
  LIC.filter(l => l.days <= 30).sort((x, y) => x.days - y.days).forEach(l =>
    a.push({tone:licTone(l.days), icon:'shield', title:l.days < 0 ? t('alertLicX', {name:t(l.name)}) : t('alertLic', {name:t(l.name), d:num(l.days)}), sub:t('alertLicSub', {date:fdate(dateIn(l.days), {day:'numeric', month:'long'})}), act:'gotoLic', id:l.id}));
  P.filter(p => p.disc && totals(p).bal > 0).forEach(p =>
    a.push({tone:'warn', icon:'phone', title:t('alertDis', {name:nm(p), amt:money(totals(p).bal)}), sub:t('alertDisSub', {when:whenTxt(p.discAgo)}), act:'open', id:p.id}));
  P.filter(p => p.advice && !p.disc && totals(p).bal > 0).forEach(p =>
    a.splice(1, 0, {tone:'warn', icon:'exit', title:t('alertAdv', {name:nm(p), amt:money(totals(p).bal)}), sub:t('alertAdvSub', {doc:advName(p), bed:p.bed}), act:'open', id:p.id}));
  const lowS = SK.filter(i => i.qty < i.min);
  if (lowS.length && (S.role === 'owner' || S.role === 'reception')) a.push({tone:'warn', icon:'box', title:t('alertLowStk', {n:num(lowS.length)}), sub:lowS.slice(0, 3).map(i => skN(i)).join(', ') + (lowS.length > 3 ? '…' : ''), act:'gotoStock'});
  const c = bedStats().clean;
  if (c) a.push({tone:'info', icon:'sparkle', title:t('alertClean', {n:num(c)}), sub:t('alertCleanSub'), act:'bedsClean'});
  return a;
}
function avClass(id){ let h = 0; for (const ch of id) h = (h*31 + ch.charCodeAt(0)) >>> 0; return 'av-' + (h % 5 + 1); }
function initials(p){
  const n = nm(p).trim();
  if (S.lang === 'bn') return Array.from(n)[0] || '?';
  const parts = n.split(/\s+/); return ((parts[0]||'')[0] + ((parts[1]||'')[0] || '')).toUpperCase();
}
const avatar = (p, lg) => `<span class="avatar ${lg?'lg ':''}${avClass(p.id)}" aria-hidden="true">${esc(initials(p))}</span>`;
const stChip = p => p.disc && status(p) === 'paid' ? `<span class="st st-dis">${t('disTag')}</span>` : `<span class="st st-${status(p)}">${t('st'+status(p))}</span>`;
const sexTxt = s => s === 'M' ? t('male') : s === 'F' ? t('female') : t('otherSex');
const methodIcon = m => m === 'cash' ? 'cash' : m === 'upi' ? 'upi' : 'card';
const cIcon = {bed:'bed', med:'pill', test:'flask', visit:'steth', ot:'scissors', other:'dots'};

/* ---------- Shell rendering ---------- */
const NAVI = {dashboard:['home','navHome'], beds:['bed','navBeds'], billing:['receipt','navBilling'], compliance:['shield','navCompliance'], staff:['users','navStaff'], round:['heart','navRound'], mypat:['steth','navMyPat'], abdm:['link','navAbdm'], patients:['folder','navPatients']};
const ROLES = {
  owner:{icon:'briefcase', key:'rOwner', user:['ডা. সুব্রত মণ্ডল','Dr. Subrata Mondal'], ini:['সু','SM'], title:'ownerRole', nav:['dashboard','beds','patients','billing','stock','compliance','staff','abdm'], home:'dashboard', fab:true},
  reception:{icon:'desk', key:'rReception', user:['রুনা পাল','Runa Pal'], ini:['রু','RP'], title:'rReception', nav:['beds','patients','billing','stock','abdm'], home:'beds', fab:true},
  nurse:{icon:'heart', key:'rNurse', user:['সিস্টার রূপা হালদার','Sr. Rupa Halder'], ini:['রূ','RH'], title:'rNurse', nav:['round','beds','stock'], home:'round', fab:false},
  doctor:{icon:'steth', key:'rDoctor', user:['ডা. অনন্যা ঘোষ','Dr. Ananya Ghosh'], ini:['অ','AG'], title:'rDoctor', nav:['mypat','beds'], home:'mypat', fab:false}
};
const R = () => ROLES[S.role];
const NAV = [];
function navBadge(v){
  if (v === 'billing') { const n = duesSummary().over; return n ? `<span class="sb-badge" aria-label="${n}">${num(n)}</span>` : ''; }
  if (v === 'compliance') { const n = LIC.filter(l => l.days <= 15).length; return n ? `<span class="sb-badge">${num(n)}</span>` : ''; }
  return '';
}
function renderSidebar(){
  $('sidebar').innerHTML = `
    <div class="brand">${logo()}<div>${wordmark()}<div class="wm-sub">${t('appSub')}</div></div></div>
    ${R().fab ? `<button class="btn btn-mint btn-block btn-lg" data-act="admit">${ic('plus')}${t('newAdmission')}</button>` : `<div class="home-card" style="background:rgba(124,230,188,.08)"><span class="avatar" style="background:rgba(124,230,188,.15);color:var(--mint)">${ic(R().icon, 18)}</span><div><b>${t(R().key)}</b><span>${t('roleHint')}</span></div></div>`}
    <nav class="sb-nav" aria-label="${t('menu')}">
      ${R().nav.map(v => [v, NAVI[v][0], NAVI[v][1]]).map(([v, i, k]) => `<button class="sb-item ${S.view===v?'on':''}" data-act="nav" data-v="${v}" ${S.view===v?'aria-current="page"':''}>${ic(i)}<span>${t(k)}</span>${navBadge(v)}</button>`).join('')}
    </nav>
    <div class="sb-foot">
      <div class="home-card"><span class="avatar" style="background:rgba(124,230,188,.15);color:var(--mint)">${R().ini[li()]}</span><div><b>${R().user[li()]}</b><span>${t(R().title)} · ${t('homeName')}</span></div></div>
      ${sbFootExtra()}
    </div>`;
}
function renderAppbar(){
  const dark = HOST.dataset.theme === 'dark';
  $('appbar').innerHTML = `
    <div class="ab-brand">${logo()}${wordmark()}</div>
    <div class="ab-ctx"><b>${t('homeName')}</b><span>${t('homeTown')}</span></div>
    ${roleSwitch()}
    <div class="ab-right">
      <button class="iconbtn langbtn" data-act="lang" aria-label="${t('langLabel')}" lang="${S.lang==='bn'?'en':'bn'}">${S.lang==='bn'?'EN':'বাং'}</button>
      <button class="iconbtn" data-act="skinMenu" aria-label="${t('skinT')}" aria-haspopup="dialog">${ic('palette')}</button>
      <button class="iconbtn" data-act="theme" aria-label="${t('theme')}" aria-pressed="${dark}">${ic(dark?'sun':'moon')}</button>
      <span class="avatar ab-avatar" aria-hidden="true" title="${esc(R().user[li()])}">${R().ini[li()]}</span>
    </div>`;
}
function renderBottom(){
  const it = (v, i, k) => `<button class="bn-item ${S.view===v?'on':''}" data-act="nav" data-v="${v}" ${S.view===v?'aria-current="page"':''}><span class="pip">${ic(i, 22)}</span>${t(k)}</button>`;
  $('bottomnav').setAttribute('aria-label', t('menu'));
  const items = R().nav.slice(0, R().fab ? 4 : 5).map(v => it(v, NAVI[v][0], NAVI[v][1]));
  if (R().fab) items.splice(Math.min(2, items.length), 0, `<button class="bn-item bn-fab" data-act="admit"><span class="pip">${ic('plus', 26)}</span>${t('navAdmit')}</button>`);
  $('bottomnav').style.gridTemplateColumns = `repeat(${items.length}, minmax(0,1fr))`;
  $('bottomnav').innerHTML = items.join('');
}
function renderMain(){
  const m = $('main');
  m.setAttribute('aria-busy', S.loading ? 'true' : 'false');
  m.innerHTML = S.loading ? skeleton(S.view) : VIEWS[S.view]();
}
function renderAll(){
  document.title = 'AuraScale OS – ' + (S.lang === 'bn' ? 'নার্সিং হোম পোর্টাল' : 'Nursing Home Portal');
  $('skipLink').textContent = t('skip');
  renderSidebar(); renderAppbar(); renderBottom(); renderMain();
  if (S.drawer) renderDrawer();
  if (S.modal) renderModal();
}

/* ---------- Skeletons ---------- */
function skeleton(v){
  const head = `<div class="ph"><div><div class="sk sk-t"></div><div class="sk sk-h"></div></div></div>`;
  if (v === 'round' || v === 'mypat' || v === 'staff') return head + `<div class="rounds">${'<div class="card"><div class="sk sk-s"></div><div class="sk sk-v"></div><div class="sk sk-b"></div><div class="sk sk-b" style="margin-top:10px"></div></div>'.repeat(4)}</div>`;
  if (v === 'beds') return head + `<div class="bedgrid">${'<div class="sk sk-tile"></div>'.repeat(12)}</div>`;
  if (v === 'billing' || v === 'compliance') return head + `<div class="sumrow">${'<div class="card"><div class="sk sk-s"></div><div class="sk sk-v" style="margin-bottom:0"></div></div>'.repeat(3)}</div><div class="card">${'<div class="sk sk-row"></div>'.repeat(5)}</div>`;
  return head + `<div class="kpis">${'<div class="card"><div class="sk sk-s"></div><div class="sk sk-v"></div><div class="sk sk-b"></div></div>'.repeat(4)}</div><div class="grid-2"><div class="card"><div class="sk sk-block"></div></div><div class="card"><div class="sk sk-block"></div></div></div>`;
}

/* ---------- Views ---------- */
function vDashboard(){
  const st = bedStats(), tc = todayCollection(), du = duesSummary(), al = alerts();
  const hr = new Date().getHours();
  const greet = hr < 12 ? t('greetMorning') : hr < 17 ? t('greetAfternoon') : t('greetEvening');
  const admToday = P.filter(p => !p.disc && p.days === 0).length + P.filter(p => p.disc && p.admAgo === 0).length;
  const disToday = P.filter(p => p.disc && p.discAgo === 0).length;
  const pct = st.total ? Math.round(st.occ / st.total * 100) : 0;
  const rev = PREV_REV.concat([tc.total]);
  const week = rev.reduce((a, b) => a + b, 0);
  const avg = PREV_REV.reduce((a, b) => a + b, 0) / PREV_REV.length;
  const diff = avg ? Math.round((tc.total - avg) / avg * 100) : 0;
  const w = (v) => tc.total ? (v / tc.total * 100) : 0;
  const recent = [];
  P.forEach(p => p.pays.forEach((x, i) => recent.push({p, x, i})));
  recent.sort((a, b) => (b.x.at || 0) - (a.x.at || 0));
  return `
  <div class="ph">
    <div><p class="eyebrow">${fdate(new Date(), {weekday:'long', day:'numeric', month:'long'})}</p><h1>${greet}, ${t('ownerShort')}</h1><p class="sub">${t('dashSub')}</p></div>
    <div class="ph-actions">
      <button class="btn btn-secondary" data-act="pay">${ic('rupee')}${t('recordPayment')}</button>
      <button class="btn btn-primary" data-act="admit">${ic('plus')}${t('newAdmission')}</button>
    </div>
  </div>
  <section class="kpis" aria-label="KPI">
    <button class="card kpi" data-act="nav" data-v="beds">
      <span class="kpi-h"><span class="kpi-ic">${ic('bed', 18)}</span>${t('bedsUsed')}</span>
      <span class="kpi-v">${num(st.occ)}<span class="of"> / ${num(st.total)}</span></span>
      <span class="segbar" aria-hidden="true">
        <i class="d-occ" style="width:${st.total ? st.occ/st.total*100 : 0}%"></i><i class="d-clean" style="width:${st.total ? st.clean/st.total*100 : 0}%"></i><i class="d-res" style="width:${st.total ? st.res/st.total*100 : 0}%"></i>
      </span>
      <span class="kpi-f"><span>${t('bedsFreeN', {n:num(st.free)})}</span><span>·</span><span>${t('occPct', {n:num(pct)})}</span></span>
    </button>
    <button class="card kpi" data-act="nav" data-v="beds">
      <span class="kpi-h"><span class="kpi-ic">${ic('cal', 18)}</span>${t('todayInOut')}</span>
      <span class="inout">
        <span style="display:block"><b>${num(admToday)}</b><span>${ic('arrIn', 14)}${t('admissions')}</span></span>
        <span style="display:block"><b>${num(disToday)}</b><span>${ic('arrOut', 14)}${t('discharges')}</span></span>
      </span>
    </button>
    <button class="card kpi span-m" data-act="nav" data-v="billing">
      <span class="kpi-h"><span class="kpi-ic">${ic('rupee', 18)}</span>${t('todayCollection')}</span>
      <span class="kpi-v">${money(tc.total)}</span>
      <span class="segbar" aria-hidden="true"><i style="width:${w(tc.cash)}%;background:var(--deep)"></i><i style="width:${w(tc.upi)}%;background:var(--brand)"></i><i style="width:${w(tc.card)}%;background:var(--mint)"></i></span>
      <span class="legend">
        <span><i class="dot" style="background:var(--deep)"></i>${t('cash')} <b>${money(tc.cash)}</b></span>
        <span><i class="dot" style="background:var(--brand)"></i>${t('upi')} <b>${money(tc.upi)}</b></span>
        <span><i class="dot" style="background:var(--mint)"></i>${t('card')} <b>${money(tc.card)}</b></span>
      </span>
    </button>
    <button class="card kpi span-m" data-act="billFilterGo" data-f="overdue">
      <span class="kpi-h"><span class="kpi-ic red">${ic('alert', 18)}</span>${t('totalDues')}</span>
      <span class="kpi-v">${money(du.amt)}</span>
      <span class="kpi-f"><span>${t('duesFrom', {n:num(du.n)})}</span>${du.over ? `<span class="pillwarn">${t('overdueN', {n:num(du.over)})}</span>` : ''}</span>
    </button>
  </section>

  <div class="grid-2">
    <section class="card" aria-labelledby="revH">
      <div class="card-h"><div><h2 id="revH">${t('revenue7')}</h2><span class="meta">${t('weekTotal')}</span> <span class="big-total" style="font-size:18px;margin-left:4px">${money(week)}</span></div>
        ${avg ? `<span class="trend">${ic('trend', 14)}${diff >= 0 ? t('vsAvg', {n:num(diff)}) : t('vsAvgLow', {n:num(-diff)})}</span>` : ''}</div>
      ${sparkline(rev)}
      <div class="sp-days">${rev.map((v, i) => { const d = dateAgo(6 - i); return `<div class="${i===6?'on':''}">${i===6?t('todayCap'):fdate(d, {weekday:'short'})}<b>${S.lang==='bn'?'':'₹'}${num(Math.round(v/1000))}${S.lang==='bn'?' হা.':'k'}</b></div>`; }).join('')}</div>
    </section>
    <section class="card" aria-labelledby="alH">
      <div class="card-h"><h2 id="alH">${t('alerts')}</h2><span class="meta">${num(al.length)}</span></div>
      ${al.length ? `<ul class="alerts">${al.map(a => `<li class="tone-${a.tone}"><button class="al" data-act="${a.act}" data-id="${a.id||''}"><span class="al-ic">${ic(a.icon)}</span><span class="al-t"><b>${a.title}</b><span>${a.sub}</span></span>${ic('chevR', 18).replace('class="ic"', 'class="ic chev"')}</button></li>`).join('')}</ul>`
        : emptyState('check', t('alertsClear'), '')}
    </section>
  </div>

  <div class="grid-2">
    <section class="card" aria-labelledby="wbH">
      <div class="card-h"><h2 id="wbH">${t('byWard')}</h2><button class="link" data-act="nav" data-v="beds">${t('viewAll')}${ic('chevR', 16)}</button></div>
      <div class="wardbars">${WARDS.map(w => { const bs = Object.values(beds).filter(b => b.ward === w.id); const o = bs.filter(b => b.status === 'occ').length; const r = bs.length ? o / bs.length : 0;
        return `<div><div class="wb-top"><b>${t(w.key)}</b><span>${t('wardOcc', {a:num(o), b:num(bs.length)})}</span></div><div class="bar" role="img" aria-label="${Math.round(r*100)}%"><i class="${r >= .75 ? 'hot' : ''}" style="width:${r*100}%"></i></div></div>`; }).join('')}</div>
    </section>
    <section class="card" aria-labelledby="rpH">
      <div class="card-h"><h2 id="rpH">${t('recentPay')}</h2><button class="link" data-act="nav" data-v="billing">${t('viewAll')}${ic('chevR', 16)}</button></div>
      <ul class="plist">${recent.length ? '' : `<li class="meta">${t('noPayments')}</li>`}${recent.slice(0, 5).map(({p, x}) => `<li><span class="m-ic" title="${t(x.m)}">${ic(methodIcon(x.m), 18)}</span><span class="pt"><b>${esc(nm(p))}</b><span>${t(x.m)} · ${whenTxt(x.ago)}${x.at ? ', ' + tm(x.at) : ''}</span></span><span class="amt">${money(x.amt)}</span></li>`).join('')}</ul>
    </section>
  </div>
  <div class="grid-2" style="align-items:start">${staffCard()}${abdmCard()}</div>
  `;
}
function staffCard(){
  const curSh = (h => h < 14 ? 'M' : h < 20 ? 'E' : 'N')(new Date().getHours()); const on = STAFF.filter(s => s.st === 'present' || s.st === 'late' || (s.sh === curSh && s.st !== 'leave'));
  return `<section class="card" aria-labelledby="sfH" style="margin-bottom:16px"><div class="card-h"><h2 id="sfH">${t('staffT')}</h2><button class="link" data-act="nav" data-v="staff">${t('viewAll')}${ic('chevR', 16)}</button></div>
    <div style="display:flex;flex-wrap:wrap;gap:10px">${on.map((s, i) => `<span style="display:flex;gap:8px;align-items:center;padding:6px 12px 6px 6px;border-radius:14px;background:var(--surface-2);font-size:14px"><span class="avatar av-${i % 5 + 1}" style="width:32px;height:32px;border-radius:10px;font-size:13px">${esc(S.lang === 'bn' ? Array.from(s.n[0].replace('ডা. ', '').replace('সিস্টার ', ''))[0] : s.n[1].replace('Dr. ', '').replace('Sr. ', '')[0])}</span><span><b style="font-weight:600">${esc(s.n[li()])}</b> <span style="color:var(--text-3)">· ${t(s.j)}</span></span><span class="st ${s.st === 'present' ? 'st-paid' : s.st === 'late' ? 'st-pending' : s.st === 'upcoming' ? 'st-dis' : 'st-overdue'}" style="height:24px;font-size:12px">${t(s.st)}</span></span>`).join('') || `<p class="meta" style="margin:0">${t('noStaffYet')}</p>`}</div></section>`;
}
function sparkline(vals){
  const W = 600, H = 150, pad = 10;
  const max = (Math.max(...vals) || 1) * 1.12;
  const xs = vals.map((v, i) => pad + i * (W - 2*pad) / (vals.length - 1));
  const ys = vals.map(v => H - pad - (v / max) * (H - 2*pad));
  let d = `M${xs[0]} ${ys[0]}`;
  for (let i = 1; i < xs.length; i++) { const cx = (xs[i-1] + xs[i]) / 2; d += ` C${cx} ${ys[i-1]} ${cx} ${ys[i]} ${xs[i]} ${ys[i]}`; }
  const area = d + ` L${xs[xs.length-1]} ${H} L${xs[0]} ${H} Z`;
  const label = vals.map((v, i) => fdate(dateAgo(6-i), {weekday:'short'}) + ' ' + money(v)).join(', ');
  return `<div class="spark-wrap"><svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(label)}">
    <defs><linearGradient id="spg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" style="stop-color:var(--chart);stop-opacity:.26"/><stop offset="1" style="stop-color:var(--chart);stop-opacity:0"/></linearGradient></defs>
    ${[0.25,0.5,0.75].map(f => `<line x1="0" x2="${W}" y1="${H*f}" y2="${H*f}" stroke="var(--border)" stroke-dasharray="3 5" vector-effect="non-scaling-stroke"/>`).join('')}
    <path d="${area}" fill="url(#spg)"/><path d="${d}" fill="none" style="stroke:var(--chart)" stroke-width="2.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>
    ${xs.map((x, i) => `<span class="sp-dot ${i===xs.length-1?'last':''}" style="left:${x/W*100}%;top:${ys[i]/H*100}%" aria-hidden="true"></span>`).join('')}
    <span class="sp-tip" style="left:${xs[6]/W*100}%;top:${ys[6]/H*100}%" aria-hidden="true">${money(vals[6])}</span></div>`;
}
function emptyState(icon, title, sub, btn){
  return `<div class="empty"><span class="eic">${ic(icon, 30)}</span><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ''}${btn || ''}</div>`;
}

function vBeds(){
  const st = bedStats();
  const F = [['all', 'all', st.total], ['free', 'sfree', st.free], ['occ', 'socc', st.occ], ['clean', 'sclean', st.clean], ['res', 'sres', st.res]];
  const wardsHtml = WARDS.map(w => {
    const all = Object.values(beds).filter(b => b.ward === w.id);
    const list = all.filter(b => S.bedFilter === 'all' || b.status === S.bedFilter);
    if (!list.length) return '';
    const o = all.filter(b => b.status === 'occ').length;
    return `<section class="ward" aria-labelledby="w-${esc(w.id)}"><div class="ward-h"><h2 id="w-${esc(w.id)}">${t(w.key)}</h2><span>${t('wardOcc', {a:num(o), b:num(all.length)})} · ${t('perDay', {amt:money(w.rate)})} <button class="link" data-act="wardRate" data-w="${esc(w.id)}" style="margin-left:6px">${ic('edit', 14)}${t('chgRate')}</button></span></div>
      <div class="bedgrid">${list.map(bedTile).join('')}</div></section>`;
  }).join('');
  return `
  <div class="ph"><div><h1>${t('bedsTitle')}</h1><p class="sub">${t('bedsSub')}</p></div>
    <div class="ph-actions"><button class="btn btn-secondary" data-act="bedAdd">${ic('plus')}${t('addBed')}</button><button class="btn btn-primary" data-act="admit">${ic('plus')}${t('newAdmission')}</button></div></div>
  ${advBanner()}
  <div class="legend-bar" role="group" aria-label="Filter"><button class="chip" data-act="bedEditMode" aria-pressed="${!!S.bedEdit}">${ic('edit', 15)}${t('editBeds')}</button>
    ${F.map(([f, k, n]) => `<button class="chip" data-act="bedFilter" data-f="${f}" aria-pressed="${S.bedFilter===f}">${f !== 'all' ? `<i class="dot d-${f}"></i>` : ''}${t(k)}<span class="cnt">${num(n)}</span></button>`).join('')}
  </div>
  ${wardsHtml || (Object.keys(beds).length ? `<div class="card">${emptyState('bed', t('emptyBeds'), t('emptyBedsSub'), `<button class="btn btn-secondary" data-act="bedFilter" data-f="all">${t('clearFilter')}</button>`)}</div>` : `<div class="card">${emptyState('bed', t('noBedsYet'), t('noBedsYetS'), `<button class="btn btn-primary" data-act="bedAdd">${ic('plus')}${t('addBed')}</button>`)}</div>`)}`;
}
function bedTile(b){
  const stIc = {free:'plus', occ:'user', clean:'sparkle', res:'lock'}[b.status];
  let body = '', aria = t('bedN', {bed:b.id}) + ', ' + t('s'+b.status);
  if (b.status === 'occ') {
    const p = getP(b.pid); if (!p) return ''; const over = status(p) === 'overdue';
    body = `<span><span class="bed-name">${esc(nm(p))}</span><span class="bed-meta">${p.days === 0 ? t('admittedToday') : daysTxt(p.days)}</span>${over ? `<span class="due-flag">${ic('alert', 12)}${t('dueFlag')}</span>` : ''}</span>`;
    aria += ', ' + nm(p) + (over ? ', ' + t('stoverdue') : '');
  } else if (b.status === 'free') {
    body = `<span class="bed-cta">${ic('plus', 16)}${t('admitHere')}</span>`;
  } else if (b.status === 'res') {
    body = `<span><span class="bed-name">${esc(b.res.name[li()])}</span><span class="bed-meta">${b.res.maint ? '' : t('sres')}</span></span>`;
    aria += ', ' + b.res.name[li()];
  } else {
    body = `<span class="bed-meta">${t('sclean')}</span>`;
  }
  return `<button class="bed s-${b.status}" data-act="bed" data-id="${esc(b.id)}" aria-label="${esc(aria)}"><span class="bed-top"><span class="bed-no">${esc(b.id)}</span><span class="bed-st">${ic(stIc, 15)}<span class="lbl">${b.status==='occ'?'':t('s'+b.status)}</span></span></span>${body}</button>`;
}

function vBilling(){
  const sums = P.reduce((a, p) => { const x = totals(p); a.b += x.total; a.c += x.paid; a.d += x.bal; return a; }, {b:0, c:0, d:0});
  const cnt = {all:P.length, paid:0, partial:0, pending:0, overdue:0};
  P.forEach(p => cnt[status(p)]++);
  const F = [['all','all'],['overdue','stoverdue'],['pending','stpending'],['partial','stpartial'],['paid','stpaid']];
  return `
  <div class="ph"><div><h1>${t('billingTitle')}</h1><p class="sub">${t('billingSub')}</p></div>
    <div class="ph-actions"><button class="btn btn-primary" data-act="pay">${ic('rupee')}${t('recordPayment')}</button></div></div>
  <div class="sumrow">
    <div class="card sum"><span>${t('billed')}</span><b>${money(sums.b)}</b></div>
    <div class="card sum"><span>${t('collected')}</span><b>${money(sums.c)}</b></div>
    <div class="card sum due"><span>${t('duesShort')}</span><b>${money(sums.d)}</b></div>
  </div>
  <div class="toolbar">
    <label class="search"><span class="vh">${t('search')}</span>${ic('search')}<input class="input" id="billSearch" type="search" placeholder="${t('search')}" value="${esc(S.billQuery)}" autocomplete="off"></label>
    <div class="chips" role="group" aria-label="Filter">${F.map(([f, k]) => `<button class="chip" data-act="billFilter" data-f="${f}" aria-pressed="${S.billFilter===f}">${t(k)}<span class="cnt">${num(cnt[f])}</span></button>`).join('')}</div>
  </div>
  <div class="card flush" id="billList">${billList()}</div>`;
}
function billList(){
  const order = {overdue:0, pending:1, partial:2, paid:3};
  const q = S.billQuery.trim().toLowerCase();
  const rows = P.filter(p => (S.billFilter === 'all' || status(p) === S.billFilter) &&
      (!q || p.name.some(n => n.toLowerCase().includes(q)) || p.phone.includes(q.replace(/\s/g,'')) || p.bed.toLowerCase() === q))
    .sort((a, b) => order[status(a)] - order[status(b)] || totals(b).bal - totals(a).bal);
  if (!rows.length) return emptyState('inbox', t('emptyBills'), t('emptyBillsSub'), `<button class="btn btn-secondary" data-act="clearBill">${t('clearFilter')}</button>`);
  return `<div class="bill-head" aria-hidden="true"><span>${t('patient')}</span><span class="r">${t('billed')}</span><span class="r">${t('paid')}</span><span class="r">${t('balance')}</span><span>${t('status')}</span><span></span></div>` +
    rows.map(p => { const x = totals(p);
      return `<div class="bill">
        <button class="person" data-act="open" data-id="${p.id}">${avatar(p)}<span class="pn"><b>${esc(nm(p))}</b><span>${p.disc ? t('disTag') + ' · ' + whenTxt(p.discAgo) : t('bedN', {bed:p.bed}) + ' · ' + (p.days === 0 ? t('admittedToday') : daysTxt(p.days))}</span></span></button>
        <span class="num n1"><span class="lbl-m">${t('billed')}</span>${money(x.total)}</span>
        <span class="num n2"><span class="lbl-m">${t('paid')}</span>${money(x.paid)}</span>
        <span class="num n3 ${x.bal ? 'due' : 'zero'}"><span class="lbl-m">${t('balance')}</span>${money(x.bal)}</span>
        ${stChip(p)}
        <span class="act">${x.bal ? `<button class="btn btn-secondary btn-sm" data-act="pay" data-id="${p.id}">${ic('rupee', 18)}${t('recordPayment')}</button>` : `<button class="btn btn-ghost btn-sm" data-act="open" data-id="${p.id}">${ic('check', 18)}${t('paidUp')}</button>`}</span>
      </div>`; }).join('');
}

function vCompliance(){
  const u = LIC.filter(l => l.days <= 15).length, s = LIC.filter(l => l.days > 15 && l.days <= 60).length, o = LIC.length - u - s;
  const start = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  const months = Array.from({length:12}, (_, i) => new Date(start.getFullYear(), start.getMonth() + i, 1));
  const sorted = LIC.slice().sort((a, b) => a.days - b.days);
  return `
  <div class="ph"><div><h1>${t('compTitle')}</h1><p class="sub">${t('compSub')}</p></div><div class="ph-actions"><button class="btn btn-primary" data-act="licAdd">${ic('plus')}${t('lcAdd')}</button></div></div>
  ${LIC.length ? '' : `<div class="card">${emptyState('shield', t('lcNone'), t('lcNoneS'), `<button class="btn btn-primary" data-act="licAdd">${ic('plus')}${t('lcAdd')}</button>`)}</div>`}
  <div class="comp-sum">
    <div class="card cs tone-danger"><span class="al-ic">${ic('alert')}</span><div><b>${num(u)}</b><span>${t('urgentN')}</span></div></div>
    <div class="card cs tone-warn"><span class="al-ic">${ic('clock')}</span><div><b>${num(s)}</b><span>${t('soonN')}</span></div></div>
    <div class="card cs"><span class="al-ic" style="background:var(--ok-bg);color:var(--ok)">${ic('check')}</span><div><b>${num(o)}</b><span>${t('okN')}</span></div></div>
  </div>
  <section class="card" aria-labelledby="tlH">
    <div class="card-h"><h2 id="tlH">${t('next12')}</h2><span class="meta">${ic('cal', 16)}</span></div>
    <div class="tl-wrap"><div class="tl">${months.map((m, i) => {
      const evs = LIC.filter(l => { const d = dateIn(l.days); return d.getFullYear() === m.getFullYear() && d.getMonth() === m.getMonth(); });
      return `<div class="tl-m ${i===0?'now':''}"><small>${m.toLocaleDateString(loc(), {month:'short'})}${m.getMonth()===0 || i===0 ? ' ' + m.toLocaleDateString(loc(), {year:'2-digit'}) : ''}</small>${evs.map(l => `<button class="tl-ev ev-${licTone(l.days)}" data-act="gotoLic" data-id="${l.id}">${fdate(dateIn(l.days), {day:'numeric'})} · ${esc(t(l.name).split(' ')[0])}</button>`).join('')}</div>`;
    }).join('')}</div></div>
  </section>
  <div class="lics">${sorted.map(licCard).join('')}</div>`;
}
function licCard(l){
  const tone = licTone(l.days);
  const tag = tone === 'danger' ? t('tUrgent') : tone === 'warn' ? t('tSoon') : t('tOk');
  const pct = Math.max(4, Math.min(100, (365 - Math.max(0, l.days)) / 365 * 100));
  return `<article class="card lic t-${tone}" id="lic-${l.id}" aria-labelledby="lh-${l.id}">
    <div class="lic-days"><b>${num(Math.max(0, l.days))}</b><span>${l.days < 0 ? t('expired') : t('daysLeft')}</span></div>
    <div>
      <h3 id="lh-${l.id}">${esc(t(l.name))} <span class="st ${tone==='danger'?'st-overdue':tone==='warn'?'st-pending':'st-paid'}">${tag}</span></h3>
      <p class="meta">${esc(t(l.auth) || '—')}${l.no ? ` · ${t('licNo')} <span class="latin">${esc(l.no)}</span>` : ''} · <button class="link" data-act="licEdit" data-id="${l.id}">${ic('edit', 14)}${t('lcEdit')}</button></p>
      <p class="exp">${ic('cal', 16)}${t('expiresOn', {date:fdate(dateIn(l.days), {day:'numeric', month:'long', year:'numeric'})})}</p>
      <div class="bar" style="margin-top:10px;height:6px" aria-hidden="true"><i class="${tone==='ok'?'':'hot'}" style="width:${pct}%;${tone==='danger'?'background:var(--danger)':''}"></i></div>
      <div class="rem" role="group" aria-label="${t('remindMe')}"><span>${ic('bell', 15)}${t('remindMe')}</span>${[30,15,7].map(n => `<button class="chip" data-act="remind" data-id="${l.id}" data-n="${n}" aria-pressed="${l.rem.includes(n)}">${t('before', {n:num(n)})}</button>`).join('')}</div>
    </div>
    <div class="lic-act"><button class="btn ${tone==='ok'?'btn-secondary':'btn-primary'}" data-act="renew" data-id="${l.id}">${ic('check', 18)}${t('markRenewed')}</button></div>
  </article>`;
}
const VIEWS = {dashboard:vDashboard, beds:vBeds, billing:vBilling, compliance:vCompliance, staff:vStaff, round:vRound, mypat:vMyPat, abdm:vAbdm, patients:vPatients};

/* ---------- Drawer (patient profile) ---------- */
function renderDrawer(){
  const p = getP(S.drawer); if (!p) return;
  const x = totals(p), ch = charges(p);
  const relKey = 'r' + p.rel;
  $('drawer').innerHTML = `
    <div class="handle" aria-hidden="true"></div>
    <header class="dr-h">${avatar(p, true)}
      <div class="tt"><h2 id="dTitle">${esc(nm(p))}</h2><p>${t('yrs', {n:num(p.age)})} · ${sexTxt(p.sex)} · ${p.disc ? t('disTag') : t('bedN', {bed:p.bed})}</p></div>
      <button class="iconbtn" data-act="closeDrawer" aria-label="${t('close')}">${ic('x')}</button>
    </header>
    <div class="dr-body">
      <div>
        <div class="sec-t"><span>${t('totalBill')}</span>${stChip(p)}</div>
        <div class="bal">
          <div><div class="k">${t('totalBill')}</div><div class="v">${money(x.total)}</div></div>
          <div><div class="k">${t('paid')}</div><div class="v">${money(x.paid)}</div></div>
          <div class="${x.bal ? 'due' : 'clear'}"><div class="k">${t('balance')}</div><div class="v">${money(x.bal)}</div></div>
        </div>
      </div>
      <dl class="info">
        <div><dt>${t('phone')}</dt><dd>${p.phone ? `<a href="tel:+91${p.phone}" class="latin">${ic('phone', 15)}${fmtPhone(p.phone)}</a>` : '—'}</dd></div>
        <div><dt>${t('familyPhone')}${p.fam ? ' (' + t(relKey) + ')' : ''}</dt><dd>${p.fam ? `<a href="tel:+91${p.fam}" class="latin">${ic('phone', 15)}${fmtPhone(p.fam)}</a>` : '—'}</dd></div>
        <div><dt>${t('doctor')}</dt><dd>${docName(p.doc)}</dd></div>
        <div><dt>${t('reason')}</dt><dd>${esc(p.reason[li()] || '—')}</dd></div>
        <div><dt>${t('admittedOn')}</dt><dd>${fdate(p.admAt, {day:'numeric', month:'short', year:'numeric'})}, ${tm(p.admAt)}</dd></div>
        <div><dt>${p.disc ? t('dischargedOn') : t('daysAdmitted')}</dt><dd>${p.disc ? (p.discAt ? fdate(p.discAt, {day:'numeric', month:'short'}) : '—') : (p.days === 0 ? t('admittedToday') : daysTxt(p.days))}</dd></div>
      </dl>
      ${drawerExtra(p)}
      <section aria-labelledby="chH">
        <div class="sec-t" id="chH"><span>${t('charges')}</span><span>${num(ch.length)}</span></div>
        <ul class="lines">${ch.map(c => `<li class="${c.fresh ? 'new' : ''}"><span class="line-ic">${ic(cIcon[c.type], 18)}</span><span class="line-t"><b>${t('c'+c.type)}</b><span>${c.desc ? esc(c.desc) + ' · ' : ''}${fdate(c.at || dateAgo(c.ago))}</span></span><span class="amt">${money(c.amt)}</span></li>`).join('')}
          <li class="tot"><span class="line-t"><b>${t('totalBill')}</b></span><span class="amt">${money(x.total)}</span></li></ul>
      </section>
      <section aria-labelledby="pyH">
        <div class="sec-t" id="pyH"><span>${t('payments')}</span><span>${money(x.paid)}</span></div>
        ${p.pays.length ? `<ul class="lines">${p.pays.slice().reverse().map(y => `<li class="${y.fresh ? 'new' : ''}"><span class="line-ic">${ic(methodIcon(y.m), 18)}</span><span class="line-t"><b>${t(y.m)}</b><span>${fdate(y.at || dateAgo(y.ago))}${y.at ? ', ' + tm(y.at) : ''}${y.ref ? ' · ' + esc(y.ref) : ''}</span></span><span class="amt">${money(y.amt)}</span>${y.id ? `<button class="btn btn-ghost btn-sm" data-act="rcpt" data-id="${y.id}" aria-label="${t('rcpt')}">${ic('download', 16)}</button>` : ''}</li>`).join('')}</ul>`
          : `<div class="lines" style="padding:6px">${emptyState('rupee', t('noPayments'), '')}</div>`}
      </section>
    </div>
    <footer class="dr-f">${drawerFoot(p, x)}</footer>`;
  P.forEach(q => { q.pays.forEach(y => delete y.fresh); q.extra.forEach(c => delete c.fresh); });
}
let drawerReturn = null, modalReturn = null;
function openDrawer(id){
  if (!S.drawer) drawerReturn = ROOT.activeElement;
  S.drawer = id; renderDrawer();
  const d = $('drawer'); d.hidden = false; $('scrim').classList.add('open'); BODY.classList.add('locked');
  requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add('open')));
  setTimeout(() => { const b = d.querySelector('[data-act="closeDrawer"]'); b && b.focus(); }, 60);
}
function closeDrawer(){
  if (!S.drawer) return;
  S.drawer = null; const d = $('drawer'); d.classList.remove('open'); $('scrim').classList.remove('open');
  if (!S.modal) BODY.classList.remove('locked');
  setTimeout(() => { if (!S.drawer) d.hidden = true; }, 300);
  if (drawerReturn && ROOT.contains(drawerReturn)) drawerReturn.focus();
}

/* ---------- Modals ---------- */
function openModal(m){
  if (!S.modal) modalReturn = ROOT.activeElement;
  S.modal = m; renderModal();
  const w = $('modalWrap'); w.hidden = false; BODY.classList.add('locked');
  requestAnimationFrame(() => requestAnimationFrame(() => w.classList.add('open')));
  setTimeout(focusModal, 80);
}
function focusModal(){
  const el = $('modal').querySelector('.m-b input, .m-b [aria-pressed], .m-b [aria-checked], .m-b button, .m-f .btn-primary');
  el && el.focus({preventScroll:true});
}
function closeModal(){
  if (!S.modal) return;
  S.modal = null; const w = $('modalWrap'); w.classList.remove('open');
  if (!S.drawer) BODY.classList.remove('locked');
  setTimeout(() => { if (!S.modal) w.hidden = true; }, 240);
  if (modalReturn && ROOT.contains(modalReturn)) modalReturn.focus();
}
function rerenderModal(){
  const k = ROOT.activeElement && ROOT.activeElement.dataset ? ROOT.activeElement.dataset.k : null;
  renderModal();
  if (k) { const el = $('modal').querySelector(`[data-k="${k}"]`); el && el.focus({preventScroll:true}); }
}
function renderModal(){
  const m = S.modal; if (!m) return;
  const r = (Object.assign({admit:mAdmit, pay:mPay, charge:mCharge, dis:mDis, bed:mBed, vit:mVit, ord:mOrd, adv:mAdv, abha:mAbha, share:mShare, skIssue:mSkIssue, skIn:mSkIn, del:mDelete, forgot:mForgot, revoke:mRevoke, addbed:mAddBed, receipt:mReceipt}, typeof XMODALS !== 'undefined' ? XMODALS : {}))[m.type](m);
  $('modal').className = 'modal' + (r.xwide ? ' xwide' : r.wide ? ' wide' : '');
  $('modal').innerHTML = `
    <div class="handle" aria-hidden="true"></div>
    <div class="m-h"><div class="tt"><h2 id="mTitle">${r.title}</h2>${r.sub ? `<p>${r.sub}</p>` : ''}</div><button class="iconbtn" data-act="closeModal" aria-label="${t('close')}">${ic('x')}</button></div>
    ${r.pre || ''}
    <div class="m-b">${r.body}</div>
    ${r.foot ? `<div class="m-f">${r.foot}</div>` : ''}`;
}
const fieldErr = (m, k) => m.err && m.err[k] ? `<p class="err" id="e-${k}">${ic('alert', 15)}${t(m.err[k])}</p>` : '';
const bad = (m, k) => m.err && m.err[k] ? ` bad" aria-invalid="true" aria-describedby="e-${k}` : '';

function mAdmit(m){
  const f = m.f, s = m.step, names = ['stepPatient','stepFamily','stepBed'];
  const pre = `<div class="steps" aria-hidden="true">${[1,2,3].map(i => `<i class="${i <= s ? 'on' : ''}"></i>`).join('')}</div><p class="steplbl">${t('stepOf', {n:num(s), name:t(names[s-1])})}</p>`;
  let body = '';
  if (s === 1) body = idScan(m) + `
    <div class="field"><label for="a-name">${t('pName')}${fromTag(m, 'name')}</label><input id="a-name" data-k="name" class="input${bad(m,'name')}" data-bind="f.name" value="${esc(f.name)}" placeholder="${t('pNamePh')}" autocomplete="off">${fieldErr(m,'name')}</div>
    <div class="field"><label for="a-phone">${t('pPhone')} <span class="opt">${t('optional')}</span></label><div class="pre"><span>+91</span><input id="a-phone" data-k="phone" class="input${bad(m,'phone')}" data-bind="f.phone" value="${esc(f.phone)}" inputmode="numeric" maxlength="10" placeholder="90000 00000" autocomplete="off"></div>${fieldErr(m,'phone')}</div>
    <div class="row2">
      <div class="field"><label for="a-age">${t('pAge')}${fromTag(m, 'age')}</label><input id="a-age" data-k="age" class="input${bad(m,'age')}" data-bind="f.age" value="${esc(f.age)}" inputmode="numeric" maxlength="3">${fieldErr(m,'age')}</div>
      <div class="field"><span class="lab" id="sexL">${t('pSex')}${fromTag(m, 'sex')}</span><div class="pills" role="group" aria-labelledby="sexL">${['M','F','O'].map(x => `<button type="button" class="pill" style="flex:1;justify-content:center;min-height:56px;padding:0 8px" data-act="set" data-path="f.sex" data-val="${x}" data-k="sex-${x}" aria-pressed="${f.sex===x}">${sexTxt(x)}</button>`).join('')}</div>${fieldErr(m,'sex')}</div>
    </div>${idExtra(m)}`;
  if (s === 2) body = `
    <div class="field"><label for="a-fam">${t('fPhone')} <span class="opt">${t('optional')}</span></label><div class="pre"><span>+91</span><input id="a-fam" data-k="fam" class="input${bad(m,'fam')}" data-bind="f.fam" value="${esc(f.fam)}" inputmode="numeric" maxlength="10" placeholder="90000 00000" autocomplete="off"></div>${fieldErr(m,'fam') || `<p class="err" style="color:var(--text-3)">${ic('info', 15)}${t('fPhoneHint')}</p>`}</div>
    <div class="field"><span class="lab" id="relL">${t('relation')}</span><div class="pills" role="group" aria-labelledby="relL">${['son','daughter','husband','wife','parent','other'].map(r => `<button type="button" class="pill" data-act="set" data-path="f.rel" data-val="${r}" data-k="rel-${r}" aria-pressed="${f.rel===r}">${t('r'+r)}</button>`).join('')}</div></div>
    <div class="field"><span class="lab" id="docL">${t('admDoctor')}</span>${Object.keys(DOC).length ? `<div class="pills" role="group" aria-labelledby="docL">${Object.keys(DOC).map(d => `<button type="button" class="pill doc" data-act="set" data-path="f.doc" data-val="${d}" data-k="doc-${d}" aria-pressed="${f.doc===d}">${esc(DOC[d].n[li()])}${DOC[d].sp[li()] ? `<small>${esc(DOC[d].sp[li()])}</small>` : ''}</button>`).join('')}<button type="button" class="pill doc" data-act="set" data-path="f.doc" data-val="" data-k="doc-x" aria-pressed="${!f.doc}">${t('docOther')}</button></div>` : ''}
      ${!f.doc ? `<input class="input${m.err && m.err.doc ? ' bad' : ''}" style="margin-top:8px" data-bind="f.docText" data-k="doctx" value="${esc(f.docText || '')}" placeholder="${t('docOtherPh')}" autocomplete="off">` : ''}${m.err && m.err.doc ? `<p class="err">${ic('alert', 15)}${t('errDoc')}</p>` : ''}</div>
    <div class="field"><label for="a-reason">${t('reasonOpt')} <span class="opt">${t('optional')}</span></label><input id="a-reason" data-k="reason" class="input" data-bind="f.reason" value="${esc(f.reason)}" placeholder="${t('reasonPh')}" autocomplete="off"></div>`;
  if (s === 3) {
    const free = Object.values(beds).filter(b => b.status === 'free');
    body = free.length ? `
      <div class="field"><span class="lab">${t('chooseBed')}</span>${fieldErr(m,'bed')}
      ${WARDS.map(w => { const fb = free.filter(b => b.ward === w.id); return fb.length ? `<p class="wardlbl">${esc(t(w.key))} · ${t('perDay', {amt:money(w.rate)})}</p><div class="bedpick" role="group" aria-label="${esc(t(w.key))}">${fb.map(b => `<button type="button" class="bp" data-act="set" data-path="f.bed" data-val="${esc(b.id)}" data-k="bed-${esc(b.id)}" aria-pressed="${f.bed===b.id}">${esc(b.id)}<small>${b.rate !== w.rate ? money(b.rate) : t('sfree')}</small></button>`).join('')}</div>` : ''; }).join('')}</div>
      <div class="field"><label for="a-adv">${t('advance')} <span class="opt">${t('optional')}</span></label><div class="pre rs"><span>₹</span><input id="a-adv" data-k="adv" class="input" data-bind="f.adv" value="${esc(f.adv)}" inputmode="numeric" maxlength="7" placeholder="0"></div>
        <div class="tiles" style="margin-top:10px">${['cash','upi','card'].map(x => `<button type="button" class="tile sm" data-act="set" data-path="f.advM" data-val="${x}" data-k="advm-${x}" aria-pressed="${f.advM===x}">${ic(methodIcon(x))}${t(x)}</button>`).join('')}</div></div>`
      : emptyState('bed', t('noFreeBeds'), t('noFreeBedsSub'));
  }
  const foot = `${s > 1 ? `<button class="btn btn-secondary btn-lg" data-act="admStep" data-d="-1">${t('back')}</button>` : `<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button>`}
    ${s < 3 ? `<button class="btn btn-primary btn-lg grow" data-act="admStep" data-d="1" data-primary>${t('next')}${ic('chevR', 18)}</button>`
      : `<button class="btn btn-primary btn-lg grow" data-act="admSave" data-primary ${Object.values(beds).some(b => b.status==='free') ? '' : 'disabled'}>${ic('check')}${t('admitBtn')}</button>`}`;
  return {title:t('admTitle'), pre, body, foot, wide:s === 3};
}
function validAdm(m){
  const f = m.f, e = {};
  if (m.step === 1) {
    if (!f.name.trim()) e.name = 'errName';
    const a = parseInt(f.age, 10); if (!(a >= 0 && a <= 120) || !/^\d+$/.test(f.age.trim())) e.age = 'errAge';
    if (!f.sex) e.sex = 'errSex';
    if (f.phone && !/^\d{10}$/.test(f.phone.replace(/\s/g, ''))) e.phone = 'errPhone';
  }
  if (m.step === 2 && f.fam && !/^\d{10}$/.test(f.fam.replace(/\s/g, ''))) e.fam = 'errPhone';
  if (m.step === 3 && !f.bed) e.bed = 'errBed';
  m.err = e; return !Object.keys(e).length;
}

function mPay(m){
  if (!m.pid) {
    return {title:t('choosePatient'), sub:t('choosePatientSub'),
      body:`<label class="search" style="max-width:none"><span class="vh">${t('search')}</span>${ic('search')}<input class="input" data-bind="q" data-k="q" placeholder="${t('search')}" value="${esc(m.q)}" autocomplete="off"></label><div class="picklist" id="pickList">${pickList(m)}</div>`};
  }
  const p = getP(m.pid), x = totals(p);
  const amt = parseInt(m.amt, 10) || 0;
  return {title:t('recordPayment'),
    body:`<div class="mini">${avatar(p)}<div class="tt"><b>${esc(nm(p))}</b><span>${p.disc ? t('disTag') : t('bedN', {bed:esc(p.bed)})} · ${t('balance')} <b style="display:inline;color:var(--danger)">${money(x.bal)}</b></span></div></div>
      <div class="field"><label for="p-amt">${t('amount')}</label><div class="pre rs"><span>₹</span><input id="p-amt" data-k="amt" class="input${bad(m,'amt')}" data-bind="amt" value="${esc(m.amt)}" inputmode="numeric" maxlength="7"></div>${fieldErr(m,'amt')}
        <div class="qamts">${[['full', x.bal]].concat([1000, 2000, 5000].filter(v => v < x.bal).map(v => [v, v])).map(([k, v]) => `<button type="button" class="chip" data-act="quickAmt" data-v="${v}" data-k="q-${k}">${k === 'full' ? t('fullBal') + ' · ' : ''}${money(v)}</button>`).join('')}</div></div>
      <div class="field"><span class="lab" id="pmL">${t('payMethod')}</span><div class="tiles" role="group" aria-labelledby="pmL">${['cash','upi','card'].map(x => `<button type="button" class="tile" data-act="set" data-path="method" data-val="${x}" data-k="m-${x}" aria-pressed="${m.method===x}">${ic(methodIcon(x), 24)}${t(x)}</button>`).join('')}</div></div>
      ${m.method !== 'cash' ? `<div class="field"><label for="p-ref">${t('refNo')} <span class="opt">${t('optional')}</span></label><input id="p-ref" data-k="ref" class="input latin" data-bind="ref" value="${esc(m.ref)}" placeholder="${m.method==='upi'?'UPI Ref / UTR':'Card last 4'}" autocomplete="off"></div>` : ''}`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="paySave" data-primary>${ic('check')}<span id="payLbl">${t('saveAmt', {amt:money(amt)})}</span></button>`};
}
function pickList(m){
  const q = (m.q || '').trim().toLowerCase();
  const list = P.filter(p => totals(p).bal > 0 && (!q || p.name.some(n => n.toLowerCase().includes(q)) || p.bed.toLowerCase() === q || p.phone.includes(q)))
    .sort((a, b) => totals(b).bal - totals(a).bal);
  if (!list.length) return emptyState('inbox', q ? t('emptyBills') : t('noDues'), '');
  return list.map(p => `<button class="pick" data-act="pickPay" data-id="${p.id}">${avatar(p)}<span class="tt"><b>${esc(nm(p))}</b><span>${p.disc ? t('disTag') : t('bedN', {bed:p.bed})}</span></span><span style="text-align:right"><span class="amt" style="color:var(--danger)">${money(totals(p).bal)}</span><br>${stChip(p)}</span></button>`).join('');
}

function mCharge(m){
  const p = getP(m.pid);
  return {title:t('addCharge'), sub:esc(nm(p)) + ' · ' + t('bedN', {bed:p.bed}),
    body:`<div class="field"><span class="lab" id="ctL">${t('chargeFor')}</span><div class="tiles" role="group" aria-labelledby="ctL">${['med','test','visit','ot','bed','other'].map(c => `<button type="button" class="tile" data-act="set" data-path="cat" data-val="${c}" data-k="c-${c}" aria-pressed="${m.cat===c}">${ic(cIcon[c], 22)}${t('c'+c)}</button>`).join('')}</div></div>
      <div class="field"><label for="c-amt">${t('amount')}</label><div class="pre rs"><span>₹</span><input id="c-amt" data-k="amt" class="input${bad(m,'amt')}" data-bind="amt" value="${esc(m.amt)}" inputmode="numeric" maxlength="7"></div>${fieldErr(m,'amt')}</div>
      <div class="field"><label for="c-note">${t('note')} <span class="opt">${t('optional')}</span></label><input id="c-note" data-k="note" class="input" data-bind="note" value="${esc(m.note)}" placeholder="${t('notePh')}" autocomplete="off"></div>
      <div class="field"><span class="lab">${t('chPhoto')} <span class="opt">${t('optional')}</span></span>${m.reading ? skReadingBox(m.img) : m.file ? `<div class="skrsrc" style="margin:0">${m.img ? `<img src="${m.img}" alt="">` : `<span class="sk-ic c-cons">${ic('file', 20)}</span>`}<div><b class="latin">${esc(m.file.name || '')}</b>${m.readMsg ? `<span>${t(m.readMsg)}</span>` : ''}</div><button type="button" class="iconbtn" data-act="chgPhotoRm" aria-label="${t('idRemove')}">${ic('x', 16)}</button></div>` : dropZone('chg', 'image/*,application/pdf', t('skDropImg'), t('chPhotoS'))}</div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="chargeSave" data-primary>${ic('plus')}${t('addCharge')}</button>`};
}

function mDis(m){
  const p = getP(m.pid), x = totals(p);
  if (m.step === 1) return {title:t('disTitle'), sub:t('disStep1'),
    body:`<div class="mini">${avatar(p)}<div class="tt"><b>${esc(nm(p))}</b><span>${t('bedN', {bed:esc(p.bed)})} · ${p.days === 0 ? t('admittedToday') : daysTxt(p.days)} · ${esc(docName(p.doc))}</span></div></div>
      <div class="field"><span class="lab">${t('chkTitle')}</span><div style="display:flex;flex-direction:column;gap:8px">${['chk1','chk2','chk3'].map((k, i) => `<button type="button" class="check" role="checkbox" aria-checked="${m.chk[i]}" data-act="disChk" data-i="${i}" data-k="chk-${i}"><span class="box">${ic('check', 16)}</span>${t(k)}</button>`).join('')}</div></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="disStep" data-primary>${t('next')}${ic('chevR', 18)}</button>`};
  if (m.step === 2) {
    const g = {}; charges(p).forEach(c => g[c.type] = (g[c.type] || 0) + c.amt);
    return {title:t('finalBill'), sub:t('disStep2'),
      body:`<ul class="lines">${Object.keys(g).map(k => `<li><span class="line-ic">${ic(cIcon[k], 18)}</span><span class="line-t"><b>${t('c'+k)}</b></span><span class="amt">${money(g[k])}</span></li>`).join('')}
          <li class="tot"><span class="line-t"><b>${t('totalBill')}</b></span><span class="amt">${money(x.total)}</span></li>
          <li><span class="line-t"><b>${t('paid')}</b></span><span class="amt" style="color:var(--ok)">− ${money(x.paid)}</span></li>
          <li class="tot"><span class="line-t"><b>${t('balance')}</b></span><span class="amt" style="color:${x.bal ? 'var(--danger)' : 'var(--ok)'}">${money(x.bal)}</span></li></ul>
        ${x.bal ? `<div class="callout warn">${ic('alert')}<div><b>${t('duesWarn', {amt:money(x.bal)})}</b><p>${t('duesWarnSub')}</p></div></div>
          <div class="field"><span class="lab" id="dmL">${t('payMethod')}</span><div class="tiles" role="group" aria-labelledby="dmL">${['cash','upi','card'].map(y => `<button type="button" class="tile sm" data-act="set" data-path="method" data-val="${y}" data-k="dm-${y}" aria-pressed="${m.method===y}">${ic(methodIcon(y))}${t(y)}</button>`).join('')}</div></div>`
          : `<div class="callout ok">${ic('check')}<div><b>${t('fullyPaid')}</b><p>${t('fullyPaidSub')}</p></div></div>`}`,
      foot: x.bal ? `<button class="btn btn-secondary btn-lg" data-act="disFinish" data-collect="0">${t('withDues')}</button><button class="btn btn-primary btn-lg grow" data-act="disFinish" data-collect="1" data-primary>${ic('check')}${t('collectDis', {amt:money(x.bal)})}</button>`
        : `<button class="btn btn-secondary btn-lg" data-act="disBack">${t('back')}</button><button class="btn btn-primary btn-lg grow" data-act="disFinish" data-collect="0" data-primary>${ic('exit')}${t('discharge')}</button>`};
  }
  return {title:t('disTitle'), sub:t('disStep3'),
    body:`<div class="success"><span class="ring">${ic('check', 40)}</span><h3>${t('disDone', {name:esc(nm(p))})}</h3><p>${t('disDoneSub', {bed:esc(p.bed)})}</p><p class="${m.billSt === 'no' ? 'err' : 'meta'}" style="display:flex;gap:6px;align-items:center;justify-content:center">${m.billSt === 'making' ? `<span class="spin" aria-hidden="true"></span>${t('disBill')}` : m.billSt === 'ok' ? `${ic('check', 15)}${t('disBillOk')}` : m.billSt === 'no' ? t('disBillNo') : ''}</p>
      <div class="bal" style="width:100%;margin-top:10px;text-align:left"><div><div class="k">${t('totalBill')}</div><div class="v">${money(x.total)}</div></div><div><div class="k">${t('paid')}</div><div class="v">${money(x.paid)}</div></div><div class="${x.bal ? 'due' : 'clear'}"><div class="k">${t('balance')}</div><div class="v">${money(x.bal)}</div></div></div></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('done')}</button><button class="btn btn-primary btn-lg grow" data-act="printBill" data-id="${p.id}" data-primary ${m.billSt === 'making' ? 'disabled' : ''}>${ic('download')}${t('downloadBill')}</button>`};
}

function mBed(m){
  const b = beds[m.id];
  if (b.status === 'clean') return {title:t('bedN', {bed:esc(b.id)}), sub:esc(t(WARD[b.ward].key)) + ' · ' + t('sclean'),
    body:`<div class="callout warn">${ic('sparkle')}<div><b>${t('sclean')}</b><p>${t('cleanQ')}</p></div></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="markFree" data-id="${b.id}" data-primary>${ic('check')}${t('markFree')}</button>`};
  const note = '';
  return {title:t('bedN', {bed:esc(b.id)}), sub:esc(t(WARD[b.ward].key)) + ' · ' + esc(b.res.name[li()]),
    body:`<div class="mini"><span class="avatar av-4" aria-hidden="true">${ic('lock', 18)}</span><div class="tt"><b>${esc(b.res.name[li()])}</b><span><button class="link" data-act="bedEdit" data-id="${esc(b.id)}">${ic('edit', 14)}${t('editBeds')}</button></span></div></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="cancelRes" data-id="${b.id}">${t('cancelRes')}</button><button class="btn btn-primary btn-lg grow" data-act="admitRes" data-id="${b.id}" data-primary>${ic('plus')}${t('admitNow')}</button>`};
}

/* =====================================================================
   v2 additions: roles, staff, nurse ward round, doctor round, orders
   ===================================================================== */
Object.assign(T, {
  rOwner:['মালিক','Owner'], rReception:['রিসেপশন','Reception'], rNurse:['নার্স','Nurse'], rDoctor:['ডাক্তার','Doctor'], roleL:['কে ব্যবহার করছেন','Who is using this'],
  roleNow:['এখন {r} হিসেবে দেখছেন','Now viewing as {r}'], roleHint:['এই ভূমিকার মেনু','Menu for this role'],
  navStaff:['স্টাফ','Staff'], navRound:['ওয়ার্ড রাউন্ড','Ward round'], navMyPat:['আমার রোগী','My patients'],
  licPoll:['দূষণ নিয়ন্ত্রণ সম্মতি (CTO)','Pollution consent (CTO)'], authPoll:['রাজ্য দূষণ নিয়ন্ত্রণ পর্ষদ','State pollution control board'],
  alertAdv:['{name} — ছুটির পরামর্শ, বিল {amt} বাকি','{name} — discharge advised, {amt} unbilled'], alertAdvSub:['{doc} · বেড {bed} · বিল মিটিয়ে ছুটি দিন','{doc} · Bed {bed} · settle bill and discharge'],
  undo:['ফেরান','Undo'], undone:['আগের মতো করা হলো','Undone'],
  // staff
  staffT:['আজ ডিউটিতে','Staff on duty today'], staffS:['শিফট অনুযায়ী — কে আছেন, কে নেই','By shift — who is in, who is not'],
  shM:['সকাল','Morning'], shE:['বিকেল','Evening'], shN:['রাত','Night'], present:['উপস্থিত','Present'], late:['দেরিতে','Late'], leave:['ছুটিতে','On leave'], upcoming:['আসবেন','Starts later'],
  markPresent:['উপস্থিত করুন','Mark present'], markedPresent:['{name} উপস্থিত','{name} marked present'], inToday:['{a} / {b} জন এসেছেন','{a} of {b} in'],
  jDoc:['ডাক্তার','Doctor'], jNurse:['নার্স','Nurse'], jRecep:['রিসেপশন','Reception'], jAyah:['আয়া / ওয়ার্ড বয়','Ward attendant'], jHk:['পরিষ্কার','Housekeeping'], jPh:['ফার্মেসি','Pharmacy'],
  // nurse
  roundT:['ওয়ার্ড রাউন্ড','Ward round'], roundS:['সময়মতো ওষুধ, ভাইটালস আর হ্যান্ডওভার','Medicines on time, vitals and handover'],
  dueNowN:['এখন দেওয়ার ওষুধ','Doses due now'], missedN:['বাদ পড়া ওষুধ','Missed doses'], vitDueN:['ভাইটালস বাকি (৬ ঘণ্টা+)','Vitals overdue (6h+)'],
  meds:['ওষুধ','Medicines'], given:['দেওয়া','Given'], dueNow:['এখন দিন','Due now'], missed:['বাদ গেছে','Missed'], later:['পরে','Later'], allGiven:['আজ সব দেওয়া','All given today'],
  medGiven:['{med} দেওয়া হয়েছে — {name}','{med} given — {name}'], recordVitals:['ভাইটালস লিখুন','Record vitals'], details:['বিস্তারিত','Details'],
  bp:['রক্তচাপ','BP'], pulse:['পালস','Pulse'], temp:['তাপমাত্রা','Temp'], spo2:['অক্সিজেন','SpO₂'], sys:['উপরের (সিস্টোলিক)','Systolic'], dia:['নিচের (ডায়াস্টোলিক)','Diastolic'],
  vitT:['ভাইটালস লিখুন','Record vitals'], vitSaved:['ভাইটালস সেভ হয়েছে — {name}','Vitals saved — {name}'], vitAb:['অস্বাভাবিক — ডাক্তারকে জানান','Abnormal — inform the doctor'], errVit:['সঠিক মান লিখুন','Enter a valid value'], abn:['অস্বাভাবিক','Abnormal'],
  handover:['পরের শিফটের হ্যান্ডওভার','Handover to next shift'], hoPh:['যেমন: বেড I1 — রাতে প্রস্রাবের পরিমাণ মাপবেন','e.g. Bed I1 — measure urine output overnight'], hoAdd:['নোট যোগ','Add note'], hoAdded:['হ্যান্ডওভার নোট যোগ হয়েছে','Handover note added'], hoUrgent:['জরুরি','Urgent'], hoEmpty:['এখনও কোনো নোট নেই','No notes yet'],
  lastV:['শেষ: {t}','Last: {t}'], save:['সেভ করুন','Save'], cancel:['বাতিল','Cancel'],
  // doctor
  myPatT:['আমার রোগী','My patients'], myPatS:['আজকের রাউন্ড · {doc}','Today’s round · {doc}'], roundDone:['রাউন্ড হয়েছে','Seen'], roundTodo:['দেখা বাকি','To see'], roundProg:['{a} / {b} জন দেখা হয়েছে','{a} of {b} seen'],
  quickNote:['দ্রুত নোট','Quick note'], qnPh:['যেমন: ভালো আছেন, স্যালাইন বন্ধ','e.g. Stable, stop IV fluids'], noteSaved:['নোট সেভ হয়েছে','Note saved'],
  order:['টেস্ট / ওষুধ অর্ডার','Order tests / medicines'], advise:['ছুটির পরামর্শ','Discharge advice'], editAdvice:['পরামর্শ বদলান','Edit advice'],
  ordT:['অর্ডার দিন','Place order'], ordTests:['পরীক্ষা','Tests'], ordMeds:['ওষুধ','Medicines'], ordHint:['অর্ডার সরাসরি রোগীর বিলে যোগ হবে','Orders are added straight to the patient’s bill'],
  ordSave:['অর্ডার দিন · {amt}','Order · {amt}'], ordSaved:['{n}টি অর্ডার বিলে যোগ হয়েছে · {amt}','{n} orders added to bill · {amt}'], errOrd:['অন্তত একটি বেছে নিন','Pick at least one'],
  advT:['ছুটির পরামর্শ','Discharge advice'], advText:['রোগী ও পরিবারের জন্য পরামর্শ','Advice for patient and family'], advDefault:['অবস্থা ভালো। ওষুধ নিয়মিত খাবেন, ভারী কাজ করবেন না।','Condition stable. Take medicines regularly, avoid heavy work.'],
  followUp:['আবার দেখাতে আসবেন','Follow-up after'], fuDays:['{n} দিন পরে','in {n} days'], advSaved:['ছুটির পরামর্শ রিসেপশনে পাঠানো হয়েছে','Discharge advice sent to reception'],
  advBy:['{doc}-এর ছুটির পরামর্শ','Discharge advised by {doc}'], advDue:['বিল {amt} বাকি','{amt} unbilled'], advPaid:['বিল পরিষ্কার','Bill clear'], advQueue:['ছুটির অপেক্ষায়','Waiting for discharge'],
  lastNote:['শেষ নোট','Last note'], noRound:['আপনার কোনো রোগী ভর্তি নেই','You have no admitted patients'],
});
// ---- seeds ----


const base0 = new Date(); base0.setMinutes(0, 0, 0);
const SLOTS = [-8, -4, 0, 4, 8].map(h => new Date(base0.getTime() + h * 36e5));
const NOW_SLOT = 2;
const MAR = {};
const HANDOVER = [];
const STAFF = [];
const ORD = {
  test:[['CBC',['সিবিসি (রক্ত)','CBC'],350],['HB',['হিমোগ্লোবিন','Haemoglobin'],120],['RBS',['ব্লাড সুগার','Blood sugar'],100],['URE',['প্রস্রাব পরীক্ষা','Urine R/E'],150],['USG',['আল্ট্রাসাউন্ড','Ultrasound'],900],['BG',['ব্লাড গ্রুপ','Blood group'],150],['LFT',['লিভার ফাংশন','Liver function'],600],['KFT',['কিডনি ফাংশন','Kidney function'],550]],
  med:[['CFT',['Inj. Ceftriaxone 1 g × ৩','Inj. Ceftriaxone 1 g × 3'],540],['PCM',['Inj. Paracetamol 1 g × ৩','Inj. Paracetamol 1 g × 3'],360],['IFA',['Tab. Iron-Folic × ৩০','Tab. Iron-Folic × 30'],90],['NS',['IV Normal Saline × ২','IV Normal Saline × 2'],160],['OXY',['Inj. Oxytocin 10 IU','Inj. Oxytocin 10 IU'],120],['CAL',['Tab. Calcium × ৩০','Tab. Calcium × 30'],150]]
};
const hr = d => d.toLocaleTimeString(loc(), {hour:'numeric'});
const tm = d => d.toLocaleTimeString(loc(), {hour:'numeric', minute:'2-digit'});
const vAb = {sys:v => v > 150 || v < 90, dia:v => v > 95 || v < 55, pulse:v => v > 100 || v < 55, temp:v => v >= 100.4 || v < 96, spo2:v => v < 94};
const NOV = {sys:null, dia:null, pulse:null, temp:null, spo2:null, at:null};
const lastV = p => (p.vit && p.vit.length) ? p.vit[p.vit.length - 1] : NOV;
const isAb = v => !!v && Object.keys(vAb).some(k => v[k] != null && vAb[k](v[k]));
const wardOrder = b => { const w = WARDS.findIndex(x => x.id === bedWard(b)); return (w < 0 ? 99 : w) * 100000 + (parseInt(String(b).replace(/\D/g, ''), 10) || 0); };
const activeP = () => P.filter(p => !p.disc).sort((a, b) => wardOrder(a.bed) - wardOrder(b.bed));
function doseState(p, mi, si){ const r = MAR[`${p.id}|${mi}|${si}`]; if (r) return 'given'; return si === NOW_SLOT ? 'due' : si < NOW_SLOT ? 'missed' : 'up'; }
function medChip(p, m, mi){
  const st = m.s.map(si => [si, doseState(p, mi, si)]);
  const pick = st.find(x => x[1] === 'missed') || st.find(x => x[1] === 'due') || st.find(x => x[1] === 'up');
  if (!pick) return `<span class="dose given">${ic('check', 16)}<span>${esc(m.n)}<small>${t('allGiven')}</small></span></span>`;
  const [si, s] = pick, lab = {missed:'missed', due:'dueNow', up:'later'}[s];
  const tag = s === 'up' ? 'span' : 'button';
  return `<${tag} class="dose ${s}" ${s !== 'up' ? `data-act="give" data-p="${p.id}" data-m="${mi}" data-s="${si}"` : ''} aria-label="${esc(m.n)} ${hr(SLOTS[si])} — ${t(lab)}">${s === 'missed' ? ic('alert', 16) : s === 'due' ? ic('clock' in IC ? 'clock' : 'alert', 16) : ''}<span>${esc(m.n)} <small>${esc(m.dose)} · ${hr(SLOTS[si])} · ${t(lab)}</small></span></${tag}>`;
}
function vspark(vals, ab){
  vals = (vals || []).filter(v => v != null && !isNaN(v));
  if (vals.length < 2) return '';
  const mn = Math.min(...vals), mx = Math.max(...vals), rg = (mx - mn) || 1;
  const pts = vals.map((x, i) => `${(i / (vals.length - 1) * 100).toFixed(1)},${(16 - (x - mn) / rg * 13).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 100 18" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${ab ? 'var(--danger)' : 'var(--brand)'}" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}
function vitRow(p){
  const v = lastV(p), V = p.vit || [], ok = x => x != null && !isNaN(x);
  const bp = ok(v.sys) ? `${v.sys}/${ok(v.dia) ? v.dia : '—'}` : '—';
  const cells = [['bp', bp, ok(v.sys) && (vAb.sys(v.sys) || (ok(v.dia) && vAb.dia(v.dia))), V.map(x => x.sys)], ['pulse', ok(v.pulse) ? v.pulse : '—', ok(v.pulse) && vAb.pulse(v.pulse), V.map(x => x.pulse)], ['temp', ok(v.temp) ? Number(v.temp).toFixed(1) + '°' : '—', ok(v.temp) && vAb.temp(v.temp), V.map(x => x.temp)], ['spo2', ok(v.spo2) ? v.spo2 + '%' : '—', ok(v.spo2) && vAb.spo2(v.spo2), V.map(x => x.spo2)]];
  return `<div class="vrow">${cells.map(([k, val, ab, ser]) => `<div class="vm ${ab ? 'ab' : ''}"><small>${t(k)}${ab ? ' · ' + t('abn') : ''}</small><b>${val}</b>${vspark(ser, ab)}</div>`).join('')}</div>`;
}
function roleSwitch(){ return ''; }
function drawerFoot(p, x){
  if (S.role === 'owner' || S.role === 'reception') return `
      ${p.disc ? `<button class="btn btn-primary btn-lg full" data-act="printBill" data-id="${p.id}">${ic('download')}${t('downloadBill')}</button>
        ${x.bal ? `<button class="btn btn-secondary btn-lg full" data-act="pay" data-id="${p.id}">${ic('rupee')}${t('recordPayment')}</button>` : ''}`
      : `<button class="btn btn-secondary btn-lg" data-act="charge" data-id="${p.id}">${ic('plus')}${t('addCharge')}</button>
        <button class="btn btn-primary btn-lg" data-act="pay" data-id="${p.id}" ${x.bal ? '' : 'disabled'}>${ic('rupee')}${t('recordPayment')}</button>
        <button class="btn btn-danger btn-lg full" data-act="discharge" data-id="${p.id}">${ic('exit')}${t('discharge')}</button>`}
    `;
  if (p.disc) return `<button class="btn btn-secondary btn-lg full" data-act="closeDrawer">${t('close')}</button>`;
  if (S.role === 'nurse') return `<button class="btn btn-primary btn-lg full" data-act="vitModal" data-id="${p.id}">${ic('heart')}${t('recordVitals')}</button>`;
  return `<button class="btn btn-secondary btn-lg" data-act="ordModal" data-id="${p.id}">${ic('flask')}${S.lang === 'bn' ? 'অর্ডার' : 'Order'}</button><button class="btn btn-primary btn-lg" data-act="advModal" data-id="${p.id}">${ic('exit')}${t('advise')}</button>`;
}
function drawerExtra(p){
  let h = (S.role === 'owner' || S.role === 'reception') ? `<button class="btn btn-secondary dr-full" data-act="patFull" data-id="${p.id}">${ic('folder', 18)}${t('fullRec')}</button>` : '';
  if (!p.disc) h += `<button class="btn btn-ghost btn-sm" data-act="advToggle" data-id="${p.id}" style="align-self:flex-start">${ic('exit', 16)}${p.advice ? t('advUndo') : t('advMark')}</button>`;
  if (p.advice && !p.disc) h += `<div class="advice">${ic('exit', 18)}<div><b>${t('advBy', {doc:advName(p)})}</b>${p.advice.at ? fdate(p.advice.at, {day:'numeric', month:'short'}) + ', ' + tm(p.advice.at) : ''}</div></div>`;
  if (!p.disc) h += `<section><div class="sec-t"><span>${t('vitals' in T ? 'vitals' : 'bp')}</span><span>${lastV(p).at ? t('lastV', {t:tm(lastV(p).at)}) : t('noVit')}</span></div>${vitRow(p)}</section>`;
  return h;
}
T.vitals = ['ভাইটালস','Vitals'];
function advBanner(){
  if (!(S.role === 'owner' || S.role === 'reception')) return '';
  const L = activeP().filter(p => p.advice);
  if (!L.length) return '';
  return `<div class="advbar"><p class="eyebrow" style="margin:0;display:flex;gap:6px;align-items:center">${ic('exit', 15)}${t('advQueue')}</p>${L.map(p => { const b = totals(p).bal;
    return `<div class="advrow">${avatar(p)}<div class="tt"><b>${esc(nm(p))} · ${t('bedN', {bed:esc(p.bed)})}</b><span>${t('advBy', {doc:esc(advName(p))})} · ${b ? `<b style="display:inline;color:var(--danger)">${t('advDue', {amt:money(b)})}</b>` : t('advPaid')}</span></div><button class="btn btn-primary" data-act="discharge" data-id="${p.id}">${ic('exit', 18)}${t('discharge')}</button></div>`; }).join('')}</div>`;
}

function vStaff(){
  const inN = STAFF.filter(s => s.st === 'present').length, today = STAFF.filter(s => s.sh === 'M').length;
  const tone = {present:'st-paid', late:'st-pending', leave:'st-overdue', upcoming:'st-dis'};
  return `<div class="ph"><div><h1>${t('staffT')}</h1><p class="sub">${t('staffS')}</p></div><span class="st st-paid" style="height:36px;font-size:14px">${t('inToday', {a:num(inN), b:num(today)})}</span></div>
  ${[['M','shM','৮টা–২টো','8 AM–2 PM'],['E','shE','২টো–৮টা','2–8 PM'],['N','shN','রাত ৮টা–সকাল ৮টা','8 PM–8 AM']].map(([k, l, tbn, ten]) => `
    <div class="shift-h"><h2>${t(l)}</h2><span>${S.lang === 'bn' ? tbn : ten}</span></div>
    <div class="staff-grid">${STAFF.map((s, i) => [s, i]).filter(([s]) => s.sh === k).map(([s, i]) => `<div class="card stf"><span class="avatar av-${i % 5 + 1}" aria-hidden="true">${esc(S.lang === 'bn' ? Array.from(s.n[0].replace('ডা. ', '').replace('সিস্টার ', ''))[0] : s.n[1].replace('Dr. ', '').replace('Sr. ', '').split(' ').map(w => w[0]).join(''))}</span>
      <div class="tt"><b>${esc(s.n[li()])}</b><span class="meta">${t(s.j)} · ${esc(s.sub[li()])}</span><br><a href="tel:+91${s.ph}" class="latin">${ic('phone', 14)}${fmtPhone(s.ph)}</a></div>
      <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end"><span class="st ${tone[s.st]}">${t(s.st)}</span>${s.st === 'late' ? `<button class="btn btn-secondary btn-sm" data-act="markPresent" data-i="${i}">${t('markPresent')}</button>` : ''}</div></div>`).join('')}</div>`).join('')}`;
}

function vRound(){
  const L = activeP();
  let due = 0, miss = 0;
  L.forEach(p => p.meds.forEach((m, mi) => m.s.forEach(si => { const s = doseState(p, mi, si); if (s === 'due') due++; if (s === 'missed') miss++; })));
  const vdue = L.filter(p => Date.now() - lastV(p).at > 6 * 36e5).length;
  return `<div class="ph"><div><p class="eyebrow">${R().user[li()]} · ${hr(SLOTS[NOW_SLOT])}</p><h1>${t('roundT')}</h1><p class="sub">${t('roundS')}</p></div></div>
  <div class="sumrow">
    <div class="card sum"><span>${t('dueNowN')}</span><b style="color:var(--warn)">${num(due)}</b></div>
    <div class="card sum due"><span>${t('missedN')}</span><b>${num(miss)}</b></div>
    <div class="card sum"><span>${t('vitDueN')}</span><b>${num(vdue)}</b></div>
  </div>
  <section class="card" style="margin-bottom:16px" aria-labelledby="hoH">
    <div class="card-h"><h2 id="hoH">${ic('note', 18)} ${t('handover')}</h2><span class="meta">${num(HANDOVER.length)}</span></div>
    ${HANDOVER.length ? `<ul class="ho" style="list-style:none;margin:0;padding:0">${HANDOVER.slice().sort((a, b) => b.at - a.at).slice(0, 4).map(h => `<li><span class="when">${tm(h.at)}</span><div class="tx">${h.pri ? `<span class="pri" style="display:inline;color:var(--danger)">● ${t('hoUrgent')} · </span>` : ''}${esc(h.tx[li()])}<span>${esc(h.by[li()])}</span></div></li>`).join('')}</ul>` : `<p class="meta">${t('hoEmpty')}</p>`}
    <div class="qnote" style="margin-top:14px"><label class="vh" for="hoIn">${t('handover')}</label><input class="input" id="hoIn" placeholder="${t('hoPh')}" autocomplete="off"><button class="btn btn-secondary" data-act="hoAdd">${ic('plus', 18)}<span class="hide-s">${t('hoAdd')}</span></button></div>
  </section>
  <div class="rounds">${L.map(p => { const ab = isAb(lastV(p));
    return `<article class="card rc" aria-label="${esc(nm(p))}">
      <div class="rc-h"><span class="bedno">${p.bed}</span><div class="tt"><b>${esc(nm(p))}</b><span class="meta">${esc(p.reason[li()])} · ${p.days === 0 ? t('admittedToday') : daysTxt(p.days)}</span></div>${ab ? `<span class="st st-overdue">${ic('alert', 14)}${t('abn')}</span>` : ''}</div>
      <div class="rc-b">${vitRow(p)}<div><div class="sec-t" style="margin-bottom:8px"><span>${t('meds')}</span><span>${t('lastV', {t:tm(lastV(p).at)})}</span></div><div class="doses">${p.meds.map((m, mi) => medChip(p, m, mi)).join('')}</div></div></div>
      <div class="rc-f"><button class="btn btn-primary" data-act="vitModal" data-id="${p.id}">${ic('heart', 18)}${t('recordVitals')}</button><button class="btn btn-ghost" data-act="open" data-id="${p.id}">${t('details')}${ic('chevR', 16)}</button></div>
    </article>`; }).join('')}</div>`;
}

function vMyPat(){
  const L = activeP().filter(p => p.doc === 'd2');
  const done = L.filter(p => p.round).length;
  return `<div class="ph"><div><p class="eyebrow">${t('myPatS', {doc:docName('d2')})}</p><h1>${t('myPatT')}</h1></div><span class="st ${done === L.length && L.length ? 'st-paid' : 'st-pending'}" style="height:36px;font-size:14px">${t('roundProg', {a:num(done), b:num(L.length)})}</span></div>
  ${L.length ? `<div class="rounds">${L.map(p => { const ab = isAb(lastV(p)), dn = p.dnotes[p.dnotes.length - 1], x = totals(p);
    return `<article class="card rc" aria-label="${esc(nm(p))}">
      <div class="rc-h"><span class="bedno">${p.bed}</span><div class="tt"><b>${esc(nm(p))}</b><span class="meta">${num(p.age)} · ${esc(p.reason[li()])} · ${p.days === 0 ? t('admittedToday') : daysTxt(p.days)}</span></div>
        <button class="rdone" data-act="roundToggle" data-id="${p.id}" aria-pressed="${p.round}">${ic(p.round ? 'check' : 'clock' in IC ? 'clock' : 'alert', 16)}${p.round ? t('roundDone') : t('roundTodo')}</button></div>
      <div class="rc-b">${vitRow(p)}
        ${p.advice ? `<div class="advice">${ic('exit', 18)}<div><b>${t('advBy', {doc:docName(p.advice.by)})}</b>${esc(p.advice.text[li()])} · ${x.bal ? t('advDue', {amt:money(x.bal)}) : t('advPaid')}</div></div>` : ''}
        ${dn ? `<div class="note"><b style="font-weight:600">${t('lastNote')}:</b> ${esc(dn.tx[li()])}<span>${tm(dn.at)} · ${fdate(dn.at)}</span></div>` : ''}
        <div class="qnote"><label class="vh" for="qn-${p.id}">${t('quickNote')}</label><input class="input" id="qn-${p.id}" data-qn="${p.id}" placeholder="${t('qnPh')}" autocomplete="off"><button class="btn btn-secondary" data-act="dnote" data-id="${p.id}" aria-label="${t('save')}">${ic('send', 18)}</button></div>
      </div>
      <div class="rc-f"><button class="btn btn-secondary" data-act="ordModal" data-id="${p.id}">${ic('flask', 18)}${t('order')}</button><button class="btn ${p.advice ? 'btn-ghost' : 'btn-primary'}" data-act="advModal" data-id="${p.id}">${ic('exit', 18)}${p.advice ? t('editAdvice') : t('advise')}</button></div>
    </article>`; }).join('')}</div>` : `<div class="card">${emptyState('steth', t('noRound'), '')}</div>`}`;
}

/* ---- modals ---- */
function mVit(m){
  const p = getP(m.pid), f = m.f;
  const inp = (k, unit, mode) => `<div class="field"><label for="v-${k}">${t(k)} <span class="opt">${unit}</span></label><input id="v-${k}" data-k="v-${k}" class="input${bad(m, k)}" data-bind="f.${k}" value="${esc(f[k])}" inputmode="${mode || 'numeric'}" maxlength="5" style="font-family:Inter;font-weight:600;font-size:20px">${fieldErr(m, k)}</div>`;
  return {title:t('vitT'), sub:`${esc(nm(p))} · ${t('bedN', {bed:p.bed})} · ${tm(new Date())}`,
    body:`<div class="row2">${inp('sys', 'mmHg')}${inp('dia', 'mmHg')}</div><div class="row2">${inp('pulse', '/min')}${inp('temp', '°F', 'decimal')}</div><div class="row2">${inp('spo2', '%')}<div></div></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="vitSave" data-primary>${ic('check')}${t('save')}</button>`};
}
function mOrd(m){
  const p = getP(m.pid), tab = S.ordTab;
  const sum = m.sel.reduce((a, k) => { const [g, c] = k.split(':'); return a + ORD[g].find(o => o[0] === c)[2]; }, 0);
  return {title:t('ordT'), sub:`${esc(nm(p))} · ${t('bedN', {bed:p.bed})}`,
    body:`<div class="ordtabs" role="group">${[['test','ordTests'],['med','ordMeds']].map(([k, l]) => `<button data-act="ordTab" data-v="${k}" aria-pressed="${tab === k}" data-k="ot-${k}">${t(l)}${m.sel.filter(x => x.startsWith(k + ':')).length ? ` · ${num(m.sel.filter(x => x.startsWith(k + ':')).length)}` : ''}</button>`).join('')}</div>
      <div class="ordlist">${ORD[tab].map(o => { const key = tab + ':' + o[0], on = m.sel.includes(key); return `<button class="ord" data-act="ordPick" data-v="${key}" data-k="o-${key}" aria-pressed="${on}"><span class="ck">${ic('check', 14)}</span><span><b>${esc(o[1][li()])}</b><span>${money(o[2])}</span></span></button>`; }).join('')}</div>
      ${m.err ? `<p class="err">${ic('alert', 15)}${t(m.err)}</p>` : `<p class="meta" style="font-size:13.5px;color:var(--text-3);display:flex;gap:6px;align-items:center">${ic('info', 15)}${t('ordHint')}</p>`}`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="ordSave" data-primary>${ic('check')}${t('ordSave', {amt:money(sum)})}</button>`};
}
function mAdv(m){
  const p = getP(m.pid);
  return {title:t('advT'), sub:`${esc(nm(p))} · ${t('bedN', {bed:p.bed})}`,
    body:`<div class="field"><label for="a-txt">${t('advText')}</label><textarea id="a-txt" class="input" data-bind="text" data-k="atxt" rows="4">${esc(m.text)}</textarea></div>
      <div class="field"><span class="lab">${t('followUp')}</span><div class="pills" role="group">${[3, 7, 15, 30].map(n => `<button type="button" class="pill" data-act="set" data-path="fu" data-val="${n}" data-k="fu-${n}" aria-pressed="${+m.fu === n}">${t('fuDays', {n:num(n)})}</button>`).join('')}</div></div>
      <div class="mini">${ic('info', 18)}<div class="tt"><span>${totals(p).bal ? t('advDue', {amt:money(totals(p).bal)}) : t('advPaid')} · ${t('rReception')}</span></div></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="advSave" data-primary>${ic('send')}${t('advise')}</button>`};
}

function extraHandlers(){
  Object.assign(H, {
    role: el => { const r = el.dataset.v; if (r === S.role) return; S.role = r; try { localStorage.setItem('as2-role', r); } catch (e) {} if (S.drawer) closeDrawer(); renderAppbar(); go(ROLES[r].home); toast(t('roleNow', {r:t(ROLES[r].key)}), 'info'); },
    markPresent: el => { const s = STAFF[+el.dataset.i]; s.st = 'present'; renderMain(); toast(t('markedPresent', {name:esc(s.n[li()])}), 'success', {label:t('undo'), fn:() => { s.st = 'late'; renderMain(); }}); },
    give: el => {
      const p = getP(el.dataset.p), mi = +el.dataset.m, si = +el.dataset.s, key = `${p.id}|${mi}|${si}`;
      MAR[key] = {st:'given', at:new Date()}; refresh();
      toast(t('medGiven', {med:esc(p.meds[mi].n), name:esc(nm(p))}), 'success', {label:t('undo'), fn:() => { delete MAR[key]; refresh(); toast(t('undone'), 'info'); }});
    },
    vitModal: el => openModal({type:'vit', pid:el.dataset.id, f:{sys:'', dia:'', pulse:'', temp:'', spo2:''}, err:{}}),
    vitSave: () => {
      const m = S.modal, f = m.f, e = {}, Rg = {sys:[60,260], dia:[30,160], pulse:[30,220], temp:[90,110], spo2:[50,100]};
      Object.keys(Rg).forEach(k => { const v = parseFloat(f[k]); if (!(v >= Rg[k][0] && v <= Rg[k][1])) e[k] = 'errVit'; });
      m.err = e; if (Object.keys(e).length) { rerenderModal(); const x = $('modal').querySelector('[aria-invalid="true"]'); x && x.focus(); return; }
      const p = getP(m.pid), v = {sys:+f.sys, dia:+f.dia, pulse:+f.pulse, temp:+parseFloat(f.temp).toFixed(1), spo2:+f.spo2, at:new Date()};
      p.vit.push(v); closeModal(); refresh();
      toast(isAb(v) ? `${t('vitSaved', {name:esc(nm(p))})} — ${t('vitAb')}` : t('vitSaved', {name:esc(nm(p))}), isAb(v) ? 'info' : 'success', {label:t('undo'), fn:() => { p.vit = p.vit.filter(z => z !== v); refresh(); }});
    },
    hoAdd: () => { const i = $('hoIn'), v = i.value.trim(); if (!v) { i.focus(); return; } const h = {at:new Date(), tx:[v, v], by:[R().user[0], R().user[1]], pri:false}; HANDOVER.push(h); renderMain(); toast(t('hoAdded'), 'success', {label:t('undo'), fn:() => { HANDOVER.splice(HANDOVER.indexOf(h), 1); renderMain(); }}); const n = $('hoIn'); n && n.focus(); },
    roundToggle: el => { const p = getP(el.dataset.id); p.round = !p.round; renderMain(); const b = ROOT.querySelector(`[data-act="roundToggle"][data-id="${p.id}"]`); b && b.focus(); },
    dnote: el => { const p = getP(el.dataset.id), i = $('qn-' + p.id), v = i.value.trim(); if (!v) { i.focus(); return; } const n = {at:new Date(), tx:[v, v], by:'d2'}; p.dnotes.push(n); p.round = true; renderMain(); toast(t('noteSaved'), 'success', {label:t('undo'), fn:() => { p.dnotes = p.dnotes.filter(z => z !== n); renderMain(); }}); },
    ordModal: el => { S.ordTab = 'test'; openModal({type:'ord', pid:el.dataset.id, sel:[], err:''}); },
    ordTab: el => { S.ordTab = el.dataset.v; rerenderModal(); },
    ordPick: el => { const m = S.modal, k = el.dataset.v; m.sel = m.sel.includes(k) ? m.sel.filter(x => x !== k) : m.sel.concat(k); m.err = ''; rerenderModal(); },
    ordSave: () => {
      const m = S.modal; if (!m.sel.length) { m.err = 'errOrd'; rerenderModal(); return; }
      const p = getP(m.pid), added = m.sel.map(k => { const [g, c] = k.split(':'), o = ORD[g].find(z => z[0] === c); return {type:g === 'test' ? 'test' : 'med', amt:o[2], desc:o[1][li()] + ' · ' + docName('d2'), ago:0, fresh:true}; });
      p.extra.push(...added); const sum = added.reduce((a, c) => a + c.amt, 0); closeModal(); refresh();
      toast(t('ordSaved', {n:num(added.length), amt:money(sum)}), 'success', {label:t('undo'), fn:() => { p.extra = p.extra.filter(z => !added.includes(z)); refresh(); toast(t('undone'), 'info'); }});
    },
    advModal: el => { const p = getP(el.dataset.id); openModal({type:'adv', pid:p.id, text:p.advice ? p.advice.text[li()] : t('advDefault'), fu:p.advice ? String(p.advice.fu) : '7'}); },
    advSave: () => { const m = S.modal, p = getP(m.pid), prev = p.advice; p.advice = {by:S.role === 'doctor' ? 'd2' : p.doc, text:[m.text, m.text], fu:+m.fu}; p.round = true; closeModal(); refresh(); toast(t('advSaved'), 'success', {label:t('undo'), fn:() => { p.advice = prev; refresh(); }}); }
  });
  const oldNav = H.nav;
  H.nav = el => { if (!R().nav.includes(el.dataset.v)) return; oldNav(el); };
}

/* =====================================================================
   v3 additions: premium skins + ABDM sandbox (simulated)
   ===================================================================== */
Object.assign(T, {
  skinT:['থিম','Theme'], skinPick:['থিম বেছে নিন','Choose a theme'], skinNow:['থিম: {n}','Theme: {n}'],
  navAbdm:['ABDM স্যান্ডবক্স','ABDM sandbox'],
  abT:['ABDM স্যান্ডবক্স','ABDM sandbox'], abS:['ABHA যাচাই, রেকর্ড লিংক আর কনসেন্ট — পরীক্ষার পরিবেশে','ABHA verification, record linking and consent — in the test environment'],
  abSim:['এটি সিমুলেশন — কোনো আসল তথ্য ABDM-এ পাঠানো হয় না। আসল স্যান্ডবক্সে যুক্ত হতে ক্লায়েন্ট আইডি, সিক্রেট আর একটি সার্ভার (ব্রিজ URL) লাগবে।','This is a simulation — no real data is sent to ABDM. A real sandbox connection needs a client ID, secret and a server (bridge URL).'],
  abLinkedP:['ABHA যুক্ত রোগী','Patients with ABHA'], abCtx:['লিংক হওয়া রেকর্ড','Linked care contexts'], abCons:['অপেক্ষমাণ কনসেন্ট','Pending consents'],
  ms:['মাইলস্টোন','Milestones'], m1:['M1 · ABHA তৈরি ও যাচাই','M1 · Create & verify ABHA'], m2:['M2 · রেকর্ড লিংক (HIP)','M2 · Link care contexts (HIP)'], m3:['M3 · কনসেন্টে রেকর্ড আনা (HIU)','M3 · Fetch with consent (HIU)'],
  msDone:['সম্পূর্ণ','Done'], msProg:['চলছে','In progress'], msTodo:['শুরু হয়নি','Not started'],
  tAbha:['ABHA','ABHA'], tCtx:['কেয়ার কনটেক্সট','Care contexts'], tCons:['কনসেন্ট','Consents'], tLog:['API লগ','API log'], tSetup:['সেটআপ','Setup'],
  noAbha:['ABHA নেই','No ABHA'], hasAbha:['ABHA যুক্ত','ABHA linked'], addAbha:['ABHA যুক্ত করুন','Link ABHA'], verified:['যাচাই হয়েছে','Verified'],
  abhaNo:['ABHA নম্বর','ABHA number'], abhaAddr:['ABHA ঠিকানা','ABHA address'], abhaMob:['মোবাইল','Mobile'],
  abhaM:['ABHA যুক্ত করা','Link ABHA'], abhaS1:['ধাপ ১ / ৩ · খুঁজুন','Step 1 of 3 · Find'], abhaS2:['ধাপ ২ / ৩ · OTP','Step 2 of 3 · OTP'], abhaS3:['ধাপ ৩ / ৩ · মিলিয়ে নিন','Step 3 of 3 · Confirm'],
  abhaHow:['কীভাবে খুঁজবেন?','Find by'], sendOtp:['OTP পাঠান','Send OTP'], otp:['৬ সংখ্যার OTP','6-digit OTP'], otpHint:['স্যান্ডবক্সে নমুনা OTP: 123456','Sandbox sample OTP: 123456'], otpSent:['রোগীর মোবাইলে OTP পাঠানো হয়েছে (সিমুলেটেড)','OTP sent to the patient’s mobile (simulated)'],
  verifyOtp:['যাচাই করুন','Verify'], errOtp:['OTP মেলেনি — আবার দেখুন','OTP did not match — please check'], errAbhaNo:['১৪ সংখ্যার ABHA নম্বর দিন','Enter the 14-digit ABHA number'], errAbhaAddr:['ঠিকানা এমন হবে: name@sbx','Address should look like name@sbx'], errMob:['১০ সংখ্যার নম্বর দিন','Enter 10 digits'],
  profMatch:['ABHA প্রোফাইল','ABHA profile'], profOk:['নাম, লিঙ্গ আর বয়স মিলেছে','Name, gender and age match'], yob:['জন্মসাল','Year of birth'], linkNow:['লিংক করুন','Link'], abhaLinked:['{name}-এর ABHA যুক্ত হয়েছে','ABHA linked for {name}'],
  ctxAdm:['ভর্তি · {d}','Admission · {d}'], ctxLab:['ল্যাব রিপোর্ট','Lab report'], ctxDis:['ডিসচার্জ সামারি','Discharge summary'], ctxRx:['প্রেসক্রিপশন','Prescription'],
  linkCtx:['লিংক করুন','Link'], linked:['লিংক হয়েছে','Linked'], ctxNeedAbha:['আগে ABHA যুক্ত করুন','Link ABHA first'], ctxLinked:['{n}টি রেকর্ড লিংক হয়েছে — {name}','{n} records linked — {name}'], linkAll:['সব লিংক করুন','Link all'],
  cReq:['রোগীর অনুমোদনের অপেক্ষা','Waiting for patient'], cGr:['অনুমোদিত — ডেটা পাঠান','Granted — send data'], cTr:['ডেটা পাঠানো হয়েছে','Data sent'], cDen:['প্রত্যাখ্যাত','Denied'],
  simApprove:['অনুমোদন সিমুলেট','Simulate approval'], pushData:['ডেটা পাঠান','Send data'], pushed:['{id}: FHIR বান্ডেল পাঠানো হয়েছে','{id}: FHIR bundle sent'], approved:['{id}: রোগী অনুমোদন দিয়েছেন (সিমুলেটেড)','{id}: patient approved (simulated)'],
  purpose:['উদ্দেশ্য','Purpose'], range:['সময়সীমা','Range'], hiTypes:['রেকর্ডের ধরন','Record types'], requester:['অনুরোধকারী','Requester'],
  logEmpty:['এখনও কোনো API কল হয়নি','No API calls yet'], logHint:['পাথগুলো উদাহরণ — আসল স্যান্ডবক্স ডকুমেন্টেশনের সাথে মিলিয়ে নিন','Paths are illustrative — check them against the current sandbox documentation'], copy:['কপি','Copy'], copied:['কপি হয়েছে','Copied'], clearLog:['লগ মুছুন','Clear log'],
  env:['পরিবেশ','Environment'], gw:['গেটওয়ে','Gateway'], cmid:['X-CM-ID','X-CM-ID'], hfr:['HFR আইডি (নমুনা)','HFR ID (sample)'], hip:['HIP আইডি','HIP ID'], client:['ক্লায়েন্ট আইডি','Client ID'], bridge:['ব্রিজ URL','Bridge URL'],
  testConn:['সংযোগ পরীক্ষা','Test connection'], connOk:['স্যান্ডবক্স সেশন তৈরি (সিমুলেটেড)','Sandbox session created (simulated)'], sandboxBadge:['স্যান্ডবক্স · সিমুলেটেড','Sandbox · simulated'],
  abdmCardT:['ABDM স্যান্ডবক্স','ABDM sandbox'], abdmCardS:['{a}/{b} রোগীর ABHA যুক্ত · {c}টি কনসেন্ট অপেক্ষায়','{a}/{b} patients have ABHA · {c} consents pending'], open:['খুলুন','Open'],
});
// ---- skins ----
const SKINS = [
  {id:'corporate', n:['কর্পোরেট','Corporate'], sw:['#0A6B4B','#FFFFFF','#E5E7EB']},
  {id:'emerald', n:['এমারেল্ড গোল্ড','Emerald Gold'], sw:['#0B2B20','#C9A14A','#F7F5EF']},
  {id:'ocean', n:['ওশান টিল','Ocean Teal'], sw:['#0E6A78','#E2F1F3','#0B3D45']},
  {id:'graphite', n:['গ্রাফাইট','Graphite'], sw:['#111827','#7CE6BC','#F5F5F4']},
  {id:'clay', n:['ওয়ার্ম ক্লে','Warm Clay'], sw:['#9C4A1C','#F8EDE6','#3B2417']},
  {id:'midnight', n:['মিডনাইট','Midnight'], sw:['#0A0F1E','#7CE6BC','#172040']}
];
S.skin = 'corporate';
function skinPop(){
  return `<div class="skinpop" id="skinPop" role="dialog" aria-label="${t('skinPick')}"><p class="eyebrow" style="margin:2px 4px 8px">${t('skinPick')}</p>
    ${SKINS.map(k => `<button class="skin" data-act="skin" data-v="${k.id}" aria-pressed="${S.skin === k.id}"><span class="sws">${k.sw.map(c => `<i style="background:${c}"></i>`).join('')}</span><span class="sn">${k.n[li()]}</span>${S.skin === k.id ? ic('check', 18) : ''}</button>`).join('')}</div>`;
}
// ---- ABDM data ----
const ABDM = {tab:'abha', cmid:'sbx', gw:'https://dev.abdm.gov.in/api/hiecm/gateway/v3', hfr:'IN19SAMPLE0123', hip:'SSNH-HIP-SBX', client:'SBX_00••••••', bridge:'https://bridge.example-nursinghome.in/abdm', logs:[], linked:new Set(), connected:false};
const ABHA_SEED = {p1:'rahim.sheikh', p3:'sumitra.bagdi', p4:'gopal.mahato', p9:'purnima.santra', p13:'sabina.bibi', p15:'rina.halder', p18:'pradip.dutta'};
let abSeq = 11;
Object.entries(ABHA_SEED).forEach(([id, a], i) => { const p = getP(id); if (p) p.abha = {no:'91-0000-0000-' + String(1000 + i * 37).padStart(4, '0'), addr:a + '@sbx'}; });
function ctxOf(p){
  const L = [{k:p.id + ':adm', t:'ctxAdm', d:fdate(dateAgo(p.admAgo), {day:'numeric', month:'short'})}, {k:p.id + ':rx', t:'ctxRx'}];
  if (p.test || p.extra.some(e => e.type === 'test')) L.push({k:p.id + ':lab', t:'ctxLab'});
  if (p.disc) L.push({k:p.id + ':dis', t:'ctxDis'});
  return L;
}
['p1:adm', 'p1:rx', 'p4:adm', 'p4:lab', 'p18:adm', 'p18:dis', 'p18:lab', 'p3:adm'].forEach(k => ABDM.linked.add(k));
const CONSENTS = [
  {id:'CR-7F21', pid:'p18', hiu:['নমুনা HIU · সিটি ডায়াগনস্টিক','Sample HIU · City Diagnostics'], purpose:'CAREMGT', types:['DischargeSummary','DiagnosticReport'], st:'GRANTED', ago:40},
  {id:'CR-7F2A', pid:'p1', hiu:['নমুনা HIU · রোগীর PHR অ্যাপ','Sample HIU · Patient PHR app'], purpose:'PATRQT', types:['OPConsultation','Prescription'], st:'REQUESTED', ago:12},
  {id:'CR-7E98', pid:'p4', hiu:['নমুনা HIU · রেফারাল হাসপাতাল','Sample HIU · Referral hospital'], purpose:'CAREMGT', types:['DiagnosticReport'], st:'TRANSFERRED', ago:300},
  {id:'CR-7E40', pid:'p3', hiu:['নমুনা HIU · বিমা সংস্থা','Sample HIU · Insurer'], purpose:'BTG', types:['DischargeSummary'], st:'DENIED', ago:900}
];
function addLog(method, path, status, req, res){
  ABDM.logs.unshift({id:++abSeq, method, path, status, at:new Date(), req, res});
  if (ABDM.logs.length > 40) ABDM.logs.pop();
}
const reqId = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
const hdrs = () => ({'X-CM-ID':ABDM.cmid, 'REQUEST-ID':reqId(), 'TIMESTAMP':new Date().toISOString(), 'Authorization':'Bearer eyJ…(sandbox)'});
// seed log
addLog('POST', '/api/hiecm/gateway/v3/sessions', 200, {clientId:ABDM.client, clientSecret:'••••••', grantType:'client_credentials'}, {accessToken:'eyJ…', expiresIn:1200, tokenType:'bearer'});
ABDM.connected = true;

function abStats(){
  const act = P.filter(p => !p.disc || ABHA_SEED[p.id]);
  const withA = P.filter(p => p.abha).length;
  let all = 0, ln = 0; P.filter(p => p.abha).forEach(p => ctxOf(p).forEach(c => { all++; if (ABDM.linked.has(c.k)) ln++; }));
  const pend = CONSENTS.filter(c => c.st === 'REQUESTED' || c.st === 'GRANTED').length;
  return {withA, total:P.length, all, ln, pend, act};
}
function abdmCard(){
  const s = abStats();
  return `<section class="card" aria-labelledby="abH" style="margin-bottom:16px"><div class="card-h"><h2 id="abH">${t('abdmCardT')}</h2><span class="st st-pending">${t('sandboxBadge')}</span></div>
    <p style="color:var(--text-2)">${t('abdmCardS', {a:num(s.withA), b:num(s.total), c:num(s.pend)})}</p>
    <div class="bar" style="margin:12px 0 14px"><i style="width:${s.withA / s.total * 100}%"></i></div>
    <button class="btn btn-secondary" data-act="nav" data-v="abdm">${ic('link', 18)}${t('open')}</button></section>`;
}

function vAbdm(){
  const s = abStats();
  const m1 = s.withA >= 5 ? 'done' : 'prog', m2 = s.ln >= s.all && s.all ? 'done' : s.ln ? 'prog' : 'todo', m3 = CONSENTS.some(c => c.st === 'TRANSFERRED') ? 'prog' : 'todo';
  const msTag = {done:['st-paid','msDone'], prog:['st-pending','msProg'], todo:['st-dis','msTodo']};
  const tabs = [['abha','tAbha'],['ctx','tCtx'],['cons','tCons'],['log','tLog'],['setup','tSetup']];
  return `<div class="ph"><div><p class="eyebrow">ABDM · V3 · X-CM-ID: ${ABDM.cmid}</p><h1>${t('abT')}</h1><p class="sub">${t('abS')}</p></div><span class="st st-pending" style="height:34px;font-size:13.5px">${ic('alert', 15)}${t('sandboxBadge')}</span></div>
  <div class="callout warn" style="margin-bottom:16px">${ic('info', 18)}<div><p style="opacity:1">${t('abSim')}</p></div></div>
  <div class="sumrow">
    <div class="card sum"><span>${t('abLinkedP')}</span><b>${num(s.withA)}<span style="font-size:15px;color:var(--text-3);display:inline;text-transform:none;letter-spacing:0"> / ${num(s.total)}</span></b></div>
    <div class="card sum"><span>${t('abCtx')}</span><b>${num(s.ln)}<span style="font-size:15px;color:var(--text-3);display:inline;text-transform:none;letter-spacing:0"> / ${num(s.all)}</span></b></div>
    <div class="card sum ${s.pend ? 'due' : ''}"><span>${t('abCons')}</span><b>${num(s.pend)}</b></div>
  </div>
  <section class="card" style="margin-bottom:16px"><div class="card-h"><h2>${t('ms')}</h2></div>
    <div class="msl">${[['m1', m1, s.withA / s.total], ['m2', m2, s.all ? s.ln / s.all : 0], ['m3', m3, CONSENTS.filter(c => c.st === 'TRANSFERRED').length / CONSENTS.length]].map(([k, st, f]) => `<div class="ms"><div class="ms-t"><b>${t(k)}</b><span class="st ${msTag[st][0]}">${t(msTag[st][1])}</span></div><div class="bar"><i style="width:${Math.max(3, f * 100)}%"></i></div></div>`).join('')}</div></section>
  <div class="chips" role="tablist" style="margin-bottom:12px">${tabs.map(([k, l]) => `<button class="chip" role="tab" data-act="abTab" data-v="${k}" aria-pressed="${ABDM.tab === k}" aria-selected="${ABDM.tab === k}">${t(l)}${k === 'cons' && s.pend ? `<span class="cnt">${num(s.pend)}</span>` : k === 'log' ? `<span class="cnt">${num(ABDM.logs.length)}</span>` : ''}</button>`).join('')}</div>
  <div id="abBody">${({abha:abAbha, ctx:abCtx, cons:abCons, log:abLog, setup:abSetup})[ABDM.tab]()}</div>`;
}
function abAbha(){
  const L = P.slice().sort((a, b) => (!!b.abha) - (!!a.abha) || (a.disc - b.disc));
  return `<div class="card flush">${L.map(p => `<div class="abrow">${avatar(p)}<div class="tt"><b>${esc(nm(p))}</b><span>${p.disc ? t('disTag') : t('bedN', {bed:p.bed})} · ${num(p.age)} · ${sexTxt(p.sex)}</span></div>
    <div class="abid">${p.abha ? `<span class="mono">${p.abha.no}</span><span class="mono" style="color:var(--accent-text)">${p.abha.addr}</span>` : `<span style="color:var(--text-3)">${t('noAbha')}</span>`}</div>
    <div class="abact">${p.abha ? `<span class="st st-paid">${ic('check', 14)}${t('verified')}</span>` : `<button class="btn btn-secondary btn-sm" data-act="abhaModal" data-id="${p.id}">${ic('link', 16)}${t('addAbha')}</button>`}</div></div>`).join('')}</div>`;
}
function abCtx(){
  const L = P.filter(p => p.abha);
  return `<div class="ctxl">${L.map(p => { const cs = ctxOf(p), un = cs.filter(c => !ABDM.linked.has(c.k)).length;
    return `<div class="card ctxc"><div class="ctx-h">${avatar(p)}<div class="tt"><b>${esc(nm(p))}</b><span class="mono">${p.abha.addr}</span></div>${un ? `<button class="btn btn-primary btn-sm" data-act="ctxLinkAll" data-id="${p.id}">${ic('link', 16)}${t('linkAll')} · ${num(un)}</button>` : `<span class="st st-paid">${ic('check', 14)}${t('linked')}</span>`}</div>
      <ul class="ctx-items">${cs.map(c => `<li><span class="line-ic">${ic(c.t === 'ctxLab' ? 'flask' : c.t === 'ctxDis' ? 'exit' : c.t === 'ctxRx' ? 'pill' : 'bed', 16)}</span><span class="tt">${t(c.t, {d:c.d || ''})}<small class="mono">${c.k.replace(':', '-').toUpperCase()}</small></span>${ABDM.linked.has(c.k) ? `<span class="st st-paid">${t('linked')}</span>` : `<button class="btn btn-ghost btn-sm" data-act="ctxLink" data-k="${c.k}" data-id="${p.id}">${t('linkCtx')}</button>`}</li>`).join('')}</ul></div>`; }).join('')}</div>
    <p class="fictional">${ic('info', 15)}${t('ctxNeedAbha')} — ${t('tAbha')}</p>`;
}
function abCons(){
  const tag = {REQUESTED:['st-pending','cReq'], GRANTED:['st-partial','cGr'], TRANSFERRED:['st-paid','cTr'], DENIED:['st-overdue','cDen']};
  return `<div class="ctxl">${CONSENTS.map(c => { const p = getP(c.pid);
    return `<div class="card ctxc"><div class="ctx-h"><span class="tok-id mono">${c.id}</span><div class="tt"><b>${esc(nm(p))}</b><span>${t('requester')}: ${esc(c.hiu[li()])}</span></div><span class="st ${tag[c.st][0]}">${t(tag[c.st][1])}</span></div>
      <dl class="info" style="padding:0 16px 12px"><div><dt>${t('purpose')}</dt><dd class="mono">${c.purpose}</dd></div><div><dt>${t('hiTypes')}</dt><dd class="mono" style="font-size:13px">${c.types.join(', ')}</dd></div><div><dt>${t('range')}</dt><dd>${fdate(dateAgo(30))} – ${fdate(TODAY)}</dd></div><div><dt>ABHA</dt><dd class="mono" style="font-size:13px">${p.abha ? p.abha.addr : '—'}</dd></div></dl>
      ${c.st === 'REQUESTED' ? `<div class="rc-f"><button class="btn btn-secondary" data-act="consApprove" data-id="${c.id}">${ic('check', 18)}${t('simApprove')}</button></div>` : c.st === 'GRANTED' ? `<div class="rc-f"><button class="btn btn-primary" data-act="consPush" data-id="${c.id}">${ic('send', 18)}${t('pushData')}</button></div>` : ''}</div>`; }).join('')}</div>`;
}
function abLog(){
  if (!ABDM.logs.length) return `<div class="card">${emptyState('inbox', t('logEmpty'), '')}</div>`;
  return `<div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:10px;flex-wrap:wrap"><p class="fictional" style="margin:0">${ic('info', 15)}${t('logHint')}</p><button class="btn btn-ghost btn-sm" data-act="logClear">${t('clearLog')}</button></div>
  <div class="logl">${ABDM.logs.map(l => `<details class="logi"><summary><span class="meth">${l.method}</span><span class="path mono">${esc(l.path)}</span><span class="code ${l.status < 300 ? 'ok' : 'bad'} mono">${l.status}</span><span class="lt mono">${tm(l.at)}</span></summary>
    <div class="logb"><div><p class="lbl">Request</p><pre>${esc(JSON.stringify(Object.assign({headers:hdrs()}, l.req ? {body:l.req} : {}), null, 2))}</pre></div><div><p class="lbl">Response</p><pre>${esc(JSON.stringify(l.res || {}, null, 2))}</pre></div></div>
    <div style="padding:0 12px 12px"><button class="btn btn-secondary btn-sm" data-act="logCopy" data-id="${l.id}">${t('copy')}</button></div></details>`).join('')}</div>`;
}
function abSetup(){
  const row = (k, v) => `<div class="envr"><span>${t(k)}</span><b class="mono">${esc(v)}</b></div>`;
  return `<div class="card"><div class="card-h"><h2>${t('env')}</h2><span class="st ${ABDM.connected ? 'st-paid' : 'st-dis'}">${ABDM.connected ? 'Session OK' : '—'}</span></div>
    ${row('gw', ABDM.gw)}${row('cmid', ABDM.cmid)}${row('hfr', ABDM.hfr)}${row('hip', ABDM.hip)}${row('client', ABDM.client)}${row('bridge', ABDM.bridge)}
    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary" data-act="abTest">${ic('link', 18)}${t('testConn')}</button></div></div>`;
}
function mAbha(m){
  const p = getP(m.pid);
  if (m.step === 1) return {title:t('abhaM'), sub:`${esc(nm(p))} · ${t('abhaS1')}`,
    body:`<div class="field"><span class="lab">${t('abhaHow')}</span><div class="pills" role="group">${[['no','abhaNo'],['addr','abhaAddr'],['mob','abhaMob']].map(([k, l]) => `<button type="button" class="pill" data-act="set" data-path="how" data-val="${k}" data-k="h-${k}" aria-pressed="${m.how === k}">${t(l)}</button>`).join('')}</div></div>
      <div class="field"><label for="ab-v">${t(m.how === 'no' ? 'abhaNo' : m.how === 'addr' ? 'abhaAddr' : 'abhaMob')}</label>${m.how === 'mob' ? `<div class="pre"><span>+91</span>` : ''}<input id="ab-v" data-k="abv" class="input latin${bad(m, 'v')}" data-bind="v" value="${esc(m.v)}" ${m.how === 'addr' ? '' : 'inputmode="numeric"'} placeholder="${m.how === 'no' ? '91-0000-0000-0000' : m.how === 'addr' ? 'name@sbx' : '90000 00000'}" autocomplete="off" style="font-size:18px">${m.how === 'mob' ? '</div>' : ''}${fieldErr(m, 'v')}</div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="abhaNext" data-primary>${ic('send')}${t('sendOtp')}</button>`};
  if (m.step === 2) return {title:t('abhaM'), sub:`${esc(nm(p))} · ${t('abhaS2')}`,
    body:`<div class="callout ok">${ic('check', 18)}<div><p style="opacity:1">${t('otpSent')}</p></div></div>
      <div class="field"><label for="ab-otp">${t('otp')}</label><input id="ab-otp" data-k="otp" class="input latin${bad(m, 'otp')}" data-bind="otp" value="${esc(m.otp)}" inputmode="numeric" maxlength="6" autocomplete="one-time-code" style="font-size:26px;letter-spacing:.4em;text-align:center;font-weight:700">${fieldErr(m, 'otp') || `<p class="err" style="color:var(--text-3)">${ic('info', 15)}${t('otpHint')}</p>`}</div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="abhaBack">${t('back')}</button><button class="btn btn-primary btn-lg grow" data-act="abhaNext" data-primary>${ic('check')}${t('verifyOtp')}</button>`};
  const addr = m.addr;
  return {title:t('abhaM'), sub:`${esc(nm(p))} · ${t('abhaS3')}`,
    body:`<div class="card" style="padding:16px"><p class="eyebrow" style="margin-bottom:10px">${t('profMatch')}</p>
      <dl class="info"><div><dt>${t('patient')}</dt><dd>${esc(nm(p))}</dd></div><div><dt>${S.lang === 'bn' ? 'লিঙ্গ' : 'Gender'}</dt><dd>${sexTxt(p.sex)}</dd></div><div><dt>${t('yob')}</dt><dd class="mono">${TODAY.getFullYear() - p.age}</dd></div><div><dt>${t('abhaAddr')}</dt><dd class="mono" style="color:var(--accent-text)">${esc(addr)}</dd></div><div><dt>${t('abhaNo')}</dt><dd class="mono">${esc(m.no)}</dd></div></dl></div>
      <div class="callout ok">${ic('check', 18)}<div><b>${t('profOk')}</b></div></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="abhaLink" data-primary>${ic('link')}${t('linkNow')}</button>`};
}
function abhaChip(p){ return ''; }
function extraHandlers2(){
  Object.assign(H, {
    skinMenu: () => { const ex = $('skinPop'); if (ex) { ex.remove(); return; } BODY.insertAdjacentHTML('beforeend', skinPop()); setTimeout(() => { const b = ROOT.querySelector('#skinPop [aria-pressed="true"]'); b && b.focus(); }, 20); },
    skin: el => { S.skin = el.dataset.v; HOST.dataset.skin = S.skin; try { localStorage.setItem('as3-skin', S.skin); } catch (e) {} const pop = $('skinPop'); if (pop) pop.remove(); renderAll(); toast(t('skinNow', {n:SKINS.find(k => k.id === S.skin).n[li()]}), 'info'); const b = ROOT.querySelector('[data-act="skinMenu"]'); b && b.focus(); },
    abTab: el => { ABDM.tab = el.dataset.v; renderMain(); const c = ROOT.querySelector(`[data-act="abTab"][data-v="${el.dataset.v}"]`); c && c.focus(); },
    abhaModal: el => openModal({type:'abha', pid:el.dataset.id, step:1, how:'addr', v:'', otp:'', err:{}}),
    abhaBack: () => { S.modal.step = 1; S.modal.err = {}; renderModal(); setTimeout(focusModal, 30); },
    abhaNext: () => {
      const m = S.modal, v = (m.v || '').trim();
      if (m.step === 1) {
        const ok = m.how === 'no' ? /^\d{2}-?\d{4}-?\d{4}-?\d{4}$/.test(v) || /^\d{14}$/.test(v.replace(/-/g, '')) : m.how === 'addr' ? /^[a-z0-9._]{3,}@sbx$/i.test(v) : /^\d{10}$/.test(v);
        if (!ok) { m.err = {v:m.how === 'no' ? 'errAbhaNo' : m.how === 'addr' ? 'errAbhaAddr' : 'errMob'}; rerenderModal(); const x = $('ab-v'); x && x.focus(); return; }
        const tx = reqId();
        addLog('POST', m.how === 'mob' ? '/abha/api/v3/profile/login/request/otp' : '/abha/api/v3/profile/login/request/otp', 200, {scope:['abha-login', m.how === 'mob' ? 'mobile-verify' : 'abha-address-verify'], loginHint:m.how === 'no' ? 'abha-number' : m.how === 'addr' ? 'abha-address' : 'mobile', loginId:'(encrypted)', otpSystem:'abdm'}, {txnId:tx, message:'OTP sent (simulated)'});
        m.txn = tx; m.err = {}; m.step = 2; renderModal(); setTimeout(focusModal, 30); return;
      }
      if (m.step === 2) {
        if (m.otp !== '123456') { m.err = {otp:'errOtp'}; addLog('POST', '/abha/api/v3/profile/login/verify', 422, {txnId:m.txn, otpValue:'(encrypted)'}, {code:'ABDM-1100', message:'Invalid OTP (simulated)'}); rerenderModal(); const x = $('ab-otp'); x && x.focus(); return; }
        const p = getP(m.pid), base = p.name[1].toLowerCase().replace(/[^a-z]+/g, '.').replace(/^\.|\.$/g, '');
        m.addr = m.how === 'addr' ? v.toLowerCase() : base + '@sbx';
        m.no = m.how === 'no' ? v.replace(/\D/g, '').replace(/^(\d{2})(\d{4})(\d{4})(\d{4})$/, '$1-$2-$3-$4') : '91-0000-0000-' + String(2000 + abSeq).slice(-4);
        addLog('POST', '/abha/api/v3/profile/login/verify', 200, {txnId:m.txn, otpValue:'(encrypted)'}, {authResult:'success', accounts:[{ABHANumber:m.no, preferredAbhaAddress:m.addr, name:p.name[1], gender:p.sex, yearOfBirth:String(TODAY.getFullYear() - p.age)}]});
        m.err = {}; m.step = 3; renderModal(); setTimeout(focusModal, 30);
      }
    },
    abhaLink: () => {
      const m = S.modal, p = getP(m.pid);
      p.abha = {no:m.no, addr:m.addr};
      addLog('POST', '/api/hiecm/v3/token/generate-token', 202, {abhaNumber:m.no.replace(/-/g, ''), abhaAddress:m.addr, name:p.name[1], gender:p.sex, yearOfBirth:TODAY.getFullYear() - p.age}, {status:'ACCEPTED'});
      addLog('POST', '(bridge) /api/v3/hip/token/on-generate-token', 200, null, {linkToken:'eyJ…(saved for linking)', abhaAddress:m.addr});
      closeModal(); refresh();
      toast(t('abhaLinked', {name:esc(nm(p))}), 'success', {label:t('undo'), fn:() => { delete p.abha; refresh(); toast(t('undone'), 'info'); }});
    },
    ctxLink: el => H.ctxLinkAll(el, [el.dataset.k]),
    ctxLinkAll: (el, only) => {
      const p = getP(el.dataset.id); const ks = (Array.isArray(only) ? only : ctxOf(p).map(c => c.k)).filter(k => !ABDM.linked.has(k));
      if (!ks.length) return;
      ks.forEach(k => ABDM.linked.add(k));
      addLog('POST', '/api/hiecm/hip/v3/link/carecontext', 202, {abhaNumber:p.abha.no.replace(/-/g, ''), abhaAddress:p.abha.addr, patient:[{referenceNumber:p.id.toUpperCase(), display:p.name[1], careContexts:ks.map(k => ({referenceNumber:k.replace(':', '-').toUpperCase(), display:k.split(':')[1]})), hiType:'DischargeSummary', count:ks.length}]}, {status:'ACCEPTED'});
      addLog('POST', '(bridge) /api/v3/link/on_carecontext', 200, null, {status:'SUCCESS', linkedCount:ks.length});
      renderMain(); toast(t('ctxLinked', {n:num(ks.length), name:esc(nm(p))}), 'success', {label:t('undo'), fn:() => { ks.forEach(k => ABDM.linked.delete(k)); renderMain(); }});
    },
    consApprove: el => { const c = CONSENTS.find(x => x.id === el.dataset.id); c.st = 'GRANTED'; addLog('POST', '(bridge) /api/v3/consent/request/hip/notify', 200, {notification:{consentId:c.id, status:'GRANTED', consentDetail:{purpose:{code:c.purpose}, hiTypes:c.types}}}, {acknowledgement:{status:'OK'}}); renderMain(); toast(t('approved', {id:c.id}), 'info'); },
    consPush: el => { const c = CONSENTS.find(x => x.id === el.dataset.id); c.st = 'TRANSFERRED';
      addLog('POST', '(bridge) /api/v3/hip/health-information/request', 200, {transactionId:reqId(), hiRequest:{consent:{id:c.id}, dateRange:{from:dateAgo(30).toISOString(), to:TODAY.toISOString()}, keyMaterial:{cryptoAlg:'ECDH', curve:'Curve25519'}}}, {acknowledgement:'OK'});
      addLog('POST', '{dataPushUrl} (HIU)', 202, {pageNumber:1, pageCount:1, entries:[{content:'(encrypted FHIR Bundle)', media:'application/fhir+json', careContextReference:c.pid.toUpperCase() + '-ADM'}]}, {status:'ACCEPTED'});
      addLog('POST', '/api/hiecm/data-flow/v3/health-information/notify', 202, {notification:{consentId:c.id, statusNotification:{sessionStatus:'TRANSFERRED'}}}, {status:'ACCEPTED'});
      renderMain(); toast(t('pushed', {id:c.id})); },
    logClear: () => { ABDM.logs = []; renderMain(); },
    logCopy: el => { const l = ABDM.logs.find(x => x.id === +el.dataset.id); const txt = `${l.method} ${l.path}\n${JSON.stringify(l.req || {}, null, 2)}\n→ ${l.status}\n${JSON.stringify(l.res || {}, null, 2)}`;
      try { navigator.clipboard.writeText(txt).then(() => toast(t('copied'), 'info'), () => toast(t('copied'), 'info')); } catch (e) { toast(t('copied'), 'info'); } },
    abTest: () => { addLog('POST', '/api/hiecm/gateway/v3/sessions', 200, {clientId:ABDM.client, clientSecret:'••••••', grantType:'client_credentials'}, {accessToken:'eyJ…', expiresIn:1200, tokenType:'bearer'}); ABDM.connected = true; renderMain(); toast(t('connOk')); }
  });
  ROOT.addEventListener('click', e => { const pop = $('skinPop'); if (pop && !pop.contains(e.target) && !e.target.closest('[data-act="skinMenu"]')) pop.remove(); });
  ROOT.addEventListener('keydown', e => { if (e.key === 'Escape') { const pop = $('skinPop'); if (pop) { pop.remove(); const b = ROOT.querySelector('[data-act="skinMenu"]'); b && b.focus(); } } });
}

/* =====================================================================
   v4: Patients portal — registry + full patient record (Owner / Reception)
   ===================================================================== */
Object.assign(T, {
  navPatients:['রোগী','Patients'],
  plT:['রোগী','Patients'], plS:['সব রোগীর রেকর্ড এক জায়গায় — ভর্তি, ছুটি, বিল ও রিপোর্ট','Every patient record in one place — admissions, discharges, bills and reports'],
  fAll:['সব রোগী','All patients'], fIn:['ভর্তি আছেন','Admitted'], fToday:['আজ ভর্তি','Admitted today'], fOut:['ছুটি হয়েছে','Discharged'], fDue:['বকেয়া আছে','With dues'], fAbha:['ABHA যুক্ত','ABHA linked'],
  plSearch:['নাম, UHID, ফোন বা বেড','Name, UHID, phone or bed'], allWards:['সব ওয়ার্ড','All wards'], allDocs:['সব ডাক্তার','All doctors'],
  colPat:['রোগী','Patient'], colLoc:['ওয়ার্ড / বেড','Ward / bed'], colDoc:['ডাক্তার','Doctor'], colAdm:['ভর্তি','Admitted'], colDx:['রোগনির্ণয়','Diagnosis'], colSt:['অবস্থা','Status'], colBal:['বাকি','Balance'],
  stIn:['ভর্তি আছেন','Admitted'], stOut:['ছুটি হয়েছে','Discharged'], stToday:['আজ ভর্তি','New today'], losN:['{n} দিন','{n} d'],
  plEmpty:['কোনো রোগী পাওয়া যায়নি','No patients found'], plEmptyS:['বানান, UHID বা ফোন নম্বর আবার দেখুন','Check the spelling, UHID or phone'], clearF:['ফিল্টার মুছুন','Clear filters'], showingN:['{n} জন রোগী','{n} patients'],
  // record
  backPl:['রোগীর তালিকা','Patient list'], uhid:['UHID','UHID'], ipNo:['ভর্তি নং','IP no.'], blood:['রক্তের গ্রুপ','Blood group'], fullRec:['সম্পূর্ণ রেকর্ড','Full record'],
  tSum:['সারাংশ','Overview'], tAdm:['ভর্তি ও ভিজিট','Admission & visits'], tVit:['ভাইটালস','Vitals'], tMed:['ওষুধ','Medications'], tLab:['ল্যাব রিপোর্ট','Lab results'], tBill:['বিল ও পেমেন্ট','Billing'], tNotes:['নোট ও টাইমলাইন','Notes & timeline'], tDocs:['ডকুমেন্ট','Documents'],
  kLos:['ভর্তির দিন','Length of stay'], kBill:['মোট বিল','Total bill'], kDue:['বাকি','Balance due'], kBp:['শেষ রক্তচাপ','Last BP'],
  personal:['ব্যক্তিগত তথ্য','Personal details'], fullName:['পুরো নাম','Full name'], ageSex:['বয়স / লিঙ্গ','Age / sex'], yob:['জন্মসাল','Year of birth'], mobile:['মোবাইল','Mobile'], address:['ঠিকানা','Address'], idProof:['পরিচয়পত্র','ID proof'], payer:['পেমেন্টের ধরন','Payer'],
  pSelf:['নিজে (নগদ / UPI)','Self (cash / UPI)'], pScheme:['স্বাস্থ্য প্রকল্প (নমুনা)','Health scheme (sample)'], pTpa:['বিমা / TPA (নমুনা)','Insurance / TPA (sample)'],
  emergency:['জরুরি যোগাযোগ','Emergency contact'], relation:['সম্পর্ক','Relation'], abhaL:['ABHA','ABHA'], notLinked:['যুক্ত নেই','Not linked'],
  clinical:['ক্লিনিক্যাল সারাংশ','Clinical summary'], provDx:['প্রাথমিক রোগনির্ণয়','Provisional diagnosis'], chronic:['দীর্ঘমেয়াদি রোগ','Chronic conditions'], allergy:['অ্যালার্জি','Allergies'], nka:['জানা অ্যালার্জি নেই','No known allergies'], curMeds:['চলতি ওষুধ','Current medicines'], none:['নেই','None'],
  latestV:['শেষ ভাইটালস','Latest vitals'], billSum:['বিলের অবস্থা','Billing status'], recent:['সাম্প্রতিক ঘটনা','Recent activity'], viewAllT:['সব দেখুন','View all'],
  encounter:['বর্তমান ভর্তি','Current admission'], lastEnc:['শেষ ভর্তি','Last admission'], admDate:['ভর্তির তারিখ ও সময়','Admitted on'], admType:['ভর্তির ধরন','Admission type'],
  mEm:['জরুরি','Emergency'], mPl:['পরিকল্পিত','Planned'], mRef:['রেফার হয়ে এসেছেন','Referred'], admBy:['ভর্তি করেছেন','Admitting doctor'], wardBed:['ওয়ার্ড / বেড','Ward / bed'], disDate:['ছুটির তারিখ','Discharged on'], disAdv:['ছুটির পরামর্শ','Discharge advice'], expDis:['সম্ভাব্য ছুটি','Expected discharge'],
  bedHist:['বেড বদলের ইতিহাস','Bed transfers'], prevVisits:['আগের ভিজিট','Previous visits'], visitType:['ধরন','Type'], opd:['ওপিডি','OPD'], ipd:['ভর্তি','IPD'], noPrev:['আগে কোনো ভিজিট নেই','No previous visits'],
  vitHist:['ভাইটালসের ইতিহাস','Vitals history'], time:['সময়','Time'], recBy:['লিখেছেন','By'],
  schedule:['সময়সূচি','Schedule'],
  test:['পরীক্ষা','Test'], result:['ফল','Result'], refRange:['স্বাভাবিক সীমা','Reference'], flag:['মন্তব্য','Flag'], hi:['বেশি','High'], lo:['কম','Low'], nl:['স্বাভাবিক','Normal'], sampleAt:['নমুনা','Sample'],
  docT:['ডকুমেন্ট ও সম্মতিপত্র','Documents & consents'], upload:['ডকুমেন্ট আপলোড','Upload document'], uploaded:['{n} আপলোড হয়েছে (প্রোটোটাইপ)','{n} uploaded (prototype)'], view:['দেখুন','View'], signed:['সই হয়েছে','Signed'], verified:['যাচাই হয়েছে','Verified'], pending:['বাকি','Pending'],
  dConsent:['ভর্তি ও চিকিৎসার সম্মতিপত্র','Admission & treatment consent'], dId:['পরিচয়পত্রের কপি','ID proof copy'], dAdm:['ভর্তির ফর্ম','Admission form'], dLab:['ল্যাব রিপোর্ট (PDF)','Lab report (PDF)'], dDis:['ডিসচার্জ সামারি','Discharge summary'], dOt:['অপারেশনের সম্মতিপত্র','Surgery consent'], dBill:['চূড়ান্ত বিল','Final bill'],
  docProto:['প্রোটোটাইপে ডকুমেন্ট খোলে না','Documents don’t open in this prototype'],
  evAdm:['ভর্তি হয়েছেন · {bed}','Admitted · {bed}'], evPay:['{amt} জমা ({m})','{amt} paid ({m})'], evDis:['ছুটি হয়েছে','Discharged'], evAdv:['ছুটির পরামর্শ দিয়েছেন {doc}','Discharge advised by {doc}'], evNote:['ডাক্তারের নোট','Doctor’s note'], evVit:['ভাইটালস নেওয়া হয়েছে','Vitals recorded'], evHo:['নার্সিং হ্যান্ডওভার','Nursing handover'], evCharge:['{c} যোগ · {amt}','{c} added · {amt}'],
  printSum:['বিল প্রিন্ট','Print bill'],
});
const VILL = [['বিষ্ণুপুর','Bishnupur'],['সোনামুখী','Sonamukhi'],['জয়পুর','Joypur'],['ইন্দাস','Indas'],['কোতুলপুর','Kotulpur'],['পাত্রসায়ের','Patrasayer'],['ওন্দা','Onda'],['বাঁকুড়া','Bankura']];
const BG = ['B+','O+','A+','O+','B+','AB+','O-','A+','B-','O+','A-','B+','O+','A+','AB-','O+','B+','A+','O+'];
const ALG = {p1:[['পেনিসিলিন','Penicillin',1]], p4:[['পেনিসিলিন','Penicillin',1]], p7:[['সালফা ওষুধ','Sulfa drugs',0]], p10:[['আয়োডিন কনট্রাস্ট','Iodine contrast',0]], p16:[['ল্যাটেক্স','Latex',0]]};
const CHR = {p1:[['সিওপিডি','COPD'],['ধূমপান','Smoker']], p4:[['উচ্চ রক্তচাপ','Hypertension'],['ডায়াবেটিস','Diabetes']], p7:[['টাইপ ২ ডায়াবেটিস','Type 2 diabetes']], p10:[['উচ্চ রক্তচাপ','Hypertension'],['কোলেস্টেরল বেশি','High cholesterol']], p14:[['কিডনির দীর্ঘমেয়াদি রোগ','Chronic kidney disease']], p12:[['হাঁপানি','Asthma']]};
const PREV = {p1:[[120,'opd',['শ্বাসকষ্ট','Breathlessness'],'d1'],[300,'ipd',['নিউমোনিয়া','Pneumonia'],'d1']], p4:[[60,'opd',['উচ্চ রক্তচাপ','Hypertension'],'d1']], p7:[[45,'opd',['সুগার পরীক্ষা','Sugar review'],'d1'],[200,'opd',['ডায়াবেটিস','Diabetes'],'d1']], p3:[[30,'opd',['প্রসবপূর্ব চেক-আপ','Antenatal check-up'],'d2'],[60,'opd',['প্রসবপূর্ব চেক-আপ','Antenatal check-up'],'d2']], p10:[[90,'opd',['বুকে ব্যথা','Chest pain'],'d1']]};
const LABS = {
  base:[['Hb','হিমোগ্লোবিন','Haemoglobin','g/dL',12,16,13.2],['TLC','মোট শ্বেতকণিকা','Total WBC','/µL',4000,11000,8200],['PLT','প্লেটলেট','Platelets','lakh/µL',1.5,4.5,2.4],['CREAT','ক্রিয়েটিনিন','Creatinine','mg/dL',0.7,1.3,0.9],['RBS','ব্লাড সুগার','Blood sugar (R)','mg/dL',70,140,112],['NA','সোডিয়াম','Sodium','mmol/L',135,145,139]],
  over:{p1:{TLC:13400}, p4:{CREAT:1.4,NA:134,RBS:152}, p7:{RBS:238}, p12:{TLC:14800}, p13:{Hb:7.4}, p14:{CREAT:2.6}, p16:{PLT:0.9}, p5:{Hb:10.6}, p3:{Hb:10.2}}
};
function px(p){
  if (p._x) return p._x;
  const pt = p.pt || {}, a = p.row || {};
  const prev = P.filter(q => q !== p && q.row && q.row.patient_id && q.row.patient_id === a.patient_id).map(q => [Math.max(0, dBetween(q.admAt, p.admAt)), 'ipd', q.reason, q.doc, q]);
  p._x = {uhid:p.uhid || '—', ip:a.ip_number || ('IP-' + String(a.id || '').slice(0, 6).toUpperCase()), bg:pt.blood_group || '—', addr:two(pt.address || a.patient_address || '—'),
    payer:a.scheme || a.payer || 'pSelf', mode:a.admission_type || '', hr:p.admAt.getHours(), min:p.admAt.getMinutes(),
    id:two(pt.id_type ? pt.id_type + (pt.id_last4 ? ' · ••••' + pt.id_last4 : '') : '—'), alg:[], chr:[], prev};
  if (!T[p._x.payer]) p._x.payer = 'pSelf';
  return p._x;
}
function labsOf(p){ const o = LABS.over[p.id] || {}; return LABS.base.map(([k, bn, en, u, lo, hi, v]) => ({k, n:[bn, en], u, lo, hi, v:o[k] != null ? o[k] : +(v * (0.94 + ((parseInt(p.id.slice(1)) * 7 + k.length) % 10) / 80)).toFixed(v < 10 ? 1 : 0)})); }
const fmtV = v => v >= 1000 ? num(Math.round(v)) : num(v);
const encDate = p => new Date(p.admAt);
function patStatus(p){ if (p.disc) return 'out'; if (p.days === 0) return 'today'; return 'in'; }
const patChip = p => { const s = patStatus(p); return `<span class="st ${s === 'out' ? 'st-dis' : s === 'today' ? 'st-partial' : 'st-paid'}">${t(s === 'out' ? 'stOut' : s === 'today' ? 'stToday' : 'stIn')}</span>`; };
S.patId = null; S.patTab = 'sum'; S.patF = 'all'; S.patQ = ''; S.patWard = 'all'; S.patDoc = 'all';

function patMatch(p){
  const q = S.patQ.trim().toLowerCase(), qd = q.replace(/[\s-]/g, '');
  const f = S.patF;
  if (f === 'in' && p.disc) return false; if (f === 'today' && !(!p.disc && p.days === 0)) return false; if (f === 'out' && !p.disc) return false;
  if (f === 'due' && !totals(p).bal) return false; if (f === 'abha' && !p.abha) return false;
  if (S.patWard !== 'all' && bedWard(p.bed) !== S.patWard) return false; if (S.patDoc !== 'all' && p.doc !== S.patDoc) return false;
  if (!q) return true;
  return p.name.some(n => n.toLowerCase().includes(q)) || String(px(p).uhid).toLowerCase().replace(/-/g, '').includes(qd) || (qd.length >= 3 && (p.phone.includes(qd) || p.fam.includes(qd))) || p.bed.toLowerCase() === qd;
}
function vPatients(){
  if (S.patId && getP(S.patId)) return vPatRecord(getP(S.patId));
  const cnt = {all:P.length, in:P.filter(p => !p.disc).length, today:P.filter(p => !p.disc && p.days === 0).length, out:P.filter(p => p.disc).length, due:P.filter(p => totals(p).bal > 0).length};
  const F = [['all','fAll'],['in','fIn'],['today','fToday'],['out','fOut'],['due','fDue']];
  return `<div class="ph"><div><h1>${t('plT')}</h1><p class="sub">${t('plS')}</p></div><div class="ph-actions"><button class="btn btn-secondary" data-act="nav" data-v="families">${ic('users')}${t('navFam')}</button>${R().fab ? `<button class="btn btn-primary" data-act="admit">${ic('plus')}${t('newAdmission')}</button>` : ''}</div></div>
  <div class="pstats">${F.map(([k, l]) => `<button class="pstat ${S.patF === k ? 'on' : ''}" data-act="patF" data-v="${k}" aria-pressed="${S.patF === k}"><b>${num(cnt[k])}</b><span>${t(l)}</span></button>`).join('')}</div>
  <div class="toolbar ptool">
    <label class="search"><span class="vh">${t('plSearch')}</span>${ic('search')}<input class="input" id="patQ" type="search" placeholder="${t('plSearch')}" value="${esc(S.patQ)}" autocomplete="off"></label>
    <label class="vh" for="patWard">${t('allWards')}</label><select id="patWard" class="input psel">${[['all', t('allWards')]].concat(WARDS.map(w => [w.id, t(w.key)])).map(([v, l]) => `<option value="${v}" ${S.patWard === v ? 'selected' : ''}>${l}</option>`).join('')}</select>
    <label class="vh" for="patDoc">${t('allDocs')}</label><select id="patDoc" class="input psel">${[['all', t('allDocs')]].concat(Object.keys(DOC).map(d => [d, docName(d)])).map(([v, l]) => `<option value="${v}" ${S.patDoc === v ? 'selected' : ''}>${l}</option>`).join('')}</select>
  </div>
  <div class="card flush" id="patList">${patList()}</div>`;
}
function patList(){
  const L = P.filter(patMatch).sort((a, b) => (a.disc - b.disc) || (a.admAgo - b.admAgo));
  if (!L.length) return emptyState('search', t('plEmpty'), t('plEmptyS'), `<button class="btn btn-secondary" data-act="patClear">${t('clearF')}</button>`);
  return `<div class="pl-row pl-head" aria-hidden="true"><span>${t('colPat')}</span><span>${t('colLoc')}</span><span>${t('colDoc')}</span><span>${t('colAdm')}</span><span>${t('colDx')}</span><span>${t('colSt')}</span><span class="r">${t('colBal')}</span><span></span></div>` +
    L.map(p => { const x = px(p), b = totals(p).bal;
      return `<button class="pl-row" data-act="patOpen" data-id="${p.id}" aria-label="${esc(nm(p))}">
        <span class="pp">${avatar(p)}<span class="tt"><b>${esc(nm(p))}${p.abha ? ` <span class="abtag">ABHA</span>` : ''}${x.alg.some(a => a[2]) ? ` <span class="algtag" title="${esc(x.alg[0][li()])}">${ic('alert', 12)}</span>` : ''}</b><span><span class="latin">${x.uhid}</span> · ${num(p.age)} · ${sexTxt(p.sex)} · <span class="latin">${fmtPhone(p.phone)}</span></span></span></span>
        <span class="pc"><span class="lm">${t('colLoc')}</span>${p.disc ? `<span style="color:var(--text-3)">${t('stOut')}</span>` : `<b class="latin">${p.bed}</b> · ${t(wKey(p.bed))}`}</span>
        <span class="pc"><span class="lm">${t('colDoc')}</span>${docName(p.doc)}</span>
        <span class="pc"><span class="lm">${t('colAdm')}</span>${fdate(dateAgo(p.admAgo))} <small>· ${t('losN', {n:num(Math.max(1, p.days))})}</small></span>
        <span class="pc dx"><span class="lm">${t('colDx')}</span>${esc(p.reason[li()])}</span>
        <span class="pc">${patChip(p)}</span>
        <span class="pc r"><span class="lm">${t('colBal')}</span><b class="${b ? 'due' : 'zero'}">${money(b)}</b></span>
        <span class="chev">${ic('chevR', 18)}</span></button>`; }).join('') + `<p class="pl-foot">${t('showingN', {n:num(L.length)})}</p>`;
}

function vPatRecord(p){
  const x = px(p), tt = totals(p), v = lastV(p);
  const tabs = [['sum','tSum'],['adm','tAdm'],['vit','tVit'],['stk','stkTab'],['bill','tBill'],['notes','tNotes'],['docs','tDocs']];
  const canMoney = S.role === 'owner' || S.role === 'reception';
  return `<p class="crumb"><button class="link" data-act="patBack">${ic('chevR', 14).replace('class="ic"', 'class="ic" style="transform:rotate(180deg)"')}${t('backPl')}</button><span>›</span><b>${esc(nm(p))}</b></p>
  <section class="card prec">
    <div class="prec-top">
      <span class="pava ${avClass(p.id)}" aria-hidden="true">${esc(initials(p))}</span>
      <div class="prec-id">
        <h1>${esc(nm(p))} ${patChip(p)} ${!p.disc ? `<span class="st st-dis latin">${p.bed}</span>` : ''}</h1>
        <p><span>${num(p.age)} ${S.lang === 'bn' ? 'বছর' : 'yrs'} · ${sexTxt(p.sex)}</span><span>·</span><span>${t('uhid')} <b class="latin">${x.uhid}</b></span>${x.bg !== '—' ? `<span>·</span><span>${t('blood')} <b class="latin">${x.bg}</b></span>` : ''}${p.phone ? `<span>·</span><a href="tel:+91${p.phone}" class="latin">${ic('phone', 14)}${fmtPhone(p.phone)}</a>` : ''}</p>
        <div class="prec-tags">${x.alg.length ? x.alg.map(a => `<span class="ptag ${a[2] ? 'red' : 'amber'}">${ic('alert', 13)}${t('allergy')}: ${a[li()]}${a[2] ? (S.lang === 'bn' ? ' (গুরুতর)' : ' (severe)') : ''}</span>`).join('') : ''}<span class="ptag">${t(x.payer)}</span>${p.advice && !p.disc ? `<span class="ptag green">${ic('exit', 13)}${t('advBy', {doc:advName(p)})}</span>` : ''}</div>
      </div>
      <div class="prec-act"><button class="btn btn-primary" data-act="shOpen" data-id="${p.id}">${ic('send')}${t('shareBtn')}</button><button class="btn btn-secondary" data-act="lgScheme" data-id="${p.id}">${ic('shield')}${t('lgScheme')}</button>${!p.disc ? `<button class="btn btn-secondary" data-act="skIssue" data-pid="${p.id}">${ic('box')}${t('stkGive')}</button>` : ''}${canMoney ? `${tt.bal ? `<button class="btn btn-secondary" data-act="pay" data-id="${p.id}">${ic('rupee')}${t('recordPayment')}</button>` : ''}${!p.disc ? `<button class="btn btn-secondary" data-act="charge" data-id="${p.id}">${ic('plus')}${t('addCharge')}</button><button class="btn btn-secondary" data-act="discharge" data-id="${p.id}">${ic('exit')}${t('discharge')}</button>` : ''}` : ''}<button class="btn btn-ghost" data-act="printBill" data-id="${p.id}">${ic('download')}${t('printSum')}</button></div>
    </div>
    <div class="prec-kpi">
      <div><span>${t('kLos')}</span><b>${p.days === 0 ? t('admittedToday') : daysTxt(Math.max(1, p.days))}</b></div>
      <div><span>${t('kBill')}</span><b>${money(tt.total)}</b></div>
      <div class="${tt.bal ? 'due' : ''}"><span>${t('kDue')}</span><b>${money(tt.bal)}</b></div>
      <div class="${isAb(v) ? 'due' : ''}"><span>${t('kBp')}</span><b class="latin">${v.sys != null ? v.sys + '/' + (v.dia != null ? v.dia : '—') : '—'}</b></div>
    </div>
    <div class="ptabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" class="ptab" data-act="patTab" data-v="${k}" aria-selected="${S.patTab === k}">${t(l)}</button>`).join('')}</div>
  </section>
  <div class="prec-body">${({sum:pSum, adm:pAdm, vit:pVit, med:pMed, stk:pStk, lab:pLab, bill:pBill, notes:pNotes, docs:pDocs})[S.patTab](p)}</div>`;
}
const kv = (rows) => `<dl class="kvs">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
const cardH = (title, right) => `<div class="card-h"><h2>${title}</h2>${right || ''}</div>`;
function events(p){
  const E = [{at:encDate(p), ic:'bed', tone:'blue', tx:t('evAdm', {bed:p.bed || '—'}), by:docName(p.doc)}];
  p.pays.forEach(y => E.push({at:y.at, ic:'rupee', tone:'green', tx:t('evPay', {amt:money(y.amt), m:t(y.m)}), by:''}));
  (p.ch || []).filter(c => c.type !== 'bed').forEach(c => E.push({at:c.at, ic:'plus', tone:'grey', tx:t('evCharge', {c:t('c' + c.type), amt:money(c.amt)}), by:c.desc || ''}));
  (p.vit || []).slice(-3).forEach(v => E.push({at:v.at, ic:'heart', tone:'amber', tx:t('evVit') + (v.sys != null ? ` · BP ${v.sys}/${v.dia != null ? v.dia : '—'}` : ''), by:v.by || ''}));
  if (p.advice) E.push({at:p.advice.at || new Date(), ic:'exit', tone:'green', tx:t('evAdv', {doc:advName(p)}), by:''});
  if (p.disc && p.discAt) E.push({at:p.discAt, ic:'exit', tone:'grey', tx:t('evDis'), by:''});
  return E.sort((a, b) => b.at - a.at);
}
const tlList = (E) => `<ul class="tline">${E.map(e => `<li><span class="tl-ic tl-${e.tone}">${ic(e.ic, 16)}</span><div><b>${esc(e.tx)}</b><span>${esc(e.by)} · ${fdate(e.at, {day:'numeric', month:'short'})}, ${tm(e.at)}</span></div></li>`).join('')}</ul>`;
function pSum(p){
  const x = px(p), tt = totals(p), relKey = 'r' + p.rel;
  return `<div class="pgrid">
    <section class="card">${cardH(t('personal'))}${kv([[t('fullName'), esc(nm(p))], [t('ageSex'), `${num(p.age)} · ${sexTxt(p.sex)}`], [t('uhid'), `<b class="latin">${esc(x.uhid)}</b>`], [t('blood'), `<b class="latin">${x.bg}</b>`], [t('mobile'), `<span class="latin">${fmtPhone(p.phone)}</span>`], [t('address'), esc(x.addr[li()])], [t('payer'), t(x.payer)]])}
      <div class="subh">${t('emergency')}</div>${kv([[t('relation'), p.fam ? t(relKey) : '—'], [t('mobile'), p.fam ? `<a class="latin" href="tel:+91${p.fam}">${fmtPhone(p.fam)}</a>` : '—']])}</section>
    <div class="pcol">
      <section class="card">${cardH(t('clinical'))}${kv([[t('provDx'), `<b>${esc(p.reason[li()] || '—')}</b>`], [t('admBy'), docName(p.doc)], [t('kLos'), p.days === 0 ? t('admittedToday') : daysTxt(Math.max(1, p.days))], [t('disAdv'), p.advice && !p.disc ? `<span style="color:var(--ok);font-weight:600">${t('advBy', {doc:advName(p)})}</span>` : '—']])}</section>
      <section class="card">${cardH(t('latestV'), `<span class="meta">${lastV(p).at ? t('lastV', {t:tm(lastV(p).at)}) : t('noVit')}</span>`)}${vitRow(p)}</section>
      <section class="card">${cardH(t('billSum'), stChip(p))}<div class="bal">${[['totalBill', tt.total, ''], ['paid', tt.paid, ''], ['balance', tt.bal, tt.bal ? 'due' : 'clear']].map(([k, v, c]) => `<div class="${c}"><div class="k">${t(k)}</div><div class="v">${money(v)}</div></div>`).join('')}</div></section>
    </div>
    <section class="card pspan">${cardH(t('recent'), `<button class="link" data-act="patTab" data-v="notes">${t('viewAllT')}${ic('chevR', 16)}</button>`)}${tlList(events(p).slice(0, 4))}</section>
  </div>`;
}
function pAdm(p){
  const x = px(p), mode = {em:'mEm', pl:'mPl', ref:'mRef'}[x.mode] || '';
  const hist = [{bed:p.bed, at:encDate(p), cur:!p.disc}];
  if (false) hist.push({bed:'G' + (parseInt(p.bed.slice(1)) + 5), at:new Date(encDate(p).getTime() - 0), cur:false, from:true});
  return `<div class="pgrid">
    <section class="card">${cardH(p.disc ? t('lastEnc') : t('encounter'), patChip(p))}${kv([[t('ipNo'), `<b class="latin">${x.ip}</b>`], [t('admDate'), `${fdate(encDate(p), {day:'numeric', month:'long', year:'numeric'})}, ${tm(encDate(p))}`], [t('admBy'), docName(p.doc)], [t('wardBed'), `<b class="latin">${esc(p.bed || '—')}</b> · ${t(wKey(p.bed))}`], [t('provDx'), esc(p.reason[li()])], [t('kLos'), daysTxt(Math.max(1, p.days))]].concat(p.disc ? [[t('disDate'), fdate(dateAgo(p.discAgo), {day:'numeric', month:'long', year:'numeric'})]] : [[t('disAdv'), p.advice ? `<span style="color:var(--ok);font-weight:600">${t('advBy', {doc:advName(p)})}</span>` : '—']]))}</section>
    <div class="pcol">
      <section class="card">${cardH(t('bedHist'))}<ul class="tline">${[{bed:p.bed, at:encDate(p)}].map(h => `<li><span class="tl-ic tl-blue">${ic('bed', 16)}</span><div><b class="latin">${esc(h.bed || '—')} · ${t(wKey(h.bed))}</b><span>${fdate(h.at)}, ${tm(h.at)} ${!p.disc ? '· ' + (S.lang === 'bn' ? 'এখন এখানে' : 'current') : ''}</span></div></li>`).join('')}</ul></section>
      <section class="card">${cardH(t('prevVisits'), `<span class="meta">${num(x.prev.length)}</span>`)}${x.prev.length ? `<ul class="lines">${x.prev.map(v => `<li><span class="line-ic">${ic('bed', 18)}</span><span class="line-t"><b>${esc(v[2][li()] || '—')}</b><span>${docName(v[3])} · ${fdate(v[4].admAt, {day:'numeric', month:'short', year:'numeric'})}</span></span><span class="st st-partial">${t('ipd')}</span></li>`).join('')}</ul>` : `<p class="meta">${t('noPrev')}</p>`}</section>
    </div></div>`;
}
function pVit(p){
  const rows = (p.vit || []).slice().reverse(), ok = x => x != null && !isNaN(x);
  return `<section class="card" style="margin-bottom:16px">${cardH(t('latestV'))}${vitRow(p)}</section>
  <section class="card flush">${cardH(t('vitHist'))}${rows.length ? `<div class="tblw"><table class="ptbl"><thead><tr><th>${t('time')}</th><th>${t('bp')}</th><th>${t('pulse')}</th><th>${t('temp')}</th><th>${t('spo2')}</th><th>${t('recBy')}</th></tr></thead><tbody>
    ${rows.map(v => `<tr><td>${fdate(v.at, {day:'numeric', month:'short'})}, ${tm(v.at)}</td><td class="latin ${ok(v.sys) && (vAb.sys(v.sys) || (ok(v.dia) && vAb.dia(v.dia))) ? 'ab' : ''}">${ok(v.sys) ? v.sys + '/' + (ok(v.dia) ? v.dia : '—') : '—'}</td><td class="latin ${ok(v.pulse) && vAb.pulse(v.pulse) ? 'ab' : ''}">${ok(v.pulse) ? v.pulse : '—'}</td><td class="latin ${ok(v.temp) && vAb.temp(v.temp) ? 'ab' : ''}">${ok(v.temp) ? Number(v.temp).toFixed(1) + '°F' : '—'}</td><td class="latin ${ok(v.spo2) && vAb.spo2(v.spo2) ? 'ab' : ''}">${ok(v.spo2) ? v.spo2 + '%' : '—'}</td><td>${esc(v.by || '—')}</td></tr>`).join('')}</tbody></table></div>` : `<div style="padding:8px">${emptyState('heart', t('noVit'), t('noVitS'))}</div>`}</section>`;
}
function pMed(p){
  if (p.disc || !p.meds || !p.meds.length) return `<div class="card">${emptyState('pill', t('curMeds'), t('none'))}</div>`;
  return `<section class="card flush">${cardH(t('curMeds'), `<span class="meta">${num(p.meds.length)}</span>`)}<ul class="lines" style="border:0;border-radius:0">${p.meds.map((m, mi) => `<li><span class="line-ic">${ic('pill', 18)}</span><span class="line-t"><b>${esc(m.n)}</b><span>${esc(m.dose)} · ${t('schedule')}: <span class="latin">${m.s.map(si => hr(SLOTS[si])).join(', ')}</span></span></span><span class="doses">${medChip(p, m, mi)}</span></li>`).join('')}</ul></section>`;
}
function pLab(p){
  const L = labsOf(p);
  return `<section class="card flush">${cardH(t('tLab'), `<span class="meta">${t('sampleAt')}: ${fdate(dateAgo(Math.max(0, p.days - 1)))}</span>`)}<div class="tblw"><table class="ptbl"><thead><tr><th>${t('test')}</th><th>${t('result')}</th><th>${t('refRange')}</th><th></th><th>${t('flag')}</th></tr></thead><tbody>
    ${L.map(l => { const f = l.v > l.hi ? 'hi' : l.v < l.lo ? 'lo' : 'nl', pos = Math.max(2, Math.min(98, (l.v - l.lo) / (l.hi - l.lo) * 60 + 20));
      return `<tr><td><b>${l.n[li()]}</b><br><small class="latin">${l.k}</small></td><td class="latin ${f !== 'nl' ? 'ab' : ''}"><b>${fmtV(l.v)}</b> <small>${l.u}</small></td><td class="latin">${fmtV(l.lo)} – ${fmtV(l.hi)}</td><td><span class="rng" aria-hidden="true"><i style="left:${pos}%"></i></span></td><td><span class="st ${f === 'nl' ? 'st-paid' : 'st-overdue'}">${t(f)}</span></td></tr>`; }).join('')}</tbody></table></div></section>`;
}
function pBill(p){
  const x = totals(p), ch = charges(p);
  return `<div class="pgrid">
    <section class="card flush">${cardH(t('charges'), `<span class="meta">${num(ch.length)}</span>`)}<ul class="lines" style="border:0;border-radius:0">${ch.map(c => `<li><span class="line-ic">${ic(cIcon[c.type], 18)}</span><span class="line-t"><b>${t('c' + c.type)}</b><span>${c.desc ? esc(c.desc) + ' · ' : ''}${fdate(dateAgo(c.ago))}</span></span><span class="amt">${money(c.amt)}</span></li>`).join('')}<li class="tot"><span class="line-t"><b>${t('totalBill')}</b></span><span class="amt">${money(x.total)}</span></li></ul></section>
    <div class="pcol">
      <section class="card">${cardH(t('billSum'), stChip(p))}<div class="bal">${[['totalBill', x.total, ''], ['paid', x.paid, ''], ['balance', x.bal, x.bal ? 'due' : 'clear']].map(([k, v, c]) => `<div class="${c}"><div class="k">${t(k)}</div><div class="v">${money(v)}</div></div>`).join('')}</div>
        ${(S.role === 'owner' || S.role === 'reception') ? `<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">${x.bal ? `<button class="btn btn-primary" data-act="pay" data-id="${p.id}">${ic('rupee')}${t('recordPayment')}</button>` : ''}${!p.disc ? `<button class="btn btn-secondary" data-act="charge" data-id="${p.id}">${ic('plus')}${t('addCharge')}</button>` : ''}<button class="btn btn-ghost" data-act="printBill" data-id="${p.id}">${ic('download')}${t('printSum')}</button></div>` : ''}</section>
      <section class="card flush">${cardH(t('payments'), `<span class="meta">${money(x.paid)}</span>`)}${p.pays.length ? `<ul class="lines" style="border:0;border-radius:0">${p.pays.slice().reverse().map(y => `<li><span class="line-ic">${ic(methodIcon(y.m), 18)}</span><span class="line-t"><b>${t(y.m)}</b><span>${fdate(dateAgo(y.ago))}${y.ref ? ' · ' + esc(y.ref) : ''}</span></span><span class="amt">${money(y.amt)}</span></li>`).join('')}</ul>` : `<div style="padding:8px">${emptyState('rupee', t('noPayments'), '')}</div>`}</section>
    </div></div>`;
}
function pNotes(p){ return `<section class="card">${cardH(t('tNotes'), `<span class="meta">${num(events(p).length)}</span>`)}${tlList(events(p))}</section>`; }
function docsOf(p){ return (p.docs || []).map(d => [d.n, d.at, 'verified', true, d]); }
function pDocs(p){
  if (!p.docsLoaded) { loadDocs(p); }
  const D = docsOf(p);
  return `<section class="card flush">${cardH(t('docT'), `<label class="btn btn-secondary btn-sm" for="docUp" tabindex="0">${ic('download', 16).replace('class="ic"', 'class="ic" style="transform:rotate(180deg)"')}${t('upload')}</label><input id="docUp" type="file" class="vh" accept="image/*,application/pdf" data-pid="${p.id}">`)}
    ${!p.docsLoaded ? `<div style="padding:14px"><div class="sk sk-row"></div><div class="sk sk-row"></div></div>` : D.length ? `<ul class="lines" style="border:0;border-radius:0">${D.map(d => `<li><span class="line-ic">${ic('file', 18)}</span><span class="line-t"><b>${esc(d[0])}</b><span>${d[1] ? fdate(d[1]) : '—'}${d[4] && d[4].type ? ' · ' + esc(d[4].type) : ''}</span></span><button class="btn btn-ghost btn-sm" data-act="docView" data-path="${esc(d[4].path)}">${t('view')}</button></li>`).join('')}</ul>` : `<div style="padding:8px">${emptyState('file', t('noDocs'), '')}</div>`}</section>`;
}
function extraHandlers3(){
  Object.assign(H, {
    patOpen: el => { if (S.drawer) closeDrawer(); S.patId = el.dataset.id; S.patTab = 'sum'; if (S.view !== 'patients') { go('patients'); return; } renderMain(); window.scrollTo(0, 0); const h = ROOT.querySelector('.prec h1'); if (h) { h.tabIndex = -1; h.focus({preventScroll:true}); } },
    patBack: () => { S.patId = null; renderMain(); window.scrollTo(0, 0); },
    patTab: el => { S.patTab = el.dataset.v; renderMain(); const b = ROOT.querySelector(`.ptab[data-v="${el.dataset.v}"]`); b && b.focus({preventScroll:true}); },
    patF: el => { S.patF = el.dataset.v; renderMain(); const b = ROOT.querySelector(`.pstat[data-v="${el.dataset.v}"]`); b && b.focus(); },
    patClear: () => { S.patF = 'all'; S.patQ = ''; S.patWard = 'all'; S.patDoc = 'all'; renderMain(); },
    patFull: el => H.patOpen(el),
    docView: () => toast(t('docProto'), 'info')
  });
  const navPrev = H.nav;
  H.nav = el => { if (el.dataset.v === 'patients') S.patId = null; navPrev(el); };
  ROOT.addEventListener('input', e => { if (e.target.id === 'patQ') { S.patQ = e.target.value; const l = $('patList'); if (l) l.innerHTML = patList(); } });
  ROOT.addEventListener('change', e => {
    if (e.target.id === 'patWard') { S.patWard = e.target.value; $('patList').innerHTML = patList(); }
    if (e.target.id === 'patDoc') { S.patDoc = e.target.value; $('patList').innerHTML = patList(); }
    if (e.target.id === 'docUp' && e.target.files[0]) { const p = getP(e.target.dataset.pid); (p.docs = p.docs || []).push({n:e.target.files[0].name, at:new Date()}); renderMain(); toast(t('uploaded', {n:esc(e.target.files[0].name)})); }
  });
  ROOT.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('label[for="docUp"]')) { e.preventDefault(); $('docUp').click(); } });
}

/* =====================================================================
   v5: Health history — share with any doctor (QR + PIN / PDF / SMS / ABHA)
   ===================================================================== */
Object.assign(T, {
  shareBtn:['ইতিহাস শেয়ার','Share history'], shT:['স্বাস্থ্য ইতিহাস শেয়ার','Share health history'],
  shS1:['ধাপ ১ / ৩ · কী কী দেখাবেন','Step 1 of 3 · What to include'], shS2:['ধাপ ২ / ৩ · কীভাবে দেবেন','Step 2 of 3 · How to share'], shS3:['ধাপ ৩ / ৩ · তৈরি','Step 3 of 3 · Ready'],
  shWhat:['ডাক্তারকে কোন কোন তথ্য দেখাবেন?','Which information should the doctor see?'], shRange:['কত দিনের ইতিহাস','History period'], rAll:['সব','All'], r1y:['১ বছর','1 year'], r6m:['৬ মাস','6 months'],
  secId:['পরিচয় ও যোগাযোগ','Identity & contact'], secAlg:['অ্যালার্জি ও দীর্ঘমেয়াদি রোগ','Allergies & chronic conditions'], secMed:['চলতি ওষুধ','Current medicines'], secVisit:['ভর্তি ও ভিজিটের ইতিহাস','Admissions & visits'],
  secVit:['ভাইটালস','Vitals'], secLab:['ল্যাব রিপোর্ট','Lab results'], secNotes:['ডাক্তারের নোট ও টাইমলাইন','Doctor notes & timeline'], secDis:['ছুটির পরামর্শ ও ফলো-আপ','Discharge advice & follow-up'], secDocs:['সংযুক্ত ডকুমেন্টের তালিকা','Attached documents list'], secBill:['বিলের সারাংশ','Billing summary'],
  must:['আবশ্যক','Required'], billHint:['সাধারণত অন্য ডাক্তারকে বিল দেখানো হয় না','Bills are usually not shown to another doctor'],
  shHow:['ডাক্তার কীভাবে দেখবেন?','How will the doctor see it?'],
  mQr:['QR কোড + PIN','QR code + PIN'], mQrS:['ডাক্তার ফোনে স্ক্যান করে PIN দিয়ে দেখবেন','Doctor scans with phone and enters PIN'],
  mPdf:['PDF ডাউনলোড','Download PDF'], mPdfS:['প্রিন্ট করে বা WhatsApp-এ পাঠানো যায়','Print it or send on WhatsApp'],
  mSms:['রোগীর মোবাইলে লিংক','Link to patient’s mobile'], mSmsS:['রোগী নিজে ডাক্তারকে লিংক দেখাবেন','Patient shows the link to the doctor'],
  mAbha:['ABHA দিয়ে শেয়ার','Share via ABHA'], mAbhaS:['ABDM-এর মাধ্যমে কনসেন্টে (স্যান্ডবক্স)','Consent-based via ABDM (sandbox)'], needAbha:['আগে ABHA যুক্ত করুন','Link ABHA first'],
  validity:['লিংক কত দিন চালু থাকবে','Link valid for'], v24:['২৪ ঘণ্টা','24 hours'], v7:['৭ দিন','7 days'], vOnce:['একবার দেখার পর বন্ধ','One view only'],
  consent:['রোগী (বা পরিবার) সম্মতি দিয়েছেন','Patient (or family) has given consent'], consentS:['রোগীর তথ্য শুধু তাঁর অনুমতিতে শেয়ার করা যায়','Patient data can only be shared with their permission'], errConsent:['আগে রোগীর সম্মতি নিন','Take the patient’s consent first'], errSec:['অন্তত একটি অংশ বেছে নিন','Pick at least one section'],
  create:['তৈরি করুন','Create'], next:['পরবর্তী','Next'], back:['পিছনে','Back'],
  ready:['শেয়ার তৈরি হয়েছে','Share is ready'], scanThis:['ডাক্তার এই QR স্ক্যান করবেন','Doctor scans this QR'], pinIs:['অ্যাক্সেস PIN','Access PIN'], pinTell:['PIN শুধু ডাক্তারকে মুখে বলুন','Tell the PIN only to the doctor'], validTill:['চালু থাকবে {d} পর্যন্ত','Valid till {d}'], oneView:['একবার দেখার পর বন্ধ হবে','Closes after one view'],
  copyLink:['লিংক কপি','Copy link'], copied:['লিংক কপি হয়েছে','Link copied'], dlPdf:['PDF ডাউনলোড','Download PDF'], printDoc:['প্রিন্ট','Print'], docScreen:['ডাক্তার কী দেখবেন','Doctor’s view'], revoke:['শেয়ার বন্ধ করুন','Revoke'], revoked:['শেয়ার বন্ধ করা হয়েছে — লিংক আর খুলবে না','Share revoked — the link no longer opens'],
  smsSent:['লিংক পাঠানো হয়েছে +91 {p} (সিমুলেটেড)','Link sent to +91 {p} (simulated)'], abhaSent:['ABHA-তে কনসেন্ট অনুরোধ পাঠানো হয়েছে (সিমুলেটেড)','Consent request sent via ABHA (simulated)'], pdfMsg:['প্রিন্ট উইন্ডোতে “Save as PDF” বেছে নিন','Choose “Save as PDF” in the print window'],
  preview:['প্রিভিউ','Preview'], shLog:['শেয়ার লগ','Share log'], shLogE:['এখনও কোনো শেয়ার হয়নি','No shares yet'], views:['{n} বার দেখা হয়েছে','Viewed {n} times'], active:['চালু','Active'], expired:['বন্ধ','Closed'], sharedBy:['শেয়ার করেছেন {u}','Shared by {u}'],
  // doctor view
  dvT:['AuraScale হেলথ পাস','AuraScale Health Pass'], dvVer:['যাচাইকৃত রেকর্ড · {h}','Verified record · {h}'], dvPin:['রোগীর দেওয়া ৬ সংখ্যার PIN দিন','Enter the 6-digit PIN from the patient'], dvOpen:['রেকর্ড খুলুন','Open record'], dvWrong:['PIN মেলেনি — আবার চেষ্টা করুন','PIN did not match — try again'], dvHint:['প্রোটোটাইপ: PIN {p}','Prototype: PIN {p}'], dvClose:['বন্ধ','Close'], dvRevoked:['এই লিংক বন্ধ করা হয়েছে','This link has been revoked'], dvRo:['শুধু দেখার জন্য · ডাউনলোড বন্ধ','View only · download disabled'],
  // document
  hdT:['স্বাস্থ্য ইতিহাসের সারাংশ','Health history summary'], hdId:['ডকুমেন্ট নং','Document no.'], hdGen:['তৈরি','Generated'], hdFor:['রোগীর সম্মতিতে শেয়ার করা','Shared with patient’s consent'],
  hdStatus:['বর্তমান অবস্থা','Current status'], hdAdmNow:['এখন ভর্তি আছেন · বেড {b}','Currently admitted · Bed {b}'], hdDisc:['ছুটি হয়েছে {d}','Discharged {d}'], hdDx:['রোগনির্ণয়','Diagnosis'], hdDoc:['চিকিৎসক','Doctor'], hdLos:['ভর্তির দিন','Length of stay'],
  hdSince:['শুরু','Since'], hdFacility:['প্রতিষ্ঠান','Facility'], hdOutcome:['ফলাফল','Outcome'], oRec:['সুস্থ হয়ে ফিরেছেন','Recovered'], oOngoing:['চিকিৎসা চলছে','Ongoing'], oSeen:['দেখানো হয়েছে','Consulted'],
  hdVitTrend:['শেষ চারটি রিডিং','Last four readings'], hdDisAdv:['ছুটির পরামর্শ','Discharge advice'], hdFollow:['ফলো-আপ','Follow-up'], hdNoAdv:['এখনও ছুটির পরামর্শ দেওয়া হয়নি','No discharge advice yet'],
  hdFoot:['এই সারাংশ শান্তি সেবা নার্সিং হোমের রেকর্ড থেকে তৈরি এবং রোগীর সম্মতিতে শেয়ার করা। চিকিৎসার সিদ্ধান্ত চিকিৎসকের নিজস্ব পরীক্ষা ও বিচারের উপর নির্ভর করবে।','This summary is generated from Shanti Seva Nursing Home records and shared with the patient’s consent. Treatment decisions rest on the treating doctor’s own examination and judgement.'],
  hdSample:['নমুনা ডকুমেন্ট — রোগী, নম্বর ও রিপোর্ট কাল্পনিক','Sample document — patient, numbers and reports are fictional'], hdVerify:['যাচাই: QR স্ক্যান করুন বা লিংক খুলুন','Verify: scan the QR or open the link'], hdPage:['পাতা','Page'],
});
const QR_PATH = 'M1,1H2V2H1zM2,1H3V2H2zM3,1H4V2H3zM4,1H5V2H4zM5,1H6V2H5zM6,1H7V2H6zM7,1H8V2H7zM15,1H16V2H15zM20,1H21V2H20zM23,1H24V2H23zM24,1H25V2H24zM25,1H26V2H25zM26,1H27V2H26zM27,1H28V2H27zM28,1H29V2H28zM29,1H30V2H29zM1,2H2V3H1zM7,2H8V3H7zM11,2H12V3H11zM12,2H13V3H12zM16,2H17V3H16zM17,2H18V3H17zM18,2H19V3H18zM21,2H22V3H21zM23,2H24V3H23zM29,2H30V3H29zM1,3H2V4H1zM3,3H4V4H3zM4,3H5V4H4zM5,3H6V4H5zM7,3H8V4H7zM11,3H12V4H11zM15,3H16V4H15zM17,3H18V4H17zM18,3H19V4H18zM19,3H20V4H19zM21,3H22V4H21zM23,3H24V4H23zM25,3H26V4H25zM26,3H27V4H26zM27,3H28V4H27zM29,3H30V4H29zM1,4H2V5H1zM3,4H4V5H3zM4,4H5V5H4zM5,4H6V5H5zM7,4H8V5H7zM11,4H12V5H11zM12,4H13V5H12zM13,4H14V5H13zM14,4H15V5H14zM16,4H17V5H16zM17,4H18V5H17zM19,4H20V5H19zM23,4H24V5H23zM25,4H26V5H25zM26,4H27V5H26zM27,4H28V5H27zM29,4H30V5H29zM1,5H2V6H1zM3,5H4V6H3zM4,5H5V6H4zM5,5H6V6H5zM7,5H8V6H7zM13,5H14V6H13zM15,5H16V6H15zM17,5H18V6H17zM18,5H19V6H18zM19,5H20V6H19zM23,5H24V6H23zM25,5H26V6H25zM26,5H27V6H26zM27,5H28V6H27zM29,5H30V6H29zM1,6H2V7H1zM7,6H8V7H7zM9,6H10V7H9zM12,6H13V7H12zM13,6H14V7H13zM16,6H17V7H16zM19,6H20V7H19zM20,6H21V7H20zM23,6H24V7H23zM29,6H30V7H29zM1,7H2V8H1zM2,7H3V8H2zM3,7H4V8H3zM4,7H5V8H4zM5,7H6V8H5zM6,7H7V8H6zM7,7H8V8H7zM9,7H10V8H9zM11,7H12V8H11zM13,7H14V8H13zM15,7H16V8H15zM17,7H18V8H17zM19,7H20V8H19zM21,7H22V8H21zM23,7H24V8H23zM24,7H25V8H24zM25,7H26V8H25zM26,7H27V8H26zM27,7H28V8H27zM28,7H29V8H28zM29,7H30V8H29zM11,8H12V9H11zM12,8H13V9H12zM13,8H14V9H13zM14,8H15V9H14zM16,8H17V9H16zM17,8H18V9H17zM18,8H19V9H18zM1,9H2V10H1zM4,9H5V10H4zM6,9H7V10H6zM7,9H8V10H7zM9,9H10V10H9zM15,9H16V10H15zM16,9H17V10H16zM22,9H23V10H22zM24,9H25V10H24zM1,10H2V11H1zM5,10H6V11H5zM9,10H10V11H9zM14,10H15V11H14zM16,10H17V11H16zM17,10H18V11H17zM18,10H19V11H18zM21,10H22V11H21zM23,10H24V11H23zM26,10H27V11H26zM29,10H30V11H29zM1,11H2V12H1zM4,11H5V12H4zM5,11H6V12H5zM6,11H7V12H6zM7,11H8V12H7zM8,11H9V12H8zM10,11H11V12H10zM11,11H12V12H11zM13,11H14V12H13zM14,11H15V12H14zM15,11H16V12H15zM17,11H18V12H17zM20,11H21V12H20zM21,11H22V12H21zM24,11H25V12H24zM25,11H26V12H25zM26,11H27V12H26zM27,11H28V12H27zM28,11H29V12H28zM1,12H2V13H1zM2,12H3V13H2zM3,12H4V13H3zM5,12H6V13H5zM8,12H9V13H8zM11,12H12V13H11zM14,12H15V13H14zM16,12H17V13H16zM19,12H20V13H19zM20,12H21V13H20zM21,12H22V13H21zM23,12H24V13H23zM27,12H28V13H27zM28,12H29V13H28zM1,13H2V14H1zM4,13H5V14H4zM6,13H7V14H6zM7,13H8V14H7zM9,13H10V14H9zM11,13H12V14H11zM15,13H16V14H15zM16,13H17V14H16zM18,13H19V14H18zM19,13H20V14H19zM20,13H21V14H20zM22,13H23V14H22zM23,13H24V14H23zM26,13H27V14H26zM28,13H29V14H28zM29,13H30V14H29zM3,14H4V15H3zM5,14H6V15H5zM9,14H10V15H9zM10,14H11V15H10zM14,14H15V15H14zM15,14H16V15H15zM17,14H18V15H17zM20,14H21V15H20zM21,14H22V15H21zM22,14H23V15H22zM1,15H2V16H1zM2,15H3V16H2zM4,15H5V16H4zM7,15H8V16H7zM8,15H9V16H8zM11,15H12V16H11zM12,15H13V16H12zM13,15H14V16H13zM14,15H15V16H14zM15,15H16V16H15zM21,15H22V16H21zM23,15H24V16H23zM24,15H25V16H24zM26,15H27V16H26zM27,15H28V16H27zM28,15H29V16H28zM29,15H30V16H29zM5,16H6V17H5zM6,16H7V17H6zM8,16H9V17H8zM9,16H10V17H9zM13,16H14V17H13zM16,16H17V17H16zM17,16H18V17H17zM18,16H19V17H18zM19,16H20V17H19zM20,16H21V17H20zM21,16H22V17H21zM23,16H24V17H23zM24,16H25V17H24zM26,16H27V17H26zM28,16H29V17H28zM4,17H5V18H4zM5,17H6V18H5zM7,17H8V18H7zM8,17H9V18H8zM9,17H10V18H9zM10,17H11V18H10zM11,17H12V18H11zM12,17H13V18H12zM14,17H15V18H14zM16,17H17V18H16zM18,17H19V18H18zM20,17H21V18H20zM21,17H22V18H21zM22,17H23V18H22zM24,17H25V18H24zM28,17H29V18H28zM6,18H7V19H6zM9,18H10V19H9zM13,18H14V19H13zM14,18H15V19H14zM15,18H16V19H15zM18,18H19V19H18zM22,18H23V19H22zM23,18H24V19H23zM24,18H25V19H24zM26,18H27V19H26zM29,18H30V19H29zM1,19H2V20H1zM4,19H5V20H4zM5,19H6V20H5zM6,19H7V20H6zM7,19H8V20H7zM12,19H13V20H12zM13,19H14V20H13zM15,19H16V20H15zM17,19H18V20H17zM19,19H20V20H19zM21,19H22V20H21zM23,19H24V20H23zM24,19H25V20H24zM25,19H26V20H25zM28,19H29V20H28zM29,19H30V20H29zM4,20H5V21H4zM5,20H6V21H5zM6,20H7V21H6zM9,20H10V21H9zM11,20H12V21H11zM13,20H14V21H13zM15,20H16V21H15zM17,20H18V21H17zM18,20H19V21H18zM20,20H21V21H20zM21,20H22V21H21zM23,20H24V21H23zM28,20H29V21H28zM29,20H30V21H29zM1,21H2V22H1zM3,21H4V22H3zM4,21H5V22H4zM5,21H6V22H5zM6,21H7V22H6zM7,21H8V22H7zM8,21H9V22H8zM13,21H14V22H13zM19,21H20V22H19zM20,21H21V22H20zM21,21H22V22H21zM22,21H23V22H22zM23,21H24V22H23zM24,21H25V22H24zM25,21H26V22H25zM27,21H28V22H27zM9,22H10V23H9zM10,22H11V23H10zM15,22H16V23H15zM20,22H21V23H20zM21,22H22V23H21zM25,22H26V23H25zM27,22H28V23H27zM28,22H29V23H28zM29,22H30V23H29zM1,23H2V24H1zM2,23H3V24H2zM3,23H4V24H3zM4,23H5V24H4zM5,23H6V24H5zM6,23H7V24H6zM7,23H8V24H7zM10,23H11V24H10zM11,23H12V24H11zM13,23H14V24H13zM17,23H18V24H17zM18,23H19V24H18zM21,23H22V24H21zM23,23H24V24H23zM25,23H26V24H25zM28,23H29V24H28zM1,24H2V25H1zM7,24H8V25H7zM9,24H10V25H9zM10,24H11V25H10zM15,24H16V25H15zM16,24H17V25H16zM19,24H20V25H19zM20,24H21V25H20zM21,24H22V25H21zM25,24H26V25H25zM26,24H27V25H26zM27,24H28V25H27zM1,25H2V26H1zM3,25H4V26H3zM4,25H5V26H4zM5,25H6V26H5zM7,25H8V26H7zM11,25H12V26H11zM12,25H13V26H12zM13,25H14V26H13zM18,25H19V26H18zM19,25H20V26H19zM21,25H22V26H21zM22,25H23V26H22zM23,25H24V26H23zM24,25H25V26H24zM25,25H26V26H25zM28,25H29V26H28zM29,25H30V26H29zM1,26H2V27H1zM3,26H4V27H3zM4,26H5V27H4zM5,26H6V27H5zM7,26H8V27H7zM9,26H10V27H9zM10,26H11V27H10zM12,26H13V27H12zM13,26H14V27H13zM14,26H15V27H14zM16,26H17V27H16zM18,26H19V27H18zM19,26H20V27H19zM20,26H21V27H20zM23,26H24V27H23zM25,26H26V27H25zM26,26H27V27H26zM27,26H28V27H27zM28,26H29V27H28zM1,27H2V28H1zM3,27H4V28H3zM4,27H5V28H4zM5,27H6V28H5zM7,27H8V28H7zM10,27H11V28H10zM12,27H13V28H12zM13,27H14V28H13zM20,27H21V28H20zM25,27H26V28H25zM26,27H27V28H26zM27,27H28V28H27zM29,27H30V28H29zM1,28H2V29H1zM7,28H8V29H7zM10,28H11V29H10zM12,28H13V29H12zM13,28H14V29H13zM15,28H16V29H15zM18,28H19V29H18zM19,28H20V29H19zM20,28H21V29H20zM21,28H22V29H21zM23,28H24V29H23zM28,28H29V29H28zM1,29H2V30H1zM2,29H3V30H2zM3,29H4V30H3zM4,29H5V30H4zM5,29H6V30H5zM6,29H7V30H6zM7,29H8V30H7zM9,29H10V30H9zM11,29H12V30H11zM16,29H17V30H16zM21,29H22V30H21zM25,29H26V30H25zM26,29H27V30H26zM28,29H29V30H28z';
const QR_URL = 'https://aurascale.example/h/7KQ2-9XPA';
const qrSvg = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 31 31" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QR"><rect width="31" height="31" fill="#fff"/><path d="${QR_PATH}" fill="#0E1A15"/></svg>`;
const SHARES = {};
const SECS = [['id','secId',1],['visit','secVisit',0],['vit','secVit',0],['notes','secNotes',0],['dis','secDis',0],['docs','secDocs',0],['bill','secBill',0]];

function historyDoc(p, o){
  o = o || {}; const sec = o.sec || SECS.filter(s => s[0] !== 'bill').map(s => s[0]); const has = k => sec.includes(k);
  const x = px(p), bn = S.lang === 'bn', cut = o.range === '1y' ? Date.now() - 365 * DAY : o.range === '6m' ? Date.now() - 183 * DAY : 0, inR = d => !cut || (d && +d >= cut);
  const docNo = o.no || '—';
  const exp = o.exp ? fdate(o.exp, {day:'numeric', month:'short', year:'numeric'}) + ', ' + tm(o.exp) : '';
  const fonts = `<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">`;
  const visits = [{d:encDate(p), dx:L2(p.reason), doc:p.doc, out:p.disc ? 'oRec' : 'oOngoing'}].concat(x.prev.map(pv => ({d:pv[4].admAt, dx:L2(pv[2]), doc:pv[3], out:pv[4].disc ? 'oRec' : 'oOngoing'}))).filter(v => inR(v.d));
  const V = (p.vit || []).filter(z => inR(z.at)), vits = V.slice(-4).reverse();
  const W = 300, H = 70, sys = V.map(z => z.sys).filter(z => z != null), mn = Math.min(...sys) - 8, mx = Math.max(...sys) + 8;
  const pts = sys.map((z, i) => `${(i / Math.max(1, sys.length - 1) * W).toFixed(1)},${(H - (z - mn) / Math.max(1, mx - mn) * H).toFixed(1)}`).join(' ');
  const ev = events(p).filter(e => e.ic !== 'rupee' && e.ic !== 'plus' && inR(e.at)).slice(0, 8);
  const ok = v => v != null && !isNaN(v), dp = (LV.dp || {})[p.id], adv = dp && (dp.advice || dp.followup_days) ? dp : null;
  const docs = docsOf(p);
  return `<!doctype html><html lang="${S.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${t('hdT')} — ${esc(p.name[1])}</title>${fonts}
<style>
@page{size:A4;margin:12mm 12mm 14mm}
*{box-sizing:border-box}
body{margin:0;font-family:${bn ? '"Noto Sans Bengali",' : ''}"IBM Plex Sans","Noto Sans Bengali",system-ui,sans-serif;color:#111827;font-size:11.5px;line-height:1.5;background:#fff}
.w{max-width:800px;margin:0 auto;padding:22px}
@media print{.w{padding:0}}
.lat{font-family:"IBM Plex Sans",system-ui,sans-serif;font-variant-numeric:tabular-nums}
.top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;padding-bottom:12px;border-bottom:3px solid #0A6B4B}
.br{display:flex;gap:10px;align-items:center}
.lg{width:34px;height:34px;border-radius:10px;background:url("${AURA_MARK}") center/126% no-repeat;display:block;flex:none}
.wm{font:700 17px/1.1 "IBM Plex Sans",sans-serif;letter-spacing:-.02em;color:#0A6B4B}.wm span{color:#1BB880}
.fac{font-size:11px;color:#5B6472}
.dt{text-align:right}.dt h1{font-size:17px;margin:0;color:#0A3F2D}.dt p{margin:2px 0 0;color:#5B6472;font-size:10.5px}
.idc{display:grid;grid-template-columns:1fr auto;gap:16px;margin:14px 0 12px;padding:14px;border:1px solid #DCDFE4;border-radius:10px;background:#F8FAF9}
.nm{font-size:19px;font-weight:700;margin:0 0 2px}
.sub{color:#374151;margin:0 0 10px}
.g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px 16px}
.g div small{display:block;color:#5B6472;font-size:10px}.g div b{font-weight:600;font-size:11.5px}
.qr{text-align:center;width:128px}.qr svg{width:118px;height:118px}.qr p{margin:4px 0 0;font-size:9.5px;color:#5B6472;line-height:1.35}.qr b{font-size:13px;letter-spacing:.18em;color:#111827}
h2{font-size:13px;margin:16px 0 8px;padding-bottom:5px;border-bottom:1px solid #DCDFE4;color:#0A3F2D;display:flex;justify-content:space-between;align-items:baseline}
h2 span{font-size:10px;color:#5B6472;font-weight:500}
table{width:100%;border-collapse:collapse}
th{background:#F1F4F2;color:#374151;font-weight:600;font-size:10px;text-align:left;padding:6px 8px;border-bottom:1px solid #DCDFE4}
td{padding:6px 8px;border-bottom:1px solid #ECEFF1;vertical-align:top}
.ab{color:#B42318;font-weight:700}
.tag{display:inline-block;padding:1px 7px;border-radius:4px;font-size:9.5px;font-weight:700}
.t-r{background:#FDECEA;color:#B42318}.t-g{background:#E7F3EE;color:#075A3E}.t-b{background:#EAF0FB;color:#23407C}.t-y{background:#FFF3D6;color:#7A5300}
.stat{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.stat div{border:1px solid #DCDFE4;border-radius:8px;padding:7px 9px}.stat small{display:block;color:#5B6472;font-size:10px}.stat b{font-size:13px}
.tl{margin:0;padding:0;list-style:none}.tl li{display:grid;grid-template-columns:110px 1fr;gap:10px;padding:5px 0;border-bottom:1px dashed #E5E7EB}.tl li span{color:#5B6472;font-size:10.5px}
.adv{padding:10px 12px;border-radius:8px;background:#E7F3EE;color:#075A3E}
.mut{color:#5B6472}
.ft{margin-top:18px;padding-top:10px;border-top:1px solid #DCDFE4;color:#5B6472;font-size:9.5px;display:flex;justify-content:space-between;gap:16px}
.avoid{break-inside:avoid}
@media (max-width:600px){.w{padding:14px}.idc{grid-template-columns:1fr}.qr{display:none}.g{grid-template-columns:1fr 1fr}.stat{grid-template-columns:1fr 1fr}.top{flex-direction:column}.dt{text-align:left}table{font-size:10.5px}}
</style></head><body><div class="w">
<div class="top"><div class="br"><span class="lg" aria-hidden="true"></span><div><div class="wm">Aura<span>Scale</span></div><div class="fac">${t('homeName')} · ${t('homeTown')}</div></div></div>
  <div class="dt"><h1>${t('hdT')}</h1><p>${t('hdId')} <b class="lat">${esc(docNo)}</b> · ${t('hdGen')} ${fdate(new Date(), {day:'numeric', month:'short', year:'numeric'})}, ${tm(new Date())}</p><p>${t('hdFor')}${exp ? ' · ' + t('validTill', {d:exp}) : ''}</p></div></div>
${has('id') ? `<div class="idc avoid"><div><p class="nm">${esc(nm(p))}</p><p class="sub">${p.age ? num(p.age) + ' ' + (bn ? 'বছর' : 'yrs') + ' · ' : ''}${sexTxt(p.sex)}${x.bg !== '—' ? ` · ${t('blood')} <b class="lat">${esc(x.bg)}</b>` : ''}</p>
  <div class="g"><div><small>UHID</small><b class="lat">${esc(x.uhid)}</b></div><div><small>${t('ipNo')}</small><b class="lat">${esc(x.ip)}</b></div><div><small>${t('mobile')}</small><b class="lat">${p.phone ? fmtPhone(p.phone) : '—'}</b></div>
  <div><small>${t('emergency')}${p.fam && T['r' + p.rel] ? ' (' + t('r' + p.rel) + ')' : ''}</small><b class="lat">${p.fam ? fmtPhone(p.fam) : '—'}</b></div><div style="grid-column:span 2"><small>${t('address')}</small><b>${esc(L2(x.addr))}</b></div></div></div>
  ${o.qr ? `<div class="qr">${o.qrSvg || ''}<p>${t('hdVerify')}</p>${o.pin ? `<p>${t('pinIs')}: <b class="lat">${o.pin}</b></p>` : ''}</div>` : ''}</div>` : ''}
<h2>${t('hdStatus')}</h2>
<div class="stat avoid"><div><small>${t('hdStatus')}</small><b>${p.disc ? t('hdDisc', {d:p.discAt ? fdate(p.discAt) : '—'}) : t('hdAdmNow', {b:esc(p.bed || '—')})}</b></div><div><small>${t('hdDx')}</small><b>${esc(L2(p.reason)) || '—'}</b></div><div><small>${t('hdDoc')}</small><b>${esc(docName(p.doc))}</b></div><div><small>${t('hdLos')}</small><b>${daysTxt(Math.max(1, p.days))}</b></div></div>
${has('visit') ? `<h2>${t('secVisit')}<span>${num(visits.length)}</span></h2><table class="avoid"><thead><tr><th>${t('date')}</th><th>${t('visitType')}</th><th>${t('reason')}</th><th>${t('hdDoc')}</th><th>${t('hdFacility')}</th><th>${t('hdOutcome')}</th></tr></thead><tbody>${visits.map(vv => `<tr><td>${fdate(vv.d)}</td><td><span class="tag t-b">${t('ipd')}</span></td><td>${esc(vv.dx) || '—'}</td><td>${esc(docName(vv.doc))}</td><td>${t('homeName')}</td><td>${t(vv.out)}</td></tr>`).join('')}</tbody></table>` : ''}
${has('vit') ? `<div class="avoid"><h2>${t('secVit')}<span>${t('hdVitTrend')}</span></h2>${vits.length ? `<table><thead><tr><th>${t('time')}</th><th>BP</th><th>${t('pulse')}</th><th>${t('temp')}</th><th>SpO₂</th></tr></thead><tbody>${vits.map(z => `<tr><td>${fdate(z.at, {day:'numeric', month:'short'})} ${tm(z.at)}</td><td class="lat ${ok(z.sys) && (vAb.sys(z.sys) || (ok(z.dia) && vAb.dia(z.dia))) ? 'ab' : ''}">${ok(z.sys) ? z.sys + '/' + (ok(z.dia) ? z.dia : '—') : '—'}</td><td class="lat ${ok(z.pulse) && vAb.pulse(z.pulse) ? 'ab' : ''}">${ok(z.pulse) ? z.pulse : '—'}</td><td class="lat ${ok(z.temp) && vAb.temp(z.temp) ? 'ab' : ''}">${ok(z.temp) ? Number(z.temp).toFixed(1) : '—'}</td><td class="lat ${ok(z.spo2) && vAb.spo2(z.spo2) ? 'ab' : ''}">${ok(z.spo2) ? z.spo2 + '%' : '—'}</td></tr>`).join('')}</tbody></table>
  ${sys.length > 1 ? `<svg viewBox="-4 -6 ${W + 8} ${H + 12}" width="100%" height="76" style="margin-top:8px"><polyline points="${pts}" fill="none" stroke="#0A6B4B" stroke-width="2.5" stroke-linejoin="round"/>${sys.map((z, i) => `<circle cx="${(i / Math.max(1, sys.length - 1) * W).toFixed(1)}" cy="${(H - (z - mn) / Math.max(1, mx - mn) * H).toFixed(1)}" r="3.5" fill="#fff" stroke="#0A6B4B" stroke-width="2"/>`).join('')}<text x="0" y="${H + 6}" font-size="9" fill="#5B6472">${bn ? 'সিস্টোলিক রক্তচাপের প্রবণতা' : 'Systolic BP trend'}</text></svg>` : ''}` : `<p class="mut">${t('hdNoVit')}</p>`}</div>` : ''}
${has('notes') ? `<h2>${t('secNotes')}</h2>${ev.length ? `<ul class="tl avoid">${ev.map(e => `<li><span>${fdate(e.at, {day:'numeric', month:'short'})}, ${tm(e.at)}</span><div><b>${esc(e.tx)}</b>${e.by ? `<br><span>${esc(e.by)}</span>` : ''}</div></li>`).join('')}</ul>` : `<p class="mut">${t('hdNoNotes')}</p>`}` : ''}
${has('dis') ? `<h2>${t('secDis')}</h2>${p.advice || adv ? `<div class="adv avoid">${p.advice ? `<b>${t('hdDisAdv')} — ${esc(advName(p))}</b>${p.advice.at ? ' · ' + fdate(p.advice.at) : ''}<br>` : ''}${adv && adv.advice ? esc(adv.advice).replace(/\n/g, '<br>') + '<br>' : ''}${adv && adv.followup_days ? `<b>${t('hdFollow')}:</b> ${t('fuDays', {n:num(adv.followup_days)})}` : ''}</div>` : `<p class="mut">${t('hdNoAdv')}</p>`}` : ''}
${has('docs') ? `<h2>${t('secDocs')}</h2>${docs.length ? `<table class="avoid"><tbody>${docs.map(d => `<tr><td>${esc(d[0])}</td><td>${d[1] ? fdate(d[1]) : '—'}</td></tr>`).join('')}</tbody></table>` : `<p class="mut">${t('hdNoDocs')}</p>`}` : ''}
${has('bill') ? (() => { const b = totals(p); return `<h2>${t('secBill')}</h2><div class="stat avoid"><div><small>${t('totalBill')}</small><b class="lat">${money(b.total)}</b></div><div><small>${t('paid')}</small><b class="lat">${money(b.paid)}</b></div><div><small>${t('balance')}</small><b class="lat">${money(b.bal)}</b></div><div><small>${t('payer')}</small><b>${t(x.payer)}</b></div></div>`; })() : ''}
<div class="ft"><div>${t('hdFoot2', {h:t('homeName')})}</div><div style="text-align:right;white-space:nowrap">AuraScale OS${o.url ? `<br><span class="lat">${esc(o.url.replace('https://', ''))}</span>` : ''}</div></div>
</div></body></html>`;
}
function printHistory(p, o){ printDoc(historyDoc(p, o)); toast(t('pdfMsg'), 'info'); }
function mShare(m){
  const p = getP(m.pid);
  if (m.step === 1) return {title:t('shT'), sub:`${esc(nm(p))} · ${t('shS1')}`, wide:true,
    body:`<p class="sh-q">${t('shWhat')}</p><div class="shsec">${SECS.map(([k, l, req]) => `<button type="button" class="shck" role="checkbox" aria-checked="${m.sec.includes(k)}" data-act="shSec" data-v="${k}" ${req ? 'aria-disabled="true"' : ''} data-k="sc-${k}"><span class="bx">${ic('check', 14)}</span><span class="tt"><b>${t(l)}</b>${req ? `<small>${t('must')}</small>` : k === 'bill' ? `<small>${t('billHint')}</small>` : ''}</span></button>`).join('')}</div>
      ${m.err ? `<p class="err">${ic('alert', 15)}${t(m.err)}</p>` : ''}
      <div class="field"><span class="lab">${t('shRange')}</span><div class="pills" role="group">${[['all','rAll'],['1y','r1y'],['6m','r6m']].map(([k, l]) => `<button type="button" class="pill" data-act="set" data-path="range" data-val="${k}" aria-pressed="${m.range === k}" data-k="rg-${k}">${t(l)}</button>`).join('')}</div></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="shNext" data-primary>${t('next')}${ic('chevR', 18)}</button>`};
  if (m.step === 2) return {title:t('shT'), sub:`${esc(nm(p))} · ${t('shS2')}`, wide:true,
    body:`<p class="sh-q">${t('shHow')}</p><div class="shm">${[['qr','mQr','mQrS','grid'],['pdf','mPdf','mPdfS','download']].map(([k, l, d, i]) => `<button type="button" class="shmo" data-act="set" data-path="method" data-val="${k}" aria-pressed="${m.method === k}" data-k="mo-${k}"><span class="mi">${ic(i, 22)}</span><span class="tt"><b>${t(l)}</b><small>${t(d)}</small></span></button>`).join('')}</div>
      ${m.method !== 'pdf' ? `<div class="field"><span class="lab">${t('validity')}</span><div class="pills" role="group">${[['24','v24'],['7d','v7'],['once','vOnce']].map(([k, l]) => `<button type="button" class="pill" data-act="set" data-path="valid" data-val="${k}" aria-pressed="${m.valid === k}" data-k="vl-${k}">${t(l)}</button>`).join('')}</div></div>` : ''}
      <button type="button" class="check shcons" role="checkbox" aria-checked="${m.consent}" data-act="shCons" data-k="cons"><span class="box">${ic('check', 16)}</span><span><b style="display:block">${t('consent')}</b><span style="font-size:13px;color:var(--text-3)">${t('consentS')}</span></span></button>
      ${m.err ? `<p class="err">${ic('alert', 15)}${t(m.err)}</p>` : ''}`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="shBack">${t('back')}</button><button class="btn btn-primary btn-lg grow" data-act="shCreate" data-primary>${ic('check')}${t('create')}</button>`};
  const sh = m.share, exp = sh.exp, url = sh.token ? shareUrl(sh.token) : '';
  return {title:t('ready'), sub:`${esc(nm(p))} · ${t('shS3')}`, xwide:true,
    body:`<div class="shres">
      <div class="shqr">${sh.method === 'pdf' ? `<div class="pdfic">${ic('file', 40)}</div><b>${t('mPdf')}</b><p class="meta">${t('pdfMsg')}</p>` : `${m.qr && m.qr !== 'x' ? m.qr : `<div class="qr-wait">${m.qr === 'x' ? t('qrFail') : t('qrMaking')}</div>`}<p class="meta">${t('scanThis')}</p>
        <div class="pinbox"><span>${t('pinIs')}</span><b class="latin">${sh.pin.slice(0, 3)} ${sh.pin.slice(3)}</b><small>${t('pinTell')}</small></div>
        <p class="meta">${sh.valid === 'once' ? t('oneView') + ' · ' : ''}${exp ? t('validTill', {d:fdate(exp, {day:'numeric', month:'short'}) + ', ' + tm(exp)}) : ''}</p>
        <div class="lnk"><span class="latin">${esc(url.replace('https://', ''))}</span><button class="btn btn-ghost btn-sm" data-act="shCopy">${t('copyLink')}</button></div>`}
        <div class="shact"><button class="btn btn-primary" data-act="shPdf" data-id="${p.id}">${ic('download', 18)}${t('dlPdf')}</button>${sh.method !== 'pdf' ? `<button class="btn btn-secondary" data-act="dvOpen" data-id="${p.id}">${ic('phone', 18)}${t('docScreen')}</button>` : ''}</div></div>
      <div class="shpv"><p class="eyebrow" style="margin-bottom:8px">${t('preview')} · A4</p><div class="pvwrap"><iframe class="pvf" title="${t('preview')}" srcdoc="${esc(historyDoc(p, {sec:sh.sec, range:sh.range, pin:sh.method === 'pdf' ? '' : sh.pin, exp:sh.method === 'pdf' ? null : exp, no:sh.no, qr:sh.method !== 'pdf', qrSvg:m.qr && m.qr !== 'x' ? m.qr : '', url}))}"></iframe></div></div>
    </div>`,
    foot:`${sh.method !== 'pdf' ? `<button class="btn btn-ghost btn-lg" data-act="shRevoke" data-id="${p.id}" data-s="${sh.id}">${t('revoke')}</button>` : ''}<button class="btn btn-primary btn-lg grow" data-act="closeModal" data-primary>${t('done')}</button>`};
}
function shareLog(p){
  const L = p.shares || [], now = new Date();
  return `<section class="card flush" style="margin-top:16px">${cardH(t('shLog'), `<button class="btn btn-secondary btn-sm" data-act="shOpen" data-id="${p.id}">${ic('send', 16)}${t('shareBtn')}</button>`)}
    ${!p.sharesLoaded ? `<p class="meta" style="padding:16px 18px">${t('shLogLoading')}</p>` : LV.shOk === false ? `<p class="meta" style="padding:16px 18px">${t('shNeedSql')}</p>` : L.length ? `<ul class="lines" style="border:0;border-radius:0">${L.slice().reverse().map(z => { const on = !z.revoked && (z.method === 'pdf' || (z.exp && z.exp > now));
      return `<li><span class="line-ic">${ic(z.method === 'qr' ? 'grid' : 'download', 18)}</span><span class="line-t"><b>${t(z.method === 'qr' ? 'mQr' : 'mPdf')} · <span class="latin">${esc(z.no)}</span></b><span>${fdate(z.at, {day:'numeric', month:'short'})}, ${tm(z.at)}${z.by ? ' · ' + t('sharedBy', {u:esc(z.by)}) : ''}${z.method === 'qr' ? ' · ' + t('views', {n:num(z.views)}) : ''}</span></span><span class="st ${on ? 'st-paid' : 'st-dis'}">${on ? t('active') : t('expired')}</span>${on && z.method !== 'pdf' ? `<button class="btn btn-ghost btn-sm" data-act="shRevoke" data-id="${p.id}" data-s="${z.id}">${t('revoke')}</button>` : ''}</li>`; }).join('')}</ul>` : `<p class="meta" style="padding:16px 18px">${t('shLogE')}</p>`}</section>`;
}
let DV = null;
function renderDV(){}
function extraHandlers4(){
  Object.assign(H, {
    shOpen: el => { const p = getP(el.dataset.id); if (!p) return; if (!p.docsLoaded) loadDocs(p); openModal({type:'share', pid:p.id, step:1, sec:SECS.filter(s => s[0] !== 'bill').map(s => s[0]), range:'all', method:'qr', valid:'24', consent:false, err:''}); },
    shSec: el => { const m = S.modal, k = el.dataset.v; if (SECS.find(s => s[0] === k)[2]) return; m.sec = m.sec.includes(k) ? m.sec.filter(z => z !== k) : m.sec.concat(k); m.err = ''; rerenderModal(); },
    shNext: () => { const m = S.modal; if (m.sec.length < 2) { m.err = 'errSec'; rerenderModal(); return; } m.err = ''; m.step = 2; renderModal(); setTimeout(focusModal, 30); },
    shBack: () => { S.modal.step = 1; S.modal.err = ''; renderModal(); setTimeout(focusModal, 30); },
    shCons: () => { S.modal.consent = !S.modal.consent; S.modal.err = ''; rerenderModal(); }
  });
}
/* ---------- Bill (print → PDF) ---------- */
function printBill(id){
  const p = getP(id), x = totals(p), ch = charges(p);
  const bn = S.lang === 'bn';
  const billNo = 'AS-' + TODAY.getFullYear() + String(TODAY.getMonth()+1).padStart(2,'0') + '-' + p.id.slice(1).padStart(4,'0');
  const html = `<!doctype html><html lang="${S.lang}"><head><meta charset="utf-8"><title>${billNo} ${esc(p.name[1])}</title>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>@page{size:A4;margin:16mm}*{box-sizing:border-box}body{font-family:${bn ? "'Hind Siliguri'," : ''}'Inter',sans-serif;color:#0E1A15;font-size:13px;margin:0}
  .top{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #0A6B4B;padding-bottom:14px;margin-bottom:18px}
  .lg{display:flex;gap:10px;align-items:center}.sq{width:34px;height:34px;border-radius:10px;background:#1BB880;display:grid;place-items:center}.sq i{width:13px;height:13px;border-radius:50%;border:3px solid #fff}
  h1{font-size:19px;margin:0}h2{font-size:15px;margin:0 0 4px}.mut{color:#5B6B64}.r{text-align:right}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;margin:12px 0 4px}.grid b{font-weight:600}
  table{width:100%;border-collapse:collapse;margin-top:16px}th,td{padding:9px 6px;border-bottom:1px solid #E0E8E3;text-align:left}th{font-size:12px;color:#5B6B64;font-weight:600}
  td.r,th.r{text-align:right;font-variant-numeric:tabular-nums}.tot td{font-weight:700;border-bottom:2px solid #0E1A15}.due td{font-weight:700;color:#B42318;font-size:15px}.ok td{font-weight:700;color:#075A3E;font-size:15px}
  .foot{margin-top:36px;display:flex;justify-content:space-between;align-items:flex-end;font-size:11px;color:#5B6B64}.sig{border-top:1px solid #999;padding-top:6px;width:200px;text-align:center}
</style></head><body>
  <div class="top"><div class="lg"><span class="sq"><i></i></span><div><h1>${t('homeName')}</h1>${billTopLine()}</div></div>
    <div class="r"><h2>${billTitleTxt()}</h2><div class="mut">${t('billNo')} ${billNo}</div><div class="mut">${fdate(new Date(), {day:'numeric', month:'long', year:'numeric'})}</div></div></div>
  <div class="grid"><div>${t('patient')}: <b>${esc(nm(p))}</b> (${t('yrs', {n:num(p.age)})}, ${sexTxt(p.sex)})</div><div>${t('phone')}: <b>${fmtPhone(p.phone)}</b></div>
    <div>${t('doctor')}: <b>${docName(p.doc)}</b></div><div>${t('bedN', {bed:p.bed})} · ${t(WARD[p.bed[0]].key)}</div>
    <div>${t('admittedOn')}: <b>${fdate(dateAgo(p.admAgo), {day:'numeric', month:'short', year:'numeric'})}</b></div><div>${t('dischargedOn')}: <b>${fdate(dateAgo(p.discAgo || 0), {day:'numeric', month:'short', year:'numeric'})}</b></div></div>
  <table><thead><tr><th>${t('item')}</th><th>${t('date')}</th><th class="r">${t('amount')}</th></tr></thead><tbody>
    ${ch.map(c => `<tr><td>${t('c'+c.type)}${c.desc ? ' — ' + esc(c.desc) : ''}</td><td>${fdate(dateAgo(c.ago))}</td><td class="r">${money(c.amt)}</td></tr>`).join('')}
    <tr class="tot"><td colspan="2">${t('totalBill')}</td><td class="r">${money(x.total)}</td></tr>
    ${p.pays.map(y => `<tr><td>${t('paid')} — ${t(y.m)}${y.ref ? ' (' + esc(y.ref) + ')' : ''}</td><td>${fdate(dateAgo(y.ago))}</td><td class="r">− ${money(y.amt)}</td></tr>`).join('')}
    <tr class="${x.bal ? 'due' : 'ok'}"><td colspan="2">${t('balance')}</td><td class="r">${money(x.bal)}</td></tr></tbody></table>
  <div class="foot"><div>${t('billFoot')}<br>Generated by AuraScale OS</div>${billSigHtml()}</div></body></html>`;
  const f = $('printFrame');
  f.onload = () => setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { toast(t('billBlocked'), 'info'); } }, 700);
  f.srcdoc = html;
  toast(t('billPreparing'), 'info');
}

/* ---------- Toasts ---------- */
function toast(msg, type, action){
  const el = document.createElement('div');
  el.className = 'toast ' + (type === 'info' ? 'ti-info' : 'ti-ok');
  el.innerHTML = `<span class="tic">${ic(type === 'info' ? 'info' : 'check', 16)}</span><span class="tm">${msg}</span>`;
  if (action) { const b = document.createElement('button'); b.textContent = action.label; b.onclick = () => { action.fn(); el.remove(); }; el.appendChild(b); }
  const tb = $('toasts'); const cap = matchMedia('(max-width:900px)').matches ? 1 : 2; while (tb.children.length >= cap) tb.firstElementChild.remove();
  tb.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 260); }, action ? 5200 : 3600);
}

/* ---------- Actions ---------- */
function go(v){
  if (S.drawer) closeDrawer();
  S.view = v; S.loading = true;
  renderSidebar(); renderBottom(); renderMain(); window.scrollTo(0, 0);
  clearTimeout(go.tm);
  go.tm = setTimeout(() => { S.loading = false; renderMain(); $('main').focus({preventScroll:true}); if (go.after) { go.after(); go.after = null; } }, 420);
}
function refresh(){ renderSidebar(); renderBottom(); if (!S.loading) renderMain(); if (S.drawer) renderDrawer(); }
function setPath(o, path, val){ const k = path.split('.'); let x = o; for (let i = 0; i < k.length - 1; i++) x = x[k[i]]; x[k[k.length-1]] = val; }
function newAdmissionModal(bed){ openModal({type:'admit', step:1, f:{phone:'', name:'', age:'', sex:'', fam:'', rel:'', doc:Object.keys(DOC)[0] || '', docText:'', reason:'', bed:bed || '', adv:'', advM:'cash', idType:'voter', idF:'', idB:'', idSt:'', idno:'', addr:'', fromId:{}}, err:{}}); }
function payModal(pid){ const m = {type:'pay', pid:pid || null, amt:'', method:'cash', ref:'', q:'', err:{}}; if (pid) m.amt = String(totals(getP(pid)).bal); openModal(m); }

const H = {
  nav: el => go(el.dataset.v),
  lang: () => { S.lang = S.lang === 'bn' ? 'en' : 'bn'; HOST.lang = S.lang; try { localStorage.setItem('as-lang', S.lang); } catch (e) {} renderAll(); const b = ROOT.querySelector('[data-act="lang"]'); b && b.focus(); },
  theme: () => { const r = HOST; r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('as-theme', r.dataset.theme); } catch (e) {} renderAppbar(); const b = ROOT.querySelector('[data-act="theme"]'); b && b.focus(); },
  admit: el => newAdmissionModal(el.dataset.bed),
  pay: el => payModal(el.dataset.id),
  pickPay: el => { S.modal.pid = el.dataset.id; S.modal.amt = String(totals(getP(el.dataset.id)).bal); renderModal(); setTimeout(focusModal, 30); },
  charge: el => openModal({type:'charge', pid:el.dataset.id, cat:'med', amt:'', note:'', err:{}}),
  discharge: el => openModal({type:'dis', pid:el.dataset.id, step:1, chk:[false,false,false], method:'cash'}),
  open: el => openDrawer(el.dataset.id),
  closeDrawer: () => closeDrawer(),
  closeModal: () => closeModal(),
  bed: el => { const b = beds[el.dataset.id]; if (b.status === 'occ') openDrawer(b.pid); else if (b.status === 'free') newAdmissionModal(b.id); else openModal({type:'bed', id:b.id}); },
  bedFilter: el => { S.bedFilter = el.dataset.f; renderMain(); const c = ROOT.querySelector(`[data-act="bedFilter"][data-f="${el.dataset.f}"]`); c && c.focus(); },
  bedsClean: () => { S.bedFilter = 'clean'; go('beds'); },
  billFilter: el => { S.billFilter = el.dataset.f; renderMain(); const c = ROOT.querySelector(`[data-act="billFilter"][data-f="${el.dataset.f}"]`); c && c.focus(); },
  billFilterGo: el => { S.billFilter = el.dataset.f; S.billQuery = ''; go('billing'); },
  clearBill: () => { S.billFilter = 'all'; S.billQuery = ''; renderMain(); },
  gotoLic: el => { go('compliance'); go.after = () => { const c = $('lic-' + el.dataset.id); if (c) { c.scrollIntoView({behavior:'smooth', block:'center'}); const b = c.querySelector('[data-act="renew"]'); b && b.focus({preventScroll:true}); } }; },
  set: el => { setPath(S.modal, el.dataset.path, el.dataset.val); if (S.modal.err) delete S.modal.err[el.dataset.path.split('.').pop()]; rerenderModal(); },
  quickAmt: el => { S.modal.amt = el.dataset.v; S.modal.err = {}; rerenderModal(); },
  admStep: el => {
    const m = S.modal, d = +el.dataset.d;
    if (d > 0 && !validAdm(m)) { rerenderModal(); const e = $('modal').querySelector('[aria-invalid="true"]'); e && e.focus(); return; }
    m.err = {}; m.step += d; renderModal(); setTimeout(focusModal, 30);
  },
  admSave: () => {
    const m = S.modal; if (!validAdm(m)) { rerenderModal(); return; }
    const f = m.f, id = 'p' + (nextId++);
    const p = {id, name:[f.name.trim(), f.name.trim()], age:parseInt(f.age, 10), sex:f.sex, bed:f.bed, days:0, admAgo:0, doc:f.doc, reason:[f.reason.trim(), f.reason.trim()],
      med:0, test:0, ot:0, rel:f.rel || 'other', extra:[], disc:false, discAgo:null, phone:f.phone.replace(/\s/g, ''), fam:f.fam.replace(/\s/g, ''), pays:[]};
    const adv = parseInt(f.adv, 10); if (adv > 0) p.pays.push({amt:adv, m:f.advM, ago:0, ref:''});
    P.push(p); idApply(p, f); beds[f.bed] = {id:f.bed, ward:f.bed[0], status:'occ', pid:id};
    closeModal(); refresh();
    toast(t('admitted', {name:esc(nm(p)), bed:p.bed}), 'success', {label:t('view'), fn:() => openDrawer(id)});
  },
  paySave: () => {
    const m = S.modal, p = getP(m.pid), bal = totals(p).bal, a = parseInt(m.amt, 10);
    if (!(a > 0)) { m.err = {amt:'errAmt'}; rerenderModal(); $('p-amt').focus(); return; }
    if (a > bal) { m.err = {amt:'errMore'}; rerenderModal(); $('p-amt').focus(); return; }
    const py = {amt:a, m:m.method, ago:0, ref:(m.ref || '').trim(), fresh:true}; p.pays.push(py);
    closeModal(); refresh(); toast(t('paySaved', {amt:money(a), name:esc(nm(p))}), 'success', {label:t('undo'), fn:() => { p.pays = p.pays.filter(z => z !== py); refresh(); toast(t('undone'), 'info'); }});
  },
  chargeSave: () => {
    const m = S.modal, p = getP(m.pid), a = parseInt(m.amt, 10);
    if (!(a > 0)) { m.err = {amt:'errAmt'}; rerenderModal(); $('c-amt').focus(); return; }
    const cg = {type:m.cat, amt:a, desc:m.note.trim(), ago:0, fresh:true}; p.extra.push(cg);
    closeModal(); refresh(); toast(t('chargeSaved', {amt:money(a), name:esc(nm(p))}), 'success', {label:t('undo'), fn:() => { p.extra = p.extra.filter(z => z !== cg); refresh(); toast(t('undone'), 'info'); }});
  },
  disChk: el => { const i = +el.dataset.i; S.modal.chk[i] = !S.modal.chk[i]; rerenderModal(); },
  disStep: () => { S.modal.step = 2; renderModal(); setTimeout(focusModal, 30); },
  disBack: () => { S.modal.step = 1; renderModal(); setTimeout(focusModal, 30); },
  disFinish: el => {
    const m = S.modal, p = getP(m.pid), bal = totals(p).bal; const before = p.pays.length;
    if (el.dataset.collect === '1' && bal > 0) p.pays.push({amt:bal, m:m.method, ago:0, ref:''});
    const prevPays = p.pays.slice(0, before);
    p.disc = true; p.discAgo = 0;
    beds[p.bed] = {id:p.bed, ward:p.bed[0], status:'clean'};
    m.step = 3; renderModal(); refresh(); setTimeout(focusModal, 30);
    toast(t('disDone', {name:esc(nm(p))}), 'success', {label:t('undo'), fn:() => { p.disc = false; p.discAgo = null; p.pays = prevPays; beds[p.bed] = {id:p.bed, ward:p.bed[0], status:'occ', pid:p.id}; if (S.modal) closeModal(); refresh(); toast(t('undone'), 'info'); }});
  },
  printBill: el => printBill(el.dataset.id),
  markFree: el => { const id = el.dataset.id; beds[id] = {id, ward:id[0], status:'free'}; closeModal(); refresh(); toast(t('bedFreed', {bed:id})); },
  cancelRes: el => { const id = el.dataset.id; beds[id] = {id, ward:id[0], status:'free'}; closeModal(); refresh(); toast(t('resCancelled', {bed:id}), 'info'); },
  admitRes: el => { const id = el.dataset.id, r = beds[id].res; closeModal(); beds[id] = {id, ward:id[0], status:'free'}; setTimeout(() => { newAdmissionModal(id); S.modal.f.name = r.name[li()]; renderModal(); }, 260); },
  renew: el => { const l = LIC.find(x => x.id === el.dataset.id); l.days += 365; refresh(); toast(t('renewed', {name:t(l.name), date:fdate(dateIn(l.days), {day:'numeric', month:'short', year:'numeric'})})); },
  remind: el => { const l = LIC.find(x => x.id === el.dataset.id), n = +el.dataset.n; const on = !l.rem.includes(n); l.rem = on ? l.rem.concat(n) : l.rem.filter(x => x !== n); renderMain(); const c = ROOT.querySelector(`[data-act="remind"][data-id="${l.id}"][data-n="${n}"]`); c && c.focus(); toast(t(on ? 'remOn' : 'remOff', {n:num(n)}), 'info'); }
};

ROOT.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el || el.disabled) return;
  const fn = H[el.dataset.act];
  if (fn) { e.preventDefault(); fn(el, e); }
});
$('scrim').addEventListener('click', closeDrawer);
$('modalWrap').addEventListener('click', e => { if (e.target === $('modalWrap')) closeModal(); });
ROOT.addEventListener('input', e => {
  const el = e.target;
  if (el.id === 'billSearch') { S.billQuery = el.value; $('billList').innerHTML = billList(); return; }
  if (el.dataset.bind && S.modal) {
    let v = el.value;
    if (el.inputMode === 'numeric') { v = v.replace(/[^\d০-৯]/g, '').replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d)); if (v !== el.value) el.value = v; }
    setPath(S.modal, el.dataset.bind, v);
    if (S.modal.type === 'pay' && el.dataset.bind === 'amt') { const l = $('payLbl'); if (l) l.textContent = t('saveAmt', {amt:money(parseInt(v, 10) || 0)}); }
    if (S.modal.type === 'pay' && el.dataset.bind === 'q') $('pickList').innerHTML = pickList(S.modal);
  }
});
ROOT.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (S.modal) { closeModal(); e.preventDefault(); } else if (S.drawer) { closeDrawer(); e.preventDefault(); } return; }
  if (e.key === 'Enter' && S.modal && e.target.tagName === 'INPUT') { const b = $('modal').querySelector('[data-primary]'); if (b && !b.disabled) { e.preventDefault(); b.click(); } return; }
  if (e.key === 'Tab') {
    const box = S.modal ? $('modal') : S.drawer ? $('drawer') : null; if (!box) return;
    const f = Array.from(box.querySelectorAll('button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])')).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (!box.contains(ROOT.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && ROOT.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && ROOT.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* =================== v6: STOCK, ID-CARD AUTO-FILL =================== */
Object.assign(T, {
  navStock:['স্টক','Stock'],
  skT:['স্টক ও সামগ্রী','Stock & supplies'], skSub:['কী আছে, কী কম, কোন রোগীকে কী দেওয়া হলো — সব হিসেব এক জায়গায়','What you have, what is low, what went to which patient — in one place'],
  skIssue:['রোগীকে দিন','Issue to patient'], skAdd:['স্টক যোগ / আপলোড','Add / upload stock'], skExport:['CSV ডাউনলোড','Download CSV'],
  skKVal:['মোট স্টকের মূল্য','Total stock value'], skKValS:['{n}টি সামগ্রী · কেনা দামে','{n} items · at cost'],
  skKLow:['কম বা শেষ','Low or out'], skKLowS:['আবার অর্ডার দিন','Reorder now'],
  skKExp:['৬০ দিনে মেয়াদ শেষ','Expiring in 60 days'], skKExpS:['এগুলো আগে ব্যবহার করুন','Use these first'],
  skKO2:['অক্সিজেন সিলিন্ডার','Oxygen cylinders'], skKO2S:['ভরা {f} · রোগীর কাছে {u} · খালি {e}','Full {f} · with patients {u} · empty {e}'],
  skO2T:['সিলিন্ডার — এখন কোথায় কোনটা','Cylinders — where each one is'], skO2None:['এখন কোনো রোগীর কাছে সিলিন্ডার নেই','No cylinders with patients right now'],
  skFull:['ভরা','Full'], skWith:['রোগীর কাছে','With patients'], skEmpty:['খালি (রিফিলের অপেক্ষায়)','Empty (to refill)'],
  skRet:['ফেরত নিন','Take back'], skRefill:['রিফিল এসেছে','Refill received'], skSince:['{t} থেকে','since {t}'],
  skTabItems:['সামগ্রী তালিকা','Items'], skTabMov:['লেনদেনের খাতা','Movement ledger'], skTabIss:['রোগীকে দেওয়া','Issued to patients'],
  skSearch:['সামগ্রীর নাম বা ব্যাচ লিখে খুঁজুন','Search item or batch'], skOnlyLow:['কম স্টক','Low stock'], skOnlyExp:['মেয়াদ শীঘ্রই','Expiring'],
  skCatAll:['সব','All'], skCoxy:['অক্সিজেন ও গ্যাস','Oxygen & gas'], skCcons:['কনজিউমেবল','Consumables'], skCmed:['ওষুধ ও ইনজেকশন','Medicines'], skCeq:['যন্ত্রপাতি','Equipment'], skClin:['লিনেন','Linen'],
  skColItem:['সামগ্রী','Item'], skColCat:['ধরন','Category'], skColStock:['মজুত','In stock'], skColCost:['একক দাম','Unit cost'], skColVal:['মূল্য','Value'], skColExp:['মেয়াদ','Expiry'], skColSt:['অবস্থা','Status'],
  skSok:['ঠিক আছে','OK'], skSlow:['কম','Low'], skSout:['শেষ','Out'], skSexp:['মেয়াদ শীঘ্রই','Expiring'],
  skMin:['ন্যূনতম {n}','Min {n}'], skGive:['দিন','Issue'], skRecv:['জমা','Receive'], skNoExp:['প্রযোজ্য নয়','n/a'],
  skDaysLeft:['{n} দিন বাকি','{n} days left'],
  skMvin:['জমা','Stock in'], skMvout:['রোগীকে','Issued'], skMvret:['ফেরত','Returned'], skMvref:['রিফিল','Refill'],
  skSrcman:['হাতে লেখা','Manual'], skSrccsv:['CSV','CSV'], skSrcxls:['Excel','Excel'], skSrcphoto:['বিলের ছবি','Bill photo'], skSrcward:['ওয়ার্ড','Ward'],
  skColWhen:['সময়','When'], skColType:['ধরন','Type'], skColQty:['পরিমাণ','Qty'], skColWho:['রোগী / কে','Patient / by'], skColSrc:['উৎস','Source'], skColBill:['বিলে','Billed'],
  skNoMov:['এখনও কোনো লেনদেন নেই','No movements yet'], skEmptyL:['কোনো সামগ্রী পাওয়া যায়নি','No items found'], skEmptyLS:['অন্য নাম লিখুন বা ফিল্টার মুছুন','Try another name or clear filters'],
  skInUse:['ব্যবহার হচ্ছে','In use'], skReturned:['ফেরত এসেছে','Returned'], skUsed:['ব্যবহৃত','Consumed'],
  skIsT:['রোগীকে সামগ্রী দিন','Issue to a patient'], skIsS:['দেওয়ার সাথে সাথে স্টক থেকে কমে যাবে','Stock is reduced the moment you issue'],
  skIsPat:['কোন রোগীকে?','Which patient?'], skIsItem:['কী দিচ্ছেন?','What are you giving?'], skIsItemQ:['খুঁজুন: সিলিন্ডার, মাস্ক, ক্যানুলা…','Search: cylinder, mask, cannula…'], skIsQty:['কতগুলো?','How many?'], skAvail:['মজুতে আছে {n} {u}','{n} {u} in stock'],
  skIsBill:['রোগীর বিলে যোগ করুন','Add to the patient’s bill'], skIsBillS:['{amt} বিলে যোগ হবে','{amt} will be added to the bill'], skIsNoPrice:['এই সামগ্রীর আলাদা চার্জ নেই','No separate charge for this item'],
  skIsRetN:['ফেরতযোগ্য সিলিন্ডার — খালি হলে “ফেরত নিন” চাপবেন, খালি সিলিন্ডার আলাদা গোনা হবে','Returnable cylinder — press “Take back” when empty; empties are counted separately'],
  skIsSave:['দিন ও স্টক থেকে কমান','Issue & reduce stock'], skErrPat:['রোগী বেছে নিন','Choose a patient'], skErrItem:['সামগ্রী বেছে নিন','Choose an item'], skErrQty:['মজুতের চেয়ে বেশি দেওয়া যাবে না','Can’t issue more than in stock'], skErrQ0:['পরিমাণ লিখুন','Enter a quantity'],
  skIssued:['{q} {u} {item} — {name}-কে দেওয়া হলো · স্টকে বাকি {left}','{q} {u} {item} issued to {name} · {left} left'],
  skReturnedT:['{item} ফেরত এসেছে — খালি সিলিন্ডার এখন {e}টি','{item} returned — {e} empty now'], skRefilled:['{n}টি সিলিন্ডার রিফিল হয়ে ভরা স্টকে গেল','{n} cylinders refilled and back in stock'],
  skInT:['স্টক যোগ করুন','Add stock'], skInS:['যেভাবে সুবিধা — হাতে লিখুন, বিলের ছবি তুলুন, বা CSV / Excel আপলোড করুন','Type it, snap the supplier bill, or upload CSV / Excel'],
  skMman:['হাতে লিখুন','Type it in'], skMmanS:['একটি সামগ্রী দ্রুত যোগ','One item, quickly'],
  skMphoto:['বিলের ছবি','Bill photo'], skMphotoS:['ছবি তুলুন বা আপলোড — লাইনগুলো নিজে পড়ে নেবে','Snap or upload — lines are read for you'],
  skMcsv:['CSV ফাইল','CSV file'], skMcsvS:['যেকোনো সফটওয়্যার থেকে এক্সপোর্ট করা','Exported from any software'],
  skMxls:['Excel শিট','Excel sheet'], skMxlsS:['.xlsx ফাইল সরাসরি দিন','Upload the .xlsx as is'],
  skDrop:['ফাইল এখানে টেনে আনুন','Drag the file here'], skDropImg:['বিলের ছবি এখানে টেনে আনুন','Drag the bill photo here'], skOrPick:['অথবা চাপ দিয়ে বেছে নিন','or tap to choose'], skCam:['ক্যামেরায় ছবি তুলুন','Take a photo'],
  skTpl:['নমুনা টেমপ্লেট (CSV)','Sample template (CSV)'], skTplH:['কলাম: name, category, qty, unit, unit_cost, batch, expiry, supplier — বাংলা হেডারও চলবে','Columns: name, category, qty, unit, unit_cost, batch, expiry, supplier'],
  skReading:['পড়া হচ্ছে…','Reading…'], skReadN:['{n}টি লাইন পাওয়া গেছে — মিলিয়ে দেখে নিশ্চিত করুন','{n} lines found — check and confirm'],
  skOld:['পুরোনো সামগ্রী','Existing item'], skNew:['নতুন সামগ্রী','New item'], skAfter:['এরপর {n}','Then {n}'],
  skConfirm:['{n}টি লাইন স্টকে যোগ করুন','Add {n} lines to stock'], skInDone:['{n}টি লাইন স্টকে যোগ হয়েছে','{n} lines added to stock'],
  skPhotoDemo:['প্রোটোটাইপ: ছবি থেকে লেখা পড়া এখানে নমুনা লাইন দিয়ে দেখানো হচ্ছে — আসল সংস্করণে OCR সার্ভার পড়বে','Prototype: reading the photo is simulated with sample lines — the real version uses an OCR service'],
  skBadFile:['এই ফাইলটি পড়া গেল না — CSV বা .xlsx দিন','Couldn’t read this file — use CSV or .xlsx'], skNoRows:['ফাইলে কোনো লাইন পাওয়া যায়নি','No rows found in the file'], skNotImg:['একটি ছবি দিন (JPG / PNG)','Please choose an image (JPG / PNG)'],
  skFName:['সামগ্রীর নাম','Item name'], skFNamePh:['পুরোনো সামগ্রী বেছে নিন বা নতুন নাম লিখুন','Pick an existing item or type a new name'], skFQty:['পরিমাণ','Quantity'], skFCost:['একক দাম (₹)','Unit cost (₹)'], skFBatch:['ব্যাচ','Batch'], skFExp:['মেয়াদ শেষ','Expiry'], skFSup:['সরবরাহকারী','Supplier'],
  skSaveMan:['স্টকে যোগ করুন','Add to stock'], skErrName:['সামগ্রীর নাম লিখুন','Enter the item name'], skFrom:['উৎস: {s}','Source: {s}'], skInvMeta:['বিল নং {no} · {sup}','Bill {no} · {sup}'],
  skInc:['রাখুন','Keep'], skShowN:['{n}টি সামগ্রী দেখানো হচ্ছে','Showing {n} items'],
  stkTab:['সামগ্রী','Supplies'], stkGive:['সামগ্রী দিন','Issue supplies'], stkNone:['এই রোগীকে এখনও কোনো সামগ্রী দেওয়া হয়নি','No supplies issued to this patient yet'], stkTotal:['মোট বিলে গেছে {amt}','{amt} added to bill'],
  alertLowStk:['{n}টি সামগ্রী কম বা শেষ — অর্ডার দিন','{n} items low or out — reorder'],
  idT:['পরিচয়পত্র থেকে নিজে পূরণ','Auto-fill from ID card'], idSub:['কার্ডের সামনে ও পিছনের ছবি টেনে আনুন — নাম, বয়স, লিঙ্গ, ঠিকানা বসে যাবে','Drop the front and back — name, age, sex and address fill in'],
  idVoter:['ভোটার কার্ড','Voter ID'], idAadhaar:['আধার কার্ড','Aadhaar'], idFrontL:['সামনের দিক','Front side'], idBackL:['পিছনের দিক','Back side'],
  idDropF:['সামনের ছবি টেনে আনুন','Drop the front'], idDropB:['পিছনের ছবি টেনে আনুন','Drop the back'],
  idReading:['কার্ড পড়া হচ্ছে…','Reading card…'], idFilled:['কার্ড থেকে পূরণ হয়েছে — একবার মিলিয়ে নিন','Filled from the card — please check'], idNeedBack:['ঠিকানার জন্য পিছনের দিকও দিন','Add the back side for the address'], idNeedFront:['নাম-বয়সের জন্য সামনের দিকও দিন','Add the front side for name and age'],
  idFromCard:['কার্ড থেকে','From card'], idNoL:['পরিচয়পত্র নম্বর','ID number'], idAddrL:['ঠিকানা','Address'], idAddrPh:['গ্রাম, পোস্ট অফিস, জেলা','Village, post office, district'],
  idMaskN:['আধারের শুধু শেষ ৪টি সংখ্যা রাখা হয়','Only the last 4 Aadhaar digits are stored'], idDemoN:['প্রোটোটাইপ: কার্ড পড়া নমুনা তথ্য দিয়ে দেখানো হচ্ছে','Prototype: card reading is simulated with sample data'],
  idRemove:['ছবি সরান','Remove photo'], idSaved:['পরিচয়পত্রের ছবি','ID card photos']
});
Object.assign(IC, {
  box:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>',
  camera:'<path d="M3 8a2 2 0 0 1 2-2h2l2-3h6l2 3h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/>',
  cyl:'<rect x="7" y="6" width="10" height="15" rx="5"/><path d="M10 6V3h4v3M9 2h6"/>',
  sheet:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
  minus:'<path d="M5 12h14"/>',
  idcard:'<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2.5"/><path d="M13 10h5M13 14h4"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>'
});
NAVI.stock = ['box', 'navStock'];
VIEWS.stock = vStock;

/* ---------- stock data (fictional) ---------- */
const SCAT = ['oxy', 'cons', 'med', 'eq', 'lin'];
const SCI = {oxy:'cyl', cons:'box', med:'pill', eq:'heart', lin:'bed'};
const U = {pc:['টি','pcs'], box:['বাক্স','boxes'], bt:['বোতল','bottles'], vl:['ভায়াল','vials'], set:['সেট','sets']};
let skSeq = 1;
const mkItem = (n, cat, u, qty, min, cost, price, batch, expIn, sup, ret, empty) => ({id:'k' + (skSeq++), n, cat, u, qty, min, cost, price, batch, exp:expIn == null ? null : dateIn(expIn), sup, ret:!!ret, empty:empty || 0});
const SUPS = ['নমুনা মেডিকেল এজেন্সি · Sample Medical Agency', 'নমুনা গ্যাস সাপ্লাই · Sample Gas Supply', 'নমুনা ফার্মা ডিস্ট্রিবিউটর · Sample Pharma Distributor'];
const SK = [];
const skGet = id => SK.find(i => i.id === id);
const skN = i => i.n[li()];
const skU = i => U[i.u] ? U[i.u][li()] : (i.u || '');
const skSup = i => i.sup || '—';
const MOV = [], ISS = [];
let mvSeq = 1;
function mvAdd(o){ const m = Object.assign({id:'m' + (mvSeq++), at:new Date()}, o); MOV.push(m); return m; }

const skIn = id => ISS.filter(x => x.item === id && x.ret === false).reduce((a, x) => a + x.q, 0);
const skExpD = i => i.exp ? Math.round((i.exp - TODAY) / DAY) : null;
function skSt(i){ if (i.qty <= 0) return 'out'; if (i.qty < i.min) return 'low'; const d = skExpD(i); if (d != null && d <= 60) return 'exp'; return 'ok'; }
const skChip = s => `<span class="st ${s === 'ok' ? 'st-paid' : s === 'exp' ? 'st-pending' : 'st-overdue'}">${t('skS' + s)}</span>`;
const fdt = d => `${fdate(d)}, ${tm(d)}`;
const skWho = by => by ? (by.includes(' · ') ? by.split(' · ')[li()] : by) : '—';

/* ---------- Stock view ---------- */
S.skTab = 'items'; S.skCat = 'all'; S.skQ = ''; S.skF = '';
function vStock(){
  const low = SK.filter(i => ['low', 'out'].includes(skSt(i))), exp = SK.filter(i => { const d = skExpD(i); return d != null && d <= 60; });
  const val = SK.reduce((a, i) => a + i.qty * i.cost, 0), cyl = SK.filter(i => i.ret);
  const f = cyl.reduce((a, i) => a + i.qty, 0), u = cyl.reduce((a, i) => a + skIn(i.id), 0), e = cyl.reduce((a, i) => a + i.empty, 0);
  const tabs = [['items', 'skTabItems'], ['mov', 'skTabMov'], ['iss', 'skTabIss']];
  return `<div class="ph"><div><h1>${t('skT')}</h1><p class="sub">${t('skSub')}</p></div>
    <div class="ph-actions"><button class="btn btn-secondary" data-act="skIn">${ic('upload')}${t('skAdd')}</button><button class="btn btn-primary" data-act="skIssue">${ic('send')}${t('skIssue')}</button></div></div>
  <div class="skkpi">
    <div class="card skk"><span class="ki">${ic('rupee', 20)}</span><div><span>${t('skKVal')}</span><b>${money(val)}</b><small>${t('skKValS', {n:num(SK.length)})}</small></div></div>
    <button class="card skk ${low.length ? 'bad' : ''}" data-act="skF" data-v="low" aria-pressed="${S.skF === 'low'}"><span class="ki">${ic('alert', 20)}</span><div><span>${t('skKLow')}</span><b>${num(low.length)}</b><small>${t('skKLowS')}</small></div></button>
    <button class="card skk ${exp.length ? 'warn' : ''}" data-act="skF" data-v="exp" aria-pressed="${S.skF === 'exp'}"><span class="ki">${ic('clock', 20)}</span><div><span>${t('skKExp')}</span><b>${num(exp.length)}</b><small>${t('skKExpS')}</small></div></button>
    <div class="card skk o2"><span class="ki">${ic('cyl', 20)}</span><div><span>${t('skKO2')}</span><b>${num(f + u + e)}</b><small>${t('skKO2S', {f:num(f), u:num(u), e:num(e)})}</small></div></div>
  </div>
  ${o2Panel(cyl)}
  <div class="ptabs sktabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" class="ptab" data-act="skTab" data-v="${k}" aria-selected="${S.skTab === k}">${t(l)}</button>`).join('')}</div>
  ${S.skTab === 'items' ? skItemsTab() : S.skTab === 'mov' ? skMovTab() : skIssTab()}`;
}
function o2Panel(cyl){
  const use = ISS.filter(x => x.ret === false).sort((a, b) => a.at - b.at);
  return `<section class="card o2p">
    ${cardH(`${ic('cyl', 18)} ${t('skO2T')}`)}
    <div class="o2grid">
      <div class="o2types">${cyl.map(i => { const u = skIn(i.id), tot = i.qty + u + i.empty || 1;
        return `<div class="o2t"><b>${esc(skN(i))}</b>
          <div class="o2bar" aria-hidden="true"><i class="f" style="width:${i.qty / tot * 100}%"></i><i class="u" style="width:${u / tot * 100}%"></i><i class="e" style="width:${i.empty / tot * 100}%"></i></div>
          <div class="o2lg"><span><i class="f"></i>${t('skFull')} <b>${num(i.qty)}</b></span><span><i class="u"></i>${t('skWith')} <b>${num(u)}</b></span><span><i class="e"></i>${t('skEmpty')} <b>${num(i.empty)}</b></span></div>
          ${i.empty ? `<button class="btn btn-secondary btn-sm" data-act="skRefill" data-id="${i.id}">${ic('check', 16)}${t('skRefill')} (${num(i.empty)})</button>` : ''}</div>`; }).join('')}</div>
      <ul class="o2use">${use.length ? use.map(x => { const p = getP(x.pid), i = skGet(x.item); if (!p || !i) return '';
        return `<li><span class="avatar ${avClass(p.id)}" aria-hidden="true">${esc(initials(p))}</span><div><b>${esc(nm(p))} · <span class="latin">${p.bed}</span></b><span>${esc(skN(i))} · ${t('skSince', {t:fdt(x.at)})}</span></div><button class="btn btn-secondary btn-sm" data-act="skRet" data-id="${x.id}">${t('skRet')}</button></li>`; }).join('') : `<li class="none">${t('skO2None')}</li>`}</ul>
    </div></section>`;
}
function skItemsTab(){
  const cnt = {all:SK.length}; SCAT.forEach(c => cnt[c] = SK.filter(i => i.cat === c).length);
  return `<div class="toolbar">
    <label class="search"><span class="vh">${t('skSearch')}</span>${ic('search')}<input class="input" id="skQ" type="search" placeholder="${t('skSearch')}" value="${esc(S.skQ)}" autocomplete="off"></label>
    <div class="chips" role="group" aria-label="${t('skColCat')}">${['all'].concat(SCAT).map(c => `<button class="chip" data-act="skCat" data-v="${c}" aria-pressed="${S.skCat === c}">${t(c === 'all' ? 'skCatAll' : 'skC' + c)}<span class="cnt">${num(cnt[c])}</span></button>`).join('')}
      <button class="chip" data-act="skF" data-v="low" aria-pressed="${S.skF === 'low'}">${ic('alert', 16)}${t('skOnlyLow')}</button><button class="chip" data-act="skF" data-v="exp" aria-pressed="${S.skF === 'exp'}">${ic('clock', 16)}${t('skOnlyExp')}</button></div>
    <button class="btn btn-ghost btn-sm skexp" data-act="skExport">${ic('download', 16)}${t('skExport')}</button>
  </div>
  <div class="card flush" id="skList">${skList()}</div>`;
}
function skMatch(i){
  const q = S.skQ.trim().toLowerCase();
  if (S.skCat !== 'all' && i.cat !== S.skCat) return false;
  if (S.skF === 'low' && !['low', 'out'].includes(skSt(i))) return false;
  if (S.skF === 'exp') { const d = skExpD(i); if (d == null || d > 60) return false; }
  return !q || i.n.some(n => n.toLowerCase().includes(q)) || (i.batch || '').toLowerCase().includes(q);
}
function skList(){
  const ord = {out:0, low:1, exp:2, ok:3};
  const L = SK.filter(skMatch).sort((a, b) => ord[skSt(a)] - ord[skSt(b)] || SCAT.indexOf(a.cat) - SCAT.indexOf(b.cat));
  if (!L.length) return emptyState('search', t('skEmptyL'), t('skEmptyLS'), `<button class="btn btn-secondary" data-act="skClear">${t('clearF')}</button>`);
  return `<div class="skr skr-head" aria-hidden="true"><span>${t('skColItem')}</span><span>${t('skColStock')}</span><span class="r">${t('skColCost')}</span><span class="r">${t('skColVal')}</span><span>${t('skColExp')}</span><span>${t('skColSt')}</span><span></span></div>` +
    L.map(i => { const s = skSt(i), d = skExpD(i), pct = Math.min(100, i.qty / Math.max(1, i.min * 2) * 100), u = i.ret ? skIn(i.id) : 0;
      return `<div class="skr" id="ski-${i.id}">
        <span class="sk-it"><span class="sk-ic c-${i.cat}">${ic(SCI[i.cat], 18)}</span><span class="tt"><b>${esc(skN(i))}</b><span>${t('skC' + i.cat)} · <span class="latin">${esc(i.batch || '—')}</span> · ${esc(skSup(i))}</span></span></span>
        <span class="sk-q"><span class="lm">${t('skColStock')}</span><b class="${s === 'out' || s === 'low' ? 'due' : ''}">${num(i.qty)} <small>${skU(i)}</small></b>${u ? `<small class="inuse">+${num(u)} ${t('skInUse')}${i.empty ? ` · ${num(i.empty)} ${S.lang === 'bn' ? 'খালি' : 'empty'}` : ''}</small>` : ''}<span class="sk-bar ${s}" aria-hidden="true"><i style="width:${pct}%"></i><em style="left:50%"></em></span><small>${t('skMin', {n:num(i.min)})}</small></span>
        <span class="r sk-num"><span class="lm">${t('skColCost')}</span>${money(i.cost)}</span>
        <span class="r sk-num"><span class="lm">${t('skColVal')}</span><b>${money(i.qty * i.cost)}</b></span>
        <span class="sk-ex"><span class="lm">${t('skColExp')}</span>${i.exp ? `${fdate(i.exp, {day:'numeric', month:'short', year:'2-digit'})}<small class="${d <= 60 ? 'warnx' : ''}">${t('skDaysLeft', {n:num(d)})}</small>` : `<small>${t('skNoExp')}</small>`}</span>
        <span>${skChip(s)}</span>
        <span class="sk-act"><button class="btn btn-secondary btn-sm" data-act="skIssue" data-item="${i.id}" ${i.qty <= 0 ? 'disabled' : ''}>${ic('send', 16)}${t('skGive')}</button><button class="btn btn-ghost btn-sm" data-act="skIn" data-item="${i.id}" aria-label="${t('skRecv')} — ${esc(skN(i))}">${ic('plus', 16)}${t('skRecv')}</button></span>
      </div>`; }).join('') + `<p class="pl-foot">${t('skShowN', {n:num(L.length)})}</p>`;
}
const mvTone = {in:'st-paid', out:'st-partial', ret:'st-dis', ref:'st-paid'};
function skMovTab(){
  const L = MOV.slice().sort((a, b) => b.at - a.at);
  if (!L.length) return `<div class="card">${emptyState('inbox', t('skNoMov'), '')}</div>`;
  return `<div class="card flush"><div class="mv-row mv-head" aria-hidden="true"><span>${t('skColWhen')}</span><span>${t('skColType')}</span><span>${t('skColItem')}</span><span class="r">${t('skColQty')}</span><span>${t('skColWho')}</span><span>${t('skColSrc')}</span></div>
    ${L.map(m => { const i = skGet(m.item), p = m.pid ? getP(m.pid) : null, sign = m.type === 'out' ? '−' : '+';
      return `<div class="mv-row"><span class="mv-w">${fdt(m.at)}</span><span><span class="st ${mvTone[m.type]}">${t('skMv' + m.type)}</span></span><span class="mv-i"><b>${esc(i ? skN(i) : '—')}</b></span><span class="r mv-q ${m.type === 'out' ? 'neg' : 'pos'}">${sign}${num(m.q)} <small>${i ? skU(i) : ''}</small></span><span class="mv-p">${p ? `${esc(nm(p))} · <span class="latin">${p.bed}</span>` : esc(skWho(m.by))}</span><span class="mv-s">${t('skSrc' + (m.src || 'man'))}</span></div>`; }).join('')}</div>`;
}
function skIssTab(){
  const L = ISS.slice().sort((a, b) => b.at - a.at);
  if (!L.length) return `<div class="card">${emptyState('inbox', t('skNoMov'), '')}</div>`;
  return `<div class="card flush">${L.map(x => issLine(x, true)).join('')}</div>`;
}
function issLine(x, showP){
  const i = skGet(x.item), p = getP(x.pid); if (!i || !p) return '';
  const st = x.ret === false ? `<span class="st st-partial">${t('skInUse')}</span>` : x.ret === true ? `<span class="st st-dis">${t('skReturned')}</span>` : `<span class="st st-paid">${t('skUsed')}</span>`;
  return `<div class="iss"><span class="sk-ic c-${i.cat}">${ic(SCI[i.cat], 18)}</span><div class="tt"><b>${num(x.q)} ${skU(i)} · ${esc(skN(i))}</b><span>${showP ? `${esc(nm(p))} · <span class="latin">${p.bed}</span> · ` : ''}${fdt(x.at)}${x.amt ? ` · ${t('skColBill')} ${money(x.amt)}` : ''}</span></div>${st}${x.ret === false ? `<button class="btn btn-secondary btn-sm" data-act="skRet" data-id="${x.id}">${t('skRet')}</button>` : ''}</div>`;
}
function pStk(p){
  const L = ISS.filter(x => x.pid === p.id).sort((a, b) => b.at - a.at), amt = L.reduce((a, x) => a + x.amt, 0);
  return `<section class="card flush">${cardH(t('stkTab'), !p.disc ? `<button class="btn btn-primary btn-sm" data-act="skIssue" data-pid="${p.id}">${ic('send', 16)}${t('stkGive')}</button>` : '')}
    ${L.length ? L.map(x => issLine(x, false)).join('') + (amt ? `<p class="pl-foot">${t('stkTotal', {amt:money(amt)})}</p>` : '') : emptyState('box', t('stkNone'), '')}</section>`;
}
function skCsv(){
  const rows = [['name', 'category', 'qty', 'unit', 'min', 'unit_cost', 'value', 'price', 'batch', 'expiry', 'supplier', 'in_use', 'empty']].concat(SK.map(i => [i.n[0], i.cat, i.qty, i.u, i.min, i.cost, i.qty * i.cost, i.price, i.batch, i.exp ? i.exp.toISOString().slice(0, 10) : '', i.sup || '', i.ret ? skIn(i.id) : '', i.ret ? i.empty : '']));
  return '﻿' + rows.map(r => r.map(v => /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v).join(',')).join('\n');
}
function dlText(name, text, type){ const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], {type:type || 'text/csv;charset=utf-8'})); a.download = name; BODY.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
const SK_TPL = 'name,category,qty,unit,unit_cost,batch,expiry,supplier\nOxygen mask - adult,oxy,50,pcs,38,OM-2502,2027-06-30,Sample Medical Agency\nIV cannula 20G,cons,100,pcs,18,IVC-2501,2027-09-30,Sample Medical Agency\nInj. Ceftriaxone 1 g,med,40,vials,42,CF-2501,2027-03-31,Sample Pharma Distributor\nSuction catheter 12Fr,cons,25,pcs,15,SC-2501,2027-12-31,Sample Medical Agency\n';

/* ---------- Issue modal ---------- */
function mSkIssue(m){
  const pts = P.filter(p => !p.disc), it = m.item ? skGet(m.item) : null, q = parseInt(m.q, 10) || 0;
  const iq = (m.iq || '').trim().toLowerCase();
  const pPick = m.lockP ? (() => { const p = getP(m.pid); return `<div class="skpsel">${avatar(p)}<div><b>${esc(nm(p))}</b><span>${t('bedN', {bed:esc(p.bed)})} · ${esc(p.reason[li()])}</span></div></div>`; })()
    : `<div class="skpp" role="group" aria-label="${t('skIsPat')}">${pts.map(p => `<button type="button" class="skp" data-act="skPickP" data-v="${p.id}" data-k="pp-${p.id}" aria-pressed="${m.pid === p.id}">${avatar(p)}<span><b>${esc(nm(p))}</b><small class="latin">${p.bed}</small></span></button>`).join('')}</div>`;
  const amt = it && it.price ? it.price * Math.max(q, 0) : 0;
  return {title:t('skIsT'), sub:t('skIsS'), wide:true,
    body:`<div class="field"><span class="lab">${t('skIsPat')}</span>${fieldErr(m, 'pid')}${pPick}</div>
      <div class="field"><span class="lab">${t('skIsItem')}</span>${fieldErr(m, 'item')}
        <label class="search sm"><span class="vh">${t('skIsItemQ')}</span>${ic('search')}<input class="input" data-bind="iq" data-k="iq" value="${esc(m.iq || '')}" placeholder="${t('skIsItemQ')}" autocomplete="off"></label>
        <div class="skilist" id="skIpick">${skIPick(m)}</div></div>
      <div class="field"><span class="lab" id="skQL">${t('skIsQty')}</span>
        <div class="skqty"><button type="button" class="iconbtn" data-act="skQty" data-d="-1" aria-label="−">${ic('minus')}</button><input id="sk-q" class="input${bad(m, 'q')}" data-bind="q" data-k="q" inputmode="numeric" maxlength="4" value="${esc(m.q)}" aria-labelledby="skQL"><button type="button" class="iconbtn" data-act="skQty" data-d="1" aria-label="+">${ic('plus')}</button>
        <span class="skav">${it ? t('skAvail', {n:num(it.qty), u:skU(it)}) : ''}</span></div>${fieldErr(m, 'q')}</div>
      ${it && it.ret ? `<p class="sknote">${ic('cyl', 16)}${t('skIsRetN')}</p>` : ''}
      ${it ? (it.price ? `<button type="button" class="shck" role="checkbox" data-act="skBill" aria-checked="${!!m.bill}"><span class="bx">${ic('check', 14)}</span><span class="tt"><b>${t('skIsBill')}</b><small id="skBillAmt">${t('skIsBillS', {amt:money(amt)})}</small></span></button>` : `<p class="sknote">${ic('info', 16)}${t('skIsNoPrice')}</p>`) : ''}`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="skIssueSave" data-primary>${ic('send')}${t('skIsSave')}</button>`};
}
function skIPick(m){
  const iq = (m.iq || '').trim().toLowerCase();
  const L = SK.filter(i => !iq || i.n.some(n => n.toLowerCase().includes(iq)) || i.cat.includes(iq));
  return L.map(i => `<button type="button" class="ski" data-act="skPickI" data-v="${i.id}" data-k="pi-${i.id}" aria-pressed="${m.item === i.id}" ${i.qty <= 0 ? 'disabled' : ''}><span class="sk-ic c-${i.cat}">${ic(SCI[i.cat], 16)}</span><span><b>${esc(skN(i))}</b><small>${i.qty <= 0 ? t('skSout') : t('skAvail', {n:num(i.qty), u:skU(i)})}${i.price ? ' · ' + money(i.price) : ''}</small></span></button>`).join('') || `<p class="sknote">${t('skEmptyL')}</p>`;
}

/* ---------- Stock-in modal ---------- */
function mSkIn(m){
  if (m.step === 2) return mSkReview(m);
  const meth = [['man', 'edit', 'skMman', 'skMmanS'], ['photo', 'camera', 'skMphoto', 'skMphotoS'], ['csv', 'file', 'skMcsv', 'skMcsvS'], ['xls', 'sheet', 'skMxls', 'skMxlsS']];
  let panel = '';
  if (m.method === 'man') {
    const f = m.man;
    panel = `<datalist id="skDl">${SK.map(i => `<option value="${esc(skN(i))}">`).join('')}</datalist>
      <div class="field"><label for="skm-n">${t('skFName')}</label><input id="skm-n" list="skDl" class="input${bad(m, 'name')}" data-bind="man.name" data-k="mn" value="${esc(f.name)}" placeholder="${t('skFNamePh')}" autocomplete="off">${fieldErr(m, 'name')}
        <p class="sknote" id="skMatchL">${skMatchNote(f.name)}</p></div>
      <div class="row2"><div class="field"><label for="skm-q">${t('skFQty')}</label><input id="skm-q" class="input${bad(m, 'q')}" data-bind="man.q" data-k="mq" inputmode="numeric" maxlength="5" value="${esc(f.q)}">${fieldErr(m, 'q')}</div>
        <div class="field"><label for="skm-c">${t('skFCost')}</label><input id="skm-c" class="input" data-bind="man.cost" data-k="mc" inputmode="numeric" maxlength="6" value="${esc(f.cost)}"></div></div>
      <div class="row2"><div class="field"><label for="skm-b">${t('skFBatch')} <span class="opt">${t('optional')}</span></label><input id="skm-b" class="input latin" data-bind="man.batch" data-k="mb" value="${esc(f.batch)}" autocomplete="off"></div>
        <div class="field"><label for="skm-e">${t('skFExp')} <span class="opt">${t('optional')}</span></label><input id="skm-e" type="date" class="input" data-bind="man.exp" data-k="me" value="${esc(f.exp)}"></div></div>
      <div class="field"><label for="skm-s">${t('skFSup')} <span class="opt">${t('optional')}</span></label><input id="skm-s" class="input" data-bind="man.sup" data-k="ms" value="${esc(f.sup)}" autocomplete="off"></div>`;
  } else if (m.method === 'photo') {
    panel = m.reading ? skReadingBox(m.img) : `${dropZone('stk', 'image/*,application/pdf', t('skDropImg'), 'JPG · PNG · PDF')}
      <label class="btn btn-secondary btn-lg btn-block skcam" tabindex="0" data-cam>${ic('camera')}${t('skCam')}<input type="file" accept="image/*" capture="environment" data-file="stk" class="fin" tabindex="-1"></label>`;
  } else {
    const csv = m.method === 'csv';
    panel = m.reading ? skReadingBox() : `${dropZone('stk', csv ? '.csv,text/csv' : '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', t('skDrop'), csv ? '.csv' : '.xlsx')}
      <div class="sktpl"><button class="btn btn-ghost btn-sm" data-act="skTpl">${ic('download', 16)}${t('skTpl')}</button><small>${t('skTplH')}</small></div>`;
  }
  return {title:t('skInT'), sub:t('skInS'), wide:true,
    body:`<div class="shm skm4" role="group">${meth.map(([k, i, a, b]) => `<button type="button" class="shmo" data-act="skMeth" data-v="${k}" data-k="sm-${k}" aria-pressed="${m.method === k}"><span class="mi">${ic(i, 22)}</span><span><b>${t(a)}</b><small>${t(b)}</small></span></button>`).join('')}</div>
      ${m.err && m.err.file ? `<p class="err">${ic('alert', 15)}${t(m.err.file)}</p>` : ''}
      <div class="skpanel">${panel}</div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button>${m.method === 'man' ? `<button class="btn btn-primary btn-lg grow" data-act="skManSave" data-primary>${ic('plus')}${t('skSaveMan')}</button>` : ''}`};
}
const dropZone = (kind, accept, title, sub) => `<label class="dz" data-drop="${kind}" tabindex="0"><input type="file" accept="${accept}" data-file="${kind}" class="fin" tabindex="-1"><span class="dz-ic">${ic('upload', 26)}</span><b>${title}</b><small>${t('skOrPick')} · ${sub}</small></label>`;
const skReadingBox = img => `<div class="skread">${img ? `<img src="${img}" alt="">` : `<span class="dz-ic">${ic('sheet', 26)}</span>`}<div><b>${t('skReading')}</b><span class="skprog"><i></i></span></div></div>`;
function skMatchNote(name){
  if (!name || !name.trim()) return '';
  const i = skFind(name);
  return i ? `<span class="st st-paid">${t('skOld')}</span> ${t('skAvail', {n:num(i.qty), u:skU(i)})}` : `<span class="st st-partial">${t('skNew')}</span>`;
}
function mSkReview(m){
  const inc = m.rows.filter(r => r.inc).length;
  const srcLine = m.src === 'photo' ? `<div class="skrsrc">${m.img ? `<img src="${m.img}" alt="">` : ''}<div><b>${t('skReadN', {n:num(m.rows.length)})}</b>${m.inv && (m.inv.no || m.inv.sup) ? `<span>${t('skInvMeta', {no:esc(m.inv.no || '—'), sup:esc(m.inv.sup || '—')})}</span>` : ''}</div></div>`
    : `<div class="skrsrc"><span class="sk-ic c-cons">${ic(m.src === 'csv' ? 'file' : 'sheet', 20)}</span><div><b>${t('skReadN', {n:num(m.rows.length)})}</b><span class="latin">${esc(m.fname || '')}</span></div></div>`;
  return {title:t('skInT'), sub:t('skFrom', {s:t('skSrc' + m.src)}), xwide:true,
    body:`${srcLine}
      <div class="rv">
        <div class="rv-row rv-head" aria-hidden="true"><span></span><span>${t('skFName')}</span><span class="r">${t('skFQty')}</span><span class="r">${t('skFCost')}</span><span>${t('skFBatch')}</span><span>${t('skFExp')}</span></div>
        ${m.rows.map((r, k) => { const i = skFind(r.name);
          return `<div class="rv-row ${r.inc ? '' : 'off'}">
            <button type="button" class="rv-ck" role="checkbox" data-act="skRow" data-i="${k}" aria-checked="${r.inc}" aria-label="${t('skInc')}">${ic('check', 14)}</button>
            <span class="rv-n"><input class="input" data-bind="rows.${k}.name" data-k="rn${k}" value="${esc(r.name)}" aria-label="${t('skFName')}"><small>${i ? `<span class="st st-paid">${t('skOld')}</span> ${t('skAfter', {n:num(i.qty + (parseInt(r.q, 10) || 0))})} ${skU(i)}` : `<span class="st st-partial">${t('skNew')}</span>`}</small></span>
            <span class="r"><span class="lm">${t('skFQty')}</span><input class="input r" data-bind="rows.${k}.q" data-k="rq${k}" inputmode="numeric" maxlength="5" value="${esc(r.q)}" aria-label="${t('skFQty')}"></span>
            <span class="r"><span class="lm">${t('skFCost')}</span><input class="input r" data-bind="rows.${k}.cost" data-k="rc${k}" inputmode="numeric" maxlength="6" value="${esc(r.cost)}" aria-label="${t('skFCost')}"></span>
            <span><span class="lm">${t('skFBatch')}</span><input class="input latin" data-bind="rows.${k}.batch" data-k="rb${k}" value="${esc(r.batch)}" aria-label="${t('skFBatch')}"></span>
            <span><span class="lm">${t('skFExp')}</span><input class="input" type="date" data-bind="rows.${k}.exp" data-k="re${k}" value="${esc(r.exp)}" aria-label="${t('skFExp')}"></span>
          </div>`; }).join('')}
      </div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="skInBack">${t('back')}</button><button class="btn btn-primary btn-lg grow" data-act="skInSave" data-primary ${inc ? '' : 'disabled'}>${ic('check')}${t('skConfirm', {n:num(inc)})}</button>`};
}

/* ---------- parsing ---------- */
const skNorm = s => String(s || '').toLowerCase().replace(/[^a-z0-9ঀ-৿]/g, '');
function skFind(name){
  const n = skNorm(name); if (n.length < 3) return null;
  return SK.find(i => i.n.some(x => skNorm(x) === n)) || SK.find(i => i.n.some(x => { const y = skNorm(x); return n.length > 6 && (y.includes(n) || n.includes(y)); })) || null;
}
function parseCSV(text){
  text = text.replace(/^﻿/, ''); const rows = []; let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true;
    else if (c === ',' || c === ';' || c === '\t') { row.push(cur); cur = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; }
    else cur += c;
  }
  if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
  return rows.filter(r => r.some(x => String(x).trim() !== ''));
}
async function readXlsx(buf){
  const u8 = new Uint8Array(buf), dv = new DataView(buf), td = new TextDecoder();
  let e = u8.length - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
  if (e < 0) throw new Error('zip');
  const n = dv.getUint16(e + 10, true); let p = dv.getUint32(e + 16, true); const files = {};
  for (let k = 0; k < n; k++) {
    const meth = dv.getUint16(p + 10, true), csz = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true);
    files[td.decode(u8.subarray(p + 46, p + 46 + nl))] = {meth, csz, off}; p += 46 + nl + xl + cl;
  }
  const get = async name => {
    const f = files[name]; if (!f) return null;
    const st = f.off + 30 + dv.getUint16(f.off + 26, true) + dv.getUint16(f.off + 28, true), data = u8.slice(st, st + f.csz);
    if (f.meth === 0) return td.decode(data);
    return await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
  };
  const dp = new DOMParser(), ssx = await get('xl/sharedStrings.xml');
  const ss = ssx ? Array.from(dp.parseFromString(ssx, 'application/xml').getElementsByTagName('si')).map(si => Array.from(si.getElementsByTagName('t')).map(x => x.textContent).join('')) : [];
  const sn = files['xl/worksheets/sheet1.xml'] ? 'xl/worksheets/sheet1.xml' : Object.keys(files).filter(x => /^xl\/worksheets\/sheet\d+\.xml$/.test(x)).sort()[0];
  if (!sn) throw new Error('sheet');
  const sx = dp.parseFromString(await get(sn), 'application/xml'), rows = [];
  for (const r of Array.from(sx.getElementsByTagName('row'))) {
    const row = [];
    for (const c of Array.from(r.getElementsByTagName('c'))) {
      const ref = c.getAttribute('r') || '', col = ref ? ref.replace(/\d+/g, '').split('').reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0) - 1 : row.length;
      const tp = c.getAttribute('t'), v = c.getElementsByTagName('v')[0];
      row[col] = tp === 's' ? ss[+v.textContent] : tp === 'inlineStr' ? Array.from(c.getElementsByTagName('t')).map(x => x.textContent).join('') : v ? v.textContent : '';
    }
    rows.push(Array.from(row, x => x == null ? '' : x));
  }
  return rows.filter(r => r.some(x => String(x).trim() !== ''));
}
function skDate(v){
  if (v == null || v === '') return '';
  const s = String(v).trim(); let d = null;
  if (/^\d{4,5}(\.\d+)?$/.test(s) && +s > 20000) d = new Date(Math.round((+s - 25569) * DAY));
  else if (/^\d{4}-\d{1,2}-\d{1,2}/.test(s)) d = new Date(s.slice(0, 10) + 'T12:00:00');
  else { let m = s.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})$/); if (m) d = new Date(+(m[3].length === 2 ? '20' + m[3] : m[3]), +m[2] - 1, +m[1], 12);
    else { m = s.match(/^(\d{1,2})[\/.-](\d{4})$/); if (m) d = new Date(+m[2], +m[1], 0, 12); } }
  return d && !isNaN(d) ? d.toISOString().slice(0, 10) : '';
}
const COLS = {name:['name', 'item', 'itemname', 'product', 'description', 'particulars', 'নাম', 'সামগ্রী', 'সামগ্রীরনাম'], q:['qty', 'quantity', 'qnty', 'pcs', 'পরিমাণ', 'সংখ্যা'], cost:['unitcost', 'rate', 'cost', 'price', 'unitprice', 'দাম', 'একক দাম', 'এককদাম'], batch:['batch', 'batchno', 'lot', 'ব্যাচ'], exp:['expiry', 'exp', 'expirydate', 'expdate', 'মেয়াদ', 'মেয়াদশেষ'], sup:['supplier', 'vendor', 'সরবরাহকারী'], cat:['category', 'cat', 'type', 'ধরন'], unit:['unit', 'uom', 'একক']};
function rowsFromTable(tab){
  if (!tab.length) return [];
  const h = tab[0].map(x => skNorm(x)), idx = {};
  for (const k in COLS) idx[k] = h.findIndex(x => COLS[k].map(skNorm).includes(x));
  let body = tab.slice(1);
  if (idx.name < 0) { body = tab; Object.assign(idx, {name:0, q:1, cost:2, batch:3, exp:4, sup:-1, cat:-1, unit:-1}); }
  const g = (r, k) => idx[k] >= 0 ? String(r[idx[k]] == null ? '' : r[idx[k]]).trim() : '';
  return body.map(r => ({name:g(r, 'name'), q:String(parseInt(g(r, 'q'), 10) || ''), cost:String(Math.round(parseFloat(g(r, 'cost'))) || ''), batch:g(r, 'batch'), exp:skDate(idx.exp >= 0 ? r[idx.exp] : ''), sup:g(r, 'sup'), cat:g(r, 'cat').toLowerCase(), unit:g(r, 'unit'), inc:true}))
    .filter(r => r.name && parseInt(r.q, 10) > 0);
}
const PHOTO_ROWS = () => [
  {name:'Oxygen mask - adult', q:'50', cost:'38', batch:'OM-2502', exp:dateIn(560).toISOString().slice(0, 10), inc:true},
  {name:'Nasal cannula', q:'30', cost:'22', batch:'NC-2501', exp:dateIn(480).toISOString().slice(0, 10), inc:true},
  {name:'Inj. Ceftriaxone 1 g', q:'40', cost:'42', batch:'CF-2501', exp:dateIn(420).toISOString().slice(0, 10), inc:true},
  {name:'Foley catheter 14Fr', q:'20', cost:'65', batch:'FC-2502', exp:dateIn(600).toISOString().slice(0, 10), inc:true},
  {name:'Suction catheter 12Fr', q:'25', cost:'15', batch:'SC-2501', exp:dateIn(650).toISOString().slice(0, 10), inc:true}
];
function skApply(rows, src){
  const made = [], done = [];
  rows.filter(r => r.inc && r.name.trim() && parseInt(r.q, 10) > 0).forEach(r => {
    const q = parseInt(r.q, 10), cost = parseInt(r.cost, 10);
    let i = skFind(r.name);
    const prev = i ? {qty:i.qty, cost:i.cost, batch:i.batch, exp:i.exp} : null;
    if (!i) { const cat = SCAT.includes(r.cat) ? r.cat : /oxygen|mask|cannula|cylinder|অক্সিজেন/i.test(r.name) ? 'oxy' : /inj|tab|syp|saline|ইঞ্জে/i.test(r.name) ? 'med' : 'cons';
      i = mkItem([r.name.trim(), r.name.trim()], cat, 'pc', 0, Math.max(5, Math.round(q / 3)), cost || 0, cost ? Math.round(cost * 2) : 0, r.batch, null, r.sup || null, 0); SK.push(i); made.push(i); }
    i.qty += q; if (cost > 0) i.cost = cost; if (r.batch) i.batch = r.batch; if (r.exp) i.exp = new Date(r.exp + 'T12:00:00');
    done.push({i, prev, mv:mvAdd({type:'in', item:i.id, q, src, by:R().user.join(' · ')})});
  });
  return () => { done.forEach(d => { if (d.prev) Object.assign(d.i, d.prev); else d.i.qty = 0; const k = MOV.indexOf(d.mv); if (k >= 0) MOV.splice(k, 1); }); made.forEach(i => SK.splice(SK.indexOf(i), 1)); };
}

/* ---------- ID card auto-fill (simulated read, fictional people) ---------- */
const IDPPL = [
  {n:['অমল কুমার বাগদী','Amal Kumar Bagdi'], yob:1961, sex:'M', v:'ZXQ0004521', a:'4521', addr:['গ্রাম: নমুনাপুর, পো: নমুনাগঞ্জ, জেলা: বাঁকুড়া, পশ্চিমবঙ্গ – ৭২২১০১','Vill: Namunapur, PO: Namunaganj, Dist: Bankura, West Bengal – 722101']},
  {n:['শিপ্রা মাঝি','Shipra Majhi'], yob:1979, sex:'F', v:'ZXQ0007318', a:'7318', addr:['গ্রাম: কাল্পনিকডাঙা, পো: নমুনাগঞ্জ, জেলা: বাঁকুড়া, পশ্চিমবঙ্গ – ৭২২১০২','Vill: Kalpanikdanga, PO: Namunaganj, Dist: Bankura, West Bengal – 722102']},
  {n:['বাসুদেব হাঁসদা','Basudeb Hansda'], yob:1955, sex:'M', v:'ZXQ0002096', a:'2096', addr:['গ্রাম: উদাহরণপুর, পো: নমুনাগঞ্জ, জেলা: পুরুলিয়া, পশ্চিমবঙ্গ – ৭২৩১০১','Vill: Udaharanpur, PO: Namunaganj, Dist: Purulia, West Bengal – 723101']}
];
let idSeq = 0;
function idScan(m){
  const f = m.f, typ = f.idType;
  const zone = (side, img) => img
    ? `<div class="idz has"><img src="${img}" alt="${t(side === 'F' ? 'idFrontL' : 'idBackL')}"><span class="idz-l">${t(side === 'F' ? 'idFrontL' : 'idBackL')}</span><button type="button" class="iconbtn idz-x" data-act="idRm" data-v="${side}" aria-label="${t('idRemove')}">${ic('x', 16)}</button></div>`
    : `<label class="idz dz" data-drop="id${side}" tabindex="0"><input type="file" accept="image/*" data-file="id${side}" class="fin" tabindex="-1"><span class="idcard-ill ${side === 'B' ? 'back' : ''}" aria-hidden="true">${side === 'F' ? '<i class="ph"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i>' : '<i class="l1"></i><i class="l2"></i><i class="qr"></i>'}</span><b>${t(side === 'F' ? 'idFrontL' : 'idBackL')}</b><small>${t(side === 'F' ? 'idDropF' : 'idDropB')} · ${t('skOrPick')}</small></label>`;
  const st = f.idSt === 'reading' ? `<p class="idst rd"><span class="spin" aria-hidden="true"></span>${t('idReading')}</p>`
    : f.idF && f.idB && f.fromId && f.fromId.name ? `<p class="idst ok">${ic('check', 15)}${t('idFilled')}</p>`
    : f.idF && f.fromId && f.fromId.name ? `<p class="idst">${ic('info', 15)}${t('idFilled')} · ${t('idNeedBack')}</p>`
    : f.idB ? `<p class="idst">${ic('info', 15)}${t('idNeedFront')}</p>` : '';
  return `<section class="idscan" aria-label="${t('idT')}">
    <div class="idscan-h"><span class="idi">${ic('idcard', 20)}</span><div><b>${t('idT')}</b><span>${t('idSub')}</span></div></div>
    <div class="seg" role="group">${[['voter', 'idVoter'], ['aadhaar', 'idAadhaar']].map(([k, l]) => `<button type="button" data-act="idType" data-v="${k}" data-k="idt-${k}" aria-pressed="${typ === k}">${t(l)}</button>`).join('')}</div>
    <div class="idz2">${zone('F', f.idF)}${zone('B', f.idB)}</div>
    <div aria-live="polite">${st}</div>
    <p class="idfoot">${typ === 'aadhaar' ? `${ic('lock', 13)}${t('idMaskN')} · ` : ''}${t('idLive')}</p>
  </section>`;
}
const fromTag = (m, k) => m.f.fromId && m.f.fromId[k] ? ` <span class="fromid">${ic('idcard', 12)}${t('idFromCard')}</span>` : '';
function idExtra(m){
  const f = m.f;
  return `<div class="row2">
    <div class="field"><label for="a-idno">${t('idNoL')} <span class="opt">${t('optional')}</span>${fromTag(m, 'idno')}</label><input id="a-idno" class="input latin" data-bind="f.idno" data-k="idno" value="${esc(f.idno)}" autocomplete="off"></div>
    <div class="field"><label for="a-addr">${t('idAddrL')} <span class="opt">${t('optional')}</span>${fromTag(m, 'addr')}</label><input id="a-addr" class="input" data-bind="f.addr" data-k="addr" value="${esc(f.addr)}" placeholder="${t('idAddrPh')}" autocomplete="off"></div>
  </div>`;
}
function idRead(side, url){
  const m = S.modal; if (!m || m.type !== 'admit') return;
  const f = m.f; f['id' + side] = url; f.idSt = 'reading'; if (f.idPerson == null) f.idPerson = idSeq++ % IDPPL.length;
  rerenderModal();
  setTimeout(() => {
    if (S.modal !== m) return;
    const who = IDPPL[f.idPerson]; f.fromId = f.fromId || {};
    if (side === 'F') {
      f.name = who.n[li()]; f.age = String(TODAY.getFullYear() - who.yob); f.sex = who.sex;
      f.idno = f.idType === 'aadhaar' ? 'XXXX XXXX ' + who.a : who.v;
      Object.assign(f.fromId, {name:1, age:1, sex:1, idno:1});
      if (m.err) ['name', 'age', 'sex'].forEach(k => delete m.err[k]);
    } else { f.addr = who.addr[li()]; f.fromId.addr = 1; }
    f.idSt = ''; rerenderModal();
  }, 1100);
}
function idApply(p, f){
  if (!f.idno && !f.addr && !f.idF) return;
  const x = px(p);
  if (f.addr) x.addr = [f.addr, f.addr];
  if (f.idno) { const l = f.idType === 'aadhaar' ? ['আধার কার্ড', 'Aadhaar'] : ['ভোটার কার্ড', 'Voter ID']; x.id = [`${l[0]} · ${f.idno}`, `${l[1]} · ${f.idno}`]; }
  p.idImgs = {type:f.idType, f:f.idF, b:f.idB};
  if (f.fromId && f.fromId.name && f.idPerson != null) p.name = IDPPL[f.idPerson].n.slice();
}

/* ---------- files: pick, drop ---------- */
function onFile(kind, file){
  if (!file || !S.modal) return;
  const m = S.modal;
  if (kind === 'idF' || kind === 'idB') {
    if (!/^image\//.test(file.type)) { toast(t('skNotImg'), 'info'); return; }
    idRead(kind.slice(2), URL.createObjectURL(file)); return;
  }
  if (kind !== 'stk' || m.type !== 'skIn') return;
  const nmf = file.name || '', ext = (nmf.split('.').pop() || '').toLowerCase();
  const kindOf = /^image\//.test(file.type) ? 'photo' : ext === 'csv' || file.type === 'text/csv' ? 'csv' : ext === 'xlsx' ? 'xls' : null;
  m.err = {};
  if (!kindOf) { m.err.file = 'skBadFile'; rerenderModal(); return; }
  m.method = kindOf; m.fname = nmf; m.reading = true;
  if (kindOf === 'photo') m.img = URL.createObjectURL(file);
  rerenderModal();
  const fin = rows => { if (S.modal !== m) return; m.reading = false; if (!rows.length) { m.err.file = 'skNoRows'; rerenderModal(); return; } m.rows = rows; m.src = kindOf; m.step = 2; renderModal(); setTimeout(focusModal, 30); };
  const fail = () => { if (S.modal !== m) return; m.reading = false; m.err.file = 'skBadFile'; rerenderModal(); };
  if (kindOf === 'photo') setTimeout(() => fin(PHOTO_ROWS()), 1500);
  else if (kindOf === 'csv') file.text().then(tx => setTimeout(() => fin(rowsFromTable(parseCSV(tx))), 500)).catch(fail);
  else file.arrayBuffer().then(readXlsx).then(tab => setTimeout(() => fin(rowsFromTable(tab)), 500)).catch(fail);
}

function extraHandlers5(){
  Object.assign(H, {
    skTab: el => { S.skTab = el.dataset.v; renderMain(); const b = ROOT.querySelector(`.sktabs [data-v="${el.dataset.v}"]`); b && b.focus({preventScroll:true}); },
    skCat: el => { S.skCat = el.dataset.v; S.skTab = 'items'; renderMain(); const b = ROOT.querySelector(`[data-act="skCat"][data-v="${el.dataset.v}"]`); b && b.focus(); },
    skF: el => { const v = el.dataset.v; S.skF = S.skF === v ? '' : v; S.skTab = 'items'; renderMain(); const b = ROOT.querySelector(`.chip[data-act="skF"][data-v="${v}"]`); b && b.focus({preventScroll:true}); if (S.skF) { const l = $('skList'); l && l.scrollIntoView({behavior:'smooth', block:'start'}); } },
    skClear: () => { S.skQ = ''; S.skCat = 'all'; S.skF = ''; renderMain(); },
    gotoStock: () => { S.skF = 'low'; S.skTab = 'items'; go('stock'); },
    skExport: () => { dlText('aurascale-stock-' + new Date().toISOString().slice(0, 10) + '.csv', skCsv()); toast(t('skExport') + ' ✓', 'info'); },
    skTpl: () => dlText('aurascale-stock-template.csv', SK_TPL),
    skIssue: el => { const pid = el.dataset.pid || (S.view === 'patients' && S.patId) || ''; const it = el.dataset.item || ''; openModal({type:'skIssue', pid, lockP:!!el.dataset.pid, item:it, q:'1', bill:true, iq:'', err:{}}); },
    skPickP: el => { S.modal.pid = el.dataset.v; delete S.modal.err.pid; rerenderModal(); },
    skPickI: el => { const m = S.modal; m.item = el.dataset.v; delete m.err.item; delete m.err.q; m.bill = !!skGet(m.item).price; rerenderModal(); },
    skQty: el => { const m = S.modal; m.q = String(Math.max(1, (parseInt(m.q, 10) || 0) + +el.dataset.d)); delete m.err.q; rerenderModal(); },
    skBill: () => { S.modal.bill = !S.modal.bill; rerenderModal(); },
    skIssueSave: () => {
      const m = S.modal, i = m.item ? skGet(m.item) : null, q = parseInt(m.q, 10) || 0, e = {};
      if (!m.pid) e.pid = 'skErrPat'; if (!i) e.item = 'skErrItem'; else if (q < 1) e.q = 'skErrQ0'; else if (q > i.qty) e.q = 'skErrQty';
      m.err = e; if (Object.keys(e).length) { rerenderModal(); const b = $('modal').querySelector('.err'); b && b.scrollIntoView({block:'nearest'}); return; }
      const p = getP(m.pid);
      i.qty -= q;
      const mv = mvAdd({type:'out', item:i.id, q, pid:p.id, src:'ward', by:R().user.join(' · ')});
      const x = {id:'s' + mv.id, item:i.id, pid:p.id, q, at:mv.at, ret:i.ret ? false : null, amt:0};
      let cg = null;
      if (m.bill && i.price) { x.amt = i.price * q; cg = {type:'other', amt:x.amt, desc:`${skN(i)} × ${num(q)}`, ago:0, fresh:true}; p.extra.push(cg); }
      ISS.push(x);
      closeModal(); refresh();
      toast(t('skIssued', {q:num(q), u:skU(i), item:esc(skN(i)), name:esc(nm(p)), left:num(i.qty)}), 'success', {label:t('undo'), fn:() => { i.qty += q; MOV.splice(MOV.indexOf(mv), 1); ISS.splice(ISS.indexOf(x), 1); if (cg) p.extra = p.extra.filter(z => z !== cg); refresh(); toast(t('undone'), 'info'); }});
    },
    skRet: el => {
      const x = ISS.find(z => z.id === el.dataset.id), i = skGet(x.item);
      x.ret = true; i.empty += x.q; const mv = mvAdd({type:'ret', item:i.id, q:x.q, pid:x.pid, src:'ward', by:R().user.join(' · ')});
      refresh(); if (S.drawer) renderDrawer();
      toast(t('skReturnedT', {item:esc(skN(i)), e:num(i.empty)}), 'success', {label:t('undo'), fn:() => { x.ret = false; i.empty -= x.q; MOV.splice(MOV.indexOf(mv), 1); refresh(); toast(t('undone'), 'info'); }});
    },
    skRefill: el => {
      const i = skGet(el.dataset.id), n = i.empty; if (!n) return;
      i.qty += n; i.empty = 0; const mv = mvAdd({type:'ref', item:i.id, q:n, src:'man', by:R().user.join(' · ')});
      refresh();
      toast(t('skRefilled', {n:num(n)}), 'success', {label:t('undo'), fn:() => { i.qty -= n; i.empty = n; MOV.splice(MOV.indexOf(mv), 1); refresh(); toast(t('undone'), 'info'); }});
    },
    skIn: el => { const it = el.dataset.item ? skGet(el.dataset.item) : null; openModal({type:'skIn', step:1, method:'man', rows:[], man:{name:it ? skN(it) : '', q:'', cost:it ? String(it.cost) : '', batch:'', exp:'', sup:''}, err:{}}); if (it) setTimeout(() => { const q = $('skm-q'); q && q.focus(); }, 90); },
    skMeth: el => { const m = S.modal; m.method = el.dataset.v; m.err = {}; m.reading = false; rerenderModal(); },
    skManSave: () => {
      const m = S.modal, f = m.man, e = {};
      if (!f.name.trim()) e.name = 'skErrName'; if (!(parseInt(f.q, 10) > 0)) e.q = 'skErrQ0';
      m.err = e; if (Object.keys(e).length) { rerenderModal(); return; }
      const undo = skApply([{name:f.name, q:f.q, cost:f.cost, batch:f.batch, exp:f.exp, sup:f.sup, inc:true}], 'man');
      closeModal(); S.skTab = 'items'; refresh();
      toast(t('skInDone', {n:num(1)}), 'success', {label:t('undo'), fn:() => { undo(); refresh(); toast(t('undone'), 'info'); }});
    },
    skRow: el => { const r = S.modal.rows[+el.dataset.i]; r.inc = !r.inc; rerenderModal(); },
    skInBack: () => { const m = S.modal; m.step = 1; m.reading = false; renderModal(); setTimeout(focusModal, 30); },
    skInSave: () => {
      const m = S.modal, n = m.rows.filter(r => r.inc).length; if (!n) return;
      const undo = skApply(m.rows, m.src);
      closeModal(); S.skTab = 'items'; refresh();
      toast(t('skInDone', {n:num(n)}), 'success', {label:t('undo'), fn:() => { undo(); refresh(); toast(t('undone'), 'info'); }});
    },
    idType: el => { const f = S.modal.f; f.idType = el.dataset.v; if (f.idno && f.idPerson != null) { const w = IDPPL[f.idPerson]; f.idno = f.idType === 'aadhaar' ? 'XXXX XXXX ' + w.a : w.v; } rerenderModal(); },
    idRm: el => { const f = S.modal.f, s = el.dataset.v; f['id' + s] = ''; rerenderModal(); }
  });
  ROOT.addEventListener('change', e => { const el = e.target; if (el.dataset && el.dataset.file && el.files && el.files[0]) { onFile(el.dataset.file, el.files[0]); el.value = ''; } });
  const dzOf = e => e.target.closest && e.target.closest('[data-drop]');
  ROOT.addEventListener('dragover', e => { const z = dzOf(e); if (z || (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files'))) e.preventDefault(); if (z) z.classList.add('over'); });
  ROOT.addEventListener('dragleave', e => { const z = dzOf(e); if (z && !z.contains(e.relatedTarget)) z.classList.remove('over'); });
  ROOT.addEventListener('drop', e => { const z = dzOf(e); if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) e.preventDefault(); if (!z) return; z.classList.remove('over'); const fl = e.dataTransfer.files[0]; if (fl) onFile(z.dataset.drop, fl); });
  ROOT.addEventListener('keydown', e => { const z = e.target.closest && e.target.closest('label.dz, label[data-cam]'); if (z && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); z.querySelector('input[type=file]').click(); } }, true);
  ROOT.addEventListener('input', e => {
    const el = e.target;
    if (el.id === 'skQ') { S.skQ = el.value; const l = $('skList'); if (l) l.innerHTML = skList(); return; }
    const m = S.modal; if (!m || !el.dataset.bind) return;
    if (m.type === 'skIssue' && el.dataset.bind === 'iq') { const l = $('skIpick'); if (l) l.innerHTML = skIPick(m); }
    if (m.type === 'skIssue' && el.dataset.bind === 'q') { const i = m.item && skGet(m.item), b = $('skBillAmt'); if (i && b) b.textContent = t('skIsBillS', {amt:money(i.price * (parseInt(el.value, 10) || 0))}); }
    if (m.type === 'skIn' && el.dataset.bind === 'man.name') { const l = $('skMatchL'); if (l) l.innerHTML = skMatchNote(el.value); }
    if (m.type === 'admit' && m.f.fromId) { const k = el.dataset.bind.replace('f.', ''); if (m.f.fromId[k]) { delete m.f.fromId[k]; const tg = el.parentElement.querySelector('.fromid'); tg && tg.remove(); } }
  });
}

/* =================== v7: AUDIT · NOTIFICATIONS · IMPORT OLD DATA =================== */
Object.assign(T, {
  navAudit:['অডিট','Audit'], navNotif:['নোটিফিকেশন','Notifications'], navImport:['পুরোনো ডেটা আনুন','Import old data'],
  /* audit */
  auT:['অডিট লগ','Audit log'], auSub:['কে, কখন, কী করেছেন — প্রতিটি কাজের রেকর্ড, পরপর সাজানো','Who did what, and when — every action, in order'],
  auRole:['রোল','Role'], auAllRoles:['সব রোল','All roles'], auSystem:['সিস্টেম','System'],
  auDate:['তারিখ','Date'], auToday:['আজ','Today'], auYest:['গতকাল','Yesterday'], au7:['গত ৭ দিন','Last 7 days'], au30:['গত ৩০ দিন','Last 30 days'], auAll:['সব সময়','All time'], auCustom:['নিজে বেছে নিন','Pick dates'], auFrom:['থেকে','From'], auTo:['পর্যন্ত','To'],
  auSearch:['রোগীর নাম, UHID, বিল বা রসিদ নং লিখে খুঁজুন','Search patient, UHID, bill or receipt no.'],
  auCatAll:['সব','All'], auCbill:['বিল','Bills'], auCpay:['টাকা জমা','Payments'], auCadm:['ভর্তি ও ছুটি','Admit & discharge'], auCstock:['স্টক','Stock'], auCshare:['শেয়ার ও ABDM','Sharing & ABDM'], auCsys:['সিস্টেম ও লগইন','System & login'], auCclin:['চিকিৎসা','Clinical'],
  auN:['{n}টি কাজ','{n} actions'], auExport:['CSV ডাউনলোড','Download CSV'], auExpandAll:['সব খুলুন','Expand all'], auCollapseAll:['সব বন্ধ করুন','Collapse all'],
  auDetails:['বিস্তারিত','Details'], auHide:['বন্ধ করুন','Hide'], auEmpty:['এই ফিল্টারে কোনো কাজ নেই','No actions for this filter'], auEmptyS:['রোল, তারিখ বা খোঁজ বদলে দেখুন','Change role, date or search'],
  auId:['অডিট আইডি','Audit ID'], auWhen:['সময়','Time'], auWho:['কে করেছেন','Done by'], auDev:['ডিভাইস','Device'], auHash:['রেকর্ড সিল','Record seal'], auLocked:['এই রেকর্ড বদলানো বা মোছা যায় না','This record can’t be edited or deleted'],
  auOpenRec:['রোগীর রেকর্ড খুলুন','Open patient record'], auBillItems:['বিলের খরচের তালিকা','Bill line items'], auTotal:['মোট','Total'], auPaidL:['জমা','Paid'], auBal:['বাকি','Balance'],
  auBefore:['আগে','Before'], auAfter:['পরে','After'],
  dvOwner:['মালিকের মোবাইল · Android','Owner’s phone · Android'], dvRec:['রিসেপশন ডেস্ক · PC-01','Front desk · PC-01'], dvNurse:['নার্স স্টেশন · ট্যাব-02','Nurse station · Tab-02'], dvDoc:['ডাক্তারের মোবাইল · iOS','Doctor’s phone · iOS'], dvSys:['সার্ভার · স্বয়ংক্রিয়','Server · automatic'],
  aAdm:['রোগী ভর্তি','Patient admitted'], aPay:['টাকা জমা','Payment received'], aCharge:['খরচ যোগ','Charge added'], aDis:['ছুটি দেওয়া','Discharged'], aBill:['চূড়ান্ত বিল ইস্যু','Final bill issued'], aPrint:['বিল প্রিন্ট / PDF','Bill printed / PDF'],
  aSkOut:['রোগীকে সামগ্রী দেওয়া','Supplies issued'], aSkIn:['স্টক জমা','Stock received'], aSkRet:['সিলিন্ডার ফেরত','Cylinder returned'], aSkRef:['সিলিন্ডার রিফিল','Cylinders refilled'],
  aShare:['স্বাস্থ্য ইতিহাস শেয়ার','Health history shared'], aShRev:['শেয়ার বন্ধ','Share revoked'], aLogin:['লগইন','Signed in'], aRole:['রোল বদল','Role switched'], aLic:['লাইসেন্স নবীকরণ','Licence renewed'], aBed:['বেডের অবস্থা বদল','Bed status changed'],
  aImp:['পুরোনো ডেটা ইমপোর্ট','Old data imported'], aUndo:['আগের কাজ বাতিল (Undo)','Previous action undone'], aAdv:['ছুটির পরামর্শ','Discharge advice'], aNote:['ডাক্তারের নোট','Doctor’s note'],
  fPatient:['রোগী','Patient'], fUhid:['UHID','UHID'], fBed:['বেড','Bed'], fAgeSex:['বয়স · লিঙ্গ','Age · sex'], fDoc:['ডাক্তার','Doctor'], fReason:['ভর্তির কারণ','Reason'], fFam:['পরিবারের ফোন','Family phone'], fAdv:['অগ্রিম','Advance'],
  fAmt:['টাকা','Amount'], fMethod:['মাধ্যম','Method'], fRef:['রেফারেন্স','Reference'], fRcpt:['রসিদ নং','Receipt no.'], fBalB:['আগের বাকি','Balance before'], fBalA:['পরের বাকি','Balance after'],
  fType:['ধরন','Type'], fDesc:['বিবরণ','Description'], fBillNo:['বিল নং','Bill no.'], fDays:['থাকার দিন','Length of stay'], fCollected:['ছুটির সময় জমা','Collected at discharge'], fLeft:['বাকি রইল','Left unpaid'],
  fItem:['সামগ্রী','Item'], fQty:['পরিমাণ','Quantity'], fLeftStk:['স্টকে বাকি','Left in stock'], fSrc:['উৎস','Source'], fCost:['একক দাম','Unit cost'], fBilled:['বিলে যোগ','Added to bill'],
  fMethodS:['শেয়ারের মাধ্যম','Share method'], fValid:['চালু থাকবে','Valid for'], fDocNo:['ডকুমেন্ট নং','Document no.'], fSecs:['অংশ','Sections'], fFrom:['আগে','From'], fTo:['পরে','To'],
  fFile:['ফাইল','File'], fRows:['লাইন','Rows'], fOk:['ঠিক','OK'], fWarn:['সতর্কতা','Warnings'], fErr:['বাদ গেছে','Skipped'], fWhat:['কী আনা হয়েছে','Imported'], fUndoOf:['যে কাজ বাতিল হলো','Undone action'], fText:['লেখা','Text'], fFollow:['ফলো-আপ','Follow-up'],
  /* notifications */
  nfT:['নোটিফিকেশন','Notifications'], nfSub:['বকেয়া, কম স্টক, লাইসেন্স — যা এখনই দেখা দরকার','Dues, low stock, licences — what needs you now'],
  nfAllRead:['সব পড়া হয়েছে','Mark all read'], nfSeeAll:['সব নোটিফিকেশন দেখুন','See all notifications'], nfNone:['নতুন কিছু নেই — সব ঠিক আছে','Nothing new — all clear'], nfUnread:['অপঠিত','Unread'],
  nfCall:['সব','All'], nfCbill:['বিল ও বকেয়া','Bills & dues'], nfCstock:['স্টক','Stock'], nfClic:['লাইসেন্স','Licences'], nfCbed:['বেড','Beds'],
  nfOver:['{name} — {amt} জরুরি বকেয়া','{name} — {amt} overdue'], nfOverS:['বেড {bed} · {d} ভর্তি · বিল ২০ হাজার ছাড়িয়েছে','Bed {bed} · admitted {d} · bill crossed ₹20k'],
  nfHigh:['{name} — {amt} বাকি জমেছে','{name} — {amt} outstanding'], nfHighS:['বেড {bed} · আগে থেকে অগ্রিম নিয়ে রাখুন','Bed {bed} · collect an advance early'],
  nfDisD:['{name} — ছুটির পরেও {amt} বাকি','{name} — {amt} unpaid after discharge'], nfDisDS:['{when} ছুটি · পরিবারকে ফোন করুন','Discharged {when} · call the family'],
  nfAdvD:['{name} — ছুটির পরামর্শ, {amt} বাকি','{name} — discharge advised, {amt} due'], nfAdvDS:['{doc} ছুটি লিখেছেন · বিল মিটিয়ে নিন','{doc} advised discharge · settle the bill'],
  nfOut:['{item} — স্টক শেষ','{item} — out of stock'], nfOutS:['ন্যূনতম {min} {u} রাখা দরকার · এখনই অর্ডার দিন','Keep at least {min} {u} · order now'],
  nfLow:['{item} — মাত্র {n} {u} বাকি','{item} — only {n} {u} left'], nfLowS:['ন্যূনতম {min} {u} · অর্ডার দিন','Minimum {min} {u} · reorder'],
  nfExp:['{item} — {d} দিনে মেয়াদ শেষ','{item} — expires in {d} days'], nfExpS:['ব্যাচ {b} · {n} {u} আছে · আগে ব্যবহার করুন','Batch {b} · {n} {u} in stock · use first'],
  nfCyl:['{n}টি খালি সিলিন্ডার রিফিলের অপেক্ষায়','{n} empty cylinders waiting for refill'], nfCylS:['{item} · ভরা আছে {f}টি','{item} · {f} full in stock'],
  nfLic:['{name} — {d} দিনে মেয়াদ শেষ','{name} — expires in {d} days'], nfLicS:['শেষ তারিখ {date}','Due {date}'],
  nfClean:['{n}টি বেড পরিষ্কারের অপেক্ষায়','{n} beds waiting for cleaning'], nfCleanS:['পরিষ্কার হলে খালি করুন','Mark free once cleaned'],
  nfActPay:['টাকা জমা নিন','Record payment'], nfActOpen:['রোগী দেখুন','Open patient'], nfActStock:['স্টক দেখুন','Open stock'], nfActIn:['স্টক যোগ','Add stock'], nfActLic:['লাইসেন্স দেখুন','Open licence'], nfActBeds:['বেড ম্যাপ','Bed map'], nfMarkRead:['পড়া হয়েছে','Mark read'],
  nfCritical:['জরুরি','Urgent'], nfWarnL:['সতর্কতা','Warning'], nfInfoL:['তথ্য','Info'],
  /* import */
  imT:['পুরোনো ডেটা আনুন','Import old data'], imSub:['Excel, CSV বা খাতার ছবি দিন — বেড, রোগী, রেট লিস্ট, স্টক সব নিজে বসে যাবে','Give Excel, CSV or a photo of your register — beds, patients, rate list and stock fill in'],
  imS1:['কী আনবেন','What to import'], imS2:['ফাইল দিন','Add file'], imS3:['মিলিয়ে দেখুন','Check'], imS4:['সম্পূর্ণ','Done'],
  imQ:['কোন তথ্য আনতে চান?','What do you want to bring in?'],
  itbeds:['বেড তালিকা','Beds'], itbedsS:['ওয়ার্ড অনুযায়ী বেড নম্বর ও অবস্থা','Bed numbers by ward, with status'],
  itadm:['এখন ভর্তি রোগী','Currently admitted'], itadmS:['কে কোন বেডে, কবে ভর্তি, অগ্রিম কত','Who is in which bed, since when, advance paid'],
  itpat:['পুরোনো রোগীর তালিকা','Past patients'], itpatS:['আগের রোগী, শেষ ভিজিট, বিল ও বকেয়া','Earlier patients, last visit, bills and dues'],
  itrate:['রেট লিস্ট','Rate list'], itrateS:['বেড ভাড়া, ভিজিট, পরীক্ষা, ওটি — চার্জের তালিকা','Bed rent, visits, tests, OT — your price list'],
  itstock:['স্টক','Stock'], itstockS:['ওষুধ, কনজিউমেবল, সিলিন্ডার — মজুত ও দাম','Medicines, consumables, cylinders — quantity and cost'],
  imCols:['কলাম:','Columns:'], imTpl:['টেমপ্লেট','Template'], imChoose:['বেছে নিন','Choose'],
  imDrop:['ফাইল বা ছবি এখানে টেনে আনুন','Drag a file or photo here'], imDropS:['Excel (.xlsx) · CSV · ছবি (JPG/PNG) — খাতার পাতার ছবিও চলবে','Excel (.xlsx) · CSV · photo (JPG/PNG) — a register page photo works too'],
  imPick:['ফাইল বেছে নিন','Choose file'], imCam:['ক্যামেরায় ছবি তুলুন','Take a photo'], imTplDl:['{x} টেমপ্লেট ডাউনলোড (CSV)','Download {x} template (CSV)'], imTip:['টিপ: Excel থেকে সরাসরি .xlsx দিন — কলামের নাম বাংলা বা ইংরেজি যেকোনো হতে পারে','Tip: upload the .xlsx straight from Excel — column names can be Bengali or English'],
  imReading:['ফাইল পড়া হচ্ছে…','Reading the file…'], imReadingImg:['ছবি থেকে লেখা পড়া হচ্ছে…','Reading text from the photo…'],
  imFound:['{n}টি লাইন পাওয়া গেছে','{n} rows found'], imMap:['যে কলাম চেনা গেছে','Columns recognised'], imOkN:['{n}টি ঠিক আছে','{n} ready'], imWarnN:['{n}টি সতর্কতা','{n} warnings'], imErrN:['{n}টি ভুল — বাদ যাবে','{n} errors — will be skipped'],
  imRowOk:['ঠিক আছে','Ready'], imRowWarn:['সতর্কতা','Warning'], imRowErr:['ভুল','Error'],
  imBack:['পিছনে','Back'], imGo:['{n}টি লাইন ইমপোর্ট করুন','Import {n} rows'], imChange:['অন্য ফাইল','Different file'],
  imDoneT:['ইমপোর্ট সম্পূর্ণ','Import complete'], imDoneS:['{n}টি লাইন যোগ হয়েছে · {e}টি বাদ গেছে','{n} rows added · {e} skipped'], imAgain:['আরেকটি ইমপোর্ট','Import more'], imUndo:['এই ইমপোর্ট বাতিল করুন','Undo this import'], imUndone:['ইমপোর্ট বাতিল হয়েছে','Import undone'],
  imGoBeds:['বেড ম্যাপ দেখুন','Open bed map'], imGoPat:['রোগী তালিকা দেখুন','Open patients'], imGoStock:['স্টক দেখুন','Open stock'],
  imHist:['আগের ইমপোর্ট','Import history'], imHistNone:['এখনও কোনো ইমপোর্ট হয়নি','No imports yet'],
  imRatesT:['বর্তমান রেট লিস্ট','Current rate list'], imPhotoDemo:['প্রোটোটাইপ: ছবি থেকে লেখা পড়া এখানে নমুনা লাইন দিয়ে দেখানো হচ্ছে — আসল সংস্করণে OCR সার্ভার পড়বে','Prototype: photo reading is simulated with sample rows — the real version uses an OCR service'],
  imBadFile:['এই ফাইলটি পড়া গেল না — .xlsx, .csv বা ছবি দিন','Couldn’t read this file — use .xlsx, .csv or an image'], imNoRows:['ফাইলে কাজে লাগার মতো কোনো লাইন পাওয়া যায়নি','No usable rows in the file'],
  vNoName:['নাম নেই','Name missing'], vBadAge:['বয়স ঠিক নেই','Age looks wrong'], vBadPhone:['ফোন নম্বর ১০ সংখ্যার নয়','Phone isn’t 10 digits'], vNoBed:['এই বেড নেই','Bed not found'], vBedBusy:['বেডে আগে থেকেই রোগী আছে','Bed already occupied'],
  vBadBedId:['বেড নম্বর বোঝা যাচ্ছে না','Bed number unclear'], vBadWard:['ওয়ার্ড চেনা যায়নি','Ward not recognised'], vBedExists:['বেড আছে — অবস্থা আপডেট হবে','Bed exists — status will update'], vBedOccKeep:['বেডে রোগী আছে — বদলানো হবে না','Bed occupied — left unchanged'],
  vDocDefault:['ডাক্তার চেনা যায়নি — ডা. সুব্রত মণ্ডল ধরা হলো','Doctor not recognised — set to Dr. Subrata Mondal'], vNoRate:['রেট নেই','Rate missing'], vRateUpd:['আগের রেট বদলাবে','Will update existing rate'],
  vNoQty:['পরিমাণ নেই','Quantity missing'], vStkOld:['পুরোনো সামগ্রী — সংখ্যা যোগ হবে','Existing item — quantity added'], vDup:['এই নামে আগেই আছে','Already exists'], vNoDate:['তারিখ নেই — আজ ধরা হলো','No date — today assumed'],
  imRes:{}, rBeds:['{n}টি বেড','{n} beds'], rAdm:['{n} জন রোগী ভর্তি','{n} patients admitted'], rPat:['{n} জন পুরোনো রোগী','{n} past patients'], rRate:['{n}টি রেট','{n} rates'], rStock:['{n}টি সামগ্রী','{n} items'],
  oldBill:['পুরোনো বিল (ইমপোর্ট)','Earlier bill (imported)'], rateSvc:['পরিষেবা','Service'], rateAmt:['রেট','Rate'], rateUnit:['একক','Unit'], rateCat:['ধরন','Category'], imLast:['শেষ ভিজিট','Last visit']
});
delete T.imRes;
Object.assign(IC, {
  audit:'<path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1z"/><path d="M8 5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="m9 14 2 2 4-4"/>',
  import:'<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
  chevD:'<path d="m6 9 6 6 6-6"/>'
});
NAVI.audit = ['audit', 'navAudit']; NAVI.notif = ['bell', 'navNotif']; NAVI.import = ['import', 'navImport'];
VIEWS.audit = vAudit; VIEWS.notif = vNotif; VIEWS.import = vImport;
ROLES.owner.nav.push('notif', 'import', 'audit');
ROLES.reception.nav.push('notif', 'import');
ROLES.nurse.nav.push('notif');
ROLES.doctor.nav.push('notif');

/* ---------- audit store ---------- */
const AUD = [];
const ROLEK = {owner:'rOwner', reception:'rReception', nurse:'rNurse', doctor:'rDoctor', system:'auSystem'};
const DEVK = {owner:'dvOwner', reception:'dvRec', nurse:'dvNurse', doctor:'dvDoc', system:'dvSys'};
const ACAT = {adm:'adm', dis:'adm', pay:'pay', charge:'bill', bill:'bill', print:'bill', skOut:'stock', skIn:'stock', skRet:'stock', skRef:'stock', share:'share', shRev:'share', login:'sys', role:'sys', lic:'sys', bed:'adm', imp:'sys', undo:'sys', adv:'clin', note:'clin'};
const ATITLE = {adm:'aAdm', pay:'aPay', charge:'aCharge', dis:'aDis', bill:'aBill', print:'aPrint', skOut:'aSkOut', skIn:'aSkIn', skRet:'aSkRet', skRef:'aSkRef', share:'aShare', shRev:'aShRev', login:'aLogin', role:'aRole', lic:'aLic', bed:'aBed', imp:'aImp', undo:'aUndo', adv:'aAdv', note:'aNote'};
const PEOPLE = {owner:ROLES.owner.user, reception:ROLES.reception.user, nurse:ROLES.nurse.user, doctor:ROLES.doctor.user, system:['AuraScale', 'AuraScale']};
function hashOf(s){ let h1 = 0x811c9dc5, h2 = 0x1234567; for (let i = 0; i < s.length; i++) { h1 = Math.imul(h1 ^ s.charCodeAt(i), 16777619) >>> 0; h2 = Math.imul(h2 ^ s.charCodeAt(i), 2246822507) >>> 0; } return (h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0')).toUpperCase(); }
function audit(e){
  const role = e.role || S.role;
  const x = Object.assign({at:new Date(), role, by:e.by || PEOPLE[role], dev:e.dev || DEVK[role]}, e);
  x.role = role;
  AUD.push(x); x.no = AUD.length; x.id = 'AUD-' + String(24000 + x.no).padStart(6, '0');
  x.seal = hashOf(x.id + x.at.toISOString() + x.act + JSON.stringify(x.d || {}));
  lastAud = x; if (S.view === 'audit' && !S.loading) renderMain();
  return x;
}
let lastAud = null;
const pSnap = p => ({name:p.name.slice(), uhid:px(p).uhid, bed:p.bed, pid:p.id, age:p.age, sex:p.sex});
const billSnap = p => { const x = totals(p); return {items:charges(p).map(c => [c.type, c.desc || '', c.amt]), total:x.total, paid:x.paid, bal:x.bal, pays:p.pays.map(y => [y.amt, y.m, y.ref || ''])}; };
const billNoOf = p => 'AS-' + TODAY.getFullYear() + String(TODAY.getMonth() + 1).padStart(2, '0') + '-' + p.id.slice(1).padStart(4, '0');
let rcSeq = 4100;

/* seed audit history from existing (fictional) data */


/* text helpers */
const L2 = v => Array.isArray(v) ? v[li()] : v;
const aTitle = e => {
  if (e.act === 'gen') return e.gt;
  const d = e.d || {}, n = d.name ? L2(d.name) : '';
  const tt = t(ATITLE[e.act]);
  if (e.act === 'skOut' || e.act === 'skIn' || e.act === 'skRet' || e.act === 'skRef') return `${tt} — ${num(d.q)} ${U[d.u] ? U[d.u][li()] : ''} ${L2(d.item)}${n ? ' · ' + n : ''}`;
  if (d.who && !d.name) return `${tt} — ${L2(d.who)}`;
  if (e.act === 'set') return `${tt} — ${t(e.d.sec)}`;
  if (e.d && e.d.title) return `${tt} — ${L2(e.d.title)}`;
  if (e.act === 'login') return `${tt} — ${L2(e.by)}`;
  if (e.act === 'role') return `${tt} — ${t(ROLEK[d.from])} → ${t(ROLEK[d.to])}`;
  if (e.act === 'lic') return `${tt} — ${t(d.lic)}`;
  if (e.act === 'bed') return `${tt} — ${t('bedN', {bed:d.bed})}`;
  if (e.act === 'imp') return `${tt} — ${t('it' + d.type)} · ${num(d.ok)}`;
  if (e.act === 'undo') { const o = AUD.find(z => z.id === d.of); return `${tt}${o ? ' — ' + aTitle(o) : ''}`; }
  if (e.act === 'bill' || e.act === 'print') return `${tt} — ${n} · ${d.billNo}`;
  return n ? `${tt} — ${n}${d.bed && e.act !== 'pay' ? ' · ' + t('bedN', {bed:d.bed}) : ''}` : tt;
};
function aDetails(e){
  if (e.act === 'gen') return (e.amt ? [[t('fAmt'), `<b>${money(e.amt)}</b>`]] : []).concat(e.gd || []);
  const d = e.d || {}, R2 = [];
  const pr = (k, v) => { if (v !== '' && v != null) R2.push([t(k), v]); };
  if (d.name) { pr('fPatient', `<b>${esc(L2(d.name))}</b>`); pr('fUhid', `<span class="latin">${esc(d.uhid)}</span>`); if (d.bed) pr('fBed', `<span class="latin">${d.bed}</span>`); }
  switch (e.act) {
    case 'adm': pr('fAgeSex', `${num(d.age)} · ${sexTxt(d.sex)}`); pr('fDoc', docName(d.doc)); pr('fReason', esc(L2(d.reason)) || '—'); pr('fFam', `<span class="latin">${fmtPhone(d.fam)}</span>`); pr('fAdv', d.adv ? `${money(d.adv)} · ${t(d.advM)}` : '—'); if (d.idno) pr('idNoL', `<span class="latin">${esc(d.idno)}</span>`); break;
    case 'pay': pr('fAmt', `<b>${money(e.amt)}</b>`); pr('fMethod', t(d.m)); pr('fRef', d.ref ? `<span class="latin">${esc(d.ref)}</span>` : '—'); pr('fRcpt', `<span class="latin">${d.rcpt}</span>`); pr('fBalB', money(d.balB)); pr('fBalA', `<b>${money(d.balA)}</b>`); break;
    case 'charge': pr('fType', t('c' + d.type)); pr('fAmt', `<b>${money(e.amt)}</b>`); pr('fDesc', esc(L2(d.desc)) || '—'); break;
    case 'dis': pr('fDays', daysTxt(d.days)); pr('fDoc', docName(d.doc)); pr('fCollected', money(d.collected || 0)); pr('fLeft', `<b class="${d.left ? 'due' : ''}">${money(d.left)}</b>`); break;
    case 'bill': pr('fBillNo', `<span class="latin">${d.billNo}</span>`); pr('fDays', daysTxt(d.days)); pr('fDoc', docName(d.doc)); pr('auTotal', `<b>${money(d.total)}</b>`); pr('auPaidL', money(d.paid)); pr('auBal', `<b class="${d.bal ? 'due' : ''}">${money(d.bal)}</b>`); break;
    case 'print': pr('fBillNo', `<span class="latin">${d.billNo}</span>`); pr('auTotal', money(d.total)); break;
    case 'skOut': case 'skIn': case 'skRet': case 'skRef': pr('fItem', esc(L2(d.item))); pr('fQty', `${num(d.q)} ${U[d.u] ? U[d.u][li()] : ''}`); if (d.left != null) pr('fLeftStk', num(d.left)); if (e.act === 'skIn') pr('fCost', money(d.cost || 0)); if (d.billed) pr('fBilled', money(d.billed)); pr('fSrc', t('skSrc' + (d.src || 'man'))); break;
    case 'share': pr('fMethodS', t({qr:'mQr', pdf:'mPdf', sms:'mSms', abha:'mAbha'}[d.method] || 'mQr')); pr('fValid', d.valid === '7d' ? t('v7') : d.valid === 'once' ? t('vOnce') : t('v24')); pr('fDocNo', `<span class="latin">HS-${d.no}</span>`); pr('fSecs', num(d.secs)); break;
    case 'shRev': pr('fDocNo', `<span class="latin">HS-${d.no}</span>`); break;
    case 'role': pr('fFrom', t(ROLEK[d.from])); pr('fTo', t(ROLEK[d.to])); break;
    case 'lic': pr('fType', t(d.lic)); pr('fTo', fdate(new Date(d.date), {day:'numeric', month:'long', year:'numeric'})); break;
    case 'bed': pr('fBed', `<span class="latin">${d.bed}</span>`); pr('fFrom', t(d.from)); pr('fTo', t(d.to)); break;
    case 'imp': pr('fWhat', t('it' + d.type)); pr('fFile', `<span class="latin">${esc(d.file)}</span>`); pr('fRows', num(d.rows)); pr('fOk', num(d.ok)); pr('fWarn', num(d.warn)); pr('fErr', num(d.err)); break;
    case 'undo': { const o = AUD.find(z => z.id === d.of); pr('fUndoOf', o ? `<span class="latin">${o.id}</span> · ${esc(aTitle(o))}` : '—'); break; }
    case 'adv': case 'note': pr('fDoc', docName(d.doc)); pr('fText', esc(L2(d.text))); if (d.fu) pr('fFollow', daysTxt(d.fu)); break;
  }
  return R2;
}
const aAmt = e => e.amt ? money(e.amt) : '';
const aTone = {adm:'blue', dis:'grey', pay:'green', charge:'amber', bill:'violet', print:'grey', skOut:'blue', skIn:'green', skRet:'grey', skRef:'green', share:'violet', shRev:'red', login:'grey', role:'grey', lic:'green', bed:'grey', imp:'violet', undo:'red', adv:'green', note:'violet'};
const aIcon = {adm:'bed', dis:'exit', pay:'rupee', charge:'plus', bill:'receipt', print:'file', skOut:'send', skIn:'box', skRet:'cyl', skRef:'cyl', share:'send', shRev:'lock', login:'user', role:'users', lic:'shield', bed:'bed', imp:'import', undo:'x', adv:'exit', note:'note'};

/* ---------- audit view ---------- */
S.auRole = 'all'; S.auDate = '7'; S.auCat = 'all'; S.auQ = ''; S.auOpen = new Set(); S.auFrom = ''; S.auTo = '';
function auRange(){
  const s = new Date(TODAY); s.setHours(0, 0, 0, 0); const e = new Date(s.getTime() + DAY);
  if (S.auDate === 'today') return [s, e];
  if (S.auDate === 'yest') return [new Date(s.getTime() - DAY), s];
  if (S.auDate === '7') return [new Date(s.getTime() - 6 * DAY), new Date(8.64e15)];
  if (S.auDate === '30') return [new Date(s.getTime() - 29 * DAY), new Date(8.64e15)];
  if (S.auDate === 'custom') { const f = S.auFrom ? new Date(S.auFrom + 'T00:00:00') : new Date(0), tt = S.auTo ? new Date(new Date(S.auTo + 'T00:00:00').getTime() + DAY) : new Date(8.64e15); return [f, tt]; }
  return [new Date(0), new Date(8.64e15)];
}
function auFiltered(skipCat){
  const [a, b] = auRange(), q = S.auQ.trim().toLowerCase();
  return AUD.filter(e => (S.auRole === 'all' || e.role === S.auRole) && e.at >= a && e.at < b && (skipCat || S.auCat === 'all' || (e.cat || ACAT[e.act]) === S.auCat) &&
    (!q || (e.d && e.d.name && e.d.name.some(n => n.toLowerCase().includes(q))) || (e.d && [e.d.uhid, e.d.billNo, e.d.rcpt, e.d.ref].some(v => v && String(v).toLowerCase().includes(q))) || e.id.toLowerCase().includes(q) || aTitle(e).toLowerCase().includes(q)));
}
function vAudit(){
  const base = auFiltered(true), L = auFiltered(false);
  const cats = ['all', 'bill', 'pay', 'adm', 'stock', 'clin', 'sys'];
  const cnt = c => c === 'all' ? base.length : base.filter(e => (e.cat || ACAT[e.act]) === c).length;
  const roles = ['all', 'owner', 'reception', 'nurse', 'doctor', 'system'];
  const dates = [['today', 'auToday'], ['yest', 'auYest'], ['7', 'au7'], ['30', 'au30'], ['all', 'auAll'], ['custom', 'auCustom']];
  return `<div class="ph"><div><h1>${t('auT')}</h1><p class="sub">${t('auSub')}</p></div>
    <div class="ph-actions au-f">
      <label class="au-sel"><span>${t('auRole')}</span><select id="auRole" class="input">${roles.map(r => `<option value="${r}" ${S.auRole === r ? 'selected' : ''}>${r === 'all' ? t('auAllRoles') : t(ROLEK[r])}</option>`).join('')}</select></label>
      <label class="au-sel"><span>${t('auDate')}</span><select id="auDate" class="input">${dates.map(([v, k]) => `<option value="${v}" ${S.auDate === v ? 'selected' : ''}>${t(k)}</option>`).join('')}</select></label>
      ${S.auDate === 'custom' ? `<label class="au-sel"><span>${t('auFrom')}</span><input type="date" id="auFrom" class="input" value="${S.auFrom}"></label><label class="au-sel"><span>${t('auTo')}</span><input type="date" id="auTo" class="input" value="${S.auTo}"></label>` : ''}
    </div></div>
  <div class="toolbar">
    <label class="search"><span class="vh">${t('auSearch')}</span>${ic('search')}<input class="input" id="auQ" type="search" placeholder="${t('auSearch')}" value="${esc(S.auQ)}" autocomplete="off"></label>
    <div class="chips" role="group">${cats.map(c => `<button class="chip" data-act="auCat" data-v="${c}" aria-pressed="${S.auCat === c}">${t(c === 'all' ? 'auCatAll' : 'auC' + c)}<span class="cnt">${num(cnt(c))}</span></button>`).join('')}</div>
  </div>
  <div class="au-bar"><span>${t('auN', {n:num(L.length)})}</span><span class="au-bar-r"><button class="btn btn-ghost btn-sm" data-act="auAllX">${ic('chevD', 16)}${S.auOpen.size ? t('auCollapseAll') : t('auExpandAll')}</button><button class="btn btn-ghost btn-sm" data-act="auCsv">${ic('download', 16)}${t('auExport')}</button></span></div>
  <div id="auList">${auList(L)}</div>`;
}
function auList(L){
  if (!L.length) return `<div class="card">${emptyState('audit', t('auEmpty'), t('auEmptyS'))}</div>`;
  const groups = []; L.slice().sort((a, b) => b.at - a.at).forEach(e => { const k = e.at.toDateString(); let g = groups[groups.length - 1]; if (!g || g.k !== k) groups.push(g = {k, at:e.at, list:[]}); g.list.push(e); });
  const dayLbl = d => { const a = Math.round((new Date(TODAY).setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) / DAY); return (a === 0 ? t('todayCap') + ', ' : a === 1 ? t('auYest') + ', ' : '') + d.toLocaleDateString(loc(), {weekday:'long', day:'numeric', month:'long', year:'numeric'}); };
  return groups.map(g => `<section class="au-day"><h2 class="au-dh">${dayLbl(g.at)} <span>${num(g.list.length)}</span></h2><div class="card flush">${g.list.map(auRow).join('')}</div></section>`).join('');
}
function auRow(e){
  const open = S.auOpen.has(e.id), det = open ? aDetails(e) : null, d = e.d || {};
  return `<div class="au ${open ? 'open' : ''}" id="au-${e.id}">
    <button class="au-h" data-act="auTog" data-id="${e.id}" aria-expanded="${open}" aria-controls="aud-${e.id}">
      <span class="au-t latin">${tm(e.at)}</span>
      <span class="tl-ic tl-${e.tone || aTone[e.act]}">${ic(e.icon || aIcon[e.act], 16)}</span>
      <span class="au-m"><b>${esc(aTitle(e))}</b><span><span class="rchip r-${e.role}">${t(ROLEK[e.role])}</span>${esc(L2(e.by))} · <span class="latin">${e.id}</span></span></span>
      <span class="au-a">${aAmt(e)}</span>
      <span class="au-x">${t(open ? 'auHide' : 'auDetails')}${ic('chevD', 16)}</span>
    </button>
    ${open ? `<div class="au-d" id="aud-${e.id}">
      <dl class="au-kv">${det.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      ${e.act === 'bill' && d.items ? `<div class="au-bill"><h3>${t('auBillItems')}</h3><table><thead><tr><th>${t('fType')}</th><th>${t('fDesc')}</th><th class="r">${t('fAmt')}</th></tr></thead><tbody>${d.items.map(([ty, ds, a]) => `<tr><td>${t('c' + ty)}</td><td>${esc(L2(ds)) || '—'}</td><td class="r">${money(a)}</td></tr>`).join('')}
        <tr class="tot"><td colspan="2">${t('auTotal')}</td><td class="r">${money(d.total)}</td></tr>${d.pays.map(([a, m, r]) => `<tr><td colspan="2">${t('auPaidL')} · ${t(m)}${r ? ' · <span class="latin">' + esc(r) + '</span>' : ''}</td><td class="r">−${money(a)}</td></tr>`).join('')}<tr class="tot ${d.bal ? 'due' : ''}"><td colspan="2">${t('auBal')}</td><td class="r">${money(d.bal)}</td></tr></tbody></table></div>` : ''}
      ${e.act === 'pay' ? `<div class="au-ba"><div><span>${t('auBefore')}</span><b>${money(d.balB)}</b></div>${ic('chevR', 18)}<div><span>${t('auAfter')}</span><b>${money(d.balA)}</b></div></div>` : ''}
      <div class="au-meta">
        <span>${t('auId')}: <b class="latin">${e.id}</b></span>
        <span>${t('auWhen')}: <b>${fdate(e.at, {day:'numeric', month:'short', year:'numeric'})}, ${e.at.toLocaleTimeString(loc(), {hour:'numeric', minute:'2-digit', second:'2-digit'})}</b></span>
        <span>${t('auWho')}: <b>${esc(L2(e.by))}</b> (${t(ROLEK[e.role])})</span>
        <span>${t('auHash')}: <b class="latin">${e.seal.slice(0, 4)}·${e.seal.slice(4, 8)}·${e.seal.slice(8, 12)}·${e.seal.slice(12)}</b></span>
      </div>
      <div class="au-foot"><span class="au-lock">${ic('lock', 14)}${t('auLocked')}</span>${d.pid && getP(d.pid) ? `<button class="btn btn-secondary btn-sm" data-act="patOpen" data-id="${d.pid}">${ic('folder', 16)}${t('auOpenRec')}</button>` : ''}</div>
    </div>` : ''}
  </div>`;
}
function auCsv(){
  const L = auFiltered(false).slice().sort((a, b) => a.at - b.at);
  const rows = [['audit_id', 'date', 'time', 'role', 'user', 'action', 'patient', 'uhid', 'amount', 'details', 'device', 'seal']].concat(L.map(e => [e.id, e.at.toISOString().slice(0, 10), e.at.toTimeString().slice(0, 8), e.role, L2(e.by), aTitle(e), e.d && e.d.name ? L2(e.d.name) : '', e.d && e.d.uhid || '', e.amt || '', aDetails(e).map(([k, v]) => k + ': ' + v.replace(/<[^>]+>/g, '')).join(' | '), t(e.dev), e.seal]));
  return '﻿' + rows.map(r => r.map(v => /[",\n|]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v).join(',')).join('\n');
}

/* ---------- notifications ---------- */
S.nRead = (() => { try { return new Set(JSON.parse(localStorage.getItem('aui-nread-' + (window._clinicId || '')) || '[]')); } catch (e) { return new Set(); } })(); S.nfCat = 'all';
function notifs(){
  const N = [], now = Date.now();
  P.filter(p => !p.disc && status(p) === 'overdue').forEach(p => N.push({k:'over-' + p.id, cat:'bill', tone:'danger', icon:'rupee', title:t('nfOver', {name:nm(p), amt:money(totals(p).bal)}), sub:t('nfOverS', {bed:p.bed, d:daysTxt(Math.max(1, p.days))}), at:now - 20 * 6e4, acts:[['pay', p.id, 'nfActPay'], ['patOpen', p.id, 'nfActOpen']]}));
  P.filter(p => !p.disc && status(p) !== 'overdue' && totals(p).bal >= 8000).forEach(p => N.push({k:'high-' + p.id, cat:'bill', tone:'warn', icon:'trend', title:t('nfHigh', {name:nm(p), amt:money(totals(p).bal)}), sub:t('nfHighS', {bed:p.bed}), at:now - 55 * 6e4, acts:[['pay', p.id, 'nfActPay']]}));
  P.filter(p => p.disc && totals(p).bal > 0).forEach(p => N.push({k:'disd-' + p.id, cat:'bill', tone:'danger', icon:'phone', title:t('nfDisD', {name:nm(p), amt:money(totals(p).bal)}), sub:t('nfDisDS', {when:whenTxt(p.discAgo)}), at:now - (p.discAgo + 1) * 36e5, acts:[['pay', p.id, 'nfActPay'], ['patOpen', p.id, 'nfActOpen']]}));
  P.filter(p => p.advice && !p.disc && totals(p).bal > 0).forEach(p => N.push({k:'adv-' + p.id, cat:'bill', tone:'warn', icon:'exit', title:t('nfAdvD', {name:nm(p), amt:money(totals(p).bal)}), sub:t('nfAdvDS', {doc:advName(p)}), at:now - 2 * 36e5, acts:[['pay', p.id, 'nfActPay']]}));
  SK.forEach(i => {
    const st = skSt(i), d = skExpD(i), base = {u:skU(i), min:num(i.min), item:skN(i), n:num(i.qty)};
    if (st === 'out') N.push({k:'out-' + i.id, cat:'stock', tone:'danger', icon:'box', title:t('nfOut', base), sub:t('nfOutS', base), at:now - 3 * 36e5, acts:[['skIn', i.id, 'nfActIn']]});
    else if (st === 'low') N.push({k:'low-' + i.id + '-' + i.qty, cat:'stock', tone:'warn', icon:'box', title:t('nfLow', base), sub:t('nfLowS', base), at:now - 5 * 36e5, acts:[['skIn', i.id, 'nfActIn'], ['gotoStock', '', 'nfActStock']]});
    if (d != null && d <= 60 && i.qty > 0) N.push({k:'exp-' + i.id, cat:'stock', tone:d <= 30 ? 'warn' : 'info', icon:'clock', title:t('nfExp', Object.assign({d:num(d)}, base)), sub:t('nfExpS', Object.assign({b:i.batch}, base)), at:now - 8 * 36e5, acts:[['gotoStockExp', '', 'nfActStock']]});
    if (i.ret && i.empty) N.push({k:'cyl-' + i.id + '-' + i.empty, cat:'stock', tone:'info', icon:'cyl', title:t('nfCyl', {n:num(i.empty)}), sub:t('nfCylS', {item:skN(i), f:num(i.qty)}), at:now - 90 * 6e4, acts:[['skRefill', i.id, 'skRefill']]});
  });
  LIC.filter(l => l.days <= 30).forEach(l => N.push({k:'lic-' + l.id + '-' + l.days, cat:'lic', tone:l.days <= 15 ? 'danger' : 'warn', icon:'shield', title:t('nfLic', {name:t(l.name), d:num(l.days)}), sub:t('nfLicS', {date:fdate(dateIn(l.days), {day:'numeric', month:'long'})}), at:now - 7 * 36e5, acts:[['gotoLic', l.id, 'nfActLic']]}));
  const c = bedStats().clean; if (c) N.push({k:'clean-' + c, cat:'bed', tone:'info', icon:'sparkle', title:t('nfClean', {n:num(c)}), sub:t('nfCleanS'), at:now - 40 * 6e4, acts:[['bedsClean', '', 'nfActBeds']]});
  const allow = {owner:['bill', 'stock', 'lic', 'bed'], reception:['bill', 'stock', 'bed'], nurse:['stock', 'bed'], doctor:['bed']}[S.role];
  const tw = {danger:0, warn:1, info:2};
  return N.filter(n => allow.includes(n.cat)).sort((a, b) => (S.nRead.has(a.k) - S.nRead.has(b.k)) || tw[a.tone] - tw[b.tone] || b.at - a.at);
}
const unread = () => notifs().filter(n => !S.nRead.has(n.k)).length;
const saveRead = () => { try { localStorage.setItem('aui-nread-' + (window._clinicId || ''), JSON.stringify([...S.nRead].slice(-400))); } catch (e) {} };
const agoTxt = at => { const m = Math.max(1, Math.round((Date.now() - at) / 6e4)); return m < 60 ? (S.lang === 'bn' ? `${num(m)} মিনিট আগে` : `${m} min ago`) : m < 1440 ? (S.lang === 'bn' ? `${num(Math.round(m / 60))} ঘণ্টা আগে` : `${Math.round(m / 60)} h ago`) : whenTxt(Math.round(m / 1440)); };
function nfItem(n, full){
  const rd = S.nRead.has(n.k);
  return `<div class="nf ${rd ? 'rd' : ''} t-${n.tone}"><span class="nf-ic">${ic(n.icon, 18)}</span>
    <div class="nf-b"><b>${esc(n.title)}</b><span>${esc(n.sub)}</span><small>${n.tone === 'danger' ? `<i class="nf-tag">${t('nfCritical')}</i>` : ''}${agoTxt(n.at)}</small>
      ${full ? `<div class="nf-acts">${n.acts.map(([a, id, k], j) => `<button class="btn ${j ? 'btn-ghost' : 'btn-secondary'} btn-sm" data-act="nfGo" data-a="${a}" data-id="${id}" data-k="${n.k}">${t(k)}</button>`).join('')}${!rd ? `<button class="btn btn-ghost btn-sm" data-act="nfRead" data-k="${n.k}">${ic('check', 15)}${t('nfMarkRead')}</button>` : ''}</div>` : ''}</div>
    ${!full ? `<button class="nf-go" data-act="nfGo" data-a="${n.acts[0][0]}" data-id="${n.acts[0][1]}" data-k="${n.k}" aria-label="${t(n.acts[0][2])}">${ic('chevR', 16)}</button>` : ''}${!rd ? '<i class="nf-dot" aria-hidden="true"></i>' : ''}</div>`;
}
function nfPop(){
  const N = notifs(), u = N.filter(n => !S.nRead.has(n.k)).length;
  return `<div class="nfpop" id="nfPop" role="dialog" aria-label="${t('nfT')}">
    <div class="nfpop-h"><b>${t('nfT')}${u ? ` <span class="nfc">${num(u)}</span>` : ''}</b>${u ? `<button class="btn btn-ghost btn-sm" data-act="nfAll">${ic('check', 15)}${t('nfAllRead')}</button>` : ''}</div>
    <div class="nfpop-l">${N.length ? N.slice(0, 7).map(n => nfItem(n, false)).join('') : `<p class="nf-none">${ic('check', 18)}${t('nfNone')}</p>`}</div>
    <button class="nfpop-f" data-act="nfPage">${t('nfSeeAll')} (${num(N.length)})${ic('chevR', 16)}</button></div>`;
}
function vNotif(){
  const N = notifs(), cats = ['all', 'bill', 'stock', 'lic', 'bed'].filter(c => c === 'all' || N.some(n => n.cat === c));
  const L = N.filter(n => S.nfCat === 'all' || (S.nfCat === 'unread' ? !S.nRead.has(n.k) : n.cat === S.nfCat));
  const u = N.filter(n => !S.nRead.has(n.k)).length;
  return `<div class="ph"><div><h1>${t('nfT')}</h1><p class="sub">${t('nfSub')}</p></div><div class="ph-actions">${u ? `<button class="btn btn-secondary" data-act="nfAll">${ic('check')}${t('nfAllRead')}</button>` : ''}</div></div>
  <div class="toolbar"><div class="chips" role="group">${cats.map(c => `<button class="chip" data-act="nfCat" data-v="${c}" aria-pressed="${S.nfCat === c}">${t('nfC' + c)}<span class="cnt">${num(c === 'all' ? N.length : N.filter(n => n.cat === c).length)}</span></button>`).join('')}<button class="chip" data-act="nfCat" data-v="unread" aria-pressed="${S.nfCat === 'unread'}">${t('nfUnread')}<span class="cnt">${num(u)}</span></button></div></div>
  <div class="card flush nflist">${L.length ? L.map(n => nfItem(n, true)).join('') : emptyState('bell', t('nfNone'), '')}</div>`;
}

/* ---------- import old data ---------- */
const IMT = ['beds', 'adm', 'pat', 'stock'];
const IMI = {beds:'bed', adm:'user', pat:'folder', rate:'receipt', stock:'box'};
const IMCOLS = {beds:'bed_no, ward, status', adm:'name, age, sex, phone, family_phone, bed, doctor, reason, admit_date, advance', pat:'name, age, sex, phone, last_visit, diagnosis, total_bill, paid', rate:'service, category, rate, unit', stock:'name, category, qty, unit, unit_cost, batch, expiry, supplier'};
const IMTPL = {
  beds:'bed_no,ward,status\nG13,General,free\nG14,General,free\nF9,Female,free\nI5,ICU,cleaning\n',
  adm:'name,age,sex,phone,family_phone,bed,doctor,reason,admit_date,advance\nসুবল মাঝি,58,M,9000012345,9000154321,G2,Dr. Subrata Mondal,শ্বাসকষ্ট,2026-11-18,3000\nRekha Bauri,34,F,9000023456,9000165432,F1,Dr. Ananya Ghosh,Fever,18/11/2026,2000\n',
  pat:'name,age,sex,phone,last_visit,diagnosis,total_bill,paid\nনিতাই দাস,66,M,9000034567,2026-08-12,ডায়াবেটিস,18400,18400\nMampi Hembram,27,F,9000045678,05/10/2026,Delivery (normal),22600,15000\n',
  rate:'service,category,rate,unit\nGeneral bed,bed,900,per day\nICU bed,bed,3500,per day\nDoctor visit,visit,400,per visit\nCBC,test,250,per test\nX-ray chest,test,450,per test\nNormal delivery,ot,9000,per case\n',
  stock:SK_TPL
};
const IMALIAS = {
  bed:['bed', 'bedno', 'bedid', 'bednumber', 'বেড', 'বেডনং', 'বেডনম্বর'], ward:['ward', 'ওয়ার্ড'], status:['status', 'অবস্থা'],
  name:['name', 'patient', 'patientname', 'নাম', 'রোগী', 'রোগীরনাম', 'item', 'itemname'], age:['age', 'বয়স'], sex:['sex', 'gender', 'লিঙ্গ'],
  phone:['phone', 'mobile', 'mobileno', 'contact', 'ফোন', 'মোবাইল'], fam:['familyphone', 'guardianphone', 'attendantphone', 'familymobile', 'পরিবারেরফোন'],
  doc:['doctor', 'consultant', 'ডাক্তার', 'চিকিৎসক'], reason:['reason', 'diagnosis', 'complaint', 'রোগ', 'কারণ', 'রোগনির্ণয়', 'ভর্তিরকারণ'],
  adate:['admitdate', 'admissiondate', 'doa', 'date', 'ভর্তিরতারিখ', 'তারিখ'], adv:['advance', 'advancepaid', 'অগ্রিম'],
  last:['lastvisit', 'visitdate', 'dischargedate', 'শেষভিজিট', 'শেষতারিখ'], bill:['totalbill', 'bill', 'billamount', 'মোটবিল', 'বিল'], paid:['paid', 'amountpaid', 'জমা'],
  svc:['service', 'particulars', 'পরিষেবা', 'বিবরণ'], cat:['category', 'cat', 'type', 'ধরন'], rate:['rate', 'price', 'charge', 'amount', 'দাম', 'রেট', 'চার্জ'], unit:['unit', 'per', 'একক']
};
const IMNEED = {beds:['bed', 'ward', 'status'], adm:['name', 'age', 'sex', 'phone', 'fam', 'bed', 'doc', 'reason', 'adate', 'adv'], pat:['name', 'age', 'sex', 'phone', 'last', 'reason', 'bill', 'paid'], rate:['svc', 'cat', 'rate', 'unit']};
const IMPHOTO = {
  beds:[['G13', 'জেনারেল', 'খালি'], ['G14', 'জেনারেল', 'খালি'], ['F9', 'মহিলা', 'খালি'], ['I5', 'আইসিইউ', 'পরিষ্কার']],
  adm:[['সুবল মাঝি', '58', 'পুরুষ', '9000012345', '9000154321', 'G2', 'ডা. সুব্রত', 'শ্বাসকষ্ট', '', '3000'], ['রেখা বাউরি', '34', 'মহিলা', '90000234', '9000165432', 'G3', 'ডা. অনন্যা', 'জ্বর', '', '2000'], ['কানাই মুর্মু', '71', 'পুরুষ', '9000056789', '9000176543', 'Z9', 'ডা. পার্থ', 'হাড় ভাঙা', '', '0']],
  pat:[['নিতাই দাস', '66', 'পুরুষ', '9000034567', '12/08/2026', 'ডায়াবেটিস', '18400', '18400'], ['মাম্পি হেমব্রম', '27', 'মহিলা', '9000045678', '05/10/2026', 'প্রসব (নর্মাল)', '22600', '15000'], ['', '45', 'পুরুষ', '', '01/09/2026', 'জ্বর', '3200', '3200']],
  rate:[['জেনারেল বেড', 'bed', '900', 'প্রতিদিন'], ['আইসিইউ বেড', 'bed', '3500', 'প্রতিদিন'], ['ডাক্তার ভিজিট', 'visit', '400', 'প্রতি ভিজিট'], ['সিবিসি', 'test', '250', 'প্রতি পরীক্ষা'], ['এক্স-রে (বুক)', 'test', '450', 'প্রতি পরীক্ষা'], ['নর্মাল ডেলিভারি', 'ot', '9000', 'প্রতি কেস']]
};
const RATES = [];
const IMHIST = [];
S.imp = {step:1, type:null};
function imStep(){
  const s = S.imp.step, L = ['imS1', 'imS2', 'imS3', 'imS4'];
  return `<ol class="imsteps">${L.map((k, i) => `<li class="${i + 1 < s ? 'done' : i + 1 === s ? 'on' : ''}"><span>${i + 1 < s ? ic('check', 14) : num(i + 1)}</span>${t(k)}</li>`).join('')}</ol>`;
}
function vImport(){
  const m = S.imp;
  let body = '';
  if (m.step === 1) body = `<h2 class="imq">${t('imQ')}</h2><div class="imtypes">${IMT.map(k => `<div class="imty"><button class="imty-b" data-act="imType" data-v="${k}"><span class="imty-ic">${ic(IMI[k], 24)}</span><b>${t('it' + k)}</b><span>${t('it' + k + 'S')}</span><small><em>${t('imCols')}</em> <span class="latin">${IMCOLS[k]}</span></small></button><button class="btn btn-ghost btn-sm" data-act="imTpl" data-v="${k}">${ic('download', 15)}${t('imTpl')} .csv</button></div>`).join('')}</div>`;
  else if (m.step === 2) body = `<div class="imsel"><span class="imty-ic">${ic(IMI[m.type], 22)}</span><div><b>${t('it' + m.type)}</b><span class="latin">${IMCOLS[m.type]}</span></div><button class="btn btn-ghost btn-sm" data-act="imStepTo" data-v="1">${t('imBack')}</button></div>
    ${m.err ? `<p class="err">${ic('alert', 15)}${t(m.err)}</p>` : ''}
    ${m.reading ? `<div class="skread im-read">${m.img ? `<img src="${m.img}" alt="">` : `<span class="dz-ic">${ic('sheet', 26)}</span>`}<div><b>${t(m.img ? 'imReadingImg' : 'imReading')}</b><span class="latin" style="font-size:13px;color:var(--text-3)">${esc(m.fname || '')}</span><span class="skprog" style="margin-top:10px"><i></i></span></div></div>`
    : `<label class="dz imdz" data-drop="imp" tabindex="0"><input type="file" accept=".xlsx,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet${m.type === 'stock' ? ',image/*,application/pdf' : ''}" data-file="imp" class="fin" tabindex="-1"><span class="dz-ic">${ic('upload', 30)}</span><b>${t('imDrop')}</b><small>${t('imDropS')}</small><span class="imfmt"><i>${ic('sheet', 14)}Excel</i><i>${ic('file', 14)}CSV</i>${m.type === 'stock' ? `<i>${ic('camera', 14)}${S.lang === 'bn' ? 'বিলের ছবি' : 'Bill photo'}</i>` : ''}</span></label>
    <div class="imbtns"><label class="btn btn-primary btn-lg" tabindex="0" data-cam>${ic('folder')}${t('imPick')}<input type="file" accept=".xlsx,.csv,text/csv${m.type === 'stock' ? ',image/*,application/pdf' : ''}" data-file="imp" class="fin" tabindex="-1"></label>${m.type === 'stock' ? `<label class="btn btn-secondary btn-lg" tabindex="0" data-cam>${ic('camera')}${t('imCam')}<input type="file" accept="image/*" capture="environment" data-file="imp" class="fin" tabindex="-1"></label>` : ''}<button class="btn btn-ghost btn-lg" data-act="imTpl" data-v="${m.type}">${ic('download')}${t('imTplDl', {x:t('it' + m.type)})}</button></div>
    <p class="sknote">${ic('info', 15)}${t('imTip')}</p>`}`;
  else if (m.step === 3) body = imReview(m);
  else body = imDone(m);
  return `<div class="ph"><div><h1>${t('imT')}</h1><p class="sub">${t('imSub')}</p></div></div>
  ${imStep()}
  <section class="card imcard">${body}</section>
  ${m.step === 1 ? imHistory() : ''}`;
}
function imReview(m){
  const ok = m.rows.filter(r => r.v === 'ok').length, w = m.rows.filter(r => r.v === 'warn').length, e = m.rows.filter(r => r.v === 'err').length;
  const cols = m.cols;
  const cell = (r, c) => { const v = r[c]; if (c === 'sex') return v ? sexTxt(v) : '—'; if (c === 'doc') return v ? esc(docName(v)) : esc(r.docRaw || '—'); if (['adv', 'bill', 'paid', 'rate', 'cost'].includes(c)) return v !== '' && v != null ? money(+v || 0) : '—'; if (c === 'ward') return v && WARD[v] ? esc(t(WARD[v].key)) : v ? esc(v) + ` <small class="mut">${t('imNewWard')}</small>` : esc(r.wardRaw || '—'); if (c === 'status') return v ? t({free:'sfree', clean:'sclean', occ:'socc', res:'sres'}[v]) : '—'; if (c === 'cat' && m.type === 'rate') return esc(v || '—'); return esc(v == null || v === '' ? '—' : v); };
  const head = {bed:'fBed', ward:'colLoc', status:'status', name:'fPatient', age:'pAge', sex:'pSex', phone:'phone', fam:'fFam', doc:'fDoc', reason:'fReason', adate:'admittedOn', adv:'fAdv', last:'imLast', bill:'billed', paid:'paid', svc:'rateSvc', cat:'rateCat', rate:'rateAmt', unit:'rateUnit', q:'fQty', cost:'fCost', batch:'skFBatch', exp:'skFExp'};
  return `<div class="imrv-h"><div class="skrsrc" style="margin:0;flex:1">${m.img ? `<img src="${m.img}" alt="">` : `<span class="sk-ic c-cons">${ic(m.src === 'csv' ? 'file' : 'sheet', 20)}</span>`}<div><b>${t('imFound', {n:num(m.rows.length)})} · ${t('it' + m.type)}</b><span class="latin">${esc(m.fname || '')}</span></div></div></div>
    <div class="imsum"><span class="st st-paid">${ic('check', 14)}${t('imOkN', {n:num(ok)})}</span>${w ? `<span class="st st-pending">${ic('alert', 14)}${t('imWarnN', {n:num(w)})}</span>` : ''}${e ? `<span class="st st-overdue">${ic('x', 14)}${t('imErrN', {n:num(e)})}</span>` : ''}</div>
    ${m.map && m.map.length ? `<p class="immap"><b>${t('imMap')}:</b> ${m.map.map(([k, h]) => `<span><span class="latin">${esc(h)}</span> → ${t(head[k] || k)}</span>`).join('')}</p>` : ''}
    <div class="imtbl-w"><table class="imtbl"><thead><tr><th>#</th>${cols.map(c => `<th>${t(head[c] || c)}</th>`).join('')}<th>${t('status')}</th></tr></thead>
    <tbody>${m.rows.map((r, k) => `<tr class="v-${r.v}"><td class="latin">${k + 1}</td>${cols.map(c => `<td>${cell(r, c)}</td>`).join('')}<td><span class="st ${r.v === 'ok' ? 'st-paid' : r.v === 'warn' ? 'st-pending' : 'st-overdue'}">${t(r.v === 'ok' ? 'imRowOk' : r.v === 'warn' ? 'imRowWarn' : 'imRowErr')}</span>${r.msg ? `<small>${r.msg.map(x => t(x)).join(' · ')}</small>` : ''}</td></tr>`).join('')}</tbody></table></div>
    <div class="imfoot"><button class="btn btn-secondary btn-lg" data-act="imStepTo" data-v="2">${t('imBack')}</button><button class="btn btn-primary btn-lg grow" data-act="imGo" ${ok + w ? '' : 'disabled'}>${ic('check')}${t('imGo', {n:num(ok + w)})}</button></div>`;
}
function imDone(m){
  const r = m.result, key = {beds:'rBeds', adm:'rAdm', pat:'rPat', rate:'rRate', stock:'rStock'}[m.type], go = {beds:['beds', 'imGoBeds'], adm:['patients', 'imGoPat'], pat:['patients', 'imGoPat'], rate:null, stock:['stock', 'imGoStock']}[m.type];
  return `<div class="imok"><span class="imok-ic">${ic('check', 34)}</span><h2>${t('imDoneT')}</h2><p>${t(key, {n:num(r.ok)})} · ${t('imDoneS', {n:num(r.ok), e:num(r.err)})}</p>
    <div class="imbtns c">${go ? `<button class="btn btn-primary btn-lg" data-act="nav" data-v="${go[0]}">${t(go[1])}</button>` : ''}<button class="btn btn-secondary btn-lg" data-act="imReset">${ic('import')}${t('imAgain')}</button></div>${r.bad && r.bad.length ? `<p class="err" style="text-align:left;margin-top:14px">${ic('alert', 15)}${esc(r.bad.slice(0, 6).join(' · '))}</p>` : ''}${m.type === 'adm' ? `<p class="sknote" style="text-align:left">${ic('info', 15)}${t('imAdmNote')}</p>` : m.type === 'pat' ? `<p class="sknote" style="text-align:left">${ic('info', 15)}${t('imPatNote')}</p>` : ''}</div>
    ${m.type === 'rate' ? imRates() : ''}`;
}
const imRates = () => `<div class="au-bill" style="margin-top:18px"><h3>${t('imRatesT')}</h3><table><thead><tr><th>${t('rateSvc')}</th><th>${t('rateCat')}</th><th>${t('rateUnit')}</th><th class="r">${t('rateAmt')}</th></tr></thead><tbody>${RATES.map(r => `<tr${r.fresh ? ' class="fresh"' : ''}><td>${esc(L2(r.svc))}</td><td>${esc(r.cat)}</td><td>${esc(L2(r.unit))}</td><td class="r">${money(r.rate)}</td></tr>`).join('')}</tbody></table></div>`;
function imHistory(){
  return `<section class="card flush imhist">${cardH(t('imHist'))}${IMHIST.length ? IMHIST.slice().sort((a, b) => b.at - a.at).map(h => `<div class="iss"><span class="sk-ic c-cons">${ic(IMI[h.type], 18)}</span><div class="tt"><b>${t('it' + h.type)} · <span class="latin">${esc(h.file)}</span></b><span>${fdt(h.at)} · ${esc(L2(h.by) || '')}</span></div><span class="st st-paid">${num(h.ok)} ${t('fOk')}</span>${h.err ? `<span class="st st-overdue">${num(h.err)} ${t('fErr')}</span>` : ''}</div>`).join('') : `<p class="nf-none">${t('imHistNone')}</p>`}</section>
  ${RATES.length ? `<section class="card" style="margin-top:16px">${imRates()}</section>` : ''}`;
}
/* parsing + validation */
const wardOf = s => { const r = String(s || '').trim(); if (!r) return ''; const x = skNorm(r);
  for (const k in WARD) { if (skNorm(k) === x || (T[WARD[k].key] || []).some(n => skNorm(n) === x)) return k; }
  const G = [[/icu|আইসিইউ|ইনটেনসিভ/, /icu/i], [/mat|প্রসূতি|লেবার/, /mat/i], [/fem|মহিলা|লেডিস/, /fem/i], [/gen|জেনারেল|সাধারণ/, /gen/i], [/cabin|কেবিন/, /cabin/i], [/priv|প্রাইভেট/, /priv/i]];
  for (const [a, b] of G) if (a.test(x)) { const k = Object.keys(WARD).find(w => b.test(w)); if (k) return k; }
  return r; };
const bedByNo = s => { const n = String(s || '').trim().toUpperCase().replace(/\s/g, ''); if (!n) return ''; return Object.keys(beds).find(k => k.toUpperCase().replace(/\s/g, '') === n) || ''; };
const statusOf = s => { const x = skNorm(s); if (!x || /free|empty|vacant|খালি/.test(x)) return 'free'; if (/clean|পরিষ্কার/.test(x)) return 'clean'; if (/occ|ভর্তি|রোগী/.test(x)) return 'occ'; if (/res|সংরক্ষিত/.test(x)) return 'res'; return 'free'; };
const sexOf = s => { const x = skNorm(s); if (/^m$|^male|পুরুষ|^ছেলে/.test(x)) return 'M'; if (/^f$|^female|মহিলা|নারী|^মেয়ে/.test(x)) return 'F'; return x ? 'O' : ''; };
const docOf = s => { const x = skNorm(s); if (!x) return ''; for (const k in DOC) { const parts = DOC[k].n.map(n => skNorm(n.replace(/^(ডা\.|Dr\.)\s*/, '').split(' ')[0])); if (parts.some(p => p && x.includes(p))) return k; } return ''; };
const digits = s => String(s || '').replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d)).replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
function imBuild(type, tab, fromPhoto){
  if (type === 'stock') { const rows = rowsFromTable(tab).map(r => { const i = skFind(r.name); return Object.assign(r, {v:i ? 'warn' : 'ok', msg:i ? ['vStkOld'] : null}); }); return {rows, cols:['name', 'q', 'cost', 'batch', 'exp'], map:[]}; }
  const need = IMNEED[type]; let idx = {}, body = tab.slice(1), map = [];
  if (fromPhoto) { need.forEach((k, i) => idx[k] = i); body = tab; }
  else { const h = tab[0].map(x => skNorm(x)); need.forEach(k => { idx[k] = h.findIndex(x => IMALIAS[k].map(skNorm).includes(x)); if (idx[k] >= 0) map.push([k, String(tab[0][idx[k]])]); });
    if (need.every(k => idx[k] < 0)) { need.forEach((k, i) => idx[k] = i); body = tab; map = []; } }
  const g = (r, k) => idx[k] >= 0 && r[idx[k]] != null ? String(r[idx[k]]).trim() : '';
  const usedBeds = new Set();
  const rows = body.map(r => {
    const o = {msg:[]}, err = [], warn = [];
    if (type === 'beds') {
      o.bed = g(r, 'bed').toUpperCase().replace(/\s/g, ''); o.wardRaw = g(r, 'ward'); const ex = bedByNo(o.bed); o.ward = wardOf(o.wardRaw) || (ex ? beds[ex].ward : ''); o.status = statusOf(g(r, 'status'));
      if (!/^[A-Z0-9][A-Z0-9\-\/]{0,11}$/.test(o.bed)) err.push('vBadBedId'); else if (!o.ward) err.push('vBadWard');
      else if (ex) { if (beds[ex].status === 'occ') err.push('vBedOccKeep'); else warn.push('vBedExists'); }
      if (usedBeds.has(o.bed)) err.push('vBedBusy'); usedBeds.add(o.bed);
    } else if (type === 'adm' || type === 'pat') {
      o.name = g(r, 'name'); o.age = String(parseInt(digits(g(r, 'age')), 10) || ''); o.sex = sexOf(g(r, 'sex')); o.phone = digits(g(r, 'phone')); o.reason = g(r, 'reason');
      if (!o.name) err.push('vNoName');
      if (!(+o.age > 0 && +o.age <= 120)) warn.push('vBadAge');
      if (o.phone && o.phone.length !== 10) { warn.push('vBadPhone'); o.phone = ''; }
      if (type === 'adm') {
        o.fam = digits(g(r, 'fam')); if (o.fam && o.fam.length !== 10) { warn.push('vBadPhone'); o.fam = ''; }
        o.bed = bedByNo(g(r, 'bed')) || g(r, 'bed').toUpperCase(); o.docRaw = g(r, 'doc'); o.doc = docOf(o.docRaw); o.adv = String(parseInt(digits(g(r, 'adv')), 10) || 0); o.adate = skDate(g(r, 'adate'));
        if (!beds[o.bed]) err.push('vNoBed'); else if (beds[o.bed].status !== 'free' || usedBeds.has(o.bed)) err.push('vBedBusy');
        if (!o.doc && !o.docRaw) { o.doc = Object.keys(DOC)[0] || ''; if (o.doc) warn.push('vDocDefault'); }
        if (o.adate && o.adate > ymd(new Date())) { o.adate = ''; }
        if (!o.adate) { o.adate = ymd(new Date()); warn.push('vNoDate'); }
        if (!err.length) usedBeds.add(o.bed);
      } else {
        o.last = skDate(g(r, 'last')); o.bill = String(parseInt(digits(g(r, 'bill')), 10) || 0); o.paid = String(parseInt(digits(g(r, 'paid')), 10) || 0);
        if (!o.last) { o.last = ymd(new Date()); warn.push('vNoDate'); }
        if (o.name && Object.values(LV.pat).some(x => skNorm(x.full_name || '') === skNorm(o.name) && (!o.phone || digits10(x.phone) === o.phone))) warn.push('vDup');
      }
    } else if (type === 'rate') {
      o.svc = g(r, 'svc'); o.cat = g(r, 'cat'); o.rate = String(parseInt(digits(g(r, 'rate')), 10) || ''); o.unit = g(r, 'unit');
      if (!o.svc) err.push('vNoName'); if (!o.rate) err.push('vNoRate');
      if (o.svc && RATES.some(x => x.svc.some(s => skNorm(s) === skNorm(o.svc)))) warn.push('vRateUpd');
    }
    o.v = err.length ? 'err' : warn.length ? 'warn' : 'ok'; o.msg = err.concat(warn); if (!o.msg.length) o.msg = null;
    return o;
  }).filter(o => Object.keys(o).some(k => !['msg', 'v', 'status', 'sex', 'adv', 'doc', 'adate', 'bill', 'paid', 'last', 'wardRaw'].includes(k) && o[k]));
  const cols = {beds:['bed', 'ward', 'status'], adm:['name', 'age', 'sex', 'phone', 'bed', 'doc', 'reason', 'adate', 'adv'], pat:['name', 'age', 'sex', 'phone', 'last', 'reason', 'bill', 'paid'], rate:['svc', 'cat', 'rate', 'unit']}[type];
  return {rows, cols, map};
}
function imApply(m){ return {ok:0, err:0, undo:null}; }
function impFile(file){
  const m = S.imp; if (m.step !== 2 || !file) return;
  const nmf = file.name || '', ext = (nmf.split('.').pop() || '').toLowerCase();
  const kind = /^image\/|application\/pdf/.test(file.type) ? 'photo' : ext === 'csv' || file.type === 'text/csv' ? 'csv' : ext === 'xlsx' ? 'xls' : null;
  m.err = ''; if (!kind) { m.err = 'imBadFile'; renderMain(); return; }
  m.fname = nmf; m.src = kind; m.reading = true; m.img = kind === 'photo' ? URL.createObjectURL(file) : null; renderMain();
  const fin = tab => { if (S.imp !== m) return; m.reading = false; const b = imBuild(m.type, tab, kind === 'photo'); if (!b.rows.length) { m.err = 'imNoRows'; renderMain(); return; } Object.assign(m, b); m.step = 3; renderMain(); window.scrollTo(0, 0); };
  const fail = () => { if (S.imp !== m) return; m.reading = false; m.err = 'imBadFile'; renderMain(); };
  if (kind === 'photo' && m.type !== 'stock') { m.reading = false; m.err = 'imPhotoStock'; renderMain(); return; }
  if (kind === 'photo') readBill(file).then(res => { const L = (res && res.ok && res.lines || []).filter(l => l && l.name); if (!L.length) { if (S.imp !== m) return; m.reading = false; m.err = res && res.reason === 'daily_limit' ? 'idQuota' : 'imNoRows'; renderMain(); return; }
    m.inv = {no:res.bill_no || res.invoice_no || '', sup:res.supplier || ''};
    fin([['name', 'qty', 'unit_cost', 'batch', 'expiry', 'supplier']].concat(L.map(l => [String(l.name).trim(), String(Math.round(Number(l.qty) || 1)), String(Math.round(Number(l.rate) || (Number(l.amount) && Number(l.qty) ? Number(l.amount) / Number(l.qty) : 0)) || ''), l.batch || '', l.expiry || l.exp || '', res.supplier || '']))); }).catch(fail);
  else if (kind === 'csv') file.text().then(tx => setTimeout(() => fin(parseCSV(tx)), 500)).catch(fail);
  else file.arrayBuffer().then(readXlsx).then(tab => setTimeout(() => fin(tab), 500)).catch(fail);
}
const _onFile5 = onFile;
onFile = function(kind, file){ if (kind === 'imp') return impFile(file); return _onFile5(kind, file); };

/* ---------- handlers + audit hooks ---------- */
function extraHandlers6(){
  Object.assign(H, {
    auCat: el => { S.auCat = el.dataset.v; renderMain(); const b = ROOT.querySelector(`[data-act="auCat"][data-v="${el.dataset.v}"]`); b && b.focus(); },
    auTog: el => { const id = el.dataset.id; S.auOpen.has(id) ? S.auOpen.delete(id) : S.auOpen.add(id); const row = $('au-' + id), e = AUD.find(z => z.id === id); if (row && e) { row.outerHTML = auRow(e); const b = ROOT.querySelector(`#au-${id} .au-h`); b && b.focus({preventScroll:true}); } },
    auAllX: () => { if (S.auOpen.size) S.auOpen.clear(); else auFiltered(false).forEach(e => S.auOpen.add(e.id)); renderMain(); },
    auCsv: () => { dlText('aurascale-audit-' + new Date().toISOString().slice(0, 10) + '.csv', auCsv()); toast(t('auExport') + ' ✓', 'info'); },
    nfBell: () => { const ex = $('nfPop'); if (ex) { ex.remove(); return; } const sp = $('skinPop'); sp && sp.remove(); BODY.insertAdjacentHTML('beforeend', nfPop()); setTimeout(() => { const b = ROOT.querySelector('#nfPop button'); b && b.focus(); }, 30); },
    nfAll: () => { notifs().forEach(n => S.nRead.add(n.k)); nfRefresh(); },
    nfRead: el => { S.nRead.add(el.dataset.k); nfRefresh(); },
    nfCat: el => { S.nfCat = el.dataset.v; renderMain(); },
    nfPage: () => { const p = $('nfPop'); p && p.remove(); go('notif'); },
    nfGo: el => { S.nRead.add(el.dataset.k); const p = $('nfPop'); p && p.remove(); renderAppbar(); const a = el.dataset.a, fake = {dataset:{id:el.dataset.id, v:el.dataset.id, item:el.dataset.id}}; if (a === 'gotoStockExp') { S.skF = 'exp'; S.skTab = 'items'; go('stock'); return; } if (a === 'skIn') { H.skIn({dataset:{item:el.dataset.id}}); return; } H[a] && H[a](fake); if (S.view === 'notif' && !S.loading) renderMain(); },
    imType: el => { S.imp = {step:2, type:el.dataset.v}; renderMain(); },
    imStepTo: el => { const s = +el.dataset.v; if (s === 1) S.imp = {step:1, type:null}; else { S.imp.step = s; S.imp.reading = false; S.imp.err = ''; } renderMain(); },
    imTpl: el => dlText(`aurascale-template-${el.dataset.v}.csv`, '﻿' + IMTPL[el.dataset.v]),
    imGo: () => { const m = S.imp; const r = imApply(m); m.result = r; m.step = 4;
      const w = m.rows.filter(z => z.v === 'warn').length; const e = audit({act:'imp', d:{type:m.type, file:m.fname, rows:m.rows.length, ok:r.ok, warn:w, err:r.err}});
      IMHIST.push({at:new Date(), type:m.type, file:m.fname, ok:r.ok, err:r.err, by:R().user, aud:e.id}); m.audId = e.id;
      refresh(); toast(t('imDoneS', {n:num(r.ok), e:num(r.err)})); },
    imUndo: () => { const m = S.imp; if (!m.result || !m.result.undo) return; m.result.undo(); m.result.undo = null; const k = IMHIST.findIndex(h => h.aud === m.audId); if (k >= 0) IMHIST.splice(k, 1); audit({act:'undo', d:{of:m.audId}}); S.imp = {step:1, type:null}; refresh(); toast(t('imUndone'), 'info'); },
    imReset: () => { S.imp = {step:1, type:null}; renderMain(); window.scrollTo(0, 0); }
  });
  /* audit hooks: wrap existing actions */
  const hook = (name, pre, post) => { const f = H[name]; if (!f) return; H[name] = (el, ev) => { let c; try { c = pre ? pre(el) : null; } catch (x) { c = null; } const r = f(el, ev); try { post(el, c); } catch (x) { console.warn('audit', name, x); } nfRefresh(); return r; }; };
  hook('admSave', () => ({n:P.length, f:Object.assign({}, S.modal.f)}), (el, c) => { if (P.length > c.n) { const p = P[P.length - 1], adv = p.pays[0]; audit({act:'adm', pid:p.id, d:Object.assign(pSnap(p), {doc:p.doc, reason:p.reason.slice(), fam:p.fam, rel:p.rel, adv:adv ? adv.amt : 0, advM:adv ? adv.m : '', idno:c.f.idno})}); } });
  hook('paySave', () => { const p = getP(S.modal.pid); return {p, n:p.pays.length, bal:totals(p).bal}; }, (el, c) => { if (c.p.pays.length > c.n) { const y = c.p.pays[c.p.pays.length - 1]; audit({act:'pay', pid:c.p.id, amt:y.amt, d:Object.assign(pSnap(c.p), {m:y.m, ref:y.ref, rcpt:'RC-' + (rcSeq++), balB:c.bal, balA:totals(c.p).bal})}); } });
  hook('chargeSave', () => { const p = getP(S.modal.pid); return {p, n:p.extra.length}; }, (el, c) => { if (c.p.extra.length > c.n) { const g = c.p.extra[c.p.extra.length - 1]; audit({act:'charge', pid:c.p.id, amt:g.amt, d:Object.assign(pSnap(c.p), {type:g.type, desc:g.desc})}); } });
  hook('disFinish', () => { const p = getP(S.modal.pid); return {p, bal:totals(p).bal, n:p.pays.length}; }, (el, c) => { const p = c.p; if (!p.disc) return; const b = billSnap(p), col = p.pays.slice(c.n).reduce((a, y) => a + y.amt, 0);
    audit({act:'bill', pid:p.id, amt:b.total, d:Object.assign(pSnap(p), b, {billNo:billNoOf(p), days:Math.max(1, p.days), doc:p.doc})});
    if (col) audit({act:'pay', pid:p.id, amt:col, d:Object.assign(pSnap(p), {m:S.modal ? S.modal.method : 'cash', ref:'', rcpt:'RC-' + (rcSeq++), balB:c.bal, balA:b.bal})});
    audit({act:'dis', pid:p.id, d:Object.assign(pSnap(p), {days:Math.max(1, p.days), doc:p.doc, collected:col, left:b.bal})}); });
  hook('printBill', null, el => { const p = getP(el.dataset.id); if (p) audit({act:'print', pid:p.id, amt:totals(p).total, d:Object.assign(pSnap(p), {billNo:billNoOf(p), total:totals(p).total})}); });
  const movHook = name => hook(name, () => MOV.length, (el, n) => { MOV.slice(n).forEach(mv => { const i = skGet(mv.item), p = mv.pid ? getP(mv.pid) : null, x = ISS.find(z => z.id === 's' + mv.id);
    audit({act:{out:'skOut', in:'skIn', ret:'skRet', ref:'skRef'}[mv.type], pid:mv.pid, amt:x && x.amt ? x.amt : 0, d:Object.assign(p ? pSnap(p) : {}, {item:i.n.slice(), q:mv.q, u:i.u, src:mv.src, cost:i.cost, left:i.qty, billed:x && x.amt ? x.amt : 0})}); }); });
  ['skIssueSave', 'skRet', 'skRefill', 'skInSave', 'skManSave'].forEach(movHook);
  hook('shCreate', () => S.modal && S.modal.pid, (el, pid) => { const L = SHARES[pid] || [], sh = L[L.length - 1], p = getP(pid); if (sh && S.modal && S.modal.step === 3) audit({act:'share', pid, d:Object.assign(pSnap(p), {method:sh.method, valid:sh.valid, no:sh.no, secs:(sh.sec || []).length})}); });
  hook('shRevoke', el => el.dataset.id, (el, pid) => { const z = (SHARES[pid] || []).find(s => s.id === el.dataset.s); if (z && z.revoked) audit({act:'shRev', pid, d:Object.assign(pSnap(getP(pid)), {no:z.no})}); });
  hook('role', () => S.role, (el, from) => { if (S.role !== from) audit({act:'role', role:from, d:{from, to:S.role}}); });
  hook('renew', null, el => { const l = LIC.find(x => x.id === el.dataset.id); audit({act:'lic', d:{lic:l.name, date:dateIn(l.days)}}); });
  hook('markFree', null, el => audit({act:'bed', d:{bed:el.dataset.id, from:'sclean', to:'sfree'}}));
  /* undo from any toast → audit */
  const _toast = toast;
  toast = function(msg, type, action){
    if (action && action.label === t('undo')) { const idx = AUD.length, fn = action.fn; action = {label:action.label, fn:() => { fn(); const o = AUD[idx]; if (o && o.act !== 'undo') audit({act:'undo', d:{of:o.id}}); nfRefresh(); }}; }
    return _toast(msg, type, action);
  };
  ROOT.addEventListener('click', e => { const pop = $('nfPop'); if (pop && !pop.contains(e.target) && !e.target.closest('[data-act="nfBell"]')) pop.remove(); });
  ROOT.addEventListener('keydown', e => { if (e.key === 'Escape') { const pop = $('nfPop'); if (pop) { pop.remove(); const b = ROOT.querySelector('[data-act="nfBell"]'); b && b.focus(); } } });
  ROOT.addEventListener('input', e => { if (e.target.id === 'auQ') { S.auQ = e.target.value; const l = $('auList'); if (l) l.innerHTML = auList(auFiltered(false)); } });
  ROOT.addEventListener('change', e => { const id = e.target.id; if (id === 'auRole') { S.auRole = e.target.value; renderMain(); } if (id === 'auDate') { S.auDate = e.target.value; renderMain(); } if (id === 'auFrom') { S.auFrom = e.target.value; renderMain(); } if (id === 'auTo') { S.auTo = e.target.value; renderMain(); } });
}
function nfRefresh(){ saveRead(); const b = ROOT.querySelector('[data-act="nfBell"] .nfb'), n = unread(); if (b) { b.textContent = num(n); b.hidden = !n; } const pop = $('nfPop'); if (pop) { pop.outerHTML = nfPop(); } if (S.view === 'notif' && !S.loading) renderMain(); }
const _renderAppbar6 = renderAppbar;
renderAppbar = function(){ _renderAppbar6(); const r = ROOT.querySelector('#appbar .ab-right'), n = unread(); if (r) r.insertAdjacentHTML('afterbegin', `<button class="iconbtn nfbell" data-act="nfBell" aria-label="${t('nfT')}" aria-haspopup="dialog">${ic('bell')}<span class="nfb" ${n ? '' : 'hidden'}>${num(n)}</span></button>`); };

/* =================== v8: SETTINGS (owner) — modelled on the AuraScale nursing-home settings =================== */
Object.assign(T, {
  navSettings:['সেটিংস','Settings'],
  stT:['সেটিংস','Settings'], stSub:['আপনার নার্সিং হোম ও অ্যাকাউন্ট সামলান','Manage your nursing home and account'],
  stJump:['এই পাতায়','On this page'],
  fdT:['প্রতিষ্ঠানের তথ্য','Facility details'], fdIntro:['এই তথ্য প্রতিটি বিলের একদম উপরে ছাপা হয়।','These details are printed at the top of every bill.'],
  fdName:['নার্সিং হোমের নাম','Nursing home name'], fdNameNote:['নাম বদলাতে AuraScale-এর সাথে যোগাযোগ করুন।','To change the name, contact AuraScale.'],
  fdAddr:['ঠিকানা','Address'], fdAddrPh:['রাস্তা, শহর/গ্রাম, জেলা, পিন কোড','Street, town, district, PIN code'],
  fdPhone:['ফোন নম্বর','Phone number'], fdPhonePh:['যেমন: 9000012345','e.g. 9000012345'],
  fdWa:['মালিকের হোয়াটসঅ্যাপ নম্বর','Owner’s WhatsApp number'], fdWaHelp:['পেমেন্টের খবর আর রাত ৮টার দৈনিক রিপোর্ট এই নম্বরে যাবে। খালি রাখলে রেজিস্টার করা মোবাইলে যাবে।','Payment alerts and the 8 PM daily report go here. If empty, they go to your registered mobile.'],
  fdGst:['জিএসটিআইএন (GSTIN) (ঐচ্ছিক)','GSTIN (optional)'], fdGstPh:['যেমন: 19ABCDE1234F1Z5','e.g. 19ABCDE1234F1Z5'], fdGstHelp:['১৫টি অক্ষর ও সংখ্যা। GSTIN না থাকলে খালি রাখুন।','15 letters and numbers. Leave empty if you have no GSTIN.'],
  fdGstBill:['GSTIN থাকলে রোগীর বিলের শিরোনাম হবে “Bill of Supply”, না থাকলে “Final Bill”। চিকিৎসার উপর কোনো ক্ষেত্রেই GST লাগে না।','With a GSTIN, patient bills are titled “Bill of Supply”; without it, “Final Bill”. No GST is charged on treatment either way.'],
  fdGstOk:['✓ ঠিক আছে','✓ Looks right'], fdGstBad:['GSTIN ঠিক নয় — ১৫টি অক্ষর, যেমন 19ABCDE1234F1Z5','GSTIN looks wrong — 15 characters, like 19ABCDE1234F1Z5'], fdGstStateN:['রাজ্য: {s}','State: {s}'],
  fdState:['রাজ্য (AuraScale-এর GST ইনভয়েসের জন্য)','State (for AuraScale’s GST invoice)'], fdStateHelp:['আপনাকে পাঠানো AuraScale-এর মাসিক ট্যাক্স ইনভয়েসে ব্যবহার হবে। GSTIN দিলে তার রাজ্যই ধরা হবে।','Used on AuraScale’s monthly tax invoice to you. If you enter a GSTIN, its state is used instead.'],
  fdPrev:['আপনার বিলের উপরের অংশ দেখতে এমন হবে','How the top of your bill will look'], fdPrevNoAddr:['এখানে আপনার ঠিকানা দেখাবে','Your address will appear here'],
  fdSave:['তথ্য সংরক্ষণ করুন','Save details'], fdSaved:['সংরক্ষিত হয়েছে। নতুন বিলে এই তথ্য থাকবে। আগে বানানো বিল পুরোনো তথ্যই রাখবে।','Saved. New bills will show these details. Bills already made keep their old header.'],
  fdErrPhone:['ফোন নম্বর ঠিক নয় — ৮ থেকে ১৫টি সংখ্যা দিন','Phone looks wrong — use 8 to 15 digits'], fdErrWa:['হোয়াটসঅ্যাপ নম্বর ঠিক নয় — ১০ থেকে ১৫টি সংখ্যা দিন','WhatsApp number looks wrong — use 10 to 15 digits'], fdErrAddr:['ঠিকানা খুব বড় (সর্বোচ্চ ৩০০ অক্ষর)','Address is too long (max 300 characters)'],
  fdNoChange:['কিছু বদলানো হয়নি','Nothing changed'], bsExempt:['চিকিৎসা পরিষেবা GST-মুক্ত','Healthcare services exempt'], bsNoGst:['GST প্রযোজ্য নয়','GST not applicable'],
  tmT:['GST নিয়ম (Tax Master)','GST rules (Tax Master)'], tmSub:['প্রতিটি বিলে নিজে থেকে প্রয়োগ হয়','Used automatically on every bill'],
  tmIntro:['কোন খরচে কত GST — এক জায়গায়। ভারতের GST 2.0 (২২ সেপ্টেম্বর ২০২৫ থেকে) অনুযায়ী আগে থেকে সাজানো; আপনার হিসাবরক্ষকের সাথে মিলিয়ে নিন।','Which charge gets how much GST — in one place. Pre-filled as per India’s GST 2.0 (from 22 Sep 2025); confirm with your accountant.'],
  tmColSvc:['খরচের ধরন','Charge type'], tmColCode:['SAC / HSN','SAC / HSN'], tmColRate:['GST','GST'], tmColOn:['চালু','On'],
  tmR1:['চিকিৎসা পরিষেবা — ডাক্তার, নার্সিং, ওটি, পরীক্ষা','Healthcare services — doctor, nursing, OT, tests'], tmR1n:['ক্লিনিক্যাল প্রতিষ্ঠানের চিকিৎসা GST-মুক্ত','Treatment by a clinical establishment is exempt'],
  tmR2:['আইসিইউ / সিসিইউ / এনআইসিইউ বেড','ICU / CCU / NICU bed'], tmR2n:['ভাড়া যত বেশিই হোক, ছাড়','Exempt whatever the tariff'],
  tmR3:['সাধারণ রুম ভাড়া — দিনে {amt}-এর বেশি','Non-ICU room — above {amt} a day'], tmR3n:['পুরো ভাড়ার উপর ৫%, ITC ছাড়া','5% on the full rent, without ITC'],
  tmR4:['ভর্তি রোগীর ওষুধ ও কনজিউমেবল (চিকিৎসার অংশ)','Medicines & consumables for in-patients (part of treatment)'], tmR4n:['চিকিৎসার সাথে যুক্ত হলে ছাড়','Exempt when part of treatment'],
  tmR5:['আলাদা বিক্রি ওষুধ (ফার্মেসি কাউন্টার)','Medicines sold separately (pharmacy counter)'], tmR5n:['বেশিরভাগ ওষুধে ৫% — HSN অনুযায়ী','5% on most medicines — as per HSN'],
  tmR6:['ভর্তি রোগীর খাবার','Food for admitted patients'], tmR6n:['রোগীর খাবার ছাড়','Exempt for in-patients'],
  tmR7:['কসমেটিক / প্লাস্টিক সার্জারি (পুনর্গঠনমূলক নয়)','Cosmetic / plastic surgery (non-reconstructive)'], tmR7n:['চিকিৎসা হিসেবে ধরা হয় না','Not treated as healthcare'],
  tmExempt:['ছাড়','Exempt'], tmLocked:['আইন অনুযায়ী বদলানো যায় না','Fixed by law'], tmThreshold:['সীমা (দিনে)','Limit (per day)'],
  tmCalcT:['হিসেব করে দেখুন','Try a calculation'], tmCalcWard:['ওয়ার্ড','Ward'], tmCalcRate:['দিনের ভাড়া (₹)','Rent per day (₹)'], tmCalcDays:['দিন','Days'],
  tmCalcRes:['{rent} ভাড়া → GST {gst}','{rent} rent → GST {gst}'], tmCalcWhy0:['GST লাগবে না — {why}','No GST — {why}'], tmCalcWhy1:['৫% GST লাগবে (দিনে {amt}-এর বেশি, আইসিইউ নয়)','5% GST applies (above {amt} a day, not ICU)'],
  tmWhyIcu:['আইসিইউ ছাড়','ICU is exempt'], tmWhyLow:['দিনে {amt} বা তার কম','{amt} a day or less'], tmWhyOff:['নিয়মটি বন্ধ আছে','the rule is off'],
  tmWards:['আপনার ওয়ার্ডগুলো','Your wards'], tmWardOk:['GST নেই','No GST'], tmWardTax:['৫% GST','5% GST'],
  tmSaved:['GST নিয়ম সংরক্ষিত হয়েছে — পরের বিল থেকে প্রয়োগ হবে','GST rules saved — applies from the next bill'], tmSave:['নিয়ম সংরক্ষণ করুন','Save rules'], tmCheck:['প্রোটোটাইপ: নিয়মগুলো আইনি পরামর্শ নয়','Prototype: these rules are not legal advice'],
  sgT:['বিলে স্বাক্ষর ও সিল','Signature & stamp on bills'], sgIntro:['প্রতিটি চূড়ান্ত বিল ও টাকার রসিদের নিচে “Authorised Signatory”-র উপরে ছাপা হয়।','Printed at the bottom of every final bill and payment receipt, above “Authorised Signatory”.'],
  sgName:['যিনি সই করবেন তাঁর নাম (ঐচ্ছিক)','Name of the person who signs (optional)'], sgNamePh:['যেমন: ডা. সুব্রত মণ্ডল (মেডিক্যাল সুপারিনটেনডেন্ট)','e.g. Dr. S. Mondal (Medical Superintendent)'],
  sgFile:['স্বাক্ষর বা সিলের ছবি (JPG বা PNG)','Signature or stamp picture (JPG or PNG)'], sgDrop:['ছবি এখানে টেনে আনুন বা চাপ দিয়ে বেছে নিন','Drag the picture here or tap to choose'],
  sgHow:['সাদা কাগজে সই (ও সিল) করুন, ভালো আলোয় উপর থেকে পরিষ্কার ছবি তুলুন, তারপর এখানে দিন। সাদা কাগজ AuraScale নিজেই সরিয়ে দেবে।','Sign (and stamp) on plain white paper, take a clear photo from above in good light, and choose it here. AuraScale removes the white paper by itself.'],
  sgPrev:['বিলে দেখতে এমন হবে','How it will look on the bill'], sgNone:['এখনও স্বাক্ষর দেওয়া হয়নি','No signature yet'], sgFor:['{n}-এর পক্ষে','For {n}'],
  sgSave:['স্বাক্ষর সংরক্ষণ করুন','Save signature'], sgRemove:['সরিয়ে দিন','Remove'], sgSaved:['স্বাক্ষর সংরক্ষিত — নতুন বিলে ছাপা হবে','Signature saved — printed on new bills'], sgRemoved:['স্বাক্ষর সরানো হয়েছে','Signature removed'],
  sgBad:['এটা JPG বা PNG ছবি নয়, বা ছবিতে কিছু পাওয়া যায়নি','Not a JPG/PNG picture, or nothing found in it'], sgBig:['ছবিটি ৮ MB-এর বেশি','The picture is larger than 8 MB'], sgCleaned:['সাদা কাগজ সরানো হয়েছে ✓','White paper removed ✓'], sgNothing:['আগে একটি ছবি বেছে নিন','Choose a picture first'],
  pwT:['পাসওয়ার্ড বদলান','Change password'], pwCur:['বর্তমান পাসওয়ার্ড','Current password'], pwCurPh:['আপনার বর্তমান পাসওয়ার্ড লিখুন','Enter your current password'], pwForgot:['পাসওয়ার্ড ভুলে গেছেন?','Forgot password?'],
  pwNew:['নতুন পাসওয়ার্ড','New password'], pwNewPh:['কমপক্ষে ৬টি অক্ষর','Min 6 characters'], pwConf:['নতুন পাসওয়ার্ড আবার লিখুন','Confirm new password'], pwBtn:['পাসওয়ার্ড আপডেট করুন','Update password'],
  pwErrCur:['বর্তমান পাসওয়ার্ড ভুল','Current password is wrong'], pwErrShort:['নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হবে','New password must be at least 6 characters'], pwErrMatch:['দুটো নতুন পাসওয়ার্ড মিলছে না','The two new passwords don’t match'], pwErrSame:['নতুন পাসওয়ার্ড পুরোনোটার মতো হতে পারবে না','New password can’t be the same as the old one'],
  pwDone:['পাসওয়ার্ড বদলানো হয়েছে। অন্য সব ডিভাইস থেকে সাইন আউট করা হলো।','Password changed. You were signed out of all other devices.'], pwDemo:['প্রোটোটাইপ: বর্তমান পাসওয়ার্ড {p}','Prototype: current password is {p}'],
  pwS0:['দুর্বল','Weak'], pwS1:['চলবে','Fair'], pwS2:['ভালো','Good'], pwS3:['খুব ভালো','Strong'], pwShow:['দেখান','Show'], pwHide:['লুকান','Hide'],
  fgT:['পাসওয়ার্ড রিসেট','Reset password'], fgS:['রেজিস্টার করা মোবাইলে একটি OTP যাবে','An OTP will be sent to your registered mobile'], fgSend:['OTP পাঠান','Send OTP'], fgSent:['+91 90000 •••45 নম্বরে OTP পাঠানো হয়েছে (প্রোটোটাইপ)','OTP sent to +91 90000 •••45 (prototype)'],
  emT:['ইমেল বদলান','Change email'], emIntro:['নতুন ইমেলে একটি নিশ্চিতকরণ লিংক যাবে — লিংকে চাপ দিলে তবেই বদল কার্যকর হবে।','A confirmation link is sent to the new email — the change only takes effect once you click it.'],
  emCurrent:['বর্তমান ইমেল','Current email'], emNew:['নতুন ইমেল','New email'], emBtn:['নিশ্চিতকরণ লিংক পাঠান','Send confirmation link'],
  emErr:['সঠিক ইমেল লিখুন','Enter a valid email'], emSameErr:['এটাই আপনার বর্তমান ইমেল','That is already your email'], emSent:['{e}-তে লিংক পাঠানো হয়েছে। ইনবক্স দেখুন (স্প্যামেও)।','Link sent to {e}. Check your inbox (and spam).'], emPending:['অপেক্ষায়: {e}','Pending: {e}'],
  dzT:['বিপজ্জনক অংশ','Danger zone'], dzText:['এই নার্সিং হোম আর তার ভেতরের সবকিছু — রোগী, ভর্তি, ডকুমেন্ট, স্টাফ অ্যাকাউন্ট, আমন্ত্রণ, বিলের ইতিহাস — চিরতরে মুছে যাবে। এটা আর ফেরানো যায় না।','Permanently deletes this facility and everything in it — patients, admissions, documents, staff accounts, invites, billing history. This cannot be undone.'],
  dzBtn:['এই নার্সিং হোম মুছে ফেলুন','Delete this nursing home'], dzMT:['সত্যিই মুছবেন?','Delete for good?'], dzMS:['এটা আর ফেরানো যাবে না','This cannot be undone'],
  dzType:['নিশ্চিত করতে নার্সিং হোমের নাম হুবহু লিখুন:','To confirm, type the nursing home name exactly:'], dzPw:['আপনার পাসওয়ার্ড','Your password'], dzGo:['চিরতরে মুছে ফেলুন','Delete permanently'],
  dzList:['যা মুছে যাবে','What will be deleted'], dzL1:['{n} জন রোগী ও তাদের সব রেকর্ড','{n} patients and all their records'], dzL2:['{n}টি বেড ও ওয়ার্ডের সাজানো','{n} beds and ward setup'], dzL3:['সব বিল, রসিদ ও অডিট লগ','All bills, receipts and the audit log'], dzL4:['স্টাফ অ্যাকাউন্ট ও স্টক','Staff accounts and stock'],
  dzDemo:['প্রোটোটাইপ: কিছু মোছা হয়নি। আসল সংস্করণে মোছার আগে ৩০ দিনের ব্যাকআপ রাখা হবে।','Prototype: nothing was deleted. The real version keeps a 30-day backup before deleting.'],
  dzErrName:['নাম মেলেনি','Name doesn’t match'],
  aSet:['সেটিংস বদল','Settings changed'], fSection:['অংশ','Section'], fChanged:['যা বদলেছে','Changed']
});
Object.assign(IC, {gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  sign:'<path d="M3 17c3-4 5-9 7-9s-1 9 2 9 3-5 5-5 1 4 4 4"/><path d="M3 21h18"/>', key:'<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.8-9.8M17 6l3 3M14 9l2 2"/>', mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>', eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', percent:'<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>'});
NAVI.settings = ['gear', 'navSettings']; VIEWS.settings = vSettings; ATITLE.set = 'aSet'; ACAT.set = 'sys'; aTone.set = 'grey'; aIcon.set = 'gear';
ROLES.owner.nav.push('settings');

/* GST state codes (first two digits of a GSTIN) */
const GST_STATES = [['01','Jammu & Kashmir','জম্মু ও কাশ্মীর'],['02','Himachal Pradesh','হিমাচল প্রদেশ'],['03','Punjab','পাঞ্জাব'],['04','Chandigarh','চণ্ডীগড়'],['05','Uttarakhand','উত্তরাখণ্ড'],['06','Haryana','হরিয়ানা'],['07','Delhi','দিল্লি'],['08','Rajasthan','রাজস্থান'],['09','Uttar Pradesh','উত্তরপ্রদেশ'],['10','Bihar','বিহার'],['11','Sikkim','সিকিম'],['12','Arunachal Pradesh','অরুণাচল প্রদেশ'],['13','Nagaland','নাগাল্যান্ড'],['14','Manipur','মণিপুর'],['15','Mizoram','মিজোরাম'],['16','Tripura','ত্রিপুরা'],['17','Meghalaya','মেঘালয়'],['18','Assam','অসম'],['19','West Bengal','পশ্চিমবঙ্গ'],['20','Jharkhand','ঝাড়খণ্ড'],['21','Odisha','ওড়িশা'],['22','Chhattisgarh','ছত্তিসগড়'],['23','Madhya Pradesh','মধ্যপ্রদেশ'],['24','Gujarat','গুজরাট'],['26','Dadra & Nagar Haveli and Daman & Diu','দাদরা ও নগর হাভেলি এবং দমন ও দিউ'],['27','Maharashtra','মহারাষ্ট্র'],['29','Karnataka','কর্ণাটক'],['30','Goa','গোয়া'],['31','Lakshadweep','লাক্ষাদ্বীপ'],['32','Kerala','কেরালা'],['33','Tamil Nadu','তামিলনাড়ু'],['34','Puducherry','পুদুচেরি'],['35','Andaman & Nicobar Islands','আন্দামান ও নিকোবর'],['36','Telangana','তেলেঙ্গানা'],['37','Andhra Pradesh','অন্ধ্রপ্রদেশ'],['38','Ladakh','লাদাখ']];
const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
function gstinValid(g){
  if (!GSTIN_RE.test(g) || !GST_STATES.some(s => s[0] === g.slice(0, 2))) return false;
  const cs = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; let sum = 0;
  for (let i = 0; i < 14; i++) { const v = cs.indexOf(g[i]) * (i % 2 ? 2 : 1); sum += Math.floor(v / 36) + v % 36; }
  return cs[(36 - sum % 36) % 36] === g[14];
}
const stateName = c => { const s = GST_STATES.find(x => x[0] === c); return s ? (S.lang === 'bn' ? s[2] : s[1]) : ''; };

/* settings state (fictional sample values) */
const FAC = {addr:'১২, স্টেশন রোড, বিষ্ণুপুর, বাঁকুড়া, পশ্চিমবঙ্গ – ৭২২১২২ (নমুনা)', phone:'9000012345', wa:'', gstin:'', state:'19', email:'owner@shantiseva.example', emailPending:''};
const TAXR = {r1:{on:true, rate:0, lock:true}, r2:{on:true, rate:0, lock:true}, r3:{on:true, rate:5, lim:5000, lock:true}, r4:{on:true, rate:0, lock:true}, r5:{on:true, rate:5, lock:true}, r6:{on:true, rate:0, lock:true}, r7:{on:true, rate:18, lock:true}};
const SIGN = {name:'', img:'', draft:'', draftName:null};
const PW = {cur:'aura123'};
S.setF = null; S.tmCalc = {ward:'G', rate:'6000', days:'3'};
function setForm(){ if (!S.setF) S.setF = {fd:{addr:FAC.addr, phone:FAC.phone, wa:FAC.wa, gstin:FAC.gstin, state:FAC.state}, fdMsg:null, pw:{cur:'', n1:'', n2:'', show:false}, pwMsg:null, em:{pw:'', e:''}, emMsg:null, sgMsg:null, tm:JSON.parse(JSON.stringify(TAXR)), tmMsg:null}; return S.setF; }
const gstOf = f => (f.gstin || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
function billTitleTxt(){ return FAC.gstin && gstinValid(FAC.gstin) ? 'BILL OF SUPPLY' : t('billTitle'); }
function billTopLine(){ const l = []; l.push(esc(FAC.addr || t('homeTown'))); const l2 = []; if (FAC.phone) l2.push(`${t('fdPhone')}: ${esc(FAC.phone)}`); if (FAC.gstin) l2.push('GSTIN: ' + esc(FAC.gstin)); return `<div class="mut">${l[0]}</div>${l2.length ? `<div class="mut">${l2.join(' · ')}</div>` : ''}`; }
function billSigHtml(){ return `<div class="sig" style="border-top:0;width:230px">${SIGN.img ? `<div style="font-size:11px">${t('sgFor', {n:t('homeName')})}</div><img src="${SIGN.img}" alt="" style="max-width:200px;max-height:70px;display:block;margin:4px auto 2px">` : ''}<div style="border-top:1px solid #999;padding-top:6px">Authorised Signatory${SIGN.name ? `<br>${esc(SIGN.name)}` : ''}</div></div>`; }

/* ---------- view ---------- */
function vSettings(){
  const F = setForm();
  const secs = [['set-fd', 'building', 'fdT'], ['set-tm', 'percent', 'tmT'], ['set-sg', 'sign', 'sgT'], ['set-pw', 'key', 'pwT'], ['set-em', 'mail', 'emT'], ['set-dz', 'trash', 'dzT']];
  return `<div class="ph"><div><h1>${t('stT')}</h1><p class="sub">${t('stSub')}</p></div></div>
  <div class="setw">
    <nav class="setnav" aria-label="${t('stJump')}"><p class="eyebrow">${t('stJump')}</p>${secs.map(([id, i, k]) => `<a href="#${id}" data-act="setJump" data-v="${id}" class="${id === 'set-dz' ? 'dz-l' : ''}">${ic(i === 'building' ? 'home' : i, 17)}<span>${t(k)}</span></a>`).join('')}</nav>
    <div class="setcol">${setFacility(F)}${setTax(F)}${setSign(F)}${setPw(F)}${setEmail(F)}${setDanger()}</div>
  </div>`;
}
const msgBox = m => m ? `<p class="setmsg ${m[1] ? 'ok' : 'bad'}" role="${m[1] ? 'status' : 'alert'}">${ic(m[1] ? 'check' : 'alert', 15)}${m[0]}</p>` : '';
function setFacility(F){
  const f = F.fd, g = gstOf(f), gOk = !!g && gstinValid(g);
  return `<section class="card setc" id="set-fd">
    <div class="setc-h"><span class="setc-ic">${ic('home', 20)}</span><div><h2>${t('fdT')}</h2><p>${t('fdIntro')}</p></div></div>
    <div class="field"><span class="lab">${t('fdName')}</span><div class="input ro">${esc(t('homeName'))}<span class="lockt">${ic('lock', 14)}</span></div><p class="hint">${t('fdNameNote')}</p></div>
    <div class="field"><label for="fd-addr">${t('fdAddr')}</label><textarea id="fd-addr" class="input ta" rows="3" maxlength="300" data-set="fd.addr" placeholder="${t('fdAddrPh')}">${esc(f.addr)}</textarea><p class="hint r latin">${num(f.addr.length)} / ৩০০</p></div>
    <div class="row2">
      <div class="field"><label for="fd-phone">${t('fdPhone')}</label><input id="fd-phone" class="input latin" type="tel" inputmode="tel" maxlength="20" data-set="fd.phone" value="${esc(f.phone)}" placeholder="${t('fdPhonePh')}"></div>
      <div class="field"><label for="fd-wa">${t('fdWa')}</label><input id="fd-wa" class="input latin" type="tel" inputmode="tel" maxlength="20" data-set="fd.wa" value="${esc(f.wa)}" placeholder="${t('fdPhonePh')}"></div>
    </div>
    <p class="hint" style="margin-top:-6px">${ic('info', 14)} ${t('fdWaHelp')}</p>
    <div class="field"><label for="fd-gst">${t('fdGst')}</label><input id="fd-gst" class="input latin up" maxlength="15" autocomplete="off" data-set="fd.gstin" value="${esc(g)}" placeholder="${t('fdGstPh')}">
      <div class="gsth"><p class="hint">${t('fdGstHelp')}</p><span id="gstState" class="gsts ${!g ? '' : gOk ? 'ok' : 'bad'}">${gstStateTxt(g)}</span></div>
      <p class="setnote">${t('fdGstBill')}</p></div>
    <div class="field"><label for="fd-state">${t('fdState')}</label><select id="fd-state" class="input" data-set="fd.state" ${gOk ? 'disabled' : ''}>${GST_STATES.map(s => `<option value="${s[0]}" ${(gOk ? g.slice(0, 2) : f.state) === s[0] ? 'selected' : ''}>${s[0]} · ${S.lang === 'bn' ? s[2] : s[1]}</option>`).join('')}</select><p class="hint">${t('fdStateHelp')}</p></div>
    <div class="field"><span class="lab eyebrow">${t('fdPrev')}</span><div class="billprev" id="fdPrev">${fdPreview(F)}</div></div>
    <div id="fdMsg">${msgBox(F.fdMsg)}</div>
    <button class="btn btn-primary btn-lg btn-block" data-act="fdSave">${ic('check')}${t('fdSave')}</button>
  </section>`;
}
function gstStateTxt(g){ if (!g) return ''; if (gstinValid(g)) return t('fdGstOk') + ' · ' + t('fdGstStateN', {s:stateName(g.slice(0, 2))}); return g.length < 15 ? `${num(g.length)} / ১৫` : t('fdGstBad'); }
function fdPreview(F){
  const f = F.fd, g = gstOf(f), gOk = !!g && gstinValid(g), l2 = [];
  if (f.phone.trim()) l2.push(`${t('fdPhone')}: ${esc(f.phone.trim())}`); if (g) l2.push('GSTIN: ' + esc(g));
  return `<div class="bp-l"><span class="bp-sq" aria-hidden="true"><i></i></span><div><b>${t('homeName')}</b><span class="${f.addr.trim() ? '' : 'mut'}">${f.addr.trim() ? esc(f.addr.trim()).replace(/\n/g, '<br>') : t('fdPrevNoAddr')}</span>${l2.length ? `<span>${l2.join(' &nbsp;·&nbsp; ')}</span>` : ''}</div></div>
    <div class="bp-r"><b>${gOk ? 'BILL OF SUPPLY' : 'FINAL BILL'}</b><small>${gOk ? 'SAC 9993 · ' + t('bsExempt') : t('bsNoGst')}</small></div>`;
}
function setTax(F){
  const R = F.tm, rows = [['r1', '9993', 'tmR1', 'tmR1n'], ['r2', '9993', 'tmR2', 'tmR2n'], ['r3', '9963', 'tmR3', 'tmR3n'], ['r4', '9993', 'tmR4', 'tmR4n'], ['r5', '3004', 'tmR5', 'tmR5n'], ['r6', '9993', 'tmR6', 'tmR6n'], ['r7', '9993', 'tmR7', 'tmR7n']];
  const c = S.tmCalc, res = tmCalc(R, c);
  return `<section class="card setc" id="set-tm">
    <div class="setc-h"><span class="setc-ic">${ic('percent', 20)}</span><div><h2>${t('tmT')}</h2><p>${t('tmSub')}</p></div></div>
    <p class="setnote">${t('tmIntro')}</p>
    <div class="tmt">
      <div class="tmr tmh" aria-hidden="true"><span>${t('tmColSvc')}</span><span>${t('tmColCode')}</span><span class="r">${t('tmColRate')}</span><span>${t('tmColOn')}</span></div>
      ${rows.map(([k, code, a, b]) => { const r = R[k];
        return `<div class="tmr ${r.on ? '' : 'off'}"><span class="tm-s"><b>${t(a, {amt:money(R.r3.lim)})}</b><small>${t(b)}</small>${k === 'r3' ? `<label class="tmlim">${t('tmThreshold')} <span class="pre rs"><span>₹</span><input class="input" inputmode="numeric" maxlength="6" value="${r.lim}" readonly aria-readonly="true"></span></label>` : ''}</span>
          <span class="latin tm-c">${code}</span>
          <span class="r tm-r">${r.rate ? `<b class="rate">${num(r.rate)}%</b>` : `<span class="st st-paid">${t('tmExempt')}</span>`}</span>
          <span class="tm-on">${ic('check', 14)}${t('gsOnBill')}</span></div>`; }).join('')}
    </div>
    <div class="tmcalc">
      <h3>${ic('rupee', 16)} ${t('tmCalcT')}</h3>
      <div class="tmcg">
        <label class="au-sel"><span>${t('tmCalcWard')}</span><select class="input" data-set="calc.ward">${WARDS.map(w => `<option value="${w.id}" ${c.ward === w.id ? 'selected' : ''}>${t(w.key)}</option>`).join('')}</select></label>
        <label class="au-sel"><span>${t('tmCalcRate')}</span><input class="input latin" inputmode="numeric" maxlength="6" data-set="calc.rate" value="${esc(c.rate)}"></label>
        <label class="au-sel"><span>${t('tmCalcDays')}</span><input class="input latin" inputmode="numeric" maxlength="3" data-set="calc.days" value="${esc(c.days)}"></label>
      </div>
      <div class="tmres ${res.gst ? 'tax' : ''}" id="tmRes">${tmResHtml(res)}</div>
    </div>
    <div class="tmw"><span class="eyebrow">${t('tmWards')}</span><div>${WARDS.map(w => { const x = tmCalc(R, {ward:w.id, rate:String(w.rate), days:'1'}); return `<span class="tmwc ${x.gst ? 'tax' : ''}"><b>${t(w.key)}</b> ${money(w.rate)}/${S.lang === 'bn' ? 'দিন' : 'day'} · ${x.gst ? t('tmWardTax') : t('tmWardOk')}</span>`; }).join('')}</div></div>
    <div id="tmMsg">${msgBox(F.tmMsg)}</div>
    <div class="setfoot"><small>${ic('info', 13)} ${t('tmLive')}</small></div>
  </section>`;
}
function tmCalc(R, c){
  const rate = parseInt(c.rate, 10) || 0, days = Math.max(1, parseInt(c.days, 10) || 1), rent = rate * days;
  let gst = 0, why = '';
  if (/icu|ccu|nicu|hdu|আইসিইউ/i.test(c.ward + ' ' + t((WARD[c.ward] || {}).key || ''))) why = t('tmWhyIcu'); else if (!R.r3.on) why = t('tmWhyOff'); else if (rate <= R.r3.lim) why = t('tmWhyLow', {amt:money(R.r3.lim)}); else gst = Math.round(rent * R.r3.rate / 100);
  return {rent, gst, why, lim:R.r3.lim};
}
const tmResHtml = r => `<b>${t('tmCalcRes', {rent:money(r.rent), gst:money(r.gst)})}</b><span>${r.gst ? t('tmCalcWhy1', {amt:money(r.lim)}) : t('tmCalcWhy0', {why:r.why})}</span>`;
function setSign(F){
  const src = SIGN.draft || SIGN.img, nmv = SIGN.draftName != null ? SIGN.draftName : SIGN.name;
  return `<section class="card setc" id="set-sg">
    <div class="setc-h"><span class="setc-ic">${ic('sign', 20)}</span><div><h2>${t('sgT')}</h2><p>${t('sgIntro')}</p></div></div>
    <div class="field"><label for="sg-name">${t('sgName')}</label><input id="sg-name" class="input" maxlength="80" data-set="sg.name" value="${esc(nmv)}" placeholder="${t('sgNamePh')}"></div>
    <div class="field"><span class="lab">${t('sgFile')}</span>
      <label class="dz sgdz" data-drop="sign" tabindex="0"><input type="file" accept="image/png,image/jpeg" data-file="sign" class="fin" tabindex="-1"><span class="dz-ic">${ic('upload', 24)}</span><b>${t('sgDrop')}</b><small>JPG · PNG · ≤ 8 MB</small></label>
      <p class="hint">${ic('info', 14)} ${t('sgHow')}</p></div>
    <div class="field"><span class="lab eyebrow">${t('sgPrev')}</span><div class="sgprev" id="sgPrev">${sgPreview(src, nmv)}</div></div>
    <div id="sgMsg">${msgBox(F.sgMsg)}</div>
    <div class="setbtns"><button class="btn btn-primary btn-lg grow" data-act="sgSave">${ic('check')}${t('sgSave')}</button><button class="btn btn-secondary btn-lg" data-act="sgRemove" ${SIGN.img || SIGN.draft ? '' : 'disabled'}>${ic('trash')}${t('sgRemove')}</button></div>
  </section>`;
}
const sgPreview = (src, nmv) => `<div class="sgbox"><div>${t('sgFor', {n:t('homeName')})}</div>${src ? `<img src="${src}" alt="">` : `<div class="sgnone">${t('sgNone')}</div>`}<div class="sgline">Authorised Signatory</div>${nmv ? `<div>${esc(nmv)}</div>` : ''}</div>`;
function setPw(F){
  const p = F.pw, s = pwStrength(p.n1), ty = p.show ? 'text' : 'password';
  return `<section class="card setc" id="set-pw">
    <div class="setc-h"><span class="setc-ic">${ic('key', 20)}</span><div><h2>${t('pwT')}</h2><p class="latin">${esc(FAC.email)}</p></div></div>
    <div class="field"><label for="pw-cur">${t('pwCur')}</label><div class="pwin"><input id="pw-cur" class="input" type="${ty}" autocomplete="current-password" data-set="pw.cur" value="${esc(p.cur)}" placeholder="${t('pwCurPh')}"><button type="button" class="pweye" data-act="pwShow" aria-label="${t(p.show ? 'pwHide' : 'pwShow')}">${ic('eye', 18)}</button></div>
      <p class="hint"><button class="link" data-act="pwForgot">${t('pwForgot')}</button></p></div>
    <div class="row2">
      <div class="field"><label for="pw-n1">${t('pwNew')}</label><input id="pw-n1" class="input" type="${ty}" autocomplete="new-password" data-set="pw.n1" value="${esc(p.n1)}" placeholder="${t('pwNewPh')}"><div class="pwbar s${s}" id="pwBar" aria-hidden="true"><i></i><i></i><i></i><i></i></div><p class="hint" id="pwStr">${p.n1 ? t('pwS' + Math.min(3, s)) : ''}</p></div>
      <div class="field"><label for="pw-n2">${t('pwConf')}</label><input id="pw-n2" class="input" type="${ty}" autocomplete="new-password" data-set="pw.n2" value="${esc(p.n2)}"></div>
    </div>
    <div id="pwMsg">${msgBox(F.pwMsg)}</div>
    <button class="btn btn-primary btn-lg btn-block" data-act="pwSave">${ic('key')}${t('pwBtn')}</button>
  </section>`;
}
function pwStrength(p){ if (!p) return 0; let s = 0; if (p.length >= 6) s++; if (p.length >= 10) s++; if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++; if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) s++; return Math.min(3, s); }
function setEmail(F){
  const e = F.em;
  return `<section class="card setc" id="set-em">
    <div class="setc-h"><span class="setc-ic">${ic('mail', 20)}</span><div><h2>${t('emT')}</h2><p>${t('emIntro')}</p></div></div>
    <div class="field"><span class="lab">${t('emCurrent')}</span><div class="input ro latin">${esc(FAC.email)}${FAC.emailPending ? `<span class="st st-pending" style="margin-left:auto">${t('emPending', {e:esc(FAC.emailPending)})}</span>` : ''}</div></div>
    <div class="row2">
      <div class="field"><label for="em-pw">${t('pwCur')}</label><input id="em-pw" class="input" type="password" autocomplete="current-password" data-set="em.pw" value="${esc(e.pw)}" placeholder="${t('pwCurPh')}"><p class="hint"><button class="link" data-act="pwForgot">${t('pwForgot')}</button></p></div>
      <div class="field"><label for="em-new">${t('emNew')}</label><input id="em-new" class="input latin" type="email" autocomplete="email" data-set="em.e" value="${esc(e.e)}" placeholder="name@example.com"></div>
    </div>
    <div id="emMsg">${msgBox(F.emMsg)}</div>
    <button class="btn btn-primary btn-lg btn-block" data-act="emSave">${ic('send')}${t('emBtn')}</button>
  </section>`;
}
function setDanger(){
  return `<section class="card setc dzc" id="set-dz">
    <div class="setc-h"><span class="setc-ic">${ic('alert', 20)}</span><div><h2>${t('dzT')}</h2></div></div>
    <p class="dzp">${t('dzText')}</p>
    <button class="btn btn-danger btn-lg btn-block" data-act="dzOpen">${ic('trash')}${t('dzBtn')}</button>
  </section>`;
}
function mDelete(m){
  const ok = m.name.trim() === t('homeName') && m.pw;
  return {title:t('dzMT'), sub:t('dzMS'),
    body:`<div class="dzbox"><b>${t('dzList')}</b><ul><li>${t('dzL1', {n:num(P.length)})}</li><li>${t('dzL2', {n:num(Object.keys(beds).length)})}</li><li>${t('dzL3')}</li><li>${t('dzL4')}</li></ul></div>
      <div class="field"><label for="dz-name">${t('dzType')} <b class="dzname">${t('homeName')}</b></label><input id="dz-name" class="input${m.err ? ' bad' : ''}" data-bind="name" data-k="dzn" value="${esc(m.name)}" autocomplete="off">${m.err ? `<p class="err">${ic('alert', 15)}${t(m.err)}</p>` : ''}</div>
      <div class="field"><label for="dz-pw">${t('dzPw')}</label><input id="dz-pw" class="input" type="password" data-bind="pw" data-k="dzp" value="${esc(m.pw)}"></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-danger btn-lg grow" data-act="dzGo" ${ok ? '' : ''}>${ic('trash')}${t('dzGo')}</button>`};
}
function mForgot(m){
  return {title:t('fgT'), sub:t('fgS'), body:m.sent ? `<p class="setmsg ok">${ic('check', 15)}${t('fgSent')}</p>` : `<div class="input ro latin">+91 90000 •••45</div>`,
    foot:m.sent ? `<button class="btn btn-primary btn-lg grow" data-act="closeModal">${t('close')}</button>` : `<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="fgSend">${ic('send')}${t('fgSend')}</button>`};
}

/* signature: remove white paper, crop (same approach as the reference) */
function sgFile(file){
  const F = setForm(); F.sgMsg = null;
  if (!file || !/^image\/(png|jpe?g)$/i.test(file.type)) { F.sgMsg = [t('sgBad'), 0]; renderSetPart('sgMsg', msgBox(F.sgMsg)); return; }
  if (file.size > 8 * 1024 * 1024) { F.sgMsg = [t('sgBig'), 0]; renderSetPart('sgMsg', msgBox(F.sgMsg)); return; }
  const url = URL.createObjectURL(file), img = new Image();
  img.onload = () => {
    const max = 900, sc = Math.min(1, max / Math.max(img.width, img.height)), w = Math.max(1, Math.round(img.width * sc)), h = Math.max(1, Math.round(img.height * sc));
    const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.drawImage(img, 0, 0, w, h);
    const d = x.getImageData(0, 0, w, h), p = d.data; let minX = w, minY = h, maxX = -1, maxY = -1;
    for (let i = 0; i < p.length; i += 4) {
      const lum = 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2];
      if (lum > 185) p[i + 3] = 0; else if (lum > 150) p[i + 3] = Math.round(p[i + 3] * (185 - lum) / 35);
      if (p[i + 3] > 40) { const k = i / 4, px2 = k % w, py = (k - px2) / w; if (px2 < minX) minX = px2; if (px2 > maxX) maxX = px2; if (py < minY) minY = py; if (py > maxY) maxY = py; }
    }
    x.putImageData(d, 0, 0); URL.revokeObjectURL(url);
    if (maxX < 0) { F.sgMsg = [t('sgBad'), 0]; renderSetPart('sgMsg', msgBox(F.sgMsg)); return; }
    const pad = 6; minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad); maxX = Math.min(w - 1, maxX + pad); maxY = Math.min(h - 1, maxY + pad);
    const cw = maxX - minX + 1, ch = maxY - minY + 1, o = document.createElement('canvas'); o.width = cw; o.height = ch; o.getContext('2d').drawImage(c, minX, minY, cw, ch, 0, 0, cw, ch);
    SIGN.draft = o.toDataURL('image/png'); F.sgMsg = [t('sgCleaned'), 1];
    if (S.view === 'settings') { const sec = $('set-sg'); if (sec) sec.outerHTML = setSign(F); }
  };
  img.onerror = () => { F.sgMsg = [t('sgBad'), 0]; renderSetPart('sgMsg', msgBox(F.sgMsg)); };
  img.src = url;
}
function renderSetPart(id, html){ const el = $(id); if (el) el.innerHTML = html; }
function rerenderSec(id, fn){ const F = setForm(), sec = $(id); if (!sec) return; const a = ROOT.activeElement, k = a && a.dataset ? a.dataset.set : null; sec.outerHTML = fn(F); if (k) { const el = ROOT.querySelector(`#${id} [data-set="${k}"]`); el && el.focus({preventScroll:true}); } }

function extraHandlers7(){
  Object.assign(H, {
    setJump: (el, e) => { const s = $(el.dataset.v); if (s) { s.scrollIntoView({behavior:'smooth', block:'start'}); const h = s.querySelector('h2'); if (h) { h.tabIndex = -1; setTimeout(() => h.focus({preventScroll:true}), 400); } } },
    fdSave: () => {
      const F = setForm(), f = F.fd, g = gstOf(f), wa = f.wa.trim(), ph = f.phone.trim(), digits2 = s => s.replace(/\D/g, '').length;
      let err = '';
      if (f.addr.length > 300) err = 'fdErrAddr'; else if (ph && (digits2(ph) < 8 || digits2(ph) > 15)) err = 'fdErrPhone'; else if (g && !gstinValid(g)) err = 'fdGstBad'; else if (wa && (digits2(wa) < 10 || digits2(wa) > 15)) err = 'fdErrWa';
      if (err) { F.fdMsg = [t(err), 0]; renderSetPart('fdMsg', msgBox(F.fdMsg)); return; }
      const ch = []; const lbl = {addr:'fdAddr', phone:'fdPhone', wa:'fdWa', gstin:'fdGst', state:'fdState'};
      const nv = {addr:f.addr.trim(), phone:ph, wa, gstin:g, state:g && gstinValid(g) ? g.slice(0, 2) : f.state};
      for (const k in nv) if (String(FAC[k]) !== String(nv[k])) ch.push([lbl[k], FAC[k], nv[k]]);
      if (!ch.length) { F.fdMsg = [t('fdNoChange'), 1]; renderSetPart('fdMsg', msgBox(F.fdMsg)); return; }
      Object.assign(FAC, nv); F.fdMsg = [t('fdSaved'), 1];
      audit({act:'set', d:{sec:'fdT', ch:ch.map(([k, a, b]) => [k, k === 'state' ? stateName(a) : a, k === 'state' ? stateName(b) : b])}});
      rerenderSec('set-fd', setFacility); toast(t('fdT') + ' ✓');
    },
    tmTgl: el => { const F = setForm(), r = F.tm[el.dataset.v]; if (r.lock) return; r.on = !r.on; F.tmMsg = null; rerenderSec('set-tm', setTax); },
    tmSave: () => { const F = setForm(), ch = []; for (const k in F.tm) { const a = TAXR[k], b = F.tm[k]; if (a.on !== b.on) ch.push([t('tm' + k.toUpperCase(), {amt:money(b.lim || F.tm.r3.lim)}), a.on ? '✓' : '✗', b.on ? '✓' : '✗']); if (k === 'r3' && a.lim !== b.lim) ch.push([t('tmThreshold'), money(a.lim), money(b.lim)]); }
      if (!ch.length) { F.tmMsg = [t('fdNoChange'), 1]; rerenderSec('set-tm', setTax); return; }
      for (const k in F.tm) Object.assign(TAXR[k], F.tm[k]); F.tmMsg = [t('tmSaved'), 1];
      audit({act:'set', d:{sec:'tmT', chRaw:ch}}); rerenderSec('set-tm', setTax); toast(t('tmSaved')); },
    sgSave: () => { const F = setForm(), nmv = SIGN.draftName != null ? SIGN.draftName : SIGN.name;
      if (!SIGN.draft && !SIGN.img) { F.sgMsg = [t('sgNothing'), 0]; renderSetPart('sgMsg', msgBox(F.sgMsg)); return; }
      const changedImg = !!SIGN.draft; if (SIGN.draft) SIGN.img = SIGN.draft; SIGN.draft = ''; const before = SIGN.name; SIGN.name = nmv.trim(); SIGN.draftName = null;
      F.sgMsg = [t('sgSaved'), 1]; audit({act:'set', d:{sec:'sgT', chRaw:[].concat(changedImg ? [[t('sgFile'), '—', '✓']] : [], before !== SIGN.name ? [[t('sgName'), before || '—', SIGN.name || '—']] : [])}});
      rerenderSec('set-sg', setSign); toast(t('sgSaved')); },
    sgRemove: () => { const F = setForm(), had = !!SIGN.img; SIGN.img = ''; SIGN.draft = ''; F.sgMsg = [t('sgRemoved'), 1]; if (had) audit({act:'set', d:{sec:'sgT', chRaw:[[t('sgFile'), '✓', '—']]}}); rerenderSec('set-sg', setSign); },
    pwShow: () => { const F = setForm(); F.pw.show = !F.pw.show; rerenderSec('set-pw', setPw); },
    pwSave: () => { const F = setForm(), p = F.pw; let e = '';
      if (p.cur !== PW.cur) e = 'pwErrCur'; else if (p.n1.length < 6) e = 'pwErrShort'; else if (p.n1 !== p.n2) e = 'pwErrMatch'; else if (p.n1 === p.cur) e = 'pwErrSame';
      if (e) { F.pwMsg = [t(e), 0]; renderSetPart('pwMsg', msgBox(F.pwMsg)); return; }
      PW.cur = p.n1; F.pw = {cur:'', n1:'', n2:'', show:false}; F.pwMsg = [t('pwDone'), 1]; audit({act:'set', d:{sec:'pwT', chRaw:[[t('pwNew'), '••••••', '••••••']]}}); rerenderSec('set-pw', setPw); toast(t('pwDone')); },
    pwForgot: () => openModal({type:'forgot', sent:false}),
    fgSend: () => { S.modal.sent = true; renderModal(); },
    emSave: () => { const F = setForm(), e = F.em, v = e.e.trim().toLowerCase(); let er = '';
      if (e.pw !== PW.cur) er = 'pwErrCur'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) er = 'emErr'; else if (v === FAC.email) er = 'emSameErr';
      if (er) { F.emMsg = [t(er), 0]; renderSetPart('emMsg', msgBox(F.emMsg)); return; }
      FAC.emailPending = v; F.em = {pw:'', e:''}; F.emMsg = [t('emSent', {e:esc(v)}), 1]; audit({act:'set', d:{sec:'emT', chRaw:[[t('emNew'), FAC.email, v + ' (' + (S.lang === 'bn' ? 'নিশ্চিতকরণের অপেক্ষায়' : 'awaiting confirmation') + ')']]}}); rerenderSec('set-em', setEmail); },
    dzOpen: () => openModal({type:'del', name:'', pw:'', err:''}),
    dzGo: () => { const m = S.modal; if (m.name.trim() !== t('homeName')) { m.err = 'dzErrName'; rerenderModal(); return; } if (m.pw !== PW.cur) { m.err = 'pwErrCur'; rerenderModal(); return; } closeModal(); toast(t('dzDemo'), 'info'); }
  });
  ROOT.addEventListener('input', e => {
    const el = e.target, k = el.dataset && el.dataset.set; if (!k || S.view !== 'settings') return;
    const F = setForm(), [a, b, c] = k.split('.');
    if (a === 'fd') { let v = el.value; if (b === 'gstin') { v = v.toUpperCase().replace(/[^0-9A-Z]/g, ''); if (v !== el.value) el.value = v; } F.fd[b] = v; F.fdMsg = null; renderSetPart('fdMsg', ''); const pv = $('fdPrev'); if (pv) pv.innerHTML = fdPreview(F);
      if (b === 'gstin') { const s = $('gstState'), ok = v && gstinValid(v); s.textContent = gstStateTxt(v); s.className = 'gsts ' + (!v ? '' : ok ? 'ok' : 'bad'); const sel = $('fd-state'); if (sel) { sel.disabled = !!ok; if (ok) sel.value = v.slice(0, 2); } }
      if (b === 'addr') { const h = el.parentElement.querySelector('.hint.r'); if (h) h.textContent = num(v.length) + ' / ৩০০'; } }
    if (a === 'tm') { const v = parseInt(el.value.replace(/\D/g, ''), 10) || 0; if (String(v) !== el.value && el.value !== '') el.value = el.value.replace(/\D/g, ''); F.tm.r3.lim = v; const r = $('tmRes'), res = tmCalc(F.tm, S.tmCalc); if (r) { r.innerHTML = tmResHtml(res); r.className = 'tmres ' + (res.gst ? 'tax' : ''); } }
    if (a === 'calc') { el.value = el.value.replace(/\D/g, ''); S.tmCalc[b] = el.value; const r = $('tmRes'), res = tmCalc(F.tm, S.tmCalc); if (r) { r.innerHTML = tmResHtml(res); r.className = 'tmres ' + (res.gst ? 'tax' : ''); } }
    if (a === 'sg') { SIGN.draftName = el.value; const pv = $('sgPrev'); if (pv) pv.innerHTML = sgPreview(SIGN.draft || SIGN.img, el.value); }
    if (a === 'pw') { F.pw[b] = el.value; F.pwMsg = null; renderSetPart('pwMsg', ''); if (b === 'n1') { const s = pwStrength(el.value), bar = $('pwBar'); if (bar) bar.className = 'pwbar s' + s; renderSetPart('pwStr', el.value ? t('pwS' + s) : ''); } }
    if (a === 'em') { F.em[b] = el.value; F.emMsg = null; renderSetPart('emMsg', ''); }
  });
  ROOT.addEventListener('change', e => { const el = e.target, k = el.dataset && el.dataset.set; if (!k || S.view !== 'settings') return; const F = setForm(), [a, b] = k.split('.'); if (a === 'fd' && b === 'state') F.fd.state = el.value; if (a === 'calc') { S.tmCalc[b] = el.value; const r = $('tmRes'), res = tmCalc(F.tm, S.tmCalc); if (r) { r.innerHTML = tmResHtml(res); r.className = 'tmres ' + (res.gst ? 'tax' : ''); } } });
  const _of7 = onFile; onFile = function(kind, file){ if (kind === 'sign') return sgFile(file); return _of7(kind, file); };
  /* audit details for settings */
  const _ad = aDetails; aDetails = function(e){ if (e.act !== 'set') return _ad(e); const d = e.d, rows = [[t('fSection'), t(d.sec)]];
    (d.ch || []).forEach(([k, a, b]) => rows.push([t(k), `<span class="mut">${esc(a || '—')}</span> → <b>${esc(b || '—')}</b>`]));
    (d.chRaw || []).forEach(([k, a, b]) => rows.push([esc(k), `<span class="mut">${esc(a || '—')}</span> → <b>${esc(b || '—')}</b>`])); return rows; };
}

/* =================== v9: BILLS PAGE + MOBILE "MORE" MENU =================== */
Object.assign(T, {
  navBills:['চূড়ান্ত বিল','Final bills'], navMore:['আরও','More'],
  bpT:['চূড়ান্ত বিল','Final bills'], bpSub:['ছুটির সময় তৈরি হওয়া সব চূড়ান্ত বিল — নতুনটা আগে। PDF খুলতে “ডাউনলোড” চাপুন।','Every final bill made at discharge — newest first. Tap Download to open the PDF.'],
  bpSearch:['রোগীর নাম, ফোন বা বিল নং লিখে খুঁজুন…','Search by patient name, phone or bill no…'],
  bpAll:['সব','All'], bpDue:['বকেয়া আছে','Has dues'], bpClear:['পুরো জমা','Paid in full'],
  bpWhen:['সময়','Period'], bpW7:['গত ৭ দিন','Last 7 days'], bpW30:['গত ৩০ দিন','Last 30 days'], bpWall:['সব সময়','All time'],
  bpN:['মোট বিল','Bills'], bpTot:['বিলের মোট','Billed'], bpPaid:['জমা','Paid'], bpDueAmt:['বকেয়া','Due'],
  bpSaved:['তৈরি','Saved'], bpDays:['{n} দিন ভর্তি','{n} days stay'], bpPaidFull:['পুরো জমা','Paid in full'],
  bpDl:['ডাউনলোড','Download'], bpCollect:['টাকা নিন','Collect'], bpNone:['এখনও কোনো চূড়ান্ত বিল নেই','No final bills yet'], bpNoneS:['রোগীকে ছুটি দিলে চূড়ান্ত বিল নিজে থেকে তৈরি হয়।','A final bill is made automatically when a patient is discharged.'],
  bpNoMatch:['খোঁজার সাথে কোনো বিল মেলেনি','No bill matches your search'], bpCsv:['CSV ডাউনলোড','Download CSV'], bpShowN:['{n}টি বিল দেখানো হচ্ছে','Showing {n} bills'],
  bpPaidAfter:['ছুটির পরে {amt} জমা','{amt} paid after discharge'], bpOpen:['রোগীর রেকর্ড','Patient record'],
  mrT:['আরও অপশন','More options'], mrSub:['যে পাতাগুলো নিচের মেনুতে আঁটেনি','Pages that don’t fit in the bottom bar']
});
Object.assign(IC, {more:'<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>'});
NAVI.bills = ['receipt', 'navBills']; VIEWS.bills = vBills;
(function(){ const o = ROLES.owner.nav; o.splice(o.indexOf('billing') + 1, 0, 'bills'); const r = ROLES.reception.nav; r.splice(r.indexOf('stock') + 1, 0, 'bills'); })();

/* ---------- bills data (from discharged patients) ---------- */
S.bpQ = ''; S.bpF = 'all'; S.bpW = 'all';
function bpList(){
  return LV.bills.map(b => {
    let p = getP(b.admission_id);
    if (!p) { LV.billP = LV.billP || {}; p = LV.billP[b.admission_id] || (LV.billP[b.admission_id] = {id:b.admission_id || ('b' + b.id), name:two(b.patient_name || '—'), phone:digits10(b.patient_phone), days:Number(b.days) || 0, disc:true, discAgo:agoD(b.created_at), pays:[], ch:[], extra:[], bed:'', reason:two(''), uhid:b.uhid || '', ghost:true}); }
    const at = new Date(b.created_at), total = Number(b.total) || 0, paidAt = Number(b.paid) || 0, dueAt = Number(b.due) || 0;
    const x = p.ghost ? {total, paid:paidAt, bal:Math.max(0, dueAt)} : totals(p);
    return {p, no:b.final_bill_no || b.bill_no || ('AS-' + ymd(at).replace(/-/g, '').slice(0, 6) + '-' + String(b.id || '').slice(0, 4).toUpperCase()), at, total:x.total, paid:x.paid, bal:x.bal, after:Math.max(0, dueAt - x.bal), row:b};
  }).sort((a, b) => b.at - a.at);
}
function bpFiltered(){
  const q = S.bpQ.trim().toLowerCase(), qd = q.replace(/\s/g, ''), lim = S.bpW === '7' ? 7 : S.bpW === '30' ? 30 : 1e9;
  return bpList().filter(b => (S.bpF === 'all' || (S.bpF === 'due' ? b.bal > 0 : b.bal <= 0)) && (TODAY - b.at) / DAY < lim &&
    (!q || b.p.name.some(n => n.toLowerCase().includes(q)) || (qd && b.p.phone.includes(qd)) || b.no.toLowerCase().includes(q)));
}
function vBills(){
  const all = bpList(), L = bpFiltered(), sum = L.reduce((a, b) => (a.t += b.total, a.p += b.paid, a.d += b.bal, a), {t:0, p:0, d:0});
  const cnt = {all:all.length, due:all.filter(b => b.bal > 0).length, clear:all.filter(b => b.bal <= 0).length};
  return `<div class="ph"><div><h1>${t('bpT')}</h1><p class="sub">${t('bpSub')}</p></div>
    <div class="ph-actions au-f"><label class="au-sel"><span>${t('bpWhen')}</span><select id="bpW" class="input">${[['7', 'bpW7'], ['30', 'bpW30'], ['all', 'bpWall']].map(([v, k]) => `<option value="${v}" ${S.bpW === v ? 'selected' : ''}>${t(k)}</option>`).join('')}</select></label></div></div>
  <div class="sumrow bpsum">
    <div class="card sum"><span>${t('bpN')}</span><b>${num(L.length)}</b></div>
    <div class="card sum"><span>${t('bpTot')}</span><b>${money(sum.t)}</b></div>
    <div class="card sum"><span>${t('bpPaid')}</span><b>${money(sum.p)}</b></div>
    <div class="card sum due"><span>${t('bpDueAmt')}</span><b>${money(sum.d)}</b></div>
  </div>
  <div class="toolbar">
    <label class="search"><span class="vh">${t('bpSearch')}</span>${ic('search')}<input class="input" id="bpQ" type="search" placeholder="${t('bpSearch')}" value="${esc(S.bpQ)}" autocomplete="off"></label>
    <div class="chips" role="group">${[['all', 'bpAll'], ['due', 'bpDue'], ['clear', 'bpClear']].map(([f, k]) => `<button class="chip" data-act="bpF" data-v="${f}" aria-pressed="${S.bpF === f}">${t(k)}<span class="cnt">${num(cnt[f])}</span></button>`).join('')}</div>
    <button class="btn btn-ghost btn-sm skexp" data-act="bpCsv">${ic('download', 16)}${t('bpCsv')}</button>
  </div>
  <div class="card flush" id="bpList">${bpRows(L, all.length)}</div>`;
}
function bpRows(L, total){
  if (!total) return emptyState('receipt', t('bpNone'), t('bpNoneS'));
  if (!L.length) return emptyState('search', t('bpNoMatch'), '', `<button class="btn btn-secondary" data-act="bpClearF">${t('clearF')}</button>`);
  return `<div class="bp-row bp-head" aria-hidden="true"><span>${t('fBillNo')}</span><span>${t('patient')}</span><span>${t('bpSaved')}</span><span class="r">${t('bpTot')}</span><span class="r">${t('bpPaid')}</span><span class="r">${t('bpDueAmt')}</span><span></span></div>` +
    L.map(b => { const p = b.p;
      return `<div class="bp-row">
        <span class="bp-no"><span class="sk-ic c-cons">${ic('receipt', 18)}</span><b class="latin">${b.no}</b></span>
        <button class="bp-p" ${p.ghost ? 'tabindex="-1"' : `data-act="patOpen" data-id="${p.id}"`}>${avatar(p)}<span><b>${esc(nm(p))}</b><small><span class="latin">${p.phone ? fmtPhone(p.phone) : '—'}</span>${p.days ? ' · ' + t('bpDays', {n:num(Math.max(1, p.days))}) : ''}</small></span></button>
        <span class="bp-at"><span class="lm">${t('bpSaved')}</span>${fdate(b.at, {day:'numeric', month:'short', year:'numeric'})}<small>${tm(b.at)} · ${whenTxt(agoD(b.at))}</small></span>
        <span class="r bp-n"><span class="lm">${t('bpTot')}</span>${money(b.total)}</span>
        <span class="r bp-n"><span class="lm">${t('bpPaid')}</span>${money(b.paid)}${b.after ? `<small class="ok">${t('bpPaidAfter', {amt:money(b.after)})}</small>` : ''}</span>
        <span class="r bp-n"><span class="lm">${t('bpDueAmt')}</span>${b.bal > 0 ? `<b class="due">${money(b.bal)}</b>` : `<span class="st st-paid">${t('bpPaidFull')}</span>`}</span>
        <span class="bp-act">${b.bal > 0 && !p.ghost && (S.role === 'owner' || S.role === 'reception') ? `<button class="btn btn-secondary btn-sm" data-act="pay" data-id="${p.id}">${ic('rupee', 16)}${t('bpCollect')}</button>` : ''}<button class="btn btn-primary btn-sm" data-act="printBill" data-id="${p.id}">${ic('download', 16)}${t('bpDl')}</button></span>
      </div>`; }).join('') + `<p class="pl-foot">${t('bpShowN', {n:num(L.length)})}</p>`;
}
function bpCsv(){
  const rows = [['bill_no', 'saved_on', 'patient', 'phone', 'uhid', 'days', 'total', 'paid', 'due']].concat(bpFiltered().map(b => [b.no, ymd(b.at), b.p.name[1], b.p.phone, b.p.uhid || '', Math.max(1, b.p.days || 1), b.total, b.paid, b.bal]));
  return '﻿' + rows.map(r => r.map(v => /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v).join(',')).join('\n');
}

/* ---------- mobile bottom bar: "More" ---------- */

const _renderBottom9 = renderBottom;
renderBottom = function(){
  const nav = R().nav, cap = R().fab ? 4 : 5;
  if (nav.length <= cap) { _renderBottom9(); return; }
  const shown = R().fab ? 4 : 4, rest = nav.slice(shown);
  const it = (v, i, k) => `<button class="bn-item ${S.view === v ? 'on' : ''}" data-act="nav" data-v="${v}" ${S.view === v ? 'aria-current="page"' : ''}><span class="pip">${ic(i, 22)}</span>${t(k)}</button>`;
  const items = nav.slice(0, shown).map(v => it(v, NAVI[v][0], NAVI[v][1]));
  if (R().fab) items.splice(Math.min(2, items.length), 0, `<button class="bn-item bn-fab" data-act="admit"><span class="pip">${ic('plus', 26)}</span>${t('navAdmit')}</button>`);
  const on = rest.includes(S.view), badge = rest.reduce((a, v) => a + (v === 'compliance' ? LIC.filter(l => l.days <= 15).length : 0), 0) + (rest.includes('notif') ? unread() : 0);
  items.push(`<button class="bn-item bn-more ${on ? 'on' : ''}" data-act="moreOpen" aria-haspopup="dialog" aria-expanded="false"><span class="pip">${ic('more', 22)}${badge ? `<i class="bn-dot">${num(badge)}</i>` : ''}</span>${t('navMore')}</button>`);
  $('bottomnav').setAttribute('aria-label', t('menu'));
  $('bottomnav').style.gridTemplateColumns = `repeat(${items.length}, minmax(0,1fr))`;
  $('bottomnav').classList.toggle('six', items.length > 5);
  $('bottomnav').innerHTML = items.join('');
};
function moreSheet(){
  const rest = R().nav.slice(4);
  const bdg = v => v === 'notif' ? unread() : v === 'compliance' ? LIC.filter(l => l.days <= 15).length : v === 'stock' ? SK.filter(i => i.qty < i.min).length : 0;
  return `<div class="mr-wrap" id="moreSheet"><div class="mr-scrim" data-act="moreClose"></div>
    <div class="mr" role="dialog" aria-modal="true" aria-labelledby="mrT"><div class="handle" aria-hidden="true"></div>
      <div class="mr-h"><div><h2 id="mrT">${t('mrT')}</h2><p>${t('mrSub')}</p></div><button class="iconbtn" data-act="moreClose" aria-label="${t('close')}">${ic('x')}</button></div>
      <div class="mr-g">${rest.map(v => { const b = bdg(v); return `<button class="mr-i ${S.view === v ? 'on' : ''}" data-act="moreGo" data-v="${v}"><span class="mr-ic">${ic(NAVI[v][0], 22)}${b ? `<i class="bn-dot">${num(b)}</i>` : ''}</span><span>${t(NAVI[v][1])}</span></button>`; }).join('')}</div>
    </div></div>`;
}
function closeMore(focus){ const s = $('moreSheet'); if (!s) return; s.classList.remove('open'); setTimeout(() => s.remove(), 200); BODY.classList.remove('locked'); if (focus) { const b = ROOT.querySelector('[data-act="moreOpen"]'); b && b.focus(); } }

function extraHandlers8(){
  Object.assign(H, {
    bpF: el => { S.bpF = el.dataset.v; renderMain(); const b = ROOT.querySelector(`[data-act="bpF"][data-v="${el.dataset.v}"]`); b && b.focus(); },
    bpClearF: () => { S.bpQ = ''; S.bpF = 'all'; S.bpW = 'all'; renderMain(); },
    bpCsv: () => { dlText('aurascale-final-bills-' + new Date().toISOString().slice(0, 10) + '.csv', bpCsv()); toast(t('bpCsv') + ' ✓', 'info'); },
    moreOpen: () => { if ($('moreSheet')) { closeMore(true); return; } BODY.insertAdjacentHTML('beforeend', moreSheet()); BODY.classList.add('locked'); requestAnimationFrame(() => requestAnimationFrame(() => { const s = $('moreSheet'); s && s.classList.add('open'); const f = ROOT.querySelector('#moreSheet .mr-i'); f && f.focus({preventScroll:true}); })); },
    moreClose: () => closeMore(true),
    moreGo: el => { closeMore(false); go(el.dataset.v); }
  });
  ROOT.addEventListener('input', e => { if (e.target.id === 'bpQ') { S.bpQ = e.target.value; const l = $('bpList'); if (l) l.innerHTML = bpRows(bpFiltered(), bpList().length); } });
  ROOT.addEventListener('change', e => { if (e.target.id === 'bpW') { S.bpW = e.target.value; renderMain(); } });
  ROOT.addEventListener('keydown', e => { if (e.key === 'Escape' && $('moreSheet')) { e.stopPropagation(); closeMore(true); } }, true);
  const _nfr = nfRefresh; nfRefresh = function(){ _nfr(); if (matchMedia('(max-width:900px)').matches) renderBottom(); };
}

/* =================== v10: SUBSCRIPTION (owner) — modelled on the AuraScale reference =================== */
/* Replace these with your real details before going live. They are samples so nobody pays by mistake. */
const AURA_CFG = {upi:'8017465987-3@ybl', upiName:'AuraScale', wa:'918017465987', mail:'support@aurascale.example', gstin:'19AAAAA0000A1Z5', trade:'AuraScale', legal:'AuraScale (sample proprietor)', addr:'Sample address, Kolkata, West Bengal', stateCode:'19'};
const SUB_PLANS = {
  nh_15:{grp:'nh', n:['নার্সিং হোম','Nursing Home'], beds:['১৫ বেড পর্যন্ত','Up to 15 beds'], m:2999, h:16499, y:29999},
  nh_30:{grp:'nh', n:['নার্সিং হোম','Nursing Home'], beds:['১৬ থেকে ৩০ বেড','16 to 30 beds'], m:3999, h:21999, y:39999},
  nh_50:{grp:'nh', n:['নার্সিং হোম','Nursing Home'], beds:['৩১ থেকে ৫০ বেড','31 to 50 beds'], m:5499, h:29999, y:54999},
  combo_15:{grp:'combo', n:['হাসপাতাল কম্বো','Hospital Combo'], beds:['১৫ বেড পর্যন্ত','Up to 15 beds'], m:3499, h:18999, y:34999},
  combo_30:{grp:'combo', n:['হাসপাতাল কম্বো','Hospital Combo'], beds:['১৬ থেকে ৩০ বেড','16 to 30 beds'], m:4499, h:24499, y:44999},
  combo_50:{grp:'combo', n:['হাসপাতাল কম্বো','Hospital Combo'], beds:['৩১ থেকে ৫০ বেড','31 to 50 beds'], m:5999, h:32999, y:59999},
  pharmacy:{grp:'pharmacy', n:['ফার্মেসি (খুচরো)','Pharmacy Retail'], m:459, h:2499, y:4599},
  wholesale:{grp:'wholesale', n:['ফার্মেসি (পাইকারি)','Pharmacy Wholesale'], m:999, h:5499, y:9999},
  lab:{grp:'lab', n:['ডায়াগনস্টিক ল্যাব','Diagnostic Lab'], m:1299, h:6999, y:12999},
  clinic:{grp:'clinic', n:['ক্লিনিক','Clinic'], m:1499, h:7999, y:14999}
};
const SUB_FEAT = {
  nh:[['ভর্তি, বেড, ছুটি আর IPD বিল','Admissions, beds, discharge and IPD bills'], ['রিসেপশন, ডাক্তার আর নার্সের আলাদা লগইন','Reception, doctor and nurse logins'], ['ভর্তির সময় পরিচয়পত্র স্ক্যান, মাসিক রিপোর্ট','ID-card scan at registration, monthly owner report']],
  pharmacy:[['প্রেসক্রিপশনের ছবি থেকে বিল','Bill from a photo of the prescription'], ['GST সহ বিল হোয়াটসঅ্যাপে','Bills on WhatsApp with GST'], ['বিকল্প ওষুধ, রিফিল রিমাইন্ডার, H1 রেজিস্টার','Substitutes, refill reminders, H1 register']],
  wholesale:[['সাপ্লায়ারের বিলের ছবি থেকে পারচেজ এন্ট্রি','Purchase entry from a photo of the supplier’s bill'], ['GST ইনভয়েস, পার্টি লেজার আর বকেয়া','GST invoices, party ledger and dues'], ['দোকানের অর্ডার সরাসরি অ্যাপে','Shop orders arrive in the app']],
  lab:[['রোগী রেজিস্ট্রেশন, টেস্ট আর বিল','Patient registration, tests and bills'], ['রিপোর্টের PDF সরাসরি রোগীর হোয়াটসঅ্যাপে','Report PDF straight to the patient’s WhatsApp'], ['ডাক্তার রেফারাল আর কমিশন','Doctor referrals and commission']],
  combo:[['নার্সিং হোমের সবকিছু','Everything in Nursing Home'], ['হাসপাতালের ভেতরের ফার্মেসি: ওয়ার্ডের ওষুধ সরাসরি বিলে','Pharmacy inside the hospital: ward medicines go to the bill'], ['ডায়াগনস্টিক ল্যাব: রিপোর্ট রোগীর ফাইলে','Diagnostic lab: reports go to the patient’s file']],
  clinic:[['অ্যাপয়েন্টমেন্ট, টোকেন আর রোগীর রেকর্ড','Appointments, tokens and patient records'], ['ডিজিটাল প্রেসক্রিপশন হোয়াটসঅ্যাপে','Digital prescriptions on WhatsApp'], ['ভিজিট-ফি বিল আর দৈনিক হিসেব','Visit-fee bills and daily accounts']]
};
const SUB_WHO = {combo:['নার্সিং হোম + ফার্মেসি + ল্যাব একসঙ্গে','Nursing home + pharmacy + lab together'], nh:['ভর্তি রোগী থাকা হাসপাতাল','Hospitals with admitted patients'], pharmacy:['ওষুধের দোকান','Medicine shops and chemists'], wholesale:['ডিস্ট্রিবিউটর ও স্টকিস্ট','Distributors and stockists'], lab:['প্যাথলজি ল্যাব ও কালেকশন সেন্টার','Pathology labs and collection centres'], clinic:['ডাক্তারের চেম্বার ও পলিক্লিনিক','Doctor chambers, polyclinics and OPD']};
const SUB_TERM = {m:{n:1, k:'sbM'}, h:{n:6, k:'sbH'}, y:{n:12, k:'sbY'}};
const SUB_OFFER_END = new Date('2026-12-01T00:00:00+05:30');
const SUB_GRACE = 5, OCR_QUOTA = 300, TOPUP = 499;
const SUB = {plan:'nh_15', exp:null, free:false, ocrUsed:0, ocrBonus:0, beds:'15', sel:'y', inv:[]};
let invSeq = 1;

Object.assign(T, {
  navSub:['সাবস্ক্রিপশন','Subscription'],
  sbT:['সাবস্ক্রিপশন','Subscription'], sbSub:['আপনার AuraScale অ্যাকাউন্টের অবস্থা ও পেমেন্ট','Your AuraScale account status & billing'],
  sbStatusT:['AuraScale সাবস্ক্রিপশন','AuraScale subscription'], sbStatus:['অবস্থা','Status'],
  sbActive:['সক্রিয়','Active'], sbGrace:['গ্রেস পিরিয়ড','Grace period'], sbLocked:['লক','Locked'], sbFree:['বিনামূল্যে','Complimentary'],
  sbNoteOk:['পরের রিনিউয়াল: {d} ({n} দিন বাকি)।','Next renewal: {d} ({n} days left).'],
  sbNoteGrace:['রিনিউয়ালের তারিখ ছিল {d}। অ্যাকাউন্ট লক হওয়ার আগে আর {n} দিন বাকি — এখনই রিনিউ করুন।','Renewal was due on {d}. {n} days left before the account is locked — please renew now.'],
  sbNoteLocked:['পেমেন্ট বাকি। {amt} জমা না হওয়া পর্যন্ত মালিক ও রিসেপশন পোর্টাল বন্ধ। ডাক্তাররা রোগীর রেকর্ড দেখতে পারবেন।','Payment overdue. Owner and reception portals are paused until {amt} is received. Doctors can still view records.'],
  sbNoteFree:['এই নার্সিং হোম AuraScale-এর বিনামূল্যের প্ল্যানে আছে। কোনো পেমেন্ট লাগবে না, অ্যাকাউন্ট লকও হবে না।','This nursing home is on a complimentary plan. No payment is due and the account won’t be locked.'],
  sbLockBox:['আপনার AuraScale অ্যাকাউন্ট লক হয়ে গেছে।','Your AuraScale account is locked.'], sbLockBoxS:['রিনিউয়াল বাকি আর ৫ দিনের গ্রেস পিরিয়ডও শেষ। {amt} জমা হলেই আবার খুলে যাবে। রোগীর রেকর্ড নিরাপদ, কিছু মোছা হয়নি।','The renewal is overdue and the 5-day grace period has ended. It opens again once {amt} is paid. Patient records are safe; nothing was deleted.'],
  sbDaysLeft:['দিন বাকি','days left'], sbDayLeft:['দিন বাকি','day left'], sbUntilLock:['দিন পরে অ্যাকাউন্ট লক হবে','days until the account is locked'],
  sbDaysSubOk:['{d} তারিখে রিনিউ হবে। এর আগে পেমেন্ট করলে কোনো বিরতি ছাড়াই চলবে।','Renews on {d}. Pay before this date to continue without a break.'], sbDaysSubGrace:['রিনিউয়ালের তারিখ ছিল {d}। এখনই পেমেন্ট করুন।','Renewal was due on {d}. Please pay now.'], sbDaysSubLocked:['অ্যাকাউন্ট লক। নিচে পেমেন্ট করলে আবার খুলে যাবে।','The account is locked. Pay below to open it again.'],
  sbDemo:['প্রোটোটাইপ: অবস্থা বদলে দেখুন','Prototype: try a state'], sbDOk:['সক্রিয়','Active'], sbDSoon:['৩ দিন বাকি','3 days left'], sbDGrace:['গ্রেস','Grace'], sbDLocked:['লক','Locked'], sbDFree:['ফ্রি','Free'],
  sbPlansT:['প্ল্যান ও পেমেন্ট','Plans & payment'], sbPlansS:['সব দাম GST ছাড়া (১৮% GST আলাদা)','All prices exclude GST (18% GST extra)'],
  sbYour:['আপনার প্ল্যান','Your plan'], sbPerMonth:['/ মাস + GST','/ month + GST'], sbValid:['{d} পর্যন্ত চালু ({n} দিন বাকি)','Valid till {d} ({n} days left)'], sbDue:['রিনিউয়ালের তারিখ ছিল {d}','Renewal was due on {d}'],
  sbAsk:['AuraScale-কে জিজ্ঞেস করুন','Ask AuraScale'], sbYourTag:['আপনার প্ল্যান','YOUR PLAN'], sbSoonTag:['তৈরি হচ্ছে','IN PROGRESS'], sbSoonTxt:['তৈরি হচ্ছে · শীঘ্রই আসছে','In progress · coming soon'],
  sbM:['১ মাস','1 month'], sbH:['৬ মাস','6 months'], sbY:['১ বছর','1 year'], sbFreeM:['+{n} মাস ফ্রি','+{n} month(s) free'], sbSave:['{amt} বাঁচে','save {amt}'], sbPerM:['প্রতি মাসে','per month'],
  sbNoteM:['প্রতি মাসে বিল হবে। যেকোনো সময় বন্ধ করা যায়।','Billed every month. Stop any time.'], sbNoteT:['মাসে {amt} + GST','{amt} a month + GST'], sbUseFor:['{n} মাস ব্যবহার করুন','use it for {n} months'],
  sbGstLine:['{a} + ১৮% GST {g} = {t}','{a} + 18% GST {g} = {t}'], sbPay:['{amt} পেমেন্ট করুন','Pay {amt}'], sbAdd:['{n} যোগ করুন (একই লগইন)','Add {n} (same login)'],
  sbBeds:['বেড সংখ্যা','Number of beds'], sbB15:['১৫ পর্যন্ত','Up to 15'], sbB30:['১৬–৩০','16–30'], sbB50:['৩১–৫০','31–50'],
  sbTop:['আইডি-স্ক্যান টপ-আপ','ID-scan top-up'], sbTopS:['১০০টি বাড়তি স্ক্যান, মেয়াদ শেষ হয় না','100 extra ID-card scans, never expire'], sbOnce:['+ GST · একবার','+ GST · one time'], sbTopN:['মাসের স্ক্যান শেষ হলে তবেই লাগবে।','Only when your monthly scans run out.'],
  sbOffer:['লঞ্চ অফার: ৬ মাসে +১ মাস ফ্রি, ১ বছরে +২ মাস ফ্রি (প্রথম ৫০ জন, ৩০ নভেম্বর ২০২৬ পর্যন্ত)। একই দামে রিনিউ, কোনো রিনিউয়াল ফি নেই। পেমেন্ট সফল হলেই প্ল্যান এগিয়ে যায় আর নিচে GST ট্যাক্স ইনভয়েস চলে আসে।','Launch offer: 6 months +1 month free, 1 year +2 months free (first 50 customers, until 30 November 2026). Renew at the same price, no renewal fee. Your plan moves forward as soon as payment succeeds and a GST tax invoice appears below.'],
  sbInvT:['AuraScale-এর ট্যাক্স ইনভয়েস','Tax invoices from AuraScale'], sbInvNone:['এখনও কোনো ইনভয়েস নেই। প্রতিবার পেমেন্ট করলে নিজে থেকে তৈরি হয়।','No invoices yet. A tax invoice is created automatically each time you pay.'],
  sbInvSub:['সাবস্ক্রিপশন','Subscription'], sbInvTop:['আইডি-স্ক্যান টপ-আপ','ID-scan top-up'], sbPaid:['পেমেন্ট হয়েছে','PAID'], sbView:['দেখুন / PDF','View / PDF'],
  sbUseT:['আইডি-স্ক্যান ব্যবহার','ID-scan usage'], sbUseS:['আপনার প্ল্যানে প্রতি মাসে {q}টি পরিচয়পত্র স্ক্যান আছে। শেষ হলে {amt} + GST দিয়ে ১০০টির টপ-আপ নিতে পারেন, যার মেয়াদ শেষ হয় না। প্রতি বিলিং পিরিয়ডে গণনা নতুন করে শুরু হয়।','Your plan includes {q} ID-card scans a month. When they run out, a {amt} + GST top-up adds 100 more that never expire. Usage resets each billing period.'],
  sbScans:['পরিচয়পত্র স্ক্যান (OCR)','ID card scans (OCR)'], sbScanN:['{u} / {q} স্ক্যান','{u} / {q} scans'], sbBonus:['⚡ টপ-আপের বাকি: {n}টি স্ক্যান (মাসের স্ক্যান শেষ হলে তবেই ব্যবহার হবে)।','⚡ Top-up remaining: {n} scans (used only after the monthly quota runs out).'],
  sbPayT:['{amt} পেমেন্ট করুন','Pay {amt}'], sbPayS:['{l} · ১৮% GST সহ','{l} · incl. 18% GST'], sbBreak:['দাম','Price'], sbGstL:['GST ১৮%','GST 18%'], sbTotal:['মোট','Total'],
  sbUpiId:['UPI আইডি','UPI ID'], sbOpenUpi:['আমার UPI অ্যাপ খুলুন','Open my UPI app'], sbSendUtr:['UTR নম্বর হোয়াটসঅ্যাপে পাঠান','Send the UTR on WhatsApp'],
  sbScanQr:['যেকোনো UPI অ্যাপ (GPay, PhonePe, Paytm) দিয়ে স্ক্যান করুন','Scan with any UPI app (GPay, PhonePe, Paytm)'], sbQrFail:['QR লোড হয়নি — নিচের UPI আইডি ব্যবহার করুন','QR could not load — use the UPI ID below'],
  sbConfirmN:['UPI পেমেন্ট AuraScale এক কার্যদিবসের মধ্যে মিলিয়ে নেয়। তারপর প্ল্যান এগিয়ে যাবে আর ইনভয়েস এখানে আসবে।','AuraScale confirms UPI payments within one working day. Then your plan moves forward and the invoice appears here.'],
  sbDemoPaid:['প্রোটোটাইপ: পেমেন্ট সফল ধরুন','Prototype: mark as paid'], sbOkT:['পেমেন্ট পাওয়া গেছে','Payment received'], sbOkTill:['{d} পর্যন্ত চালু','Valid till {d}'], sbOkInv:['ট্যাক্স ইনভয়েস {no}','Tax invoice {no}'], sbDone:['ঠিক আছে','Done'],
  sbOther:['এই প্ল্যান একই লগইনে যোগ করা হবে (প্রোটোটাইপ)','This would add the plan on the same login (prototype)'],
  sbBanGrace:['⏳ AuraScale সাবস্ক্রিপশনের মেয়াদ শেষ — অ্যাকাউন্ট লক হতে আর {n} দিন বাকি।','⏳ Your AuraScale subscription has expired — {n} days left before the account is locked.'],
  sbBanSoon:['📅 AuraScale সাবস্ক্রিপশন {n} দিনে রিনিউ করতে হবে।','📅 Your AuraScale subscription renews in {n} days.'], sbBanLocked:['🔒 অ্যাকাউন্ট লক — শুধু সাবস্ক্রিপশন পাতা খোলা যাবে।','🔒 Account locked — only the Subscription page is open.'],
  sbRenew:['এখনই রিনিউ করুন','Renew now'], sbLockedNav:['অ্যাকাউন্ট লক — আগে পেমেন্ট করুন','Account locked — please pay first'],
  aSub:['সাবস্ক্রিপশন পেমেন্ট','Subscription payment']
});
Object.assign(IC, {crown:'<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>', wa:'<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.3A8 8 0 1 1 20 12z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z"/>', card2:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'});
NAVI.subscription = ['crown', 'navSub']; VIEWS.subscription = vSubscription; ROLES.owner.nav.push('subscription');
ATITLE.sub = 'aSub'; ACAT.sub = 'sys'; aTone.sub = 'green'; aIcon.sub = 'crown';

const gst18 = n => n;
const inr2 = n => '₹' + new Intl.NumberFormat(loc(), {minimumFractionDigits:n % 1 ? 2 : 0, maximumFractionDigits:2}).format(n);
const subOffer = () => new Date() < SUB_OFFER_END;
const subBonus = term => subOffer() ? (term === 'h' ? 1 : term === 'y' ? 2 : 0) : 0;
const subFmt = d => fdate(d, {day:'numeric', month:'short', year:'numeric'});
function subInfo(){
  if (SUB.srvLocked) return {tone:'locked', days:-99, lockIn:0};
  if (SUB.free || !SUB.exp) return {tone:'free', days:null};
  const days = Math.ceil((SUB.exp - Date.now()) / DAY), lockIn = days < 0 ? Math.max(SUB_GRACE + days, 0) : null;
  const tone = days > 7 ? 'ok' : days >= 0 ? 'soon' : lockIn > 0 ? 'grace' : 'locked';
  return {tone, days, lockIn};
}
const subLocked = () => subInfo().tone === 'locked';
const subPrice = () => SUB.price || (SUB_PLANS[SUB.plan] || SUB_PLANS.nh_15).m;

/* ---------- view ---------- */
function vSubscription(){
  const i = subInfo();
  return `<div class="ph"><div><h1>${t('sbT')}</h1><p class="sub">${t('sbSub')}</p></div>
</div>
  ${i.tone === 'locked' ? `<div class="sblock">${ic('lock', 20)}<div><b>${t('sbLockBox')}</b><span>${t('sbLockBoxS', {amt:inr2(gst18(subPrice()))})}</span></div></div>` : ''}
  <div class="sbgrid">
    ${subStatusCard(i)}
    ${subUsageCard()}
  </div>
  <section class="card setc" id="sb-plans">
    <div class="setc-h"><span class="setc-ic">${ic('crown', 20)}</span><div><h2>${t('sbPlansT')}</h2><p>${t('sbPlansS')}</p></div></div>
    ${subCurBar(i)}
    <div class="apgrid">${subCard('nh_' + SUB.beds, {mine:true, beds:true, cur:SUB.plan === 'nh_' + SUB.beds})}${subCard('combo_' + SUB.beds, {mine:true, beds:true, cur:SUB.plan === 'combo_' + SUB.beds, tag:true})}${subCard('pharmacy', {other:true})}${subCard('wholesale', {other:true})}${subCard('lab', {other:true})}${subCard('clinic', {soon:true})}${subTopCard()}</div>
    <p class="hint">${ic('info', 14)} ${t('sbOffer')}</p>
  </section>
  <section class="card setc">
    <div class="setc-h"><span class="setc-ic">${ic('receipt', 20)}</span><div><h2>${t('sbInvT')}</h2></div></div>
    ${SUB.inv.length ? `<div class="invl">${SUB.inv.slice().sort((a, b) => b.date - a.date).map(v => { const tot = gst18(v.taxable);
      return `<div class="inv"><span class="sk-ic c-cons">${ic(v.kind === 'topup' ? 'sparkle' : 'crown', 18)}</span><div class="tt"><b class="latin">${v.no}</b><span>${subFmt(v.date)} · ${t(v.kind === 'topup' ? 'sbInvTop' : 'sbInvSub')} · ${inr2(tot)}</span></div>${v.paid ? `<span class="st st-paid">${t('sbPaid')}</span>` : `<span class="st st-pending">${esc(String(v.status || '').toUpperCase())}</span>`}<button class="btn btn-secondary btn-sm" data-act="sbInv" data-v="${v.no}">${ic('file', 16)}${t('sbView')}</button></div>`; }).join('')}</div>` : `<p class="hint">${t('sbInvNone')}</p>`}
  </section>`;
}
function subStatusCard(i){
  const tone = {ok:'ok', soon:'soon', grace:'bad', locked:'bad', free:'info'}[i.tone];
  const badge = {ok:'sbActive', soon:'sbActive', grace:'sbGrace', locked:'sbLocked', free:'sbFree'}[i.tone];
  const note = i.tone === 'free' ? t('sbNoteFree') : i.tone === 'locked' ? t('sbNoteLocked', {amt:inr2(gst18(subPrice()))}) : i.tone === 'grace' ? t('sbNoteGrace', {d:subFmt(SUB.exp), n:num(i.lockIn)}) : t('sbNoteOk', {d:subFmt(SUB.exp), n:num(i.days)});
  let big = '';
  if (i.tone !== 'free') {
    const n = i.days >= 0 ? i.days : i.tone === 'grace' ? i.lockIn : 0, w = i.days >= 0 ? (i.days === 1 ? t('sbDayLeft') : t('sbDaysLeft')) : i.tone === 'grace' ? t('sbUntilLock') : t('sbDaysLeft');
    const sub = i.days >= 0 ? t('sbDaysSubOk', {d:subFmt(SUB.exp)}) : i.tone === 'grace' ? t('sbDaysSubGrace', {d:subFmt(SUB.exp)}) : t('sbDaysSubLocked');
    big = `<div class="sbdays t-${tone}"><div class="sbdn"><b>${num(n)}</b><span>${w}</span></div><div class="sbbar"><i style="width:${Math.max(4, Math.min(100, Math.round(Math.max(i.days, 0) / 30 * 100)))}%"></i></div><p>${sub}</p></div>`;
  }
  return `<section class="card setc">
    <div class="setc-h"><span class="setc-ic">${ic('shield', 20)}</span><div><h2>${t('sbStatusT')}</h2></div><span class="sbbadge t-${tone}">${t(badge)}</span></div>
    <p class="sbnote">${note}</p>${big}
    ${i.tone !== 'free' && i.tone !== 'ok' ? `<button class="btn btn-primary btn-lg btn-block" data-act="sbPay" data-plan="${SUB.plan}" data-term="m">${ic('card2')}${t('sbRenew')} · ${inr2(gst18(subPrice()))}</button>` : ''}
  </section>`;
}
function subUsageCard(){
  const pct = Math.min(100, Math.round(SUB.ocrUsed / OCR_QUOTA * 100)), c = pct >= 100 ? 'bad' : pct >= 80 ? 'warn' : 'ok';
  return `<section class="card setc">
    <div class="setc-h"><span class="setc-ic">${ic('idcard', 20)}</span><div><h2>${t('sbUseT')}</h2></div></div>
    <p class="sbnote">${t('sbUseS', {q:num(OCR_QUOTA), amt:money(TOPUP)})}</p>
    <div><div class="sbur"><span>${t('sbScans')}</span><b>${t('sbScanN', {u:num(SUB.ocrUsed), q:num(OCR_QUOTA)})}</b></div><div class="sbbar u-${c}"><i style="width:${pct}%"></i></div></div>
    ${SUB.ocrBonus ? `<p class="hint">${t('sbBonus', {n:num(SUB.ocrBonus)})}</p>` : ''}
    <button class="btn btn-secondary" data-act="sbPay" data-plan="topup" data-term="one">${ic('sparkle')}${t('sbTop')} · ${inr2(gst18(TOPUP))}</button>
  </section>`;
}
function subCurBar(i){
  const p = SUB_PLANS[SUB.plan];
  const txt = SUB.free ? t('sbNoteFree') : SUB.trial ? t('sbTrial', {d:subFmt(SUB.exp), n:num(Math.max(0, i.days))}) : i.days >= 0 ? t('sbValid', {d:subFmt(SUB.exp), n:num(i.days)}) : t('sbDue', {d:subFmt(SUB.exp)});
  return `<div class="apcur"><div><span class="eyebrow">${t('sbYour')}</span><b>${p.n[li()]}${p.beds ? ' · ' + p.beds[li()] : ''}</b> <span class="s">${SUB.free ? t('sbFree') : money(SUB.price || p.m) + ' ' + t('sbPerMonth')}</span><div class="s">${txt}</div></div>
    <a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://wa.me/${AURA_CFG.wa}?text=${encodeURIComponent('Hi AuraScale, I have a question about my plan for ' + t('homeName'))}">${ic('wa', 16)}${t('sbAsk')}</a></div>`;
}
function subCard(code, o){
  const p = SUB_PLANS[code], grp = p.grp, sel = SUB.sel, soon = !!o.soon;
  const rows = ['m', 'h', 'y'].map(tm2 => { const amt = p[tm2], save = p.m * SUB_TERM[tm2].n - amt, b = subBonus(tm2), on = sel === tm2 && !soon;
    return `<button type="button" class="apt ${on ? 'on' : ''}" ${soon ? 'disabled' : `data-act="sbTerm" data-v="${tm2}"`} aria-pressed="${on}"><span class="aptl"><b>${t(SUB_TERM[tm2].k)}</b>${b ? `<span class="of">${t('sbFreeM', {n:num(b)})}</span>` : ''}</span><span class="aptr"><b>${money(amt)}</b>${save > 0 ? `<span class="sv">${t('sbSave', {amt:money(save)})}</span>` : `<span class="ap-sub">${t('sbPerM')}</span>`}</span></button>`; }).join('');
  const amt = p[sel], b = subBonus(sel);
  const note = soon ? '' : `${sel === 'm' ? t('sbNoteM') : t('sbNoteT', {amt:money(Math.round(amt / (SUB_TERM[sel].n + b)))}) + (b ? ` · <span class="of">${t('sbUseFor', {n:num(SUB_TERM[sel].n + b)})}</span>` : '')}`;
  const act = soon ? `<div class="apsoon">${t('sbSoonTxt')}</div>` : o.mine ? `<button type="button" class="btn btn-primary btn-lg btn-block" data-act="sbPay" data-plan="${code}" data-term="${sel}">${ic('card2')}${t('sbPay', {amt:inr2(gst18(amt))})}</button><button type="button" class="btn btn-ghost btn-block" data-act="sbUpi" data-plan="${code}" data-term="${sel}">${ic('upi', 16)}${t('sbUpiBtn')}</button>` : `<button type="button" class="btn btn-secondary btn-block" data-act="sbOther" data-v="${code}">${ic('plus')}${t('sbAdd', {n:p.n[li()]})}</button>`;
  return `<div class="apc ${o.cur ? 'cur' : ''} ${soon ? 'soon' : ''}">
    <div class="apc-top"><div><b class="apnm">${p.n[li()]}</b><span class="ap-sub">${SUB_WHO[grp][li()]}${p.beds ? ' · ' + p.beds[li()] : ''}</span></div>${o.cur ? `<span class="aptag">${t('sbYourTag')}</span>` : o.tag ? `<span class="aptag g">${t('sbBest')}</span>` : soon ? `<span class="aptag g">${t('sbSoonTag')}</span>` : ''}</div>
    ${o.beds ? `<div class="seg" role="group" aria-label="${t('sbBeds')}">${[['15', 'sbB15'], ['30', 'sbB30'], ['50', 'sbB50']].map(([v, k]) => `<button type="button" data-act="sbBeds" data-v="${v}" aria-pressed="${SUB.beds === v}">${t(k)}</button>`).join('')}</div>` : ''}
    <div class="apts">${rows}</div>
    ${note ? `<div class="apnote">${note}</div>` : ''}
    <ul class="apf">${SUB_FEAT[grp].map(f => `<li>${f[li()]}</li>`).join('')}</ul>
    ${act}</div>`;
}
const subTopCard = () => `<div class="apc"><div class="apc-top"><div><b class="apnm">${t('sbTop')}</b><span class="ap-sub">${t('sbTopS')}</span></div></div>
  <div class="apamt">${money(TOPUP)} <small>${t('sbOnce')}</small></div><div class="apnote">${t('sbTopN')}</div>
  <button type="button" class="btn btn-secondary btn-block" data-act="sbPay" data-plan="topup" data-term="one">${ic('sparkle')}${t('sbPay', {amt:inr2(gst18(TOPUP))})}</button><button type="button" class="btn btn-ghost btn-block" data-act="sbUpi" data-plan="topup" data-term="one">${ic('upi', 16)}${t('sbUpiBtn')}</button></div>`;

/* ---------- pay modal (UPI QR) ---------- */
function subLabel(plan, term){ if (plan === 'topup') return t('sbTop') + ' (100)'; const p = SUB_PLANS[plan]; return `${p.n[li()]} (${p.beds ? p.beds[li()] : ''}) · ${t(SUB_TERM[term].k)}`; }
function upiUrl(amt, note){ return 'upi://pay?pa=' + encodeURIComponent(AURA_CFG.upi) + '&pn=' + encodeURIComponent(AURA_CFG.upiName) + '&am=' + Number(amt).toFixed(2) + '&cu=INR&tn=' + encodeURIComponent(note.slice(0, 70)); }
function mSubPay(m){
  if (m.done) return {title:'', body:`<div class="sbok"><svg width="84" height="84" viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle class="c" cx="32" cy="32" r="27" stroke="var(--ok)" stroke-width="3.5"/><path class="p" d="M20 33l8 8 16-17" stroke="var(--ok)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <h3>${t('sbOkT')}</h3><b class="sbokamt">${inr2(m.total)}</b><p>${esc(m.label)}</p>${m.plan !== 'topup' ? `<p><b>${t('sbOkTill', {d:subFmt(SUB.exp)})}</b></p>` : ''}<p class="mut">${t('sbOkInv', {no:m.invNo})}</p></div>`,
    foot:`<button class="btn btn-primary btn-lg grow" data-act="closeModal" data-primary>${t('sbDone')}</button>`};
  const price = m.plan === 'topup' ? TOPUP : SUB_PLANS[m.plan][m.term], total = gst18(price);
  return {title:t('sbPayT', {amt:inr2(total)}), sub:t('sbPayS', {l:esc(m.label)}),
    body:`<div class="sbbrk"><div><span>${t('sbBreak')}</span><b>${inr2(price)}</b></div><div><span>${t('sbGstL')}</span><b>${inr2(total - price)}</b></div><div class="tot"><span>${t('sbTotal')}</span><b>${inr2(total)}</b></div></div>
      <div class="sbqr"><div id="sbQr" class="sbqrbox" aria-label="UPI QR"><span class="spin"></span></div><p class="hint">${t('sbScanQr')}</p><div class="sbupi"><span>${t('sbUpiId')}</span><b class="latin">${AURA_CFG.upi}</b></div></div>
      <div class="setbtns"><a class="btn btn-primary btn-lg grow" href="${upiUrl(total, 'AuraScale ' + m.label + ' ' + t('homeName'))}">${ic('upi')}${t('sbOpenUpi')}</a><a class="btn btn-secondary btn-lg grow sbwa" target="_blank" rel="noopener" href="https://wa.me/${AURA_CFG.wa}?text=${encodeURIComponent('Hi AuraScale, I paid ' + inr2(total) + ' by UPI for ' + m.label + ' (' + t('homeName') + '). UTR: ')}">${ic('wa')}${t('sbSendUtr')}</a></div>
      <p class="hint">${ic('info', 14)} ${t('sbConfirmN')}</p>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-ghost btn-lg grow sbdemopay" data-act="sbPaid">${ic('check')}${t('sbDemoPaid')}</button>`};
}
const QR_LIB = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
function loadQrLib(){ return new Promise((res, rej) => { if (typeof window.QRCode === 'function') return res(); const s = document.createElement('script'); s.src = QR_LIB; s.onload = () => typeof window.QRCode === 'function' ? res() : rej(); s.onerror = rej; document.head.appendChild(s); }); }
async function drawQr(url){ const box = $('sbQr'); if (!box) return; try { await loadQrLib(); const b = $('sbQr'); if (!b) return; b.innerHTML = ''; new QRCode(b, {text:url, width:168, height:168, correctLevel:QRCode.CorrectLevel.M}); } catch (e) { const b = $('sbQr'); if (b) b.innerHTML = `<span class="hint" style="text-align:center">${t('sbQrFail')}</span>`; } }

/* ---------- invoice (thermal style, as in the reference) ---------- */
function subInvoiceHtml(v){
  const tax = Math.round(v.taxable * 18) / 100, tot = v.taxable + tax, intra = (FAC.gstin ? FAC.gstin.slice(0, 2) : FAC.state) === AURA_CFG.stateCode;
  const row = (a, b, bold) => `<div class="row${bold ? ' b' : ''}"><span>${a}</span><span>${b}</span></div>`, ln = '<div class="ln"></div>', f2 = n => Number(n).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}), d = x => x.toLocaleDateString('en-GB');
  const st = stateName(FAC.gstin ? FAC.gstin.slice(0, 2) : FAC.state);
  return `<!doctype html><html><head><meta charset="utf-8"><title>${v.no}</title><style>body{margin:0;background:#eee;font-family:"Courier New",monospace;color:#111}.rc{width:320px;margin:16px auto;background:#fff;padding:18px 16px;box-shadow:0 1px 4px rgba(0,0,0,.15)}.c{text-align:center}.h{font-weight:700;font-size:15px}.small{font-size:11.5px;line-height:1.45}.ln{border-top:1px dashed #555;margin:8px 0}.row{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;line-height:1.6}.b{font-weight:700;font-size:14px}.paid{display:inline-block;border:2px solid #0b7a52;color:#0b7a52;font-weight:700;padding:2px 10px;margin:4px 0}.smp{color:#b42318;font-weight:700}@media print{body{background:#fff}.rc{box-shadow:none;margin:0 auto}}</style></head><body>
  <div class="rc"><div class="c h">TAX INVOICE</div><div class="c small smp">SAMPLE — not a real invoice</div>${ln}
  <div class="c"><b>${AURA_CFG.trade}</b></div><div class="c small">${AURA_CFG.legal}<br>${AURA_CFG.addr}<br>GSTIN: ${AURA_CFG.gstin}<br>State: West Bengal (19)</div>
  <div class="c"><span class="paid">PAID</span></div>${ln}${row('Invoice No:', v.no)}${row('Date:', d(v.date))}${ln}
  <div class="small"><b>Billed to:</b><br>${esc(T.homeName[1])}<br>${esc(FAC.addr)}<br>GSTIN: ${FAC.gstin || 'Unregistered'}<br>Place of supply: ${esc(st)}</div>${ln}
  <div class="small"><b>${esc(v.label[1])}</b><br>SAC: 998314</div>${v.from && v.to ? `<div class="small">Period: ${d(v.from)} to ${d(v.to)}</div>` : ''}
  ${row('Taxable value', f2(v.taxable))}${intra ? row('CGST 9%', f2(tax / 2)) + row('SGST 9%', f2(tax / 2)) : row('IGST 18%', f2(tax))}${ln}${row('TOTAL Rs', f2(tot), true)}${ln}
  ${row('Paid by', v.method)}${row('Ref', v.ref)}<div class="small">Tax is not payable on reverse charge basis.</div>${ln}
  <div class="c small">Computer-generated invoice. No signature required.<br>${AURA_CFG.mail}</div></div></body></html>`;
}

/* ---------- app-wide banner + lock ---------- */
function subBanner(){
  if (S.role === 'doctor' || S.role === 'nurse') return '';
  const i = subInfo(); if (i.tone === 'ok' || i.tone === 'free') return '';
  const txt = i.tone === 'soon' ? t('sbBanSoon', {n:num(i.days)}) : i.tone === 'grace' ? t('sbBanGrace', {n:num(i.lockIn)}) : t('sbBanLocked');
  return `<div class="sbban t-${i.tone}" role="status"><span>${txt}</span>${S.view !== 'subscription' && S.role === 'owner' ? `<button class="link" data-act="nav" data-v="subscription">${t('sbRenew')}</button>` : ''}</div>`;
}
function setSubDemo(k){
  SUB.demo = k; SUB.free = k === 'free';
  SUB.exp = k === 'ok' ? dateIn(18) : k === 'soon' ? dateIn(3) : k === 'grace' ? dateAgo(2) : k === 'locked' ? dateAgo(8) : dateIn(18);
  SUB.exp = new Date(SUB.exp.getTime() - 6e4);
}

function extraHandlers9(){
  Object.assign(H, {
    sbDemo: el => { setSubDemo(el.dataset.v); renderSidebar(); renderBottom(); renderMain(); const b = ROOT.querySelector(`[data-act="sbDemo"][data-v="${el.dataset.v}"]`); b && b.focus(); },
    sbTerm: el => { SUB.sel = el.dataset.v; const sec = $('sb-plans'); renderMain(); const b = ROOT.querySelector(`[data-act="sbTerm"][data-v="${el.dataset.v}"]`); b && b.focus({preventScroll:true}); },
    sbBeds: el => { SUB.beds = el.dataset.v; renderMain(); const b = ROOT.querySelector(`[data-act="sbBeds"][data-v="${el.dataset.v}"]`); b && b.focus({preventScroll:true}); },
    sbOther: () => toast(t('sbOther'), 'info'),
    sbPay: el => { const plan = el.dataset.plan, term = el.dataset.term; openModal({type:'subPay', plan, term, label:subLabel(plan, term)}); const price = plan === 'topup' ? TOPUP : SUB_PLANS[plan][term]; setTimeout(() => drawQr(upiUrl(gst18(price), 'AuraScale ' + subLabel(plan, term))), 60); },
    sbPaid: () => { const m = S.modal, topup = m.plan === 'topup', price = topup ? TOPUP : SUB_PLANS[m.plan][m.term];
      const no = 'AS/26-27/' + String(invSeq++).padStart(4, '0'), v = {no, date:new Date(), kind:topup ? 'topup' : 'sub', label:[subLabel(m.plan, m.term), subLabel(m.plan, m.term)], taxable:price, method:'UPI', ref:'UPI-SAMPLE-' + Math.floor(100000 + Math.random() * 899999)};
      if (topup) SUB.ocrBonus += 100;
      else { const months = SUB_TERM[m.term].n + subBonus(m.term), from = new Date(Math.max(Date.now(), SUB.exp.getTime())); const to = new Date(from); to.setMonth(to.getMonth() + months); v.from = from; v.to = to; SUB.exp = to; SUB.plan = m.plan; SUB.free = false; SUB.demo = 'ok'; }
      SUB.inv.push(v); m.done = true; m.total = gst18(price); m.invNo = no;
      audit({act:'sub', amt:gst18(price), d:{label:subLabel(m.plan, m.term), no, until:topup ? null : SUB.exp}});
      renderModal(); renderSidebar(); renderBottom(); renderMain(); },
    sbInv: el => { const v = SUB.inv.find(x => x.no === el.dataset.v); if (!v) return; const f = $('printFrame'); f.onload = () => setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { toast(t('billBlocked'), 'info'); } }, 400); f.srcdoc = subInvoiceHtml(v); toast(t('billPreparing'), 'info'); }
  });
  const _rm = renderModal; renderModal = function(){ if (S.modal && S.modal.type === 'subPay') { const r = mSubPay(S.modal); $('modal').className = 'modal'; $('modal').innerHTML = `<div class="handle" aria-hidden="true"></div>${r.title ? `<div class="m-h"><div class="tt"><h2 id="mTitle">${r.title}</h2>${r.sub ? `<p>${r.sub}</p>` : ''}</div><button class="iconbtn" data-act="closeModal" aria-label="${t('close')}">${ic('x')}</button></div>` : ''}<div class="m-b">${r.body}</div><div class="m-f">${r.foot}</div>`; return; } _rm(); };
  const _rmain = renderMain; renderMain = function(){ _rmain(); if (!S.loading) { const b = subBanner(); if (b) $('main').insertAdjacentHTML('afterbegin', b); } };
  const _go = go; go = function(v){ if (subLocked() && (S.role === 'owner' || S.role === 'reception') && v !== 'subscription') { toast(t('sbLockedNav'), 'info'); if (S.role === 'owner' && S.view !== 'subscription') _go('subscription'); return; } return _go(v); };
  const _idr = idRead; idRead = function(side, url){ if (side === 'F') { if (SUB.ocrUsed < OCR_QUOTA) SUB.ocrUsed++; else if (SUB.ocrBonus) SUB.ocrBonus--; } return _idr(side, url); };
  const _ad = aDetails; aDetails = function(e){ if (e.act !== 'sub') return _ad(e); const d = e.d, r = [[t('fWhat'), esc(d.label)], [t('fAmt'), `<b>${inr2(e.amt)}</b>`], [t('fBillNo'), `<span class="latin">${d.no}</span>`]]; if (d.until) r.push([t('fTo'), subFmt(new Date(d.until))]); return r; };
}

/* =================== v11: STAFF — team, invite, attendance, salary, holidays =================== */
Object.assign(T, {
  sfHubT:['স্টাফ','Staff'], sfHubS:['টিম, আমন্ত্রণ, হাজিরা, বেতন আর ছুটি — এক জায়গায়','Team, invites, attendance, salary and holidays — in one place'],
  sfTabTeam:['টিম','Team'], sfTabInv:['আমন্ত্রণ','Invite'], sfTabToday:['আজকের হাজিরা','Attendance today'], sfTabMonth:['মাসের হাজিরা','Month'], sfTabSal:['বেতন','Salary'], sfTabSalD:['বেতনের বিবরণ','Salary details'], sfTabHol:['ছুটির দিন','Holidays'],
  tmT2:['যাঁরা পোর্টালে লগইন করেন','People who sign in to the portal'], tmRole:['রোল','Role'], tmContact:['যোগাযোগ','Contact'], tmLast:['শেষ সক্রিয়','Last active'], tmStatus:['অবস্থা','Status'],
  tmActive:['সক্রিয়','Active'], tmDeact:['নিষ্ক্রিয়','Deactivated'], tmRevoked:['অ্যাক্সেস বাতিল','Access revoked'], tmOwnerNote:['মালিক — সরানো যায় না','Owner — can’t be removed'],
  tmDeactBtn:['নিষ্ক্রিয় করুন','Deactivate'], tmReactBtn:['আবার চালু করুন','Reactivate'], tmRevokeBtn:['অ্যাক্সেস বাতিল','Revoke access'],
  tmDeactHelp:['নিষ্ক্রিয় = সাময়িক বন্ধ, পরে আবার চালু করা যায়। অ্যাক্সেস বাতিল = লগইন চিরতরে মুছে যায়, আবার আমন্ত্রণ পাঠাতে হবে। দুটোতেই পুরোনো রেকর্ড ও অডিট থেকে যায়।','Deactivate = pause, can be turned back on. Revoke access = login removed for good; a new invite is needed. Either way, past records and the audit log stay.'],
  tmDeactDone:['{n} নিষ্ক্রিয় হলেন — আর লগইন করতে পারবেন না','{n} deactivated — can’t sign in now'], tmReactDone:['{n} আবার সক্রিয়','{n} is active again'], tmRevDone:['{n}-এর অ্যাক্সেস বাতিল হলো','{n}’s access was revoked'],
  tmRevT:['অ্যাক্সেস বাতিল করবেন?','Revoke access?'], tmRevS:['{n}-এর লগইন চিরতরে মুছে যাবে। এখনই সব ডিভাইস থেকে সাইন আউট হবেন।','{n}’s login will be removed for good and signed out of every device now.'], tmRevGo:['হ্যাঁ, বাতিল করুন','Yes, revoke'],
  tmMins:['{n} মিনিট আগে','{n} min ago'], tmHrs:['{n} ঘণ্টা আগে','{n} h ago'], tmNever:['এখনও লগইন করেননি','Never signed in'],
  ivT:['নতুন কাউকে আমন্ত্রণ পাঠান','Invite someone new'], ivS:['হোয়াটসঅ্যাপে একটা লিংক যাবে। লিংক খুলে নিজের পাসওয়ার্ড দিলেই লগইন চালু হবে। লিংক ৭ দিন চালু থাকে।','A link goes on WhatsApp. They open it, set a password and can sign in. The link works for 7 days.'],
  ivName:['নাম','Name'], ivPhone:['মোবাইল (হোয়াটসঅ্যাপ)','Mobile (WhatsApp)'], ivRole:['কী কাজ করবেন','Role'], ivSend:['আমন্ত্রণ পাঠান','Send invite'],
  ivRoleHelp:{}, ivPending:['অপেক্ষায় থাকা আমন্ত্রণ','Pending invites'], ivNone:['কোনো আমন্ত্রণ অপেক্ষায় নেই','No pending invites'], ivSentAgo:['পাঠানো {w} · {d} দিন বাকি','Sent {w} · {d} days left'],
  ivResend:['আবার পাঠান','Resend'], ivCancel:['বাতিল','Cancel'], ivCode:['কোড','Code'], ivSent:['{n}-কে আমন্ত্রণ পাঠানো হয়েছে (প্রোটোটাইপ)','Invite sent to {n} (prototype)'], ivResent:['আবার পাঠানো হয়েছে','Sent again'], ivCanceled:['আমন্ত্রণ বাতিল','Invite cancelled'],
  ivErrName:['নাম লিখুন','Enter a name'], ivErrPhone:['১০ সংখ্যার মোবাইল নম্বর দিন','Enter a 10-digit mobile number'], ivErrDup:['এই নম্বরে আগেই আমন্ত্রণ আছে','There’s already an invite for this number'],
  ivRDoc:['ডাক্তার — নিজের রোগী, নোট, ছুটির পরামর্শ','Doctor — own patients, notes, discharge advice'], ivRNurse:['নার্স — রাউন্ড, ভাইটালস, ওষুধ, স্টক','Nurse — rounds, vitals, medicines, stock'], ivRRec:['রিসেপশন — ভর্তি, বিল, টাকা জমা','Reception — admissions, bills, payments'],
  atMark:['হাজিরা দিন','Mark'], atP:['উপস্থিত','Present'], atA:['অনুপস্থিত','Absent'], atL:['ছুটিতে','On leave'], atLate:['দেরি','Late'], atU:['শিফট আসেনি','Shift not started'], atH:['ছুটির দিন','Holiday'], atW:['সাপ্তাহিক ছুটি','Weekly off'],
  atIn:['ঢুকেছেন {t}','In at {t}'], atSum:['উপস্থিত {p} · দেরি {l} · ছুটিতে {v} · অনুপস্থিত {a}','Present {p} · late {l} · leave {v} · absent {a}'], atSaved:['{n} — {s}','{n} — {s}'],
  mnT:['{m} — হাজিরার খাতা','{m} — attendance register'], mnLegend:['P উপস্থিত · L ছুটি · A অনুপস্থিত · ½ দেরি · H ছুটির দিন · W সাপ্তাহিক ছুটি','P present · L leave · A absent · ½ late · H holiday · W weekly off'],
  mnStaff:['স্টাফ','Staff'], mnPres:['উপস্থিত','Present'], mnAbs:['অনুপস্থিত','Absent'], mnLeave:['ছুটি','Leave'], mnCsv:['CSV ডাউনলোড','Download CSV'],
  slT:['{m} মাসের বেতন','{m} salary'], slS:['হাজিরা থেকে নিজে হিসেব হয়। মাসে ২ দিন সবেতন ছুটি, তার বেশি ছুটি আর অনুপস্থিতির টাকা কাটে।','Worked out from attendance. 2 paid leave days a month; extra leave and absences are deducted.'],
  slBase:['মূল বেতন','Base salary'], slDays:['উপস্থিত দিন','Days present'], slDed:['কাটা','Deduction'], slAdv:['অগ্রিম','Advance'], slNet:['দেওয়ার টাকা','Net pay'], slSt:['অবস্থা','Status'],
  slPaid:['দেওয়া হয়েছে','Paid'], slDue:['বাকি','Due'], slPay:['বেতন দিন','Pay'], slTot:['মোট','Total'], slPaidDone:['{n}-এর বেতন {amt} দেওয়া হলো','Paid {amt} to {n}'], slAllPaid:['সবার বেতন দেওয়া হয়ে গেছে','All salaries paid'],
  slPayAll:['বাকি সবার বেতন দিন ({amt})','Pay all due ({amt})'], slMethod:['মাধ্যম','Method'], slCsv:['CSV ডাউনলোড','Download CSV'],
  sdPick:['কার বিবরণ দেখবেন?','Whose details?'], sdT:['বেতনের হিসেব — {m}','Salary breakdown — {m}'], sdPer:['দিনে','Per day'], sdWork:['কাজের দিন','Working days'], sdPaidL:['সবেতন ছুটি','Paid leave'], sdUnpaid:['বিনা বেতনের দিন','Unpaid days'],
  sdLateN:['দেরি','Late arrivals'], sdLateDed:['দেরির জন্য কাটা (৩ বার = আধ দিন)','Late deduction (3 lates = half day)'], sdAdvT:['অগ্রিম নেওয়া','Advance taken'], sdBank:['টাকা যাবে','Paid to'],
  sdSlip:['পে-স্লিপ প্রিন্ট / PDF','Print payslip / PDF'], sdHist:['আগের মাসগুলো','Earlier months'], sdJoined:['যোগ দিয়েছেন','Joined'], sdEarn:['আয়','Earnings'], sdDeds:['কাটা','Deductions'],
  hlT:['ছুটির দিন — {y}','Holidays — {y}'], hlS:['এই দিনগুলো হাজিরার খাতায় “H” হয়ে যায়। উৎসবের ছুটি (যেমন দুর্গাপূজা) তারিখ দেখে নিজে যোগ করুন।','These days show as “H” in the register. Add festival holidays (like Durga Puja) yourself once dates are fixed.'],
  hlName:['ছুটির নাম','Holiday name'], hlDate:['তারিখ','Date'], hlAdd:['ছুটি যোগ করুন','Add holiday'], hlPast:['গেছে','Past'], hlNext:['আসছে','Upcoming'], hlDays:['{n} দিন পরে','in {n} days'], hlAdded:['ছুটি যোগ হয়েছে','Holiday added'], hlErr:['নাম আর তারিখ দুটোই দিন','Enter both name and date'],
  hlRm:['সরান','Remove'], hlNat:['জাতীয়','National'], hlState:['রাজ্য','State'], hlOwn:['নিজের','Own'], hlWeekly:['সাপ্তাহিক ছুটি: রবিবার (শুধু অফিস স্টাফ — ওয়ার্ডে শিফট চলে)','Weekly off: Sunday (office staff only — ward shifts continue)'],
  bankT:['ব্যাঙ্ক ট্রান্সফার','Bank transfer'], aTeam:['টিমের অ্যাক্সেস বদল','Team access changed'], aInv:['আমন্ত্রণ পাঠানো','Invite sent'], aSal:['বেতন দেওয়া','Salary paid'], aAtt:['হাজিরা বদল','Attendance changed']
});
delete T.ivRoleHelp;
Object.assign(IC, {userx:'<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="m17 8 5 5M22 8l-5 5"/>', pause:'<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>', cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', wallet:'<path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z"/><circle cx="16" cy="14.5" r="1.3"/>'});
Object.assign(ATITLE, {team:'aTeam', inv:'aInv', sal:'aSal', att:'aAtt'}); Object.assign(ACAT, {team:'sys', inv:'sys', sal:'pay', att:'sys'});
Object.assign(aTone, {team:'red', inv:'blue', sal:'green', att:'grey'}); Object.assign(aIcon, {team:'userx', inv:'send', sal:'wallet', att:'cal'});

/* ---------- data (fictional) ---------- */
STAFF.forEach((s, i) => { s.id = 's' + (i + 1); s.base = {jDoc:42000, jNurse:18000, jRecep:14000, jAyah:9000, jHk:8500, jPh:15500}[s.j]; s.adv = [0, 0, 2000, 0, 0, 1500, 0, 0, 0, 0, 1000, 0][i] || 0; s.join = dateAgo(200 + i * 61); s.bank = i % 3 === 0 ? 'cash' : 'bank'; });
const TEAM = [
  {id:'u0', staff:'s1', role:'owner', st:'active', last:2, mail:'owner@shantiseva.example'},
  {id:'u1', staff:'s5', role:'reception', st:'active', last:5}, {id:'u2', staff:'s10', role:'reception', st:'active', last:60 * 20},
  {id:'u3', staff:'s2', role:'doctor', st:'active', last:35}, {id:'u4', staff:'s12', role:'doctor', st:'active', last:60 * 11},
  {id:'u5', staff:'s3', role:'nurse', st:'active', last:8}, {id:'u6', staff:'s4', role:'nurse', st:'active', last:22},
  {id:'u7', staff:'s9', role:'nurse', st:'deact', last:60 * 24 * 9}, {id:'u8', staff:'s11', role:'nurse', st:'active', last:60 * 13}
];
const INVITES = [{id:'i1', n:'মৌসুমী সর্দার', ph:'9000030209', role:'nurse', at:dateAgo(2), code:'NH-4K7Q'}];
let ivSeq = 2;
const stf = id => STAFF.find(s => s.id === id);
const HOL = [
  ['2026-01-23', ['নেতাজি জয়ন্তী', 'Netaji Jayanti'], 'st'], ['2026-01-26', ['প্রজাতন্ত্র দিবস', 'Republic Day'], 'nat'], ['2026-05-01', ['মে দিবস', 'May Day'], 'st'],
  ['2026-08-15', ['স্বাধীনতা দিবস', 'Independence Day'], 'nat'], ['2026-10-02', ['গান্ধী জয়ন্তী', 'Gandhi Jayanti'], 'nat'], ['2026-12-25', ['বড়দিন', 'Christmas'], 'nat'],
  ['2027-01-01', ['ইংরেজি নববর্ষ', 'New Year’s Day'], 'st'], ['2027-01-23', ['নেতাজি জয়ন্তী', 'Netaji Jayanti'], 'st'], ['2027-01-26', ['প্রজাতন্ত্র দিবস', 'Republic Day'], 'nat']
].map(([d, n, k]) => ({d:new Date(d + 'T12:00:00'), n, k}));
const isHol = d => HOL.some(h => ymd(h.d) === ymd(d));
/* attendance code for staff i on a date (deterministic sample; today comes from STAFF.st) */
const ATT_OVR = {};
function attCode(s, d){
  const k = ymd(d), td = ymd(TODAY), a = LV.attM && LV.attM[s.id + '|' + k];
  if (k > td) return '';
  if (s.join && k < s.join) return '';
  if (a) return a.status === 'half' ? '½' : a.status === 'leave' ? 'L' : a.status === 'absent' ? 'A' : 'P';
  if (isHol(d)) return 'H';
  if (s.wo != null && s.wo >= 0 && d.getDay() === s.wo) return 'W';
  return 'U';
}
function monthDays(y, m){ const n = new Date(y, m + 1, 0).getDate(); return Array.from({length:n}, (_, i) => new Date(y, m, i + 1, 12)); }
function salaryOf(s, y, m){
  const days = monthDays(y, m).filter(d => d <= TODAY || ymd(d) === ymd(TODAY)), c = {P:0, A:0, L:0, '½':0, H:0, W:0, U:0};
  days.forEach(d => { const x = attCode(s, d); if (x in c) c[x]++; });
  const tot = new Date(y, m + 1, 0).getDate(), per = Math.round(s.base / tot), paidL = Math.min(2, c.L), unpaid = c.A + Math.max(0, c.L - 2), lateDed = Math.floor(c['½'] / 3) * Math.round(per / 2);
  const ded = unpaid * per + lateDed, adv = (y === SPREV.y && m === SPREV.m) ? s.adv : 0;
  return {c, tot, per, paidL, unpaid, lateDed, ded, adv, net:Math.max(0, s.base - ded - adv), present:c.P + c['½']};
}
const SPREV = (() => { const d = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 15); return {y:d.getFullYear(), m:d.getMonth()}; })();
const SCUR = {y:TODAY.getFullYear(), m:TODAY.getMonth()};
const SALPAID = {}; STAFF.forEach((s, i) => { if (i % 4 !== 1) SALPAID[s.id] = {at:new Date(TODAY.getFullYear(), TODAY.getMonth(), 3 + (i % 4), 11), m:i % 3 === 0 ? 'cash' : 'bank'}; });
const monName = (y, m) => new Date(y, m, 15).toLocaleDateString(loc(), {month:'long', year:'numeric'});

/* ---------- view ---------- */
S.sfTab = 'team'; S.mnM = 'cur'; S.sdId = 's3'; S.iv = {n:'', ph:'', role:'nurse', err:''}; S.hl = {n:'', d:'', err:''};
const _vStaffToday = vStaff;
function vStaff2(){
  const tabs = [['team', 'sfTabTeam', 'users'], ['inv', 'sfTabInv', 'send'], ['today', 'sfTabToday', 'clock'], ['month', 'sfTabMonth', 'cal'], ['sal', 'sfTabSal', 'wallet'], ['sald', 'sfTabSalD', 'receipt'], ['hol', 'sfTabHol', 'sparkle']];
  const pend = pendingInv().length, dueSal = pyRows().filter(r => !r.paid && r.base > 0).length;
  const tb = `<div class="ptabs sftabs" role="tablist">${tabs.map(([k, l, i]) => `<button role="tab" class="ptab" data-act="sfTab" data-v="${k}" aria-selected="${S.sfTab === k}">${ic(i, 16)}${t(l)}${k === 'inv' && pend ? `<span class="cnt">${num(pend)}</span>` : ''}${k === 'sal' && dueSal ? `<span class="cnt">${num(dueSal)}</span>` : ''}</button>`).join('')}</div>`;
  const ph = `<div class="ph"><div><h1>${t('sfHubT')}</h1><p class="sub">${t('sfHubS')}</p></div><div class="ph-actions"><a class="btn btn-secondary sf-hr" href="${staffUrl(S.sfTab === 'sal' || S.sfTab === 'sald' ? 'payroll' : S.sfTab === 'hol' ? 'holidays' : 'staff')}">${ic('edit', 16)}${t('sfEditHr')}</a></div></div>`;
  if (S.sfTab === 'today') return ph + tb + attTodayBar() + attTodayCards();
  return ph + tb + ({team:sfTeam, inv:sfInvite, month:sfMonth, sal:sfSalary, sald:sfSalD, hol:sfHol}[S.sfTab])();
}
VIEWS.staff = vStaff2;
function attTodayBar(){
  const c = {P:0, '½':0, L:0, A:0, U:0}; STAFF.forEach(s => { const x = attCode(s, TODAY); if (x in c) c[x]++; });
  return `<p class="attsum">${ic('cal', 16)} ${fdate(TODAY, {weekday:'long', day:'numeric', month:'long'})} · ${t('atSum', {p:num(c.P), l:num(c['½']), v:num(c.L), a:num(c.A)})}${c.U ? ` · ${t('atNotMarked')} ${num(c.U)}` : ''}</p>`;
}
function attTodayCards(){
  if (!STAFF.length) return `<div class="card">${emptyState('users', t('atNoStaff'), t('atNoStaffS'), `<a class="btn btn-primary" href="${staffUrl('staff')}">${ic('plus')}${t('sfEditHr')}</a>`)}</div>`;
  return [['M', 'shM'], ['E', 'shE'], ['N', 'shN']].map(([k, l]) => { const L = STAFF.map((s, i) => [s, i]).filter(([s]) => s.sh === k); if (!L.length) return '';
    return `<div class="shift-h"><h2>${t(l)}</h2><span>${num(L.length)} ${S.lang === 'bn' ? 'জন' : (L.length === 1 ? 'person' : 'people')}</span></div>
    <div class="staff-grid">${L.map(([s, i]) => { const c = attCode(s, TODAY), a = LV.attM[s.id + '|' + ymd(TODAY)];
      const btns = s.self ? `<span class="st st-dis">${ic('lock', 12)} ${t('atSelf')}</span>${c !== 'L' && !(a && a.in_at) ? `<button type="button" data-act="attSet" data-id="${s.id}" data-v="L" aria-pressed="false" class="a-L">${t('atL')}</button>` : ''}`
        : [['P', 'atP'], ['½', 'atLate'], ['L', 'atL'], ['A', 'atA']].map(([v, kk]) => `<button type="button" data-act="attSet" data-id="${s.id}" data-v="${v}" aria-pressed="${c === v}" class="a-${v === '½' ? 'h' : v}">${t(kk)}</button>`).join('');
      return `<div class="card stf att"><span class="avatar av-${i % 5 + 1}" aria-hidden="true">${esc(stfIni(s))}</span>
      <div class="tt"><b>${esc(s.n[li()])}</b><span class="meta">${esc(s.jRaw || t(s.j))} · ${fmtShiftTime(String((s.row && s.row.duty_start) || '10:00').slice(0, 5))}</span>${s.ph ? `<br><a href="tel:+91${s.ph}" class="latin">${ic('phone', 14)}${fmtPhone(s.ph)}</a>` : ''}${a && a.in_at ? `<span class="meta att-in">${t('atIn', {t:tm(new Date(a.in_at))})}</span>` : ''}</div>
      <div class="attseg" role="group" aria-label="${t('atMark')} — ${esc(s.n[li()])}">${btns}${c === 'H' || c === 'W' ? `<span class="st st-dis">${t(c === 'H' ? 'atH' : 'atW')}</span>` : ''}</div></div>`; }).join('')}</div>`; }).join('');
}
const stfIni = s => { const x = String(s.n[li()] || '?').replace(/^(ডা\.|Dr\.?|সিস্টার|Sr\.?)\s*/i, '').trim() || '?'; return /[A-Za-z]/.test(x) ? x.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() : Array.from(x)[0]; };
const inTime = (s, c) => { const d = new Date(TODAY); const base = s.sh === 'M' ? 8 : s.sh === 'E' ? 14 : 20; d.setHours(base, c === '½' ? 35 : (parseInt(s.id.slice(1)) * 7) % 12, 0, 0); return tm(d); };
function sfTeam(){
  const L = teamList(), ini = n => { const x = String(n || '?').replace(/^(ডা\.|Dr\.?)\s*/i, '').trim() || '?'; return /[A-Za-z]/.test(x) ? x.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() : Array.from(x)[0]; };
  return `<section class="card flush"><div class="card-h"><h2>${t('tmT2')}</h2><span class="meta">${num(L.length)}</span></div>
    <div class="tmrow tmrh" aria-hidden="true"><span>${t('ivName')}</span><span>${t('tmRole')}</span><span>${t('tmContact')}</span><span>${t('tmLast')}</span><span>${t('tmStatus')}</span><span></span></div>
    ${L.map((u, i) => { const own = u.role === 'owner';
      return `<div class="tmrow ${u.st !== 'active' ? 'off' : ''}">
        <span class="tm-n"><span class="avatar av-${i % 5 + 1}" aria-hidden="true">${esc(ini(u.n))}</span><span><b>${esc(u.n)}</b>${own ? `<small>${t('homeName')}</small>` : ''}</span></span>
        <span><span class="rchip r-${u.role === 'pharmacist' || u.role === 'lab' ? 'nurse' : u.role}">${roleT(u.role)}</span></span>
        <span class="latin tm-ph"><span class="lm">${t('tmContact')}</span>${u.ph ? fmtPhone(u.ph) : '—'}${u.mail ? `<small>${esc(u.mail)}</small>` : ''}</span>
        <span class="tm-l"><span class="lm">${t('tmLast')}</span>${u.at ? fdate(u.at, {day:'numeric', month:'short', year:'numeric'}) : '—'}</span>
        <span><span class="st ${u.st === 'active' ? 'st-paid' : 'st-pending'}">${t(u.st === 'active' ? 'tmActive' : 'tmDeact')}</span></span>
        <span class="tm-a">${own ? `<span class="tm-own">${ic('lock', 14)}${t('tmOwnerNote')}</span>` : `${u.st === 'active' ? `<button class="btn btn-secondary btn-sm" data-act="tmDeact" data-id="${u.id}">${ic('pause', 15)}${t('tmDeactBtn')}</button>` : `<button class="btn btn-secondary btn-sm" data-act="tmReact" data-id="${u.id}">${ic('check', 15)}${t('tmReactBtn')}</button>`}<button class="btn btn-ghost btn-sm tm-rev" data-act="tmRevoke" data-id="${u.id}">${ic('userx', 15)}${t('tmRevokeBtn')}</button>`}</span>
      </div>`; }).join('')}
    ${L.filter(u => u.role !== 'owner').length ? '' : `<p class="nf-none">${t('tmNone')}</p>`}
    <p class="pl-foot" style="text-align:left;display:flex;gap:6px;align-items:flex-start">${ic('info', 14)}${t('tmDeactHelp')}</p></section>`;
}
function sfInvite(){
  const f = S.iv, roles = invRoles(), P2 = pendingInv(); if (!roles.some(r => r[0] === f.role)) f.role = 'reception';
  return `<div class="sf2"><section class="card setc"><div class="setc-h"><span class="setc-ic">${ic('send', 20)}</span><div><h2>${t('ivT')}</h2><p>${t('ivS')}</p></div></div>
    <div class="row2"><div class="field"><label for="iv-n">${t('ivName')}</label><input id="iv-n" class="input" data-iv="n" value="${esc(f.n)}" autocomplete="off"></div>
    <div class="field"><label for="iv-p">${t('ivPhone')}</label><div class="pre"><span>+91</span><input id="iv-p" class="input latin" inputmode="numeric" maxlength="10" data-iv="ph" value="${esc(f.ph)}"></div></div></div>
    <div class="field"><span class="lab">${t('ivRole')}</span><div class="ivroles">${roles.map(([k, l, d, i]) => `<button type="button" class="shmo" data-act="ivRole" data-v="${k}" aria-pressed="${f.role === k}"><span class="mi">${ic(i, 20)}</span><span><b>${t(l)}</b><small>${t(d)}</small></span></button>`).join('')}</div></div>
    ${f.err ? `<p class="setmsg bad">${ic('alert', 15)}${t(f.err)}</p>` : ''}
    <button class="btn btn-primary btn-lg btn-block" data-act="ivSend">${ic('send')}${t('ivSend')}</button></section>
    <section class="card flush"><div class="card-h"><h2>${t('ivPending')}</h2><span class="meta">${num(P2.length)}</span></div>
    ${P2.length ? P2.map(v => { const at = v.created_at ? new Date(v.created_at) : null, left = v.expires_at ? Math.max(0, Math.ceil((new Date(v.expires_at) - Date.now()) / DAY)) : null, rk = v.dept_role || roleKey(v.role);
      return `<div class="iss"><span class="sk-ic c-cons">${ic('send', 18)}</span><div class="tt"><b>${esc(v.label || '—')} · <span class="rchip r-${rk === 'pharmacist' || rk === 'lab' ? 'nurse' : rk}">${roleT(rk)}</span></b>${v.phone ? `<span class="latin">${fmtPhone(digits10(v.phone))}</span> ` : ''}<span>· ${t('ivSentAgo', {w:at ? whenTxt(agoD(at)) : '—', d:left != null ? t('ivLeft', {d:num(left)}) : ''})} · ${t('ivCode')} <b class="latin">${esc(v.code)}</b></span></div>${v.phone ? `<button class="btn btn-secondary btn-sm" data-act="ivResend" data-id="${esc(v.code)}">${t('ivResend')}</button>` : ''}<button class="btn btn-ghost btn-sm" data-act="ivCancel" data-id="${esc(v.code)}">${t('ivCancel')}</button></div>`; }).join('') : `<p class="nf-none">${t('ivNone')}</p>`}</section></div>`;
}
function sfMonth(){
  const M = S.mnM === 'prev' ? SPREV : SCUR, days = monthDays(M.y, M.m);
  const cell = x => x ? `<td class="ac a-${{P:'P', A:'A', L:'L', '½':'h', H:'H', W:'W', U:'U'}[x]}">${x === 'U' ? '·' : x}</td>` : '<td class="ac"></td>';
  return `<div class="mnbar"><div class="seg">${[['prev', SPREV], ['cur', SCUR]].map(([k, x]) => `<button data-act="mnM" data-v="${k}" aria-pressed="${S.mnM === k}">${monName(x.y, x.m)}</button>`).join('')}</div><button class="btn btn-ghost btn-sm" data-act="mnCsv">${ic('download', 16)}${t('mnCsv')}</button></div>
  <section class="card flush"><div class="card-h"><h2>${t('mnT', {m:monName(M.y, M.m)})}</h2></div>
    <div class="mnw"><table class="mnt"><thead><tr><th class="mn-n">${t('mnStaff')}</th>${days.map(d => `<th class="${d.getDay() === 0 ? 'sun' : ''} ${ymd(d) === ymd(TODAY) ? 'tod' : ''}"><span>${num(d.getDate())}</span><small>${d.toLocaleDateString(loc(), {weekday:'narrow'})}</small></th>`).join('')}<th>${t('mnPres')}</th><th>${t('mnLeave')}</th><th>${t('mnAbs')}</th></tr></thead>
    <tbody>${STAFF.map(s => { const c = {P:0, A:0, L:0, '½':0}; const tds = days.map(d => { const x = attCode(s, d); if (x in c) c[x]++; return cell(x); }).join('');
      return `<tr><th class="mn-n"><b>${esc(s.n[li()])}</b><small>${t(s.j)}</small></th>${tds}<td class="tot">${num(c.P + c['½'])}</td><td class="tot">${num(c.L)}</td><td class="tot ${c.A ? 'bad' : ''}">${num(c.A)}</td></tr>`; }).join('')}</tbody></table></div>
    <p class="pl-foot" style="text-align:left">${t('mnLegend')}</p></section>`;
}
function sfSalary(){
  if (LV.pyr === null) return `<div class="card">${emptyState('wallet', t('slNoPay'), esc(LV.pyrErr || ''), '')}</div>`;
  const L = pyRows(), due = L.filter(r => !r.paid && r.base > 0), dueAmt = due.reduce((a, r) => a + r.net, 0), tot = L.reduce((a, r) => a + r.net, 0), unm = L.filter(r => r.unm && !r.paid);
  return `<div class="ph2"><div><h2>${t('slT', {m:monName(SPREV.y, SPREV.m)})}</h2><p class="sub">${t('slS')}</p></div><div class="ph-actions">${due.length ? `<button class="btn btn-primary" data-act="slPayAll">${ic('wallet')}${t('slPayAll', {amt:money(dueAmt)})}</button>` : L.length ? `<span class="st st-paid">${t('slAllPaid')}</span>` : ''}<button class="btn btn-ghost btn-sm" data-act="slCsv">${ic('download', 16)}${t('slCsv')}</button></div></div>
  ${unm.length ? `<p class="setmsg bad" style="margin-bottom:12px">${ic('alert', 15)}${t('slUnmWarn')}</p>` : ''}
  <section class="card flush">${L.length ? `<div class="slrow slh" aria-hidden="true"><span>${t('mnStaff')}</span><span class="r">${t('slBase')}</span><span class="r">${t('slDays')}</span><span class="r">${t('slDed')}</span><span class="r">${t('slAdv')}</span><span class="r">${t('slNet')}</span><span>${t('slSt')}</span><span></span></div>
    ${L.map(r => `<div class="slrow"><button class="sl-n" data-act="sdOpen" data-id="${r.id}"><b>${esc(r.name)}</b><small>${esc(r.des)}${r.unm && !r.paid ? ` · ${t('slUnm', {n:num(r.unm)})}` : ''}</small></button>
        <span class="r"><span class="lm">${t('slBase')}</span>${r.base ? money(r.base) : `<span class="mut">${t('slNoSal')}</span>`}</span><span class="r"><span class="lm">${t('slDays')}</span>${num(r.present)} / ${num(r.dim)}</span>
        <span class="r ${r.ded ? 'neg' : ''}"><span class="lm">${t('slDed')}</span>${r.ded ? '−' + money(r.ded) : '—'}</span><span class="r ${r.adv ? 'neg' : ''}"><span class="lm">${t('slAdv')}</span>${r.adv ? '−' + money(r.adv) : '—'}</span>
        <span class="r sl-net"><span class="lm">${t('slNet')}</span><b>${money(r.net)}</b></span>
        <span>${!r.base && !r.paid ? '' : r.paid ? `<span class="st st-paid">${t('slPaid')}</span><small class="sl-when">${r.s.paid_on ? fdate(new Date(r.s.paid_on + 'T12:00:00'), {day:'numeric', month:'short'}) : ''} · ${t(r.s.pay_mode === 'bank' ? 'bankT' : r.s.pay_mode || 'cash')}</small>` : `<span class="st st-pending">${t('slDue')}</span>`}</span>
        <span class="sl-a">${r.paid ? `<button class="btn btn-ghost btn-sm" data-act="slUnpay" data-s="${r.s.id}">${t('slUndo')}</button>` : r.base ? `<button class="btn btn-secondary btn-sm" data-act="slPay" data-id="${r.id}">${t('slPay')}</button>` : `<a class="btn btn-ghost btn-sm" href="${staffUrl('staff')}">${t('sfEditHr')}</a>`}</span></div>`).join('')}
    <div class="slrow sltot"><span><b>${t('slTot')}</b></span><span class="r">${money(L.reduce((a, r) => a + r.base, 0))}</span><span></span><span></span><span></span><span class="r"><b>${money(tot)}</b></span><span></span><span></span></div>` : `<p class="nf-none">${t('slNoStaff')}</p>`}</section>`;
}
function sfSalD(){
  const L = pyRows(); if (!STAFF.length && !L.length) return `<div class="card">${emptyState('wallet', t('slNoStaff'), '', '')}</div>`;
  if (!L.some(r => r.id === S.sdId)) S.sdId = (L[0] || STAFF[0] || {}).id;
  const r = L.find(z => z.id === S.sdId), s = STAFF.find(z => z.id === S.sdId) || {n:two(r ? r.name : '—'), j:'jOther'}, c = {P:0, '½':0, L:0, A:0};
  if (s.id) monthDays(SCUR.y, SCUR.m).forEach(d => { const x = attCode(s, d); if (x in c) c[x]++; });
  const row = (k, v, cls) => `<div class="sdr ${cls || ''}"><span>${k}</span><b>${v}</b></div>`, opts = (L.length ? L.map(z => [z.id, z.name, z.des]) : STAFF.map(z => [z.id, z.n[li()], z.jRaw || '']));
  return `<div class="sdw"><div class="field sdpick"><label for="sdSel">${t('sdPick')}</label><select id="sdSel" class="input">${opts.map(([id, n, d]) => `<option value="${id}" ${id === S.sdId ? 'selected' : ''}>${esc(n)}${d ? ' · ' + esc(d) : ''}</option>`).join('')}</select></div>
  <div class="sdg">${r ? `<section class="card setc"><div class="setc-h"><span class="setc-ic">${ic('wallet', 20)}</span><div><h2>${t('sdT', {m:monName(SPREV.y, SPREV.m)})}</h2><p>${esc(r.name)}${r.des ? ' · ' + esc(r.des) : ''}${s.join ? ` · ${t('sdJoined')} ${fdate(new Date(s.join + 'T12:00:00'), {month:'short', year:'numeric'})}` : ''}</p></div>${r.paid ? `<span class="st st-paid">${t('slPaid')}</span>` : `<span class="st st-pending">${t('slDue')}</span>`}</div>
    <div class="sdc"><div><h3>${t('sdEarn')}</h3>${row(t('slBase'), money(r.base))}${row(t('sdWork'), num(r.dim))}${row(t('slDays'), num(r.present))}${row(t('atL'), num(Number(r.x.leave) || 0))}${r.bon ? row(t('sdBonus'), money(r.bon)) : ''}</div>
    <div><h3>${t('sdDeds')}</h3>${row(t('sdUnpaid') + ` (${num((Number(r.x.absent) || 0) + r.unm)})`, r.ded ? '−' + money(r.ded) : '—', r.ded ? 'neg' : '')}${row(t('sdAdvT'), r.adv ? '−' + money(r.adv) : '—', r.adv ? 'neg' : '')}${r.oth ? row(t('sdOther'), '−' + money(r.oth), 'neg') : ''}</div></div>
    <div class="sdnet"><span>${t('slNet')}</span><b>${money(r.net)}</b></div>
    ${r.paid ? `<p class="hint">${t('sdBank')}: ${t(r.s.pay_mode === 'bank' ? 'bankT' : r.s.pay_mode || 'cash')}${r.s.paid_on ? ` · ${fdate(new Date(r.s.paid_on + 'T12:00:00'), {day:'numeric', month:'short'})}` : ''}</p>` : ''}
    <div class="setbtns"><button class="btn btn-primary grow" data-act="sdSlip">${ic('download')}${t('sdSlip')}</button>${r.paid || !r.base ? '' : `<button class="btn btn-secondary" data-act="slPay" data-id="${r.id}">${t('slPay')}</button>`}</div></section>` : `<section class="card">${emptyState('wallet', LV.pyr === null ? t('slNoPay') : t('slNoSal'), '', '')}</section>`}
  <section class="card setc"><div class="setc-h"><span class="setc-ic">${ic('cal', 20)}</span><div><h2>${monName(SCUR.y, SCUR.m)}</h2><p>${t('sfTabMonth')}</p></div></div>
    <div class="sdmini">${[['P', 'atP', c.P], ['½', 'atLate', c['½']], ['L', 'atL', c.L], ['A', 'atA', c.A]].map(([k, l, n]) => `<div class="a-${k === '½' ? 'h' : k}"><b>${num(n)}</b><span>${t(l)}</span></div>`).join('')}</div>
    <p class="hint">${t('slS')}</p></section></div></div>`;
}
function sfHol(){
  const y = TODAY.getFullYear(), L = HOL.slice().sort((a, b) => a.d - b.d), f = S.hl, names = S.lang === 'bn' ? ['দুর্গাপূজা', 'কালীপূজা', 'দীপাবলি', 'হোলি', 'ঈদ', 'বড়দিন', 'পয়লা বৈশাখ', 'স্বাধীনতা দিবস', 'প্রজাতন্ত্র দিবস'] : ['Durga Puja', 'Kali Puja', 'Diwali', 'Holi', 'Eid', 'Christmas', 'Poila Boishakh', 'Independence Day', 'Republic Day'];
  return `<div class="sf2"><section class="card flush"><div class="card-h"><h2>${t('hlT', {y:num(y) + '–' + num(y + 1).slice(-2)})}</h2><span class="meta">${num(L.length)}</span></div>
    ${L.length ? L.map(h => { const dd = Math.round((h.d - TODAY) / DAY), past = h.day < ymd(TODAY);
      return `<div class="iss ${past ? 'hpast' : ''}"><span class="hdate"><b>${num(h.d.getDate())}</b><small>${h.d.toLocaleDateString(loc(), {month:'short'})}</small></span><div class="tt"><b>${esc(h.n[li()])}</b><span>${h.d.toLocaleDateString(loc(), {weekday:'long', year:'numeric'})}</span></div>${past ? `<span class="st st-dis">${t('hlPast')}</span>` : `<span class="st st-paid">${h.day === ymd(TODAY) ? t('auToday') : t('hlDays', {n:num(Math.max(1, dd))})}</span>`}<button class="btn btn-ghost btn-sm" data-act="hlRm" data-i="${HOL.indexOf(h)}">${t('hlRm')}</button></div>`; }).join('') : `<p class="nf-none">${t('hlNone')}</p>`}
    <p class="pl-foot" style="text-align:left">${t('hlWeekly')}</p></section>
    <section class="card setc"><div class="setc-h"><span class="setc-ic">${ic('sparkle', 20)}</span><div><h2>${t('hlAdd')}</h2><p>${t('hlS')}</p></div></div>
      <div class="field"><label for="hl-n">${t('hlName')}</label><input id="hl-n" class="input" data-hl="n" value="${esc(f.n)}" placeholder="${S.lang === 'bn' ? 'যেমন: দুর্গাপূজা (অষ্টমী)' : 'e.g. Durga Puja (Ashtami)'}"><div class="chips" style="margin-top:8px">${names.map(n => `<button type="button" class="chip" data-act="hlName" data-v="${esc(n)}" aria-pressed="${f.n === n}">${esc(n)}</button>`).join('')}</div></div>
      <div class="field"><label for="hl-d">${t('hlDate')}</label><input id="hl-d" class="input" type="date" data-hl="d" value="${esc(f.d)}"></div>
      ${f.err ? `<p class="setmsg bad">${ic('alert', 15)}${t(f.err)}</p>` : ''}
      <button class="btn btn-primary btn-lg btn-block" data-act="hlAdd">${ic('plus')}${t('hlAdd')}</button></section></div>`;
}
function payslipHtml(r){
  const s = STAFF.find(z => z.id === r.id) || {}, row = (a, b) => `<tr><td>${a}</td><td class="r">${b}</td></tr>`;
  return `<!doctype html><html><head><meta charset="utf-8"><title>Payslip ${esc(r.name)}</title><style>@page{size:A5;margin:12mm}body{font-family:"Noto Sans Bengali","IBM Plex Sans",Arial,sans-serif;color:#14201b;font-size:12px;margin:0}h1{font-size:17px;margin:0;color:#0b4f3a}.mut{color:#5b6b64}.top{display:flex;justify-content:space-between;border-bottom:2px solid #12976A;padding-bottom:8px;margin-bottom:10px}h2{font-size:14px;margin:0;text-align:right}table{width:100%;border-collapse:collapse;margin-top:6px}td,th{padding:6px 4px;border-bottom:1px solid #e3e8e5;text-align:left}.r{text-align:right}.g{display:grid;grid-template-columns:1fr 1fr;gap:14px}.net{margin-top:12px;padding:10px;border:2px solid #12976A;border-radius:6px;display:flex;justify-content:space-between;font-size:15px;font-weight:700}.sig{margin-top:36px;display:flex;justify-content:space-between}.sig div{border-top:1px solid #999;padding-top:4px;width:40%;text-align:center}</style></head><body>
  <div class="top"><div><h1>${t('homeName')}</h1><div class="mut">${esc(FAC.addr)}</div></div><div><h2>PAYSLIP</h2><div class="mut" style="text-align:right">${monName(SPREV.y, SPREV.m)}</div></div></div>
  <table><tr><td>${t('ivName')}</td><td><b>${esc(r.name)}</b></td><td>${t('tmRole')}</td><td>${esc(r.des || '—')}</td></tr><tr><td>${t('sdJoined')}</td><td>${s.join ? fdate(new Date(s.join + 'T12:00:00'), {day:'numeric', month:'short', year:'numeric'}) : '—'}</td><td>${t('sdWork')}</td><td>${num(r.dim)}</td></tr></table>
  <div class="g"><table><tr><th>${t('sdEarn')}</th><th class="r"></th></tr>${row(t('slBase'), money(r.base))}${row(t('slDays'), num(r.present))}${row(t('atL'), num(Number(r.x.leave) || 0))}${r.bon ? row(t('sdBonus'), money(r.bon)) : ''}</table>
  <table><tr><th>${t('sdDeds')}</th><th class="r"></th></tr>${row(t('sdUnpaid') + ' (' + num((Number(r.x.absent) || 0) + r.unm) + ')', money(r.ded))}${row(t('sdAdvT'), money(r.adv))}${r.oth ? row(t('sdOther'), money(r.oth)) : ''}</table></div>
  <div class="net"><span>${t('slNet')}</span><span>${money(r.net)}</span></div><p class="mut">${r.paid ? `${t('slPaid')}${r.s.paid_on ? ' · ' + fdate(new Date(r.s.paid_on + 'T12:00:00'), {day:'numeric', month:'long', year:'numeric'}) : ''} · ${t(r.s.pay_mode === 'bank' ? 'bankT' : r.s.pay_mode || 'cash')}` : t('slDue')}</p>
  <div class="sig"><div>${S.lang === 'bn' ? 'স্টাফের সই' : 'Staff signature'}</div><div>${SIGN.img ? `<img src="${SIGN.img}" style="max-height:40px;display:block;margin:0 auto">` : ''}Authorised Signatory</div></div><p class="mut" style="font-size:10px;text-align:center;margin-top:14px">AuraScale OS</p></body></html>`;
}
function printDoc(html){ const f = $('printFrame'); f.onload = () => setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { toast(t('billBlocked'), 'info'); } }, 400); f.srcdoc = html; toast(t('billPreparing'), 'info'); }
function mRevoke(m){ const u = teamList().find(x => x.id === m.id) || {n:'—'}; return {title:t('tmRevT'), sub:t('tmRevS', {n:esc(u.n)}), body:`<p class="setmsg bad">${ic('alert', 15)}${t('tmDeactHelp')}</p>`, foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-danger btn-lg grow" data-act="tmRevGo" style="background:var(--danger);color:#fff">${ic('userx')}${t('tmRevGo')}</button>`}; }
function extraHandlers10(){
  const keepFocus = sel => { const b = ROOT.querySelector(sel); b && b.focus({preventScroll:true}); };
  Object.assign(H, {
    sfTab: el => { S.sfTab = el.dataset.v; renderMain(); keepFocus(`.sftabs [data-v="${el.dataset.v}"]`); },
    attSet: el => { const s = stf(el.dataset.id), v = el.dataset.v, k = s.id + '|' + ymd(TODAY), prev = attCode(s, TODAY); if (prev === v) return; ATT_OVR[k] = v; s.st = {P:'present', '½':'late', L:'leave', A:'absent'}[v];
      audit({act:'att', d:{who:s.n.slice(), from:prev, to:v}}); renderMain(); keepFocus(`[data-act="attSet"][data-id="${s.id}"][data-v="${v}"]`); toast(t('atSaved', {n:esc(s.n[li()]), s:t({P:'atP', '½':'atLate', L:'atL', A:'atA'}[v])})); },
    tmDeact: el => { const u = TEAM.find(x => x.id === el.dataset.id), s = stf(u.staff); u.st = 'deact'; audit({act:'team', d:{who:s.n.slice(), role:u.role, from:'tmActive', to:'tmDeact'}}); renderMain(); toast(t('tmDeactDone', {n:esc(s.n[li()])}), 'success', {label:t('undo'), fn:() => { u.st = 'active'; renderMain(); toast(t('undone'), 'info'); }}); },
    tmReact: el => { const u = TEAM.find(x => x.id === el.dataset.id), s = stf(u.staff); u.st = 'active'; audit({act:'team', d:{who:s.n.slice(), role:u.role, from:'tmDeact', to:'tmActive'}}); renderMain(); toast(t('tmReactDone', {n:esc(s.n[li()])})); },
    tmRevoke: el => openModal({type:'revoke', id:el.dataset.id}),
    tmRevGo: () => { const u = TEAM.find(x => x.id === S.modal.id), s = stf(u.staff), from = u.st; u.st = 'revoked'; u.last = null; closeModal(); audit({act:'team', d:{who:s.n.slice(), role:u.role, from:from === 'deact' ? 'tmDeact' : 'tmActive', to:'tmRevoked'}}); renderMain(); toast(t('tmRevDone', {n:esc(s.n[li()])})); },
    ivRole: el => { S.iv.role = el.dataset.v; renderMain(); keepFocus(`[data-act="ivRole"][data-v="${el.dataset.v}"]`); },
    ivSend: () => { const f = S.iv, ph = f.ph.replace(/\D/g, ''); f.err = !f.n.trim() ? 'ivErrName' : ph.length !== 10 ? 'ivErrPhone' : INVITES.some(v => v.ph === ph) ? 'ivErrDup' : '';
      if (f.err) { renderMain(); return; }
      const v = {id:'i' + (ivSeq++), n:f.n.trim(), ph, role:f.role, at:new Date(), code:'NH-' + Math.random().toString(36).slice(2, 6).toUpperCase()}; INVITES.unshift(v); S.iv = {n:'', ph:'', role:f.role, err:''};
      audit({act:'inv', d:{who:[v.n, v.n], role:v.role, ph}}); renderMain(); toast(t('ivSent', {n:esc(v.n)})); },
    ivResend: el => { const v = INVITES.find(x => x.id === el.dataset.id); v.at = new Date(); renderMain(); toast(t('ivResent')); },
    ivCancel: el => { const k = INVITES.findIndex(x => x.id === el.dataset.id); const v = INVITES.splice(k, 1)[0]; renderMain(); toast(t('ivCanceled'), 'success', {label:t('undo'), fn:() => { INVITES.splice(k, 0, v); renderMain(); }}); },
    mnM: el => { S.mnM = el.dataset.v; renderMain(); },
    mnCsv: () => { const M = S.mnM === 'prev' ? SPREV : SCUR, days = monthDays(M.y, M.m); dlText(`attendance-${M.y}-${M.m + 1}.csv`, '﻿' + [['staff', 'role'].concat(days.map(d => d.getDate()))].concat(STAFF.map(s => [s.n[1], s.j.slice(1)].concat(days.map(d => attCode(s, d))))).map(r => r.join(',')).join('\n')); },
    slPay: el => { const s = stf(el.dataset.id), x = salaryOf(s, SPREV.y, SPREV.m); SALPAID[s.id] = {at:new Date(), m:s.bank}; audit({act:'sal', amt:x.net, d:{who:s.n.slice(), month:monName(SPREV.y, SPREV.m), m:s.bank}}); renderMain(); toast(t('slPaidDone', {n:esc(s.n[li()]), amt:money(x.net)}), 'success', {label:t('undo'), fn:() => { delete SALPAID[s.id]; renderMain(); }}); },
    slPayAll: () => { const due = STAFF.filter(s => !SALPAID[s.id]); let tot = 0; due.forEach(s => { const x = salaryOf(s, SPREV.y, SPREV.m); tot += x.net; SALPAID[s.id] = {at:new Date(), m:s.bank}; audit({act:'sal', amt:x.net, d:{who:s.n.slice(), month:monName(SPREV.y, SPREV.m), m:s.bank}}); }); renderMain(); toast(t('slAllPaid') + ' · ' + money(tot)); },
    slCsv: () => dlText(`salary-${SPREV.y}-${SPREV.m + 1}.csv`, '﻿' + [['staff', 'role', 'base', 'present', 'deduction', 'advance', 'net', 'status']].concat(STAFF.map(s => { const x = salaryOf(s, SPREV.y, SPREV.m); return [s.n[1], s.j.slice(1), s.base, x.present, x.ded, x.adv, x.net, SALPAID[s.id] ? 'paid' : 'due']; })).map(r => r.join(',')).join('\n')),
    sdOpen: el => { S.sdId = el.dataset.id; S.sfTab = 'sald'; renderMain(); window.scrollTo(0, 0); },
    sdSlip: () => printDoc(payslipHtml(stf(S.sdId))),
    hlAdd: () => { const f = S.hl; if (!f.n.trim() || !f.d) { f.err = 'hlErr'; renderMain(); return; } HOL.push({d:new Date(f.d + 'T12:00:00'), n:[f.n.trim(), f.n.trim()], k:'own'}); S.hl = {n:'', d:'', err:''}; renderMain(); toast(t('hlAdded')); },
    hlRm: el => { HOL.splice(+el.dataset.i, 1); renderMain(); }
  });
  ROOT.addEventListener('input', e => { const el = e.target; if (el.dataset.iv) S.iv[el.dataset.iv] = el.value; if (el.dataset.hl) S.hl[el.dataset.hl] = el.value; });
  ROOT.addEventListener('change', e => { if (e.target.id === 'sdSel') { S.sdId = e.target.value; renderMain(); } });
  const _ad = aDetails; aDetails = function(e){ const d = e.d || {};
    if (e.act === 'team') return [[t('ivName'), `<b>${esc(L2(d.who))}</b>`], [t('tmRole'), t({owner:'rOwner', reception:'rReception', doctor:'rDoctor', nurse:'rNurse'}[d.role])], [t('fFrom'), t(d.from)], [t('fTo'), `<b>${t(d.to)}</b>`]];
    if (e.act === 'inv') return [[t('ivName'), `<b>${esc(L2(d.who))}</b>`], [t('tmRole'), t({reception:'rReception', doctor:'rDoctor', nurse:'rNurse'}[d.role])], [t('ivPhone'), `<span class="latin">${fmtPhone(d.ph)}</span>`]];
    if (e.act === 'sal') return [[t('ivName'), `<b>${esc(L2(d.who))}</b>`], [t('fAmt'), `<b>${money(e.amt)}</b>`], [t('slT', {m:''}).trim(), esc(d.month)], [t('slMethod'), t(d.m === 'bank' ? 'bankT' : 'cash')]];
    if (e.act === 'att') return [[t('ivName'), `<b>${esc(L2(d.who))}</b>`], [t('fFrom'), esc(d.from || '—')], [t('fTo'), `<b>${esc(d.to)}</b>`]];
    return _ad(e); };
}

/* =================== v11: ACCOUNTS & REPORTS (owner) =================== */
Object.assign(T, {
  navAcc:['হিসাব ও রিপোর্ট','Accounts & reports'],
  acT:['হিসাব ও রিপোর্ট','Accounts & reports'], acSub:['আয়, খরচ, লাভ, বকেয়া আর দৈনিক রিপোর্ট — এক জায়গায়','Income, expenses, profit, dues and the daily report — in one place'],
  acTabSum:['সারাংশ','Overview'], acTabInc:['আয় (জমা)','Collections'], acTabExp:['খরচ','Expenses'], acTabPl:['লাভ-ক্ষতি','Profit & loss'], acTabDue:['বকেয়া','Dues'], acTabGst:['GST সারাংশ','GST summary'], acTabDay:['রাত ৮টার রিপোর্ট','8 PM report'], acTabRate:['রেট লিস্ট','Rate list'],
  acPer:['সময়','Period'], acToday:['আজ','Today'], ac7:['গত ৭ দিন','Last 7 days'], ac30:['গত ৩০ দিন','Last 30 days'], acMonth:['এই মাস','This month'],
  acCollected:['জমা হয়েছে','Collected'], acBilled:['বিল হয়েছে','Billed'], acSpent:['খরচ','Expenses'], acNet:['হাতে রইল (জমা − খরচ)','Net cash (collected − spent)'], acOut:['মোট বকেয়া','Total outstanding'],
  acByM:['মাধ্যম অনুযায়ী জমা','Collections by method'], acDaily:['দিন অনুযায়ী জমা ও খরচ','Daily collections & expenses'], acTopDue:['সবচেয়ে বেশি বকেয়া','Largest dues'],
  acColIn:['জমা','In'], acColOut:['খরচ','Out'], acRcpt:['রসিদ','Receipt'], acNone:['এই সময়ে কিছু নেই','Nothing in this period'],
  exAdd:['খরচ যোগ করুন','Add expense'], exCat:['ধরন','Category'], exAmt:['টাকা (₹)','Amount (₹)'], exDate:['তারিখ','Date'], exM:['মাধ্যম','Method'], exNote:['বিবরণ (ঐচ্ছিক)','Notes (optional)'], exSave:['খরচ সংরক্ষণ করুন','Save expense'], exSaved:['খরচ {amt} যোগ হয়েছে','Expense {amt} added'], exErr:['টাকার পরিমাণ লিখুন','Enter the amount'],
  ecStaff:['স্টাফ বেতন','Staff salary'], ecSup:['ওষুধ ও সামগ্রী','Medicines & supplies'], ecUtil:['বিদ্যুৎ, জল, গ্যাস','Electricity, water, gas'], ecMaint:['মেরামত','Maintenance'], ecRent:['ভাড়া','Rent'], ecOxy:['অক্সিজেন রিফিল','Oxygen refill'], ecFood:['রোগীর খাবার','Patient food'], ecOther:['অন্যান্য','Other'],
  plRev:['আয় (বিল অনুযায়ী)','Revenue (as billed)'], plExp:['খরচ','Expenses'], plNet:['লাভ','Profit'], plLoss:['ক্ষতি','Loss'], plMargin:['লাভের হার {p}%','Margin {p}%'], plNote:['বিল হওয়া টাকা ধরে হিসেব; বকেয়া এখনও জমা হয়নি।','Based on billed amounts; dues are not yet collected.'],
  duB:['বয়স অনুযায়ী বকেয়া','Dues by age'], du0:['০–৭ দিন','0–7 days'], du1:['৮–৩০ দিন','8–30 days'], du2:['৩০ দিনের বেশি','Over 30 days'], duIn:['ভর্তি আছেন','In hospital'], duOut:['ছুটি হয়ে গেছে','Discharged'], duCall:['ফোন','Call'],
  gsT:['এই সময়ের GST','GST for this period'], gsExempt:['GST-মুক্ত চিকিৎসা (SAC 9993)','Exempt healthcare (SAC 9993)'], gsTax:['করযোগ্য','Taxable'], gsTaxAmt:['GST আদায়','GST collected'], gsNote:['আপনার কোনো ওয়ার্ডের ভাড়া দিনে ₹৫,০০০-এর বেশি নয়, তাই রুম ভাড়ায় GST লাগেনি। নিয়ম বদলাতে সেটিংস → GST নিয়ম।','No ward costs more than ₹5,000 a day, so no GST on room rent. Change rules in Settings → GST rules.'], gsGstin:['GSTIN','GSTIN'], gsNoGstin:['GSTIN দেওয়া নেই — বিল “Final Bill” হিসেবে যাচ্ছে','No GSTIN — bills go out as “Final Bill”'],
  drT:['রোজ রাত ৮টায় মালিকের হোয়াটসঅ্যাপে যা যায়','What goes to the owner’s WhatsApp at 8 PM daily'], drOn:['রাত ৮টার রিপোর্ট চালু','8 PM report on'], drTo:['যাবে: {n}','Sends to: {n}'], drChange:['নম্বর বদলান','Change number'], drTest:['এখন একটা পাঠিয়ে দেখুন','Send a test now'], drSent:['টেস্ট রিপোর্ট পাঠানো হয়েছে (প্রোটোটাইপ)','Test report sent (prototype)'],
  rtT:['ওয়ার্ডের বেড ভাড়া','Ward bed rent'], rtS:['বদলালে বর্তমান ভর্তি রোগীদের বিলেও নতুন রেট লাগবে।','Changes apply to current patients’ bills too.'], rtSvc:['অন্যান্য পরিষেবার রেট','Other service rates'], rtSave:['রেট সংরক্ষণ করুন','Save rates'], rtSaved:['রেট বদলানো হয়েছে','Rates updated'], rtBeds:['{n}টি বেড','{n} beds'], rtAddBed:['বেড যোগ করুন','Add a bed'],
  abTitle:['নতুন বেড যোগ করুন','Add a bed'], abWard:['ওয়ার্ড','Ward'], abNo:['বেড নম্বর','Bed number'], abSave:['বেড যোগ করুন','Add bed'], abDone:['বেড {b} যোগ হয়েছে','Bed {b} added'], abErr:['এই নম্বরের বেড আগেই আছে','That bed already exists'],
  acCsv:['CSV ডাউনলোড','Download CSV'], acPrint:['রিপোর্ট প্রিন্ট / PDF','Print report / PDF'],
  aExp:['খরচ যোগ','Expense added'], aRate:['রেট বদল','Rate changed'], aBedAdd:['বেড যোগ','Bed added']
});
Object.assign(IC, {chart:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>', minusC:'<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>'});
NAVI.accounts = ['chart', 'navAcc']; VIEWS.accounts = vAccounts;
(function(){ const o = ROLES.owner.nav; o.splice(o.indexOf('bills') + 1, 0, 'accounts'); })();
Object.assign(ATITLE, {exp:'aExp', rate:'aRate', bedadd:'aBedAdd'}); Object.assign(ACAT, {exp:'pay', rate:'sys', bedadd:'sys'}); Object.assign(aTone, {exp:'amber', rate:'grey', bedadd:'grey'}); Object.assign(aIcon, {exp:'minusC', rate:'rupee', bedadd:'bed'});

const EXCAT = ['staff', 'sup', 'util', 'maint', 'rent', 'oxy', 'food', 'other'];
const EXP = [];
(function seedExp(){
  const add = (ago, cat, amt, m, note) => { const d = dateAgo(ago); d.setHours(11 + (ago % 6), 10); EXP.push({at:d, cat, amt, m, note}); };
  for (let a = 0; a < 30; a++) { add(a, 'food', 1800 + (a * 37) % 600, 'cash', ''); if (a % 3 === 0) add(a, 'sup', 4200 + (a * 173) % 3000, 'upi', ['নমুনা মেডিকেল এজেন্সি', 'Sample Medical Agency']); if (a % 7 === 2) add(a, 'oxy', 1050, 'cash', ['৩টি সিলিন্ডার রিফিল', '3 cylinder refills']); }
  add(18, 'rent', 45000, 'bank', ['বাড়ি ভাড়া', 'Building rent']); add(15, 'util', 18640, 'upi', ['বিদ্যুৎ বিল', 'Electricity bill']); add(9, 'maint', 3500, 'cash', ['এসি সার্ভিসিং', 'AC servicing']); add(5, 'other', 1200, 'cash', ['অফিস স্টেশনারি', 'Office stationery']);
  STAFF.forEach(s => { if (SALPAID[s.id]) EXP.push({at:SALPAID[s.id].at, cat:'staff', amt:salaryOf(s, SPREV.y, SPREV.m).net, m:SALPAID[s.id].m === 'bank' ? 'bank' : 'cash', note:s.n.slice(), sal:s.id}); });
})();
S.acTab = 'sum'; S.acPer = '7'; S.ex = {cat:'sup', amt:'', d:'', m:'cash', note:'', err:''}; S.rt = null; S.ab = {w:'G', no:'', err:''};
function acRange(){ const s = new Date(TODAY); s.setHours(0, 0, 0, 0); const n = S.acPer === 'today' ? 0 : S.acPer === '7' ? 6 : S.acPer === 'month' ? TODAY.getDate() - 1 : 29; return new Date(s.getTime() - n * DAY); }
const payAt = (p, y, i) => { const d = dateAgo(y.ago); d.setHours(10 + (i * 3 + parseInt(p.id.slice(1))) % 9, (i * 13) % 60); return d; };
function acPays(){ const a = acRange();
  return (LV.payR || []).map(y => { const at = new Date(y.created_at || y.payment_date), p = getP(y.admission_id) || {id:'g' + (y.admission_id || y.id), name:two(y.patient_name || '—'), bed:'', ghost:true, pays:[]};
    return {p, y:{amt:Number(y.amount) || 0, m:mKey(y.method), ref:y.txn_id || ''}, at, rc:y.receipt_no || ''}; }).filter(x => x.at >= a).sort((x, y) => y.at - x.at); }
const acExps = () => { const a = acRange(); return EXP.filter(e => e.at >= a).sort((x, y) => y.at - x.at); };
function acBilled(){ const a = acRange(), byType = {}; let tot = 0; P.forEach(p => charges(p).forEach(c => { const at = dateAgo(c.ago || 0); if (at >= new Date(a.getTime() - 12 * 36e5)) { byType[c.type] = (byType[c.type] || 0) + c.amt; tot += c.amt; } })); return {tot, byType}; }

function vAccounts(){
  const tabs = [['sum', 'acTabSum', 'chart'], ['inc', 'acTabInc', 'rupee'], ['exp', 'acTabExp', 'minusC'], ['pl', 'acTabPl', 'trend'], ['due', 'acTabDue', 'alert'], ['gst', 'acTabGst', 'percent'], ['day', 'acTabDay', 'wa'], ['rate', 'acTabRate', 'receipt']];
  const per = ['sum', 'inc', 'exp', 'pl', 'gst'].includes(S.acTab);
  return `<div class="ph"><div><h1>${t('acT')}</h1><p class="sub">${t('acSub')}</p></div>${per ? `<div class="ph-actions au-f"><label class="au-sel"><span>${t('acPer')}</span><select id="acPer" class="input">${[['today', 'acToday'], ['7', 'ac7'], ['30', 'ac30'], ['month', 'acMonth']].map(([v, k]) => `<option value="${v}" ${S.acPer === v ? 'selected' : ''}>${t(k)}</option>`).join('')}</select></label><button class="btn btn-ghost btn-sm" data-act="acCsv">${ic('download', 16)}${t('acCsv')}</button><button class="btn btn-secondary btn-sm" data-act="acPrint">${ic('file', 16)}${t('acPrint')}</button></div>` : ''}</div>
  <div class="ptabs sftabs" role="tablist">${tabs.map(([k, l, i]) => `<button role="tab" class="ptab" data-act="acTab" data-v="${k}" aria-selected="${S.acTab === k}">${ic(i, 16)}${t(l)}</button>`).join('')}</div>
  ${({sum:acSum, inc:acInc, exp:acExp, pl:acPl, due:acDue, gst:acGst, day:acDay, rate:acRate}[S.acTab])()}`;
}
function acKpis(){
  const pays = acPays(), ex = acExps(), col = pays.reduce((a, x) => a + x.y.amt, 0), sp = ex.reduce((a, x) => a + x.amt, 0), out = P.reduce((a, p) => a + totals(p).bal, 0);
  return {pays, ex, col, sp, out, billed:acBilled().tot};
}
function acSum(){
  const k = acKpis(), byM = {}; k.pays.forEach(x => byM[x.y.m] = (byM[x.y.m] || 0) + x.y.amt);
  const nDays = S.acPer === 'today' ? 1 : S.acPer === '7' ? 7 : S.acPer === 'month' ? TODAY.getDate() : 30, days = [];
  for (let i = nDays - 1; i >= 0; i--) { const d = dateAgo(i), key = d.toDateString(); days.push({d, inc:k.pays.filter(x => x.at.toDateString() === key).reduce((a, x) => a + x.y.amt, 0), out:k.ex.filter(x => x.at.toDateString() === key).reduce((a, x) => a + x.amt, 0)}); }
  const mx = Math.max(1, ...days.map(d => Math.max(d.inc, d.out)));
  const top = P.filter(p => totals(p).bal > 0).sort((a, b) => totals(b).bal - totals(a).bal).slice(0, 5);
  const mTot = Object.values(byM).reduce((a, b) => a + b, 0) || 1;
  return `<div class="skkpi">
    <div class="card skk"><span class="ki">${ic('rupee', 20)}</span><div><span>${t('acCollected')}</span><b>${money(k.col)}</b><small>${num(k.pays.length)} ${t('acRcpt')}</small></div></div>
    <div class="card skk"><span class="ki">${ic('receipt', 20)}</span><div><span>${t('acBilled')}</span><b>${money(k.billed)}</b></div></div>
    <div class="card skk warn"><span class="ki">${ic('minusC', 20)}</span><div><span>${t('acSpent')}</span><b>${money(k.sp)}</b><small>${num(k.ex.length)} ${S.lang === 'bn' ? 'টি খরচ' : 'entries'}</small></div></div>
    <div class="card skk ${k.col - k.sp < 0 ? 'bad' : ''}"><span class="ki">${ic('trend', 20)}</span><div><span>${t('acNet')}</span><b>${money(k.col - k.sp)}</b><small>${t('acOut')}: ${money(k.out)}</small></div></div></div>
  <div class="acg"><section class="card"><div class="card-h"><h2>${t('acDaily')}</h2><span class="aclg"><i class="in"></i>${t('acColIn')} <i class="out"></i>${t('acColOut')}</span></div>
    <div class="acbars" role="img" aria-label="${t('acDaily')}">${days.map(d => `<div class="acb" title="${fdate(d.d, {day:'numeric', month:'short'})} · ${t('acColIn')} ${money(d.inc)} · ${t('acColOut')} ${money(d.out)}"><div class="acb-s"><i class="in" style="height:${d.inc / mx * 100}%"></i><i class="out" style="height:${d.out / mx * 100}%"></i></div><span>${nDays > 10 ? (d.d.getDate() % 5 === 0 || nDays - 1 === days.indexOf(d) ? num(d.d.getDate()) : '') : fdate(d.d, {day:'numeric', month:'short'})}</span></div>`).join('')}</div></section>
  <section class="card"><div class="card-h"><h2>${t('acByM')}</h2></div>${['cash', 'upi', 'card', 'bank'].filter(m => m !== 'bank' || byM.bank).map(m => `<div class="acm"><div class="acm-h"><span>${t(m === 'bank' ? 'bankT' : m)}</span><b>${money(byM[m] || 0)}</b></div><div class="sbbar u-ok"><i style="width:${(byM[m] || 0) / mTot * 100}%"></i></div></div>`).join('')}</section></div>
  <section class="card flush" style="margin-top:16px"><div class="card-h"><h2>${t('acTopDue')}</h2><button class="btn btn-ghost btn-sm" data-act="acTab" data-v="due">${t('acTabDue')}${ic('chevR', 16)}</button></div>${top.map(p => acDueRow(p)).join('') || `<p class="nf-none">${t('acNone')}</p>`}</section>`;
}
function acDueRow(p){ const b = totals(p).bal, age = p.disc ? p.discAgo : p.admAgo;
  return `<div class="iss"><span class="avatar ${avClass(p.id)}" aria-hidden="true">${esc(initials(p))}</span><div class="tt"><b>${esc(nm(p))}${p.bed ? ` · <span class="latin">${esc(p.bed)}</span>` : ''}</b><span>${t(p.disc ? 'duOut' : 'duIn')} · ${whenTxt(age)}${p.fam || p.phone ? ` · <span class="latin">${fmtPhone(p.fam || p.phone)}</span>` : ''}</span></div><b class="due">${money(b)}</b>${p.fam || p.phone ? `<a class="btn btn-ghost btn-sm" href="tel:+91${p.fam || p.phone}">${ic('phone', 15)}${t('duCall')}</a>` : ''}<button class="btn btn-secondary btn-sm" data-act="pay" data-id="${p.id}">${t('nfActPay')}</button></div>`; }
function acInc(){
  const L = acPays();
  return `<section class="card flush">${L.length ? `<div class="acr ach" aria-hidden="true"><span>${t('skColWhen')}</span><span>${t('fPatient')}</span><span>${t('fMethod')}</span><span>${t('fRcpt')}</span><span class="r">${t('fAmt')}</span></div>` + L.map(x => `<div class="acr"><span class="mv-w">${fdt(x.at)}</span><span><b>${esc(nm(x.p))}</b>${x.p.bed ? ` · <span class="latin">${esc(x.p.bed)}</span>` : ''}</span><span>${t(x.y.m === 'bank' ? 'bankT' : x.y.m)}${x.y.ref ? ` · <span class="latin">${esc(x.y.ref)}</span>` : ''}</span><span class="latin">${esc(x.rc || '—')}</span><span class="r"><b class="pos">+${money(x.y.amt)}</b></span></div>`).join('') + `<p class="pl-foot">${t('acCollected')}: <b>${money(L.reduce((a, x) => a + x.y.amt, 0))}</b></p>` : emptyState('rupee', t('acNone'), '')}</section>`;
}
function acExp(){
  const L = acExps(), f = S.ex, by = {}; L.forEach(e => by[e.cat] = (by[e.cat] || 0) + e.amt);
  return `<div class="acx"><section class="card setc"><div class="setc-h"><span class="setc-ic">${ic('minusC', 20)}</span><div><h2>${t('exAdd')}</h2></div></div>
    <div class="field"><span class="lab">${t('exCat')}</span><div class="chips">${EXCAT.map(c => `<button type="button" class="chip" data-act="exCat" data-v="${c}" aria-pressed="${f.cat === c}">${t('ec' + c[0].toUpperCase() + c.slice(1))}</button>`).join('')}</div></div>
    <div class="row2"><div class="field"><label for="ex-a">${t('exAmt')}</label><div class="pre rs"><span>₹</span><input id="ex-a" class="input" inputmode="numeric" maxlength="7" data-ex="amt" value="${esc(f.amt)}"></div></div><div class="field"><label for="ex-d">${t('exDate')}</label><input id="ex-d" type="date" class="input" data-ex="d" value="${esc(f.d || ymd(TODAY))}"></div></div>
    <div class="field"><span class="lab">${t('exM')}</span><div class="seg">${['cash', 'upi', 'bank'].map(m => `<button type="button" data-act="exM" data-v="${m}" aria-pressed="${f.m === m}">${t(m === 'bank' ? 'bankT' : m)}</button>`).join('')}</div></div>
    <div class="field"><label for="ex-n">${t('exNote')}</label><input id="ex-n" class="input" data-ex="note" value="${esc(f.note)}"></div>
    ${f.err ? `<p class="setmsg bad">${ic('alert', 15)}${t(f.err)}</p>` : ''}
    <button class="btn btn-primary btn-lg btn-block" data-act="exSave">${ic('plus')}${t('exSave')}</button></section>
  <section class="card flush"><div class="card-h"><h2>${t('acSpent')} · ${money(L.reduce((a, e) => a + e.amt, 0))}</h2></div>
    <div class="exby">${EXCAT.filter(c => by[c]).sort((a, b) => by[b] - by[a]).map(c => `<span><b>${money(by[c])}</b>${t('ec' + c[0].toUpperCase() + c.slice(1))}</span>`).join('')}</div>
    ${L.slice(0, 60).map(e => `<div class="acr acr4"><span class="mv-w">${fdate(e.at, {day:'numeric', month:'short'})}</span><span><b>${t('ec' + e.cat[0].toUpperCase() + e.cat.slice(1))}</b>${e.note ? ` · ${esc(L2(e.note))}` : ''}</span><span>${t(e.m === 'bank' ? 'bankT' : e.m)}</span><span class="r"><b class="neg">−${money(e.amt)}</b></span></div>`).join('') || emptyState('minusC', t('acNone'), '')}</section></div>`;
}
function acPl(){
  const b = acBilled(), ex = acExps(), by = {}; ex.forEach(e => by[e.cat] = (by[e.cat] || 0) + e.amt);
  const sp = ex.reduce((a, e) => a + e.amt, 0), net = b.tot - sp, row = (k, v, cls) => `<tr class="${cls || ''}"><td>${k}</td><td class="r">${v}</td></tr>`;
  return `<section class="card"><div class="au-bill"><table>
    <tr class="tot"><td>${t('plRev')}</td><td class="r">${money(b.tot)}</td></tr>${Object.keys(b.byType).sort((x, y) => b.byType[y] - b.byType[x]).map(k => row('&nbsp;&nbsp;' + t('c' + k), money(b.byType[k]))).join('')}
    <tr class="tot"><td>${t('plExp')}</td><td class="r">−${money(sp)}</td></tr>${EXCAT.filter(c => by[c]).map(c => row('&nbsp;&nbsp;' + t('ec' + c[0].toUpperCase() + c.slice(1)), '−' + money(by[c]))).join('')}
    <tr class="tot ${net < 0 ? 'due' : ''} plnet"><td>${t(net >= 0 ? 'plNet' : 'plLoss')} · ${t('plMargin', {p:num(b.tot ? Math.round(net / b.tot * 100) : 0)})}</td><td class="r">${money(net)}</td></tr></table></div>
    <p class="hint" style="display:flex;gap:6px">${ic('info', 14)}${t('plNote')}</p></section>`;
}
function acDue(){
  const L = P.filter(p => totals(p).bal > 0).sort((a, b) => totals(b).bal - totals(a).bal), age = p => p.disc ? p.discAgo : p.admAgo;
  const g = [[0, 7, 'du0'], [8, 30, 'du1'], [31, 1e9, 'du2']].map(([a, b, k]) => ({k, L:L.filter(p => age(p) >= a && age(p) <= b)}));
  return `<div class="skkpi" style="grid-template-columns:repeat(3,minmax(0,1fr))">${g.map((x, i) => `<div class="card skk ${i === 2 ? 'bad' : i ? 'warn' : ''}"><span class="ki">${ic('clock', 20)}</span><div><span>${t(x.k)}</span><b>${money(x.L.reduce((a, p) => a + totals(p).bal, 0))}</b><small>${num(x.L.length)} ${S.lang === 'bn' ? 'জন' : 'patients'}</small></div></div>`).join('')}</div>
  ${g.filter(x => x.L.length).map(x => `<section class="card flush" style="margin-bottom:14px"><div class="card-h"><h2>${t(x.k)}</h2></div>${x.L.map(acDueRow).join('')}</section>`).join('')}`;
}
function acGst(){
  const b = acBilled(), R = TAXR, taxable = 0;
  return `<section class="card setc"><div class="setc-h"><span class="setc-ic">${ic('percent', 20)}</span><div><h2>${t('gsT')}</h2><p>${FAC.gstin ? `${t('gsGstin')}: <span class="latin">${esc(FAC.gstin)}</span>` : t('gsNoGstin')}</p></div></div>
    <div class="au-bill"><table><tr><th>${t('tmColSvc')}</th><th>${t('tmColCode')}</th><th class="r">${t('fAmt')}</th><th class="r">GST</th></tr>
    <tr><td>${t('gsExempt')}</td><td class="latin">9993</td><td class="r">${money(b.tot - taxable)}</td><td class="r">${money(0)}</td></tr>
    <tr><td>${t('gsTax')} — ${t('tmR3', {amt:money(R.r3.lim)})}</td><td class="latin">9963</td><td class="r">${money(taxable)}</td><td class="r">${money(0)}</td></tr>
    <tr class="tot"><td colspan="2">${t('gsTaxAmt')}</td><td></td><td class="r">${money(0)}</td></tr></table></div>
    <p class="setnote">${t('gsNote')}</p></section>`;
}
function acDay(){
  const k = (() => { const s = S.acPer; S.acPer = 'today'; const r = acKpis(); S.acPer = s; return r; })(), st = bedStats(), adm = P.filter(p => !p.disc && p.days === 0).length, dis = P.filter(p => p.disc && p.discAgo === 0).length;
  const low = SK.filter(i => i.min && i.qty < i.min).length, to = FAC.wa || '', lic = LIC.filter(l => l.days <= 30).length;
  const cash = k.pays.filter(x => x.y.m === 'cash').reduce((a, x) => a + x.y.amt, 0), upi = k.pays.filter(x => x.y.m === 'upi').reduce((a, x) => a + x.y.amt, 0);
  const bn = S.lang === 'bn', msg = bn ? `*${t('homeName')}* — আজকের রিপোর্ট\n${fdate(TODAY, {day:'numeric', month:'long', year:'numeric'})}\n\n🛏 বেড: ${num(st.occ)}/${num(st.total)} ভর্তি · ${num(st.free)} খালি\n➕ আজ ভর্তি: ${num(adm)} · ⬆ ছুটি: ${num(dis)}\n\n💰 আজ জমা: ${money(k.col)}\n   নগদ ${money(cash)} · UPI ${money(upi)}\n💸 আজ খরচ: ${money(k.sp)}\n📌 মোট বকেয়া: ${money(k.out)}\n\n⚠ কম স্টক: ${num(low)}টি সামগ্রী\n🧾 লাইসেন্স: ${num(lic)}টির মেয়াদ ৩০ দিনে শেষ\n\nবিস্তারিত: AuraScale অ্যাপ খুলুন`
    : `*${t('homeName')}* — today’s report\n${fdate(TODAY, {day:'numeric', month:'long', year:'numeric'})}\n\n🛏 Beds: ${st.occ}/${st.total} occupied · ${st.free} free\n➕ Admitted today: ${adm} · ⬆ Discharged: ${dis}\n\n💰 Collected today: ${money(k.col)}\n   Cash ${money(cash)} · UPI ${money(upi)}\n💸 Spent today: ${money(k.sp)}\n📌 Total outstanding: ${money(k.out)}\n\n⚠ Low stock: ${low} items\n🧾 Licences: ${lic} expire within 30 days\n\nDetails: open the AuraScale app`;
  return `<div class="acx"><section class="card setc"><div class="setc-h"><span class="setc-ic" style="background:#E7F8EE;color:#128C4A">${ic('wa', 20)}</span><div><h2>${t('drT')}</h2><p>${to ? t('drTo', {n:`<span class="latin">${esc(to)}</span>`}) : t('drNoNum')}</p></div></div>
    <div class="drrow"><span>${t('drOn')}</span><span class="st st-paid">${ic('check', 13)} ${t('drOnNow')}</span></div>
    <p class="hint">${t('drPrev')}</p>
    <div class="setbtns"><button class="btn btn-secondary grow" data-act="nav" data-v="settings">${ic('gear')}${t('drChange')}</button></div></section>
    <div class="wa-ph"><div class="wa-top">${ic('wa', 18)} AuraScale</div><div class="wa-body"><div class="wa-msg">${esc(msg).replace(/\*(.+?)\*/g, '<b>$1</b>').replace(/\n/g, '<br>')}<span class="wa-t">${bn ? 'রাত ৮:০০' : '8:00 PM'} ✓✓</span></div></div></div></div>`;
}
function acRate(){
  if (!S.rt) S.rt = Object.fromEntries(WARDS.map(w => [w.id, String(w.rate || '')]));
  const all = Object.values(beds);
  return `<div class="acx"><section class="card setc"><div class="setc-h"><span class="setc-ic">${ic('bed', 20)}</span><div><h2>${t('rtT')}</h2><p>${t('rtS')}</p></div></div>
    ${WARDS.map(w => `<div class="rtrow"><span><b>${t(w.key)}</b><small>${t('rtBeds', {n:num(all.filter(b => b.ward === w.id).length)})}</small></span><span class="pre rs"><span>₹</span><input class="input" inputmode="numeric" maxlength="6" data-rt="${esc(w.id)}" value="${esc(S.rt[w.id] || '')}" aria-label="${t(w.key)}"></span><small>/ ${S.lang === 'bn' ? 'দিন' : 'day'}</small></div>`).join('') || `<p class="nf-none">${t('emptyBeds')}</p>`}
    <div class="setbtns">${WARDS.length ? `<button class="btn btn-primary grow" data-act="rtSave">${ic('check')}${t('rtSave')}</button>` : ''}<button class="btn btn-secondary" data-act="bedAdd">${ic('plus')}${t('rtAddBed')}</button></div></section>
    <section class="card setc"><div class="setc-h"><span class="setc-ic">${ic('receipt', 20)}</span><div><h2>${t('rtSvcT')}</h2><p>${t('rtSvcS')}</p></div></div>
    ${WARDS.map(w => { const L = all.filter(b => b.ward === w.id), o = L.filter(b => b.status === 'occ').length, f = L.filter(b => b.status === 'free').length;
      return `<div class="rtrow"><span><b>${t(w.key)}</b><small>${t('rtFreeN', {f:num(f), o:num(o)})}</small></span><span class="latin" style="color:var(--text-2)">${L.map(b => esc(b.id)).slice(0, 14).join(', ')}${L.length > 14 ? '…' : ''}</span></div>`; }).join('')}</section></div>`;
}
function mAddBed(m){
  const used = Object.keys(beds).filter(k => k[0] === m.w).map(k => +k.slice(1)), next = m.w + (Math.max(0, ...used) + 1);
  return {title:t('abTitle'), body:`<div class="field"><span class="lab">${t('abWard')}</span><div class="chips">${WARDS.map(w => `<button type="button" class="chip" data-act="abW" data-v="${w.id}" aria-pressed="${m.w === w.id}">${t(w.key)}</button>`).join('')}</div></div>
    <div class="field"><label for="ab-no">${t('abNo')}</label><input id="ab-no" class="input latin" data-bind="no" data-k="abno" value="${esc(m.no || next)}" maxlength="5">${m.err ? `<p class="err">${ic('alert', 15)}${t(m.err)}</p>` : ''}</div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="abSave" data-primary>${ic('plus')}${t('abSave')}</button>`};
}
function acReportHtml(){
  const k = acKpis(), per = t({today:'acToday', '7':'ac7', '30':'ac30', month:'acMonth'}[S.acPer]), b = acBilled();
  return `<!doctype html><html><head><meta charset="utf-8"><title>Report</title><style>@page{size:A4;margin:14mm}body{font-family:"Noto Sans Bengali","IBM Plex Sans",Arial,sans-serif;color:#14201b;font-size:12.5px}h1{font-size:18px;margin:0;color:#0b4f3a}.mut{color:#5b6b64}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}.g div{border:1px solid #d6dfda;border-radius:6px;padding:8px}.g b{display:block;font-size:16px}table{width:100%;border-collapse:collapse;margin-top:8px}td,th{border-bottom:1px solid #e3e8e5;padding:6px;text-align:left}.r{text-align:right}h2{font-size:14px;margin:16px 0 4px}</style></head><body>
  <h1>${t('homeName')}</h1><div class="mut">${esc(FAC.addr)}</div><h2>${t('acT')} · ${per} · ${fdate(TODAY, {day:'numeric', month:'long', year:'numeric'})}</h2>
  <div class="g"><div>${t('acCollected')}<b>${money(k.col)}</b></div><div>${t('acBilled')}<b>${money(k.billed)}</b></div><div>${t('acSpent')}<b>${money(k.sp)}</b></div><div>${t('acOut')}<b>${money(k.out)}</b></div></div>
  <h2>${t('acTabPl')}</h2><table>${Object.keys(b.byType).map(x => `<tr><td>${t('c' + x)}</td><td class="r">${money(b.byType[x])}</td></tr>`).join('')}<tr><th>${t('plExp')}</th><th class="r">−${money(k.sp)}</th></tr><tr><th>${t('plNet')}</th><th class="r">${money(b.tot - k.sp)}</th></tr></table>
  <h2>${t('acTabInc')}</h2><table>${k.pays.slice(0, 40).map(x => `<tr><td>${fdt(x.at)}</td><td>${esc(nm(x.p))}</td><td>${t(x.y.m === 'bank' ? 'bankT' : x.y.m)}${x.rc ? ' · ' + esc(x.rc) : ''}</td><td class="r">${money(x.y.amt)}</td></tr>`).join('')}</table>
  <p class="mut" style="margin-top:16px">AuraScale OS</p></body></html>`;
}
function extraHandlers11(){
  Object.assign(H, {
    acTab: el => { S.acTab = el.dataset.v; renderMain(); const b = ROOT.querySelector(`.sftabs [data-v="${el.dataset.v}"]`); b && b.focus({preventScroll:true}); },
    exCat: el => { S.ex.cat = el.dataset.v; renderMain(); }, exM: el => { S.ex.m = el.dataset.v; renderMain(); },
    exSave: () => { const f = S.ex, a = parseInt(f.amt, 10); if (!(a > 0)) { f.err = 'exErr'; renderMain(); return; } const d = new Date((f.d || ymd(TODAY)) + 'T' + new Date().toTimeString().slice(0, 5)); const e = {at:d, cat:f.cat, amt:a, m:f.m, note:f.note.trim() ? [f.note.trim(), f.note.trim()] : ''}; EXP.push(e);
      audit({act:'exp', amt:a, d:{cat:f.cat, m:f.m, note:e.note}}); S.ex = {cat:f.cat, amt:'', d:'', m:f.m, note:'', err:''}; renderMain(); toast(t('exSaved', {amt:money(a)}), 'success', {label:t('undo'), fn:() => { EXP.splice(EXP.indexOf(e), 1); renderMain(); }}); },
    acCsv: () => { const k = acKpis(); dlText(`accounts-${ymd(TODAY)}.csv`, '﻿' + [['date', 'type', 'party/category', 'method', 'amount']].concat(k.pays.map(x => [ymd(x.at), 'in', x.p.name[1], x.y.m, x.y.amt]), k.ex.map(e => [ymd(e.at), 'out', e.cat, e.m, -e.amt])).map(r => r.join(',')).join('\n')); },
    acPrint: () => printDoc(acReportHtml()),
    drTgl: () => { S._drOn = !S._drOn; renderMain(); },
    drTest: () => toast(t('drSent')),
    rtSave: () => { const ch = []; WARDS.forEach(w => { const v = parseInt(S.rt[w.id], 10); if (v > 0 && v !== w.rate) { ch.push([t(w.key), money(w.rate), money(v)]); w.rate = v; } }); if (!ch.length) { toast(t('fdNoChange'), 'info'); return; } audit({act:'rate', d:{sec:'rtT', chRaw:ch}}); S.rt = null; refresh(); toast(t('rtSaved')); },
    abOpen: () => openModal({type:'addbed', w:'G', no:'', err:''}),
    abW: el => { S.modal.w = el.dataset.v; S.modal.no = ''; S.modal.err = ''; rerenderModal(); },
    abSave: () => { const m = S.modal, used = Object.keys(beds).filter(k => k[0] === m.w).map(k => +k.slice(1)); const id = (m.no || m.w + (Math.max(0, ...used) + 1)).toUpperCase().replace(/\s/g, '');
      if (beds[id] || !/^[A-Z]\d{1,3}$/.test(id)) { m.err = 'abErr'; rerenderModal(); return; } const w = WARD[id[0]] ? id[0] : m.w; beds[id] = {id, ward:w, status:'free'}; closeModal(); audit({act:'bedadd', d:{bed:id, ward:w}}); refresh(); toast(t('abDone', {b:id})); }
  });
  ROOT.addEventListener('input', e => { const el = e.target; if (el.dataset.ex) S.ex[el.dataset.ex] = el.value; if (el.dataset.rt) { el.value = el.value.replace(/\D/g, ''); S.rt[el.dataset.rt] = el.value; } });
  ROOT.addEventListener('change', e => { if (e.target.id === 'acPer') { S.acPer = e.target.value; renderMain(); } });
  const _ad = aDetails; aDetails = function(e){ const d = e.d || {};
    if (e.act === 'exp') return [[t('exCat'), t('ec' + d.cat[0].toUpperCase() + d.cat.slice(1))], [t('fAmt'), `<b>${money(e.amt)}</b>`], [t('exM'), t(d.m === 'bank' ? 'bankT' : d.m)], [t('exNote'), esc(L2(d.note) || '—')]];
    if (e.act === 'rate') return [[t('fSection'), t(d.sec)]].concat((d.chRaw || []).map(([k, a, b]) => [esc(k), `<span class="mut">${a}</span> → <b>${b}</b>`]));
    if (e.act === 'bedadd') return [[t('fBed'), `<b class="latin">${d.bed}</b>`], [t('abWard'), t(WARD[d.ward].key)]];
    return _ad(e); };
}

/* =================== v11: DISCHARGE PAPERS + PAYMENT RECEIPT =================== */
Object.assign(T, {
  navDis:['ছুটির কাগজ','Discharge papers'],
  dpT:['ছুটির কাগজ (ডিসচার্জ সামারি)','Discharge papers (summary)'], dpSub:['বাঁদিকে রোগী বাছুন, ডানদিকে তাঁর ছুটির কাগজ তৈরি হয়ে যাবে — মিলিয়ে নিয়ে প্রিন্ট করুন।','Pick a patient on the left — the discharge paper is ready on the right. Check it and print.'],
  dpReady:['ছুটির জন্য তৈরি','Ready for discharge'], dpReadyS:['ডাক্তার ছুটি লিখেছেন','Doctor advised discharge'], dpDone:['সম্প্রতি ছুটি হয়েছে','Recently discharged'], dpAll:['অন্যান্য ভর্তি রোগী','Other admitted patients'],
  dpNone:['এখন কেউ ছুটির জন্য তৈরি নেই','No one is ready for discharge now'], dpPick:['বাঁদিক থেকে একজন রোগী বাছুন','Pick a patient on the left'],
  dpEdit:['কাগজে যা বদলাতে চান','Edit before printing'], dpDx:['চূড়ান্ত রোগনির্ণয়','Final diagnosis'], dpCourse:['হাসপাতালে চিকিৎসার বিবরণ','Course in hospital'], dpCond:['ছুটির সময় অবস্থা','Condition at discharge'], dpAdv:['ছুটির পরামর্শ','Advice on discharge'],
  dpPrint:['প্রিন্ট / PDF','Print / PDF'], dpDischarge:['ছুটি দিন ও বিল মেটান','Discharge & settle bill'], dpReset:['আগের মতো করুন','Reset'],
  dpCondG:['ভালো, স্থিতিশীল','Good, stable'], dpCondF:['মোটামুটি, উন্নতি হচ্ছে','Fair, improving'], dpCondL:['নিজের ইচ্ছায় ছুটি (LAMA)','Left against advice (LAMA)'], dpCondR:['অন্য হাসপাতালে রেফার','Referred elsewhere'],
  dsTitle:['DISCHARGE SUMMARY · ছুটির সারাংশ','DISCHARGE SUMMARY'], dsName:['রোগীর নাম','Patient name'], dsAgeSex:['বয়স / লিঙ্গ','Age / Sex'], dsIp:['IP নং','IP no.'], dsAdm:['ভর্তির তারিখ','Date of admission'], dsDis:['ছুটির তারিখ','Date of discharge'], dsLos:['মোট দিন','Length of stay'],
  dsCons:['চিকিৎসক','Consultant'], dsWard:['ওয়ার্ড / বেড','Ward / bed'], dsAddr:['ঠিকানা','Address'], dsAlg:['অ্যালার্জি','Allergies'], dsComp:['ভর্তির কারণ','Presenting complaint'],
  dsInv:['গুরুত্বপূর্ণ পরীক্ষা','Key investigations'], dsTx:['চিকিৎসায় দেওয়া ওষুধ','Treatment given'], dsHome:['বাড়িতে যে ওষুধ চলবে','Medicines to continue at home'], dsFu:['আবার দেখাতে আসবেন','Follow-up'], dsFuOn:['{d} তারিখে ({n} দিন পরে)','on {d} (after {n} days)'],
  dsWarn:['এগুলো হলে সঙ্গে সঙ্গে আসবেন','Come back at once if'], dsWarnTx:['জ্বর ১০১°F-এর বেশি · শ্বাসকষ্ট · বুকে ব্যথা · রক্তপাত · অজ্ঞান ভাব · সেলাইয়ের জায়গা লাল বা পুঁজ','Fever above 101°F · breathlessness · chest pain · bleeding · fainting · redness or pus at the wound'],
  dsSigDoc:['চিকিৎসকের সই','Doctor’s signature'], dsSigPt:['রোগী / অভিভাবকের সই','Patient / attendant signature'], dsRec:['কাগজ বুঝে পেয়েছি','Received and understood'],
  dsEmergency:['জরুরি ফোন','Emergency phone'], dsNoInv:['উল্লেখযোগ্য কিছু নেই','Nothing significant'], dsDefCourse:['ভর্তির পর প্রয়োজনীয় পরীক্ষা করা হয় ও চিকিৎসা শুরু হয়। চিকিৎসায় রোগীর অবস্থার উন্নতি হয়েছে।','Investigated after admission and treatment started. The patient improved with treatment.'],
  dsHomeDef:['ডাক্তারের লেখা প্রেসক্রিপশন অনুযায়ী','As per the doctor’s prescription'],
  rcT:['টাকা জমার রসিদ','Payment receipt'], rcSub:['রসিদ তৈরি — রোগীর পরিবারকে দিন বা হোয়াটসঅ্যাপে পাঠান','Receipt ready — hand it over or send on WhatsApp'],
  rcPrint:['প্রিন্ট / PDF','Print / PDF'], rcWa:['হোয়াটসঅ্যাপে পাঠান','Send on WhatsApp'], rcWaSent:['{n} নম্বরে রসিদ পাঠানো হয়েছে (প্রোটোটাইপ)','Receipt sent to {n} (prototype)'],
  rcNo:['রসিদ নং','Receipt no.'], rcRecv:['প্রাপ্তি স্বীকার','Received with thanks'], rcFrom:['যাঁর কাছ থেকে','Received from'], rcFor:['বাবদ','Towards'], rcForTx:['{name}-এর চিকিৎসা খরচ (UHID {u}, বেড {b})','Treatment of {name} (UHID {u}, bed {b})'],
  rcWords:['কথায়','In words'], rcSummary:['বিলের অবস্থা (এই জমার পরে)','Account after this payment'], rcBilledSoFar:['এখন পর্যন্ত বিল','Billed so far'], rcPaidTotal:['মোট জমা','Total paid'], rcBalance:['বাকি','Balance'],
  rcThanks:['ধন্যবাদ। এটি কম্পিউটারে তৈরি রসিদ।','Thank you. This is a computer-generated receipt.'], rcAttendant:['রোগীর {r}','Patient’s {r}'],
  rcReprint:['রসিদ','Receipt']
});
NAVI.discharge = ['exit', 'navDis']; VIEWS.discharge = vDischarge;
(function(){ ['owner', 'reception'].forEach(r => { const n = ROLES[r].nav; n.splice(n.indexOf('bills') + 1, 0, 'discharge'); }); ROLES.doctor.nav.push('discharge'); })();

/* ---------- discharge paper ---------- */
S.dpId = null; const DPED = {};
function dpList(){
  const ready = P.filter(p => !p.disc && p.advice), done = P.filter(p => p.disc && p.discAgo <= 3).sort((a, b) => a.discAgo - b.discAgo), other = P.filter(p => !p.disc && !p.advice && (S.role !== 'doctor' || p.doc === 'd2'));
  return {ready, done, other};
}
function dpEd(p){
  if (!DPED[p.id]) { const r = (LV.dp || {})[p.id], loc = r ? null : dpLocal(p.id);
    if (r) DPED[p.id] = {dx:r.dx || '', course:r.course || '', cond:r.cond || 'G', adv:r.advice || '', fu:r.followup_days != null ? String(r.followup_days) : '7', home:r.home_meds || ''};
    else if (loc) DPED[p.id] = Object.assign({dx:'', course:'', cond:'G', adv:'', fu:'7', home:''}, loc);
    else DPED[p.id] = {dx:L2(p.reason) || '', course:t('dsDefCourse'), cond:p.disc || p.advice ? 'G' : 'F', adv:'', fu:'7', home:''}; }
  return DPED[p.id];
}
function vDischarge(){
  const {ready, done, other} = dpList();
  if (!S.dpId || !getP(S.dpId)) S.dpId = (ready[0] || done[0] || other[0] || {}).id || null;
  const item = (p, tag) => `<button class="dpi ${S.dpId === p.id ? 'on' : ''}" data-act="dpPick" data-id="${p.id}" aria-pressed="${S.dpId === p.id}">${avatar(p)}<span class="tt"><b>${esc(nm(p))}</b><small>${p.bed ? `<span class="latin">${esc(p.bed)}</span> · ` : ''}${p.reason[li()] ? esc(p.reason[li()]) + ' · ' : ''}${p.disc ? whenTxt(p.discAgo) : daysTxt(Math.max(1, p.days))}</small></span>${tag}</button>`;
  const grp = (k, sub, L, tag) => L.length ? `<div class="dpg"><h3>${t(k)} <span>${num(L.length)}</span></h3>${sub ? `<p>${t(sub)}</p>` : ''}${L.map(p => item(p, tag(p))).join('')}</div>` : '';
  const p = S.dpId ? getP(S.dpId) : null, e = p ? dpEd(p) : null;
  return `<div class="ph"><div><h1>${t('dpT')}</h1><p class="sub">${t('dpSub')}</p></div></div>
  <div class="dpw">
    <aside class="card dpl">${grp('dpReady', 'dpReadyS', ready, p => `<span class="st st-paid">${ic('check', 13)}</span>`)}${ready.length ? '' : `<p class="nf-none">${t('dpNone')}</p>`}${grp('dpDone', '', done, p => `<span class="st st-dis">${t('stOut')}</span>`)}${grp('dpAll', '', other, () => '')}</aside>
    <div class="dpr">${p ? `<section class="card setc dped"><div class="setc-h"><span class="setc-ic">${ic('edit', 20)}</span><div><h2>${t('dpEdit')}</h2><p>${esc(nm(p))}${p.bed ? ` · <span class="latin">${esc(p.bed)}</span>` : ''}</p></div><button class="btn btn-ghost btn-sm" data-act="dpReset">${t('dpReset')}</button></div>
        <div class="row2"><div class="field"><label for="dp-dx">${t('dpDx')}</label><input id="dp-dx" class="input" data-dp="dx" value="${esc(e.dx)}"></div>
        <div class="field"><label for="dp-cond">${t('dpCond')}</label><select id="dp-cond" class="input" data-dp="cond">${[['G', 'dpCondG'], ['F', 'dpCondF'], ['L', 'dpCondL'], ['R', 'dpCondR']].map(([v, k]) => `<option value="${v}" ${e.cond === v ? 'selected' : ''}>${t(k)}</option>`).join('')}</select></div></div>
        <div class="field"><label for="dp-course">${t('dpCourse')}</label><textarea id="dp-course" class="input ta" rows="2" data-dp="course">${esc(e.course)}</textarea></div>
        <div class="field"><label for="dp-adv">${t('dpAdv')}</label><textarea id="dp-adv" class="input ta" rows="2" data-dp="adv">${esc(e.adv)}</textarea></div>
        <div class="row2"><div class="field"><label for="dp-home">${t('dpHome')}</label><textarea id="dp-home" class="input ta" rows="2" data-dp="home">${esc(e.home || '')}</textarea></div>
        <div class="field"><label for="dp-fu">${t('dpFu')}</label><input id="dp-fu" class="input latin" inputmode="numeric" maxlength="3" data-dp="fu" value="${esc(e.fu || '')}"></div></div>
        <div class="setbtns"><button class="btn btn-primary btn-lg grow" data-act="dpPrint">${ic('download')}${t('dpPrint')}</button>${!p.disc && (S.role === 'owner' || S.role === 'reception') ? `<button class="btn btn-secondary btn-lg" data-act="discharge" data-id="${p.id}">${ic('exit')}${t('dpDischarge')}</button>` : ''}</div><p class="dp-st" id="dpSt" aria-live="polite"></p></section>
      <div class="dpaper" id="dpPaper">${dsBody(p)}</div>` : `<div class="card">${emptyState('exit', t('dpPick'), '')}</div>`}</div>
  </div>`;
}
function dsBody(p){
  const e = dpEd(p), x = px(p), adm = encDate(p), dis = p.disc && p.discAt ? p.discAt : new Date(), los = Math.max(1, p.days);
  const fu = parseInt(e.fu, 10) || 0, fuD = new Date(dis.getTime() + fu * DAY), r = (k, v) => `<div><span>${t(k)}</span><b>${v}</b></div>`;
  const uniq = a => a.filter((v, i) => v && a.indexOf(v) === i);
  const tests = uniq((p.ch || []).filter(c => c.type === 'test').map(c => String(c.desc || '').trim())).slice(0, 12);
  const meds = uniq((p.ch || []).filter(c => c.type === 'med').map(c => String(c.desc || '').trim())).slice(0, 14);
  const home = String(e.home || '').split(/\n+/).map(s => s.trim()).filter(Boolean);
  return `<div class="ds">
    <div class="ds-h"><div class="ds-l"><span class="bp-sq" aria-hidden="true"><i></i></span><div><b>${t('homeName')}</b>${FAC.addr ? `<span>${esc(FAC.addr)}</span>` : ''}${FAC.phone || FAC.gstin ? `<span>${FAC.phone ? t('fdPhone') + ': ' + esc(FAC.phone) : ''}${FAC.gstin ? (FAC.phone ? ' · ' : '') + 'GSTIN ' + esc(FAC.gstin) : ''}</span>` : ''}</div></div><div class="ds-r"><b>DISCHARGE SUMMARY</b><span>${S.lang === 'bn' ? 'ছুটির সারাংশ' : ''}</span></div></div>
    <div class="ds-g">${r('dsName', esc(nm(p)))}${r('dsAgeSex', `${p.age ? num(p.age) : '—'} · ${sexTxt(p.sex)}`)}${r('fUhid', `<span class="latin">${esc(x.uhid)}</span>`)}${r('dsIp', `<span class="latin">${esc(x.ip)}</span>`)}
      ${r('dsAdm', fdate(adm, {day:'numeric', month:'short', year:'numeric'}) + ', ' + tm(adm))}${r('dsDis', fdate(dis, {day:'numeric', month:'short', year:'numeric'}))}${r('dsLos', daysTxt(los))}${r('dsWard', `${t(wKey(p.bed))} · <span class="latin">${esc(p.bed || '—')}</span>`)}
      ${r('dsCons', esc(docName(p.doc)))}${r('dsAlg', x.alg && x.alg.length ? `<span class="dsred">${x.alg.map(a => esc(L2(a))).join(', ')}</span>` : t('dsAlgNo'))}${r('dsAddr', esc(L2(x.addr)))}${r('dsEmergency', p.fam ? `<span class="latin">${fmtPhone(p.fam)}</span>` : '—')}</div>
    <div class="ds-s"><h4>${t('dsComp')}</h4><p>${esc(L2(p.reason)) || '—'}</p></div>
    <div class="ds-s"><h4>${t('dpDx')}</h4><p><b>${esc(e.dx) || '—'}</b></p></div>
    <div class="ds-s"><h4>${t('dpCourse')}</h4><p>${esc(e.course) || '—'}</p></div>
    <div class="ds-s"><h4>${t('dsInv')}</h4><p>${tests.length ? tests.map(esc).join(' · ') : t('dsNoTests')}</p></div>
    <div class="ds-s ds-2"><div><h4>${t('dsTx')}</h4>${meds.length ? `<ul>${meds.map(m => `<li>${esc(m)}</li>`).join('')}</ul>` : '<p>—</p>'}</div><div><h4>${t('dsHome')}</h4>${home.length ? `<ul>${home.map(m => `<li>${esc(m)}</li>`).join('')}</ul>` : `<p>${t('dsHomeDef')}</p>`}</div></div>
    <div class="ds-s"><h4>${t('dpCond')}</h4><p><b>${t({G:'dpCondG', F:'dpCondF', L:'dpCondL', R:'dpCondR'}[e.cond] || 'dpCondG')}</b></p></div>
    <div class="ds-s"><h4>${t('dpAdv')}</h4><p>${esc(e.adv).replace(/\n/g, '<br>') || '—'}</p>${fu ? `<p><b>${t('dsFu')}:</b> ${t('dsFuOn', {d:fdate(fuD, {weekday:'short', day:'numeric', month:'short'}), n:num(fu)})}</p>` : ''}</div>
    <div class="ds-warn"><b>${ic('alert', 14)} ${t('dsWarn')}</b><span>${t('dsWarnTx')}</span></div>
    <div class="ds-sig"><div>${t('dsSigPt')}<small>${t('dsRec')}</small></div><div>${SIGN.img ? `<img src="${SIGN.img}" alt="">` : ''}${t('dsSigDoc')}<small>${esc(docName(p.doc))}</small></div></div>
  </div>`;
}
function dsDoc(p){
  const css = ["/* DSPRINT */\n.ds{font-size:12.5px;line-height:1.5;color:#14201b}\n.ds-h{display:flex;justify-content:space-between;gap:12px;border-bottom:2.5px solid #12976A;padding-bottom:10px;margin-bottom:12px;flex-wrap:wrap}\n.ds-l{display:flex;gap:10px}.ds-l b{display:block;font-size:17px;color:#0b4f3a}.ds-l span{display:block;font-size:11.5px;color:#5b6b64}\n.ds .bp-sq{width:32px;height:32px;border-radius:9px;background:#1BB880;display:grid;place-items:center;flex:none}.ds .bp-sq i{width:12px;height:12px;border-radius:50%;border:3px solid #fff;display:block}\n.ds-r{text-align:right}.ds-r b{display:block;font-size:15px;letter-spacing:.06em;color:#12976A;font-family:\"IBM Plex Sans\",Arial,sans-serif}.ds-r span{font-size:12px;color:#5b6b64}\n.ds-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px 14px;padding:10px 12px;background:#F4F8F6;border:1px solid #DCE6E1;border-radius:6px;margin-bottom:10px}\n.ds-g div span{display:block;font-size:10.5px;color:#5b6b64;text-transform:uppercase;letter-spacing:.04em}.ds-g div b{font-weight:600;font-size:12.5px}.ds-g small{font-weight:400;color:#5b6b64}\n@media (max-width:700px){.ds-g{grid-template-columns:repeat(2,minmax(0,1fr))}}\n.dsred{color:#B42318}\n.ds-s{padding:8px 0;border-bottom:1px solid #E3E8E5}.ds-s h4{margin:0 0 3px;font-size:11.5px;color:#0b4f3a;text-transform:uppercase;letter-spacing:.05em}.ds-s p{margin:0 0 2px}.ds-s ul{margin:0;padding-left:18px}\n.ds-s table{width:100%;border-collapse:collapse}.ds-s td{padding:4px 6px;border:1px solid #E3E8E5;vertical-align:top}.ds-s td span{display:block;font-size:10.5px;color:#5b6b64}.ds-s td b{color:#B42318}.ds-s td small{display:block;font-size:10px;color:#8a978f}\n.ds-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}\n.ds-warn{margin:10px 0;padding:8px 10px;border:1px solid #F3B9B9;background:#FDF1F1;border-radius:6px;color:#9B1C1C}.ds-warn b{display:block}.ds-warn .ic{width:14px;height:14px;vertical-align:-2px}\n.ds-sig{display:flex;justify-content:space-between;gap:20px;margin-top:34px}.ds-sig div{flex:1;max-width:240px;border-top:1px solid #8a978f;padding-top:4px;text-align:center;font-weight:600;position:relative}\n.ds-sig img{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);max-height:48px}.ds-sig small{display:block;font-weight:400;color:#5b6b64}\n@media print{.ds-g{grid-template-columns:repeat(4,1fr)}}\n"];
  return `<!doctype html><html lang="${S.lang}"><head><meta charset="utf-8"><title>Discharge summary ${esc(px(p).uhid)}</title><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet"><style>@page{size:A4;margin:12mm}body{margin:0;font-family:"Noto Sans Bengali","IBM Plex Sans",Arial,sans-serif;color:#14201b;--text-3:#5b6b64}.ic{width:14px;height:14px;vertical-align:-2px}${css ? css[0] : ''}</style></head><body>${dsBody(p)}</body></html>`;
}

/* ---------- payment receipt ---------- */
function inWords(n){
  n = Math.round(n); if (!n) return 'Zero';
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'], b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const two = x => x < 20 ? a[x] : b[Math.floor(x / 10)] + (x % 10 ? ' ' + a[x % 10] : ''), three = x => (x >= 100 ? a[Math.floor(x / 100)] + ' Hundred' + (x % 100 ? ' ' : '') : '') + (x % 100 ? two(x % 100) : '');
  const parts = []; const cr = Math.floor(n / 1e7), lk = Math.floor(n / 1e5) % 100, th = Math.floor(n / 1000) % 100, rest = n % 1000;
  if (cr) parts.push(three(cr) + ' Crore'); if (lk) parts.push(two(lk) + ' Lakh'); if (th) parts.push(two(th) + ' Thousand'); if (rest) parts.push(three(rest));
  return parts.join(' ');
}
function receiptHtml(p, y, rc, at){
  const x = totals(p), idx = p.pays.indexOf(y), paidUpto = p.pays.slice(0, idx + 1).reduce((s, z) => s + z.amt, 0), bal = Math.max(0, x.total - paidUpto), xx = px(p);
  const rel = p.fam && T['r' + p.rel] ? t('r' + p.rel) : '';
  return `<!doctype html><html lang="${S.lang}"><head><meta charset="utf-8"><title>${esc(rc || 'Receipt')}</title><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet"><style>
  @page{size:A5;margin:10mm}body{margin:0;font-family:"Noto Sans Bengali","IBM Plex Sans",Arial,sans-serif;color:#14201b;font-size:12px}
  .rc{border:1.5px solid #12976A;border-radius:10px;padding:16px 18px;max-width:560px;margin:0 auto;position:relative}
  .h{display:flex;justify-content:space-between;gap:10px;border-bottom:2px solid #12976A;padding-bottom:10px}.h b{font-size:17px;color:#0b4f3a;display:block}.h span{display:block;color:#5b6b64;font-size:11px;line-height:1.45}
  .sq{width:30px;height:30px;border-radius:8px;background:#1BB880;display:inline-grid;place-items:center;flex:none;margin-right:8px;vertical-align:top}.sq i{width:11px;height:11px;border-radius:50%;border:3px solid #fff;display:block}
  .tt{text-align:right}.tt b{font-size:13px;letter-spacing:.06em;color:#12976A}.meta{display:grid;grid-template-columns:1fr 1fr;gap:4px 14px;margin:12px 0;font-size:12px}.meta span{color:#5b6b64}
  .amt{display:flex;justify-content:space-between;align-items:center;background:#E7F6EF;border-radius:8px;padding:12px 14px;margin:10px 0}.amt b{font-size:24px;color:#0b4f3a}.w{font-size:11.5px;color:#14201b;margin-top:2px}
  table{width:100%;border-collapse:collapse;margin-top:6px}td{padding:6px 4px;border-bottom:1px solid #e3e8e5}.r{text-align:right}tr.b td{font-weight:700}tr.due td{color:#b42318}
  .f{display:flex;justify-content:space-between;align-items:flex-end;margin-top:22px}.sig{text-align:center;width:44%}.sig img{max-height:44px;display:block;margin:0 auto}.sig div{border-top:1px solid #999;padding-top:4px}
  .stamp{position:absolute;right:22px;top:118px;border:2.5px solid #12976A;color:#12976A;font-weight:800;letter-spacing:.12em;padding:4px 12px;border-radius:6px;transform:rotate(-8deg);opacity:.85}
  .note{color:#5b6b64;font-size:10.5px;margin-top:10px;text-align:center}</style></head><body><div class="rc">
  <div class="h"><div style="display:flex"><span class="sq"><i></i></span><div><b>${t('homeName')}</b>${FAC.addr ? `<span>${esc(FAC.addr)}</span>` : ''}${FAC.phone || FAC.gstin ? `<span>${FAC.phone ? t('fdPhone') + ': ' + esc(FAC.phone) : ''}${FAC.gstin ? (FAC.phone ? ' · ' : '') + 'GSTIN ' + esc(FAC.gstin) : ''}</span>` : ''}</div></div><div class="tt"><b>PAYMENT RECEIPT</b><span>${t('rcT')}</span></div></div>
  <div class="stamp">PAID</div>
  <div class="meta"><div><span>${t('rcNo')}</span><br><b>${esc(rc || '—')}</b></div><div><span>${S.lang === 'bn' ? 'তারিখ ও সময়' : 'Date & time'}</span><br><b>${fdate(at, {day:'numeric', month:'short', year:'numeric'})}, ${tm(at)}</b></div>
  <div><span>${t('rcFrom')}</span><br><b>${rel ? t('rcAttendant', {r:rel}) + ' · ' + `<span style="font-weight:400">${fmtPhone(p.fam)}</span>` : esc(nm(p))}</b></div><div><span>${t('fMethod')}</span><br><b>${t(y.m === 'bank' ? 'bankT' : y.m)}${y.ref ? ` · ${esc(y.ref)}` : ''}</b></div>
  <div style="grid-column:1/-1"><span>${t('rcFor')}</span><br><b>${t('rcForTx', {name:esc(nm(p)), u:esc(xx.uhid), b:esc(p.bed || '—')})}</b></div></div>
  <div class="amt"><div><span style="color:#5b6b64">${t('rcRecv')}</span><div class="w"><b style="font-size:12px;color:#14201b">${t('rcWords')}:</b> Rupees ${inWords(y.amt)} Only</div></div><b>${money(y.amt)}</b></div>
  <div style="font-weight:700;margin-top:10px">${t('rcSummary')}</div><table><tr><td>${t('rcBilledSoFar')}</td><td class="r">${money(x.total)}</td></tr><tr><td>${t('rcPaidTotal')}</td><td class="r">${money(paidUpto)}</td></tr><tr class="b ${bal ? 'due' : ''}"><td>${t('rcBalance')}</td><td class="r">${money(bal)}</td></tr></table>
  <div class="f"><div class="sig" style="text-align:left;width:auto"><span style="color:#5b6b64">${S.lang === 'bn' ? 'গ্রহণ করেছেন' : 'Received by'}</span><br><b>${esc(ROLES.owner.user[li()])}</b></div><div class="sig">${SIGN.img ? `<img src="${SIGN.img}" alt="">` : ''}<div>Authorised Signatory${SIGN.name ? `<br>${esc(SIGN.name)}` : ''}</div></div></div>
  <p class="note">${t('rcThanks')}</p></div></body></html>`;
}
function rcNo(y){ return (y && y.raw && y.raw.receipt_no) || ''; }
function mReceipt(m){
  const p = getP(m.pid), y = p && (p.pays.find(z => z.id === m.payId) || p.pays[p.pays.length - 1]);
  if (!y) return {title:t('rcT'), body:emptyState('receipt', t('loadErr'), ''), foot:`<button class="btn btn-secondary btn-lg grow" data-act="closeModal">${t('close')}</button>`};
  return {title:t('rcT'), sub:t('rcSub'), wide:true,
    body:`<div class="rcprev"><iframe title="${t('rcT')}" srcdoc="${esc(receiptHtml(p, y, rcNo(y), m.at || y.at))}"></iframe></div><p class="hint" style="display:flex;gap:6px;margin-top:10px">${ic('wa', 14)}${t('rcWaAuto')}</p>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('close')}</button><button class="btn btn-secondary btn-lg grow" data-act="rcpt" data-id="${y.id}">${ic('file')}${t('rcDl')}</button><button class="btn btn-primary btn-lg grow" data-act="rcPrint" data-primary>${ic('download')}${t('rcPrint')}</button>`};
}
function extraHandlers12(){
  Object.assign(H, {
    dpPick: el => { S.dpId = el.dataset.id; renderMain(); if (matchMedia('(max-width:1000px)').matches) { const d = $('dpPaper'); d && ROOT.querySelector('.dped').scrollIntoView({behavior:'smooth'}); } const b = ROOT.querySelector(`[data-act="dpPick"][data-id="${el.dataset.id}"]`); b && b.focus({preventScroll:true}); },
    dpReset: () => { delete DPED[S.dpId]; renderMain(); },
    dpPrint: () => printDoc(dsDoc(getP(S.dpId))),
    rcPrint: () => { const m = S.modal, p = getP(m.pid); printDoc(receiptHtml(p, p.pays[m.i], m.rc, m.at)); },
    rcWa: () => { const p = getP(S.modal.pid); toast(t('rcWaSent', {n:fmtPhone(p.fam || p.phone)})); }
  });
  ROOT.addEventListener('input', e => { const el = e.target; if (el.dataset.dp && S.dpId) { dpEd(getP(S.dpId))[el.dataset.dp] = el.value; const d = $('dpPaper'); if (d) d.innerHTML = dsBody(getP(S.dpId)); } });
  ROOT.addEventListener('change', e => { const el = e.target; if (el.dataset.dp && S.dpId) { dpEd(getP(S.dpId))[el.dataset.dp] = el.value; const d = $('dpPaper'); if (d) d.innerHTML = dsBody(getP(S.dpId)); } });
  /* show the receipt right after a payment is recorded */
  const _ps = H.paySave; H.paySave = (el, ev) => { const pid = S.modal && S.modal.pid, p = pid && getP(pid), n = p ? p.pays.length : 0; _ps(el, ev); if (p && p.pays.length > n) { const e = AUD.slice().reverse().find(a => a.act === 'pay' && a.d.pid === pid); openModal({type:'receipt', pid, i:p.pays.length - 1, rc:e ? e.d.rcpt : 'RC-' + Date.now().toString().slice(-5), at:new Date()}); } };
}

/* =================== v11: HELP & SUPPORT (owner) =================== */
Object.assign(T, {
  navHelp:['সাহায্য','Help & support'],
  hpT:['সাহায্য ও সাপোর্ট','Help & support'], hpSub:['ছবির মতো ধাপে ধাপে — কোথায় কী চাপবেন','Step by step — what to tap, where'], hpPick:['কী শিখতে চান বেছে নিন','Choose what you want to learn'],
  hpSteps:['{n}টি ধাপ','{n} steps'], hpStep:['ধাপ {n}','Step {n}'], hpOpen:['এখনই খুলে দেখুন','Open it now'], hpBack:['সব গাইড','All guides'], hpTap:['চাপুন','Tap'], hpWhere:['কোথায়','Where'],
  hpContact:['এখনও আটকে আছেন?','Still stuck?'], hpContactS:['AuraScale টিম হোয়াটসঅ্যাপে সাহায্য করবে — সকাল ৯টা থেকে রাত ৯টা।','The AuraScale team helps on WhatsApp — 9 AM to 9 PM.'], hpWa:['হোয়াটসঅ্যাপ করুন','WhatsApp us'], hpMail:['ইমেল','Email'],
  hpSearch:['খুঁজুন: বেড, রেট, স্টক, রিপোর্ট…','Search: bed, rate, stock, report…'], hpNone:['এই নামে কোনো গাইড নেই','No guide by that name'],
  g1:['রোগীর সব তথ্য ও মেডিকেল হিস্ট্রি দেখা','See a patient’s details & full history'], g2:['নতুন বেড বা খরচ যোগ করা','Add a bed or a charge'], g3:['বেডের ভাড়া (রেট) বদলানো','Change a rate'],
  g4:['স্টক দেখা ও রোগীকে দেওয়া','See stock & issue supplies'], g5:['বিল আর টাকা জমা দেখা','See bills & payments'], g6:['অডিট — কে কখন কী করেছেন','Audit — who did what'],
  g7:['নতুন স্টাফ যোগ করা','Add staff'], g8:['সাবস্ক্রিপশনের টাকা দেওয়া','Pay the subscription'], g9:['রাত ৮টার রিপোর্ট হোয়াটসঅ্যাপে পাওয়া','Get the 8 PM report on WhatsApp'], g10:['ভাষা বদলানো','Change the language'],
  g1s:[['বাঁদিকের মেনুতে “রোগী” চাপুন।','Tap “Patients” in the left menu.','nav:patients'], ['উপরের খোঁজার ঘরে নাম, ফোন, UHID বা বেড নম্বর লিখুন।','Type the name, phone, UHID or bed number in the search box.','box:search'], ['রোগীর নামের উপর চাপুন — পুরো রেকর্ড খুলবে।','Tap the patient’s name — the full record opens.','row'], ['উপরের ট্যাবগুলো চাপুন: সারাংশ, ভর্তির ইতিহাস, ভাইটালস, ওষুধ, সামগ্রী, ল্যাব, বিল, নোট, ডকুমেন্ট।','Use the tabs: Summary, Admissions, Vitals, Medicines, Supplies, Labs, Bill, Notes, Documents.','tabs'], ['অন্য ডাক্তারকে দেখাতে “ইতিহাস শেয়ার” চাপুন — QR/PIN বা PDF তৈরি হবে।','To show another doctor, tap “Share history” — you get a QR/PIN or a PDF.','btn:shareBtn']],
  g2s:[['বেড: “হিসাব ও রিপোর্ট” → “রেট লিস্ট” খুলুন।','Bed: open “Accounts & reports” → “Rate list”.','nav:accounts'], ['“বেড যোগ করুন” চাপুন, ওয়ার্ড বাছুন, নম্বর দিন, সংরক্ষণ করুন।','Tap “Add a bed”, pick the ward, enter the number and save.','btn:rtAddBed'], ['খরচ: “বিলিং” খুলে রোগীর লাইনে চাপুন।','Charge: open “Billing” and tap the patient’s row.','nav:billing'], ['“খরচ যোগ” চাপুন, ধরন (ওষুধ, পরীক্ষা, ওটি…) আর টাকা লিখে সংরক্ষণ করুন।','Tap “Add charge”, pick the type (medicine, test, OT…), enter the amount and save.','btn:addCharge']],
  g3s:[['বাঁদিকের মেনুতে “হিসাব ও রিপোর্ট” চাপুন।','Tap “Accounts & reports” in the left menu.','nav:accounts'], ['উপরের “রেট লিস্ট” ট্যাব চাপুন।','Tap the “Rate list” tab.','tab:acTabRate'], ['ওয়ার্ডের পাশে নতুন দিনের ভাড়া লিখুন।','Type the new daily rent next to the ward.','box:rate'], ['“রেট সংরক্ষণ করুন” চাপুন — অডিটে লেখা থাকবে কে কবে বদলেছেন।','Tap “Save rates” — the audit log records who changed it and when.','btn:rtSave']],
  g4s:[['মেনুতে “স্টক” চাপুন — উপরে মোট মূল্য, কম স্টক আর সিলিন্ডারের হিসেব।','Tap “Stock” — the top shows value, low stock and cylinders.','nav:stock'], ['কম থাকা জিনিস দেখতে “কম স্টক” কার্ড চাপুন।','Tap the “Low stock” card to see what is running out.','box:low'], ['রোগীকে কিছু দিতে “রোগীকে দিন” চাপুন — দেওয়ামাত্র স্টক থেকে কমে যাবে।','Tap “Issue to patient” — stock reduces at once.','btn:skIssue'], ['নতুন মাল এলে “স্টক যোগ / আপলোড” — হাতে, বিলের ছবি, CSV বা Excel।','New supply? “Add / upload stock” — by hand, bill photo, CSV or Excel.','btn:skAdd']],
  g5s:[['“বিলিং” খুলুন — কার কত বাকি, জরুরি বকেয়া সবার আগে।','Open “Billing” — who owes what, overdue first.','nav:billing'], ['টাকা নিতে “টাকা জমা নিন” চাপুন, মাধ্যম বাছুন, সংরক্ষণ — রসিদ নিজে তৈরি হবে।','To collect, tap “Record payment”, pick the method, save — the receipt is made.','btn:recordPayment'], ['ছুটি হয়ে যাওয়া রোগীর বিল: “চূড়ান্ত বিল” পাতা → “ডাউনলোড”।','Bills of discharged patients: “Final bills” → “Download”.','nav:bills'], ['মোট আয়-খরচ: “হিসাব ও রিপোর্ট” → “সারাংশ”।','Totals: “Accounts & reports” → “Overview”.','nav:accounts']],
  g6s:[['মেনুতে “অডিট” চাপুন।','Tap “Audit” in the menu.','nav:audit'], ['ডানদিকে রোল বাছুন — মালিক, রিসেপশন, নার্স বা ডাক্তার।','Pick a role on the right — owner, reception, nurse or doctor.','box:role'], ['তারিখ বাছুন — আজ, ৭ দিন, ৩০ দিন বা নিজে তারিখ দিন।','Pick a date — today, 7 days, 30 days or your own dates.','box:date'], ['যেকোনো লাইনে “বিস্তারিত” চাপুন — কে, কখন, কোন ডিভাইস থেকে, কী বদলেছে সব দেখাবে।','Tap “Details” on any line — who, when, which device and what changed.','btn:auDetails']],
  g7s:[['মেনুতে “স্টাফ” চাপুন, তারপর “আমন্ত্রণ” ট্যাব।','Tap “Staff”, then the “Invite” tab.','nav:staff'], ['নাম আর হোয়াটসঅ্যাপ নম্বর লিখুন, কী কাজ করবেন (ডাক্তার / নার্স / রিসেপশন) বাছুন।','Enter the name and WhatsApp number, pick the role (doctor / nurse / reception).','box:invite'], ['“আমন্ত্রণ পাঠান” চাপুন — লিংক খুলে পাসওয়ার্ড দিলেই লগইন চালু।','Tap “Send invite” — they open the link, set a password and can sign in.','btn:ivSend'], ['কেউ চলে গেলে “টিম” ট্যাবে “নিষ্ক্রিয় করুন” বা “অ্যাক্সেস বাতিল”।','If someone leaves: “Team” tab → “Deactivate” or “Revoke access”.','btn:tmRevokeBtn']],
  g8s:[['মেনুতে “সাবস্ক্রিপশন” চাপুন — কত দিন বাকি বড় করে দেখাবে।','Tap “Subscription” — days left are shown large.','nav:subscription'], ['বেড সংখ্যা আর সময় (১ মাস / ৬ মাস / ১ বছর) বাছুন।','Pick your bed count and period (1 month / 6 months / 1 year).','box:plan'], ['“পেমেন্ট করুন” চাপুন — UPI QR স্ক্যান করুন বা UPI অ্যাপ খুলুন।','Tap “Pay” — scan the UPI QR or open your UPI app.','btn:sbPayX'], ['পেমেন্টের পরে ট্যাক্স ইনভয়েস নিচের তালিকায় চলে আসবে।','After paying, the tax invoice appears in the list below.','box:inv']],
  g9s:[['মেনুতে “সেটিংস” চাপুন।','Tap “Settings”.','nav:settings'], ['“মালিকের হোয়াটসঅ্যাপ নম্বর” ঘরে নম্বর লিখে “তথ্য সংরক্ষণ করুন”।','Enter the number in “Owner’s WhatsApp number” and tap “Save details”.','btn:fdSave'], ['“হিসাব ও রিপোর্ট” → “রাত ৮টার রিপোর্ট” ট্যাবে রিপোর্ট চালু রাখুন।','In “Accounts & reports” → “8 PM report”, keep it switched on.','tab:acTabDay'], ['“এখন একটা পাঠিয়ে দেখুন” চাপলে সঙ্গে সঙ্গে একটা নমুনা যাবে।','Tap “Send a test now” to get a sample straight away.','btn:drTest']],
  g10s:[['উপরে ডানদিকে “EN” বা “বাং” বোতাম চাপুন।','Tap the “EN” / “বাং” button at the top right.','box:lang'], ['পুরো পোর্টাল সঙ্গে সঙ্গে বাংলা ↔ ইংরেজি হয়ে যাবে।','The whole portal switches between Bengali and English at once.','box:done'], ['বিল, রসিদ আর ছুটির কাগজও যে ভাষা চালু থাকবে সেই ভাষায় ছাপা হবে।','Bills, receipts and discharge papers print in the language that is on.','box:print']]
});
Object.assign(IC, {globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>', chevL:'<path d="m15 6-6 6 6 6"/>'});
NAVI.help = ['info', 'navHelp']; VIEWS.help = vHelp; ROLES.owner.nav.push('help');
const GUIDES = [['g1', 'folder', 'patients'], ['g2', 'bed', 'accounts'], ['g3', 'rupee', 'accounts'], ['g4', 'box', 'stock'], ['g5', 'receipt', 'billing'], ['g6', 'audit', 'audit'], ['g7', 'users', 'staff'], ['g8', 'crown', 'subscription'], ['g9', 'wa', 'accounts'], ['g10', 'globe', null]];
S.hpG = null; S.hpQ = '';
function hpMock(k){
  const [kind, v] = k.split(':');
  if (kind === 'nav') return `<div class="hm hm-nav">${['dashboard', 'beds', v].filter((x, i, a) => a.indexOf(x) === i).map(x => `<span class="${x === v ? 'on' : ''}">${ic(NAVI[x][0], 14)}${t(NAVI[x][1])}</span>`).join('')}<i class="hm-tap" aria-hidden="true"></i></div>`;
  if (kind === 'btn') { const lbl = v === 'sbPayX' ? t('sbPay', {amt:'₹…'}) : T[v] ? t(v) : v; return `<div class="hm hm-btn"><span class="hm-b">${esc(lbl)}</span><i class="hm-tap" aria-hidden="true"></i></div>`; }
  if (kind === 'tab') return `<div class="hm hm-tabs"><span>…</span><span class="on">${t(v)}</span><span>…</span><i class="hm-tap" aria-hidden="true"></i></div>`;
  if (k === 'tabs') return `<div class="hm hm-tabs">${['tSum', 'tAdm', 'tVit', 'tMed'].map((x, i) => `<span class="${i === 0 ? 'on' : ''}">${T[x] ? t(x) : x}</span>`).join('')}</div>`;
  if (k === 'row') return `<div class="hm hm-row"><span class="hm-av">গ</span><span><b>${S.lang === 'bn' ? 'গোপাল মাহাতো' : 'Gopal Mahato'}</b><small>I1 · ${S.lang === 'bn' ? 'স্ট্রোক' : 'Stroke'}</small></span><i class="hm-tap" aria-hidden="true"></i></div>`;
  if (v === 'lang') return `<div class="hm hm-btn"><span class="hm-b hm-sq">EN</span><span class="hm-b hm-sq">${ic('moon', 14)}</span><i class="hm-tap" aria-hidden="true"></i></div>`;
  return `<div class="hm hm-box">${ic({search:'search', rate:'rupee', low:'alert', role:'users', date:'cal', invite:'send', plan:'crown', inv:'receipt', done:'check', print:'file'}[v] || 'info', 18)}<span></span><span></span></div>`;
}
function vHelp(){
  const g = S.hpG && GUIDES.find(x => x[0] === S.hpG);
  const contact = `<section class="card setc hpc"><div class="setc-h"><span class="setc-ic" style="background:#E7F8EE;color:#128C4A">${ic('wa', 20)}</span><div><h2>${t('hpContact')}</h2><p>${t('hpContactS')}</p></div></div><div class="setbtns"><a class="btn btn-primary grow" style="background:#128C4A;border-color:#128C4A" target="_blank" rel="noopener" href="https://wa.me/${AURA_CFG.wa}?text=${encodeURIComponent('Hi AuraScale, I need help with ' + t('homeName'))}">${ic('wa')}${t('hpWa')}</a><a class="btn btn-secondary" href="mailto:${AURA_CFG.mail}">${ic('mail')}${t('hpMail')}</a></div></section>`;
  if (g) {
    const steps = T[g[0] + 's'];
    return `<div class="ph"><div><button class="link hpback" data-act="hpBack">${ic('chevL', 16)}${t('hpBack')}</button><h1>${t(g[0])}</h1><p class="sub">${t('hpSteps', {n:num(steps.length)})}</p></div>${g[2] ? `<div class="ph-actions"><button class="btn btn-primary" data-act="hpGo" data-v="${g[2]}">${t('hpOpen')}${ic('chevR', 16)}</button></div>` : ''}</div>
    <ol class="hps">${steps.map((s, i) => `<li class="card"><span class="hpn">${num(i + 1)}</span><div class="hpt"><span class="eyebrow">${t('hpStep', {n:num(i + 1)})}</span><p>${esc(s[li()])}</p></div>${hpMock(s[2])}</li>`).join('')}</ol>${contact}`;
  }
  const q = S.hpQ.trim().toLowerCase(), L = GUIDES.filter(x => !q || T[x[0]].some(s => s.toLowerCase().includes(q)) || T[x[0] + 's'].some(st => st.slice(0, 2).some(s => s.toLowerCase().includes(q))));
  return `<div class="ph"><div><h1>${t('hpT')}</h1><p class="sub">${t('hpSub')}</p></div></div>
    <div class="toolbar"><label class="search"><span class="vh">${t('hpSearch')}</span>${ic('search')}<input class="input" id="hpQ" type="search" placeholder="${t('hpSearch')}" value="${esc(S.hpQ)}" autocomplete="off"></label></div>
    <h2 class="imq">${t('hpPick')}</h2>
    <div class="hpg" id="hpGrid">${L.map((x, i) => `<button class="hpi" data-act="hpOpenG" data-v="${x[0]}"><span class="imty-ic">${ic(x[1], 22)}</span><span class="hpnum">${num(GUIDES.indexOf(x) + 1)}</span><b>${t(x[0])}</b><small>${t('hpSteps', {n:num(T[x[0] + 's'].length)})}</small></button>`).join('') || `<p class="nf-none">${t('hpNone')}</p>`}</div>${contact}`;
}
function extraHandlers13(){
  Object.assign(H, {
    hpOpenG: el => { S.hpG = el.dataset.v; renderMain(); window.scrollTo(0, 0); },
    hpBack: () => { S.hpG = null; renderMain(); },
    hpGo: el => { const v = el.dataset.v; if (S.hpG === 'g3' || S.hpG === 'g2') S.acTab = 'rate'; if (S.hpG === 'g9') S.acTab = 'day'; if (S.hpG === 'g7') S.sfTab = 'inv'; go(v); }
  });
  ROOT.addEventListener('input', e => { if (e.target.id === 'hpQ') { S.hpQ = e.target.value; const pos = e.target.selectionStart; renderMain(); const i = $('hpQ'); if (i) { i.focus(); i.setSelectionRange(pos, pos); } } });
}


/* =====================================================================
   LIVE DATA — everything below reads and writes the real database.
   The demo's screens above stay exactly as designed; only their data
   comes from here.
   ===================================================================== */
const SB = () => (typeof _supa !== 'undefined' ? _supa : window._supa);
const CID = () => (typeof _clinicId !== 'undefined' ? _clinicId : window._clinicId);
const UID = () => (typeof _myUid !== 'undefined' ? _myUid : (window._myUid || null));
const LV = {clinic:{}, bedRows:[], adm:[], pat:{}, staff:[], nhStaff:[], invites:[], items:[], moves:[], cyl:[], audit:[], bills:[], rev:[], loaded:false, err:''};
const DAYMS = 864e5;
const dStart = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const dBetween = (a, b) => Math.round((dStart(b) - dStart(a)) / DAYMS);
const agoD = d => d ? Math.max(0, dBetween(new Date(d), new Date())) : 0;
const ymd = d => { const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
const mKey = m => { m = String(m || '').toLowerCase(); return m.includes('cash') ? 'cash' : m.includes('upi') ? 'upi' : m.includes('card') ? 'card' : (/bank|transfer|neft|imps|rtgs|net|cheque/.test(m) ? 'bank' : 'cash'); };
const mDb = k => ({cash:'Cash', upi:'UPI', card:'Card', bank:'Bank transfer'})[k] || 'Cash';
const cType = s => { s = String(s || '').toLowerCase(); if (/bed|room|ward/.test(s)) return 'bed'; if (/medic|drug|pharm|inj|tab/.test(s)) return 'med'; if (/lab|test|x-?ray|usg|scan|diagn|pathol/.test(s)) return 'test'; if (/doctor|visit|consult/.test(s)) return 'visit'; if (/^ot$|\bot\b|operat|surg|procedure/.test(s)) return 'ot'; return 'other'; };
const cDb = k => ({bed:'Bed Charge', med:'Medicine', test:'Lab Test', visit:'Doctor Visit', ot:'OT', other:'Other'})[k] || 'Other';
const sexK = g => { g = String(g || '').trim().toLowerCase(); return /^f|female|মহিলা|স্ত্রী/.test(g) ? 'F' : /^m|male|পুরুষ/.test(g) ? 'M' : 'O'; };
const sexDb = s => s === 'M' ? 'Male' : s === 'F' ? 'Female' : 'Other';
const digits10 = s => { const d = String(s || '').replace(/[০-৯]/g, x => '০১২৩৪৫৬৭৮৯'.indexOf(x)).replace(/\D/g, ''); return d.length > 10 ? d.slice(-10) : d; };
const two = s => [String(s || ''), String(s || '')];
const relKey = s => { s = String(s || '').toLowerCase(); return /daughter|মেয়ে|কন্যা/.test(s) ? 'daughter' : /\bson\b|ছেলে|পুত্র/.test(s) ? 'son' : /husband|স্বামী/.test(s) ? 'husband' : /wife|স্ত্রী/.test(s) ? 'wife' : /father|mother|parent|বাবা|মা\b|পিতা|মাতা/.test(s) ? 'parent' : 'other'; };
const bedWard = id => (beds[id] && beds[id].ward) || '';
const wKey = id => { const w = WARD[bedWard(id)]; return w ? w.key : '—'; };
function chunk(a, n){ const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; }
async function selIn(table, col, ids, cols){
  const out = []; for (const c of chunk(ids, 150)) { const r = await SB().from(table).select(cols || '*').in(col, c); if (r.error) throw r.error; out.push(...(r.data || [])); } return out;
}
async function safe(p){ try { const r = await p; return r && r.error ? {data:null, error:r.error} : r; } catch (e) { return {data:null, error:e}; } }
const wardLbl = w => { const k = String(w || '').trim(); const L = {general:['জেনারেল ওয়ার্ড','General ward'], 'general ward':['জেনারেল ওয়ার্ড','General ward'], female:['মহিলা ওয়ার্ড','Female ward'], 'female ward':['মহিলা ওয়ার্ড','Female ward'], male:['পুরুষ ওয়ার্ড','Male ward'], 'male ward':['পুরুষ ওয়ার্ড','Male ward'], maternity:['প্রসূতি ওয়ার্ড','Maternity ward'], icu:['আইসিইউ','ICU'], hdu:['এইচডিইউ','HDU'], nicu:['এনআইসিইউ','NICU'], private:['প্রাইভেট কেবিন','Private cabin'], cabin:['কেবিন','Cabin'], 'semi-private':['সেমি-প্রাইভেট','Semi-private'], 'semi private':['সেমি-প্রাইভেট','Semi-private'], emergency:['ইমার্জেন্সি','Emergency'], deluxe:['ডিলাক্স কেবিন','Deluxe cabin'], children:['শিশু ওয়ার্ড','Children ward'], paediatric:['শিশু ওয়ার্ড','Paediatric ward']}[k.toLowerCase()]; return L || [k || 'Ward', k || 'Ward']; };

async function LIVE_LOAD(){
  const sb = SB(), cid = CID(); if (!sb || !cid) throw new Error('not signed in');
  const since = new Date(Date.now() - 180 * DAYMS).toISOString();
  const today = ymd(new Date());
  const [cl, bd, aa, ad] = await Promise.all([
    sb.from('clinics').select('*').eq('id', cid).single(),
    sb.from('beds').select('*').eq('clinic_id', cid),
    sb.from('admissions').select('*').eq('clinic_id', cid).eq('status', 'Active'),
    sb.from('admissions').select('*').eq('clinic_id', cid).neq('status', 'Active').gte('discharge_date', since).order('discharge_date', {ascending:false}).limit(400)
  ]);
  if (cl.error) throw cl.error; if (bd.error) throw bd.error; if (aa.error) throw aa.error;
  LV.clinic = cl.data || {}; LV.bedRows = bd.data || [];
  LV.adm = (aa.data || []).concat(ad.data || []);
  const admIds = LV.adm.map(a => a.id), patIds = [...new Set(LV.adm.map(a => a.patient_id).filter(Boolean))];
  const actIds = (aa.data || []).map(a => a.id);
  const wk = new Date(Date.now() - 7 * DAYMS); wk.setHours(0, 0, 0, 0);
  const R = await Promise.all([
    selIn('nh_patients', 'id', patIds).catch(() => []),
    selIn('admission_charges', 'admission_id', admIds).catch(() => []),
    selIn('nh_payments', 'admission_id', admIds).catch(() => []),
    selIn('progress_notes', 'admission_id', actIds).catch(() => []),
    safe(sb.from('nh_licences').select('*').eq('clinic_id', cid).order('expires_on')),
    safe(sb.from('hr_staff').select('*').eq('clinic_id', cid).order('name')),
    safe(sb.from('hr_attendance').select('*').eq('clinic_id', cid).eq('day', today)),
    safe(sb.from('nh_staff').select('*').eq('clinic_id', cid)),
    safe(sb.from('nh_stock_items').select('*').eq('clinic_id', cid).order('name')),
    safe(sb.from('nh_stock_moves').select('*').eq('clinic_id', cid).order('created_at', {ascending:false}).limit(400)),
    safe(sb.from('nh_audit_log').select('*').eq('clinic_id', cid).order('created_at', {ascending:false}).limit(400)),
    safe(sb.from('patient_bills').select('*').eq('clinic_id', cid).order('created_at', {ascending:false}).limit(400)),
    safe(sb.from('nh_payments').select('*').eq('clinic_id', cid).gte('created_at', wk.toISOString()).limit(2000)),
    safe(sb.from('nh_invites').select('*').eq('clinic_id', cid)),
    safe(sb.from('nh_cylinder_issues').select('*').eq('clinic_id', cid).order('issued_at', {ascending:false}).limit(400))
  ]);
  const pats = {}; R[0].forEach(x => pats[x.id] = x); LV.pat = pats;
  const chg = {}, pay = {}, vit = {};
  R[1].forEach(c => (chg[c.admission_id] = chg[c.admission_id] || []).push(c));
  R[2].forEach(c => (pay[c.admission_id] = pay[c.admission_id] || []).push(c));
  R[3].forEach(c => (vit[c.admission_id] = vit[c.admission_id] || []).push(c));
  LV.lic = R[4].data || []; LV.staff = R[5].data || []; LV.att = {}; (R[6].data || []).forEach(a => LV.att[a.staff_id] = a);
  LV.nhStaff = R[7].data || []; LV.items = R[8].data || []; LV.moves = R[9].data || []; LV.audit = R[10].data || [];
  LV.bills = R[11].data || []; LV.rev = R[12].data || []; LV.invites = R[13].data || []; LV.cyl = R[14].data || [];
  LV.stockOk = !R[8].error; LV.cylOk = !R[14].error;
  LV.maps = [chg, pay, vit];
  buildAll(chg, pay, vit);
  try { await liveExtra(); } catch (e) { console.warn('AuraUI extra', e); }
  LV.loaded = true;
}

function buildAll(chg, pay, vit){
  const c = LV.clinic, nmC = c.name || 'Nursing Home';
  T.homeName = [nmC, nmC];
  const town = [c.city, c.district].filter(Boolean).join(', ') || String(c.address || '').split(',').slice(-2).join(',').trim();
  const nb = LV.bedRows.filter(b => b.is_active !== false).length;
  T.homeTown = [(town ? town + ' · ' : '') + num(nb) + ' বেড', (town ? town + ' · ' : '') + nb + ' beds'];
  const own = LV.nhStaff.find(s => s.id === UID()) || {};
  const ownerName = own.full_name || c.owner_name || c.doctor_name || '';
  T.ownerShort = [ownerName.split(/\s+/).slice(0, 2).join(' ') || 'মালিক', ownerName.split(/\s+/).slice(0, 2).join(' ') || 'Owner'];
  ROLES.owner.user = [ownerName || 'মালিক', ownerName || 'Owner'];
  const iniOf = s => { s = String(s || '').replace(/^(dr\.?|ডা\.?)\s*/i, '').trim(); if (!s) return '?'; if (!/[A-Za-z]/.test(s)) return Array.from(s)[0]; const w = s.split(/\s+/); return ((w[0] || '')[0] + ((w[1] || '')[0] || '')).toUpperCase(); };
  ROLES.owner.ini = [iniOf(ownerName), iniOf(ownerName)];
  T.fictional = ['', ''];
  /* doctors */
  Object.keys(DOC).forEach(k => delete DOC[k]);
  const dn = [], seen = {};
  const addDoc = (n, uid) => { n = String(n || '').trim(); if (!n) return; const k0 = n.toLowerCase(); if (seen[k0]) { if (uid && !DOC[seen[k0]].uid) DOC[seen[k0]].uid = uid; return seen[k0]; } const k = 'd' + (dn.length + 1); dn.push(k); seen[k0] = k; DOC[k] = {n:[n, n], sp:['', ''], uid:uid || null}; return k; };
  LV.nhStaff.filter(s => s.role === 'doctor' && s.is_active !== false).forEach(s => addDoc(s.full_name, s.id));
  if (c.doctor_name) addDoc(c.doctor_name);
  LV.adm.forEach(a => addDoc(a.admitting_doctor));
  LV.docKey = n => seen[String(n || '').trim().toLowerCase()] || '';
  /* wards & beds */
  WARDS.length = 0; Object.keys(WARD).forEach(k => delete WARD[k]); Object.keys(beds).forEach(k => delete beds[k]);
  const occBy = {}; LV.adm.filter(a => a.status === 'Active' && a.bed_id).forEach(a => occBy[a.bed_id] = a.id);
  const rows = LV.bedRows.filter(b => b.is_active !== false).slice().sort((a, b) => String(a.bed_number).localeCompare(String(b.bed_number), 'en', {numeric:true}));
  const rates = {};
  rows.forEach(b => {
    const w = String(b.ward || 'General').trim() || 'General';
    if (!WARD[w]) { const W = {id:w, key:'w_' + w, rate:0, n:0}; T['w_' + w] = wardLbl(w); WARD[w] = W; WARDS.push(W); rates[w] = {}; }
    WARD[w].n++; const r = Number(b.daily_rate) || 0; rates[w][r] = (rates[w][r] || 0) + 1;
    let id = String(b.bed_number || '').trim() || '—'; while (beds[id]) id += '′';
    const st = String(b.status || '').toLowerCase();
    const o = {id, ward:w, uuid:b.id, rate:Number(b.daily_rate) || 0, row:b, status:'free'};
    if (occBy[b.id]) { o.status = 'occ'; o.pid = occBy[b.id]; }
    else if (/clean/.test(st)) o.status = 'clean';
    else if (/maint|reserv|block|repair/.test(st)) { o.status = 'res'; o.res = {name:/reserv/.test(st) ? ['সংরক্ষিত', 'Reserved'] : ['মেরামত চলছে', 'Under maintenance'], note:['', ''], maint:!/reserv/.test(st)}; }
    beds[id] = o;
  });
  WARDS.forEach(W => { const m = rates[W.id]; W.rate = +Object.keys(m).sort((a, b) => m[b] - m[a])[0] || 0; });
  const ord = ['icu', 'hdu', 'nicu', 'emergency', 'maternity', 'female', 'female ward', 'male', 'male ward', 'general', 'general ward', 'semi-private', 'private', 'cabin', 'deluxe'];
  WARDS.sort((a, b) => { const x = ord.indexOf(a.id.toLowerCase()), y = ord.indexOf(b.id.toLowerCase()); return (x < 0 ? 50 : x) - (y < 0 ? 50 : y) || a.id.localeCompare(b.id); });
  const bedOfUuid = {}; Object.values(beds).forEach(b => bedOfUuid[b.uuid] = b.id);
  const bedAny = {}; LV.bedRows.forEach(b => bedAny[b.id] = String(b.bed_number || ''));
  /* patients (one per admission) */
  P.length = 0;
  LV.adm.forEach(a => {
    const pt = LV.pat[a.patient_id] || {};
    const disc = a.status !== 'Active';
    const name = (a.patient_name || pt.full_name || '—').trim();
    const ch = (chg[a.id] || []).map(c => ({id:c.id, type:cType(c.charge_type), amt:Number(c.total_price) || 0, desc:c.description || (String(c.charge_type || '') !== cDb(cType(c.charge_type)) ? c.charge_type : ''), ago:agoD(c.created_at || a.admission_date), at:new Date(c.created_at || a.admission_date), qty:c.quantity, stock:c.stock_item_id || null, raw:c})).sort((x, y) => x.at - y.at);
    const pays = (pay[a.id] || []).map(y => ({id:y.id, amt:Number(y.amount) || 0, m:mKey(y.method), ago:agoD(y.created_at || y.payment_date), at:new Date(y.created_at || y.payment_date), ref:y.txn_id || y.reference || '', raw:y})).sort((x, y) => x.at - y.at);
    const v = (vit[a.id] || []).map(n => { const bp = String(n.bp || n.blood_pressure || '').split('/'); return {sys:+bp[0] || null, dia:+bp[1] || null, pulse:n.pulse != null && n.pulse !== '' ? +n.pulse : null, temp:n.temperature != null && n.temperature !== '' ? +n.temperature : null, spo2:n.spo2 != null && n.spo2 !== '' ? +n.spo2 : null, at:new Date(n.created_at), by:n.recorded_by_name || n.created_by_name || '', note:n.note || n.notes || ''}; }).filter(x => x.sys || x.pulse || x.temp || x.spo2).sort((x, y) => x.at - y.at);
    const famRaw = a.family_phone || pt.guardian_phone || pt.family_phone || pt.emergency_phone || '';
    const p = {id:a.id, row:a, pt, name:two(name), age:a.patient_age != null && a.patient_age !== '' ? +a.patient_age : (pt.age != null ? +pt.age : null), sex:sexK(a.patient_gender || pt.gender),
      bed:disc ? (bedAny[a.bed_id] || '') : (bedOfUuid[a.bed_id] || bedAny[a.bed_id] || ''), doc:LV.docKey(a.admitting_doctor), reason:two(a.admission_diagnosis || a.diagnosis || a.reason || ''),
      rel:relKey(a.family_relation || pt.guardian || ''), extra:[], ch, pays, disc, phone:digits10(a.patient_phone || pt.phone), fam:digits10(famRaw),
      days:disc ? Math.max(0, dBetween(a.admission_date, a.discharge_date || new Date())) : agoD(a.admission_date), admAgo:agoD(a.admission_date), discAgo:disc ? agoD(a.discharge_date) : null,
      admAt:new Date(a.admission_date), discAt:a.discharge_date ? new Date(a.discharge_date) : null, vit:v.length ? v : null, meds:[], dnotes:[], round:false, uhid:a.uhid || pt.uhid || ''};
    if (a.discharge_advised_at && !disc) { const k = LV.docKey(a.discharge_advised_by) || p.doc; p.advice = {by:k, byName:a.discharge_advised_by || '', at:new Date(a.discharge_advised_at), text:['', ''], fu:0}; }
    if (p.age == null || isNaN(p.age)) p.age = 0;
    P.push(p);
  });
  /* licences */
  LIC.length = 0;
  LV.lic.forEach(l => LIC.push({id:l.id, name:l.name || '', auth:l.authority || '', no:l.number || '', days:dBetween(new Date(), l.expires_on), rem:Array.isArray(l.remind_days) ? l.remind_days.slice() : [30, 15, 7], row:l}));
  /* 7-day collection (whole clinic) */
  const by = [0, 0, 0, 0, 0, 0, 0];
  LV.rev.forEach(y => { const a = agoD(y.created_at || y.payment_date); if (a >= 0 && a <= 6) by[6 - a] += Number(y.amount) || 0; });
  PREV_REV.length = 0; by.slice(0, 6).forEach(v => PREV_REV.push(v)); LV.todayRev = by[6];
  /* staff (attendance board) */
  STAFF.length = 0;
  const phoneOf = {}; LV.invites.forEach(i => { if (i.used_by && i.phone) phoneOf[i.used_by] = i.phone; });
  const nowMin = (() => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); })();
  LV.staff.filter(s => s.is_active !== false).forEach(s => {
    const ds = String(s.duty_start || '10:00').slice(0, 5), hm = ds.split(':'), start = (+hm[0] || 0) * 60 + (+hm[1] || 0);
    const a = LV.att[s.id];
    let st = 'upcoming';
    if (a) st = a.status === 'present' ? (a.late ? 'late' : 'present') : a.status === 'half' ? 'late' : a.status === 'leave' || a.status === 'absent' ? 'leave' : 'upcoming';
    else if (nowMin > start + 15) st = 'absent';
    const jd = String(s.designation || s.role || '').toLowerCase();
    const j = /doctor|ডাক্তার|dr\b/.test(jd) ? 'jDoc' : /nurse|নার্স|sister|gnm|anm/.test(jd) ? 'jNurse' : /recep|desk|রিসেপ|bill/.test(jd) ? 'jRecep' : /clean|sweep|house|ঝাড়ু/.test(jd) ? 'jHk' : /pharm|ফার্মা/.test(jd) ? 'jPh' : /ayah|aya|attend|ward boy|আয়া/.test(jd) ? 'jAyah' : 'jOther';
    STAFF.push({id:s.id, n:two(s.name), j, jRaw:s.designation || '', sub:two((s.designation || '') + ' · ' + fmtShiftTime(ds)), sh:start < 12 * 60 ? 'M' : start < 18 * 60 ? 'E' : 'N', st, ph:digits10(s.phone || phoneOf[s.user_id] || ''), row:s});
  });
  buildStock(); buildAudit();
}
function fmtShiftTime(hm){ const p = String(hm).split(':'), h = +p[0], m = +p[1] || 0; return S.lang === 'bn' ? (h % 12 || 12) + (m ? ':' + String(m).padStart(2, '0') : '') + 'টা' : (h % 12 || 12) + (m ? ':' + String(m).padStart(2, '0') : '') + (h < 12 ? ' AM' : ' PM'); }


/* ---------- live: stock, audit, small helpers ---------- */
const advName = p => p.advice ? (p.advice.byName || docName(p.advice.by)) : '';
const catOf = it => { const c = String(it.category || '').toLowerCase(); if (SCAT.includes(c)) return c; const n = String(it.name || '').toLowerCase(), ct = String(it.charge_type || '').toLowerCase();
  if (/oxygen|cylinder|সিলিন্ডার|অক্সিজেন|mask|cannula|nebul/.test(n)) return 'oxy'; if (/medic/.test(ct) || /\binj|tab\b|syp|syrup|saline|vial|ইঞ্জে|ট্যাব/.test(n)) return 'med';
  if (/machine|oximeter|monitor|stand|pump|যন্ত্র/.test(n)) return 'eq'; if (/sheet|linen|towel|pillow|blanket|চাদর|বেডশিট/.test(n)) return 'lin'; return 'cons'; };
function buildStock(){
  SK.length = 0; MOV.length = 0; ISS.length = 0;
  LV.items.filter(i => i.is_active !== false).forEach(i => SK.push({id:i.id, n:two(i.name), cat:catOf(i), u:i.unit || 'pcs', qty:Number(i.quantity) || 0, min:Number(i.low_level) || 0, cost:Number(i.cost) || 0, price:Number(i.price) || 0,
    batch:i.batch || '', exp:i.expires_on ? new Date(i.expires_on + 'T12:00:00') : null, sup:i.supplier || '', ret:!!i.returnable, empty:Number(i.empty_qty) || 0, row:i}));
  const srcOf = n => { n = String(n || '').toLowerCase(); return /photo|bill|ছবি/.test(n) ? 'photo' : /excel|xls/.test(n) ? 'xls' : /csv/.test(n) ? 'csv' : /charged|bill|ward/.test(n) ? 'ward' : 'man'; };
  LV.moves.slice().reverse().forEach(m => {
    const ch = Number(m.change) || 0; if (!ch && m.kind !== 'opening') return;
    const type = m.kind === 'used' ? 'out' : m.kind === 'returned' ? 'ret' : m.kind === 'corrected' ? (ch < 0 ? 'out' : 'in') : (/refill/i.test(m.note || '') ? 'ref' : 'in');
    const p = m.admission_id ? getP(m.admission_id) : null;
    MOV.push({id:m.id, at:new Date(m.created_at), type, item:m.item_id, q:Math.abs(ch), pid:p ? p.id : null, src:m.kind === 'used' ? 'ward' : srcOf(m.note), by:(m.patient_name ? m.patient_name + (m.bed_label ? ' · ' + m.bed_label : '') : (m.created_by_name || '')), note:m.note || ''});
  });
  const cylBy = {}; (LV.cyl || []).forEach(c => (cylBy[c.admission_id + '|' + c.item_id] = cylBy[c.admission_id + '|' + c.item_id] || []).push(c));
  P.forEach(p => (p.ch || []).filter(c => c.stock).forEach(c => {
    const it = SK.find(i => i.id === c.stock); if (!it) return;
    if (it.ret) return;
    ISS.push({id:'c-' + c.id, item:c.stock, pid:p.id, q:Number(c.qty) || 1, at:c.at, ret:null, amt:c.amt, charge:c.id});
  }));
  (LV.cyl || []).forEach(c => { const p = getP(c.admission_id); if (!p || !SK.find(i => i.id === c.item_id)) return;
    const chg = (p.ch || []).find(x => x.stock === c.item_id);
    ISS.push({id:'y-' + c.id, cyl:c.id, item:c.item_id, pid:p.id, q:Number(c.qty) || 1, at:new Date(c.issued_at || c.created_at || Date.now()), ret:!!c.returned_at, amt:chg ? chg.amt : 0}); });
}
const ROLEMAP = r => { r = String(r || '').toLowerCase(); return r === 'owner' ? 'owner' : /recep/.test(r) ? 'reception' : /nurse/.test(r) ? 'nurse' : /doctor/.test(r) ? 'doctor' : 'system'; };
function buildAudit(){
  AUD.length = 0;
  const who = {}; LV.nhStaff.forEach(s => who[s.id] = s);
  const L = LV.audit.slice().reverse();
  L.forEach((a, k) => {
    const d = a.details || {}, act = String(a.action || ''), s = who[a.actor_id] || {}, role = a.actor_id ? (s.role ? ROLEMAP(s.role) : (a.actor_id === UID() ? 'owner' : 'system')) : 'system';
    const cat = /pay|receipt|refund/.test(act) ? 'pay' : /charge|bill|discount|gst/.test(act) ? 'bill' : /stock/.test(act) ? 'stock' : /admi|discharg|patient|bed|registr|transfer/.test(act) ? 'adm' : /note|vital|advice|round/.test(act) ? 'clin' : 'sys';
    const p = a.target_table === 'admissions' ? getP(a.target_id) : (d.admission_id ? getP(d.admission_id) : null);
    const amt = Number(d.amount || d.total || d.total_price || 0) || 0;
    const nmP = d.patient_name || d.name || d.patient || (p ? nm(p) : '');
    const title = auTitleOf(act, d);
    const rows = Object.keys(d).filter(x => d[x] != null && d[x] !== '' && typeof d[x] !== 'object').slice(0, 12).map(x => [esc(x.replace(/_/g, ' ')), esc(String(d[x]))]);
    const e = {at:new Date(a.created_at), role, by:two(s.full_name || (role === 'owner' ? ROLES.owner.user[0] : role === 'system' ? 'AuraScale' : '—')), dev:DEVK[role] || 'dvSys', act:'gen', cat, gt:title + (nmP ? ' — ' + nmP : ''), gd:rows, amt, d:{name:nmP ? two(nmP) : null, pid:p ? p.id : null}, tone:{pay:'green', bill:'violet', stock:'blue', adm:'blue', clin:'amber', sys:'grey'}[cat], icon:{pay:'rupee', bill:'receipt', stock:'box', adm:'bed', clin:'note', sys:'gear'}[cat]};
    e.no = k + 1; e.id = 'AUD-' + String(24000 + e.no).padStart(6, '0'); e.seal = hashOf(String(a.id || '') + e.at.toISOString() + act);
    AUD.push(e);
  });
  lastAud = null;
}
function auTitleOf(act, d){
  const bn = S.lang === 'bn', A = {payment_recorded:['টাকা জমা','Payment received'], charge_added:['খরচ যোগ','Charge added'], patient_registered:['রোগী নিবন্ধন','Patient registered'], admission:['ভর্তি','Admission'], admitted:['ভর্তি','Admission'],
    discharged:['ছুটি','Discharge'], discharge:['ছুটি','Discharge'], bed_added:['বেড যোগ','Bed added'], bed_updated:['বেড বদল','Bed changed'], bed_deleted:['বেড মোছা','Bed deleted'], stock_received:['স্টক জমা','Stock received'], stock_used:['স্টক খরচ','Stock used'],
    stock_opening:['নতুন সামগ্রী','New item'], stock_corrected:['স্টক সংশোধন','Stock corrected'], stock_returned:['স্টক ফেরত','Stock returned'], final_bill:['চূড়ান্ত বিল','Final bill'], bill_generated:['চূড়ান্ত বিল','Final bill'], licence_renewed:['লাইসেন্স নবীকরণ','Licence renewed'], data_import:['পুরোনো ডেটা আনা','Data import']};
  const x = A[act] || A[act.replace(/s$/, '')];
  if (x) return (bn ? x[0] : x[1]) + (d.item ? ' — ' + d.item + (d.change ? ' (' + (d.change > 0 ? '+' : '') + d.change + ')' : '') : '');
  return act.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
}
function sbFootExtra(){
  const many = window.AURA_BIZ_LIST && window.AURA_BIZ_LIST.length > 1;
  return `<div style="display:flex;gap:8px;margin-top:10px">${many ? `<button class="btn btn-mint btn-sm" style="flex:1" data-act="bizSwitch">${ic('users', 16)}${t('bizSwitch')}</button>` : ''}<button class="btn btn-mint btn-sm" style="flex:1" data-act="signOut">${ic('exit', 16)}${t('signOut')}</button></div><p style="font-size:11.5px;margin:10px 2px 0;opacity:.75"><a href="https://aurascale.in/privacy" target="_blank" rel="noopener" style="color:inherit">${t('lgLinks')}</a> · <a href="https://aurascale.in/terms" target="_blank" rel="noopener" style="color:inherit">${t('lgTerms')}</a> · <a href="https://aurascale.in/agreement" target="_blank" rel="noopener" style="color:inherit">${t('lgAgr')}</a></p>`;
}
async function loadDocs(p){
  if (p.docsBusy) return; p.docsBusy = true;
  const pid = p.row && p.row.patient_id;
  try {
    const r = pid ? await SB().from('nh_patient_documents').select('*').eq('patient_id', pid).order('created_at', {ascending:false}) : {data:[]};
    p.docs = (r.data || []).filter(d => !/aadhaar/i.test(d.document_type || '')).map(d => ({n:d.file_name || d.document_type || 'File', at:new Date(d.created_at), type:d.document_type || '', path:d.file_path}));
  } catch (e) { p.docs = []; }
  p.docsLoaded = true; p.docsBusy = false;
  if (S.view === 'patients' && S.patId === p.id && S.patTab === 'docs') renderMain();
}
function fileB64(f){ return new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1]); r.onerror = no; r.readAsDataURL(f); }); }
function imgJpeg(f, max){
  return new Promise(ok => { const img = new Image(), u = URL.createObjectURL(f);
    img.onload = () => { const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight)), c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k); const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(u); ok(c.toDataURL('image/jpeg', 0.85)); };
    img.onerror = () => { URL.revokeObjectURL(u); fileB64(f).then(b => ok('data:' + (f.type || 'image/jpeg') + ';base64,' + b), () => ok(null)); };
    img.src = u; });
}
/* the bill reader that Stock -> "Add stock from bill" already uses; nothing is saved by reading */
async function readBill(f){
  if (!f) return null; const pdf = f.type === 'application/pdf'; if (!pdf && !/^image\//.test(f.type || '')) return null;
  try { const data = pdf ? await fileB64(f) : String(await imgJpeg(f, 2000) || '').split(',')[1]; if (!data) return null;
    const r = await SB().functions.invoke('stock-bills', {body:{mode:'scan', clinic_id:CID(), file_base64:data, mime_type:pdf ? 'application/pdf' : 'image/jpeg'}});
    return (r && r.data) || null; } catch (e) { return null; }
}
async function uploadDoc(p, file, kind){
  const pid = p.row && p.row.patient_id; if (!pid || !file) return false;
  const path = CID() + '/' + pid + '/' + (kind === 'bill' ? 'bill_' : 'doc_') + Date.now() + '_' + String(file.name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_');
  const up = await SB().storage.from('nh-documents').upload(path, file, {upsert:true}); if (up.error) return false;
  try { await SB().from('nh_patient_documents').insert({clinic_id:CID(), patient_id:pid, file_path:path, file_name:file.name || 'file', doc_type:file.type || '', uploaded_by:UID(), document_type:kind === 'bill' ? 'Bill / Receipt' : 'Document'}); } catch (e) {}
  p.docsLoaded = false; return true;
}
async function insDrop(table, row, sel){
  let r = row = Object.assign({}, row);
  for (let i = 0; i < 6; i++) {
    const q = SB().from(table).insert(r); const res = sel ? await q.select(sel).single() : await q;
    if (!res.error) return res;
    const m = String(res.error.message || ''), c = (m.match(/'([a-z_0-9]+)' column/) || m.match(/column "?([a-z_0-9]+)"? .*does not exist/) || [])[1];
    if (c && c in r) { delete r[c]; continue; } return res;
  }
  return {error:{message:'insert failed'}};
}
async function audLog(action, target_table, target_id, details){ try { await SB().from('nh_audit_log').insert({clinic_id:CID(), actor_id:UID(), action, target_table, target_id, details}); } catch (e) {} }
const busy = (el, on) => { if (!el) return; if (on) { el.dataset.lbl = el.innerHTML; el.disabled = true; el.innerHTML = `<span class="spin" aria-hidden="true"></span>${t('wait')}`; } else { el.disabled = false; if (el.dataset.lbl) el.innerHTML = el.dataset.lbl; } };
const errMsg = e => String((e && (e.message || e.error_description)) || e || '').replace(/^.*?(Not enough stock)/i, '$1').slice(0, 220);
let reloadTm = null;
async function liveReload(){ try { await LIVE_LOAD(); } catch (e) { toast(t('loadErr') + ' ' + esc(errMsg(e)), 'info'); } refresh(); if (S.modal) rerenderModal(); }


/* ---------- live: words used only by the live parts ---------- */
Object.assign(T, {
  noVit:['এখনও লেখা হয়নি','Not recorded yet'], noVitS:['নার্স বা ডাক্তার ভাইটালস লিখলে এখানে দেখা যাবে','Vitals recorded by nurses or doctors show here'], noDocs:['এখনও কোনো ফাইল নেই','No files yet'],
  advMark:['ছুটির পরামর্শ দিন','Mark discharge advised'], advUndo:['ছুটির পরামর্শ তুলে নিন','Remove discharge advice'], advOn:['ছুটির পরামর্শ দেওয়া হলো','Discharge advice added'], advOff:['ছুটির পরামর্শ তুলে নেওয়া হলো','Discharge advice removed'],
  rcpt:['রসিদ','Receipt'], wait:['একটু দাঁড়ান…','Please wait…'], loadErr:['তথ্য আনা গেল না —','Could not load —'], saveErr:['সেভ হলো না —','Could not save —'],
  bank:['ব্যাংক ট্রান্সফার','Bank transfer'], absent:['আসেননি','Not in yet'], jOther:['স্টাফ','Staff'], noStaffYet:['স্টাফ যোগ করলে এখানে দেখা যাবে','Staff appear here once added'],
  signOut:['সাইন আউট','Sign out'], bizSwitch:['ব্যবসা বদলান','Switch business'], addBed:['বেড যোগ','Add bed'], chgRate:['দাম বদলান','Change rate'], editBeds:['বেড বদলান','Edit beds'], editBedsOn:['বেডে চাপলে বদলানো যাবে — শেষ হলে আবার চাপুন','Tap a bed to edit it — tap again when done'],
  noBedsYet:['এখনও কোনো বেড নেই','No beds yet'], noBedsYetS:['প্রথমে বেড যোগ করুন — ওয়ার্ড আর দৈনিক ভাড়া সহ','Add your beds first — with ward and daily rate'],
  bfT:['বেড যোগ করুন','Add a bed'], bfEdit:['বেড {bed} বদলান','Edit bed {bed}'], bfNo:['বেড নম্বর','Bed number'], bfNoPh:['যেমন 12 বা P45','e.g. 12 or P45'], bfWard:['ওয়ার্ড','Ward'], bfWardNew:['নতুন ওয়ার্ড','New ward'], bfWardPh:['যেমন General, ICU, Private','e.g. General, ICU, Private'],
  bfRate:['দৈনিক ভাড়া (₹)','Daily rate (₹)'], bfSt:['অবস্থা','Status'], bfStFree:['খালি','Free'], bfStClean:['পরিষ্কার হচ্ছে','Cleaning'], bfStMaint:['মেরামত','Maintenance'], bfStRes:['সংরক্ষিত','Reserved'],
  bfSave:['সেভ করুন','Save'], bfDel:['বেড মুছুন','Delete bed'], bfDelQ:['বেড {bed} মুছে দেবেন?','Delete bed {bed}?'], bfSaved:['বেড সেভ হয়েছে','Bed saved'], bfDeleted:['বেড মুছে ফেলা হয়েছে','Bed deleted'], bfErrNo:['বেড নম্বর লিখুন','Enter the bed number'], bfErrDup:['এই নম্বরের বেড আগেই আছে','This bed number already exists'], bfErrOcc:['বেডে রোগী আছে — আগে ছুটি দিন','A patient is in this bed — discharge first'],
  bfPrefix:['শুধু সংখ্যা লিখলে ওয়ার্ডের অক্ষর নিজে বসবে (Private-এ 45 → P45)','Type only a number and the ward letter is added (45 in Private → P45)'],
  wrT:['{w} — দৈনিক ভাড়া','{w} — daily rate'], wrS:['এই ওয়ার্ডের সব বেডে একসাথে বসবে · ভর্তি রোগীর আজ থেকে নতুন দামে চার্জ হবে','Applies to every bed in this ward · admitted patients are charged the new rate from today'], wrSaved:['{w}-এর দাম {amt} করা হলো','{w} rate set to {amt}'],
  lcAdd:['লাইসেন্স যোগ','Add licence'], lcEdit:['লাইসেন্স বদলান','Edit licence'], lcName:['লাইসেন্সের নাম','Licence name'], lcNamePh:['যেমন Clinical Establishment, Fire NOC','e.g. Clinical Establishment, Fire NOC'], lcAuth:['কে দিয়েছে','Issued by'], lcNo:['নম্বর','Number'], lcExp:['মেয়াদ শেষের তারিখ','Expiry date'],
  lcSaved:['লাইসেন্স সেভ হয়েছে','Licence saved'], lcDel:['মুছুন','Delete'], lcDeleted:['লাইসেন্স মুছে ফেলা হয়েছে','Licence deleted'], lcErr:['নাম আর তারিখ দিন','Enter the name and date'], lcNone:['এখনও কোনো লাইসেন্স যোগ হয়নি','No licences added yet'], lcNoneS:['লাইসেন্স যোগ করলে মেয়াদ শেষের আগে মনে করিয়ে দেওয়া হবে','Add your licences and you will be reminded before they expire'],
  docOther:['অন্য ডাক্তার','Other doctor'], docOtherPh:['ডাক্তারের নাম লিখুন','Type the doctor’s name'], errDoc:['ডাক্তার বেছে নিন বা নাম লিখুন','Pick a doctor or type the name'],
  chPhoto:['বিলের ছবি','Bill photo'], chPhotoS:['ছবি দিলে টাকা আর বিবরণ নিজে থেকে বসে যাবে','Add a photo and the amount and description fill in'], chRead:['ছবি পড়া হচ্ছে…','Reading the photo…'], chReadOk:['ছবি থেকে বসানো হয়েছে — একবার মিলিয়ে নিন','Filled from the photo — please check'], chReadNo:['ছবিটা পড়া গেল না — হাতে লিখে দিন','Could not read the photo — please type it'],
  disBill:['চূড়ান্ত বিল তৈরি হচ্ছে…','Making the final bill…'], disBillOk:['চূড়ান্ত বিল তৈরি হয়েছে','Final bill is ready'], disBillNo:['চূড়ান্ত বিল এখন তৈরি হলো না — “চূড়ান্ত বিল” পাতা থেকে আবার চেষ্টা করুন','The final bill could not be made now — try again from Final bills'],
  payWa:['রসিদ আর বিল WhatsApp-এ পাঠানো হচ্ছে','Sending the receipt and bill on WhatsApp'], idOcrFail:['কার্ড পড়া গেল না — হাতে লিখে দিন','Could not read the card — please type the details'], idQuota:['এই মাসের কার্ড স্ক্যান শেষ — হাতে লিখে দিন','This month’s card scans are used up — please type'],
  idLive:['কার্ডের ছবি সেভ হয় না — শুধু লেখাটা পড়ে ফর্মে বসানো হয়','Card photos are not saved — only the text is read into the form'],
  sbUpiOnly:['UPI-তে টাকা দিন, তারপর UTR নম্বর WhatsApp-এ পাঠান — এক কাজের দিনের মধ্যে চালু হয়ে যাবে','Pay by UPI, then send the UTR on WhatsApp — confirmed within one working day'],
  fdSavedLive:['সেভ হয়েছে — নতুন বিলে দেখা যাবে','Saved — shows on new bills'], tmLiveNote:['এই নিয়মগুলো AuraScale নিজে মেনে চলে — বদলাতে হলে আমাদের জানান','AuraScale applies these rules for you — tell us if anything needs changing'],
  imRateNo:['রেট লিস্ট: শুধু বেডের দাম বসানো যায় — ওয়ার্ডের নামের সাথে মিললে সেই ওয়ার্ডের দাম বদলাবে','Rate list: only bed rates are stored — a row matching a ward name updates that ward'],
  classic:['পুরোনো ডিজাইন','Classic view'], classicS:['খরচ, রিপোর্ট আর পুরোনো পাতাগুলো','Expenses, reports and older pages'],
  stockSql:['এই সুবিধার জন্য SQL 69 চালাতে হবে','Run SQL 69 to use this']
});
Object.assign(IC, {edit:IC.edit || '<path d="M4 20h4L19 9l-4-4L4 16z"/>', exit:IC.exit, users:IC.users});

/* ---------- live modals ---------- */
function mBedForm(m){
  const opts = WARDS.map(w => `<option value="${esc(w.id)}" ${m.ward === w.id ? 'selected' : ''}>${esc(t(w.key))}</option>`).join('') + `<option value="__new" ${m.ward === '__new' ? 'selected' : ''}>+ ${t('bfWardNew')}</option>`;
  const st = [['free', 'bfStFree'], ['clean', 'bfStClean'], ['maint', 'bfStMaint'], ['res', 'bfStRes']];
  return {title:m.id ? t('bfEdit', {bed:esc(m.id)}) : t('bfT'), sub:m.id ? t(wKey(m.id)) : '',
    body:`<div class="row2"><div class="field"><label for="bf-no">${t('bfNo')}</label><input id="bf-no" class="input latin${m.err === 'bfErrNo' || m.err === 'bfErrDup' ? ' bad' : ''}" data-bind="no" data-k="bfno" value="${esc(m.no)}" placeholder="${t('bfNoPh')}" autocomplete="off"></div>
      <div class="field"><label for="bf-rate">${t('bfRate')}</label><div class="pre rs"><span>₹</span><input id="bf-rate" class="input" data-bind="rate" data-k="bfrate" inputmode="numeric" maxlength="6" value="${esc(m.rate)}"></div></div></div>
      <div class="row2"><div class="field"><label for="bf-ward">${t('bfWard')}</label><select id="bf-ward" class="input" data-bfward="1">${opts}</select>${m.ward === '__new' ? `<input class="input" style="margin-top:8px" data-bind="wnew" data-k="bfwn" value="${esc(m.wnew || '')}" placeholder="${t('bfWardPh')}">` : ''}</div>
      ${m.id ? `<div class="field"><span class="lab">${t('bfSt')}</span><div class="pills" role="group">${st.map(([k, l]) => `<button type="button" class="pill" data-act="set" data-path="st" data-val="${k}" aria-pressed="${m.st === k}" ${m.occ ? 'disabled' : ''}>${t(l)}</button>`).join('')}</div></div>` : '<div></div>'}</div>
      <p class="hint" style="font-size:13px;color:var(--text-3)">${ic('info', 14)} ${t('bfPrefix')}</p>
      ${m.err ? `<p class="err">${ic('alert', 15)}${t(m.err)}</p>` : ''}`,
    foot:`${m.id ? `<button class="btn btn-danger btn-lg" data-act="bedDel" ${m.occ ? 'disabled' : ''}>${ic('trash')}${t('bfDel')}</button>` : `<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button>`}<button class="btn btn-primary btn-lg grow" data-act="bedSave" data-primary>${ic('check')}${t('bfSave')}</button>`};
}
function mWardRate(m){
  const W = WARD[m.w];
  return {title:t('wrT', {w:esc(t(W.key))}), sub:t('wrS'),
    body:`<div class="field"><label for="wr-rate">${t('bfRate')}</label><div class="pre rs"><span>₹</span><input id="wr-rate" class="input" data-bind="rate" data-k="wr" inputmode="numeric" maxlength="6" value="${esc(m.rate)}"></div></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="wardRateSave" data-primary>${ic('check')}${t('bfSave')}</button>`};
}
function mLic(m){
  return {title:m.id ? t('lcEdit') : t('lcAdd'),
    body:`<div class="field"><label for="lc-n">${t('lcName')}</label><input id="lc-n" class="input" data-bind="name" data-k="lcn" value="${esc(m.name)}" placeholder="${t('lcNamePh')}" autocomplete="off"></div>
      <div class="row2"><div class="field"><label for="lc-a">${t('lcAuth')} <span class="opt">${t('optional')}</span></label><input id="lc-a" class="input" data-bind="auth" data-k="lca" value="${esc(m.auth)}" autocomplete="off"></div>
      <div class="field"><label for="lc-no">${t('lcNo')} <span class="opt">${t('optional')}</span></label><input id="lc-no" class="input latin" data-bind="no" data-k="lcno" value="${esc(m.no)}" autocomplete="off"></div></div>
      <div class="field"><label for="lc-e">${t('lcExp')}</label><input id="lc-e" type="date" class="input" data-bind="exp" data-k="lce" value="${esc(m.exp)}"></div>
      ${m.err ? `<p class="err">${ic('alert', 15)}${t(m.err)}</p>` : ''}`,
    foot:`${m.id ? `<button class="btn btn-danger btn-lg" data-act="licDel">${ic('trash')}${t('lcDel')}</button>` : `<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button>`}<button class="btn btn-primary btn-lg grow" data-act="licSave" data-primary>${ic('check')}${t('bfSave')}</button>`};
}
const XMODALS = {bedf:mBedForm, wrate:mWardRate, lic:mLic};
const wardPrefix = w => { const k = String(w || '').toLowerCase().trim(); const M = {icu:'I', hdu:'H', nicu:'N', maternity:'M', female:'F', 'female ward':'F', male:'ML', 'male ward':'ML', general:'G', 'general ward':'G', emergency:'E', 'semi-private':'SP', 'semi private':'SP', cabin:'C', private:'P', deluxe:'D'}; return M[k] || (k ? k[0].toUpperCase() : ''); };

/* ---------- live actions ---------- */
async function payNow(p, amt, method, ref){
  const row = {clinic_id:CID(), admission_id:p.id, amount:amt, method:mDb(method), payment_date:ymd(new Date()), recorded_by:UID()};
  if (ref && method !== 'cash') row.txn_id = ref;
  let ins = await SB().from('nh_payments').insert(row).select('*').single();
  if (ins.error && row.txn_id) { delete row.txn_id; ins = await SB().from('nh_payments').insert(row).select('*').single(); }
  if (ins.error) throw ins.error;
  const pay = ins.data || {};
  audLog('payment_recorded', 'nh_payments', p.id, {amount:amt, method:mDb(method), patient_name:nm(p), payment_id:pay.id || null});
  (async () => {
    try { if (pay.id && typeof window.auraMakeReceipt === 'function') await window.auraMakeReceipt(pay.id); } catch (e) {}
    try { await SB().functions.invoke('notify-payment', {body:{admission_id:p.id, payment_id:pay.id || null, lang:S.lang}}); } catch (e) {}
    try { if (p.disc && typeof window.auraGenerateBill === 'function') await window.auraGenerateBill(p.id); } catch (e) {}
  })();
  return pay;
}
async function chargeNow(p, cat, amt, desc, extra){
  const row = Object.assign({clinic_id:CID(), admission_id:p.id, charge_type:cDb(cat), description:desc || cDb(cat), quantity:1, unit_price:amt, total_price:amt, added_by:UID()}, extra || {});
  const r = await SB().from('admission_charges').insert(row); if (r.error) throw r.error;
  audLog('charge_added', 'admission_charges', p.id, {amount:row.total_price, charge_type:row.charge_type, description:row.description, patient_name:nm(p)});
}
async function liveIdOcr(m){
  const f = m.f; if (!f.idFd && !f.idBd) return;
  f.idSt = 'reading'; rerenderModal();
  const b64 = d => String(d).replace(/^data:[^,]+,/, '');
  const a = f.idFd || f.idBd, body = {id_type:f.idType, image_base64:b64(a), mime_type:'image/jpeg'};
  if (f.idFd && f.idBd) { body.image_back_base64 = b64(f.idBd); body.mime_back_type = 'image/jpeg'; }
  let ex = null, quota = false;
  try { const r = await SB().functions.invoke('ocr-extract-id', {body});
    if (r.error) { try { const j = r.error.context && r.error.context.json ? await r.error.context.json() : null; quota = !!(j && j.error === 'quota_exceeded'); } catch (x) {} } else ex = r.data && r.data.extracted; } catch (e) {}
  if (S.modal !== m) return;
  f.idSt = '';
  if (!ex) { toast(t(quota ? 'idQuota' : 'idOcrFail'), 'info'); rerenderModal(); return; }
  f.fromId = f.fromId || {};
  if (ex.name) { f.name = ex.name; f.fromId.name = 1; }
  let age = ex.age; if (!age && ex.dob) { const d = new Date(ex.dob); if (!isNaN(d)) { const y = Math.floor((Date.now() - d) / (365.25 * DAYMS)); if (y > 0 && y < 120) age = y; } }
  if (age) { f.age = String(age); f.fromId.age = 1; }
  if (ex.gender) { f.sex = sexK(ex.gender); f.fromId.sex = 1; }
  if (ex.address) { f.addr = String(ex.address).slice(0, 200); f.fromId.addr = 1; }
  const idn = String(ex.id_number || ex.voter_id || ex.aadhaar_number || ex.epic || '').replace(/\s/g, '');
  if (idn) { f.idno = f.idType === 'aadhaar' ? 'XXXX XXXX ' + idn.slice(-4) : idn; f.fromId.idno = 1; }
  if (ex.phone && !f.phone) f.phone = digits10(ex.phone);
  if (m.err) ['name', 'age', 'sex'].forEach(k => delete m.err[k]);
  rerenderModal();
}
async function liveOnFile(kind, file){
  const m = S.modal; if (!file || !m) return;
  if (kind === 'idF' || kind === 'idB') {
    if (!/^image\//.test(file.type || '')) { toast(t('skNotImg'), 'info'); return; }
    const d = await imgJpeg(file, 1600); if (!d || S.modal !== m) return;
    const side = kind.slice(2); m.f['id' + side] = d; m.f['id' + side + 'd'] = d; rerenderModal(); liveIdOcr(m); return;
  }
  if (kind === 'chg' && m.type === 'charge') {
    m.file = file; m.img = /^image\//.test(file.type || '') ? URL.createObjectURL(file) : ''; m.reading = true; rerenderModal();
    const res = await readBill(file); if (S.modal !== m) return; m.reading = false;
    const L = (res && res.ok && res.lines || []).filter(l => l && (l.name || l.amount || l.rate));
    if (!L.length) { m.readMsg = 'chReadNo'; rerenderModal(); return; }
    const tot = L.reduce((a, l) => a + (Number(l.amount) || (Number(l.rate) || 0) * (Number(l.qty) || 1)), 0);
    if (tot > 0) m.amt = String(Math.round(tot)); m.note = L.length === 1 ? String(L[0].name || '') : L.map(l => l.name).filter(Boolean).slice(0, 4).join(', ');
    const n = String(m.note).toLowerCase(); if (/inj|tab|syr|medic|ওষুধ/.test(n)) m.cat = 'med'; else if (/test|x-?ray|usg|cbc|lab/.test(n)) m.cat = 'test';
    m.readMsg = 'chReadOk'; rerenderModal(); return;
  }
  if (kind === 'stk' && m.type === 'skIn' && /^image\/|application\/pdf/.test(file.type || '')) {
    m.method = 'photo'; m.fname = file.name || ''; m.reading = true; m.err = {}; if (/^image\//.test(file.type)) m.img = URL.createObjectURL(file); rerenderModal();
    const res = await readBill(file); if (S.modal !== m) return; m.reading = false;
    const L = (res && res.ok && res.lines || []).filter(l => l && l.name);
    if (!L.length) { m.err.file = res && res.reason === 'daily_limit' ? 'idQuota' : 'skNoRows'; rerenderModal(); return; }
    m.rows = L.map(l => ({name:String(l.name).trim(), q:String(Math.round(Number(l.qty) || 1)), cost:String(Math.round(Number(l.rate) || (Number(l.amount) && Number(l.qty) ? Number(l.amount) / Number(l.qty) : 0)) || ''), batch:l.batch || '', exp:skDate(l.expiry || l.exp || ''), sup:res.supplier || '', inc:true}));
    m.inv = {no:res.bill_no || res.invoice_no || '', sup:res.supplier || ''}; m.src = 'photo'; m.step = 2; renderModal(); setTimeout(focusModal, 30); return;
  }
  return LIVE_PREV_ONFILE(kind, file);
}
let LIVE_PREV_ONFILE = null;
async function liveSkApply(rows, src){
  const note = {man:'Manual', photo:'Bill photo', csv:'CSV', xls:'Excel'}[src] || 'Manual';
  let ok = 0; const bad = [];
  for (const r of rows.filter(r => r.inc && r.name.trim() && parseInt(r.q, 10) > 0)) {
    const q = parseInt(r.q, 10), cost = parseFloat(r.cost) || 0;
    try {
      let it = skFind(r.name), id = it && it.id;
      if (it) { const x = await SB().rpc('stock_receive', {p_item_id:it.id, p_qty:q, p_note:note}); if (x.error) throw x.error; }
      else {
        const cat = SCAT.includes(r.cat) ? r.cat : /oxygen|mask|cannula|cylinder|অক্সিজেন/i.test(r.name) ? 'oxy' : /inj|tab|syp|saline|ইঞ্জে/i.test(r.name) ? 'med' : 'cons';
        const x = await SB().rpc('stock_add_item', {p_clinic_id:CID(), p_name:r.name.trim(), p_unit:r.unit || 'pcs', p_low_level:Math.max(1, Math.round(q / 4)), p_opening:q, p_price:cost || 0, p_charge_type:cat === 'med' ? 'Medicine' : 'Other'}); if (x.error) throw x.error;
        id = x.data && x.data.id; r.cat = cat;
      }
      if (id && (cost || r.batch || r.exp || r.sup || r.cat)) { try { await SB().rpc('stock_set_meta', {p_item_id:id, p_category:r.cat || null, p_cost:cost || null, p_batch:r.batch || null, p_expires:r.exp || null, p_supplier:r.sup || null, p_returnable:/cylinder|সিলিন্ডার/i.test(r.name) ? true : null}); } catch (e) {} }
      ok++;
    } catch (e) { bad.push(r.name + ' (' + errMsg(e).slice(0, 60) + ')'); }
  }
  return {ok, bad};
}

function liveHandlers(){
  LIVE_PREV_ONFILE = onFile;
  onFile = function(kind, file){ if (kind === 'idF' || kind === 'idB' || kind === 'chg' || kind === 'stk') return liveOnFile(kind, file); return LIVE_PREV_ONFILE(kind, file); };
  idRead = function(){};
  skApply = function(){ return () => {}; };
  const oldLang = H.lang;
  Object.assign(H, {
    lang: el => { oldLang(el); try { localStorage.setItem('aurascale_lang', S.lang); } catch (e) {} if (LV.loaded) { buildAll(...LV.maps); renderAll(); } },
    signOut: () => { if (typeof window.handleLogout === 'function') window.handleLogout(); else SB().auth.signOut().then(() => location.reload()); },
    bizSwitch: () => { location.href = 'nh.html?choose=1'; },
    classic: () => AuraUI.unmount(true),
    rcpt: el => { if (typeof window.auraDownloadReceipt === 'function') window.auraDownloadReceipt(el.dataset.id, el); },
    advToggle: async el => { const p = getP(el.dataset.id); if (!p) return; busy(el, true);
      const r = await SB().rpc('nh_advise_discharge', {p_admission_id:p.id, p_on:!p.advice, p_by:ROLES.owner.user[0] || null});
      busy(el, false); if (r.error) { toast(t('saveErr') + ' ' + esc(errMsg(r.error)), 'info'); return; } toast(t(p.advice ? 'advOff' : 'advOn')); await liveReload(); },
    docView: async el => { const path = el.dataset.path; if (!path) return; const w = window.open('', '_blank');
      const r = await SB().storage.from('nh-documents').createSignedUrl(path, 300); if (r.data && r.data.signedUrl) { if (w) w.location = r.data.signedUrl; else location.href = r.data.signedUrl; } else { if (w) w.close(); toast(t('loadErr'), 'info'); } },
    /* admission */
    admStep: el => {
      const m = S.modal, d = +el.dataset.d;
      if (d > 0 && !validAdm(m)) { rerenderModal(); const e = $('modal').querySelector('[aria-invalid="true"]'); e && e.focus(); return; }
      if (d > 0 && m.step === 2 && !m.f.doc && !(m.f.docText || '').trim()) { m.err = {doc:'errDoc'}; rerenderModal(); return; }
      m.err = {}; m.step += d; renderModal(); setTimeout(focusModal, 30);
    },
    admSave: async el => {
      const m = S.modal; if (!validAdm(m)) { rerenderModal(); return; }
      const f = m.f, b = beds[f.bed]; if (!b || b.status !== 'free') { m.err = {bed:'errBed'}; rerenderModal(); return; }
      const doc = DOC[f.doc], docText = doc ? doc.n[0] : (f.docText || '').trim();
      busy(el, true);
      try {
        const name = f.name.trim(), phone = f.phone.replace(/\s/g, ''), age = f.age.trim(), gender = sexDb(f.sex);
        const uhid = typeof window._famGenUhid === 'function' ? window._famGenUhid() : null;
        let res;
        if (typeof window.resolvePatientForRegistration === 'function') res = await window.resolvePatientForRegistration(name, phone, age, gender, doc && doc.uid || null, uhid, null);
        else { const c = await SB().from('nh_patients').insert({clinic_id:CID(), full_name:name, phone, age, gender}).select('id').single(); res = c.data ? {pid:c.data.id, uhid} : null; }
        if (res === null) { busy(el, false); return; }
        if (!res || !res.pid) throw new Error('Could not create the patient record');
        let aName = name, aPhone = phone, aAge = age, aGen = gender; const regUhid = res.uhid || uhid;
        if (res.existing && res.patient) { aName = res.patient.full_name || name; aPhone = res.patient.phone || phone; aAge = res.patient.age == null ? age : res.patient.age; aGen = res.patient.gender == null ? gender : res.patient.gender;
          if (!res.patient.uhid && regUhid) await SB().from('nh_patients').update({uhid:regUhid}).eq('id', res.pid); }
        if (f.addr) { try { await SB().from('nh_patients').update({address:f.addr}).eq('id', res.pid); } catch (e) {} }
        const fam = f.fam.replace(/\s/g, '');
        const ins = await insDrop('admissions', {clinic_id:CID(), patient_id:res.pid, patient_name:aName, patient_phone:aPhone, patient_age:aAge, patient_gender:aGen, bed_id:b.uuid, admitting_doctor:docText, assigned_doctor_id:doc && doc.uid || null,
          admission_diagnosis:f.reason.trim(), daily_rate:b.rate, status:'Active', uhid:regUhid, admission_date:new Date().toISOString(), family_phone:fam || null, family_relation:f.rel || null}, 'id');
        if (ins.error) throw ins.error;
        const admId = ins.data.id;
        await SB().from('beds').update({status:'Occupied', current_admission_id:admId}).eq('id', b.uuid);
        if (b.rate > 0) await SB().from('admission_charges').insert({clinic_id:CID(), admission_id:admId, charge_type:'Bed Charge', description:'Bed charge (Day 1)', quantity:1, unit_price:b.rate, total_price:b.rate, added_by:UID()});
        audLog('admission', 'admissions', admId, {patient_name:aName, bed:b.id, ward:b.ward, doctor:docText, uhid:regUhid});
        const adv = parseInt(f.adv, 10);
        if (adv > 0) { try { await payNow({id:admId, name:two(aName), disc:false}, adv, f.advM, ''); } catch (e) { toast(t('saveErr') + ' ' + esc(errMsg(e)), 'info'); } }
        closeModal(); await liveReload();
        toast(t('admitted', {name:esc(aName), bed:esc(b.id)}), 'success', {label:t('view'), fn:() => openDrawer(admId)});
      } catch (e) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(e)), 'info'); }
    },
    /* payment */
    paySave: async el => {
      const m = S.modal, p = getP(m.pid), bal = totals(p).bal, a = parseInt(m.amt, 10);
      if (!(a > 0)) { m.err = {amt:'errAmt'}; rerenderModal(); $('p-amt').focus(); return; }
      if (a > bal) { m.err = {amt:'errMore'}; rerenderModal(); $('p-amt').focus(); return; }
      busy(el, true);
      try { await payNow(p, a, m.method, (m.ref || '').trim()); closeModal(); await liveReload(); toast(t('paySaved', {amt:money(a), name:esc(nm(p))}) + ' · ' + t('payWa'), 'success'); }
      catch (e) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(e)), 'info'); }
    },
    /* add charge (with optional bill photo) */
    chargeSave: async el => {
      const m = S.modal, p = getP(m.pid), a = parseInt(m.amt, 10);
      if (!(a > 0)) { m.err = {amt:'errAmt'}; rerenderModal(); $('c-amt').focus(); return; }
      busy(el, true);
      try { await chargeNow(p, m.cat, a, (m.note || '').trim()); if (m.file) await uploadDoc(p, m.file, 'bill'); closeModal(); await liveReload(); toast(t('chargeSaved', {amt:money(a), name:esc(nm(p))})); }
      catch (e) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(e)), 'info'); }
    },
    chgPhotoRm: () => { const m = S.modal; m.file = null; m.img = ''; m.readMsg = ''; rerenderModal(); },
    /* discharge */
    disFinish: async el => {
      const m = S.modal, p = getP(m.pid), bal = totals(p).bal; busy(el, true);
      try {
        if (el.dataset.collect === '1' && bal > 0) await payNow(p, bal, m.method, '');
        const r = await SB().from('admissions').update({status:'Discharged', discharge_date:new Date().toISOString()}).eq('id', p.id); if (r.error) throw r.error;
        const b = beds[p.bed];
        await SB().from('beds').update({status:'Cleaning', current_admission_id:null}).eq('current_admission_id', p.id);
        if (b && b.uuid) await SB().from('beds').update({status:'Cleaning', current_admission_id:null}).eq('id', b.uuid);
        audLog('discharged', 'admissions', p.id, {patient_name:nm(p), bed:p.bed, collected:el.dataset.collect === '1' ? bal : 0, left:el.dataset.collect === '1' ? 0 : bal});
        m.step = 3; m.billSt = 'making'; await liveReload();
        let ok = false; try { if (typeof window.auraGenerateBill === 'function') { const g = await window.auraGenerateBill(p.id); ok = !g || g.ok !== false; } } catch (e) { ok = false; }
        m.billSt = ok ? 'ok' : 'no'; if (S.modal === m) renderModal(); await liveReload();
        toast(t('disDone', {name:esc(nm(p))}));
      } catch (e) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(e)), 'info'); }
    },
    printBill: async el => {
      const p = getP(el.dataset.id) || (LV.billP && LV.billP[el.dataset.id]);
      const bill = LV.bills.find(x => x.admission_id === el.dataset.id);
      if (bill && bill.admission_id && typeof window.auraDownloadBill === 'function') { window.auraDownloadBill(bill.admission_id, el); return; }
      if (bill && bill.pdf_path && typeof window.auraDownloadPath === 'function') { window.auraDownloadPath(bill.pdf_path, bill.patient_name || '', el); return; }
      if (p && p.disc && typeof window.auraGenerateBill === 'function') { busy(el, true); try { await window.auraGenerateBill(p.id); await liveReload(); } catch (e) {} busy(el, false); if (window.auraDownloadBill) window.auraDownloadBill(p.id, el); return; }
      if (p) printBill(p.id);
    },
    /* beds */
    markFree: async el => { const b = beds[el.dataset.id]; if (!b) return; busy(el, true); const r = await SB().from('beds').update({status:'Available'}).eq('id', b.uuid); if (r.error) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(r.error)), 'info'); return; } closeModal(); await liveReload(); toast(t('bedFreed', {bed:esc(b.id)})); },
    cancelRes: async el => { const b = beds[el.dataset.id]; if (!b) return; busy(el, true); await SB().from('beds').update({status:'Available'}).eq('id', b.uuid); closeModal(); await liveReload(); toast(t('resCancelled', {bed:esc(b.id)}), 'info'); },
    admitRes: async el => { const b = beds[el.dataset.id]; if (!b) return; await SB().from('beds').update({status:'Available'}).eq('id', b.uuid); closeModal(); await liveReload(); setTimeout(() => newAdmissionModal(b.id), 260); },
    bed: el => { const b = beds[el.dataset.id]; if (!b) return; if (S.bedEdit) { H.bedEdit(el); return; } if (b.status === 'occ') openDrawer(b.pid); else if (b.status === 'free') newAdmissionModal(b.id); else openModal({type:'bed', id:b.id}); },
    bedAdd: () => openModal({type:'bedf', id:'', no:'', rate:String((WARDS[0] && WARDS[0].rate) || ''), ward:WARDS[0] ? WARDS[0].id : '__new', wnew:'', st:'free', err:''}),
    bedEditMode: () => { S.bedEdit = !S.bedEdit; renderMain(); if (S.bedEdit) toast(t('editBedsOn'), 'info'); },
    bedEdit: el => { const b = beds[el.dataset.id]; if (!b) return; const s = String(b.row.status || '').toLowerCase(); openModal({type:'bedf', id:b.id, uuid:b.uuid, no:String(b.row.bed_number || ''), rate:String(b.rate || ''), ward:b.ward, wnew:'', occ:b.status === 'occ', st:b.status === 'clean' ? 'clean' : b.status === 'res' ? (/reserv/.test(s) ? 'res' : 'maint') : 'free', err:''}); },
    bedSave: async el => {
      const m = S.modal; let no = String(m.no || '').trim().toUpperCase(); const ward = m.ward === '__new' ? String(m.wnew || '').trim() : m.ward;
      if (!no || !ward) { m.err = 'bfErrNo'; rerenderModal(); return; }
      if (/^\d+$/.test(no)) no = wardPrefix(ward) + no;
      const dup = LV.bedRows.find(x => String(x.bed_number || '').toUpperCase() === no && x.id !== m.uuid && x.is_active !== false); if (dup) { m.err = 'bfErrDup'; rerenderModal(); return; }
      const rate = parseFloat(m.rate) || 0, stDb = {free:'Available', clean:'Cleaning', maint:'Maintenance', res:'Reserved'}[m.st] || 'Available';
      busy(el, true);
      const r = m.uuid ? await SB().from('beds').update(Object.assign({bed_number:no, ward, daily_rate:rate}, m.occ ? {} : {status:stDb})).eq('id', m.uuid)
                       : await SB().from('beds').insert({clinic_id:CID(), bed_number:no, ward, daily_rate:rate, status:'Available', is_active:true});
      if (r.error) { busy(el, false); m.err = ''; toast(t('saveErr') + ' ' + esc(errMsg(r.error)), 'info'); return; }
      audLog(m.uuid ? 'bed_updated' : 'bed_added', 'beds', m.uuid || null, {bed:no, ward, rate});
      closeModal(); await liveReload(); toast(t('bfSaved'));
    },
    bedDel: async el => { const m = S.modal; if (m.occ) { m.err = 'bfErrOcc'; rerenderModal(); return; } if (!window.confirm(t('bfDelQ', {bed:m.id}))) return; busy(el, true);
      const r = await SB().from('beds').delete().eq('id', m.uuid); if (r.error) { const r2 = await SB().from('beds').update({is_active:false}).eq('id', m.uuid); if (r2.error) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(r.error)), 'info'); return; } }
      audLog('bed_deleted', 'beds', m.uuid, {bed:m.id}); closeModal(); await liveReload(); toast(t('bfDeleted')); },
    wardRate: el => { const w = el.dataset.w; openModal({type:'wrate', w, rate:String((WARD[w] || {}).rate || '')}); },
    wardRateSave: async el => { const m = S.modal, v = parseFloat(m.rate); if (!(v >= 0)) return; busy(el, true);
      const ids = Object.values(beds).filter(b => b.ward === m.w).map(b => b.uuid);
      const r = await SB().from('beds').update({daily_rate:v}).in('id', ids); if (r.error) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(r.error)), 'info'); return; }
      try { const act = LV.adm.filter(a => a.status === 'Active' && ids.includes(a.bed_id)).map(a => a.id); if (act.length) await SB().from('admissions').update({daily_rate:v}).in('id', act); } catch (e) {}
      audLog('bed_updated', 'beds', null, {ward:m.w, rate:v}); closeModal(); await liveReload(); toast(t('wrSaved', {w:esc(t((WARD[m.w] || {key:m.w}).key)), amt:money(v)})); },
    /* licences */
    licAdd: () => openModal({type:'lic', id:'', name:'', auth:'', no:'', exp:'', err:''}),
    licEdit: el => { const l = LIC.find(x => x.id === el.dataset.id); if (!l) return; openModal({type:'lic', id:l.id, name:l.name, auth:l.auth, no:l.no, exp:l.row.expires_on, err:''}); },
    licSave: async el => { const m = S.modal; if (!m.name.trim() || !m.exp) { m.err = 'lcErr'; rerenderModal(); return; } busy(el, true);
      const row = {name:m.name.trim(), authority:m.auth.trim() || null, number:m.no.trim() || null, expires_on:m.exp};
      const r = m.id ? await SB().from('nh_licences').update(row).eq('id', m.id) : await SB().from('nh_licences').insert(Object.assign({clinic_id:CID()}, row));
      if (r.error) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(r.error)), 'info'); return; } closeModal(); await liveReload(); toast(t('lcSaved')); },
    licDel: async el => { const m = S.modal; if (!window.confirm(t('lcDel') + '?')) return; busy(el, true); await SB().from('nh_licences').delete().eq('id', m.id); closeModal(); await liveReload(); toast(t('lcDeleted'), 'info'); },
    renew: async el => { const l = LIC.find(x => x.id === el.dataset.id); if (!l) return; const d = new Date(l.row.expires_on + 'T12:00:00'); const base = d < new Date() ? new Date() : d; base.setFullYear(base.getFullYear() + 1);
      busy(el, true); const r = await SB().from('nh_licences').update({expires_on:ymd(base), renewed_at:new Date().toISOString()}).eq('id', l.id);
      if (r.error) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(r.error)), 'info'); return; } audLog('licence_renewed', 'nh_licences', l.id, {name:l.name, until:ymd(base)});
      await liveReload(); toast(t('renewed', {name:esc(l.name), date:fdate(base, {day:'numeric', month:'short', year:'numeric'})})); },
    remind: async el => { const l = LIC.find(x => x.id === el.dataset.id), n = +el.dataset.n; if (!l) return; const on = !l.rem.includes(n); const cur = on ? l.rem.concat(n) : l.rem.filter(x => x !== n);
      const r = await SB().from('nh_licences').update({remind_days:cur.sort((a, b) => b - a)}).eq('id', l.id); if (r.error) { toast(t('saveErr') + ' ' + esc(errMsg(r.error)), 'info'); return; }
      l.rem = cur; renderMain(); toast(t(on ? 'remOn' : 'remOff', {n:num(n)}), 'info'); },
    /* stock */
    skIssueSave: async el => {
      const m = S.modal, i = m.item ? skGet(m.item) : null, q = parseInt(m.q, 10) || 0, e = {};
      if (!m.pid) e.pid = 'skErrPat'; if (!i) e.item = 'skErrItem'; else if (q < 1) e.q = 'skErrQ0'; else if (q > i.qty) e.q = 'skErrQty';
      m.err = e; if (Object.keys(e).length) { rerenderModal(); return; }
      const p = getP(m.pid); busy(el, true);
      try {
        if (m.bill && i.price) await chargeNow(p, i.row.charge_type ? cType(i.row.charge_type) : 'other', i.price * q, `${skN(i)} × ${q}`, {charge_type:i.row.charge_type || 'Other', quantity:q, unit_price:i.price, total_price:i.price * q, stock_item_id:i.id});
        else { const r = await SB().rpc('stock_use', {p_item_id:i.id, p_qty:q, p_admission_id:p.id, p_note:'Issued to patient'}); if (r.error) throw r.error; }
        if (i.ret) { try { await SB().from('nh_cylinder_issues').insert({clinic_id:CID(), item_id:i.id, admission_id:p.id, qty:q, patient_name:nm(p), bed_label:p.bed, issued_by:UID()}); } catch (x) {} }
        closeModal(); await liveReload(); const it = skGet(i.id);
        toast(t('skIssued', {q:num(q), u:skU(i), item:esc(skN(i)), name:esc(nm(p)), left:num(it ? it.qty : i.qty - q)}));
      } catch (x) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(x)), 'info'); }
    },
    skRet: async el => { const x = ISS.find(z => z.id === el.dataset.id); if (!x || !x.cyl) return; busy(el, true);
      const r = await SB().rpc('stock_cyl_return', {p_issue_id:x.cyl}); if (r.error) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(r.error)), 'info'); return; }
      await liveReload(); const i = skGet(x.item); toast(t('skReturnedT', {item:esc(i ? skN(i) : ''), e:num(i ? i.empty : 0)})); },
    skRefill: async el => { const i = skGet(el.dataset.id); if (!i || !i.empty) return; busy(el, true);
      const r = await SB().rpc('stock_cyl_refill', {p_item_id:i.id, p_n:i.empty}); if (r.error) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(r.error)), 'info'); return; }
      const n = i.empty; await liveReload(); toast(t('skRefilled', {n:num(n)})); },
    skManSave: async el => {
      const m = S.modal, f = m.man, e = {};
      if (!f.name.trim()) e.name = 'skErrName'; if (!(parseInt(f.q, 10) > 0)) e.q = 'skErrQ0';
      m.err = e; if (Object.keys(e).length) { rerenderModal(); return; }
      busy(el, true); const r = await liveSkApply([{name:f.name, q:f.q, cost:f.cost, batch:f.batch, exp:f.exp, sup:f.sup, inc:true}], 'man');
      if (!r.ok) { busy(el, false); toast(t('saveErr') + ' ' + esc(r.bad.join(', ')), 'info'); return; }
      closeModal(); S.skTab = 'items'; await liveReload(); toast(t('skInDone', {n:num(1)}));
    },
    skInSave: async el => {
      const m = S.modal, n = m.rows.filter(r => r.inc).length; if (!n) return; busy(el, true);
      const r = await liveSkApply(m.rows, m.src); closeModal(); S.skTab = 'items'; await liveReload();
      toast(t('skInDone', {n:num(r.ok)}) + (r.bad.length ? ' · ' + esc(r.bad.slice(0, 3).join(', ')) : ''), r.bad.length ? 'info' : 'success');
    },
    idType: el => { const f = S.modal.f; f.idType = el.dataset.v; rerenderModal(); },
    idRm: el => { const f = S.modal.f, s = el.dataset.v; f['id' + s] = ''; f['id' + s + 'd'] = ''; rerenderModal(); }
  });
}

/* ---------- live: settings, subscription, import ---------- */
Object.assign(T, {
  navClassic:['পুরোনো স্ক্রিন','Classic screens'],
  tmLive:['বিলে GST নিজে থেকে এই নিয়মে বসে। নিয়ম বদলাতে AuraScale-কে জানান। এটি আইনি পরামর্শ নয় — হিসাবরক্ষকের সাথে মিলিয়ে নিন।','Bills apply these GST rules automatically. To change a rule, tell AuraScale. This is not legal advice — confirm with your accountant.'],
  sbPlansS:['সব দাম GST সহ','All prices include GST'], sbPerMonth:['/ মাস (GST সহ)','/ month incl. GST'], sbOnce:['GST সহ · একবার','incl. GST · one time'],
  sbNoteT:['মাসে {amt}','{amt} a month'],
  sbUseS:['আপনার প্ল্যানে প্রতি মাসে {q}টি পরিচয়পত্র স্ক্যান আছে। শেষ হলে {amt} (GST সহ) দিয়ে ১০০টির টপ-আপ নিতে পারেন, যার মেয়াদ শেষ হয় না।','Your plan includes {q} ID-card scans a month. When they run out, a {amt} top-up (incl. GST) adds 100 more that never expire.'],
  sbOffer:['সব দাম GST সহ। লঞ্চ অফার: ৬ মাসে +১ মাস ফ্রি, ১ বছরে +২ মাস ফ্রি (প্রথম ৫০ জন, ৩০ নভেম্বর ২০২৬ পর্যন্ত)। অনলাইন পেমেন্ট (UPI, কার্ড, নেট ব্যাংকিং) Cashfree-র মাধ্যমে; পেমেন্ট সফল হলেই প্ল্যান এগিয়ে যায় আর নিচে GST ট্যাক্স ইনভয়েস চলে আসে।','All prices include GST. Launch offer: 6 months +1 month free, 1 year +2 months free (first 50 customers, until 30 November 2026). Online payment (UPI, card, net banking) is handled by Cashfree; your plan moves forward as soon as payment succeeds and a GST tax invoice appears below.'],
  sbPay:['{amt} পেমেন্ট করুন (Cashfree)','Pay {amt} with Cashfree'], sbUpiBtn:['অথবা UPI QR দিয়ে পেমেন্ট','or pay by UPI QR'], sbBest:['সেরা দাম','BEST VALUE'],
  sbTrial:['৭ দিনের ফ্রি ট্রায়াল — {d} পর্যন্ত ({n} দিন বাকি)। চালু রাখতে নিচে একটি প্ল্যান বেছে নিন।','7-day free trial — until {d} ({n} days left). Choose a plan below to continue.'],
  sbOtherOpen:['{n} খুলুন','Open {n}'],
  imPhotoStock:['ছবি থেকে শুধু স্টক (সাপ্লায়ারের বিল) পড়া যায়। বেড বা রোগীর তালিকার জন্য Excel বা CSV দিন।','Photos work only for stock (a supplier’s bill). For beds or patients, use Excel or CSV.'],
  imNewWard:['নতুন ওয়ার্ড','new ward'],
  vDocDefault:['ডাক্তারের নাম নেই — প্রথম ডাক্তার ধরা হলো','No doctor given — set to your first doctor'],
  imAdmNote:['প্রতিটি ভর্তিতে প্রথম দিনের বেড চার্জ যোগ হয়েছে; বাকি দিনের চার্জ রোজ নিজে থেকে যোগ হয়। আগের দিনের চার্জ লাগলে রোগীর পাতায় “চার্জ যোগ” করুন।','Day-1 bed charge was added to each admission; later days are added automatically every day. For earlier days, use “Add charge” on the patient.'],
  imPatNote:['পুরোনো রোগী রেজিস্টারে যোগ হলো (নাম, ফোন, বয়স)। পুরোনো বিলের টাকা হিসাবে যোগ হয়নি।','Old patients were added to the register (name, phone, age). Old bill amounts were not added to accounts.'],
  pwSending:['যাচাই হচ্ছে…','Checking…'], dzOld:['মোছার ফর্ম খুলছে…','Opening the delete form…']
});
NAVI.classic = ['grid', 'navClassic']; if (!IC.grid) IC.grid = '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>';
VIEWS.classic = () => '';

async function liveExtra(){
  const sb = SB(), cid = CID(), c = LV.clinic || {};
  /* settings */
  FAC.addr = c.address || ''; FAC.phone = c.phone || ''; FAC.wa = c.whatsapp_number || ''; FAC.gstin = c.gstin || ''; FAC.state = c.billing_state_code || (c.gstin ? String(c.gstin).slice(0, 2) : '19');
  if (!LV.email) { try { const u = await sb.auth.getUser(); LV.email = (u.data && u.data.user && u.data.user.email) || ''; LV.newEmail = (u.data && u.data.user && u.data.user.new_email) || ''; } catch (e) {} }
  FAC.email = LV.email || ''; FAC.emailPending = LV.newEmail || '';
  if (!S.setF) { SIGN.name = c.bill_signatory || ''; }
  if (LV.signPath !== (c.bill_sign_path || '')) { LV.signPath = c.bill_sign_path || ''; SIGN.img = '';
    if (LV.signPath && typeof window.auraSignatureData === 'function') window.auraSignatureData(LV.signPath).then(d => { SIGN.img = d || ''; if (S.view === 'settings' && !S.loading) { const sec = $('set-sg'); if (sec) sec.outerHTML = setSign(setForm()); } }).catch(() => {}); }
  if (!S.tmCalc.wardSet && WARDS[0]) { S.tmCalc.ward = WARDS[0].id; S.tmCalc.rate = String(WARDS[0].rate || 0); S.tmCalc.wardSet = true; }
  /* ward rates shown on the import page */
  RATES.length = 0; WARDS.forEach(W => RATES.push({svc:T[W.key] || two(W.id), cat:'bed', rate:W.rate, unit:['প্রতিদিন', 'per day']}));
  /* import history */
  IMHIST.length = 0; LV.audit.filter(a => a.action === 'data_import').forEach(a => { const d = a.details || {}; IMHIST.push({at:new Date(a.created_at), type:IMT.includes(d.type) ? d.type : 'stock', file:d.file || '—', ok:+d.ok || 0, err:+d.err || 0, by:two(d.by || '')}); });
  try { await expLoad(); } catch (e) {}
  try { await v11Load(); } catch (e) { console.warn('AuraUI v11', e); }
  /* subscription */
  const plan = SUB_PLANS[c.aura_plan] ? c.aura_plan : 'nh_15', bm = /_(15|30|50)$/.exec(plan);
  SUB.plan = plan; if (!SUB.bedsSet) { SUB.beds = bm ? bm[1] : '15'; SUB.bedsSet = true; }
  SUB.free = !!c.billing_exempt || !!window._auraComplimentary; SUB.price = Number(c.monthly_price) > 0 ? Number(c.monthly_price) : 0;
  SUB.trial = !c.subscription_expires_at; SUB.srvLocked = !!(LIVE && LIVE.__locked);
  SUB.exp = c.subscription_expires_at ? new Date(c.subscription_expires_at) : (c.created_at ? new Date(new Date(c.created_at).getTime() + 7 * DAYMS) : null);
  SUB.ocrUsed = Number(c.ocr_used_this_period) || 0; SUB.ocrBonus = Number(c.ocr_bonus_remaining) || 0;
  const inv = await safe(sb.from('aurascale_invoices').select('*').eq('clinic_id', cid).order('invoice_date', {ascending:false}));
  SUB.inv.length = 0; (inv.data || []).forEach(v => SUB.inv.push({no:v.invoice_no, date:new Date(v.invoice_date || v.created_at), kind:v.kind === 'topup' ? 'topup' : 'sub', taxable:Number(v.total) || 0, paid:v.status === 'paid', status:v.status, row:v}));
}

/* import, live */
async function findOrMakePatient(r){
  const sb = SB(), cid = CID(), phone = r.phone || '';
  if (phone) { const q = await sb.from('nh_patients').select('*').eq('clinic_id', cid).eq('phone', phone).limit(20);
    const hit = (q.data || []).find(x => skNorm(x.full_name || '') === skNorm(r.name)); if (hit) return {id:hit.id, uhid:hit.uhid, existing:true}; }
  const uhid = typeof window._famGenUhid === 'function' ? window._famGenUhid() : null;
  const row = {clinic_id:cid, full_name:r.name, phone:phone || null, age:r.age ? String(r.age) : null, gender:sexDb(r.sex || 'O')}; if (uhid) row.uhid = uhid;
  const ins = await insDrop('nh_patients', row, 'id,uhid'); if (ins.error) throw ins.error;
  return {id:ins.data.id, uhid:ins.data.uhid || uhid, existing:false};
}
async function liveImport(m){
  const sb = SB(), cid = CID(), rows = m.rows.filter(r => r.v !== 'err'); let ok = 0; const bad = [];
  if (m.type === 'stock') { const x = await liveSkApply(rows.map(r => Object.assign({}, r, {inc:true})), m.src); return {ok:x.ok, err:m.rows.length - rows.length + x.bad.length, bad:x.bad}; }
  for (const r of rows) {
    try {
      if (m.type === 'beds') {
        const ex = bedByNo(r.bed), stDb = {free:'Available', clean:'Cleaning', res:'Reserved', occ:'Available'}[r.status] || 'Available', rate = (WARD[r.ward] || {}).rate || 0;
        const q = ex ? await sb.from('beds').update({ward:r.ward, status:stDb}).eq('id', beds[ex].uuid) : await sb.from('beds').insert({clinic_id:cid, bed_number:r.bed, ward:r.ward, daily_rate:rate, status:stDb, is_active:true});
        if (q.error) throw q.error;
      } else if (m.type === 'pat') {
        const p = await findOrMakePatient(r); if (p.existing) { bad.push(r.name + ' (' + (S.lang === 'bn' ? 'আগে থেকেই আছে' : 'already there') + ')'); continue; }
      } else if (m.type === 'adm') {
        const b = beds[r.bed]; if (!b || b.status !== 'free') throw new Error(t('vBedBusy'));
        const doc = DOC[r.doc], docText = doc ? doc.n[0] : (r.docRaw || '');
        const p = await findOrMakePatient(r);
        const at = r.adate ? new Date(r.adate + 'T10:00:00') : new Date();
        const ins = await insDrop('admissions', {clinic_id:cid, patient_id:p.id, patient_name:r.name, patient_phone:r.phone || null, patient_age:r.age ? String(r.age) : null, patient_gender:sexDb(r.sex || 'O'), bed_id:b.uuid, admitting_doctor:docText || null, assigned_doctor_id:doc && doc.uid || null,
          admission_diagnosis:r.reason || '', daily_rate:b.rate, status:'Active', uhid:p.uhid || null, admission_date:at.toISOString(), family_phone:r.fam || null}, 'id');
        if (ins.error) throw ins.error;
        const admId = ins.data.id; b.status = 'occ';
        await sb.from('beds').update({status:'Occupied', current_admission_id:admId}).eq('id', b.uuid);
        if (b.rate > 0) await sb.from('admission_charges').insert({clinic_id:cid, admission_id:admId, charge_type:'Bed Charge', description:'Bed charge (Day 1)', quantity:1, unit_price:b.rate, total_price:b.rate, added_by:UID()});
        const adv = parseInt(r.adv, 10); if (adv > 0) await sb.from('nh_payments').insert({clinic_id:cid, admission_id:admId, amount:adv, method:'Cash', payment_date:r.adate || ymd(new Date()), recorded_by:UID()});
      }
      ok++;
    } catch (e) { bad.push((r.name || r.bed || '') + ' (' + errMsg(e).slice(0, 70) + ')'); }
  }
  return {ok, err:m.rows.length - ok, bad};
}

function liveHandlers2(){
  const oldGo = go; go = function(v){ if (v === 'classic') { AuraUI.unmount(true); return; } return oldGo(v); };
  Object.assign(H, {
    imGo: async el => { const m = S.imp; busy(el, true); let r;
      try { r = await liveImport(m); } catch (e) { busy(el, false); toast(t('saveErr') + ' ' + esc(errMsg(e)), 'info'); return; }
      m.result = r; m.step = 4;
      await audLog('data_import', m.type === 'stock' ? 'nh_stock_items' : m.type === 'beds' ? 'beds' : m.type === 'adm' ? 'admissions' : 'nh_patients', null, {type:m.type, file:m.fname || '', rows:m.rows.length, ok:r.ok, err:r.err, by:ROLES.owner.user[0] || ''});
      await liveReload(); window.scrollTo(0, 0); toast(t('imDoneS', {n:num(r.ok), e:num(r.err)}), r.bad.length ? 'info' : 'success'); },
    imUndo: () => {},
    /* settings */
    fdSave: async el => {
      const F = setForm(), f = F.fd, g = gstOf(f), wa = f.wa.trim(), ph = f.phone.trim(), dg = s => s.replace(/\D/g, '').length;
      let err = '';
      if (f.addr.length > 300) err = 'fdErrAddr'; else if (ph && (dg(ph) < 8 || dg(ph) > 15)) err = 'fdErrPhone'; else if (g && !gstinValid(g)) err = 'fdGstBad'; else if (wa && (dg(wa) < 10 || dg(wa) > 15)) err = 'fdErrWa';
      if (err) { F.fdMsg = [t(err), 0]; renderSetPart('fdMsg', msgBox(F.fdMsg)); return; }
      const st = g && gstinValid(g) ? g.slice(0, 2) : f.state;
      if (f.addr.trim() === FAC.addr && ph === FAC.phone && wa === FAC.wa && g === FAC.gstin && st === FAC.state) { F.fdMsg = [t('fdNoChange'), 1]; renderSetPart('fdMsg', msgBox(F.fdMsg)); return; }
      busy(el, true);
      try {
        const args = {p_clinic_id:CID(), p_address:f.addr.trim(), p_gstin:g, p_phone:ph}; if (wa !== FAC.wa) args.p_whatsapp = wa;
        const r = await SB().rpc('update_facility_details', args); if (r.error) throw r.error;
        if (st && st !== FAC.state) { try { await SB().rpc('update_billing_state', {p_clinic_id:CID(), p_state_code:st}); } catch (e) {} }
        audLog('settings_changed', 'clinics', CID(), {section:'facility'});
        await liveReload(); S.setF = null; const F2 = setForm(); F2.fdMsg = [t('fdSaved'), 1]; rerenderSec('set-fd', setFacility); toast(t('fdT') + ' ✓');
      } catch (e) { busy(el, false); F.fdMsg = [t('saveErr') + ' ' + esc(errMsg(e)), 0]; renderSetPart('fdMsg', msgBox(F.fdMsg)); }
    },
    tmTgl: () => {}, tmSave: () => {},
    sgSave: async el => {
      const F = setForm(), name = (SIGN.draftName != null ? SIGN.draftName : SIGN.name).trim();
      if (!SIGN.draft && !SIGN.img && !LV.signPath) { F.sgMsg = [t('sgNothing'), 0]; renderSetPart('sgMsg', msgBox(F.sgMsg)); return; }
      busy(el, true);
      try {
        let path = LV.signPath || null; const bucket = window.AURA_BILL_BUCKET || 'bills';
        if (SIGN.draft) { const blob = await (await fetch(SIGN.draft)).blob(); path = CID() + '/branding/signature-' + Date.now() + '.png';
          const up = await SB().storage.from(bucket).upload(path, blob, {contentType:'image/png', upsert:true, cacheControl:'3600'}); if (up.error) throw up.error; }
        const r = await SB().rpc('nh_set_bill_signature', {p_clinic_id:CID(), p_path:path, p_name:name}); if (r.error) throw r.error;
        if (SIGN.draft && LV.signPath && LV.signPath !== path) { try { await SB().storage.from(bucket).remove([LV.signPath]); } catch (e) {} }
        if (SIGN.draft) SIGN.img = SIGN.draft; SIGN.draft = ''; SIGN.name = name; SIGN.draftName = null; try { window._auraSignCache = {}; } catch (e) {}
        await liveReload(); F.sgMsg = [t('sgSaved'), 1]; rerenderSec('set-sg', setSign); toast(t('sgSaved'));
      } catch (e) { busy(el, false); F.sgMsg = [t('saveErr') + ' ' + esc(errMsg(e)), 0]; renderSetPart('sgMsg', msgBox(F.sgMsg)); }
    },
    sgRemove: async el => {
      const F = setForm(); if (SIGN.draft && !LV.signPath) { SIGN.draft = ''; rerenderSec('set-sg', setSign); return; }
      busy(el, true);
      try { const r = await SB().rpc('nh_set_bill_signature', {p_clinic_id:CID(), p_path:null, p_name:(SIGN.draftName != null ? SIGN.draftName : SIGN.name).trim()}); if (r.error) throw r.error;
        if (LV.signPath) { try { await SB().storage.from(window.AURA_BILL_BUCKET || 'bills').remove([LV.signPath]); } catch (e) {} }
        SIGN.img = ''; SIGN.draft = ''; await liveReload(); F.sgMsg = [t('sgRemoved'), 1]; rerenderSec('set-sg', setSign);
      } catch (e) { busy(el, false); F.sgMsg = [t('saveErr') + ' ' + esc(errMsg(e)), 0]; renderSetPart('sgMsg', msgBox(F.sgMsg)); }
    },
    pwSave: async el => {
      const F = setForm(), p = F.pw; let e = '';
      if (!p.cur) e = 'pwErrCur'; else if (p.n1.length < 6) e = 'pwErrShort'; else if (p.n1 !== p.n2) e = 'pwErrMatch'; else if (p.n1 === p.cur) e = 'pwErrSame';
      if (e) { F.pwMsg = [t(e), 0]; renderSetPart('pwMsg', msgBox(F.pwMsg)); return; }
      busy(el, true);
      try { const v = await SB().auth.signInWithPassword({email:FAC.email, password:p.cur}); if (v.error) { busy(el, false); F.pwMsg = [t('pwErrCur'), 0]; renderSetPart('pwMsg', msgBox(F.pwMsg)); return; }
        const r = await SB().auth.updateUser({password:p.n1}); if (r.error) throw r.error;
        audLog('password_changed', 'auth', null, {}); F.pw = {cur:'', n1:'', n2:'', show:false}; F.pwMsg = [t('pwChanged'), 1]; rerenderSec('set-pw', setPw); toast(t('pwChanged'));
      } catch (x) { busy(el, false); F.pwMsg = [t('saveErr') + ' ' + esc(errMsg(x)), 0]; renderSetPart('pwMsg', msgBox(F.pwMsg)); }
    },
    pwForgot: () => { if (typeof window.openForgotPasswordFromSettings === 'function') window.openForgotPasswordFromSettings(); },
    emSave: async el => {
      const F = setForm(), e = F.em, v = e.e.trim().toLowerCase(); let er = '';
      if (!e.pw) er = 'pwErrCur'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) er = 'emErr'; else if (v === String(FAC.email).toLowerCase()) er = 'emSameErr';
      if (er) { F.emMsg = [t(er), 0]; renderSetPart('emMsg', msgBox(F.emMsg)); return; }
      busy(el, true);
      try { const ck = await SB().auth.signInWithPassword({email:FAC.email, password:e.pw}); if (ck.error) { busy(el, false); F.emMsg = [t('pwErrCur'), 0]; renderSetPart('emMsg', msgBox(F.emMsg)); return; }
        const r = await SB().auth.updateUser({email:v}); if (r.error) throw r.error;
        LV.newEmail = v; FAC.emailPending = v; F.em = {pw:'', e:''}; F.emMsg = [t('emSent', {e:esc(v)}), 1]; rerenderSec('set-em', setEmail);
      } catch (x) { busy(el, false); const msg = errMsg(x); F.emMsg = [/already|registered|exists/i.test(msg) ? t('emTaken') : t('saveErr') + ' ' + esc(msg), 0]; renderSetPart('emMsg', msgBox(F.emMsg)); }
    },
    dzOpen: () => { if (typeof window.openDeleteFacilityModal === 'function') window.openDeleteFacilityModal(); },
    /* subscription */
    sbPay: el => { if (typeof window.auraPlansPay === 'function') window.auraPlansPay(el.dataset.plan, el.dataset.term, el); else toast(t('loadErr'), 'info'); },
    sbUpi: el => { if (typeof window.auraPlansUpi === 'function') window.auraPlansUpi(el.dataset.plan, el.dataset.term); },
    sbOther: el => { const code = el.dataset.v, bt = {pharmacy:'pharmacy', wholesale:'wholesale_pharmacy', lab:'lab'}[code];
      const lk = (window.AURA_BIZ_LIST || []).find(b => b.business_type === bt && b.role === 'owner');
      if (lk && typeof window.auraOpenBiz === 'function') window.auraOpenBiz(lk.id); else location.href = 'nh.html?add=1&for=' + encodeURIComponent(code); },
    sbInv: el => { const v = SUB.inv.find(x => x.no === el.dataset.v); if (!v || typeof window.auraInvoiceHtml !== 'function') return;
      const w = window.open('', '_blank'); if (!w) { toast(t('billBlocked'), 'info'); return; } w.document.open(); w.document.write(window.auraInvoiceHtml(v.row)); w.document.close(); }
  });
}
Object.assign(T, {
  alertLicX:['{name} — মেয়াদ শেষ হয়ে গেছে','{name} — expired'],
  imSub:['Excel বা CSV দিন — বেড, রোগী আর স্টক নিজে থেকে বসে যাবে। স্টকের জন্য সাপ্লায়ারের বিলের ছবিও চলবে।','Give an Excel or CSV file — beds, patients and stock fill in by themselves. For stock, a photo of the supplier’s bill also works.'],
  pwChanged:['পাসওয়ার্ড বদলানো হয়েছে।','Password changed.'],
  emTaken:['এই ইমেল অন্য একটি অ্যাকাউন্টে আছে। অন্য ইমেল দিন।','This email belongs to another account. Use a different one.']
});

/* ---------- pages that still use the old screen's working parts, shown inside the new design ----------
   The old page's content is moved (not copied) into the new design, so every button and every
   save keeps working exactly as before; only the old header and menu are gone. */
Object.assign(T, {
  navAcc:['হিসাব ও রিপোর্ট','Accounts & reports'], navNotes:['প্রগ্রেস নোট','Progress notes'], navDsum:['ছুটির কাগজ','Discharge papers'],
  navAyu:['আয়ুষ্মান / স্কিম','Ayushman / schemes'], navHelp:['সাহায্য','Help'], navFam:['পরিবার','Families'],
  lgAccS:['সব জমা টাকা, আয়, খরচ, বকেয়া আর দৈনিক / মাসিক রিপোর্ট','All payments, revenue, expenses, dues and daily / monthly reports'],
  lgNotesS:['রোগী বেছে আজকের নোট লিখুন বা আগের নোট দেখুন','Pick a patient to write today’s note or read earlier ones'],
  lgDsumS:['ছুটির সারাংশ, চূড়ান্ত বিল আর পরিবারকে হোয়াটসঅ্যাপ','Discharge summary, final bill and WhatsApp to the family'],
  lgAyuS:['PM-JAY, স্বাস্থ্যসাথী আর বীমার কেস ও ক্লেম — নিজেদের হিসেবের জন্য, সরকারি যাচাই নয়','PM-JAY, Swasthya Sathi and insurance cases & claims — for your own tracking, not a government check'],
  lgHelpS:['ছবি সহ ধাপে ধাপে গাইড, আর AuraScale-এর সাথে যোগাযোগ','Step-by-step guides with pictures, and how to reach AuraScale'],
  lgFamS:['একই পরিবারের রোগীদের একসঙ্গে দেখুন','See patients of the same family together'],
  lgClaims:['সব ক্লেম','All claims'], lgScheme:['স্কিম / বীমা','Scheme / insurance'], lgStaffT:['আমন্ত্রণ, হাজিরা আর বেতন','Invites, attendance and salary'],
  lgInvite:['স্টাফকে আমন্ত্রণ','Invite staff'],
  lgMissing:['এই অংশটি লোড হয়নি। পাতা রিফ্রেশ করুন।','This part did not load. Please refresh the page.'],
  lgLinks:['গোপনীয়তা','Privacy'], lgTerms:['শর্তাবলি','Terms'], lgAgr:['চুক্তি','Agreement']
});
Object.assign(IC, {chart:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>', book:'<path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M4 17a3 3 0 0 1 3-3h11"/>', help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14"/><circle cx="12" cy="17.5" r=".6"/>'});

/* key -> old page id, the old menu name that loads its data, and what to do after it opens */
const LEG = {
  notes:{id:'v-rounds', nav:'rounds', icon:'note', t:'navNotes', s:'lgNotesS'},
  ayushman:{id:'v-ayushman', nav:'ayushman', icon:'shield', t:'navAyu', s:'lgAyuS', act:() => `<button class="btn btn-secondary" data-act="lgClaims">${ic('receipt')}${t('lgClaims')}</button>`},
  families:{id:'v-patients', nav:'patients', icon:'users', t:'navFam', s:'lgFamS', back:'patients', after:() => { if (window.setPatientsView) window.setPatientsView('families'); }},
  stock:{id:'v-stock', nav:'stock', embed:true, only:'sb-panel'}
};
const legEl = k => document.getElementById(LEG[k].id);
function legPark(){ legShow.cur = null; Object.keys(LEG).forEach(k => { const el = legEl(k); if (el && el.getAttribute('slot')) el.removeAttribute('slot'); }); }
function legShow(k){
  const L = LEG[k], el = legEl(k); if (!el) { const h = $('lgHost'); if (h) h.innerHTML = `<p class="sknote">${ic('info', 15)}${t('lgMissing')}</p>`; return; }
  legPark();
  if (el.parentNode !== HOST) HOST.appendChild(el);
  el.classList.add('aui-lg'); el.classList.toggle('aui-only', !!L.only); if (L.only) el.dataset.only = L.only;
  el.setAttribute('slot', 'lg');
  if (!legShow.done) legShow.done = {};
  try { if (typeof window.nav === 'function') window.nav(L.nav); } catch (e) { console.warn('old page', k, e); }
  el.classList.add('on');
  try { L.after && L.after(); } catch (e) {}
  legShow.done[k] = true;
}
const legView = k => () => { const L = LEG[k];
  return `${L.back ? `<p class="crumb"><button class="link" data-act="nav" data-v="${L.back}">${ic('chevR', 14).replace('class="ic"', 'class="ic" style="transform:rotate(180deg)"')}${t('plT')}</button></p>` : ''}<div class="ph"><div><h1>${t(L.t)}</h1><p class="sub">${t(L.s)}</p></div>${L.act ? `<div class="ph-actions">${L.act()}</div>` : ''}</div><div class="lg-host" id="lgHost"><slot name="lg"></slot></div>`; };
['notes', 'ayushman', 'families'].forEach(k => { VIEWS[k] = legView(k); NAVI[k] = [LEG[k].icon, LEG[k].t]; });
/* staff and stock: the new page first, then the old working part below it */
const _vStock = VIEWS.stock;
VIEWS.stock = () => _vStock() + `<div class="lg-host lg-under" id="lgHost"><slot name="lg"></slot></div>`;

function legHook(){
  const st = document.createElement('style'); st.textContent = '#main:focus,#main:focus-visible{outline:none}.lg-host{display:block;min-width:0}.lg-under{margin-top:28px}.lg-h{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin:0 0 14px}.lg-h h2{font-size:20px;margin:0}'; ROOT.appendChild(st);
  const _rm = renderMain;
  renderMain = function(){ _rm(); if (S.loading || !LEG[S.view] || (S.view === 'patients')) { legPark(); legShow.cur = null; return; } if (legShow.cur === S.view && legEl(S.view) && legEl(S.view).getAttribute('slot')) return; legShow(S.view); legShow.cur = S.view; };
  Object.assign(H, {
    lgInvite: () => { if (typeof window.openStaffInvite === 'function') window.openStaffInvite(); },
    lgClaims: () => { if (typeof window.auraSchemeClaimsOpen === 'function') window.auraSchemeClaimsOpen(); },
    lgScheme: el => { if (typeof window.auraSchemeEdit === 'function') window.auraSchemeEdit(el.dataset.id); }
  });
}

async function expLoad(){
  const sb = SB(), cid = CID(), now = new Date(), m0 = new Date(now.getFullYear(), now.getMonth(), 1);
  const r = await safe(sb.from('nh_expenses').select('*').eq('clinic_id', cid).order('expense_date', {ascending:false}).limit(300));
  LV.expOk = !r.error; LV.exp = r.data || [];
  const pm = await safe(sb.from('nh_payments').select('amount,created_at').eq('clinic_id', cid).gte('created_at', m0.toISOString()).limit(5000));
  LV.monthPay = (pm.data || []).reduce((a, x) => a + (Number(x.amount) || 0), 0);
}

/* ---------- v11 pages on live data: staff hub, accounts, discharge papers, receipt, history sharing ---------- */
Object.assign(T, {
  atLate:['হাফ ডে','Half day'], atSum:['উপস্থিত {p} · হাফ ডে {l} · ছুটিতে {v} · অনুপস্থিত {a}','Present {p} · half day {l} · leave {v} · absent {a}'],
  mnLegend:['P উপস্থিত · ½ হাফ ডে · L ছুটি · A অনুপস্থিত · H ছুটির দিন · W সাপ্তাহিক ছুটি · “·” এখনও লেখা হয়নি','P present · ½ half day · L leave · A absent · H holiday · W weekly off · “·” not marked yet'],
  atSelf:['নিজে চেক-ইন করেন','Checks in by self'], atNoStaff:['এখনও কোনো স্টাফ যোগ হয়নি','No staff added yet'], atNoStaffS:['“স্টাফের বিবরণ ও বেতন” খুলে নাম, ডিউটির সময় আর বেতন লিখুন','Open “Staff details & salary” to add name, duty time and salary'],
  sfEditHr:['স্টাফের বিবরণ ও বেতন','Staff details & salary'], atNotMarked:['লেখা হয়নি','Not marked'],
  tmLast:['যোগ দিয়েছেন','Joined'], tmNone:['এখনও কেউ লগইন পাননি — “আমন্ত্রণ” ট্যাব থেকে পাঠান','No logins yet — send one from the “Invite” tab'],
  tmDeactHelp:['নিষ্ক্রিয় = সাময়িক বন্ধ, পরে আবার চালু করা যায়। অ্যাক্সেস বাতিল = এই নার্সিং হোমে আর ঢুকতে পারবেন না, আবার আমন্ত্রণ পাঠাতে হবে। দুটোতেই রোগী, বিল আর অডিটের পুরোনো রেকর্ড থেকে যায়।','Deactivate = pause, can be turned back on. Revoke access = they can no longer open this nursing home; a new invite is needed. Either way, patients, bills and the audit log stay.'],
  tmRevS:['{n} আর এই নার্সিং হোমে ঢুকতে পারবেন না। কোনো রোগী বা বিলের তথ্য মুছবে না।','{n} will no longer be able to open this nursing home. No patient or bill data is deleted.'],
  ivS:['হোয়াটসঅ্যাপে একটা কোড আর লিংক যাবে। লিংক খুলে নিজের পাসওয়ার্ড দিলেই লগইন চালু হবে।','A code and link go on WhatsApp. They open it, set a password and can sign in.'],
  ivSent:['{n}-কে হোয়াটসঅ্যাপে আমন্ত্রণ পাঠানো হয়েছে','Invite sent to {n} on WhatsApp'], ivWaFail:['AuraScale থেকে পাঠানো গেল না — আপনার হোয়াটসঅ্যাপ খুলছে','Could not send from AuraScale — opening your WhatsApp'],
  ivSentAgo:['তৈরি {w}{d}','Made {w}{d}'], ivLeft:[' · {d} দিন বাকি',' · {d} days left'], ivRPh:['ফার্মাসিস্ট — শুধু ফার্মেসি','Pharmacist — pharmacy only'], ivRLab:['ল্যাব স্টাফ — শুধু ল্যাব','Lab staff — lab only'],
  rPharm:['ফার্মাসিস্ট','Pharmacist'], rLab:['ল্যাব','Lab'], ivRRec:['রিসেপশন — ভর্তি, বিল, টাকা জমা','Reception — admissions, bills, payments'],
  slS:['হাজিরা থেকে হিসেব (স্টাফ খাতার নিয়মে): অনুপস্থিত আর না-লেখা দিনের টাকা কাটে, অগ্রিম থাকলে কাটা হয়।','Worked out from attendance: absent and unmarked days are cut, and any advance is recovered.'],
  slNoPay:['বেতনের হিসেব এখনও চালু হয়নি — AuraScale-কে জানান','Salary is not switched on yet — tell AuraScale'], slNoStaff:['বেতনের তালিকায় কেউ নেই','Nobody on the salary list'],
  slPayT:['বেতন দিন','Pay salary'], slPayAllT:['বাকি সবার বেতন দিন','Pay all due'], slUnm:['{n} দিন লেখা নেই','{n} days not marked'], slUnmWarn:['কিছু দিনের হাজিরা লেখা নেই — সেগুলো অনুপস্থিত ধরে কাটা হচ্ছে। আগে “মাসের হাজিরা” মিলিয়ে নিন।','Some days are not marked — they are cut like absent days. Check “Month” first.'],
  slPaidOn:['{d} · {m}','{d} · {m}'], slNoSal:['বেতন লেখা নেই','No salary set'], slUndo:['আবার বাকি করুন','Mark unpaid'], slUndone:['বেতন আবার বাকি দেখাচ্ছে','Salary shows as due again'],
  sdBank:['টাকা দেওয়া হয়েছে','Paid by'], sdBonus:['বোনাস','Bonus'], sdOther:['অন্য কাটা','Other cut'],
  hlNone:['এই বছরে কোনো ছুটির দিন যোগ করা হয়নি','No holidays added for this year'], hlErrDup:['এই দিনটি আগেই ছুটি','That day is already a holiday'],
  hlWeekly:['প্রত্যেক স্টাফের সাপ্তাহিক ছুটির দিন তাঁর বিবরণে লেখা থাকে — খাতায় “W”।','Each staff member’s weekly off is set in their details — “W” in the register.'], hlRmQ:['এই ছুটির দিনটি সরাবেন?','Remove this holiday?'], hlRmd:['ছুটির দিন সরানো হয়েছে','Holiday removed'],
  drOnNow:['প্রতিদিন রাত ৮টায় চালু','On — every day at 8 PM'], drNoNum:['মালিকের হোয়াটসঅ্যাপ নম্বর দেওয়া নেই — রিপোর্ট রেজিস্টার্ড মোবাইলে যায়','No owner WhatsApp number — the report goes to your registered mobile'],
  drPrev:['আজ রাতের রিপোর্ট এরকম দেখাবে (এখনকার হিসেবে)','Tonight’s report will look like this (figures as of now)'],
  rtSvcT:['ওয়ার্ড অনুযায়ী বেড','Beds by ward'], rtSvcS:['অন্য পরিষেবার (ওষুধ, পরীক্ষা, ওটি) খরচ রোগীর বিলে “খরচ যোগ” দিয়ে লেখা হয়।','Other services (medicines, tests, OT) are added to each patient’s bill with “Add charge”.'], rtFreeN:['{f} খালি · {o} ভর্তি','{f} free · {o} occupied'],
  gsNote:['আপনার কোনো ওয়ার্ডের ভাড়া দিনে ₹৫,০০০-এর বেশি না হলে রুম ভাড়ায় GST লাগে না। নিয়ম বদলাতে AuraScale-কে জানান। এটি আইনি পরামর্শ নয় — হিসাবরক্ষকের সাথে মিলিয়ে নিন।','No GST on room rent while no ward costs more than ₹5,000 a day. To change the rules, tell AuraScale. Not legal advice — check with your accountant.'],
  rcDl:['অফিসিয়াল রসিদ (PDF)','Official receipt (PDF)'], rcWaAuto:['পরিবারের হোয়াটসঅ্যাপে টাকা জমার খবর নিজে থেকে চলে যায়।','The family gets a payment message on WhatsApp automatically.'],
  dpFu:['কত দিন পরে দেখাতে আসবেন','Follow-up after (days)'], dpHome:['বাড়িতে যে ওষুধ চলবে (প্রতি লাইনে একটা)','Medicines at home (one per line)'], dpSaved:['সংরক্ষিত','Saved'], dpSaving:['সংরক্ষণ হচ্ছে…','Saving…'], dpLocal:['এই ডিভাইসে রাখা আছে','Kept on this device'],
  dsNoInv:['—','—'], dsNoTests:['কোনো পরীক্ষার খরচ লেখা নেই','No tests billed'], dsAlgNo:['রেকর্ডে লেখা নেই','Not recorded'],
  gsOnBill:['বিলে চালু','On bills'], tmColOn:['বিলে','On bills'],
  shErr:['শেয়ার তৈরি করা গেল না','Could not create the share'], shNeedSql:['শেয়ার চালু করতে SQL 70 একবার চালাতে হবে — AuraScale-কে জানান','Sharing needs SQL 70 to be run once — tell AuraScale'],
  qrMaking:['QR তৈরি হচ্ছে…','Making the QR…'], qrFail:['QR তৈরি হলো না — লিংক কপি করে দিন','Could not make the QR — copy the link instead'], docScreen:['ডাক্তারের পাতা খুলুন','Open doctor’s page'],
  hdNotRec:['রেকর্ডে লেখা নেই','Not recorded'], hdNoVit:['ভাইটালস লেখা নেই','No vitals recorded'], hdNoNotes:['কিছু লেখা নেই','Nothing recorded'], hdNoDocs:['কোনো ডকুমেন্ট নেই','No documents'],
  hdFoot2:['এই সারাংশ {h}-এর রেকর্ড থেকে তৈরি এবং রোগীর সম্মতিতে শেয়ার করা। চিকিৎসার সিদ্ধান্ত চিকিৎসকের নিজস্ব পরীক্ষা ও বিচারের উপর নির্ভর করবে।','This summary is generated from the records of {h} and shared with the patient’s consent. Treatment decisions rest on the treating doctor’s own examination and judgement.'],
  shLogLoading:['লোড হচ্ছে…','Loading…'], ipNo:['IP নং','IP no.'], revoked:['শেয়ার বন্ধ করা হয়েছে — লিংক আর খুলবে না','Share revoked — the link no longer opens'],
  mQrS:['ডাক্তার ফোনে স্ক্যান করে PIN দিয়ে দেখবেন','Doctor scans with phone and enters the PIN'], mPdfS:['প্রিন্ট করে হাতে দিন বা নিজে রেখে দিন','Print it and hand it over'],
  vOnce:['একবার দেখার পর বন্ধ','One view only'], pinTell:['PIN শুধু ডাক্তারকে মুখে বলুন — ৫ বার ভুল দিলে লিংক বন্ধ হয়ে যায়','Tell the PIN only to the doctor — 5 wrong tries close the link'],
  g9s:[['মেনুতে “সেটিংস” চাপুন।','Tap “Settings”.','nav:settings'], ['“মালিকের হোয়াটসঅ্যাপ নম্বর” ঘরে নম্বর লিখে “তথ্য সংরক্ষণ করুন”।','Enter the number in “Owner’s WhatsApp number” and tap “Save details”.','btn:fdSave'], ['রিপোর্ট প্রতিদিন রাত ৮টায় নিজে থেকে আসে — আলাদা করে চালু করতে হয় না।','The report comes by itself every day at 8 PM — nothing to switch on.','box:done'], ['কী যাবে দেখতে “হিসাব ও রিপোর্ট” → “রাত ৮টার রিপোর্ট” খুলুন।','To see what it contains, open “Accounts & reports” → “8 PM report”.','tab:acTabDay']],
  g7s:[['মেনুতে “স্টাফ” চাপুন, তারপর “আমন্ত্রণ” ট্যাব।','Tap “Staff”, then the “Invite” tab.','nav:staff'], ['নাম আর হোয়াটসঅ্যাপ নম্বর লিখুন, কী কাজ করবেন (ডাক্তার / রিসেপশন) বাছুন।','Enter the name and WhatsApp number, pick the role (doctor / reception).','box:invite'], ['“আমন্ত্রণ পাঠান” চাপুন — কোড খুলে পাসওয়ার্ড দিলেই লগইন চালু।','Tap “Send invite” — they open the code, set a password and can sign in.','btn:ivSend'], ['কেউ চলে গেলে “টিম” ট্যাবে “নিষ্ক্রিয় করুন” বা “অ্যাক্সেস বাতিল”।','If someone leaves: “Team” tab → “Deactivate” or “Revoke access”.','btn:tmRevokeBtn']]
});
const AURA_MARK = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIiB3aWR0aD0iNjQwIiBoZWlnaHQ9IjY0MCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzFCQjg4MCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwQTZCNEIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iNjQwIiBmaWxsPSJ1cmwoI2JnKSIvPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICAgIDxwYXRoIGQ9Ik0gMjI3IDEzMyBBIDExOCAxMTggMCAwIDEgNDEzIDEzMyIgc3Ryb2tlLXdpZHRoPSIxNiIgb3BhY2l0eT0iMC4zOCIvPgogICAgPHBhdGggZD0iTSAyNjIgMTU0IEEgNzggNzggMCAwIDEgMzc4IDE1NCIgc3Ryb2tlLXdpZHRoPSIxNiIgb3BhY2l0eT0iMC43Ii8+CiAgPC9nPgogIDxwYXRoIGQ9Ik0gMTk2IDQ1MiBMIDMyMCAyMTQgTCA0NDQgNDUyIiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iNTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDxnIGZpbGw9IiM3Q0U2QkMiPgogICAgPHJlY3QgeD0iMjg0IiB5PSIzNDgiIHdpZHRoPSI3MiIgaGVpZ2h0PSIyNCIgcng9IjEyIi8+CiAgICA8cmVjdCB4PSIzMDgiIHk9IjMyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjcyIiByeD0iMTIiLz4KICA8L2c+Cjwvc3ZnPgo=';
const staffUrl = k => 'staff.html?c=' + encodeURIComponent(CID() || '') + '#' + k;
S.iv.role = 'reception';

/* ---------- data ---------- */
async function v11Load(){
  const sb = SB(), cid = CID(), now = new Date(), y0 = now.getFullYear();
  const m0 = new Date(now.getFullYear(), now.getMonth(), 1), d30 = new Date(Date.now() - 31 * DAYMS); d30.setHours(0, 0, 0, 0);
  const since = m0 < d30 ? m0 : d30, pm0 = new Date(SPREV.y, SPREV.m, 1);
  const R = await Promise.all([
    safe(sb.from('nh_payments').select('*').eq('clinic_id', cid).gte('created_at', since.toISOString()).order('created_at', {ascending:false}).limit(3000)),
    safe(sb.from('hr_pay').select('*').eq('clinic_id', cid)),
    safe(sb.from('hr_attendance').select('staff_id,day,status,late,in_at,out_at').eq('clinic_id', cid).gte('day', ymd(pm0)).lte('day', ymd(now)).limit(5000)),
    safe(sb.from('hr_holidays').select('day,name').eq('clinic_id', cid).gte('day', y0 + '-01-01').lte('day', (y0 + 1) + '-12-31').order('day')),
    safe(sb.rpc('hr_payroll', {p_clinic:cid, p_month:ymd(pm0)})),
    safe(sb.from('hr_payslips').select('*').eq('clinic_id', cid).eq('paid', true).gte('paid_on', ymd(since)).limit(500)),
    LV.adm.length ? selIn('nh_discharge_papers', 'admission_id', LV.adm.map(a => a.id)).then(d => ({data:d}), e => ({error:e})) : Promise.resolve({data:[]})
  ]);
  LV.payR = R[0].data || [];
  LV.pay = {}; (R[1].data || []).forEach(x => LV.pay[x.staff_id] = x);
  LV.attM = {}; (R[2].data || []).forEach(a => LV.attM[a.staff_id + '|' + a.day] = a);
  LV.hol = R[3].data || []; LV.holOk = !R[3].error;
  LV.pyr = R[4].error ? null : (R[4].data || []); LV.pyrErr = R[4].error ? errMsg(R[4].error) : '';
  LV.slips = R[5].data || [];
  LV.dpOk = !R[6].error; LV.dp = {}; (R[6].data || []).forEach(x => LV.dp[x.admission_id] = x);
  v11Build();
}
function v11Build(){
  /* staff extras */
  STAFF.forEach(s => { const r = s.row || {}, pay = LV.pay[s.id] || {};
    s.base = Number(pay.monthly_salary) || 0; s.join = r.join_date || ''; s.self = !!(r.user_id && r.att_required !== false);
    s.wo = r.week_off != null ? Number(r.week_off) : -1; s.bank = pay.upi ? 'upi' : 'cash'; if (!s.ph && pay.phone) s.ph = digits10(pay.phone); });
  if (!STAFF.some(s => s.id === S.sdId)) S.sdId = STAFF[0] ? STAFF[0].id : null;
  /* holidays */
  HOL.length = 0; LV.hol.forEach(h => HOL.push({d:new Date(h.day + 'T12:00:00'), n:two(h.name), k:'own', day:h.day}));
  /* demo leftovers */
  TEAM.length = 0; INVITES.length = 0; Object.keys(SALPAID).forEach(k => delete SALPAID[k]); Object.keys(ATT_OVR).forEach(k => delete ATT_OVR[k]);
  /* expenses (expense book + salaries paid) */
  EXP.length = 0;
  (LV.exp || []).forEach(e => EXP.push({id:e.id, at:new Date(String(e.expense_date || e.created_at || '').slice(0, 10) + 'T12:00:00'), cat:exKey(e.category, e.notes), amt:Number(e.amount) || 0, m:mKey(e.payment_method), note:exNote(e.notes) ? two(exNote(e.notes)) : ''}));
  (LV.slips || []).forEach(s => EXP.push({at:new Date(String(s.paid_on || s.updated_at || '').slice(0, 10) + 'T12:00:00'), cat:'staff', amt:Number(s.net) || 0, m:s.pay_mode === 'bank' ? 'bank' : s.pay_mode === 'upi' ? 'upi' : 'cash', note:two((s.staff_name || '') + (s.month ? ' · ' + monName(+String(s.month).slice(0, 4), +String(s.month).slice(5, 7) - 1) : '')), sal:true}));
}
const EXTAG = {oxy:'[Oxygen refill] ', food:'[Patient food] '};
function exKey(cat, notes){ const c = String(cat || '').toLowerCase(), n = String(notes || '').toLowerCase();
  if (n.startsWith('[oxygen refill]') || /oxygen/.test(c)) return 'oxy'; if (n.startsWith('[patient food]') || /food/.test(c)) return 'food';
  if (/staff|salar/.test(c)) return 'staff'; if (/suppl|medic/.test(c)) return 'sup'; if (/utilit|electric|water/.test(c)) return 'util'; if (/mainten|equip|repair/.test(c)) return 'maint'; if (/rent/.test(c)) return 'rent'; return 'other'; }
const exNote = n => String(n || '').replace(/^\[(oxygen refill|patient food)\]\s*/i, '').trim();
const exDb = k => ({staff:'Staff', sup:'Medical Supplies', util:'Utilities', maint:'Maintenance', rent:'Rent', oxy:'Medical Supplies', food:'Other', other:'Other'})[k] || 'Other';

/* ---------- team / invites ---------- */
const roleKey = r => { r = String(r || '').toLowerCase(); return /owner/.test(r) ? 'owner' : /recep/.test(r) ? 'reception' : /doctor/.test(r) ? 'doctor' : /nurse/.test(r) ? 'nurse' : /pharm/.test(r) ? 'pharmacist' : /lab/.test(r) ? 'lab' : 'reception'; };
const roleT = r => t({owner:'rOwner', reception:'rReception', doctor:'rDoctor', nurse:'rNurse', pharmacist:'rPharm', lab:'rLab'}[r] || 'rReception');
function teamList(){
  const ph = {}; (LV.invites || []).forEach(i => { if (i.used_by && i.phone) ph[i.used_by] = digits10(i.phone); });
  return (LV.nhStaff || []).map(s => ({id:s.id, n:s.full_name || (s.id === UID() ? ROLES.owner.user[0] : '—'), role:roleKey(s.role), st:s.is_active === false ? 'deact' : 'active', at:s.created_at ? new Date(s.created_at) : null, ph:ph[s.id] || '', mail:s.id === UID() ? (LV.email || '') : ''}))
    .sort((a, b) => (a.role === 'owner' ? -1 : b.role === 'owner' ? 1 : 0) || String(a.n).localeCompare(String(b.n)));
}
const pendingInv = () => (LV.invites || []).filter(i => !i.used_by && !(i.expires_at && new Date(i.expires_at) < new Date())).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
function invRoles(){ const c = LV.clinic || {}, L = [['doctor', 'rDoctor', 'ivRDoc', 'steth'], ['reception', 'rReception', 'ivRRec', 'desk']];
  if (c.mod_pharmacy) L.push(['pharmacist', 'rPharm', 'ivRPh', 'box']); if (c.mod_lab) L.push(['lab', 'rLab', 'ivRLab', 'flask' in IC ? 'flask' : 'file']); return L; }
const invMsg = (code, n) => (S.lang === 'bn' ? `নমস্কার ${n}! ${t('homeName')}-এ AuraScale-এ যোগ দেওয়ার আমন্ত্রণ।\n\nআপনার কোড: ${code}\n\nএই লিংক খুলে যোগ দিন: https://os.aurascale.in/nh.html?invite=${encodeURIComponent(code)}`
  : `Hi ${n}! You have been invited to join ${t('homeName')} on AuraScale.\n\nYour invite code: ${code}\n\nOpen this link to join: https://os.aurascale.in/nh.html?invite=${encodeURIComponent(code)}`);
async function sendInv(code, phone, n){
  let ok = false; try { const r = await SB().functions.invoke('send-staff-invite', {body:{code, phone}}); ok = !r.error && r.data && r.data.ok; } catch (e) {}
  if (!ok) { toast(t('ivWaFail'), 'info'); try { window.open('https://wa.me/91' + phone + '?text=' + encodeURIComponent(invMsg(code, n)), '_blank'); } catch (e) {} }
  return ok;
}

/* ---------- salary ---------- */
function pyRows(){
  return (LV.pyr || []).map(x => { const s = x.slip || null, paid = !!(s && s.paid), base = Number(x.salary) || 0, ded = Number(paid ? s.absence_cut : x.absence_cut) || 0;
    const adv = s ? Number(s.advance_cut) || 0 : Math.min(Number(x.advance_due) || 0, Math.max(0, base - ded));
    const oth = s ? Number(s.other_cut) || 0 : 0, bon = s ? Number(s.bonus) || 0 : 0;
    const net = paid ? Number(s.net) || 0 : Math.max(0, base - ded - adv - oth + bon);
    return {id:x.staff_id, x, s, paid, base, ded, adv, oth, bon, net, name:x.name || '—', des:x.designation || '', present:(Number(x.present) || 0) + (Number(x.half) || 0), dim:Number(x.days_in_month) || 0, unm:Number(x.unmarked) || 0}; });
}
async function payOne(r, mode){
  const sb = SB(), cid = CID(), month = ymd(new Date(SPREV.y, SPREV.m, 1));
  let sid = r.s && r.s.id;
  if (!sid) { const a = await sb.rpc('hr_payslip_save', {p_clinic:cid, p_month:month, p_rows:[{staff_id:r.id, advance_cut:r.adv, other_cut:r.oth, bonus:r.bon}]}); if (a.error) throw a.error;
    const b = await sb.rpc('hr_payroll', {p_clinic:cid, p_month:month}); if (b.error) throw b.error; const row = (b.data || []).find(z => z.staff_id === r.id); sid = row && row.slip && row.slip.id; }
  if (!sid) throw new Error('payslip');
  const c = await sb.rpc('hr_payslip_paid', {p_id:sid, p_paid:true, p_mode:mode}); if (c.error) throw c.error;
  return (c.data && Number(c.data.net)) || r.net;
}
function mSalPay(m){
  const L = pyRows(), list = m.all ? L.filter(r => !r.paid && r.base > 0) : L.filter(r => r.id === m.id), tot = list.reduce((a, r) => a + r.net, 0);
  return {title:t(m.all ? 'slPayAllT' : 'slPayT'), sub:m.all ? `${num(list.length)} ${S.lang === 'bn' ? 'জন' : 'staff'} · ${money(tot)}` : list[0] ? `${esc(list[0].name)} · ${monName(SPREV.y, SPREV.m)}` : '',
    body:`${list.length === 1 ? `<div class="au-bill"><table><tr><td>${t('slBase')}</td><td class="r">${money(list[0].base)}</td></tr>${list[0].ded ? `<tr><td>${t('slDed')}</td><td class="r">−${money(list[0].ded)}</td></tr>` : ''}${list[0].adv ? `<tr><td>${t('slAdv')}</td><td class="r">−${money(list[0].adv)}</td></tr>` : ''}<tr class="tot"><td>${t('slNet')}</td><td class="r">${money(list[0].net)}</td></tr></table></div>` : ''}
      <div class="field"><span class="lab">${t('slMethod')}</span><div class="seg">${['cash', 'upi', 'bank'].map(k => `<button type="button" data-act="set" data-path="mode" data-val="${k}" aria-pressed="${m.mode === k}" data-k="sm-${k}">${t(k === 'bank' ? 'bankT' : k)}</button>`).join('')}</div></div>`,
    foot:`<button class="btn btn-secondary btn-lg" data-act="closeModal">${t('cancel')}</button><button class="btn btn-primary btn-lg grow" data-act="slPayGo" data-primary>${ic('wallet')}${t('slPay')} · ${money(tot)}</button>`};
}
Object.assign(XMODALS, {salpay:mSalPay});

/* ---------- discharge papers ---------- */
const dpLocal = id => { try { return JSON.parse(localStorage.getItem('aui-dp-' + id) || 'null'); } catch (e) { return null; } };
let dpTm = null;
function dpQueue(p){ clearTimeout(dpTm); const st = $('dpSt'); if (st) st.textContent = t('dpSaving'); dpTm = setTimeout(() => dpSave(p), 900); }
async function dpSave(p){
  const e = dpEd(p), row = {admission_id:p.id, clinic_id:CID(), dx:e.dx, course:e.course, cond:e.cond, advice:e.adv, followup_days:parseInt(e.fu, 10) || 0, home_meds:e.home, updated_at:new Date().toISOString(), updated_by:UID()};
  let ok = false;
  if (LV.dpOk !== false) { const r = await safe(SB().from('nh_discharge_papers').upsert(row, {onConflict:'admission_id'})); ok = !r.error; if (r.error) LV.dpOk = false; else LV.dp[p.id] = row; }
  if (!ok) { try { localStorage.setItem('aui-dp-' + p.id, JSON.stringify(e)); } catch (x) {} }
  const st = $('dpSt'); if (st) st.textContent = t(ok ? 'dpSaved' : 'dpLocal');
}

/* receipt number is given by the database / receipt maker a moment after saving */
async function rcFill(m, n){
  const p = getP(m.pid), y = p && p.pays.find(z => z.id === m.payId); if (!y || rcNo(y)) return;
  await new Promise(r => setTimeout(r, n ? 2500 : 1200));
  const r = await safe(SB().from('nh_payments').select('receipt_no').eq('id', m.payId).maybeSingle());
  if (r.data && r.data.receipt_no) { y.raw = Object.assign({}, y.raw, {receipt_no:r.data.receipt_no}); if (S.modal === m) renderModal(); }
  else if ((n || 0) < 3 && S.modal === m) rcFill(m, (n || 0) + 1);
}

/* ---------- history sharing ---------- */
const shareUrl = tok => (/aurascale\.in$/.test(location.hostname) ? location.origin : 'https://os.aurascale.in') + '/h.html?t=' + encodeURIComponent(tok);
let QRLIB = null;
function qrLib(){
  if (window.qrcode) return Promise.resolve(window.qrcode); if (QRLIB) return QRLIB;
  QRLIB = new Promise((ok, no) => { const s = window.document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'; s.onload = () => ok(window.qrcode); s.onerror = () => { QRLIB = null; no(new Error('qr')); }; window.document.head.appendChild(s); });
  return QRLIB;
}
async function makeQr(url){
  try { const q = (await qrLib())(0, 'M'); q.addData(url); q.make(); const n = q.getModuleCount(); let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c},${r}h1v1h-1z`;
    return `<svg viewBox="-2 -2 ${n + 4} ${n + 4}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QR" shape-rendering="crispEdges"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><path d="${d}" fill="#0E1A15"/></svg>`;
  } catch (e) { return ''; }
}
async function loadShares(p, force){
  if (!p || (p.shBusy && !force)) return; p.shBusy = true;
  const r = await safe(SB().from('nh_history_shares').select('id,doc_no,method,valid,sections,expires_at,one_time,views,revoked_at,created_by_name,created_at').eq('admission_id', p.id).order('created_at', {ascending:true}));
  LV.shOk = !r.error; p.shares = (r.data || []).map(z => ({id:z.id, no:z.doc_no, method:z.method, valid:z.valid, at:new Date(z.created_at), exp:z.expires_at ? new Date(z.expires_at) : null, views:Number(z.views) || 0, revoked:!!z.revoked_at, by:z.created_by_name || '', once:!!z.one_time}));
  p.sharesLoaded = true; p.shBusy = false;
  if (S.view === 'patients' && S.patId === p.id && S.patTab === 'docs') renderMain();
}
const _pDocs0 = pDocs;
pDocs = function(p){ if (!p.sharesLoaded && !p.shBusy) loadShares(p); return _pDocs0(p) + shareLog(p); };

/* ---------- handlers ---------- */
function liveHandlers3(){
  const st = document.createElement('style');
  st.textContent = `.logo.aura-real{background:url("${AURA_MARK}") center/126% no-repeat!important;box-shadow:0 3px 10px rgba(10,107,75,.35),inset 0 0 0 1px rgba(255,255,255,.14)}
  .shqr>svg{width:196px;height:196px;display:block;margin:0 auto;border-radius:10px}.qr-wait{width:196px;height:196px;display:grid;place-items:center;margin:0 auto;border:1px dashed var(--border-strong);border-radius:12px;color:var(--text-3);font-size:13px;text-align:center;padding:12px}
  .dp-st{font-size:12.5px;color:var(--text-3);margin:6px 0 0}.att .attseg .st{margin-left:4px}.sf-hr{white-space:nowrap}
  .tm-on{display:inline-flex;align-items:center;gap:4px;white-space:nowrap;color:var(--ok);font-weight:600;font-size:13px}.tmr{grid-template-columns:minmax(0,1fr) 72px 84px 96px}@media (max-width:600px){.tmr{grid-template-columns:minmax(0,1fr) auto auto}}`;
  ROOT.appendChild(st);
  const fail = e => toast(t('saveErr') + ' ' + esc(errMsg(e)), 'info');
  const keep = sel => { const b = ROOT.querySelector(sel); b && b.focus({preventScroll:true}); };
  Object.assign(H, {
    /* attendance */
    attSet: async el => { const s = STAFF.find(x => x.id === el.dataset.id); if (!s) return; const v = el.dataset.v, day = ymd(TODAY);
      const cur = attCode(s, TODAY), status = cur === v ? 'clear' : {P:'present', '½':'half', L:'leave', A:'absent'}[v];
      const r = await SB().rpc('hr_mark', {p_staff:s.id, p_day:day, p_status:status, p_note:null}); if (r.error) { fail(r.error); return; }
      const k = s.id + '|' + day; if (status === 'clear') delete LV.attM[k]; else LV.attM[k] = Object.assign({}, LV.attM[k] || {}, {staff_id:s.id, day, status});
      s.st = status === 'present' ? 'present' : status === 'half' ? 'late' : status === 'leave' || status === 'absent' ? 'leave' : 'upcoming';
      renderMain(); keep(`[data-act="attSet"][data-id="${s.id}"][data-v="${v}"]`); toast(t('atSaved', {n:esc(s.n[li()]), s:status === 'clear' ? t('atNotMarked') : t({P:'atP', '½':'atLate', L:'atL', A:'atA'}[v])})); },
    /* team */
    tmDeact: async el => { const u = teamList().find(x => x.id === el.dataset.id); if (!u) return; busy(el, true);
      const r = await SB().from('nh_staff').update({is_active:false}).eq('id', u.id).eq('clinic_id', CID()); if (r.error) { busy(el, false); fail(r.error); return; }
      audLog('staff_deactivated', 'nh_staff', u.id, {name:u.n}); await liveReload(); toast(t('tmDeactDone', {n:esc(u.n)})); },
    tmReact: async el => { const u = teamList().find(x => x.id === el.dataset.id); if (!u) return; busy(el, true);
      const r = await SB().from('nh_staff').update({is_active:true}).eq('id', u.id).eq('clinic_id', CID()); if (r.error) { busy(el, false); fail(r.error); return; }
      audLog('staff_activated', 'nh_staff', u.id, {name:u.n}); await liveReload(); toast(t('tmReactDone', {n:esc(u.n)})); },
    tmRevoke: el => openModal({type:'revoke', id:el.dataset.id}),
    tmRevGo: async el => { const u = teamList().find(x => x.id === S.modal.id); if (!u) return; busy(el, true);
      const r = await SB().from('nh_staff').delete().eq('id', u.id).eq('clinic_id', CID()); if (r.error) { busy(el, false); fail(r.error); return; }
      audLog('staff_access_revoked', 'nh_staff', u.id, {name:u.n}); closeModal(); await liveReload(); toast(t('tmRevDone', {n:esc(u.n)})); },
    /* invites */
    ivRole: el => { S.iv.role = el.dataset.v; renderMain(); keep(`[data-act="ivRole"][data-v="${el.dataset.v}"]`); },
    ivSend: async el => { const f = S.iv, ph = digits10(f.ph); f.err = !f.n.trim() ? 'ivErrName' : !/^[6-9]\d{9}$/.test(ph) ? 'ivErrPhone' : pendingInv().some(v => digits10(v.phone) === ph) ? 'ivErrDup' : '';
      if (f.err) { renderMain(); return; } busy(el, true);
      try { const role = f.role, n = f.n.trim();
        const r = role === 'pharmacist' || role === 'lab' ? await SB().rpc('nhx_dept_invite', {p_clinic_id:CID(), p_dept:role, p_label:n}) : await SB().rpc('nh_generate_invite', {p_role:role === 'reception' ? 'receptionist' : role, p_label:n, p_clinic_id:CID()});
        if (r.error) throw r.error; if (!r.data || !r.data.ok) throw new Error((r.data && r.data.error) || 'invite');
        const ok = await sendInv(r.data.code, ph, n); audLog('staff_invited', 'nh_invites', null, {name:n, role, code:r.data.code});
        S.iv = {n:'', ph:'', role:f.role, err:''}; await liveReload(); if (ok) toast(t('ivSent', {n:esc(n)}));
      } catch (e) { busy(el, false); fail(e); } },
    ivResend: async el => { const v = (LV.invites || []).find(x => x.code === el.dataset.id); if (!v) return; const ph = digits10(v.phone); if (!ph) { toast(t('ivErrPhone'), 'info'); return; }
      busy(el, true); const ok = await sendInv(v.code, ph, v.label || ''); busy(el, false); if (ok) toast(t('ivResent')); },
    ivCancel: async el => { busy(el, true); const r = await SB().from('nh_invites').delete().eq('code', el.dataset.id).eq('clinic_id', CID()); if (r.error) { busy(el, false); fail(r.error); return; } await liveReload(); toast(t('ivCanceled'), 'info'); },
    /* salary */
    slPay: el => openModal({type:'salpay', id:el.dataset.id, mode:(LV.pay[el.dataset.id] || {}).upi ? 'upi' : 'cash'}),
    slPayAll: () => openModal({type:'salpay', all:true, mode:'cash'}),
    slPayGo: async el => { const m = S.modal, L = pyRows(), list = m.all ? L.filter(r => !r.paid && r.base > 0) : L.filter(r => r.id === m.id); busy(el, true); let tot = 0;
      try { for (const r of list) tot += await payOne(r, m.mode); closeModal(); await liveReload(); toast(list.length === 1 ? t('slPaidDone', {n:esc(list[0].name), amt:money(tot)}) : t('slAllPaid') + ' · ' + money(tot)); }
      catch (e) { busy(el, false); fail(e); await liveReload(); } },
    slUnpay: async el => { const r = await SB().rpc('hr_payslip_paid', {p_id:+el.dataset.s || el.dataset.s, p_paid:false, p_mode:null}); if (r.error) { fail(r.error); return; } await liveReload(); toast(t('slUndone'), 'info'); },
    slCsv: () => dlText(`salary-${SPREV.y}-${SPREV.m + 1}.csv`, '﻿' + [['staff', 'designation', 'salary', 'days present', 'absence cut', 'advance', 'net', 'status']].concat(pyRows().map(r => [r.name, r.des, r.base, r.present, r.ded, r.adv, r.net, r.paid ? 'paid' : 'due'])).map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')),
    mnCsv: () => { const M = S.mnM === 'prev' ? SPREV : SCUR, days = monthDays(M.y, M.m); dlText(`attendance-${M.y}-${M.m + 1}.csv`, '﻿' + [['staff', 'role'].concat(days.map(d => d.getDate()))].concat(STAFF.map(s => [s.n[1], s.jRaw || ''].concat(days.map(d => attCode(s, d) === 'U' ? '' : attCode(s, d))))).map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')); },
    sdOpen: el => { S.sdId = el.dataset.id; S.sfTab = 'sald'; renderMain(); window.scrollTo(0, 0); },
    sdSlip: () => { const r = pyRows().find(z => z.id === S.sdId); if (r) printDoc(payslipHtml(r)); },
    /* holidays */
    hlAdd: async el => { const f = S.hl; if (!f.n.trim() || !f.d) { f.err = 'hlErr'; renderMain(); return; } if (LV.hol.some(h => h.day === f.d)) { f.err = 'hlErrDup'; renderMain(); return; }
      busy(el, true); const r = await SB().from('hr_holidays').insert({clinic_id:CID(), day:f.d, name:f.n.trim()}); if (r.error) { busy(el, false); f.err = /duplicate|pkey/i.test(r.error.message || '') ? 'hlErrDup' : ''; if (!f.err) fail(r.error); renderMain(); return; }
      S.hl = {n:'', d:'', err:''}; await liveReload(); toast(t('hlAdded')); },
    hlName: el => { S.hl.n = el.dataset.v; renderMain(); },
    hlRm: async el => { const h = HOL[+el.dataset.i]; if (!h || !window.confirm(t('hlRmQ') + '\n' + L2(h.n))) return; busy(el, true);
      const r = await SB().from('hr_holidays').delete().eq('clinic_id', CID()).eq('day', h.day); if (r.error) { busy(el, false); fail(r.error); return; } await liveReload(); toast(t('hlRmd'), 'info'); },
    /* accounts */
    exSave: async el => { const f = S.ex, a = parseInt(f.amt, 10); if (!(a > 0)) { f.err = 'exErr'; renderMain(); return; } busy(el, true);
      const note = (EXTAG[f.cat] || '') + f.note.trim();
      const row = {clinic_id:CID(), category:exDb(f.cat), amount:a, expense_date:f.d || ymd(TODAY), payment_method:mDb(f.m), notes:note || null, created_by:UID()};
      const r = await insDrop('nh_expenses', row); if (r.error) { busy(el, false); fail(r.error); return; }
      audLog('expense_added', 'nh_expenses', null, {amount:a, category:row.category, notes:note}); S.ex = {cat:f.cat, amt:'', d:'', m:f.m, note:'', err:''}; await liveReload(); toast(t('exSaved', {amt:money(a)})); },
    acCsv: () => { const k = acKpis(); dlText(`accounts-${ymd(TODAY)}.csv`, '﻿' + [['date', 'type', 'party/category', 'method', 'receipt', 'amount']].concat(k.pays.map(x => [ymd(x.at), 'in', x.p.name[1], x.y.m, x.rc || '', x.y.amt]), k.ex.map(e => [ymd(e.at), 'out', e.cat + (e.note ? ' - ' + L2(e.note) : ''), e.m, '', -e.amt])).map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')); },
    rtSave: async el => { const ch = []; WARDS.forEach(w => { const v = parseInt(S.rt[w.id], 10); if (v > 0 && v !== w.rate) ch.push([w, v]); });
      if (!ch.length) { toast(t('fdNoChange'), 'info'); return; } busy(el, true);
      try { for (const [w, v] of ch) { const ids = Object.values(beds).filter(b => b.ward === w.id).map(b => b.uuid);
          const r = await SB().from('beds').update({daily_rate:v}).in('id', ids); if (r.error) throw r.error;
          try { const act = LV.adm.filter(a => a.status === 'Active' && ids.includes(a.bed_id)).map(a => a.id); if (act.length) await SB().from('admissions').update({daily_rate:v}).in('id', act); } catch (e) {}
          audLog('bed_updated', 'beds', null, {ward:w.id, rate:v, from:w.rate}); }
        S.rt = null; await liveReload(); toast(t('rtSaved')); } catch (e) { busy(el, false); fail(e); } },
    abOpen: () => H.bedAdd(),
    /* discharge papers */
    dpReset: () => { const p = getP(S.dpId); delete DPED[S.dpId]; if (LV.dp) delete LV.dp[S.dpId]; try { localStorage.removeItem('aui-dp-' + S.dpId); } catch (e) {} renderMain(); if (p) dpSave(p); },
    /* payment receipt right after a payment */
    paySave: async el => {
      const m = S.modal, p = getP(m.pid), bal = totals(p).bal, a = parseInt(m.amt, 10);
      if (!(a > 0)) { m.err = {amt:'errAmt'}; rerenderModal(); $('p-amt').focus(); return; }
      if (a > bal) { m.err = {amt:'errMore'}; rerenderModal(); $('p-amt').focus(); return; }
      busy(el, true);
      try { const pay = await payNow(p, a, m.method, (m.ref || '').trim()); closeModal(); await liveReload(); toast(t('paySaved', {amt:money(a), name:esc(nm(p))}), 'success');
        const q = getP(p.id); if (q && pay && pay.id) { const m2 = {type:'receipt', pid:q.id, payId:pay.id, at:new Date(pay.created_at || Date.now())}; openModal(m2); rcFill(m2); } }
      catch (e) { busy(el, false); fail(e); }
    },
    rcPrint: () => { const m = S.modal, p = getP(m.pid), y = p && (p.pays.find(z => z.id === m.payId) || p.pays[p.pays.length - 1]); if (y) printDoc(receiptHtml(p, y, rcNo(y), m.at || y.at)); },
    /* history sharing */
    shCreate: async el => {
      const m = S.modal, p = getP(m.pid); if (!m.consent) { m.err = 'errConsent'; rerenderModal(); return; }
      busy(el, true);
      try { if (!p.docsLoaded) await loadDocs(p); } catch (e) {}
      const html = m.method === 'qr' ? historyDoc(p, {sec:m.sec, range:m.range, qr:false, no:'%%DOCNO%%', view:true}) : null;
      const r = await SB().rpc('nh_history_share_create', {p_admission:p.id, p_method:m.method, p_valid:m.valid, p_sections:m.sec, p_html:html, p_by_name:ROLES.owner.user[0] || null});
      if (r.error) { busy(el, false); m.err = /function|does not exist|schema cache|Could not find/i.test(r.error.message || '') ? 'shNeedSql' : 'shErr'; rerenderModal(); return; }
      const d = r.data || {};
      m.share = {id:d.id, no:d.doc_no, token:d.token || '', pin:d.pin || '', exp:d.expires_at ? new Date(d.expires_at) : null, method:m.method, valid:m.valid, sec:m.sec.slice(), range:m.range};
      m.step = 3; m.qr = null; renderModal(); loadShares(p, true);
      if (m.method === 'qr') makeQr(shareUrl(m.share.token)).then(svg => { m.qr = svg || 'x'; if (S.modal === m) rerenderModal(); });
      else setTimeout(() => printHistory(p, {sec:m.sec, range:m.range, qr:false, no:d.doc_no}), 300);
    },
    shPdf: () => { const m = S.modal; if (!m || !m.share) return; const p = getP(m.pid), sh = m.share; printHistory(p, {sec:sh.sec, range:sh.range, pin:sh.method === 'qr' ? sh.pin : '', exp:sh.exp, no:sh.no, qr:sh.method === 'qr', qrSvg:m.qr && m.qr !== 'x' ? m.qr : '', url:sh.token ? shareUrl(sh.token) : ''}); },
    shCopy: () => { const m = S.modal; if (!m || !m.share || !m.share.token) return; const u = shareUrl(m.share.token); try { navigator.clipboard.writeText(u).then(() => toast(t('copied'), 'info'), () => toast(u, 'info')); } catch (e) { toast(u, 'info'); } },
    dvOpen: () => { const m = S.modal; if (m && m.share && m.share.token) window.open(shareUrl(m.share.token), '_blank', 'noopener'); },
    shRevoke: async el => { const p = getP(el.dataset.id), sid = el.dataset.s; if (!sid) return; busy(el, true);
      const r = await SB().rpc('nh_history_share_revoke', {p_id:sid}); if (r.error) { busy(el, false); fail(r.error); return; }
      if (S.modal && S.modal.type === 'share') closeModal(); toast(t('revoked'), 'info'); if (p) loadShares(p, true); }
  });
  ROOT.addEventListener('input', e => { const el = e.target; if (el.dataset && el.dataset.dp && S.dpId) { const p = getP(S.dpId); if (p) dpQueue(p); } });
  ROOT.addEventListener('change', e => { const el = e.target; if (el.dataset && el.dataset.dp && S.dpId) { const p = getP(S.dpId); if (p) dpQueue(p); } });
}

/* ---------- Boot ---------- */
(function boot(){
  try {
    const sk = localStorage.getItem('as3-skin'); if (SKINS.some(k => k.id === sk)) S.skin = sk;
    const l = localStorage.getItem('aurascale_lang'); S.lang = l === 'en' || l === 'hi' ? 'en' : 'bn';
    const th = localStorage.getItem('as-theme') || localStorage.getItem('nh-theme');
    HOST.dataset.theme = th || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) { HOST.dataset.theme = 'light'; }
  S.role = 'owner'; S.view = ROLES.owner.home;
  ROLES.owner.nav.splice(0, ROLES.owner.nav.length, 'dashboard', 'beds', 'patients', 'billing', 'bills', 'accounts', 'discharge', 'stock', 'notes', 'ayushman', 'compliance', 'staff', 'notif', 'import', 'audit', 'settings', 'subscription', 'help');
  if (LIVE && LIVE.__locked) { SUB.srvLocked = true; S.view = 'subscription'; }
  HOST.lang = S.lang;
  extraHandlers();
  extraHandlers2();
  extraHandlers3();
  extraHandlers4();
  extraHandlers5();
  extraHandlers6();
  extraHandlers7();
  extraHandlers8();
  extraHandlers9();
  extraHandlers10();
  extraHandlers11();
  extraHandlers12();
  extraHandlers13();
  liveHandlers();
  liveHandlers2();
  liveHandlers3();
  legHook();
  AuraUI.toast = (m, kind) => toast(esc(String(m || '')), kind || 'info');
  AuraUI.reload = () => liveReload(); AuraUI.go = v => go(v);
  HOST.dataset.skin = S.skin;
  S.loading = true; renderAll();
  LIVE_LOAD().then(() => { S.loading = false; renderAll(); }).catch(e => {
    console.error('AuraUI load', e); S.loading = false; LV.err = errMsg(e);
    if (SUB.srvLocked) { LV.clinic = Object.assign({}, LIVE); liveExtra().catch(() => {}).then(() => renderAll()); return; }
    renderAll();
    const m = $('main'); if (m) m.innerHTML = `<div class="card" style="max-width:560px;margin:40px auto;text-align:center;padding:28px"><h2>${t('loadErr')}</h2><p class="sub">${esc(LV.err)}</p><div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap"><button class="btn btn-primary" onclick="location.reload()">${S.lang === 'bn' ? 'আবার চেষ্টা করুন' : 'Try again'}</button></div></div>`;
  });
})();

}
})();
